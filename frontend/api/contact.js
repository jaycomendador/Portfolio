import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
}, { timestamps: true }));

function createMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) throw new Error('Email delivery is not configured.');
  return SMTP_HOST
    ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT) || 587, secure: SMTP_SECURE === 'true', auth: { user: SMTP_USER, pass: SMTP_PASS } })
    : nodemailer.createTransport({ service: 'gmail', auth: { user: SMTP_USER, pass: SMTP_PASS } });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });
  try {
    const { name, email, message, attachment } = req.body || {};
    if (!name?.trim() || !email?.trim() || !message?.trim()) return res.status(400).json({ message: 'Name, email, and message are required.' });
    if (!emailPattern.test(email.trim())) return res.status(400).json({ message: 'Please provide a valid email address.' });
    if (attachment && (!attachment.filename || !attachment.content || !attachment.contentType)) return res.status(400).json({ message: 'The attached file is invalid.' });

    const transporter = createMailer();
    let contactMessage = { id: null };
    await transporter.sendMail({
      from: `Portfolio contact <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT || process.env.SMTP_USER,
      replyTo: email.trim(),
      subject: `Portfolio inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      attachments: attachment ? [{ filename: attachment.filename, content: Buffer.from(attachment.content, 'base64'), contentType: attachment.contentType }] : [],
    });
    if (mongoose.connection.readyState === 1) {
      try {
        contactMessage = await ContactMessage.create({ name, email, message });
      } catch (error) {
        console.error('Contact email sent, but the message could not be saved:', error);
      }
    }
    return res.status(201).json({ message: 'Thanks — your message has been sent.', id: contactMessage.id });
  } catch (error) {
    console.error('Contact form error:', error);
    if (error.code === 'EAUTH' || error.responseCode === 535) return res.status(502).json({ message: 'Email delivery is unavailable. Please try again later.' });
    return res.status(500).json({ message: error.message || 'Unable to send your message. Please try again later.' });
  }
}

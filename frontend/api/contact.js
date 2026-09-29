import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

let mailer;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
}, { timestamps: true }));

function createMailer() {
  if (mailer) return mailer;
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) throw new Error('Email delivery is not configured.');
  const useGmailStartTls = !SMTP_HOST || SMTP_HOST === 'smtp.gmail.com';
  const port = useGmailStartTls ? 587 : Number(SMTP_PORT) || 587;
  mailer = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: useGmailStartTls ? false : SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    pool: true,
    maxConnections: 2,
    maxMessages: 100,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return mailer;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });
  try {
    const { name, email, message, attachment } = req.body || {};
    if (!name?.trim() || !email?.trim() || !message?.trim()) return res.status(400).json({ message: 'Name, email, and message are required.' });
    if (!emailPattern.test(email.trim())) return res.status(400).json({ message: 'Please provide a valid email address.' });
    if (attachment && (!attachment.filename || !attachment.content || !attachment.contentType)) return res.status(400).json({ message: 'The attached file is invalid.' });

    const transporter = createMailer();
    const contactMessage = { id: null };
    await transporter.sendMail({
      from: `Portfolio contact <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT || process.env.SMTP_USER,
      replyTo: email.trim(),
      subject: `Portfolio inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      attachments: attachment ? [{ filename: attachment.filename, content: Buffer.from(attachment.content, 'base64'), contentType: attachment.contentType }] : [],
    });
    if (mongoose.connection.readyState === 1) {
      ContactMessage.create({ name, email, message }).catch((error) => {
        console.error('Contact email sent, but the message could not be saved:', error);
      });
    }
    return res.status(201).json({ message: 'Thanks — your message has been sent.', id: contactMessage.id });
  } catch (error) {
    console.error('Contact form error:', error);
    if (error.code === 'EAUTH' || error.responseCode === 535) return res.status(502).json({ message: 'Email delivery is unavailable. Please try again later.' });
    return res.status(500).json({ message: error.message || 'Unable to send your message. Please try again later.' });
  }
}

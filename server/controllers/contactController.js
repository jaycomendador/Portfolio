const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let mailer;

function createMailer() {
  if (mailer) return mailer;
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;

  const useGmailStartTls = !SMTP_HOST || SMTP_HOST === 'smtp.gmail.com';
  const port = useGmailStartTls ? 587 : Number(SMTP_PORT) || 587;
  const options = {
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
  };

  mailer = nodemailer.createTransport({ ...options, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  return mailer;
}

async function createContactMessage(req, res, next) {
  try {
    const { name, email, message, attachment } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    if (attachment && (!attachment.filename || !attachment.content || !attachment.contentType)) {
      return res.status(400).json({ message: 'The attached file is invalid.' });
    }

    const transporter = createMailer();
    if (!transporter) {
      return res.status(503).json({
        message: 'Email delivery is not configured. Set SMTP_USER and SMTP_PASS in server/.env, then restart the server.',
      });
    }

    await transporter.sendMail({
      from: `Jay Comendador Portfolio <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT || 'jcomendador120@gmail.com',
      replyTo: email.trim(),
      subject: `Portfolio inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      attachments: attachment ? [{
        filename: attachment.filename,
        content: Buffer.from(attachment.content, 'base64'),
        contentType: attachment.contentType,
      }] : [],
    });

    // Email delivery is the contact form's primary action. Keep a dashboard
    // copy when MongoDB is available, but don't block delivery on the database.
    if (mongoose.connection.readyState === 1) {
      ContactMessage.create({ name, email, message }).catch((error) => {
        console.error('Contact email sent, but the message could not be saved:', error);
      });
    }

    return res.status(201).json({
      message: 'Thanks — your message has been sent.',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      return res.status(502).json({
        message: 'Email delivery is unavailable. The portfolio owner needs to update the Gmail App Password.',
      });
    }
    return next(error);
  }
}

async function listContactMessages(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database connection is currently unavailable.' });
    }
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100).lean();
    return res.json(messages);
  } catch (error) {
    return next(error);
  }
}

async function deleteContactMessage(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid message ID.' });
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'Database connection is currently unavailable.' });
    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Message not found.' });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}

module.exports = { createContactMessage, listContactMessages, deleteContactMessage };

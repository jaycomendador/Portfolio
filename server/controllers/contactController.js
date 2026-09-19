const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;

  if (SMTP_HOST) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
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

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database connection is currently unavailable. Please verify MONGODB_URI in server/.env.',
      });
    }

    const transporter = createMailer();
    if (!transporter) {
      return res.status(503).json({
        message: 'Email delivery is not configured. Set SMTP_USER and SMTP_PASS in server/.env, then restart the server.',
      });
    }

    const contactMessage = await ContactMessage.create({ name, email, message });
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

    return res.status(201).json({
      message: 'Thanks — your message has been sent.',
      id: contactMessage.id,
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

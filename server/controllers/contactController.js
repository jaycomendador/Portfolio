const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createMailer() {
  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function createContactMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    const transporter = createMailer();
    if (!transporter) {
      return res.status(503).json({ message: 'Email delivery is not configured yet.' });
    }

    const contactMessage = await ContactMessage.create({ name, email, message });
    await transporter.sendMail({
      from: `Jay Comendador Portfolio <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT || 'jcomendador120@gmail.com',
      replyTo: email.trim(),
      subject: `Portfolio inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    });

    return res.status(201).json({
      message: 'Thanks — your message has been sent.',
      id: contactMessage.id,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
}

module.exports = { createContactMessage };

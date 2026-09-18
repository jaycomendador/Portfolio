require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDatabase = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
}));
app.use(express.json({ limit: '6mb' }));

app.get('/api/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.use('/api/contact', contactRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'An unexpected error occurred.',
  });
});

async function startServer() {
  try {
    await connectDatabase();
    const server = app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });

    const shutdown = () => server.close(() => mongoose.connection.close());
    process.once('SIGINT', shutdown);
    process.once('SIGTERM', shutdown);
  } catch (error) {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  }
}

startServer();

module.exports = app;

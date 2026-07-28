const mongoose = require('mongoose');
const dns = require('node:dns');

async function connectDatabase() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured. Add it to server/.env.');
  }

  // Atlas connection strings use DNS SRV records. Some local/ISP DNS servers
  // block those lookups, so allow a dependable resolver to be configured.
  if (MONGODB_URI.startsWith('mongodb+srv://')) {
    const dnsServers = (process.env.MONGODB_DNS_SERVERS || '1.1.1.1,8.8.8.8')
      .split(',')
      .map((server) => server.trim())
      .filter(Boolean);
    dns.setServers(dnsServers);
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || /querySrv/i.test(error.message)) {
      error.message = `MongoDB Atlas DNS lookup failed. Check your internet/DNS connection or set MONGODB_DNS_SERVERS in server/.env. Original error: ${error.message}`;
    }
    const serverErrors = error.reason?.servers
      ? [...error.reason.servers.values()].map((server) => server.error?.message).filter(Boolean)
      : [];
    if (serverErrors.length) {
      error.message += ` Node details: ${serverErrors.join(' | ')}`;
    }
    throw error;
  }
  console.log(`Connected to MongoDB: ${mongoose.connection.host}`);
}

module.exports = connectDatabase;

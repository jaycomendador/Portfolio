const mongoose = require('mongoose');
const dns = require('node:dns');

async function connectDatabase() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI is not configured in server/.env.');
    return false;
  }

  // Atlas connection strings use DNS SRV records. Some local/ISP DNS servers
  // block those lookups, so allow a dependable resolver to be configured.
  if (MONGODB_URI.startsWith('mongodb+srv://')) {
    const dnsServers = (process.env.MONGODB_DNS_SERVERS || '1.1.1.1,8.8.8.8')
      .split(',')
      .map((server) => server.trim())
      .filter(Boolean);
    try {
      dns.setServers(dnsServers);
    } catch (dnsErr) {
      console.warn(`⚠️  Failed to set custom DNS servers: ${dnsErr.message}`);
    }
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      tlsAllowInvalidCertificates: true,
    });
    console.log(`✅ Connected to MongoDB: ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}`);
    console.warn('ℹ️  Server will continue running. Update MONGODB_URI in server/.env to resolve database connectivity.');
    return false;
  }
}

module.exports = connectDatabase;

import mongoose from 'mongoose';

const connectionCache = globalThis.__portfolioMongo || (globalThis.__portfolioMongo = {});
let portfolioModel = mongoose.models.PortfolioRecord;

function getPortfolioModel() {
  if (!portfolioModel) {
    const schema = new mongoose.Schema({
      key: { type: String, required: true, unique: true, default: 'primary' },
      content: { type: mongoose.Schema.Types.Mixed, default: {} },
      projects: { type: [mongoose.Schema.Types.Mixed], default: [] },
      certificates: { type: [mongoose.Schema.Types.Mixed], default: [] },
    }, { timestamps: true, minimize: false });
    portfolioModel = mongoose.model('PortfolioRecord', schema);
  }
  return portfolioModel;
}

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGODB_URI) {
    const error = new Error('Portfolio storage is not configured. Set MONGODB_URI in the deployment environment.');
    error.status = 503;
    throw error;
  }
  if (!connectionCache.promise) {
    connectionCache.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    }).catch((error) => {
      connectionCache.promise = null;
      throw error;
    });
  }
  await connectionCache.promise;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'PUT') {
    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  try {
    await connectDatabase();
    const PortfolioRecord = getPortfolioModel();

    if (req.method === 'GET') {
      const record = await PortfolioRecord.findOne({ key: 'primary' }).lean();
      if (!record) return res.status(200).json({ initialized: false, storage: 'mongodb' });
      return res.status(200).json({
        initialized: true,
        content: record.content || {},
        projects: Array.isArray(record.projects) ? record.projects : [],
        certificates: Array.isArray(record.certificates) ? record.certificates : [],
        updatedAt: record.updatedAt || null,
        storage: 'mongodb',
      });
    }

    const { content, projects } = req.body || {};
    const certificates = Array.isArray(req.body?.certificates) ? req.body.certificates : [];
    if (!content || typeof content !== 'object' || Array.isArray(content) || !Array.isArray(projects)) {
      return res.status(400).json({ message: 'Provide portfolio content and a projects array.' });
    }
    const record = await PortfolioRecord.findOneAndUpdate(
      { key: 'primary' },
      { $set: { content, projects, certificates } },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
    ).lean();
    return res.status(200).json({
      initialized: true,
      content: record.content || {},
      projects: Array.isArray(record.projects) ? record.projects : [],
      certificates: Array.isArray(record.certificates) ? record.certificates : [],
      updatedAt: record.updatedAt || null,
      storage: 'mongodb',
    });
  } catch (error) {
    console.error('Portfolio API failed:', error.message);
    return res.status(error.status || 503).json({
      message: error.status === 503 ? error.message : 'Portfolio storage is temporarily unavailable.',
    });
  }
}

const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const mongoose = require('mongoose');
const PortfolioRecord = require('../models/PortfolioRecord');

const dataDirectory = path.join(__dirname, '..', 'data');
const localRecordPath = path.join(dataDirectory, 'portfolio.json');

async function readLocalRecord() {
  try {
    return JSON.parse(await fs.readFile(localRecordPath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function writeLocalRecord(record) {
  await fs.mkdir(dataDirectory, { recursive: true });
  const temporaryPath = `${localRecordPath}.${randomUUID()}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(record, null, 2), 'utf8');
  await fs.rename(temporaryPath, localRecordPath);
}

function serializeRecord(record) {
  return {
    initialized: true,
    content: record.content || {},
    projects: Array.isArray(record.projects) ? record.projects : [],
    certificates: Array.isArray(record.certificates) ? record.certificates : [],
    updatedAt: record.updatedAt || record.savedAt || null,
    storage: 'server-file',
  };
}

async function getPortfolioRecord(_req, res, next) {
  try {
    const localRecord = await readLocalRecord();
    if (mongoose.connection.readyState === 1) {
      try {
        const databaseRecord = await PortfolioRecord.findOne({ key: 'primary' }).lean();
        if (databaseRecord) {
          const databaseDate = new Date(databaseRecord.updatedAt || 0).getTime();
          const localDate = new Date(localRecord?.updatedAt || 0).getTime();
          if (!localRecord || databaseDate >= localDate) {
            const response = serializeRecord({ ...databaseRecord, storage: 'mongodb' });
            response.storage = 'mongodb';
            await writeLocalRecord(response);
            return res.json(response);
          }
          await PortfolioRecord.findOneAndUpdate(
            { key: 'primary' },
            { $set: { content: localRecord.content, projects: localRecord.projects, certificates: localRecord.certificates || [] } },
            { upsert: true, new: true, setDefaultsOnInsert: true },
          );
          return res.json(localRecord);
        }
        if (!localRecord) return res.json({ initialized: false, storage: 'mongodb' });
        await PortfolioRecord.findOneAndUpdate(
          { key: 'primary' },
          { $set: { content: localRecord.content, projects: localRecord.projects, certificates: localRecord.certificates || [] } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
        return res.json(localRecord);
      } catch (error) {
        console.error(`Portfolio database read failed; using server file: ${error.message}`);
      }
    }
    return res.json(localRecord || { initialized: false, storage: 'server-file' });
  } catch (error) {
    next(error);
  }
}

async function savePortfolioRecord(req, res, next) {
  try {
    const { content, projects } = req.body || {};
    const certificates = Array.isArray(req.body?.certificates) ? req.body.certificates : [];
    if (!content || typeof content !== 'object' || Array.isArray(content) || !Array.isArray(projects)) {
      return res.status(400).json({ message: 'Provide portfolio content and a projects array.' });
    }

    const record = {
      initialized: true,
      content,
      projects,
      certificates,
      updatedAt: new Date().toISOString(),
      storage: 'server-file',
    };
    await writeLocalRecord(record);

    if (mongoose.connection.readyState === 1) {
      try {
        await PortfolioRecord.findOneAndUpdate(
          { key: 'primary' },
          { $set: { content, projects, certificates } },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );
        record.storage = 'mongodb';
        await writeLocalRecord(record);
      } catch (error) {
        console.error(`Portfolio database write failed; saved to server file: ${error.message}`);
      }
    }
    return res.json(record);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getPortfolioRecord, savePortfolioRecord };

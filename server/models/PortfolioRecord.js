const mongoose = require('mongoose');

const portfolioRecordSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'primary' },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  projects: { type: [mongoose.Schema.Types.Mixed], default: [] },
}, { timestamps: true, minimize: false });

module.exports = mongoose.model('PortfolioRecord', portfolioRecordSchema);

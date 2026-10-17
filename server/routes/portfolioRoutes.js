const express = require('express');
const { getPortfolioRecord, savePortfolioRecord } = require('../controllers/portfolioController');

const router = express.Router();

router.get('/', getPortfolioRecord);
router.put('/', savePortfolioRecord);

module.exports = router;

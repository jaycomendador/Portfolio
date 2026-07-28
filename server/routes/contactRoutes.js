const express = require('express');
const { createContactMessage } = require('../controllers/contactController');

const router = express.Router();

router.post('/', createContactMessage);

module.exports = router;

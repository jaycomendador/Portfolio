const express = require('express');
const { createContactMessage, listContactMessages, deleteContactMessage } = require('../controllers/contactController');

const router = express.Router();

router.get('/', listContactMessages);
router.post('/', createContactMessage);
router.delete('/:id', deleteContactMessage);

module.exports = router;

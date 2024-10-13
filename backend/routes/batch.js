// Handles batch processing requests

const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController.js');

router.post('/', batchController.processBatch);

module.exports = router;
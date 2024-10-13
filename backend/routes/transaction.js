// Handles transaction retrieval requests

const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController.js');

router.get('/:txHash', transactionController.getTransactionByHash);
router.get('/', transactionController.getTransactionsByTimeRange);

module.exports = router;
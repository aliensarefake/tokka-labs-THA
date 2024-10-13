const transactionService = require('../services/transactionService.js');

exports.getTransactionByHash = async (req, res) => {
  try {
    const txHash = req.params.txHash;
    const transaction = await transactionService.findTransactionByHash(txHash);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTransactionsByTimeRange = async (req, res) => {
  try {
    const { startTime, endTime } = req.query;
    const transactions = await transactionService.findTransactionsByTimeRange(startTime, endTime);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

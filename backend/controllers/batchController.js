const batchService = require('../services/batchService.js');

exports.processBatch = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    const transactions = await batchService.fetchAndStoreTransactions(startTime, endTime);
    res.status(200).json({ message: 'Batch processing completed', transactions });
  } catch (error) {
    console.error('Batch processing error:', error);
    res.status(500).json({ error: 'Batch processing failed' });
  }
};

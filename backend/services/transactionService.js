const Transaction = require('../models/Transaction.js');

exports.findTransactionByHash = async (txHash) => {
  return await Transaction.findOne({ txHash });
};

exports.findTransactionsByTimeRange = async (startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  return await Transaction.find({
    timestamp: { $gte: startDate, $lte: endDate },
  });
};
const Transaction = require('../models/Transaction.js');

exports.findTransactionByHash = async (txHash) => {
  return await Transaction.findOne({ txHash });
};

exports.findTransactionsByTimeRange = async (startTime, endTime) => {
  const decodedStartTime = decodeURIComponent(startTime); 
  const decodedEndTime = decodeURIComponent(endTime);     

  const startDate = new Date(`${decodedStartTime}:00.000Z`); 
  let endDate = new Date(`${decodedEndTime}:00.000Z`);      

  // adjust to the next full minute
  endDate.setMinutes(endDate.getMinutes() + 1);

  return await Transaction.find({
    timestamp: { $gte: startDate, $lt: endDate },
  });
};
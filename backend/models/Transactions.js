const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  txHash: { type: String, unique: true, required: true },
  fromAddress: String,
  toAddress: String,
  txFeeUSDT: Number,
  txFeeETH: Number,
  timestamp: Date,
});

module.exports = mongoose.model('Transaction', transactionSchema);

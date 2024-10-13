const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  totalTxFeeUSDT: { type: Number, default: 0 },
  totalTxFeeETH: { type: Number, default: 0 },
}, { collection: 'statistics' });

module.exports = mongoose.model('Statistics', statisticsSchema);
const Statistics = require('../models/Statistics');

exports.getStatistics = async (req, res) => {
  try {
    const statistics = await Statistics.findOne();
    
    if (!statistics) {
      return res.status(404).json({ message: 'Statistics not found' });
    }

    res.status(200).json({
      totalTxFeeUSDT: statistics.totalTxFeeUSDT,
      totalTxFeeETH: statistics.totalTxFeeETH,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

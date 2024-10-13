const axios = require('axios');
const Transaction = require('../models/Transaction.js');
const Statistics = require('../models/Statistics.js');
const priceService = require('./priceService.js');
const config = require('config.js');
const helpers = require('../utils/helpers.js');

const etherscanApiKey = config.get('ETHERSCAN_API_KEY');
const uniswapPoolAddress = config.get('UNISWAP_POOL_ADDRESS');

exports.fetchAndStoreTransactions = async (startTime, endTime) => {
  // Convert times to Unix timestamps
  const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
  const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);

  // Fetch block numbers corresponding to timestamps
  const startBlock = await helpers.getBlockNumberByTimestamp(startTimestamp);
  const endBlock = await helpers.getBlockNumberByTimestamp(endTimestamp);

  // Fetch transactions from Etherscan API
  const transactions = await fetchTransactionsFromEtherscan(startBlock, endBlock);

  // Process and store transactions
  const processedTransactions = await processTransactions(transactions);

  return processedTransactions;
};

async function fetchTransactionsFromEtherscan(startBlock, endBlock) {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${uniswapPoolAddress}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${etherscanApiKey}`;

  const response = await axios.get(url);
  if (response.data.status !== '1') {
    throw new Error('Failed to fetch transactions from Etherscan');
  }
  return response.data.result;
}

async function processTransactions(transactions) {
  const ethPrice = await priceService.getCurrentETHUSDTPrice();
  const processedTransactions = [];
  let totalTxFeeETH = 0;
  let totalTxFeeUSDT = 0;

  for (const tx of transactions) {
    const txExists = await Transaction.findOne({ txHash: tx.hash });
    if (!txExists) {
      const txFeeETH = helpers.calculateTransactionFeeETH(tx.gasUsed, tx.gasPrice);
      const txFeeUSDT = txFeeETH * ethPrice;

      const transaction = new Transaction({
        txHash: tx.hash,
        fromAddress: tx.from,
        toAddress: tx.to,
        txFeeETH,
        txFeeUSDT,
        timestamp: new Date(tx.timeStamp * 1000),
      });

      await transaction.save();
      processedTransactions.push(transaction);

      totalTxFeeETH += txFeeETH;
      totalTxFeeUSDT += txFeeUSDT;
    }
  }

  // Update total transaction fees in statistics
  await updateStatistics(totalTxFeeETH, totalTxFeeUSDT);

  return processedTransactions;
}

async function updateStatistics(txFeeETH, txFeeUSDT) {
  const statistics = await Statistics.findOne();
  if (statistics) {
    statistics.totalTxFeeETH += txFeeETH;
    statistics.totalTxFeeUSDT += txFeeUSDT;
    await statistics.save();
  } else {
    const newStatistics = new Statistics({
      totalTxFeeETH: txFeeETH,
      totalTxFeeUSDT: txFeeUSDT,
    });
    await newStatistics.save();
  }
}

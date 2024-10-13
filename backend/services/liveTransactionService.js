const Web3 = require('web3');
const Transaction = require('../models/Transaction.js');
const Statistics = require('../models/Statistics.js');
const priceService = require('./priceService.js');
const config = require('config');
const helpers = require('../utils/helpers.js');

const alchemyApiKey = config.get('ALCHEMY_API_KEY');
const uniswapPoolAddress = config.get('UNISWAP_POOL_ADDRESS');
const web3 = new Web3(`wss://eth-mainnet.ws.alchemyapi.io/v2/${alchemyApiKey}`);

const uniswapAbi = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "sender", "type": "address" },
      { "indexed": false, "name": "recipient", "type": "address" },
      { "indexed": true, "name": "amount0", "type": "int256" },
      { "indexed": true, "name": "amount1", "type": "int256" },
      { "indexed": true, "name": "sqrtPriceX96", "type": "uint160" },
      { "indexed": true, "name": "liquidity", "type": "uint128" },
      { "indexed": true, "name": "tick", "type": "int24" }
    ],
    "name": "Swap",
    "type": "event"
  }
];

exports.startLiveTransactionListener = async () => {
  const contract = new web3.eth.Contract(uniswapAbi, uniswapPoolAddress);

  contract.events.Swap({}, async (error, event) => {
    if (error) {
      console.error('Error in event subscription:', error);
      return;
    }
    
    await processTransaction(event);
  });
};

async function processTransaction(event) {
  try {
    const ethPrice = await priceService.getCurrentETHUSDTPrice();

    const txHash = event.transactionHash;
    const txExists = await Transaction.findOne({ txHash });
    if (txExists) return; // skip if alrd processed

    const txReceipt = await web3.eth.getTransactionReceipt(txHash);
    const tx = await web3.eth.getTransaction(txHash);

    const txFeeETH = helpers.calculateTransactionFeeETH(txReceipt.gasUsed, tx.gasPrice);
    const txFeeUSDT = txFeeETH * ethPrice;

    const transaction = new Transaction({
      txHash,
      fromAddress: tx.from,
      toAddress: tx.to,
      txFeeETH,
      txFeeUSDT,
      timestamp: new Date(), 
    });

    await transaction.save();

    await updateStatistics(txFeeETH, txFeeUSDT);
  } catch (error) {
    console.error('Error processing live transaction:', error);
  }
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

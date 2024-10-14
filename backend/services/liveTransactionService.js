const { ethers } = require('ethers');
const { Web3 } = require('web3');
const Transaction = require('../models/Transaction.js');
const Statistics = require('../models/Statistics.js');
const priceService = require('./priceService.js');
const config = require('config');
const helpers = require('../utils/helpers.js');

const infuraProjectId = config.get('INFURA_API_KEY');
const uniswapPoolAddress = config.get('UNISWAP_POOL_ADDRESS');

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`, {
    reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 5,
        onTimeout: false
    }
});
const provider = new ethers.WebSocketProvider(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);

const uniswapAbi = [
  'event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)'
];

exports.startLiveTransactionListener = async () => {
    const contract = new ethers.Contract(uniswapPoolAddress, uniswapAbi, provider);
  
    contract.on('Swap', async (...args) => {
      const event = args[args.length - 1]; 
      console.log('Swap event received:', event);
  
      await processTransaction(event);
    });
};

async function processTransaction(event) {
  try {
    const ethPrice = await priceService.getCurrentETHUSDTPrice();

    const txHash = event.log.transactionHash;
    if (!txHash) {
        throw new Error('Transaction hash is undefined.');
      }

    const txExists = await Transaction.findOne({ txHash });
    if (txExists) return; // skip if alrd processed

    const txReceipt = await provider.getTransactionReceipt(txHash);
    const tx = await provider.getTransaction(txHash);

    if (!tx || !txReceipt) {
        throw new Error(`Transaction or receipt not found for hash: ${txHash}`);
      }

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
    console.log('updated transaction');

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
    console.log('updated statistics');

  }
}

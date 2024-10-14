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

const uniswapAbi = [
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "name": "sender", "type": "address" },
        { "indexed": false, "name": "recipient", "type": "address" },
        { "indexed": false, "name": "amount0", "type": "int256" },
        { "indexed": false, "name": "amount1", "type": "int256" },
        { "indexed": false, "name": "sqrtPriceX96", "type": "uint160" },
        { "indexed": false, "name": "liquidity", "type": "uint128" },
        { "indexed": false, "name": "tick", "type": "int24" }
      ],
      "name": "Swap",
      "type": "event"
    }
  ];

exports.startLiveTransactionListener = async () => {
    const contract = new web3.eth.Contract(uniswapAbi, uniswapPoolAddress);

    web3.currentProvider.on('connect', () => {
        console.log('WebSocket connection established.');
    });

    web3.currentProvider.on('error', (error) => {
        console.error('WebSocket connection error:', error);
    });

    web3.currentProvider.on('close', (event) => {
        console.log('WebSocket connection closed:', event);
    });

    contract.events.Swap({ fromBlock: 'latest' }, async (error, event) => {
        if (error) {
            console.error('Error in Swap event subscription:', error);
            return;
        }
        console.log('Swap event received:', event);
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

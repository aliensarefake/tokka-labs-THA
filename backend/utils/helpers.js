const axios = require('axios');
const config = require('config');
const etherscanApiKey = config.get('ETHERSCAN_API_KEY');

exports.calculateTransactionFeeETH = (gasUsed, gasPrice) => {
  const gasUsedBN = BigInt(gasUsed);
  const gasPriceBN = BigInt(gasPrice);
  const txFeeWei = gasUsedBN * gasPriceBN;
  const txFeeETH = Number(txFeeWei) / 1e18; // Convert Wei to ETH
  return txFeeETH;
};

exports.getBlockNumberByTimestamp = async (timestamp) => {
  const url = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${etherscanApiKey}`;
  const response = await axios.get(url);
  if (response.data.status !== '1') {
    throw new Error('Failed to fetch block number by timestamp');
  }
  return response.data.result;
};
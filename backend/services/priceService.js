const axios = require('axios');
const binanceApiUrl = 'https://api.binance.com';

exports.getCurrentETHUSDTPrice = async () => {
  const response = await axios.get(`${binanceApiUrl}/api/v3/ticker/price`, {
    params: { symbol: 'ETHUSDT' },
  });
  return Number(response.data.price);
};
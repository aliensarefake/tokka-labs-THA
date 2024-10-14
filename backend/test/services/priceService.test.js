const assert = require('assert');
const sinon = require('sinon');
const priceService = require('../../services/priceService');
const axios = require('axios');

describe('priceService', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getCurrentETHUSDTPrice', function () {
    it('should return current ETH/USDT price', async function () {
      const mockPrice = 3000;

      sinon.stub(axios, 'get').resolves({
        data: {
          price: mockPrice.toString(),
        },
      });

      const price = await priceService.getCurrentETHUSDTPrice();

      assert.strictEqual(price, mockPrice);
      assert(axios.get.calledOnce);
    });

    it('should throw an error if API call fails', async function () {
      sinon.stub(axios, 'get').rejects(new Error('API error'));

      try {
        await priceService.getCurrentETHUSDTPrice();
        assert.fail('Expected error was not thrown');
      } catch (error) {
        assert.strictEqual(error.message, 'API error');
      }
    });
  });
});

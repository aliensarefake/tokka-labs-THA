// test/utils/helpers.test.js
const assert = require('assert');
const helpers = require('../../utils/helpers');
const axios = require('axios');
const sinon = require('sinon');
const config = require('config');

describe('helpers', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    describe('getBlockNumberByTimestamp', function () {
      it('should return block number for a given timestamp', async function () {
        const timestamp = 1630454400;
        const mockBlockNumber = 1000000; 
  
        sinon.stub(axios, 'get').resolves({
          data: {
            status: '1', // success
            result: mockBlockNumber,
          },
        });
  
        const blockNumber = await helpers.getBlockNumberByTimestamp(timestamp);
  
        assert.strictEqual(blockNumber, mockBlockNumber);
  
        assert(
          axios.get.calledOnceWith(
            `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${config.get(
              'ETHERSCAN_API_KEY'
            )}`
          )
        );
      });
  
      it('should throw an error if API call fails', async function () {
        const timestamp = 1630454400;
  
        sinon.stub(axios, 'get').resolves({
          data: {
            status: '0',
            message: 'Error',
          },
        });
  
        try {
          await helpers.getBlockNumberByTimestamp(timestamp);
          assert.fail('Expected error was not thrown');
        } catch (error) {
          assert.strictEqual(
            error.message,
            'Failed to fetch block number by timestamp'
          );
        }
      });
    });
  });
  

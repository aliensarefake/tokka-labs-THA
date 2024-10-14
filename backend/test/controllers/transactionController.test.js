const assert = require('assert');
const sinon = require('sinon');
const transactionController = require('../../controllers/transactionController');
const transactionService = require('../../services/transactionService');

describe('transactionController', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getTransactionByHash', function () {
    it('should return transaction if found', async function () {
      const req = { params: { txHash: '0x123abc' } };
      const res = {
        json: function (data) {
          this.data = data;
        },
      };

      const mockTransaction = { txHash: '0x123abc' };

      sinon
        .stub(transactionService, 'findTransactionByHash')
        .resolves(mockTransaction);

      await transactionController.getTransactionByHash(req, res);

      assert.deepStrictEqual(res.data, mockTransaction);
    });

    it('should return 404 if transaction not found', async function () {
      const req = { params: { txHash: '0xnonexistent' } };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.data = data;
        },
      };

      sinon
        .stub(transactionService, 'findTransactionByHash')
        .resolves(null);

      await transactionController.getTransactionByHash(req, res);

      assert.strictEqual(res.statusCode, 404);
      assert.deepStrictEqual(res.data, { error: 'Transaction not found' });
    });

    it('should handle internal server errors', async function () {
      const req = { params: { txHash: '0x123abc' } };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.data = data;
        },
      };

      sinon
        .stub(transactionService, 'findTransactionByHash')
        .throws(new Error('Database error'));

      await transactionController.getTransactionByHash(req, res);

      assert.strictEqual(res.statusCode, 500);
      assert.deepStrictEqual(res.data, { error: 'Internal server error' });
    });
  });

  describe('getTransactionsByTimeRange', function () {
    it('should return transactions within time range', async function () {
      const req = {
        query: {
          startTime: '2021-09-01T00:00:00Z',
          endTime: '2021-09-30T23:59:59Z',
        },
      };
      const res = {
        json: function (data) {
          this.data = data;
        },
      };

      const mockTransactions = [{ txHash: '0x123abc' }];

      sinon
        .stub(transactionService, 'findTransactionsByTimeRange')
        .resolves(mockTransactions);

      await transactionController.getTransactionsByTimeRange(req, res);

      assert.deepStrictEqual(res.data, mockTransactions);
    });

    it('should handle errors', async function () {
      const req = { query: {} };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.data = data;
        },
      };

      sinon
        .stub(transactionService, 'findTransactionsByTimeRange')
        .throws(new Error('Database error'));

      await transactionController.getTransactionsByTimeRange(req, res);

      assert.strictEqual(res.statusCode, 500);
      assert.deepStrictEqual(res.data, { error: 'Internal server error' });
    });
  });
});

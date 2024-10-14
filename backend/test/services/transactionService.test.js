const assert = require('assert');
const sinon = require('sinon');
const transactionService = require('../../services/transactionService');
const Transaction = require('../../models/Transaction');

describe('transactionService', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('findTransactionByHash', function () {
    it('should return transaction if found', async function () {
      const txHash = '0x123abc';
      const mockTransaction = { txHash };

      sinon.stub(Transaction, 'findOne').resolves(mockTransaction);

      const result = await transactionService.findTransactionByHash(txHash);

      assert(Transaction.findOne.calledOnceWith({ txHash }));
      assert.strictEqual(result, mockTransaction);
    });

    it('should return null if transaction not found', async function () {
      const txHash = '0xnonexistent';

      sinon.stub(Transaction, 'findOne').resolves(null);

      const result = await transactionService.findTransactionByHash(txHash);

      assert(Transaction.findOne.calledOnceWith({ txHash }));
      assert.strictEqual(result, null);
    });
  });

  describe('findTransactionsByTimeRange', function () {
    it('should return transactions within time range', async function () {
      const startTime = '2021-09-01T00:00:00Z';
      const endTime = '2021-09-30T23:59:59Z';

      const mockTransactions = [{ txHash: '0x123abc' }];

      sinon.stub(Transaction, 'find').resolves(mockTransactions);

      const result = await transactionService.findTransactionsByTimeRange(
        startTime,
        endTime
      );

      assert(
        Transaction.find.calledOnceWith({
          timestamp: {
            $gte: new Date(startTime),
            $lte: new Date(endTime),
          },
        })
      );
      assert.strictEqual(result, mockTransactions);
    });
  });
});

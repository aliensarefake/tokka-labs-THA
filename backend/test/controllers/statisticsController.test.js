const assert = require('assert');
const sinon = require('sinon');
const statisticsController = require('../../controllers/statisticsController');
const Statistics = require('../../models/Statistics');

describe('statisticsController', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getStatistics', function () {
    it('should return statistics if found', async function () {
      const req = {};
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.data = data;
        },
      };

      const mockStatistics = {
        totalTxFeeUSDT: 1000,
        totalTxFeeETH: 0.5,
      };

      sinon.stub(Statistics, 'findOne').resolves(mockStatistics);

      await statisticsController.getStatistics(req, res);

      assert.strictEqual(res.statusCode, 200);
      assert.deepStrictEqual(res.data, mockStatistics);
    });

    it('should return 404 if statistics not found', async function () {
      const req = {};
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.data = data;
        },
      };

      sinon.stub(Statistics, 'findOne').resolves(null);

      await statisticsController.getStatistics(req, res);

      assert.strictEqual(res.statusCode, 404);
      assert.deepStrictEqual(res.data, { message: 'Statistics not found' });
    });

    it('should handle server errors', async function () {
      const req = {};
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
        .stub(Statistics, 'findOne')
        .throws(new Error('Database connection error'));

      await statisticsController.getStatistics(req, res);

      assert.strictEqual(res.statusCode, 500);
      assert.strictEqual(res.data.message, 'Server error');
      assert.strictEqual(res.data.error, 'Database connection error');
    });
  });
});

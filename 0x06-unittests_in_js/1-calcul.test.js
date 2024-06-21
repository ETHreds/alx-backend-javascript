const assert = require('assert');
const calculateNumber = require('./1-calcul');
const { describe, it } = require('mocha');

describe('calculateNumber', () => {
  describe('SUM OP', () => {
    it('round the numbers and add', () => {
      assert.equal(calculateNumber('SUM', 15.78, 2), 18);
    });

    it('rounding and addition with zero', () => {
      assert.equal(calculateNumber('SUM', 1.2, 0), 1);
    });
  })
  describe('SUBTRACT OP', () => {
    it('round the numers and substract', () => {
      assert.equal(calculateNumber('SUBTRACT', 15.78, 2), 14)
    });
    it('rounding and subtraction resulting to negative', () => {
      assert.equal(calculateNumber('SUBTRACT', 1.2, 3), -2);
    });

  })
  describe('DIVIDE  OP', () => {
    it('round the numbers and divide', () => {
      assert.equal(calculateNumber('DIVIDE', 15.48, 2.1), 7.5);
    });

    it('division where the result is a fraction', () => {
      assert.equal(calculateNumber('DIVIDE', 3, 2), 1.5);
    });

    it(' division by zero', () => {
      assert.equal(calculateNumber('DIVIDE', 10, 0), 'Error');
    });
  });

})
const assert = require('chai').assert
const Monopoly = require('../app/monopoly')

const monopolyStartParams = { boardCells: 40, maxRound: 20, totalPlayers: 4};

describe('Monopoly', function () {
  it('should pass', function () {
    assert.isTrue(true)
  })

  it('should reorder an array', function(){
    let monopoly = new Monopoly(monopolyStartParams);
    const reorderedArray = monopoly.randomOrderPlayers([1,2,3,4]);
    assert.notDeepEqual([1,2,3,4], reorderedArray);
  })

  it('should return an integer between 2 an 12', function(){
    let monopoly = new Monopoly(monopolyStartParams);
    const diceSum = monopoly.rollDice();
    assert.isBelow(diceSum, 13);
    assert.isBelow(1, diceSum);
  })
})

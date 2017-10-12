const assert = require('chai').assert
const Player = require('../app/player')

const playerStartParams = { id: 1 }

describe('Player', function () {
  it('should pass', function () {
    assert.isTrue(true)
  })

  it('should return cell 8', function(){
    let player = new Player(playerStartParams);
    const nextPosition = player.movePlayer(7, 40);
    assert.equal(nextPosition, 8);
  })

  it('should return cell 40', function(){
    let player = new Player(playerStartParams);
    player.position = 36;
    const nextPosition = player.movePlayer(4, 40);
    assert.equal(nextPosition, 40);
  })

  it('should return cell 2', function(){
    let player = new Player(playerStartParams);
    player.position = 36;
    const nextPosition = player.movePlayer(6, 40);
    assert.equal(nextPosition, 2);
  })
})

class Player {
  constructor( { id }) {
    this.id = 'player-' + id;
    this.name = 'Player ' + id;
    this.position = 1;
  }

  movePlayer(diceSum, boardCells) {
    let nextPosition = (this.position + diceSum) % boardCells;
    nextPosition = nextPosition === 0 ? boardCells : nextPosition;
    this.position = nextPosition;
    return nextPosition;
  }

  moveDomPlayer(diceSum, turn) {
    const playerEl = document.getElementById(this.id);
    const newCell = document.getElementById('monopoly-cell-' + this.position);
    const message = `Move ${turn + 1} - ${this.name} rolled dice and got ${diceSum}. This brings him to cell ${this.position}`;
    newCell.appendChild(playerEl);
    return message;
  }
}

if (typeof module !== 'undefined') {
    module.exports = Player;
}
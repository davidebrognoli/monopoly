class Monopoly {
    constructor({ boardCells, maxRound, totalPlayers }) {
      this.boardCells = boardCells;
      this.maxRound = maxRound;
      this.totalPlayers = totalPlayers;
      this.currentPlayer = null;
      this.turn = 0;
    }
  
    init() {
      this.players = [];
      for (let i = 0; i < this.totalPlayers; i++) {
        let player = new Player({ id: i + 1 });
        this.players.push(player);
      }
      this.players = this.randomOrderPlayers(this.players);
      this.currentPlayer = this.players[0];
      this.writeLog('Start Game');
      this.showPlayersOrder();
      this.showCurrentPlayer();
      this.showRollButton();
      this.showCurrentTurn(1);
    }
  
    randomOrderPlayers(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    showPlayersOrder() {
      const playersOrder = document.getElementById('players-order');
      playersOrder.innerText = this.players.map(p => p.name).join(', ');
    }
  
    showCurrentPlayer() {
      const currentPlayer = document.getElementById('current-player');
      const roundPlayer = this.currentPlayer;
      const msg = roundPlayer ? roundPlayer.name : '';
      currentPlayer.innerText = msg;
    }
  
    showCurrentTurn(turn = null) {
      turn = turn ? turn : this.turn;
      let currentTurn = Math.ceil((turn + 1) / this.totalPlayers);
      currentTurn = currentTurn < maxRound ? currentTurn : maxRound;
      const roundCounter = document.getElementById('round-counter');
      roundCounter.innerText = currentTurn;
    }
  
    showRollButton() {
      startButton.style.display = 'none';
      rollButton.style.display = 'block';
    }
  
    incrementTurn() {
      this.turn = this.turn + 1;
      const maxTurns = this.maxRound * this.totalPlayers;
      if (this.turn < maxTurns) {
        const playerIndex = this.turn % this.totalPlayers;
        this.currentPlayer = this.players[playerIndex];
        this.showCurrentPlayer();
      } else {
        this.currentPlayer = null;
        this.showCurrentPlayer();
        rollButton.style.display = 'none';
        this.writeLog('End of Game');
      }
    }
  
    generateRandomDie() {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      return randomNumber;
    }
  
    rollDice() {
      const firstDie = this.generateRandomDie(),
        secondDie = this.generateRandomDie();
      return firstDie + secondDie;
    }
  
    runGame() {
      this.showCurrentTurn(this.turn + 1);
      const diceSum = this.rollDice();
      const currentPlayer = this.currentPlayer;
      currentPlayer.movePlayer(diceSum, this.boardCells);
      const msg = currentPlayer.moveDomPlayer(diceSum, this.turn);
      this.writeLog(msg);
      this.incrementTurn();
    }
  
    writeLog(message) {
      const now = new Date;
      const cr = "\r\n";
      const msg = `${now.toLocaleString()} - ${message}${cr}`;
      const logArea = document.getElementById('monopoly-log');
      logArea.prepend(msg);
    }
  }
  
  if (typeof module !== 'undefined') {
    module.exports = Monopoly;
  }
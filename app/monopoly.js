class Monopoly {
    constructor({ 
      boardCells, 
      maxRound, 
      totalPlayers,
      playersOrderID = 'players-order',
      currentPlayerID = 'current-player',
      logAreaID = 'monopoly-log',
      roundCounterID = 'round-counter',
    }) {
      this.boardCells = boardCells;
      this.maxRound = maxRound;
      this.totalPlayers = totalPlayers;
      this.currentPlayer = null;
      this.turn = 0;
      this.currentPlayerID = currentPlayerID;
      this.logAreaID = logAreaID;
      this.playersOrderID = playersOrderID;
      this.roundCounterID = roundCounterID;
      this.currentPlayerEl = null;
      this.logArea = null;
      this.playersOrder = null;
      this.roundCounter = null; 
    }
  
    init() {
      this.currentPlayerEl = document.getElementById(this.currentPlayerID);
      this.logArea = document.getElementById(this.logAreaID);
      this.playersOrder = document.getElementById(this.playersOrderID);
      this.roundCounter = document.getElementById(this.roundCounterID); 
      this.players = [];
      for (let i = 0; i < this.totalPlayers; i++) {
        let player = new Player({ id: i + 1 });
        this.players.push(player);
      }
      this.players = this._randomOrderPlayers(this.players);
      this.currentPlayer = this.players[0];
      this._writeLog('Start Game');
      this._showPlayersOrder();
      this._showCurrentPlayer();
      this._showCurrentTurn(1);
    }
  
    _randomOrderPlayers(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    _showPlayersOrder() {
      this.playersOrder.innerText = this.players.map(p => p.name).join(', ');
    }
  
    _showCurrentPlayer() {
      const roundPlayer = this.currentPlayer;
      const msg = roundPlayer ? roundPlayer.name : '';
      this.currentPlayerEl.innerText = msg;
    }
  
    _showCurrentTurn(turn = null) {
      turn = turn ? turn : this.turn;
      let currentTurn = Math.ceil((turn + 1) / this.totalPlayers);
      currentTurn = currentTurn < maxRound ? currentTurn : maxRound;
      this.roundCounter.innerText = currentTurn;
    }
  
    _incrementTurn() {
      this.turn = this.turn + 1;
      const maxTurns = this.maxRound * this.totalPlayers;
      let gameEnded = false;
      if (this.turn < maxTurns) {
        const playerIndex = this.turn % this.totalPlayers;
        this.currentPlayer = this.players[playerIndex];
        this._showCurrentPlayer();
      } else {
        this.currentPlayer = null;
        this._showCurrentPlayer();
        this._writeLog('End of Game');
        gameEnded = true;
      }
      return gameEnded; 
    }
  
    _generateRandomDie() {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      return randomNumber;
    }
  
    _rollDice() {
      const firstDie = this._generateRandomDie(),
        secondDie = this._generateRandomDie();
      return firstDie + secondDie;
    }
  
    runGame() {
      let gameEnded = false;
      this._showCurrentTurn(this.turn + 1);
      const diceSum = this._rollDice();
      const currentPlayer = this.currentPlayer;
      currentPlayer.movePlayer(diceSum, this.boardCells);
      const msg = currentPlayer.moveDomPlayer(diceSum, this.turn);
      this._writeLog(msg);
      gameEnded = this._incrementTurn();
      return gameEnded;
    }
  
    _writeLog(message) {
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
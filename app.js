function generateRandomOrder(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function generateRandomDie(){
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
}

function rollDice(){
    var firstDie = generateRandomDie(),
        secondDie = generateRandomDie();
    return firstDie + secondDie;
}

function writeLog(message){
    var now = new Date;
    var msg = now.toLocaleString() + ' - ' + message + "\r";
    logArea.prepend(msg);
}

function movePlayer(diceSum){
    var nextPosition;
    roundCounter.innerText = Math.ceil((round + 1) / players.length);
    var playerEl = document.getElementById(roundPlayer.id);
    nextPosition = (roundPlayer.position + diceSum) % boardCells;
    nextPosition = nextPosition === 0 ? 40 : nextPosition; 
    roundPlayer.position = nextPosition;
    var newCell = document.getElementById('monopoly-cell-' + roundPlayer.position);
    writeLog(roundPlayer.name + ' rolled dice and got ' + diceSum + '. This brings him to cell ' + roundPlayer.position);
    newCell.appendChild(playerEl);
}

function updateRoundInfo(){
    var playerIndex;

    round = round + 1;
    if(round < maxRound){
        playerIndex = round % players.length;
        roundPlayer = players[playerIndex]
        currentPlayer.innerText = roundPlayer.name;
    } else {
        rollButton.style.display = 'none';
        currentPlayer.innerText = 'END OF GAME';
        writeLog('End of game');
    }
}

function runGame(){
    diceSum = rollDice();
    movePlayer(diceSum);
    updateRoundInfo();
}

function showPlayers(){
    var player, 
        playerNames = [];

    for(var i = 0; i < players.length; i++){
        player = players[i];
        playerNames.push(player.name);
    }
    playersOrder.innerText = playerNames.join(', ');
}

var players = [
    {
        id: 'player-1',
        name: 'Player 1',
        position: 1
    },
    {
        id: 'player-2',
        name: 'Player 2',
        position: 1
    },
    {
        id: 'player-3',
        name: 'Player 3',
        position: 1
    },
    {
        id: 'player-4',
        name: 'Player 4',
        position: 1
    }
];
var roundPlayer,
    round = 0,
    boardCells = 40,
    maxRound = 20 * players.length;
    startButton = document.getElementById('button-start'),
    rollButton = document.getElementById('button-roll'),
    roundCounter = document.getElementById('round-counter'),
    currentPlayer = document.getElementById('current-player'),
    playersOrder = document.getElementById('players-order'),
    logArea = document.getElementById('monopoly-log');
    

startButton.addEventListener('click', function(evt){
    evt.preventDefault();
    writeLog('Start Game');
    players = generateRandomOrder(players);
    showPlayers();
    startButton.style.display =  'none';
    roundPlayer = players[0]
    currentPlayer.innerText = roundPlayer.name;
    rollButton.style.display = 'block';
}, false);

rollButton.addEventListener('click', function(evt){
    evt.preventDefault();
    runGame();
}, false);
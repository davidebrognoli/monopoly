const boardCells = 40;
const maxRound = 20;
const totalPlayers = 4;

let monopoly = null;

const startButton = document.getElementById('button-start');
startButton.addEventListener('click', function (evt) {
  if (!monopoly) {
    monopoly = new Monopoly({ boardCells, maxRound, totalPlayers });
    monopoly.init();
  } else {
    console.log('Monopoly already started');
  }
}, false);

const rollButton = document.getElementById('button-roll');
rollButton.addEventListener('click', function (evt) {
  if (monopoly) {
    monopoly.runGame();
  } else {
    console.log('Monopoly not started yet');
  }
}, false);


let xSquares = [];
let oSquares = [];

let winnerCount = [];
let winner = "";
let curShape = "x";

const winningPosible = [
  [0, 1, 2],
  [0, 3, 6],
  [3, 4, 5],
  [1, 4, 7],
  [6, 7, 8],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function setup() {
  displayCurrentPlayer();
}

function displayCurrentPlayer() {
  if (curShape == "x") {
    document.getElementById("x-player-info").style.opacity = 1;
    document.getElementById("o-player-info").style.opacity = 0.7;
  } else {
    document.getElementById("x-player-info").style.opacity = 0.7;
    document.getElementById("o-player-info").style.opacity = 1;
  }
}

function drawSquare(square) {
  curSquare = document.getElementById("square-" + square);
  if (!curSquare.classList.contains("disabled")) {
    if (curShape === "x") {
      curShape = "o";
      xSquares.push(square);
      curSquare.style.backgroundImage = 'url("assets/x.png")';
    } else if (curShape === "o") {
      curShape = "x";
      oSquares.push(square);
      curSquare.style.backgroundImage = 'url("assets/o.png")';
    }
    //   Disabled square
    curSquare.classList.add("disabled");

    displayCurrentPlayer();
    checkWin();
    UpdateScore();
  }
}

function checkWin() {
  for (i = 0; i < winningPosible.length; i++) {
    if (
      xSquares.includes(winningPosible[i][0]) &&
      xSquares.includes(winningPosible[i][1]) &&
      xSquares.includes(winningPosible[i][2])
    ) {
      winner = "x";
      winnerCount.push(winner);
    } else if (
      oSquares.includes(winningPosible[i][0]) &&
      oSquares.includes(winningPosible[i][1]) &&
      oSquares.includes(winningPosible[i][2])
    ) {
      winner = "o";
      winnerCount.push(winner);
    }
  }
  console.log(winner);
  if (winner) {
    // console.log("Winner is " + winner);
    displayWinnerContainer(winner);
  } else if (xSquares.length + oSquares.length === 9) {
    displayWinnerContainer("draw");
  }
}

function displayWinnerContainer(winner) {
  if (winner === "draw") {
    document.getElementById("winning-container-title").innerHTML = "It's a";
    document.getElementById("winning-container-subtitle").innerHTML = "DRAW";
    document.getElementById("winner-img").classList.add("hide");
  } else {
    document.getElementById("winning-container-title").innerHTML = "Player";
    document.getElementById("winning-container-subtitle").innerHTML = "WON";
    document.getElementById("winner-img").src = "assets/" + winner + ".png";
  }
  const winnerContainer = document.getElementById("winning-container");
  // console.log(winnerContainer);
  winnerContainer.classList.remove("hide");
  winnerContainer.style.opacity = 0;
  setTimeout(() => {
    winnerContainer.style.opacity = 1;
  }, 750);
}

function UpdateScore() {
  const oScore = document.getElementById("x-player-score");
  oScore.innerHTML = winnerCount.filter((x) => x === "x").length;

  const xScore = document.getElementById("o-player-score");
  xScore.innerHTML = winnerCount.filter((o) => o === "o").length;
}

function ResetAll() {
  document.getElementById("winning-container").classList.add("hide");
  document.getElementById("winner-img").classList.remove("hide");

  // Reset values
  xSquares = [];
  oSquares = [];

  //   winnerCount = [];
  // curShape = winner;
  winner = "";

  // Reset grid
  for (i = 0; i < 9; i++) {
    document.getElementById("square-" + i).style.backgroundImage = "";
    document.getElementById("square-" + i).classList.remove("disabled");
  }
}

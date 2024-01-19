// PREPARATION

//Select needed elements from the HTML file

const grid = document.querySelector(".grid-sticker-stacker");
const stackBtn = document.querySelector(".stack");
const scoreCounter = document.querySelector(".score-counter");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainBtn = document.querySelector(".play-again");

// Create game grid matrix
// 0 - empty cell
// 1 - bar-segment

// Game board / block movement grid
const gridMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0], //Last array is the starting block
];

// Variables that track game values during gameplay
let currentRowIndex = gridMatrix.length - 1;
let barDirection = "right";
let barSize = 3;
let isGameOver = false;
let score = 0;

function draw() {
  // Reset game board display when function is called
  grid.innerHTML = "";
  // for (let index = 0; index < gridMatrix.length; index ++) {}
  //loops through each sub array of the gridMatrix
  gridMatrix.forEach(function (rowContent) {
    rowContent.forEach(function (cellContent) {
      //creates a cell with a div
      const cell = document.createElement("div");
      cell.classList.add("cell");
      // sets cells with a value of 1 to show the block bar
      if (cellContent === 1) {
        cell.classList.add("bar");
      }
      //adds a cell to grid
      grid.appendChild(cell);
    });
  });
}

// Game logic and controls

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = "YOU <br/ > WON!";
    endGameScreen.classList.add("win");
  }
  endGameScreen.classList.remove("hidden");
  stackBtn.classList.add("hidden");
}

function checkWin() {
  // win if top of the grid is reached
  if (currentRowIndex === 0) {
    if (!isGameOver) updateScore();
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

function checkLost() {
  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];

  if (!prevRow) return;
  // check amount of accumulated stacks under each bar
  for (let index = 0; index < currentRow.length; index++) {
    // if there is no bar below bar element, remove 1 bar piece for both the current stack and next bar in next loop
    if (currentRow[index] === 1 && prevRow[index] === 0) {
      currentRow[index] = 0;
      barSize--;
      updateScore();
    }
    if (barSize === 0) {
      isGameOver = true;
      clearInterval(gameInterval);
      endGame(false);
    }
  }

  console.log("Helo");
}

function updateScore() {
  //score = score + barSize
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  checkWin();
  checkLost();

  if (isGameOver) return;

  //currenRowIndex --
  updateScore();
  currentRowIndex = currentRowIndex - 1;
  barDirection = "right";

  for (let index = 0; index < barSize; index++) {
    gridMatrix[currentRowIndex][index] = 1;
  }
  draw();
}

function moveRight(currentRow) {
  currentRow.pop();
  currentRow.unshift(0);
}

function moveLeft(currentRow) {
  currentRow.shift(); // [0,0,1,1,1]
  currentRow.push(0); // [0,0,1,1,1,0]
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];
  console.log(currentRow);
  // [1,1,1,0,0,0]
  if (barDirection === "right") {
    moveRight(currentRow);
    const lastElement = currentRow[currentRow.length - 1];
    if (lastElement === 1) {
      barDirection = "left";
      console.log(lastElement);
    }
  } else if (barDirection === "left") {
    // [0,0,0,1,1,1]
    moveLeft(currentRow);

    const firstElement = currentRow[0];

    if (firstElement === 1) {
      barDirection = "right";
    }
  }
}

// Initial draw on page load
draw();

function main() {
  moveBar();
  draw();
}

function onPlayAgain() {
  window.location.reload();
}
// Events
stackBtn.addEventListener("click", onStack);
playAgainBtn.addEventListener("click", onPlayAgain);
const gameInterval = setInterval(main, 600);

const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

const totalCells = 100;
const totalBombs = 20;
// player wins when this score is reached
maxScore = 10;
// lists which cells bombs go in
const bombsList = [];

let score = 0;

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, "0");
  if (score === maxScore) {
    endGame(true);
  }
}

for (let index = 1; index <= 100; index++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    if (bombsList.includes(index)) {
      cell.classList.add("cell-bomb");
      endGame(false);
    }

    cell.classList.add("cell-clicked");
    updateScore();
    console.log(`You clicked on cell number ${index}`);
  });
  grid.appendChild(cell);
}

while (bombsList.length < totalBombs) {
  // Generate a random number between 1-100, inclusive
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;
  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
  console.log(randomNumber);
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = "YOU <br> WON";
    endGameScreen.classList.add("win");
  }
  endGameScreen.classList.remove("hidden");
}
console.log(bombsList);

playAgainButton.addEventListener("click", function () {
  window.location.reload();
});

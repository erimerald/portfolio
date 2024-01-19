// select relevant elements from the HTML

const grid = document.querySelector(".grid");
const timer = document.querySelector(".timer");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainBtn = document.querySelector(".play-again");

// nested array of the game "field"
const gridMatrix = [
  ["", "", "", "", "", "", "", "", ""],
  [
    "river",
    "wood",
    "wood",
    "river",
    "wood",
    "river",
    "river",
    "river",
    "river",
  ],
  ["river", "river", "river", "wood", "wood", "river", "wood", "wood", "river"],
  ["", "", "", "", "", "", "", "", ""],
  ["road", "bus", "road", "road", "road", "car", "road", "road", "road"],
  ["road", "road", "road", "car", "road", "road", "road", "road", "bus"],
  ["road", "road", "car", "road", "road", "road", "bus", "road", "road"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];

// initialise variables that control the game field settings, following gridMatrix
const victoryRow = 0;
const riverRows = [1, 2];
const roadRows = [4, 5, 6];
// duck object for key-value pair, places player character in the middle of the bottom row.
const duckPosition = { x: 4, y: 8 };
// anticipates future position of duck
let contentBeforeDuck = "";
let time = 15;

function drawGrid() {
  // clears elements of the grid
  grid.innerHTML = "";

  // For each row in the gridMatrix, loops through and displays what is in the nested grid.
  gridMatrix.forEach(function (gridRow, gridRowIndex) {
    console.log(gridRowIndex, gridRow);
    gridRow.forEach(function (cellContent, cellContentIndex) {
      console.log(cellContentIndex, cellContent);
      // Given the current grid row, creates a cell for the grid in the game based on the cellContent
      // <div></div>
      const cellDiv = document.createElement("div");
      //<div  class="cell">
      cellDiv.classList.add("cell");

      // looks at current grid row, checks if it corresponds to riverRows or roadRows
      // [1, 2]
      // draws rivers
      if (riverRows.includes(gridRowIndex)) {
        cellDiv.classList.add("river");
        // [4, 5, 6]
        // draws roads
      } else if (roadRows.includes(gridRowIndex)) {
        cellDiv.classList.add("road");
      }

      // empty string for cellContent "" --> "falsy" value
      // accepted values "river", "road", "car", "bus", "wood" --> "truthy"
      if (cellContent) {
        cellDiv.classList.add(cellContent);
      }

      grid.appendChild(cellDiv);
    });
  });
}

function placeDuck() {
  contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];
  gridMatrix[duckPosition.y][duckPosition.x] = "duck";
}

//places duck only in one spot on the grid
function moveDuck(event) {
  const key = event.key;
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  switch (key) {
    case "ArrowUp":
    case "w":
    case "W":
      //decrements position value of duckPosition
      console.log("moving duck up");
      if (duckPosition.y > 0) duckPosition.y--;
      break;
    case "ArrowDown":
      console.log("moving duck down");
      if (duckPosition.y < 8) duckPosition.y++;
      break;
    case "ArrowLeft":
      if (duckPosition.x > 0) duckPosition.x--;
      break;
    case "ArrowRight":
      if (duckPosition.x < 8) duckPosition.x++;
      break;
  }
  // re-draws screen when duck is moved
  render();
}

// Animation functions
function moveRight(gridRowIndex) {
  // Get all of the cells in the current row
  const currentRow = gridMatrix[gridRowIndex];
  // Remove the last element of the row
  const lastElement = currentRow.pop();
  // Put the last element of the previous row to the begnning of the row (index 0)
  currentRow.unshift(lastElement);
}

function moveLeft(gridRowIndex) {
  const currentRow = gridMatrix[gridRowIndex];
  const firstElement = currentRow.shift();
  currentRow.push(firstElement);
}

function animateGame() {
  // Animate river
  moveRight(1);
  moveLeft(2);

  // Animate road
  moveRight(4);
  moveRight(5);
  moveRight(6);
}

function updateDuckPosition() {
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  if (contentBeforeDuck === "wood") {
    if (duckPosition.y === 1 && duckPosition.x < 8) duckPosition.x++;
    else if (duckPosition.y === 2 && duckPosition.x > 0) duckPosition.x--;
  }
}

function checkPosition() {
  if (duckPosition.y === victoryRow) endGame("duck-arrived");
  else if (contentBeforeDuck === "river") endGame("duck-drowned");
  else if (contentBeforeDuck === "car" || contentBeforeDuck === "bus")
    endGame("duck-hit");
}

// Game Win/Loss  Logic
function endGame(reason) {
  // Victory
  if (reason === "duck-arrived") {
    endGameText.innerHTML = "YOU<br>WIN!!";
    endGameScreen.classList.add("win");
  }

  gridMatrix[duckPosition.y][duckPosition.x] = reason;

  // stop countdown timer
  clearInterval(countdownLoop);
  // stop game loop
  clearInterval(renderLoop);
  // stop duck movement
  document.removeEventListener("keyup", moveDuck);
  // display game over screen
  endGameScreen.classList.remove("hidden");
}

function countdown() {
  if (time !== 0) {
    time--;
    timer.innerText = time.toString().padStart(5, "0");
  }

  if (time === 0) {
    // player loses game
    endGame();
  }
}

// Rendering

function render() {
  placeDuck();
  checkPosition();
  drawGrid();
}

const renderLoop = setInterval(function () {
  updateDuckPosition();
  animateGame();
  render();
}, 600);

const countdownLoop = setInterval(countdown, 1000);

document.addEventListener("keyup", moveDuck);
playAgainBtn.addEventListener("click", function () {
  location.reload();
});

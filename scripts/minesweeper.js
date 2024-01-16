const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

const totalCells = 100;
const totalBombs = 90;

// player wins when this score is reached
maxScore = 5;

// lists which cells bombs go in
const bombsList = [16, 21, 3];

let score = 0;

const cell = document.createElement("div");
cell.classList.add("cell");

// for (let index = 1; index <100 =  ){

// }

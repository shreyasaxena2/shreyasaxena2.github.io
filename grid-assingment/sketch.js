// Grid Based Game
// Shreya Saxena 
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let player;
let cols;
let rows;
const CELL_SIZE = 20;
const CAN_MOVE = 1;
const WALL = 0;
let gameStarted = false;
player = {
  x: 0,
  y: 0,
};
exit = {
  exitX: grid[0].length - 1,
  exitY: grid.length - 1,
};
let gameOver = false;
let floodStarted = false;


let grid = [
  [1, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 1, 1, 1, 0, 1, 1],
  [0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
  [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
];



function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  cols = grid[0].length;
  rows = grid.length;
}

function draw() {
  if (!gameStarted) {
    startScreen();
  }
  else if (gameOver) {
    endScreen();
  }
  else {
    displayGrid();
    showPlayer();
    displayExit();
  }

}

function startScreen() {
  background("light pink");  // Set a background for the start screen

  // Aligns the text and prints it onto the canvas
  textAlign(CENTER);
  fill(255);
  textSize(75);
  text("Maze, Gaze", width / 2, height / 2 - 150);
  textSize(30);
  text("Press SPACE to Start", width / 2, height / 2 + 150);
  text("Use left arrow to move left and right arrow to move right", width / 2, height / 2 + 200);

}


function keyPressed() {
  if (!gameStarted && key === " ") {
    gameStarted = true;
  }
}


function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        fill(0);
      }
      else {
        fill(200);
      }
      stroke(255);
      rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

function showPlayer() {
  fill("blue");
  noStroke();
  rect(player.x * CELL_SIZE, player.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}


function displayExit() {
  fill("yellow");
  noStroke();
  rect(exit.exitX * CELL_SIZE, exit.exitY * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}


function displayFlood() {
  
}


function endScreen() {
  background("light blue");
  textAlign(CENTER);
  fill(0);
  textSize(32);
  if (player.x === exit.exitX && player.y === exit.exitY) {
    text("You escaped the maze!", width / 2, height / 2);
  }
  else {
    text("The flood caught you!", width / 2, height / 2);
    text("Press Ctrl + R to try again!", width / 2, height / 2 + 20);
  }
}
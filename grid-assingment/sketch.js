// Grid Based Game - pac man
// Shreya Saxena 
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let player;
let cols;
let rows;
const GRID_SIZE = 20;
const CAN_MOVE = 1;
const WALL = 0;

let grid = [[0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]];



function preload() {
  player = loadImage("player-pac-man.png");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  cols = grid[0].length;
  rows = grid.length;

  player = {
    x: 0,
    y: 0,
  };

  exit = {
    exitX: cols - 1,
    exitY: rows - 1,
  };
}

function draw() {
  startScreen();
  displayGrid();
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
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
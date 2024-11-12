// Grid Based Game - pac man
// Shreya Saxena 
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let player;
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

}

function draw() {
  background(220);
}

function startScreen() {
  
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
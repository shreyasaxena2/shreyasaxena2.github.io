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

let grid = [[0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]];



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


function generateGrid(rows, columns) {
  let theGrid = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++){
      if (random(100) < 50) {
        theGrid.push(CAN_MOVE);
      }
      else {
        theGrid.push(WALL);
      }
     
    }

  }
}
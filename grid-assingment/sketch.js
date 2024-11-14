// Escape the Maze Game
// Shreya Saxena
// 11th November, 2024
//
// Extra for Experts:
// - used the function filter()
// - used the function some()
// - used text features to enhance my project

let cols;
let rows;
const CELL_SIZE = 50;
let player;
let exit;
let floodCells = [];
let floodInterval = 450; // Interval in milliseconds between floods
let gameStarted = false;
let gameOver = false;
let floodStarted = false;
let lastFloodTime = 0; // To track the time of the last flood
let playerMoved = false; // Flag to track if player has moved
let playerMoves = 0; // To track how many moves the player has made before being affected by flood

// Hardcoded grid layout (1 = path, 0 = wall)
let hardcodedGrid = [
  [1, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 1, 1, 1, 0, 1, 1],
  [0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
];


function preload() {
  floodImg = loadImage("floodImg.jpg");
  wallImg = loadImage("wall-Img.png");
}


function setup() {
  createCanvas(550, 550); 
  cols = hardcodedGrid[0].length;
  rows = hardcodedGrid.length;
  player = { 
    x: 0, 
    y: 0 }; // Start position
  exit = {
    x: cols - 1, 
    y: rows - 1 }; // Exit position
  floodCells.push({ x: player.x, y: player.y }); // Start flooding from the player position
}

function draw() {
  if (!gameStarted) {
    startScreen();
  }
  else if (gameOver) {
    endScreen();
  }
  else {
    background(255);
    drawGrid();
    drawPlayer();
    drawExit();
    drawFlood();
    winOrLose();
    floodTime(); 
  }
}



function startScreen() {
  background("lightblue");
  textAlign(CENTER);
  fill(0);
  textSize(24);
  text("Maze Escape", width / 2, height / 2 - 40);
  textSize(16);
  text("Press the SPACE key and then any arrow to start", width / 2, height / 2 + 10);
  text("Move quickly to avoid the flood!", width / 2, height / 2 + 40);
}

function endScreen() {
  background("lightcoral");
  textAlign(CENTER);
  fill(0);
  textSize(32);
  if (player.x === exit.x && player.y === exit.y) {
    text("You Escaped!", width / 2, height / 2);
  }
  else {
    text("You were caught by the flood!", width / 2, height / 2);
  }
}

function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (hardcodedGrid[y][x] === 1) {
        fill(255); // White for walkable paths
      } 
      else {
        image(wallImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE); // Black for walls
      }
      stroke(0); // Black grid lines
    }
  }
}


function drawPlayer() {
  fill("blue");
  noStroke();
  rect(player.x * CELL_SIZE, player.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawExit() {
  fill("green");
  noStroke();
  rect(exit.x * CELL_SIZE, exit.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawFlood() {
  fill(150, 0, 255, 100);
  for (let cell of floodCells) {
    image(floodImg, cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function isFlooded(x, y) {
  return floodCells.some(cell => cell.x === x && cell.y === y);
}

function floodMaze() {
  let floodedCount = floodCells.length;
  if (floodedCount < cols * rows - 1) {
    // Get the last flooded cell
    let currentFloodCell = floodCells[floodedCount - 1];
    let neighbors = getNeighbors(currentFloodCell.x, currentFloodCell.y);

    // Filter only the valid (walkable) neighbors
    let validNeighbors = neighbors.filter(cell => hardcodedGrid[cell.y][cell.x] === 1 && !isFlooded(cell.x, cell.y));

    // Add each valid neighbor to the floodCells array individually
    for (let i = 0; i < validNeighbors.length; i++) {
      floodCells.push(validNeighbors[i]);
    }
  }
}

// Get neighboring cells (left, right, up, down)
function getNeighbors(x, y) {
  let neighbors = [];
  if (x > 0) {
    neighbors.push({ x: x - 1, y });
  } // Left
  if (x < cols - 1) {
    neighbors.push({ x: x + 1, y });
  } // Right
  if (y > 0) {
    neighbors.push({ x, y: y - 1 });
  } // Up
  if (y < rows - 1) {
    neighbors.push({ x, y: y + 1 });
  } // Down
  return neighbors;
}

function keyPressed() {
  if (!gameStarted) {
    gameStarted = true;
  }

  // Start the flood only after the player has moved once
  if (!playerMoved) {
    playerMoved = true;
    floodStarted = true; // Start flooding after the first key press
  }

  // Increase the player move counter after each valid move
  if (!gameOver) {
    if (keyCode === LEFT_ARROW) {
      movePlayer(-1, 0);
    }
    else if (keyCode === RIGHT_ARROW) {
      movePlayer(1, 0);
    }
    else if (keyCode === UP_ARROW) {
      movePlayer(0, -1);
    }
    else if (keyCode === DOWN_ARROW) {
      movePlayer(0, 1);
    }

    if (playerMoves < 3) {
      playerMoves++; // Increment move counter until 3 moves are made
    }
  }
}

function movePlayer(dx, dy) {
  let newX = player.x + dx;
  let newY = player.y + dy;

  // Move only if within bounds and not a wall
  if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && hardcodedGrid[newY][newX] === 1) {
    player.x = newX;
    player.y = newY;
  }
}


function winOrLose() {
  // Check for win or loss
  if (player.x === exit.x && player.y === exit.y) {
    gameOver = true;
  }
  else if (isFlooded(player.x, player.y) && playerMoves >= 3) {
    gameOver = true;
  }
}


function floodTime() {
  // Handle the flood logic only after the player has moved
  if (floodStarted && playerMoves >= 3 && millis() - lastFloodTime > floodInterval) {
    floodMaze();
    lastFloodTime = millis(); // Update the last flood time
  }
}
// Escape the Maze Game
// Shreya Saxena
// 15th November, 2024
//
// Extra for Experts:
// - used the function filter()
// - used the function some()
// - used text features to enhance my project
// - used loadSound() and play() to create background music
// - used music.loop() to loop the background music
// - used soundEffect.amp() to change the volume of the sound effect



// Setting variables
let cols;
let rows;
const CELL_SIZE = 50;
let player;
let exit;
const PATH = 1; // Walkable places
const WALL = 0; // Un-walkable places
let floodImg;
let wallImg;
let pathTile;
let playerImg;
let exitImg;
let music;
let soundEffect;
let celebration;
let lost;
let floodCells = []; // Keeps track of which cells to flood
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


// This function preloads all the external files that will be used in the function
function preload() {
  floodImg = loadImage("floodImg.png");
  wallImg = loadImage("wall-Img.png");
  pathTile = loadImage("walkableImg.jpg");
  playerImg = loadImage("playerImg.png");
  exitImg = loadImage("exitImg.png");

  // Loads the music
  music = loadSound("bgmusic.mp3");
  soundEffect = loadSound("sound-effect.mp3");
  celebration = loadSound("celebrationMusic.mp3");
  lost = loadSound("gameOver.mp3");
}

// Creates canvas, player starting coordinates, exit coordinates and initiates the lava flood
function setup() {
  createCanvas(550, 550); 

  // Height of the grid
  cols = hardcodedGrid[0].length;

  // Length of the grid
  rows = hardcodedGrid.length;

  // Player starting coordinates
  player = { 
    x: 0, 
    y: 0 }; // Start position

  // Exit coordinates
  exit = {
    x: cols - 1, 
    y: rows - 1 }; // Exit position
  floodCells.push({ x: player.x, y: player.y }); // Start flooding from the player position
}


 
function draw() {
  // once this state happens the start screen is activated
  if (!gameStarted) {
    startScreen();
  }

  // once this state happens the end screen is activate
  else if (gameOver) {
    endScreen();
  }

  // Displayed the grid, player and the exit target
  else {
    background(255);
    drawGrid();
    drawPlayer();
    drawExit();

    // Once the player has made 3 moves, then display the lava flood
    if (playerMoves === 3) {
      drawFlood();
    }

    // Checks win situation
    winOrLose();

    // Decides when it should flood
    floodTime(); 
  }
}



function startScreen() {
  // Looping music
  music.amp(0.3);
  music.loop();

  // Set a background for the start screen
  background("lightblue");

  // Aligns the text and prints it onto the canvas
  textAlign(CENTER);
  fill(0);
  textSize(24);
  text("Maze Escape", width / 2, height / 2 - 40);
  textSize(16);
  text("Click anywhere to start", width / 2, height / 2 + 10);
  text("Use the Left, Right, Up and Down arrow to naviagte the maze", width / 2, height / 2 + 40);
  text("Move quickly to avoid the lava!", width / 2, height / 2 + 70);
}

function endScreen() {
  // Set a background for the end screen
  background("lightcoral");

  // Aligns the text and prints it onto the canvas
  textAlign(CENTER);
  fill(0);
  textSize(32);

  // If the player escapes...
  if (player.x === exit.x && player.y === exit.y) {
    text("The lava did not cook you!", width / 2, height / 2);
    text("Good Job!", width / 2, height / 2 + 40);
  }

  // If the player loses...
  else {
    text("The lava cooked you!", width / 2, height / 2);
    text("Refresh to try again", width / 2, height / 2 + 40);
  }
}

// Uses 2D arrays and nested loops to create the grid
function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      // If the number in the hardcoded grid = 1
      if (hardcodedGrid[y][x] === PATH) {
        image(pathTile, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE); // For walkable paths
      } 
      // If the number in the hardcoded grid = 0
      else {
        image(wallImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE); // Wood for walls
      }
    }
  }
}


// Displays the player
function drawPlayer() {
  fill("blue");
  noStroke();
  image(playerImg, player.x * CELL_SIZE, player.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}


// Creates an exit target
function drawExit() {
  fill("lightcoral");
  noStroke();
  image(exitImg, exit.x * CELL_SIZE, exit.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}


// Displays the lava flood
function drawFlood() {
  fill(150, 0, 255, 100);
  for (let cell of floodCells) {
    image(floodImg, cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}


// Checks whether the cell is flooded or not
function isFlooded(x, y) {
  return floodCells.some(cell => cell.x === x && cell.y === y);
}


// Actually floods the maze
function floodMaze() {
  let floodedCount = floodCells.length;
  if (floodedCount < cols * rows - 1) {
    // Get the last flooded cell
    let currentFloodCell = floodCells[floodedCount - 1];
    let neighbors = getNeighbors(currentFloodCell.x, currentFloodCell.y);

    // Filter only the valid (walkable) neighbors
    let validNeighbors = neighbors.filter(cell => hardcodedGrid[cell.y][cell.x] === PATH && !isFlooded(cell.x, cell.y));

    // Add each valid neighbor to the floodCells array individually
    for (let i = 0; i < validNeighbors.length; i++) {
      floodCells.push(validNeighbors[i]);
    }
  }
}

// Get neighboring cells (left, right, up, down) to see if the cell should be flooded
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


// If mouse is clicked
function mouseClicked() {
  if (!gameStarted && mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
    gameStarted = true;
  }
}



// If the key is pressed
function keyPressed() {
  // Start the flood only after the player has moved once
  if (!playerMoved) {
    playerMoved = true;
    floodStarted = true; // Start flooding after the first key press
  }

  // Increase the player move counter after each valid move
  if (!gameOver) {
    if (keyCode === LEFT_ARROW) {
      movePlayer(-1, 0);
      soundEffect.play();
    }
    else if (keyCode === RIGHT_ARROW) {
      movePlayer(1, 0);
      soundEffect.amp(1);
      soundEffect.play();
    }
    else if (keyCode === UP_ARROW) {
      movePlayer(0, -1);
      soundEffect.amp(1);
      soundEffect.play();
    }
    else if (keyCode === DOWN_ARROW) {
      movePlayer(0, 1);
      soundEffect.amp(1);
      soundEffect.play();
    }

    if (playerMoves < 3) {
      playerMoves++; // Increment move counter until 3 moves are made
    }
  }
}


// Moves the player
function movePlayer(dx, dy) {
  let newX = player.x + dx;
  let newY = player.y + dy;

  // Move only if within bounds and not a wall
  if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && hardcodedGrid[newY][newX] === PATH) {
    player.x = newX;
    player.y = newY;
  }
}


// Check for win or loss
function winOrLose() {
  // If wins...
  if (player.x === exit.x && player.y === exit.y) {
    // Background music ends
    soundEffect.stop();
    music.stop();
    gameOver = true;
    celebration.play();
  }

  // If loses...
  else if (isFlooded(player.x, player.y) && playerMoves >= 3) {
    // Background music ends
    soundEffect.stop();
    music.stop();
    lost.play();
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
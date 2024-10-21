// 3D Optical Illusion
// Shreya Saxena
// 21st October, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = "start";
let hailArray = [];
let hail;
let player;
let stopDistance = 75;
let gameOver = false;
let distance;
let gameWon = false;
let moved = false;
let bg;
let lost;
let winsc;
let start;



function preload() {
  // player = loadImage("littleman.png");
  bg = loadImage("background.jpg");
  lost = loadImage("gameoverscreen.jpeg");
  winsc = loadImage("winscreen.webp");
  start = loadImage("startsc.jpeg");
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Create initial hailstones
  for (let i = 0; i < 15; i++) {
    createHail();
  }


  // Create new hailstone every 15 seconds
  window.setInterval(createHail, 15000);

  player = {
    playerX: width - 75,
    playerY: height - 75,
    size: 75,
    speed: 5,
  };

  
}



function draw() {
  if (state === "start") {
    startScreen();
  }
  else if (state === "begin activity") {
    background(bg);
    showHail();
    moveHail();
  }

  if (!gameOver && !gameWon) {
    showAndMovePlayer();
    playGame();
    checkIfWon();
  }
  else if (gameOver) {
    gameOverScreen();
  }
  else if (gameWon) {
    showWinnerScreen();
  }
}



function startScreen() {
  background(start);  // Set a background for the start screen
  textAlign(CENTER);
  fill(255);
  textSize(75);
  text("Hail Simulation", width / 2, height / 2 - 150);
  textSize(30);
  text("Press SPACE to Start", width / 2, height / 2 + 150);


}

function keyPressed() {
  if (key === " ") {
    state = "begin activity";    
  }
  
}

function showAndMovePlayer() {
  fill(0, 0, 255);
  noStroke();
  rect(player.playerX, player.playerY, player.size, player.size);

  if (keyIsDown(LEFT_ARROW)) {
    player.playerX -= player.speed;
    moved = true;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player.playerX += player.speed;
    moved = true;
  }

  player.playerX = constrain(player.playerX, player.size / 10, width - player.playerX / 10);
}


function showHail() {
  for (let hail of hailArray) {
    noStroke();
    fill(hail.r, hail.g, hail.b);
    circle(hail.x, hail.y, hail.radius * 2);
  }
}

function moveHail() {
  for (let hail of hailArray) {
    hail.y += hail.speed;  // Move hailstone down by its speed

    // If hailstone goes off the screen, reset it to the top
    if (hail.y > height - stopDistance - hail.radius) {
      hail.y = -hail.radius;  // Reset to just above the canvas
      hail.x = random(0, width);  // Reset x to a random position
    }
  }
}

function createHail() {
  hail = {
    x: random(0, width),
    y: random(0, height),
    radius: random(10, 20),
    r: 188,
    g: 188,
    b: 183,
    speed: random(2, 5)  // Add a random falling speed
  };
  hailArray.push(hail);
}

function playGame() {
  if (moved) {
    for (let hail of hailArray) {
      distance = dist(player.playerX, player.playerY, hail.x, hail.y);
  
      if (distance < player.size / 2 + hail.radius) {
        gameOver = true;
      }
    }
  }
}


function gameOverScreen() {
  background(lost);
  textAlign(CENTER);
  fill(255);
  textSize(30);
  text("Refresh to Restart", width / 2, height / 2 + 300);
}


function checkIfWon() {
  if (player.playerX <= player.size / 10) {
    gameWon = true;
  }
}


function showWinnerScreen() {
  background(winsc);
  textAlign(CENTER);
  fill(255);
  textSize(30);
  text("Refresh to Play Again", width / 2, height / 2 + 200);
}


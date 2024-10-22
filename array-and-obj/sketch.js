// Hailstorm Game
// Shreya Saxena
// 21st October, 2024
//
// Extra for Experts:
// - used the function constrain()
// - used the function dist()
// - used text features to enhance my project


// setting variables
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
let playerVisible = false;


// This function preloads all the external files that will be used in the function
function preload() {
  bg = loadImage("background.jpg");
  lost = loadImage("gameoverscreen.jpeg");
  winsc = loadImage("winscreen.webp");
  start = loadImage("startsc.jpeg");
}

// creates a canvas, hailstones and has player characteristics
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // create initial hailstones
  for (let i = 0; i < 15; i++) {
    createHail();
  }


  // create new hailstone every 15 seconds
  window.setInterval(createHail, 15000);

  // player characteristics
  player = {
    playerX: width - 75,
    playerY: height - 75,
    size: 75,
    speed: 5,
  };

  
}



function draw() {
  // once this state happens the start screen is activated
  if (state === "start") {
    startScreen();
  }

  // once the space bar is pressed, the screen changes to one that shows hail and moves it
  else if (state === "begin activity") {
    background(bg);
    showHail();
    moveHail();

    // once the player has been made visible and the game is not over and no one has won
    if (playerVisible && !gameOver && !gameWon) {
      showAndMovePlayer();
      playGame();
      checkIfWon();
    }

    // if game is lost...
    else if (gameOver) {
      gameOverScreen();
    }

    // if game is won...
    else if (gameWon) {
      showWinnerScreen();
    }
  }
}



function startScreen() {
  background(start);  // Set a background for the start screen

  // Aligns the text and prints it onto the canvas
  textAlign(CENTER);
  fill(255);
  textSize(75);
  text("Hailstorm Game", width / 2, height / 2 - 150);
  textSize(30);
  text("Press SPACE to Start", width / 2, height / 2 + 150);
  text("Use left arrow to move left and right arrow to move right", width / 2, height / 2 + 200);


}

function keyPressed() {
  // if the space bar is pressed...
  if (key === " ") {
    state = "begin activity";
    playerVisible = true; // once triggered then only can the player can visible
  }
  
}

function showAndMovePlayer() {
  // creates the player
  fill(0, 0, 255);
  noStroke();
  rect(player.playerX, player.playerY, player.size, player.size);

  if (keyIsDown(LEFT_ARROW)) { // moves the player using the left arrow
    player.playerX -= player.speed;
    moved = true;
  }
  
  else if (keyIsDown(RIGHT_ARROW)) { // moves the player using the right arrow
    player.playerX += player.speed;
    moved = true;
  }

  // keeps the x value of the player between specific values so it does not go off screen
  player.playerX = constrain(player.playerX, player.size / 10, width - player.playerX / 10);
}


// projects the hail onto the canvas
function showHail() {
  // takes each hail in the array and creates it
  for (let hail of hailArray) {
    noStroke();
    fill(hail.r, hail.g, hail.b); // controls the color
    circle(hail.x, hail.y, hail.radius * 2); // prints the shape
  }
}


// makes the hail move around the screen and resets it back to the top once it has reached the bottom
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


// hailstones are created
function createHail() {
  hail = {
    x: random(0, width), // where the hailstones randomly start
    y: random(0, height), // where the hailstones randomly start
    radius: random(10, 20), // picks a random radius that determines the size of the hailstone
    r: 188, // color of the hailstones
    g: 188, // color of the hailstones
    b: 183, // color of the hailstones
    speed: random(2, 5)  // adds a random falling speed
  };

  hailArray.push(hail); // pushes each hailstone into an array
}


// how the game is actually played
function playGame() {
  // if the player has moved, then only can they die
  if (moved) {

    // checks the distance between each of hailstone coordinates and player
    for (let hail of hailArray) {
      distance = dist(player.playerX, player.playerY, hail.x, hail.y);
  
      //  if the distance is less than the combined space between player and the hailstone,
      // they are touching. And the player loses
      if (distance < player.size / 2 + hail.radius) {
        gameOver = true;
      }
    }
  }
}


// the screen that shows up when the player gets hit and loses the game
function gameOverScreen() {
  background(lost);
  textAlign(CENTER);
  fill(255);
  textSize(30);
  text("Refresh to Restart", width / 2, height / 2 + 300);
}

// checks if the player has been hit
function checkIfWon() {
  // checks the position of the player and sees how far it is from the left edge of the screen
  if (player.playerX <= player.size / 10) {
    gameWon = true; // if the player is close enough to the screen, they have won the game
  }
}

// the screen that shows up when the player makes it across the screen without getting hit
function showWinnerScreen() {
  background(winsc);
  textAlign(CENTER);
  fill(255);
  textSize(30);
  text("Refresh to Play Again", width / 2, height / 2 + 200);
}


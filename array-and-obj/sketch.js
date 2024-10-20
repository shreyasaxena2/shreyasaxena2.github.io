// 3D Optical Illusion
// Shreya Saxena
// 21st October, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// https://editor.p5js.org/arthurfincham/sketches/D-3Ty82rT source code


// let state = "start";
let hailArray = [];
let hail;
let littleMan;
let stopDistance = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create initial hailstones
  for (let i = 0; i < 15; i++) {
    createHail();
  }

  // Optional: Create new hailstone every second
  window.setInterval(createHail, 15000);
}

function draw() {
//   if (state === "start") {
//     startScreen();
//   }
//   else if (state === "begin activity") {
//     background(165);
//     showHail();
//     moveHail();
//   }


  // Show and move the hailstones
  background(165);
  showHail();
  moveHail();
}




function startScreen() {
  background(100, 150, 200);  // Set a background for the start screen
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text("Hail Simulation", width / 2, height / 2 - 50);
  textSize(30);
  text("Press SPACE to Start", width / 2, height / 2 + 20);

}

function KeyPressed() {
  if (key === " ") {
    state = "begin activity";    
  }
  
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
  let hail = {
    x: random(0, width),
    y: random(0, height),
    radius: random(10, 20),
    r: random(255),
    g: random(255),
    b: random(255),
    speed: random(2, 5)  // Add a random falling speed
  };
  hailArray.push(hail);
}

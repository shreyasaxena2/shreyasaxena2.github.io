// 3D Optical Illusion
// Shreya Saxena
// 21st October, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// https://editor.p5js.org/arthurfincham/sketches/D-3Ty82rT source code


let hailArray = [];
let hail;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 5; i++) {
    createHail();
  }
}

function draw() {
  background(165);
  showHail();

}


function showHail() {
  for (let hail of hailArray) {
    noStroke();
    fill(hail.r, hail.g, hail.b, hail.alpha);
    circle(hail.x, hail.y, hail.radius * 2);
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
    alpha: random(255),
  };
  hailArray.push(hail);
}
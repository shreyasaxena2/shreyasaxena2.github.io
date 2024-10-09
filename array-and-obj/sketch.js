// 3D Optical Illusion
// Shreya Saxena
// 21st October, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// https://editor.p5js.org/arthurfincham/sketches/D-3Ty82rT source code


function setup() {
  createCanvas(750, 750);
}

function draw() {
  background(0);

  // LINE STYLE
  stroke('white');
  strokeWeight(7);

  // VERTICAL LINES
  for (var i = 0; i < 25; i++){ 
    line(width/25*i, 0, width/25*i, height)
  }

  // HORIZONTAL LINES
  for (var i = 0; i < 25; i++){ 
    line(0, height/25*i, width, height/25*i)
  }

}
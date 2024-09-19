// Project Title
// Your Name
// Date
//
// Extra for Experts:
// Square moving around screen
// Sept 19, 2024


let x = 0;
let y = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if (y === 0 && x <= 350) {
    x += 10
    fill("red ")
    rect(x, y, 50, 50);  
  }
  if (x === 350 && y <= 350) {
    y += 10
    fill("red")
    rect(x, y, 50, 50);
  }
  if (y === 350 && x <= 350) {
    x -= 10
    fill("red")
    rect(x, y, 50, 50);  
  }
  if (x === 0 & y <= 350) {
    y -= 10
    fill("red")
    rect(x, y, 50, 50);
  }
}



  


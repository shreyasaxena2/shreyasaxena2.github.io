// Walker OOP Array Demo

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.speed = 8;
    this.radius = 3;
    this.color = theColor;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}

let luc;
let michael;

function setup() {
  createCanvas(windowWidth, windowHeight);
  luc = new Walker(width/2, height/2, "red");
  michael = new Walker(300, 200, "blue");
}

function draw() {
  michael.move();
  luc.move();

  michael.display();
  luc.display();
}
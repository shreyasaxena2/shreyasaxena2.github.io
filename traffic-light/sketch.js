// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis


let isRed = false;
let isYellow = false;
let isGreen = false;
let yellowTime = 2000
let goAndStopTime = 5000 //red and green times
let redSwitched = 

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  if ((millis() > yellowTime) && (millis() < goAndStopTime)) {
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
    isRed = !isRed
  }

  else if ((millis() < yellowTime)){
    fill("yellow")
    ellipse(width/2, height/2, 50, 50); //middle
    isYellow = !isYellow
  }
  
  else {
    fill("green")
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
    isGreen = !isGreen
  }
}
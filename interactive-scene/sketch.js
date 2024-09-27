// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let medha;


function setup() {
  createCanvas(windowWidth, windowHeight);
  startScreen();
  keyPressed();
}


function draw() { 

}


function startScreen() {
  background("#A7C7E7"); // pastel blue background
  textAlign(CENTER, CENTER);
  textSize(65);
  text("PRESS THE SPACE BAR", width/2, height/2);
  
}


function keyPressed() {
  if (keyIsDown(32)) {
    background("pink");

    textAlign(CENTER, CENTER);
    textSize(65);
    text("HAPPY BIRTHDAY MEDHA", width/2, height/2);
  }
}
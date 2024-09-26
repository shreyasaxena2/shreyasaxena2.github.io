// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let medha;
let transition = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
}
  
function draw() {
  startScreen();
}


function startScreen() {
  background("#A7C7E7"); // pastel blue background
  textSize(65)
  text("PRESS THE SPACE BAR", (width/2), height/2);
  textAlign(CENTER, CENTER);  
  // if (keyIsPressed === true) {
  //   if (key === "space" ) {
  //     background("pink");
  //   }
}


  
 


// function trans() {
//   while (transition === true) {
//     rotateY(frameCount / 30);
//     textSize(65);
//     text("HAPPY BIRTHDAY MEDHA", (width/2), height/2);
//     textAlign(CENTER, CENTER);
//   }

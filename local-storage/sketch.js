// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let numberOfClick = 0;
let highestClick = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  // only get item ig it exists
  if (getItem("highest")) {
    highestClick = getItem("highest");
  }

}

function draw() {
  background(220);
  displayClicks();
  displayHighest();
}



function mousePressed() {
  numberOfClick++;
  if (numberOfClick > highestClick) {
    highestClick = numberOfClick;
    storeItem("highest", highestClick);
  }
}



function displayClicks() {
  fill("black");
  textSize(75);
  text(numberOfClick, 100, height/2);
}


function displayHighest() {
  fill("green");
  textSize(75);
  text(highestClick, 400, height/2);
}
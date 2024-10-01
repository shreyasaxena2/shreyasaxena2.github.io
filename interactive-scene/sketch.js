// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let medha;
let balloons;
let hbds;
let gifLoadImg;
let gifCreateImg;
let isPlaying = false
let fStartScreen;
let fHbd;



function preload() {
  balloons = loadImage("balloon.png");
  medha = loadImage("medmed.png");
  hbds = loadSound("hbds.mp3");
  cake = loadImage("bdaycakeimg.png")
  gifLoadImg = loadImage("birthdaygif.gif");
    
  fStartScreen = loadFont("startscreenfont.otf")
  fHbd = loadFont("bdayfont.ttf")
  fclickimg = loadFont("clickfont.ttf")

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  startScreen();
  // windowResized();
}


function draw() { 
  keyPressed();
}




function startScreen() {
  background("#A7C7E7"); // pastel blue background
  textAlign(CENTER, CENTER);  
  textSize(65);
  textFont(fStartScreen)
  text("PRESS THE SPACE BAR", (width/2), height/2); 
}



function keyPressed() { 
  if (keyIsDown(32) ) {
    background("pink");
    textAlign(CENTER, CENTER);
    textSize(100);
    textFont(fHbd);
    text("Happy Birthday Medha!!", (width/2.2), height/4.5);
    clickableImage();
    collagePictures();
  } 
}
  


function clickableImage() {
  image(balloons, width - balloons.width * 4, balloons.height * 0.1 , balloons.width * 0.75, balloons.height * 0.75);
  textSize(30);
  textFont(fclickimg)
  text("Click the balloon for a surprise!", width - width * 0.89, height * 0.45);
  mouseClicked();
} 





function mouseClicked() {
    if (((mouseX <= balloons.width && mouseX >= width - balloons.width * 4) && (mouseY <= balloons.height && mouseY >= balloons.height * 0.1)) && isPlaying === false){
      hbds.play();
      image(cake, width - cake.width * 3.7, height - cake.height * 0.9, cake.width * 0.8, cake.height * 0.8)

      gifCreateImg = createImg("birthdaygif.gif");
      gifCreateImg.position(width - gifLoadImg.width * 1.1,  gifLoadImg.height * 0.1);
      
      isPlaying = true

  }

}

function collagePictures() {
  image(medha, (width - medha.width * 2.3), (height - cake.height * 1)); 
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

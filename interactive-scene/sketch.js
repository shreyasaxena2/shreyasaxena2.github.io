// Birthday Card for Medha (A friend)
// Shreya Saxena
// October 1, 2024
//

// Try not click the top left of the canvas without reason.
// Extra for Experts:
// To enhance the visual aspect of my project I added a GIF on the right side.
// The source for part of the GIF code is https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
// Another thing I added extra was a sound. The source for the song I used was https://www.chosic.com/download-audio/54599/
// I also used text and text styling elements that were not taught in class.


// Setting variables
let medha;
let balloons;
let hbds;
let gifLoadImg;
let gifCreateImg;
let fStartScreen;
let cake;
let fHbd;
let fclickimg;
let bgStartImg;


// Set the state variable
let isPlaying = false;


// This function preloads all the external files that will be used in the function
function preload() {

  // Preloads the files for the Start Screen
  bgStartImg = loadImage("startscreenimg.jpg");
  fStartScreen = loadFont("startscreenfont.otf");

  // Preloads the main screen files
  balloons = loadImage("balloon.png");
  medha = loadImage("medmed.png");
  hbds = loadSound("hbds.mp3");
  
  fHbd = loadFont("bdayfont.ttf");
  fclickimg = loadFont("clickfont.ttf");

  cake = loadImage("bdaycakeimg.png");
    gifLoadImg = loadImage("birthdaygif.gif");

}


// This function sets the width and the height of the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  startScreen();
}


function draw() { 
  keyPressed();
}



// This function has all my intial code for my start screen
function startScreen() {
  background(bgStartImg); // image background

  // Aligns the text and prints it onto the canvas
  textAlign(CENTER, CENTER);  
  textSize(65);
  textFont(fStartScreen);
  text("PRESS THE SPACE BAR", width/2.2, height/4.5); 
}


// This function is called when the space bar is pressed
function keyPressed() { 
  // If the space bar is pressed...
  if (keyIsDown(32) ) {
  background("#A7C7E7"); // pastel blue background

  // Aligns and prints the text on the main screen
  textAlign(CENTER, CENTER);
  textSize(70);
  textFont(fHbd);
  text("Happy Birthday Medha!!", width/2.2, height/4.5);
  textSize(65);
  text("Have the best day ever!!", width/1.25, height/1.5);

  // Only when this function is called do the balloons pop up
  clickableImage();

  // It is only after the start screen dissappears that the mouse should be clicked
  mouseClicked();

  // The collage pictures will only show up after the space bar has been pressed
  collagePictures();
  }
}
  

// This function sets up the image and caption which the user will click on
function clickableImage() {
  image(balloons, width - balloons.width * 2.7, balloons.height * 0.01 , balloons.width * 0.5, balloons.height * 0.5);
  textSize(25);
  textFont(fclickimg);
  text("Click the balloon for a surprise!", width - width * 0.88, height * 0.45);
} 




// This function makes the cake, song and the GIF pop up once the mouse is clicked where the balloon is
function mouseClicked() {

    // The image can only be clicked if the mouse is between starting coordinate of the image and its width/height and isPlaying is false
  if (mouseX <= balloons.width && mouseX >= width - balloons.width * 2.7 && (mouseY <= balloons.height && mouseY >= balloons.height * 0.1) && isPlaying === false){
    
    // This plays the song and the image of the cake pops up
    hbds.play();
    image(cake, width - cake.width * 2.45, height - cake.height * 0.6, cake.width * 0.5, cake.height * 0.5);

    // This creates the GIF, sets its size and position
    gifCreateImg = createImg("birthdaygif.gif", "jkhk");
    gifCreateImg.size(300, 300);
    gifCreateImg.position(width - gifLoadImg.width * 0.8,  gifLoadImg.height * 0.1);
      
    // isPlaying is set back to true to prevent the song from playing over and over again
    isPlaying = true;
  }
}


// This function places the last set of pictures on the main screen
function collagePictures() {
  image(medha, width - medha.width * 1.5, height - medha.height * 0.8, medha.width * 0.7, medha.height * 0.7); 
}


// Generative Art Demo
// Oct 4, 2024

const TILE_SIZE = 2;
let tileArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x < width; x += TILE_SIZE) {
    for (let y = 0; y < height; y += TILE_SIZE) {
      let someTile = spawnTile(x, y);
      tileArray.push(someTile);
    }
  }
}

function draw() {
  background(220);

  //display tile
  for (let myTile of tileArray) {
    line(myTile.x1, myTile.y1, myTile.x2, myTile.y2);
  }
}

function spawnTile(x, y) {
  let tile;
  let choice = random(100);

  if (choice < 50) {
    // negative slope line
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y - TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y + TILE_SIZE/2,
    };
  }
  else {
    // postive slope line
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y + TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y - TILE_SIZE/2,
    };
  }

  return tile;
}
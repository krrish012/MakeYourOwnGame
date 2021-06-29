var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var bgimg, bg1;

var car1, car2, car3, car4, car5;

var cars;

var car1img, car2img, car3img, car4img, car5img;

var count = 0;

function preload() {
    
  bgimg = loadImage("bg1.jpeg");

  car1img = loadImage("car1.png");
  car2img = loadImage("car2.png");
  car3img = loadImage("car3.png");
  car4img = loadImage("car4.png");
  car5img = loadImage("car5.png");
  }

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  
}

function draw() {
  background(255,255,255);  

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }

  drawSprites();
}
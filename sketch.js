const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var baseimage;
var board, boardImg;
var arrow, arrowImg;
var check;
var boardX;
var boardXVal;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
  boardImg = loadImage("./assets/board.png");
  arrowImg = loadImage("./assets/arrow.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight - 4);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player);

  boardX = width * 2/3;
  boardXVal = -1;
  board = Bodies.rectangle(boardX,height/3,100,100, options);
  World.add(world,board);
 
  playerArcher = new PlayerArcher( 340, playerBase.position.y - 112, 120, 120);


}

function draw() {
  background(backgroundImg);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)
  image(boardImg,boardX,board.position.y,150,200)

  Engine.update(engine);

   playerArcher.display();

   if(check == true){
    image(arrowImg,arrow.position.x,arrow.position.y,100,50);
   }

   boardX += boardXVal;

   if(boardX < width * 5/8){
     boardXVal = frameCount/50;
   }else if(boardX > width * 7/8){
     boardXVal = frameCount/-50;
   }
   if(frameCount/50 > 8){
    if(boardX < width * 5/8){
      boardXVal = 8;
    }else if(boardX > width * 7/8){
      boardXVal = -8;
    }
   }


  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}

function createArrow(){
  var options = {
    isStatic: false,
    density: 0.003
  }

  arrow = Bodies.rectangle(width/3,200,100,50,options);

  World.add(world,arrow);
  check = true;

  Matter.Body.applyForce(arrow,{x:0,y:0},{x:1,y:0});
  console.log("Works")
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    createArrow();
  }

}
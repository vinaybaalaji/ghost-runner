var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,blockGroup;
var gameState="PLAY";
var sound;
var score=0;
function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}
function setup(){
createCanvas(600,600);
  tower=createSprite(300,300,5,5);
  tower.addImage(towerImage);
  tower.velocityY=5;
  
  ghost=createSprite(200,200,20,20);
  ghost.addImage(ghostImage);
  ghost.scale=0.3
  
  sound.loop();
  
doorGroup=new Group();
  climberGroup= new Group();
  blockGroup=new Group();
}
function draw(){
  background("white");
  
  if (gameState=="PLAY"){
    score=score+Math.round(getFrameRate()/60);
  if(touches.length>0||keyDown("space")){
    ghost.velocityY=-5;
    touches=[];
  }
  ghost.velocityY=ghost.velocityY+0.5;
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-2;
  }
  if (keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+2;
  }
  
  
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(blockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
    
  spawnDoor();
  
  drawSprites();
  }
  else if(gameState=="END"){
    stroke("black");
    fill("red");
    textSize(40);
    text("GAME OVER",250,250);
    
  }
  fill("blue");
  stroke(30);
  text("score: "+score,400,50);
  
}
function spawnDoor(){
  if(frameCount%100==0){
    door=createSprite(Math.round(random(120,400)),10,5,5);
    door.addImage(doorImage);
    door.velocityY=5;
    door.lifetime=150;
    doorGroup.add(door);
    
    climber=createSprite(door.x,70,5,5);
    climber.addImage(climberImage);
    climber.velocityY=5;
    climber.lifetime=150;
    climberGroup.add(climber);
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleBlock=createSprite(door.x,80,5,5);
    invisibleBlock.visible=false;
    invisibleBlock.velocityY=5;
    blockGroup.add(invisibleBlock);
    invisibleBlock.lifetime=150;
    
    
  }
}

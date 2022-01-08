var tower,towerImg;
var door, doorImg, dGroup;
var climber,climberImg,cGroup;
var ghost,ghostImg;
var gameState="play"

function preload() {
  towerImg=loadImage("tower.png")
  doorImg=loadImage("door.png")
  climberImg=loadImage("climber.png")
  ghostImg=loadImage("ghost-standing.png")
  
  dGroup=new Group()
   cGroup=new Group()
  iGroup= new Group()
}
function setup () {
  createCanvas(600,600)
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg) 
  tower.velocityY=2;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg)
  ghost.scale=.3;
}
function draw () {
  background("black");
  
   if(gameState==="play"){
     
   
  if(tower.y>400) {
    tower.y=300;
    
    
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("SPACE")){
    ghost.velocityY=-5; 
  }
  
  ghost.velocityY=ghost.velocityY+.8;
    
  spawnDoors()
  
  if(cGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(iGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy()
    gameState="end"
  }
  
  drawSprites()
   }
  if(gameState==="end"){
    stroke("yellow")
    fill("yellow")
    textSize(40)
    text("GAME OVER",230,250)
  }
}

function spawnDoors () {
  if (frameCount%200===0) {
    var door=createSprite(200,50)
    door.addImage(doorImg);
    
    var climber=createSprite(200,110)
    climber.addImage(climberImg);
    
    var invisibleBlock=createSprite(200,115)
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    door.x=Math.round(random(120,400))
    door.velocityY=2;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=2;
    
    climber.x=door.x
    climber.velocityY=2
    
    ghost.depth=door.depth
    ghost.depth+=1;    
    
    door.lifetime=300;
    climber.lifetime=300;
    invisibleBlock.lifetime=300;
    invisibleBlock.debug=true;
    
    
    
    dGroup.add(door);
    cGroup.add(climber);
    iGroup.add(invisibleBlock);
  }
}


//creating all variables need for the game
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY= 0;
var END= 1;
var gameState = PLAY;
var score= 0;

//loading all images and sounds
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  //creating tower
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
 
  //creating ghost
  ghost= createSprite(200,300,25,25);
  ghost.addImage(ghostImg);
  ghost.scale= 0.25;
  
  //creating new groups
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
  doorsGroup= new Group();
  
  
}

function draw() {
  background(0);
  
  //Stages of game
  
  if(gameState=== PLAY){
        
    tower.velocityY = 1;
    
    //creating ghost controls
    ghost.velocityX=0;
    
    if(keyDown("space") && ghost.y>50){
      ghost.velocityY= -3;
    }
    
    ghost.velocityY= ghost.velocityY+1;

    if(keyDown("right_arrow")){
      ghost.velocityX=3;
    }

    if(keyDown("left_arrow")){
      ghost.velocityX=-3;
    }
    //condition of incremation of score
    score= score+ Math.round(getFrameRate()/30);
    
    //Tower loop
    if(tower.y > 400){
      tower.y = 300;
    }
    
    // if(ghost.isTouching(invisibleBlockGroup)){
    //   invisibleBlock.velocityX=0;
    //   ghost.velocityX=0;
    // }
   
    //what will happen if climber will touch ghost
    if(climbersGroup.isTouching(ghost)){
      gameState= END;
    }

    //if ghost goes below the canvas
    if(ghost.y>600){
      gameState= END;
    }
    
    spawnclimber();
    
  } else if(gameState === END){
    //all the things that will happen when game state is in end
    tower.velocityY=0;
    climbersGroup.setVelocityYEach(0);
    doorsGroup.setVelocityYEach(0);
    ghost.velocityY= 0;
    invisibleBlockGroup.setVelocityYEach(0);
    tower.destroy();
    climbersGroup.destroyEach()
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    ghost.destroy();
    spookySound.play();
    textSize(50);
    text("Game Over", 150,300);
    textSize(15);
    text("Press Ctrl+R to restart again",180,340);
    
  }
 
  //condition so that ghost can stay on climber
  ghost.collide(invisibleBlockGroup);
  
  drawSprites();
  
  //displaying score
  textSize(18);
  text("Score: "+score,500,50);
  text.depth=tower.depth;
  text.depth= text.depth+1;
  fill("red");
  // console.log(ghost.velocityX);
}



function spawnclimber(){
  
  if(frameCount%130===0){
    
    //creating climber
    climber= createSprite(400,145,25,25);
    climber.addImage(climberImg);
    climber.velocityY= (1+score/250);
    climber.x= Math.round(random(100,500));
    climbersGroup.add(climber);
    climber.depth= ghost.depth;
    ghost.depth= ghost.depth+1;
    climber.lifetime= 500;
    // climber.debug= true;
    climber.setCollider("rectangle",0,08,95,12);
    // if(climbersGroup.isTouching(ghost)){
    //   ghost.velocityY=0;
    // }
    
    //creating door
    door= createSprite(300,200,25,25);
    door.addImage(doorImg);
    door.scal=0.5;
    door.velocityY= 1+score/250;
    door.x= climber.x;
    door.y= climber.y-72;
    door.depth= ghost.depth;
    ghost.depth= ghost.depth+1;
    doorsGroup.add(door);   
    door.lifetime= 500;  
    
    //creating invisible block
    invisibleBlock= createSprite(400,300,100,1);
    invisibleBlock.x= climber.x;
    invisibleBlock.y= climber.y-10;
    invisibleBlock.velocityY= 1+score/250;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime= 500;
    // invisibleBlock.debug= true;

  }
}






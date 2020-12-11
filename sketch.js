//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_run, ground, ground_mh, invisibleGround, cloud_image, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, ObstaclesGroup, CloudsGroup; 
    
function preload(){
  trex_run = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_mh = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}
    
function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50, 150, 20, 50);
  trex.addAnimation("running", trex_run);
  trex.scale = 0.3;
  
  ground = createSprite(300,180,600,20);
  ground.addImage(ground_mh);
  
  invisibleGround = createSprite(300,185,600,5);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
 ObstaclesGroup = new Group();
 CloudsGroup = new Group();
    
}

function draw() {
  background(180);
  
    
  if(gameState === PLAY){

    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -3;
}
    trex.velocityY = trex.velocityY + 0.08;
    ground.velocityX = -5;
    if (ground.x < 0){
      ground.x = ground.width/2; 
    }
    spawnObstacles();
    spawnClouds();
  
  }
  
  if(gameState === END){
    ground.velocityX = 0;
 
}
   trex.collide(invisibleGround);
   drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - 6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) { 
      case 1:obstacle.addImage(obstacle1)
      break; 
      case 2:obstacle.addImage(obstacle2)
      break; 
      case 3:obstacle.addImage(obstacle3)
      break; 
      case 4:obstacle.addImage(obstacle4)
      break; 
      case 5:obstacle.addImage(obstacle5)
      break; 
      case 6:obstacle.addImage(obstacle6)
      break; 
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //lifetime = distance divided by speed
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  
    CloudsGroup.add(cloud);
  }
  
}
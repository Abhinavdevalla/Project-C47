var human,humanImg;
var backgrounds,backgroundImg;
var dynosGroup,dynoImg;
var gameCompleted,gameCompletedImg;;
var winnersSprite,winnersSpriteImg;
var ground;
var score = 0;
var gameState = "play";

function preload(){
  backgroundImg = loadImage("background.jpg");
  humanImg = loadImage("humanes.png");
  dynoImg = loadImage("31-313290_tyrannosaurus-rex-clipart-animated-dinosaur-clipart-png.png")
  gameCompletedImg = loadImage("istockphoto-1169155347-612x612.jpg")
  winnersSpriteImg = loadImage("you-win-sign-pop-art-style_175838-498.jpg")
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  backgrounds = createSprite(0,0,1300,1800);
  backgrounds.addImage(backgroundImg);
  backgrounds.scale = 7;
  backgrounds.x = backgrounds.width/2;
  backgrounds.velocityX = -5;

  human = createSprite(150,900,100,100);
  human.addImage(humanImg);
  human.scale = 0.5;

  ground = createSprite(0,windowHeight-30,1200,20);
  ground.x = ground.width/2
  ground.velocityX = -5;
  ground.visible = false;
  
  gameCompleted = createSprite(1200,600);
  gameCompleted.addImage(gameCompletedImg);
  gameCompleted.scale = 4;
  
  
  winnersSprite = createSprite(1200,800);
  winnersSprite.addImage(winnersSpriteImg);
  winnersSprite.scale = 3.4;
  dynosGroup = new Group();
}

function draw() {
  background(0,0,0);
  if(gameState === "play"){
    spawnDynos();
  score = score+Math.round(frameCount/110);
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  if(backgrounds.x<0){
    backgrounds.x = backgrounds.width/2
  }
  if(keyDown(UP_ARROW)){
    human.y-=10
  }
  if(keyDown(DOWN_ARROW)){
    human.y+=10;
  }
  if(keyDown(LEFT_ARROW)){
    human.x-=10;   
  }
  if(keyDown(RIGHT_ARROW)){
    human.x+=10
  }

  gameCompleted.visible = false;
  winnersSprite.visible = false;
}

   human.collide(ground);

   if(dynosGroup.isTouching(human)){
     gameState = "end"
   }

   if(gameState === "end"){
     gameCompleted.visible = true;
     ground.velocityX=0;
     backgrounds.velocityX=0;
     dynosGroup.setVelocityXEach(0);
     dynosGroup.setLifetimeEach(0);
     winnersSprite.visible = false;
   }

if(score>=5000){
  gameState = "playerwins";
  ground.velocityX=0;
  backgrounds.velocityX=0;
  dynosGroup.setVelocityXEach(0);
  dynosGroup.setLifetimeEach(0);
  console.log(gameState);
  gameCompleted.visible = false;
  winnersSprite.visible = true;
  backgrounds.visible = false;
  human.visible = false;

}
  drawSprites();
  stroke("white");
  textSize(25);
  fill("red")
  text("Score : " + score,100,100)
  

}

function spawnDynos(){
 if(frameCount%130 === 0){
   var dyno = createSprite(windowWidth-300,400,10,40);
   dyno.y = Math.round(random(200,windowHeight-100))
   dyno.addImage(dynoImg);
   dyno.scale = 0.6; 
   dyno.lifeTime = 500;
   dyno.velocityX=-10;
   dynosGroup.add(dyno);

 }

}
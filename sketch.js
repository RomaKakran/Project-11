var path, pathImg;
var runner_right, runnerImg;
var power, powerImg;
var bomb, bombImg, bombsGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  pathImg = loadImage("path.png");
  runnerImg = loadImage("Runner-2.png");
 powerImg = loadImage("power.png");
 bombImg = loadImage("bomb.png");
}

function setup(){
  createCanvas(600,600);

  path = createSprite(300,300);
  path.addImage("path",pathImg);
  path.velocityY = 1;

  runner_right = createSprite(200,200,50,50);
  runner_right.addImage("runner_right",runnerImg);
  runner_right.scale = 0.09;

bombsGroup = new Group();
invisibleBlockGroup = new Group();
}

function draw() {
  background(0);
if(gameState === "play"){
  if(path.y > 400){
    path.y = 300
  }

  if(keyDown("left_arrow")){
    runner_right.x = runner_right.x -3;
   }

  if(keyDown("right_arrow")){
    runner_right.x = runner_right.x +3;
   }
  if(keyDown("down_arrow")){
    runner_right.y = runner_right.y +3;
   }
    
  if(keyDown("up_arrow")){
    runner_right.y = runner_right.y -3;
   }
if(invisibleBlockGroup.isTouching(runner_right) || runner_right.y > 600){
  runner_right.destroy();
 gameState = "end";
}
spawnBombs();
drawSprites();
}
if(gameState === "end"){
  background("black");
  textSize(30);
  text("BOOM!"+ "Game Over", 230,250);
 }
}

function spawnBombs(){
  if(frameCount % 200 === 0){
bomb = createSprite(200,-50);
bomb.addImage(bombImg);
bomb.x = Math.round(random(120,400));
bomb.velocityY = 1;
bomb.lifetime = 800;
bombsGroup.add(bomb);
bomb.scale = 0.08;

runner_right.depth = bomb.depth;
runner_right.depth +=1;

invisibleBlock = createSprite(200,15);
invisibleBlock.width = bomb.width;
invisibleBlock.height = 2;
invisibleBlock.velocityY = 1;
invisibleBlock.x = bomb.x;
invisibleBlock.lifetime = 800;
invisibleBlock.debug = true;
invisibleBlockGroup.add(invisibleBlock);
}

}

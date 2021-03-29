
var bg,bgimage,overimage;
var player,playeri,playerr,playerl,dead,deadsound;
var lb,rb,ub,db;
var coinimage,coin,coingroup;
var enemy,enemyimage,enemygroup;
var count=0;
var coinsound,buttons;
var gameState="instruction";
var first,firsti;
var leaves=3;
var heart,hearti,bgsound;
var trophy,trophyimg
var yay



function preload(){
  
   bgimage=loadImage("earth.jpeg");
   trophyimg=loadImage("trophy.jpg")
  playeri=loadImage("Tobbie-the-robot.webp");
  playerl=loadImage("spaceship-sound-effects.jpg"); 
  playerr=loadImage("11right.png");
  coinimage=loadImage("Coin.png");
  enemyimage=loadImage("enemyBlack1.png")
  coinsound=loadSound("bonusMeterFull.wav")
  buttons=loadSound("buttonClick.wav")
  dead=loadImage("Dead.png");
  deadsound=loadSound("splat.wav")
  overimage=loadImage("over.jpg")
  firsti=loadImage("Firsti.jpg");
  hearti=loadImage("heart.jfif")
  bgsound=loadSound("magnet.wav")
  yay=loadSound("yay.mp3")
 
 
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg=createSprite(windowWidth/2,windowHeight/2,2,2);
  bg.addImage(bgimage);
    bg.scale= 2
  player=createSprite(windowWidth/2,windowHeight/2+50);
  lb=createSprite(-5,windowHeight/2,5,windowHeight);
  rb=createSprite(windowWidth+5,200,5,windowHeight);
  ub=createSprite(windowWidth/2,-5,windowWidth,5);
  db=createSprite(windowWidth/2,windowHeight+5,windowWidth,5);
  first=createSprite(windowWidth/2,windowHeight/2);
  first.addImage(firsti);
    first.scale=bg.scale/6;
    playeri.scale = 0.7
    playerl.scale = 0.7
    playerr.scale = 0.7
    enemyimage.scale = 0.27 
  over=createSprite(windowWidth/2-10,windowHeight/2)
      over.addImage(overimage)
      over.scale=bg.scale/6;
  over.visible=false;
  heart=createSprite(windowWidth-60,30);
  heart.addImage(hearti);
  heart.scale=0.08;
  heart.visible=false;
 coingroup=new Group();
  enemygroup=new Group();
}

function draw() {
  background("black");
  if(gameState==="instruction"){
    if(keyDown("space")||touches.length>0){
      first.destroy();
      gameState="serve";
      touches=[];
    }
  }



  drawSprites();
   textSize(25)
  fill("red")
  text("coins "+count,10,25)
  if(gameState==="serve"){
    leaves=3
    fill("red")
    textSize(17);
    text("press Space/Touch to start",windowWidth/2-100,windowHeight/2);
    player.visible=false;
    bg.velocityY=0; 
    if(touches.length>0||keyDown("space")){
      gameState="play"
      touches=[];
      count=0
    }
  }



  if(gameState==="play"){
    coins();
  enemys();
    
    heart.visible=true;
  if(bg.y>windowHeight-140){
    bg.y=40
  }
    if(touches.length>0){
      bgsound.play();
    }
    text(leaves,windowWidth-25,25)
  bg.velocityY=2+count/3;
    player.visible=true;
  player.addImage(playeri)
  player.scale=bg.scale/11;
  
  player.bounceOff(lb);
  player.bounceOff(rb);
  player.bounceOff(ub);
  player.bounceOff(db);
  
  player.velocityX=0;
  player.velocityY=0;
  
    player.x=mouseX;
    player.y=mouseY;
    if(player.x<windowWidth/2-40){
      player.addImage(playerl)
    }
    if(player.x>windowWidth/2+40){
      player.addImage(playerr)
    }
    
  if(player.isTouching(coingroup)){
    coingroup.destroyEach();
    count=count+1;
    coinsound.play();
  }
    if(player.isTouching(enemygroup)){ 
      leaves=leaves-1
      deadsound.play();
      enemygroup.destroyEach();
  }
    if(leaves===0){
      gameState="end";
    }
    }
  if(gameState==="end"){  
      reset();
    if(touches.length>0){
      gameState="serve"
      over.lifetime=0;
      touches=[];
    }
  }
if (count === 100 ) {
  text("Special power unlocked ! press space to kill enemy  ", 170, 70);
  textSize(20);
  fill("yellow");

  if (keyDown("space")) {
    enemy.destroy();
  }
  }

  if (count ===300) {
    trophy=createSprite(500,500)
    trophy.addImage(trophyimg);
    bg.velocityY=0
    enemy.velocityX=0
    enemy.velocityX=0
    enemy.visible=false;
    text("You Won !!!", 341, 172);
    yay.play();
    
  }
  
  
  
  //console.log(bg.scale)
}


function coins(){
  if(frameCount%40===0){
    coin=createSprite(random(50,windowWidth-50),-2,20,20);
    coin.addImage(coinimage);
    coin.scale=bg.scale/69.099;
    coin.velocityY=bg.velocityY;
    coin.lifetime=coin.velocityY/windowHeight
    coingroup.add(coin);
    coin.debug=false;
    coin.setCollider("circle",0,0,500)
    console.log(coin.scale)
  }
}
function enemys(){
    if(frameCount%80===0){
    enemy=createSprite(random(50,windowWidth-50),-2,20,20);
    enemy.addImage(enemyimage);
    enemy.velocityY=bg.velocityY+count/10;
    enemy.lifetime=enemy.velocityY/windowHeight;
      enemygroup.add(enemy);
      enemy.scale=bg.scale/2
  }
  }
function reset(){
  player.addImage(dead)
      bg.velocityY=0;
      player.velocityX=0;
      player.velocityY=0;
      coingroup.destroyEach();
      enemygroup.setVelocityYEach(0);
  over.visible=true;
  
}
//variáveis: ok

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var rua, rua_estrada;
var invisibleGround;

var samurai, samurai_run;
var fogo, fogo_run;
var fireGroup;

var score;
var gameOverImg;


//preload: ok
function preload(){
 rua_estrada = loadImage("rua.png");
 samurai_run = loadAnimation("samurai-1.png","samurai-2.png","samurai-3.png","samurai-4.png");
 fogo_run = loadAnimation("foguinho1.png","foguinho2.png","foguinho3.png","foguinho4.png","foguinho5.png","foguinho6.png");
 gameOverImg = loadImage("gameover.png");
}

//setup: ok
function setup() {
    createCanvas(400,400);
    //console.log(gameState);

    estrada = createSprite(600,150,10,10);
    estrada.addImage("estrada",rua_estrada);
    estrada.scale = 1;
    estrada.x = estrada.width /2;
    estrada.velocityX = -1;

    samurai = createSprite(50,320,10,10);
    samurai.addAnimation("run",samurai_run);
    samurai.scale = 0.35;

    gameOver = createSprite(200,180,10,10);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;

    invisibleGround = createSprite(0,390,800,10); 
    invisibleGround.visible = false;

    fireGroup = createGroup();
    
    samurai.setCollider("circle",0,0,60);
    samurai.debug = false;
     
    score = 0;

}
//draw: ok
function draw() {
    background("black");
    text("Score: "+ score, 330,30);
    
  
    if(gameState===PLAY){
      gameOver.visible = false;
      score = score + Math.round(frameCount/100);

       if(keyDown("space")&& samurai.y >= 320) {
        samurai.velocityY = -14;
      }

      samurai.velocityY = samurai.velocityY + 0.8;
      spawnFire()

      if(fireGroup.isTouching(samurai)){
        gameState = END;
        
       }
    }
    else if(gameState ===END){
      gameOver.visible = true;

    }
    samurai.collide(invisibleGround);

     drawSprites();
  }

   
      function spawnFire(){
      if (frameCount % 60 === 0) {
        fogo = createSprite(450,380,10,10);
        fogo.addAnimation("run",fogo_run);
        fogo.y = Math.round(random(370,395));
        fogo.scale = 0.08;
        fogo.velocityX = -3;
        //fogo.velocityX = -(90 + score/100);
        fogo.collide(invisibleGround);

        fireGroup.add(fogo);
      }
    }

// aumentar a velocidade dos foguinhos conforme o tempo, colocar som e se possível zerar a velocidade dos objetos no gameOver.
//usa o PRO-C16-AA2-main pra base.





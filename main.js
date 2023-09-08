function setup(){
    canvas = createCanvas(400,400);
    canvas.parent("canvas");

    video = createCapture(VIDEO);
    video.size(400,400);
    video.parent("video");

    poseNet = ml5.poseNet(video, pronto);
    poseNet.on("pose", gotR)

    raquete = createSprite(20,200,20,100);
    raquete2 = createSprite(380,200,20,100);
    parede1 = createSprite(200,0,400,1);
    parede2 = createSprite(200,400,400,1);
    
    bola = createSprite(200,200,20,20);
    
}
function pronto(){
    console.log("pronto")
}
var pontos = 0;
var pulsoY = 50;
var pulsoX = 0;
var p = 0;

function gotR(r){
    if(r.length>0){
        p = r[0].pose.keypoints[10].score 
        pulsoY = r[0].pose.rightWrist.y;
    }
   
}
function draw(){

    background("white");
    if(p>0.2 && pulsoY < 350 && pulsoY>50){
        raquete.y = pulsoY;
    }
   
  
    textSize(30);
    text(pontos, 50,50);

    if(keyDown("space")){
        bola.velocityX = 2;
        bola.velocityY = 2; 
        raquete2.velocityY = 2;
    }

    if(bola.isTouching(raquete)){
        pontos++;
        reiniciar()
    }
    if( bola.x > 400|| bola.x < 0){
        reiniciar()
    }

    bola.bounceOff(raquete);
    bola.bounceOff(raquete2);
    bola.bounceOff(parede1);
    bola.bounceOff(parede2);

    raquete2.bounceOff(parede1);
    raquete2.bounceOff(parede2);

    raquete.collide(parede1);
    raquete.collide(parede2);

    drawSprites()

}

function reiniciar(){
    raquete2.velocityY = 0;
    raquete2.y = 200;
    bola.velocityX = 0;
    bola.velocityY = 0;
    bola.x = 200;
    bola.y = 200;
}
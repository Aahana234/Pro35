var balloon;
var db,position;
var backgroundImage;
var height;

function preload(){

  backgroundImage = loadImage("sprites/Hot Air Balloon-01.png");
  balloonImage2 = loadAnimation("sprites/Hot Air Balloon-04.png");
}


function setup() {

  db = firebase.database();

  createCanvas(1000,900);
   balloon = createSprite(400, 200, 50, 50);
   balloon.addAnimation("HotAirBalloon",balloonImage2);
   balloon.scale = 0.7;

   var balloonPosition = db.ref("balloon/height");
   balloonPosition.on("value",readheight,showError);

}

function draw() {
  background(backgroundImage);  


if(keyDown(LEFT_ARROW)){
//balloon.x = balloon.x -10;
updateHeight(-10,0);
balloon.addAnimation("HotAirBalloon",balloonImage2);

}
else if(keyDown(RIGHT_ARROW)){
//balloon.x = balloon.x + 10;
updateHeight(10,0);
balloon.addAnimation("HotAirBalloon",balloonImage2);
}

else if(keyDown(UP_ARROW)){
  // balloon.x = balloon.y-10;
  updateHeight(0,-10);
  balloon.addAnimation("HotAirBalloon",balloonImage2);
  balloon.scale= balloon.scale - 0.01;
}

else if(keyDown(DOWN_ARROW)){
//balloon.y = balloon.y +10;
updateHeight(0,+10);
balloon.addAnimation("HotAirBalloon",balloonImage2);
balloon.scale = balloon.scale +0.01;
}

/* if(keyDown(UP_ARROW)){
updateHeight(0,-10);
balloon.scale = balloon.scale -0.01;
} */
  drawSprites();
}

function updateHeight(x,y){
db.ref('balloon/height').set({
  'x': balloon.x + x,
  'y': balloon.y + y
})

}

function readheight(data){
height = data.val();
balloon.x = height.x;
balloon.y = height.y;
}

function showError(){
console.log("Error in writing to the database");
}
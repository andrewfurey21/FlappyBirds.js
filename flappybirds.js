// Code : Andrew Furey

let bird;
let pipes;
let score = 0;
let speed = 1;
let fC = 220;
let spacing = 120;
let highScore = 0;



function setup() {

pipes = [];
createCanvas(400, 600);
bird = new Bird();
pipes.push(new Pipe());
}

function draw() {


background(51);
bird.show();
bird.update();


if (pipes.length === 0){
  pipes.push(new Pipe())
}
for (let pipe of pipes){
pipe.show();
pipe.move();
pipe.incSpeed();
pipe.check(bird);


 if (pipes.length > 3){
 pipes.splice(0, 1);
 }

 if (pipe.chooseWhen()){
   pipes.push(new Pipe());
 }
}
bird.pScore();
if(score > highScore){
  highScore = score;
}




}


function keyTyped() {
  if (key === ' ')
   bird.lift();
}


function Bird() {

  this.upForce = -10;
  this.x = 50;
  this.y = height / 2;
  this.vel = 0;
  this.grav = .6;
  this.r = 15;



}

Bird.prototype.show = function() {
  noStroke();
  fill(255);
  ellipse(this.x, this.y, this.r * 2, this.r * 2);
}

Bird.prototype.pScore = function(){
  this.score = score;
  textSize(10);
  text('SCORE', 2, 10);
  fill(0, 100, 255);
  textSize(32);
  text(this.score, 10, 40);

  //High SCORE
  textSize(10);
  text('HIGH SCORE', 45, 10);
  fill(100, 255, 50);
  textSize(32);
  text(highScore, 60, 40);

}






  Bird.prototype.lift = function() {
    this.vel += this.upForce;
  }

  Bird.prototype.update = function() {
    this.vel += this.grav;
    this.y += this.vel;
    //this.grav *= .9;


    if (this.y + this.r >= height){
      this.y = height - this.r;
      this.vel = 0;
    } else if (this.y - this.r <= 0){
      this.y = this.r;
      this.vel = 0;
    }
  }




function resetGame(){

//  frameCount = 0;

  pipes = new Array();
  bird = new Bird();
}



function Pipe() {
  this.checked = 0;
  this.spacing = spacing;
  this.x = width;
  this.y1 = 0;
  this.w = 20;
  this.height1 = int(random(10, height - this.spacing))
  this.y2 = this.height1 + this.spacing;
  this.height2 = height - this.y2;
  this.speed = speed;
  this.sCheck = 0;
  this.gen = 0;


}

Pipe.prototype.check = function(bird){
  if (bird.x + bird.r > this.x && bird.x - bird.r < this.x + this.w){
  if (bird.y - bird.r <= this.height1 || bird.y +  bird.r >= this.y2){
    speed = 1;
    score = 0;
    spacing = 120;
    fC = 220;
    this.sCheck++;
    //this.sCheck++;
    resetGame();
    //create reset function
}
}

  if (this.checked === 0){
    if (bird.x - bird.r > this.x + this.w){
      score++;
     this.checked = 1;
    }
  }
}
Pipe.prototype.show = function() {
noStroke();
fill(255);
rect(this.x, this.y1, this.w, this.height1, 0, 0, 5, 5);
rect(this.x, this.y2, this.w, this.height2, 5, 5, 0, 0);
}

Pipe.prototype.move = function(){
  this.x -= speed;
}

Pipe.prototype.off = function(){
  if (this.x === -this.w){
    return true;
  } else {
    return false;
  }
}


Pipe.prototype.chooseWhen = function(){
  if(this.x + this.w <= width / 2 && this.gen === 0){
    this.gen = 1;
    return true;
  } else {
    return false
  }
}

Pipe.prototype.incSpeed = function(){
  if (score > 0 && score % 5 === 0){
    if(this.sCheck === 0){
    speed += .075;
    this.sCheck++;
  }

  }
}

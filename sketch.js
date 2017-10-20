var canvas;
var x = 0
var y = 0
var canvasWidth = 1450
var canvasHeight = 850

var particleSys

function setup(){
  canvas = createCanvas(canvasWidth, canvasHeight)
  canvas.position(0, 0)
  background(0)

  particleSys = new ParticleSystem()
  particleSys.addParticles(13)
}

function draw(){
  background(0)
  particleSys.run()
  particleSys.drawToEachOther()
  //particleSys.drawToMouse(mouseX, mouseY)
  //console.log("Mouse " + mouseX + " " + mouseY)
}

var ParticleSystem = function () {
  this.particles = []
};
ParticleSystem.prototype.addParticles = function(noOfPoints){
  for (var i = 0; i < noOfPoints; i++) {
    this.particles.push(new Particle(createVector(Math.floor((Math.random() * canvasWidth) + 1), Math.floor((Math.random() * canvasWidth) + 1))))
  }
};
ParticleSystem.prototype.addParticle = function () {
  var x = 0;
  var y = 0;

  if(((Math.random() * 2) - 1) >= 0.){
    x = Math.floor(Math.random() * canvasWidth)
    y = Math.floor(Math.random() * 2) * canvasHeight
  } else {
    x = Math.floor(Math.random() * 2) * canvasWidth
    y = Math.floor(Math.random() * canvasHeight)
  }
  //console.log("New particle " + x + " " + y)
  positionVect = createVector(x, y)

  this.particles.push(new Particle(positionVect))
  //console.log("new particle")
};
ParticleSystem.prototype.drawToMouse = function(mousexpos, mouseypos){
  stroke(255)
  for (var i = 0; i <this.particles.length; i++) {
    line( this.particles[i].position.x,
          this.particles[i].position.y,
          mousexpos,
          mouseypos)
  }
  noStroke()
}
//don't use it XD
//clearly a mess
ParticleSystem.prototype.drawToEachOther = function(){
  stroke(255)
  for (var i = 0; i <this.particles.length; i++) {
    var ipart = this.particles[i]
    for (var j = 0; j < this.particles.length; j++) {
      line( this.particles[j].position.x,
          this.particles[j].position.y,
          ipart.position.x,
          ipart.position.y)
    }
  }
  noStroke()
}
ParticleSystem.prototype.run = function(){
  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i]
    p.run()
    if(p.isParticleOnCanvas() != true){
      //this.particles.splice(i, 1)
      //this.addParticle()
      p.bounce() // made the particle bounce from the canvas edge

    }
  }
};
var Particle = function(positionVect){
  this.position = positionVect
  this.velocity = createVector((Math.random() * 4) - 2, (Math.random() * 4) - 2)
};
Particle.prototype.run = function(){
  this.updatePosition()
  this.displayPart()
};
Particle.prototype.displayPart = function() {
  //stroke(0)
  ellipse(this.position.x, this.position.y, 10, 10)
};
Particle.prototype.updatePosition = function(){
  this.position.add(this.velocity)
};
Particle.prototype.isParticleOnCanvas = function (){
  if(this.position.x >= canvasWidth || this.position.x <= 0){
    return false;
  }
  else if (this.position.y >= canvasHeight || this.position.y <= 0) {
    return false;
  }
  return true;
};
Particle.prototype.bounce = function() {
  if (this.position.x < 0) {
		this.position.x = 0;
		this.velocity.x *= -1;
	}
 	if (this.position.y < 0) {
 		this.position.y = 0;
 		this.velocity.y *= -1;
 	}
 	if (this.position.x > canvasWidth) {
 		this.position.x = canvasWidth;
 		this.velocity.x *= -1;
 	}
  if (this.position.y > canvasHeight) {
 		this.position.y = canvasHeight;
 		this.velocity.y *= -1;
 	}
}

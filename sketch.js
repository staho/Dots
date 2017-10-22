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
  particleSys.addParticles(100)
}

function draw(){
  background(0)
  particleSys.run()
  particleSys.drawToEachOther()
  //particleSys.drawToPoint(mouseX, mouseY)
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
    if(y === 0) y = -30
    else y+= 30
  } else {
    x = Math.floor(Math.random() * 2) * canvasWidth
    y = Math.floor(Math.random() * canvasHeight)
    if(x === 0) x = -30
    else x+= 30
  }
  //console.log("New particle " + x + " " + y)
  positionVect = createVector(x, y)

  this.particles.push(new Particle(positionVect))
  //console.log("new particle")
};
ParticleSystem.prototype.drawToPoint = function(mousexpos, mouseypos){

  for (var i = 0; i <this.particles.length; i++) {
    var xpos = this.particles[i].position.x
    var ypos = this.particles[i].position.y

    var distance = dist(xpos, ypos, mousexpos, mouseypos)
    if(distance < 255){
      stroke(255, 255, 255, 255 - distance)
      line( xpos,
            ypos,
            mousexpos,
            mouseypos)
    }
  }
  noStroke()
}
//don't use it XD
//clearly a mess
ParticleSystem.prototype.drawToEachOther = function(){
  for (var i = 0; i <this.particles.length; i++) {
    var ipart = this.particles[i]

    var xpos = this.particles[i].position.x
    var ypos = this.particles[i].position.y


    for (var j = 0; j < this.particles.length; j++) {
      var xposInner = this.particles[j].position.x
      var yposInner = this.particles[j].position.y

      var distance = dist(xpos, ypos, xposInner, yposInner)
      if(distance < 255){
        stroke(255, 255, 255, 255 - distance)
        line( xpos,
              ypos,
              xposInner,
              yposInner)
      }
    }
  }
  noStroke()
}
ParticleSystem.prototype.run = function(){
  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i]
    p.run()
    //if(p.superiorParticle === true){
    //  this.drawToPoint(p.position.x, p.position.y)
    //}
    if(p.isParticleOnCanvas() != true){
      this.particles.splice(i, 1)
      this.addParticle()
      //p.bounce() // made the particle bounce from the canvas edge

    }
  }
};
var Particle = function(positionVect){
  this.superiorParticle = false
  this.calcSuperior = Math.random()
  if(this.calcSuperior > 0.55 && this.calcSuperior < 0.56) {this.superiorParticle = true}
  this.position = positionVect
  this.velocity = createVector((Math.random() * 6) - 3, (Math.random() * 6) - 3)
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
  if(this.position.x >= canvasWidth + 30 || this.position.x <= 0 - 30){
    return false;
  }
  else if (this.position.y >= canvasHeight + 30 || this.position.y <= 0 - 30) {
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

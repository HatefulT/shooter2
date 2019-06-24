var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.a = 0;
  this.fov = FIELD_OF_VIEW;
  this.rays = [];
  for(var i=0; i<this.fov/RAYS_SHIFT; i+=1) {
    this.rays.push(new Ray(i, this.x, this.y))
  }
  this.scopeRadius = 100;
  this.recountRays();
};
Player.prototype.recountRays = function() {
  this.fov = (keys.c?FIELD_OF_VIEW/3*2 : FIELD_OF_VIEW);
  for(var i=0; i<this.rays.length; i++) {
    var na = this.a + (i*this.fov / this.rays.length) - this.fov/2;
    this.rays[i].recount(this.x, this.y, na);
  }
};
Player.prototype.draw = function () {
  noStroke();
  fill(colors.blue);
  circle(0, 0, 10, 10);
  for(var i=0; i<this.rays.length; i++) {
    this.rays[i].draw();
  }
  stroke(colors.red);
  this.scopeRadius = (keys.c?200:100);
  line(0, 0, this.scopeRadius, 0);
};

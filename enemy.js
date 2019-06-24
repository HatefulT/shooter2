var Enemy = function(x, y) {
  this.x = x;
  this.y = y;
};
Enemy.prototype.draw = function () {
  noStroke();
  fill(colors.red);
  var aa = atan2(this.y-player.y, this.x-player.x) - player.a,
      rr = dist(this.x, this.y, player.x, player.y);
  circle(cos(aa)*rr, sin(aa)*rr, 20, 20);
};
Enemy.prototype.rotate = function () {
  this.a = atan2(player.y-this.y, player.x-this.x);
};
Enemy.prototype.update = function() {
  this.rotate();
  var v = p5.Vector.fromAngle(this.a);
  v.normalize();
  v.mult(ENEMY_SPEED);
  if(getDist(this.x+v.x, this.y) < ENEMY_COLLIS_RADIUS) v.x = 0;
  if(getDist(this.x, this.y+v.y) < ENEMY_COLLIS_RADIUS) v.y = 0;
  this.x += v.x;
  this.y += v.y;
};

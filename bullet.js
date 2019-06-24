var Bullet = function(x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
}

Bullet.prototype.update = function () {
  var newX = this.x+this.vx,
      newY = this.y+this.vy;

  for(var i=0; i<enemies.length; i++) {
    var d = dist(this.x, this.y, enemies[i].x, enemies[i].y);
    if(d < (BULLET_COLLIS_RADIUS+ENEMY_COLLIS_RADIUS)) {
      enemies.splice(i, 1);
      return null;
    }
  }
  if(getDist(newX, newY) < BULLET_COLLIS_RADIUS) {
    return null;
  }
  this.x = newX;
  this.y = newY;
  return this;
};

Bullet.prototype.draw = function () {
  noStroke();
  fill(colors.blue);
  var aa = atan2(this.y-player.y, this.x-player.x) - player.a,
      rr = dist(this.x, this.y, player.x, player.y);
  circle(cos(aa)*rr, sin(aa)*rr, BULLET_COLLIS_RADIUS*2);
};

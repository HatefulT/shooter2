var Wall = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};
Wall.prototype.draw = function () {
  noStroke();
  fill(colors.white);
  var x = this.x+width/2 - player.x,
      y = this.y+height/2 - player.y;
  rect(x, y, this.w, this.h, 1);
};
Wall.prototype.getDist = function (x, y) {
  var dx = max(this.x-x, x-(this.x+this.w), 0),
      dy = max(this.y-y, y-(this.y+this.h), 0);
  return sqrt(pow(dx, 2)+pow(dy, 2));
};

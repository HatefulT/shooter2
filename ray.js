var MAX_MARCH_STEPS = 100,
    MAX_RAY_D = 700,
    STOP_F = 0.1;

var Ray = function(a, playerx, playery) {
  this.a = a;
  this.x = playerx;
  this.y = playery;
  this.march();
}
Ray.prototype.recount = function (x, y, a) {
  this.x = x;
  this.y = y;
  this.a = a;
  this.march();
};
Ray.prototype.march = function () {
  var d = getDist(this.x, this.y);
  var x = this.x+d*cos(this.a),
      y = this.y+d*sin(this.a);
  for(var i=0; i<MAX_MARCH_STEPS; i++) {
    var f = getDist(x, y);
    x += f*cos(this.a);
    y += f*sin(this.a);
    d+=f;
    if(d >= MAX_RAY_D) {
      d = MAX_RAY_D;
      break;
    } else if(f<STOP_F) break;
  }
  this.r = d;
  return d;
};
Ray.prototype.draw = function() {
  stroke(colors.light_black);
  line(0, 0, cos(this.a - player.a)*this.r, sin(this.a - player.a)*this.r);
};

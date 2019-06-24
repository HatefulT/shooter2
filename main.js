var w, h, mapWidth, mapHeight, colors, player, walls = [], enemies = [], bullets = [],
  PLAYER_SPEED = 5, PLAYER_ROTATE_SPEED = 0.1, RAYS_SHIFT = 0.02,
  ENEMY_SPEED = 4, FIELD_OF_VIEW, PLAYER_COLLIS_RADIUS = 10, RELOAD_TIME = 20,
  BULLET_COLLIS_RADIUS = 1, BULLET_SPEED = 10, ENEMY_COLLIS_RADIUS = 20,
  pScreenX, pScreenY, reloading = 0;

var setup = function() {
  FIELD_OF_VIEW =  PI/2;
  colors = {
    white: color(250, 244, 245),
    red: color(230, 57, 70),
    black: color(34, 24, 28),
    light_black: color(53, 57, 60),
    blue: color(77, 108, 250)
  };
  mapWidth = 1000; mapHeight = 1000;
  createCanvas(windowWidth, windowHeight);
  pScreenX = width/2;
  pScreenY = height*0.9;
  for(var i=0; i<20; i++) {
    var x = random(mapWidth),
        y = random(mapHeight);
    walls.push(new Wall(x, y, min(random(10, 150), mapWidth-x), min(random(10, 150), mapHeight-y)));
  }
  walls.push(new Wall(-10, -10, mapWidth+20, 10));
  walls.push(new Wall(-10, -10, 10, mapHeight+20));
  walls.push(new Wall(mapWidth, -10, 10, mapHeight+20));
  walls.push(new Wall(-10, mapHeight, mapWidth+20, 10));
  player = new Player(10, 10);
  spawnWave(10);
}

var draw = function() {
  background(colors.black);
  noStroke();

  translate(pScreenX, pScreenY);
  rotate(-PI/2);

  // fill(colors.light_black);
  // circle(width/2, height/2, getDist(player.x, player.y));

  // for(var i=0; i<walls.length; i++) {
  //   if(dist(player.x, player.y, walls[i].x+walls[i].w/2, walls[i].y+walls[i].h/2) < MAX_RAY_D/2) walls[i].draw();
  // }
  var newBullets = [];
  for(var i=0; i<bullets.length; i++) {
    var ii = bullets[i].update();
    if(ii != null) {
      newBullets.push(ii);
      ii.draw();
    }
  }
  bullets = newBullets;
  for(var i=0; i<enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
  }
  move();
  rotatePlayer();
  shoot();
  player.draw();
}

var shoot = function() {
  if(keys.space && reloading%RELOAD_TIME === 0) {
    console.log('a')
    bullets.push(new Bullet(player.x, player.y, cos(player.a)*BULLET_SPEED, sin(player.a)*BULLET_SPEED));
    reloading = 1;
  } else if(reloading%RELOAD_TIME !== 0) reloading++;
}
var spawnWave = function(c) {
  for(var i=0; i<c; i++) {
    var found = false;
    for(var a=0; a<100; a++) {
      var x = random(mapWidth),
          y = random(mapHeight);
      if(getDist(x, y) < 20) continue;
      else {
        enemies.push(new Enemy(x, y));
        found = true;
        break;
      }
    }
    if(!found) break;
  }
}
var getDist = function(x, y) {
  var minD = 10000;
  for(var i=0; i<walls.length; i++) {
    minD = min(minD, walls[i].getDist(x, y));
  }
  return minD;
}
var rotatePlayer = function() {
  var d = (keys.o?-1:0) + (keys.p?1:0);
  player.a += d * PLAYER_ROTATE_SPEED / (keys.c?4:1);
  player.a = player.a % TWO_PI;
  if(player.a<0) player.a = (TWO_PI + player.a);
  player.recountRays();
}
var move = function() {
  var h = ( (keys.left?-1:0)+(keys.right?1:0) ),
      v = ( (keys.up?1:0) + (keys.down?-1:0) ),
      a = player.a;
  if( h === 0 ) a += (v===1 ? 0 : (v===-1 ? PI : 0));
  else if( h !== 0 && v === 0 ) a += (h===1 ? PI/2 : (h===-1?-PI/2:0));
  else if( h < 0 && v < 0 ) a += - PI/4*3;
  else if( h !== 0 && v !== 0 ) a += ( (h===1 ? PI/2 : (h===-1?-PI/2:0)) + (v===1 ? 0 : (v===-1 ? PI : 0)) )/2;

  var vec = p5.Vector.fromAngle(a);
  if(v === 0 && h === 0) vec.mult(0);
  vec.mult(PLAYER_SPEED);
  if(getDist(player.x+vec.x, player.y) < PLAYER_COLLIS_RADIUS) vec.x = 0;
  if(getDist(player.x, player.y+vec.y) < PLAYER_COLLIS_RADIUS) vec.y = 0;
  player.x += vec.x;
  player.y += vec.y;
  player.recountRays();
}
var keys = {
  right: false,
  left: false,
  up: false,
  down: false,
  space: false,
  o: false,
  p: false,
  c: false,
  cc: false
};
var toggle = function() {
  switch(key.toLowerCase()) {
    case 'a':
      keys.left = !keys.left;
    break;
    case 'ф':
      keys.left = !keys.left;
    break;
    case 'w':
      keys.up = !keys.up;
    break;
    case 'ц':
      keys.up = !keys.up;
    break;
    case 's':
      keys.down = !keys.down;
    break;
    case 'ы':
      keys.down = !keys.down;
    break;
    case 'd':
      keys.right = !keys.right;
    break;
    case 'в':
      keys.right = !keys.right;
    break;
    case 'o':
      keys.o = !keys.o;
    break;
    case 'щ':
      keys.o = !keys.o;
    break;
    case 'p':
      keys.p = !keys.p;
    break;
    case 'з':
      keys.p = !keys.p;
    break;
    case ' ':
      keys.space = !keys.space;
    break;
    case 'c':
      keys.c = !keys.c;
    break;
    case 'с':
      keys.cc = (keys.cc+1)%4;
      keys.c = keys.cc >= 2;
    break;
  }
}
var keyPressed = toggle;
var keyReleased = toggle;

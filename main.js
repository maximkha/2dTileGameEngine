var ge;

var grassBlock;
var obsidianBlock;

var chicken;

var ftype = 0;

window.onload = function(){
  //var ghe = new tdGE(document.getElementById('myCanvas'),500,500);
  //document.append(ge.getTexture("textures/grass.jpg"));
  //var text1 = ghe.getTexture("textures/grass.jpg");
  //text1.onload = function(){ghe.setMapTexture(text1);};
  //console.log(ge);
  ge = new GE.gameEngine(document.getElementById('myCanvas'),512,512);
  ge.textureUrl.push("textures/grass.jpg");
  ge.textureUrl.push("textures/obsidian.jpg");
  ge.textureUrl.push("textures/console.png");

  ge.textureUrl.push("textures/chicken.png");
  ge.textureUrl.push("textures/antichicken.png");
  //ge.textureUrl.push("textures/grass0.jpg");
  ge.loadTextures(0,ready);
  //window['test'] = ge;
}
function ready(){
  grassBlock = new GE.block(ge.textures[0],"grass");
  obsidianBlock = new GE.block(ge.textures[1],"obsidian");
  chicken = new GE.entity(0,0,ge.textures[3]);

  ge.setUpMap(grassBlock);
  ge.renderMap();
  ge.bindMouseClick(clickChicken);
  console.log(ge);

  chicken.update = function(game){

    //if (Math.random()<0.01) { // allow charge flips
    if (Math.random()<0) { // no charge flips
      this.friendly = !this.friendly;
      if (this.friendly) {
        this.texture = game.textures[3];
      } else {
        this.texture = game.textures[4];
      }
    }

    var dphi = 0.5*(2*Math.random()-1);
    var x1 = this.x + 0.2*Math.cos(this.phi + dphi);
    var y1 = this.y + 0.2*Math.sin(this.phi + dphi);
    var x2 = this.x + 0.2*Math.cos(this.phi - dphi);
    var y2 = this.y + 0.2*Math.sin(this.phi - dphi);
    var s1 = 0, s2 = 0;
    var me = this.friendly;
    game.entities.forEach(function(e){
      if (me == e.friendly) {
	s1 -= (x1-e.x)*(x1-e.x) + (y1-e.y)*(y1-e.y);
	s2 -= (x2-e.x)*(x2-e.x) + (y2-e.y)*(y2-e.y);
      } else {
	s1 += (x1-e.x)*(x1-e.x) + (y1-e.y)*(y1-e.y);
	s2 += (x2-e.x)*(x2-e.x) + (y2-e.y)*(y2-e.y);
      }
    });
    if (s1<s2) { // same charges repel, opposite charges attract
    //if (s1>s2) { // same charges attract, opposite charges repel
      this.x = x1; this.y = y1; this.phi += dphi;
    } else {
      this.x = x2; this.y = y2; this.phi -= dphi;
    }

    // wrap around
    //if (this.x>16) this.x-=16; else if (this.x<0) this.x+=16;
    //if (this.y>16) this.y-=16; else if (this.y<0) this.y+=16;

    // redirect from edges
    if (this.x>15.2 || this.x<0.8 || this.y>15.2 || this.y<0.8) {
      this.phi = Math.atan2(8-this.y, 8-this.x);
    }
  };

  setInterval(function(){ge.updateEntities();},100);
}

function clickSolidBlock(e){
  var c = ge.getCoordFromClick(e);
  console.log(ge.map[c.x][c.y]);
  if(!ge.map[c.x][c.y].isOccupiedByEntity){
    ge.map[c.x][c.y].isSolid = true;
  }
}

function clickChicken(e){
  var c = ge.getCoordFromClick(e);
  console.log(ge.map[c.x][c.y]);
  if(ge.map[c.x][c.y].type == "grass"){
    //ge.setBlock(c.x,c.y,obsidianBlock);
    //console.log("LongRide!");
    var tchicken = Object.assign({},chicken);
    tchicken.x = c.x;
    tchicken.y = c.y;
    tchicken.phi = 2*Math.random()*Math.PI;
    ////tchicken.friendly = Math.random()>0.5; // create charges randomly
    tchicken.friendly = ftype==0; ftype = 1-ftype; // create charges like +-+-
    if(!tchicken.friendly) tchicken.texture=ge.textures[4];
    console.log(tchicken);
    ge.placeEntity(tchicken);
    //ge.renderMap();
  }
}

function clickHndlr(e){
  var c = ge.getCoordFromClick(e);
  //console.log(ge.map[c.x][c.y]);
  //console.log(computerBlock);
  if(typeof ge.map[c.x][c.y].onClick == "function"){
    console.log(ge.map[c.x][c.y]);
    ge.map[c.x][c.y].onClick();
  }
}

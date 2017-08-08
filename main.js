var ge;

var grassBlock;
var obsidianBlock;
var computerBlock;

var chicken;

window.onload = function(){
  //var ghe = new tdGE(document.getElementById('myCanvas'),500,500);
  //document.append(ge.getTexture("textures/grass.jpg"));
  //var text1 = ghe.getTexture("textures/grass.jpg");
  //text1.onload = function(){ghe.setMapTexture(text1);};
  //console.log(ge);
  ge = new GE.gameEngine(document.getElementById('myCanvas'),500,500);
  ge.textureUrl.push("textures/grass.jpg");
  ge.textureUrl.push("textures/obsidian.jpg");
  ge.textureUrl.push("textures/console.png");

  ge.textureUrl.push("textures/chicken.png");
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
  ge.bindMouseClick(clickHndlr);
  console.log(ge);

  chicken.update = function(game){
    //console.log(this);
    var oldx = this.x;
    var oldy = this.y;
    var tx = this.x;
    var ty = this.y;
    game.map[tx][ty].isOccupiedByEntity = false;
    game.map[tx][ty].occupyingEntity = null;
    var r = Math.floor(Math.random() * 4) + 1;
    if(r == 1) tx-=1;
    if(r == 2) tx+=1;
    if(r == 3) ty+=1;
    if(r == 4) ty-=1;
    try {
      if(game.map[tx][ty].isSolid == false && !ge.map[tx][ty].isOccupiedByEntity)
      {
        this.x = tx; this.y = ty;
        game.map[tx][ty].isOccupiedByEntity = true;
        game.map[tx][ty].occupyingEntity = this;
      } else {this.x = oldx; this.y = oldy;
      game.map[oldx][oldy].isOccupiedByEntity = true;
      game.map[oldx][oldy].occupyingEntity = this;}
    } catch (e) {
      this.x = oldx; this.y = oldy;
      game.map[oldx][oldy].isOccupiedByEntity = true;
      game.map[oldx][oldy].occupyingEntity = this;
    }
  };

  setInterval(function(){ge.updateEntities();},500);
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
  if(ge.map[c.x][c.y].type == "grass" && !ge.map[c.x][c.y].isOccupiedByEntity){
    //ge.setBlock(c.x,c.y,obsidianBlock);
    //console.log("LongRide!");
    var tchicken = Object.assign({},chicken);
    tchicken.x = c.x;
    tchicken.y = c.y;
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

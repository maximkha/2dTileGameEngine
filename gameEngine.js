GE = {};
GE.gameEngine = function(canvas,_w,_h){
  var thau = this;

  this.ghe = new tdGE(canvas,_w,_h,16,16);
  this.textureUrl = new Array();
  this.textures = new Array();
  this.map = new Array();
  this.entities = new Array();
  this.players = new Array();

  this.loadTextures = function(index, clbk){
    var thy = this;
    if(index < this.textureUrl.length) {this.textures.push(this.ghe.getTexture(this.textureUrl[index])); this.textures[index].onload = function(){thy.loadTextures(index+1,clbk)}} else {
      clbk();
    }
  };

  this.setUpMap = function(b){
    //this.ghe.setMapTexture(b.texture);
    this.map = new Array();
    //var arr = [];
     for (var i = 0; i < 16; ++i){
        var columns = [];
        for (var j = 0; j < 16; ++j){
           columns[j] = Object.assign({},b);
        }
        this.map[i] = columns;
      }
      //return arr;
      this.renderMap();
  };

  this.renderMap = function(){
    for (var x = 0; x < 16; ++x){
      for (var y = 0; y < 16; ++y){
        this.ghe.setBlock(x, y,this.map[x][y].texture);
        //if(this.map[x][y].isOccupiedByEntity) this.ghe.setBlock(x, y,this.map[x][y].occupyingEntity.texture);
      }
    }
    this.entities.forEach(function(e){
      thau.ghe.setBlock(e.x,e.y,e.texture);
    });
  };

  this.setBlock = function(x,y,b){
    this.map[x][y] = Object.assign({},b);
    //console.log(b.onClick);
    //this.map[x][y].onClick = b.onClick;
  };

  this.placeEntity = function(e)
  {
    var x = e.x;
    var y = e.y;
    //if(!this.map[x][y].isOccupiedByEntity)
    //{
    //  this.map[x][y].isOccupiedByEntity = true;
    //  this.map[x][y].occupyingEntity = e;
    //  this.entities.push(e);
    //  this.ghe.setBlock(x,y, e.texture);
    //}
    this.entities.push(e);
  };

  this.updateEntities = function()
  {
    this.entities.forEach(function(e){e.update(thau,e);});
    this.renderMap();
  }
  //this.loadTextures(0);

  this.getCoordFromClick = function(e)
  {
    var c = {};
    var rect = canvas.getBoundingClientRect(),
    mx = e.clientX - rect.left,
    my = e.clientY - rect.top,

    /// get index from mouse position
    xIndex = Math.round((mx - thau.ghe.tw * 0.5) / thau.ghe.tw),
    yIndex = Math.round((my - thau.ghe.th * 0.5) / thau.ghe.th);
    c.x = xIndex;
    c.y = yIndex;
    return c;
  }

   this.bindMouseClick = function(func){
     canvas.onclick = func;
   }
};

GE.block = function(_texture, _type){
  this.hasPlayer = 0; //0 = false, 1 = bottom-half, 2 = top-half
  this.texture = _texture;
  //this.isOccupiedByEntity  = false;
  this.type = _type;
  this.isSolid = false;
  //this.occupyingEntity = null;
  this.onClick;
};

GE.entity = function(_x,_y,_texture,_upCall){
  this.x = _x;
  this.y = _y;
  this.texture = _texture;
  this.update = _upCall;
};

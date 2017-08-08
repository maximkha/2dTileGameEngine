tdGE = function(canvas,_w,_h,c,r){
  var ctx = canvas.getContext('2d'),
    columns = c,
    rows = r,
    w, h, tileWidth, tileHeight;

    //ctx.fillStyle = '#f70';
    canvas.width = w = _w;
    canvas.height = h = _h;

    tileWidth = w / columns;
    tileHeight = w / rows;

    this.tw = tileWidth;
    this.th = tileHeight;
    //console.log(this);
    //this.highlight = function(e){
    //
    //};

    this.setBlock = function(x,y,texture){
      //console.log(x*tileWidth,y*tileHeight);
      //console.log(ctx);
      ctx.drawImage(texture, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    };
    this.setMapTexture = function(texture){
      for (var x = 0; x < columns; x++) {
        for (var y = 0; y < rows; y++) {
          //console.log(x,y);
          this.setBlock(x,y,texture);
        }
      }
    };

    this.getTexture = function(url){
      var image = new Image();
      image.src = url;
      return image;
    };

    //this.highlight = function(e){
    //    var rect = canvas.getBoundingClientRect(),
    //    mx = e.clientX - rect.left,
    //    my = e.clientY - rect.top,

    //    /// get index from mouse position
    //    xIndex = Math.round((mx - tileWidth * 0.5) / tileWidth),
    //    yIndex = Math.round((my - tileHeight * 0.5) / tileHeight);
    //
    //    ctx.fillRect(xIndex * tileWidth,
    //             yIndex * tileHeight,
    //             tileWidth,
    //             tileHeight);
    //};

    //canvas.onmousemove = this.highlight;
    //canvas.onclick = this.highlight;
};

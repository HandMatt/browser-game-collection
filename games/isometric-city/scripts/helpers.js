var game = this.game || (this.game = {});
var createjs = createjs || {};

(function (game, cjs) {
  game.helper = game.helper || {};

  game.helper.create2DArray = function (rows, cols, initialValue) {
    var array = [];
    for (var i = 0; i < rows; i++) {
      array[i] = [];
      for (var j = 0; j < cols; j++) {
        array[i][j] = initialValue;
      }
    }
    return array;
  };

  game.helper.createButton = function (spriteImage, width, height) {
    var data = {
      images: [spriteImage],
      frames: { width: width, height: height },
    };
    var spritesheet = new cjs.SpriteSheet(data);
    var button = new cjs.Sprite(spritesheet, 1);
    var helper = new cjs.ButtonHelper(button, 0, 1, 2);

    return button;
  };
}).call(this, game, createjs);

// ISO <-> Screen conversion.
(function (game, cjs) {
  game.isoMaths = {
    screenToIsoCoord: function (screenX, screenY) {
      var ix = Math.floor(
        (screenY * game.Tile.width + screenX * game.Tile.height) /
          (game.Tile.width * game.Tile.height)
      );
      var iy =
        Math.floor(
          (screenY * game.Tile.width - screenX * game.Tile.height) /
            (game.Tile.width * game.Tile.height)
        ) + 1;
      return { x: ix, y: iy };
    },
    isoToScreenCoord: function (isoX, isoY) {
      var sx = ((isoX - isoY) * game.Tile.width) / 2;
      var sy = ((isoX + isoY) * game.Tile.height) / 2;
      return new cjs.Point(sx, sy);
    },
  };
}).call(this, game, createjs);

var game = this.game || (this.game = {});
var createjs = createjs || {};

// Tile View
(function (game, cjs) {
  function Tile(imagePath) {
    imagePath = imagePath || "images/tile.png";
    cjs.Bitmap.call(this, imagePath);
    this.regX = 0;
    this.regY = 21;
  }

  Tile.prototype = Object.create(cjs.Bitmap.prototype);
  Tile.width = 86;
  Tile.height = 43;
  game.Tile = Tile;
}).call(this, game, createjs);

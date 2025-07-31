(function () {
  var game = this.spaceRunner || (this.spaceRunner = {});

  function Tile(element, type, x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.type = type || 0;
    this.element = element;
    this.isBlock = false;
    for (var i = 0, len = game.BLOCKS.length; i < len; i++) {
      if (type === game.BLOCKS[i]) {
        this.isBlock = true;
      }
    }
    this.updatePosition();
  }
  Tile.prototype.moveDown = function () {
    this.y += game.TILE_HEIGHT;
    if (this.isBlock) {
      this.checkCollison();
    }

    if (this.element && this.y > game.BOUNDARY) {
      game.view.floor.removeChild(this.element);
      this.element = undefined;
    }
  };
  Tile.prototype.updatePosition = function () {
    if (this.element) {
      this.element.style.webkitTransform =
        "translate3d(" + this.x + "px, " + this.y + "px, 0)";
    }
  };
  Tile.prototype.checkCollison = function () {
    if (this.y === 400) {
      if (
        (this.x === game.TILE_WIDTH && game.player.currentLane === 1) ||
        (this.x === game.TILE_WIDTH * 2 && game.player.currentLane === 2)
      ) {
        game.isGameOver = true;
        game.flow.gameOver();
      }
    }
  };

  game.Tile = Tile;
}).call(this);

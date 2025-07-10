var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

(function (game, cjs, lib) {
  function Board() {
    cjs.Container.call(this); // super

    this.x = 10;
    this.y = 60;

    // grid parameters
    this.rows = 10;
    this.cols = 7;
    this.tileWidth = 87;
    this.tileHeight = 83;

    // bg graphics
    var sprite = new lib.Board();
    this.addChild(sprite);
    sprite.y = this.tileHeight;
  }

  Board.prototype = Object.create(cjs.Container.prototype);

  game.Board = Board;
}).call(this, game, createjs, lib);

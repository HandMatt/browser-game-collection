var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Main game logic
(function (game, cjs, lib) {
  game.start = function () {
    game.view.init();
  };

  game.start();
}).call(this, game, createjs, lib);

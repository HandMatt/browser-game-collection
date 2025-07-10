var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Satellite generates energy bubble
(function (game, cjs, lib) {
  function Satellite() {
    game.Building.call(this);

    // graphics
    this.addChild(new lib.Satellite());
    this.cache(-50, -50, 100, 100);

    // overide
    this.hp = 150;
  }
  Satellite.prototype = Object.create(game.Building.prototype);

  Satellite.cost = 30;
  game.Satellite = Satellite;
}).call(this, game, createjs, lib);

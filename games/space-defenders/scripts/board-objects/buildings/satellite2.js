var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Satellite2 generates energy bubble faster
(function (game, cjs, lib) {
  function Satellite2() {
    game.Satellite.call(this);

    // graphics
    this.removeAllChildren(); // remove the Satellite1 graphics
    this.addChild(new lib.Satellite2());
    this.cache(-50, -50, 100, 100);

    // override
    this.hp = 150;
    this.energyFrequency = 100;
  }
  Satellite2.prototype = Object.create(game.Satellite.prototype);

  Satellite2.cost = 600;
  game.Satellite2 = Satellite2;
}).call(this, game, createjs, lib);

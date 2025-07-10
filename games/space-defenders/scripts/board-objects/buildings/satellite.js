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

    // override
    this.hp = 150;

    this.energyFrequency = 500;
    this.ticks = 0;
    this.on("tick", this.tick);
  }
  Satellite.prototype = Object.create(game.Building.prototype);

  Satellite.prototype.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    }

    this.ticks += 1;
    // summon energy
    if (this.ticks % this.energyFrequency === 0) {
      this.summonEnergy();
    }
  };
  Satellite.prototype.summonEnergy = function () {
    var pos = this.localToLocal(0, 0, game.effectLayer);
    var energy = new game.Energy(pos.x, pos.y);
    game.effectLayer.addChild(energy);
  };

  Satellite.cost = 30;
  game.Satellite = Satellite;
}).call(this, game, createjs, lib);

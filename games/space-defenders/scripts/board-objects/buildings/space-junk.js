var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// SpaceJunk generates energy bubble
(function (game, cjs, lib) {
  function SpaceJunk() {
    game.Building.call(this);

    // graphics
    this.addChild(new lib.SpaceJunk());
    this.cache(-50, -50, 100, 100);

    // override
    this.hp = 60;
  }
  SpaceJunk.prototype = Object.create(game.Building.prototype);
  SpaceJunk.cost = 5;

  game.SpaceJunk = SpaceJunk;
}).call(this, game, createjs, lib);

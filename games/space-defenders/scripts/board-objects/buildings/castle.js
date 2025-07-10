var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Castle
(function (game, cjs, lib) {
  function Castle() {
    game.Building.call(this);

    // graphics
    this.addChild(new lib.Castle());
    this.cache(-50, -50, 100, 100);

    // override
    this.hp = 300;
    this.shield = 5;

    this.damageDeal = 2;
    this.attackSpeed = 120; // smaller means faster
  }
  Castle.prototype = Object.create(game.Building.prototype);

  Castle.cost = 80;
  game.Castle = Castle;
}).call(this, game, createjs, lib);

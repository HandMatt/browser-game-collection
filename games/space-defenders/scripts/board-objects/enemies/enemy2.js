var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

(function (game, cjs, lib) {
  function Enemy2() {
    game.Enemy.call(this);

    this.addChild(new lib.Enemy2());

    this.originalSpeed = 1.0;
    this.deceleration = 0.008;
    this.hp = 8;
    this.attackSpeed = 40;

    this.speed = this.originalSpeed;
  }
  Enemy2.prototype = Object.create(game.Enemy.prototype);

  game.Enemy2 = Enemy2;
}).call(this, game, createjs, lib);

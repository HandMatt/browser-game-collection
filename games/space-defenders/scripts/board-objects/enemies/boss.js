var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

(function (game, cjs, lib) {
  function Boss() {
    game.Enemy.call(this);

    this.addChild(new lib.Boss());

    this.originalSpeed = 0.2;
    this.deceleration = 0.002;
    this.hp = 300;
    this.attackSpeed = 50;

    this.speed = this.originalSpeed;
  }
  Boss.prototype = Object.create(game.Enemy.prototype);

  game.Boss = Boss;
}).call(this, game, createjs, lib);

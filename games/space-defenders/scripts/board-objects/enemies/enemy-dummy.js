var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// An easy-to-kill enemy
(function (game, cjs, lib) {
  function EnemyDummy() {
    game.Enemy.call(this);
    this.addChild(new lib.Enemy1());

    this.originalSpeed = 0.3;
    this.deceleration = 0.002;
    this.hp = 1;

    this.speed = this.originalSpeed;
  }
  EnemyDummy.prototype = Object.create(game.Enemy.prototype);

  game.EnemyDummy = EnemyDummy;
}).call(this, game, createjs, lib);

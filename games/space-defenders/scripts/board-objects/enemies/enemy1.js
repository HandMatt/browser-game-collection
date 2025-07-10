var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

(function (game, cjs, lib) {
  function Enemy1() {
    game.Enemy.call(this);

    this.addChild(new lib.Enemy1());

    this.attackSpeed = 50;

    this.speed = this.originalSpeed;
  }
  Enemy1.prototype = Object.create(game.Enemy.prototype);

  game.Enemy1 = Enemy1;
}).call(this, game, createjs, lib);

var game = this.game || (this.game={});
var createjs = createjs || {};
var lib = lib || {};

;(function(game, cjs, lib){

  function Enemy3(){
    game.Enemy.call(this);

    this.addChild(new lib.Enemy3);

    this.originalSpeed = 3.0;
    this.deceleration = 0.02;
    this.hp = 8;
    this.attackSpeed = 10;

    this.speed = this.originalSpeed;
  }
  Enemy3.prototype = Object.create(game.Enemy.prototype);

  game.Enemy3 = Enemy3;

}).call(this, game, createjs, lib);

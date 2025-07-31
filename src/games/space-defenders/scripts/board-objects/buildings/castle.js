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

    this.ticks = 0;
    this.on("tick", this.tick);
  }
  Castle.prototype = Object.create(game.Building.prototype);
  Castle.prototype.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    }

    this.ticks += 1;
    // summon bulled every once in a while
    if (this.ticks % this.attackSpeed === 0) {
      this.summonBullet();
    }
  };
  Castle.prototype.summonBullet = function () {
    var bullet = new game.Bullet(this.damageDeal);
    bullet.x = this.x + Math.random() * 20 - 10;
    bullet.y = this.y;
    this.parent.addBullet(bullet);
  };

  Castle.cost = 80;
  game.Castle = Castle;
}).call(this, game, createjs, lib);

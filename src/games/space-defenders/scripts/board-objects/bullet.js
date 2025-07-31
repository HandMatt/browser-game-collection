var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Bullet
(function (game, cjs, lib) {
  function Bullet(damageDeal) {
    cjs.Container.call(this); // super
    this.addChild(new lib.Bullet());

    this.cache(-25, -25, 50, 50);

    this.damageDeal = damageDeal || 1; // default 1

    // tick the movement
    this.on("tick", this.tick);
  }
  Bullet.prototype = Object.create(cjs.Container.prototype);
  Bullet.prototype.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    }

    // movement
    this.y -= 1.5;
  };

  game.Bullet = Bullet;
}).call(this, game, createjs, lib);

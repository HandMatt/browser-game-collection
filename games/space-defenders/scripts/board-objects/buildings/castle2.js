var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Castle2
(function (game, cjs, lib) {
  function Castle2() {
    game.Castle.call(this);

    // graphics
    this.removeAllChildren(); // remove castle1 graphics
    this.addChild(new lib.Castle2());
    this.cache(-50, -50, 100, 100);

    // override
    this.hp = 300;
    this.shield = 10;

    this.damageDeal = 10;
    this.attackSpeed = 200; // smaller means faster
  }
  Castle2.prototype = Object.create(game.Castle.prototype);

  Castle2.cost = 300;
  game.Castle2 = Castle2;
}).call(this, game, createjs, lib);

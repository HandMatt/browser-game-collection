var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// The base of Building definition.
(function (game, cjs, lib) {
  function Building() {
    cjs.Container.call(this);

    // properties for overridden
    this.hp = 100;
    this.shield = 0;
    this.damageDeal = 0;
    this.attackSpeed = 9999; // smaller means faster
  }
  Building.prototype = Object.create(cjs.Container.prototype);
  Building.prototype.damage = function (damage) {
    var realDamage = Math.max(damage - this.shield, 0); // min 0.
    this.hp -= realDamage;
    if (this.hp <= 0 && this.parent) {
      // a building may have been destroyed by more than one enemies and result in no parent.
      this.parent.removeBuilding(this);
    }
  };

  Building.cost = 10; // consume energies
  game.Building = Building;
}).call(this, game, createjs, lib);

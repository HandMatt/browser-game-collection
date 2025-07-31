var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Enemy moves down and attacks buildings
(function (game, cjs, lib) {
  function Enemy() {
    cjs.Container.call(this);

    // these aredefault values. They can be overriden by instances.
    this.originalSpeed = 0.5; // speed may change over time. This one remains constant.
    this.deceleration = 0.004;
    this.hp = 10;
    this.damageDeal = 10;
    this.attackSpeed = 100; // smaller means faster

    // properties
    this.speed = this.originalSpeed;

    // attack
    this.isAttacking = false;
    this.attackingTarget = undefined;

    this.attackingSmoke = new lib.Explode();
    this.attackingSmoke.y = 50;

    this.on("tick", this.tick);
  }
  Enemy.prototype = Object.create(cjs.Container.prototype);
  Enemy.prototype.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    }

    // check if speed <0. Min allowed is 0.
    if (this.speed < 0) {
      this.speed = 0;
    }
    this.y += this.speed;

    // attack the building every once a while
    if (cjs.Ticker.getTicks() % this.attackSpeed === 0) {
      if (this.isAttacking && this.attackingTarget) {
        this.attackingTarget.damage(this.damageDeal);
      }
    }
  };

  // Attack and damage
  Enemy.prototype.startAttack = function (targetBuilding) {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.addChild(this.attackingSmoke);
    }
    this.attackingTarget = targetBuilding; // reassign target
  };
  Enemy.prototype.stopAttack = function () {
    if (this.isAttacking) {
      this.removeChild(this.attackingSmoke);
    }
    this.isAttacking = false;
    this.attackingTarget = undefined;
    this.speed = this.originalSpeed;
  };
  Enemy.prototype.damage = function (damage) {
    this.hp -= damage;
  };

  game.Enemy = Enemy;
}).call(this, game, createjs, lib);

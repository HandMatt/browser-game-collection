var game = this.game || (this.game = {});
var createjs = createjs || {};

(function (game, cjs) {
  game.view = game.view || {};

  game.view.initPowerIndicator = function () {
    this.power = new lib.PowerArrow();
    game.stage.addChild(this.power);
    this.power.visible = false; // we hide it upon init.
  };
  game.view.showPowerIndicator = function (x, y) {
    this.power.visible = true;
    this.power.x = x;
    this.power.y = y;
  };
  game.view.hidePowerIndicator = function () {
    this.power.visible = false;
  };
  game.view.rotatePowerIndicator = function (rotation) {
    this.power.rotation = rotation;
  };
  game.view.updatePowerBar = function (value) {
    this.power.powerBar.scaleY = Math.min(30, value); // maximum 30 scaleY
  };
}).call(this, game, createjs);

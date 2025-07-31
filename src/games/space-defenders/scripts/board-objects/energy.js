var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Energy bubble auto moves up
(function (game, cjs, lib) {
  function Energy(x, y) {
    cjs.Container.call(this); //super
    this.addChild(new lib.Energy());

    this.cache(-25, -25, 50, 50);

    this.x = x || 0;
    this.y = y || 0;
    this.baseX = this.x; // store the original X

    // Tween animation
    cjs.Tween.get(this, { loop: true })
      .to({ scaleX: 1.2, scaleY: 1.2 }, 600)
      .to({ scaleX: 1.0, scaleY: 1.0 }, 600);

    // tick the movement
    this.on("tick", this.tick);
    this.on("mousedown", this.onclick);
  }
  Energy.prototype = Object.create(cjs.Container.prototype);
  Energy.prototype.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    }

    var offsetX = Math.sin(cjs.Ticker.getTicks() / 10) * 20;
    this.x = this.baseX + offsetX;
    this.y -= 0.5;
  };
  Energy.prototype.onclick = function (e) {
    game.energies += 100;
    this.parent.removeChild(this);
  };

  game.Energy = Energy;
}).call(this, game, createjs, lib);

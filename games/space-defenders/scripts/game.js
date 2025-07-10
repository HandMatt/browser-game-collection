var game = this.game || (this.game = {});
var createjs = createjs || {};

(function (game, cjs) {
  game.start = function () {
    cjs.EventDispatcher.initialize(game); // allow the game object to listen and dispatch custom events.

    game.canvas = document.getElementById("canvas");

    game.stage = new cjs.Stage(game.canvas);

    // game parameters
    game.lives = 20;
    game.energies = 99999; // used to create building

    // layers
    var bgLayer = (game.bgLayer = new cjs.Container());
    bgLayer.addChild(new lib.Background());
    game.stage.addChild(bgLayer);

    var boardLayer = (game.boardLayer = new game.Board());
    game.stage.addChild(boardLayer);

    var effectLayer = (game.effectLayer = new cjs.Container());
    game.stage.addChild(effectLayer);

    cjs.Ticker.framerate = 40;
    cjs.Ticker.addEventListener("tick", game.stage); // add game.stage to ticker make the stage.update call automatically.
    cjs.Ticker.addEventListener("tick", game.tick); // gameloop
  };

  game.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    } // run when not paused
  };

  game.start();
}).call(this, game, createjs);

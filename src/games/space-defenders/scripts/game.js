var game = this.game || (this.game = {});
var createjs = createjs || {};

(function (game, cjs) {
  game.load = function () {
    // load bitmap assets before starts the game
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", function (e) {
      if (e.item.type === "image") {
        images[e.item.id] = e.result;
      } // assign to images object for assets.js to use
    });
    loader.addEventListener("complete", game.start);
    loader.loadManifest(lib.properties.manifest);
  };

  game.start = function () {
    cjs.EventDispatcher.initialize(game); // allow the game object to listen and dispatch custom events.

    game.canvas = document.getElementById("canvas");

    game.stage = new cjs.Stage(game.canvas);

    // game parameters
    game.lives = 20;
    game.energies = 120; // used to create building

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

    // game waves
    game.nextWaveSprite = new lib.WaveCleared();
    game.stage.addChild(game.nextWaveSprite);
    game.nextWaveSprite.x = 999;

    game.waves.startWave();
  };

  game.gameOver = function () {
    cjs.Ticker.paused = true;
  };

  game.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    } // run when not paused

    if (game.lives <= 0) {
      game.gameOver;
    }

    // tick waves
    game.waves.tick();

    // the wave is cleared when:
    // waves not generating new enemied and all existing enemies are killed.
    if (!game.waves.isActive && game.boardLayer.areEnemiesCleared()) {
      game.boardLayer.isAddingBuilding = false;
      game.boardLayer.removeAllBuildings();
      game.boardLayer.removeAllBullets();
      game.waves.waveCleared();

      // 'Wave Cleared' graphics animation.
      cjs.Tween.get(game.nextWaveSprite)
        .to(
          { x: game.canvas.width / 2, y: game.canvas.height / 2, alpha: 0 },
          0,
        )
        .to({ alpha: 1.0 }, 300)
        .wait(1000)
        .to({ alpha: 0 }, 300)
        .to({ x: 999 });
    }
  };

  game.load();
}).call(this, game, createjs);

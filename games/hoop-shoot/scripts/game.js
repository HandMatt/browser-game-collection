var game = this.game || (this.game = {});
var createjs = createjs || {};
var images = images || {};

(function (game, cjs) {
  game.load = function () {
    // load bitmap assets before starting the game
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

    cjs.Ticker.framerate = 60;
    cjs.Ticker.addEventListener("tick", game.stage); // add game.stage to ticker make the stage.update call automatically.
    cjs.Ticker.addEventListener("tick", game.tick); // gameloop

    game.physics.createWorld();
    // game.physics.showDebugDraw();
    game.view.initPowerIndicator();

    // level selection
    var levelSelection = new lib.LevelSelection();
    game.stage.addChild(levelSelection);
    levelSelection.levels.stop();

    levelSelection.rightButton.on("click", function () {
      var next = levelSelection.levels.currentFrame + 1;
      levelSelection.levels.gotoAndStop(next);
    });
    levelSelection.leftButton.on("click", function () {
      var prev = levelSelection.levels.currentFrame - 1;
      levelSelection.levels.gotoAndStop(prev);
    });

    // start the game play
    var isPlaying = false;
    levelSelection.playButton.on("click", function () {
      levelSelection.parent.removeChild(levelSelection);

      // game.physics.showDebugDraw();

      game.score = 0;

      game.currentLevel = game.levels[levelSelection.levels.currentFrame];

      game.physics.createLevel();

      game.view.showScoreBoard();

      isPlaying = true;
    });

    // shooting indicator
    game.tickWhenDown = 0;
    game.tickWhenUp = 0;
    game.stage.on("stagemousedown", function (e) {
      if (!isPlaying) {
        return;
      }
      var position = game.physics.ballPosition();
      game.view.showPowerIndicator(position.x, position.y);

      var rotation = game.physics.launchAngle(e.stageX, e.stageY);
      game.view.rotatePowerIndicator((rotation * 180) / Math.PI); // convert to degree

      game.tickWhenDown = cjs.Ticker.getTicks();
      game.view.updatePowerBar(0);
    });
    game.stage.on("stagemousemove", function (e) {
      if (!isPlaying) {
        return;
      }
      var rotation = game.physics.launchAngle(e.stageX, e.stageY);
      game.view.rotatePowerIndicator((rotation * 180) / Math.PI); // convert to degree
    });
    game.stage.on("stagemouseup", function (e) {
      if (!isPlaying) {
        return;
      }
      game.view.hidePowerIndicator();
      game.tickWhenUp = cjs.Ticker.getTicks();
      ticksDiff = game.tickWhenUp - game.tickWhenDown;

      game.physics.shootBall(e.stageX, e.stageY, ticksDiff);

      setTimeout(game.spawnBall, 500);
    });
  };

  game.spawnBall = function () {
    game.physics.spawnBall();
  };

  game.increaseScore = function () {
    game.score += 1;
    game.view.updateScore();
    // console.log(game.score);
  };

  game.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    } // run whan not paused

    game.physics.update();

    // launch power preview
    var ticksDiff = cjs.Ticker.getTicks() - game.tickWhenDown;
    game.view.updatePowerBar(ticksDiff);
  };

  game.load();
}).call(this, game, createjs);

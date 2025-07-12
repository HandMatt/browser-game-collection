var game = this.game || (this.game = {});
var createjs = createjs || {};
var images = images || {};

(function (game, cjs) {
  game.start = function () {
    cjs.EventDispatcher.initialize(game); // allow the game object to listen and dispatch custom events.

    game.canvas = document.getElementById("canvas");

    game.stage = new cjs.Stage(game.canvas);

    cjs.Ticker.framerate = 60;
    cjs.Ticker.addEventListener("tick", game.stage); // add game.stage to ticker make the stage.update call automatically.
    cjs.Ticker.addEventListener("tick", game.tick); // gameloop

    game.physics.createWorld();
    game.physics.showDebugDraw();
    game.view.initPowerIndicator();

    game.physics.createLevel();

    game.score = 0;

    isPlaying = true;

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
    console.log(game.score); // out to console untill we display it in interface.
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

  game.start();
}).call(this, game, createjs);

(function () {
  var game = this.game || (this.game = {});

  game.setting = {
    boxWidth: 50,
    boxHeight: 50,
    gameWidth: 300,
    gameHeight: 480,
    controlHeight: 100,
    boundaryY: 320,
    fallingSpeed: 0.8,
    ticksPerNewBox: 80,
    initialLives: 3,
  };
}).call(this);

// RectShape
(function () {
  var game = this.game || (this.game = {});

  game.RectShape = (function () {
    function RectShape(width, height, style) {
      createjs.Container.call(this); // super init

      // set default shape style for missing ones.
      style = style || {};
      style.strokeWidth = style.strokeWidth || 0;
      style.strokeColor = style.strokeColor || "";
      style.fillColor = style.fillColor || "rgba(255, 0, 0, 1)";

      // draw the rect with graphics API
      var g = new createjs.Graphics();
      var shape = new createjs.Shape();
      shape.graphics
        .setStrokeStyle(style.strokeWidth)
        .beginStroke(style.strokeColor)
        .beginFill(style.fillColor)
        .drawRect(0, 0, width, height);
      this.addChild(shape);
    }

    // Prototype inheritance
    RectShape.prototype = Object.create(createjs.Container.prototype);

    return RectShape;
  })();
}).call(this);

// Box
(function () {
  var game = this.game || (this.game = {});

  game.Box = (function () {
    function Box() {
      createjs.Container.call(this);

      var bitmap = new createjs.Bitmap("images/box.png");
      this.addChild(bitmap);
    }
    var p = (Box.prototype = Object.create(game.RectShape.prototype));

    return Box;
  })();
}).call(this);

// Number Box
(function () {
  var game = this.game || (this.game = {});

  game.NumberBox = (function () {
    function NumberBox(value) {
      game.Box.call(this);
      this.value = value;

      // Text on top of the rect shape
      var text = new createjs.Text(value, "24px Impact", "white");
      text.textBaseline = "middle";
      text.textAlign = "center";
      text.x = game.setting.boxWidth / 2;
      text.y = game.setting.boxHeight / 2;
      this.addChild(text);
    }
    NumberBox.prototype = Object.create(game.Box.prototype);

    return NumberBox;
  })();
}).call(this);

// Game View
(function () {
  var game = this.game || (this.game = {});

  game.gameView = {
    numberBoxes: [],
    gameOverOverlay: document.getElementById("game-over"),
    init: function () {
      // text for calculation equation
      this.calculationText = new createjs.Text(
        "1x1=1",
        "18px Impact",
        "#44144B",
      );
      this.calculationText.textAlign = "center";
      this.calculationText.x = game.setting.gameWidth / 2;
      this.calculationText.y =
        game.setting.gameHeight - game.setting.controlHeight - 30;
      game.stage.addChild(this.calculationText);

      // boundary line
      var line = new createjs.Bitmap("images/line.png");
      line.y = game.setting.boundaryY;
      game.stage.addChild(line);

      // hearts for the lives
      this.hearts = [];

      this.heartsContainer = new createjs.Container();
      this.heartsContainer.x = 5;
      this.heartsContainer.y = 5;
      game.stage.addChild(this.heartsContainer);

      this.resetHearts();
      // first box
      this.generateNumberBox();
    },
    resetHearts: function () {
      this.heartsContainer.removeAllChildren();
      this.hearts.length = 0;
      for (var i = 0; i < game.setting.initialLives; i++) {
        var heart = new createjs.Bitmap("images/heart.png");
        heart.x = i * 20;
        this.heartsContainer.addChild(heart);
        this.hearts.push(heart);
      }
    },
    deduceLife: function () {
      var heart = game.gameView.hearts[game.lives];
      this.heartsContainer.removeChild(heart);
    },
    updateText: function (string) {
      this.calculationText.text = string;
    },
    generateNumberBox: function () {
      function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      var value = randomInt(1, 12) * randomInt(1, 12);

      var box = new game.NumberBox(value);
      box.x = Math.random() * (game.setting.gameWidth - game.setting.boxWidth);
      box.y = 0;
      game.stage.addChild(box);

      this.numberBoxes.push(box);
    },
    moveObjects: function () {
      for (var i = 0, len = this.numberBoxes.length; i < len; i++) {
        var box = this.numberBoxes[i];
        box.y += game.setting.fallingSpeed;
      }

      for (var i = 0, len = this.numberBoxes.length; i < len; i++) {
        var box = this.numberBoxes[i];
        // remove the box whan it is below boundary line
        if (box.y > game.setting.boundaryY) {
          this.removeNumberBox(box);
          game.deduceLife();
        }
      }
    },
    findNumberBoxWithValue: function (value) {
      for (var i = 0, len = this.numberBoxes.length; i < len; i++) {
        var box = this.numberBoxes[i];
        if (box.value === value) {
          return box;
        }
      }
    },
    removeNumberBox: function (target) {
      for (var i = 0, len = this.numberBoxes.length; i < len; i++) {
        var box = this.numberBoxes[i];
        if (box === target) {
          this.numberBoxes.splice(i, 1);
          game.stage.removeChild(box);
          return;
        }
      }
    },
    removeAllNumberBoxes: function () {
      for (var i = 0, len = this.numberBoxes.length; i < len; i++) {
        var box = this.numberBoxes[i];
        game.stage.removeChild(box);
      }
      this.numberBoxes.length = 0;
    },
    showCircle: function (x, y) {
      var circle = new createjs.Bitmap("images/circle.png");
      circle.x = x || 0;
      circle.y = y || 0;
      game.stage.addChild(circle);
      createjs.Tween.get(circle)
        .wait(500)
        .to({ alpha: 0 }, 1000)
        .call(function () {
          game.stage.removeChild(circle);
        });
    },
    showGameOver: function () {
      this.gameOverOverlay.classList.remove("hide");
      this.gameOverOverlay.classList.add("show");
    },
    hideGameOver: function () {
      this.gameOverOverlay.classList.remove("show");
      this.gameOverOverlay.classList.add("hide");
    },
  };
}).call(this);

// Input
(function () {
  var game = this.game || (this.game = {});

  // 1-12 inputs
  var allControls = document.querySelectorAll(".control");
  for (var i = 0, len = allControls.length; i < len; i++) {
    var control = allControls[i];
    control.onclick = function () {
      var value = this.dataset.value;
      var string = game.calculation.addInput(value);
      game.gameView.updateText(string);
      game.checkResult();
    };
  }

  // replay button in game over scene
  var replay = document.getElementById("replay-btn");
  replay.onclick = function () {
    game.resetGame();
  };
}).call(this);

// Calculation
(function () {
  var game = this.game || (this.game = {});

  game.calculation = {
    inputs: [],
    result: 1,
    addInput: function (value) {
      if (this.inputs.length >= 2) {
        this.clearInputs();
      }

      this.inputs.push(value);
      this.result *= value;

      return this.inputs.join("x") + "=" + this.result;
    },
    clearInputs: function () {
      this.inputs.length = 0;
      this.result = 1;
    },
  };
}).call(this);

// The Game Logic
(function () {
  var game = this.game || (this.game = {});

  game.start = function () {
    var canvas = document.getElementById("canvas");
    // passing the canvas to EaselJS
    game.stage = new createjs.Stage(canvas);

    game.gameView.init();

    game.lives = game.setting.initialLives;

    createjs.Ticker.framerate = 40;
    createjs.Ticker.addEventListener("tick", game.tick);
  };

  game.tick = function (e) {
    game.stage.update();

    if (!e.paused) {
      game.gameView.moveObjects();

      var ticksCount = createjs.Ticker.getTicks(/*exclude_pause=*/ true);
      if (ticksCount % game.setting.ticksPerNewBox == 0) {
        // logic for every 80 ticks
        game.gameView.generateNumberBox();
      }
    }
  };

  game.deduceLife = function () {
    this.lives -= 1;
    game.gameView.deduceLife();

    if (this.lives <= 0) {
      this.gameOver();
    }
  };

  game.gameOver = function () {
    createjs.Ticker.paused = true;
    game.gameView.showGameOver();
  };

  game.resetGame = function () {
    this.lives = game.setting.initialLives;
    game.gameView.removeAllNumberBoxes();
    game.gameView.hideGameOver();
    game.gameView.resetHearts();
    createjs.Ticker.paused = false;
  };

  game.checkResult = function () {
    var box = game.gameView.findNumberBoxWithValue(game.calculation.result);
    if (box) {
      game.gameView.showCircle(box.x, box.y);
      game.gameView.removeNumberBox(box);
      game.calculation.clearInputs();
    }
  };
}).call(this);

// Entry Point

(function () {
  if (this.game) {
    this.game.start();
  } else {
    throw "No game logic found.";
  }
}).call(this);

var game = this.game || (this.game = {});
var createjs = createjs || {};

(function (game, cjs) {
  game.helper = game.helper || {};

  game.helper.create2DArray = function (rows, cols, initialValue) {
    var array = [];
    for (var i = 0; i < rows; i++) {
      array[i] = [];
      for (var j = 0; j < cols; j++) {
        array[i][j] = initialValue;
      }
    }
    return array;
  };

  game.helper.createButton = function (spriteImage, width, height) {
    var data = {
      images: [spriteImage],
      frames: { width: width, height: height },
    };
    var spritesheet = new cjs.SpriteSheet(data);
    var button = new cjs.Sprite(spritesheet, 1);
    var helper = new cjs.ButtonHelper(button, 0, 1, 2);

    return button;
  };
}).call(this, game, createjs);

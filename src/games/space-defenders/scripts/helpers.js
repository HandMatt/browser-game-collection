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
  game.helper.removeItem = function (array, target) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === target) {
        array.splice(i, 1); // remove that target
        return true;
      }
    }
    return false;
  };
}).call(this, game, createjs);

var game = this.game || (this.game = {});

(function (game) {
  game.helper = {};

  game.helper.arrayIsEqual = function (array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }
    for (var i = 0, len = array1.length; i < len; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  };

  game.helper.clearChildren = function (node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
  };
}).call(this, game);

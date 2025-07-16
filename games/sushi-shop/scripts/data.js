var game = this.game || (this.game = {});

(function (game) {
  game.sushiOnHand = [];

  game.trashSushi = function () {
    game.sushiOnHand.length = 0; // clear it
    game.view.clearAllIngredients();
  };
}).call(this, game);

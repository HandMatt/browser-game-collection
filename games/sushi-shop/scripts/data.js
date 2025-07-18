var game = this.game || (this.game = {});

(function (game) {
  game.sushiOnHand = [];

  // customer queues
  game.queues = [];
  game.queues[0] = [];
  game.queues[1] = [];

  game.removeFromQueue = function (index) {
    game.queues[index].shift();
  };

  // recipes
  game.recipes = [];
  game.recipes["sushiSalmonRoe"] = [
    "rice",
    "seaweed",
    "seaweed",
    "salmon-roe",
  ].sort(); // ensure it is sorted
  game.recipes["sushiOctopus"] = ["rice", "octopus"].sort();
  game.recipes["sushiSalmon"] = ["rice", "salmon"].sort();
  game.recipes["sushiEgg"] = ["rice", "egg", "seaweed"].sort();
}).call(this, game);

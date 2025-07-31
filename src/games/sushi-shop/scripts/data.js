var game = this.game || (this.game = {});

(function (game) {
  game.sushiOnHand = [];

  game.cash = 1000;
  game.view.refreshCash();

  game.sushiOnHand = [];

  // ingredients amount
  game.amount = [];
  game.amount["rice"] = 10;
  game.amount["octopus"] = 10;
  game.amount["salmon"] = 10;
  game.amount["salmon-roe"] = 10;
  game.amount["seaweed"] = 10;
  game.amount["egg"] = 10;

  game.increaseAmount = function () {
    for (var key in game.amount) {
      if (game.amount.hasOwnProperty(key)) {
        game.amount[key] += 10;
        game.view.refreshAmount(key);
      }
    }
  };

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

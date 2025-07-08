(function (game) {
  game.BuildingsData = {};
  game.BuildingsData["CoinsGenerator"] = {
    className: "CoinsGenerator",
    needCoins: 20,
    needPopulation: 10,
    power: 0,
  };
  game.BuildingsData["PowerSupply"] = {
    className: "PowerSupply",
    needCoins: 10,
    needPopulation: 0,
    power: 15,
  };
  game.BuildingsData["Merchant"] = {
    className: "Merchant",
    needCoins: 150,
    needPopulation: 20,
    power: 0,
  };
}).call(this, game);

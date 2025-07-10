var game = this.game || (this.game = {});
var createjs = createjs || {};

(function (game, cjs) {
  var addButtons = document.querySelectorAll(".add-button");

  // indicators
  var lives = document.getElementById("lives");
  var energies = document.getElementById("energies");
  var waves = document.getElementById("waves");

  for (var i = 0, len = addButtons.length; i < len; i++) {
    var button = addButtons[i];
    button.onmousedown = function (e) {
      if (cjs.Ticker.getPaused()) {
        return;
      }
      var buildingType = this.dataset.type;

      // have enough energy
      var cost = game[buildingType].cost;
      if (cost && game.energies >= cost) {
        game.energies -= cost;
        var event = new cjs.Event("readyToPlaceBuilding");
        event.buildingType = buildingType;
        game.dispatchEvent(event);
      }
    };
  }

  function tick() {
    lives.textContent = game.lives;
    energies.textContent = game.energies;
    waves.textContent = 1;
  }

  cjs.Ticker.addEventListener("tick", tick);
}).call(this, game, createjs);

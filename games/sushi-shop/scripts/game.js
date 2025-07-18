var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Main game logic
(function (game, cjs, lib) {
  game.start = function () {
    game.view.init();
    cjs.Ticker.addEventListener("tick", game.tick);
  };

  game.tick = function () {
    // mock a new customer
    var durationForNewCustomer = 500;
    if (cjs.Ticker.getTicks() % durationForNewCustomer === 0) {
      game.summonNewCustomer();

      // queue 0
      var customer = game.queues[0][0];
      if (customer && !customer.hasShownUp) {
        customer.showUp();
      }

      // queue 1
      var customer = game.queues[1][0];
      if (customer && !customer.hasShownUp) {
        customer.showUp();
      }
    }
  };

  game.summonNewCustomer = function () {
    // left or right?
    var leftOrRight = "left";
    var queueIndex = 0;
    if (Math.random() >= 0.5) {
      leftOrRight = "right";
      queueIndex = 1;
    }
    var customer = new game.Customer(1, leftOrRight);
    game.queues[queueIndex].push(customer);

    if (leftOrRight === "left") {
      game.view.queueLeft.addChild(customer);
    } else {
      game.view.queueRight.addChild(customer);
    }
  };

  game.trashSushi = function () {
    game.sushiOnHand.length = 0; // clear it
    game.view.clearAllIngredients();
  };

  game.start();
}).call(this, game, createjs, lib);

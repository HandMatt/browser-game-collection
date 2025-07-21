var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

// Main game logic
(function (game, cjs, lib) {
  game.load = function () {
    // begin loading content (only sounds to load)
    var assetsPath = "audio/";
    manifest = [
      { id: "button", src: "button.ogg" },
      { id: "refill", src: "refill.ogg" },
      { id: "earn-money", src: "earn-money.ogg" },
      { id: "start-game", src: "start-game.ogg" },
    ];

    cjs.Sound.alternateExtensions = ["aif", "webm"];
    preload = new cjs.LoadQueue(true, assetsPath);
    preload.installPlugin(cjs.Sound);
    preload.addEventListener("complete", game.start);
    preload.loadManifest(manifest);
  };

  game.start = function () {
    game.view.init();
    cjs.Ticker.addEventListener("tick", game.tick);

    cjs.Sound.play("start-game");
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

  game.load();
}).call(this, game, createjs, lib);

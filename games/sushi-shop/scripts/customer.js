var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

(function (game, cjs, lib) {
  function Customer(number, leftOrRight) {
    cjs.Container.call(this); // super call Container.

    this.number = number;
    // randomise a sushi
    this.wants = randomWants();
    // has eaten the sushi and leaving?
    this.hasEaten = false;
    // queued or was shown in front of the queue?
    this.hasShownUp = false;
    // how much time was masted in waiting?
    this.hasWaitForTicks = 0;

    // queue index, 0 for left and 1 for right queue.
    this.queueIndex = 0;
    if (leftOrRight === "right") this.queueIndex = 1;

    this.on("tick", this.tick);
  }
  // customer extends createJS Container.
  Customer.prototype = Object.create(cjs.Container.prototype);
  Customer.prototype.tick = function () {
    this.hasWaitForTicks += 1;
    if (this.hasWaitForTicks === 300) {
      // turns angry
      this.graphics.gotoAndStop("angry");
    }
    if (this.hasWaitForTicks > 500) {
      // waited too long
      this.remove();
    }
    if (this.hasEaten) {
      this.remove();
    }
  };

  Customer.prototype.showUp = function () {
    this.graphics = new lib["Customer" + this.number]();
    this.graphics.gotoAndStop("normal"); // normal state at first
    this.graphics.on("click", customerOnClick.bind(this));
    this.addChild(this.graphics);

    // bubble that shows what sushi the customer wants.
    var bubble = new lib.Bubble();
    bubble.x = -40;
    bubble.y = -120;
    this.addChild(bubble);

    // set the type
    bubble.sushiType.gotoAndStop(this.wants);

    this.hasShownUp = true; // mark the flag
  };

  Customer.prototype.remove = function () {
    // remove customer
    this.parent.removeChild(this);
    game.removeFromQueue(this.queueIndex);
  };

  game.Customer = Customer;

  // cutomer's helper functions
  function randomWants() {
    options = ["sushiSalmonRoe", "sushiOctopus", "sushiSalmon", "sushiEgg"];

    var index = Math.floor(Math.random() * options.length);
    return options[index];
  }

  function customerOnClick() {
    console.log(this.wants);

    // check if is what customer wants
    var isEqual = game.helper.arrayIsEqual(
      game.sushiOnHand,
      game.recipes[this.wants],
    );
    if (isEqual) {
      console.log("Yeah");
      game.cash += 120;
      game.view.refreshCash();
      this.hasEaten = true;
    } else {
      console.log("NOOOO");
    }
    game.trashSushi();
  }
}).call(this, game, createjs, lib);

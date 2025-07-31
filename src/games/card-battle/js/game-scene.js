/**
 * game-scene.js contains the game scene management logic.
 */

// randomises the power value
(function () {
  var game = (this.cardBattleGame = this.cardBattleGame || {});

  // Cache elements query
  var allPowerElms = document.querySelectorAll(".power");

  /**
   * Generates random power values for cards.
   */
  game.randomizePower = function () {
    allPowerElms.forEach(function (elm) {
      elm.textContent = Math.round(Math.random() * 60) + 40;
    });
  };
})();

// game scene module
(function () {
  /**
   * Current instance of the game.
   */
  var game = (this.cardBattleGame = this.cardBattleGame || {});

  /**
   * Card object definition.
   */
  var Card = (function () {
    /**
     * Instantiate only the selected card.
     * @param {*} node
     */
    function Card(node) {
      this.node = node;
    }
    /**
     * Obtains the power value from the string value on the card.
     * @returns {Number} int - power value
     */
    Card.prototype.power = function () {
      // convert string to integer
      return 1 * this.node.querySelector(".power").textContent;
    };
    return Card;
  })();

  // cache node querying
  var allPlayerCardElms = document.querySelectorAll(".card.player");
  var allCardElms = document.querySelectorAll(".card");
  var opponentCard = new Card(document.querySelector(".card.opponent"));
  var selectedCard = undefined;

  var gameScene = (game.gameScene = Object.create(game.scene));
  gameScene.node = document.getElementById("game-scene");
  /**
   * Begins the game.
   */
  gameScene.onShow = function () {
    game.HP.reset();
    this.startGame();
  };
  /**
   * Restarts the game.
   */
  gameScene.startGame = function () {
    this.restartGame();
  };
  /**
   * Sets cards to their initial positions, by adding and removing classes.
   */
  gameScene.restartGame = function () {
    game.randomizePower();
    var animatePlayerCardsIn = function () {
      allPlayerCardElms.forEach(function (elm) {
        elm.classList.remove("out");
        elm.classList.add("in");
        elm.classList.add("flipped");
      });
    };
    // delay a while to create a refresh card illusion
    setTimeout(animatePlayerCardsIn, 800);
    // reset the transition state
    allCardElms.forEach(function (elm) {
      elm.classList.remove("in");
      elm.classList.add("out");
    });
    allPlayerCardElms.forEach(function (elm) {
      elm.classList.remove("selected");
      elm.classList.add("flipped");
    });
  };
  /**
   * Listens for the click event on all players cards, and updates card display
   * on card selection by removing the `flipped` class and adding the
   * `selected` class.
   */
  gameScene.setup = function () {
    /**
     * Shows the opponent's card. After the opponent's card is in, it starts
     * the blaze and shake animations one-by-one.
     */
    var beginBattleAnimation = function () {
      // Show opponent's card by removing 'out' class and adding 'in' class
      opponentCard.node.classList.remove("out");
      opponentCard.node.classList.add("in");
      console.log("Power of opponent card: ", opponentCard.power());

      // Wait for opponent card to finish sliding in
      opponentCard.node.onTransitionEnd(function (e) {
        // only execute the attack animation when opponent at 'in' state
        if (!e.target.classList.contains("in")) {
          return;
        }

        // Start left blaze animation (player attacks opponent)
        var blazeLeft = document.querySelector(".blaze.toward-left");
        blazeLeft.classList.add("attack");
        blazeLeft.onAnimationEnd(function (e) {
          e.target.classList.remove("attack");

          // Shake opponent card and apply damage
          opponentCard.node.classList.add("shake");
          game.HP.hurtOpponent(selectedCard.power(), opponentCard.power());
          opponentCard.node.onAnimationEnd(function (e) {
            opponentCard.node.classList.remove("shake");

            // Start right blaze animation (opponent attacks player)
            var blazeRight = document.querySelector(".blaze.toward-right");
            blazeRight.classList.add("attack");
            blazeRight.onAnimationEnd(function (e) {
              e.target.classList.remove("attack");

              // Shake player card and apply damage
              selectedCard.node.classList.add("shake");
              game.HP.hurtPlayer(opponentCard.power(), selectedCard.power());
              selectedCard.node.onAnimationEnd(function (e) {
                selectedCard.node.classList.remove("shake");

                // Check if battle is over
                if (game.HP.isSomeoneDead()) {
                  game.flow.gameOver();
                } else {
                  gameScene.restartGame();
                }
              });
            });
          });
        });
      });
    };

    // each player card
    allPlayerCardElms.forEach(function (elm) {
      /**
       * Animates the cards placing the chosen card on the battle field and
       * removing the others from view.
       */
      elm.onclick = function () {
        /* select a card */
        selectedCard = new Card(elm);
        elm.classList.remove("flipped");
        elm.classList.add("selected");

        console.log("Power of selected card: ", selectedCard.power());

        /* remove non-selected cards */
        document.querySelectorAll(".flipped").forEach(function (elm) {
          elm.classList.remove("in");
          elm.classList.add("out");
        });

        /* battle */
        beginBattleAnimation();
      };
    });
  };
})();

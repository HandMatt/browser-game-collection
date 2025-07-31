/**
 * scenes.js contains the scene management logic for the game.
 */
(function () {
  /**
   * Current instance of the game.
   */
  var game = (this.cardBattleGame = this.cardBattleGame || {});

  /**
   * Generic scene object
   */
  var scene = (game.scene = {
    /**
     * Identifier for specific scene instance.
     */
    node: document.querySelector(".scene"),
    /**
     * Hook for child objects to use.
     */
    setup: function () {},
    /**
     * Hook for child objects to use.
     */
    onShow: function () {},
    /**
     * Adds the scene to the display.
     */
    show: function () {
      this.node.classList.remove("out");
      this.node.classList.add("in");
      this.onShow();
    },
    /**
     * Removes the scene from the display.
     */
    hide: function () {
      this.node.classList.remove("in");
      this.node.classList.add("out");
    },
  });

  /**
   * Start scene instance.
   */
  var startScene = (game.startScene = Object.create(scene));
  startScene.node = document.getElementById("start-scene");
  /**
   * Start the game and show the game scene.
   */
  startScene.setup = function () {
    document.getElementById("start-btn").onclick = function () {
      game.flow.startGame();
      return false;
    };
  };

  /**
   * Gameover scene instance.
   */
  var gameOverScene = (game.gameOverScene = Object.create(scene));
  gameOverScene.node = document.getElementById("gameover-scene");
  /**
   * Returns the player to the start scene.
   */
  gameOverScene.setup = function () {
    document.getElementById("back-to-menu-button").onclick = function () {
      game.flow.startOver();
    };
  };
  gameOverScene.onShow = function () {
    if (game.HP.isPlayerDead()) {
      this.node.classList.add("lose");
      this.node.classList.remove("win");
    } else {
      this.node.classList.add("win");
      this.node.classList.remove("lose");
    }
  };
})();

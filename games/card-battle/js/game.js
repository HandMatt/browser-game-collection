/**
 * game.js acts as the entry point of the game logic responsible for
 * controlling the game flow.
 */
(function () {
  /**
   * Current instance of the game.
   */
  var game = (this.cardBattleGame = this.cardBattleGame || {});

  // main game logic, defines the flow that helps control how to show and hide
  // the games scenes.
  game.flow = {
    /**
     * Returns player to the start scene.
     */
    startOver: function () {
      game.startScene.show();
      game.gameScene.hide();
      game.gameOverScene.hide();
    },
    /**
     * Progresses the player to the game scene.
     */
    startGame: function () {
      game.startScene.hide();
      game.gameScene.show();
      game.gameOverScene.hide();
    },
    /**
     * Progresses the player to the gameover scene.
     */
    gameOver: function () {
      game.startScene.hide();
      game.gameScene.hide();
      game.gameOverScene.show();
    },
  };

  // Entry Point
  var init = function () {
    console.log("Welcome to Card Battle Game.");
    // register the click input listeners.
    game.startScene.setup();
    game.gameScene.setup();
    game.gameOverScene.setup();
  };

  // window.onload = init; // use window.onload (or when DOM ready) if the script is not placed at the end of the HTML file.
  init();
})();

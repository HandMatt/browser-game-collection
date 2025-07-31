/**
 * game.js acts as the entry point of the game logic responsible for
 * controlling the game flow.
 */
// anonymous function to put all variables into local scope by default.
(function () {
  /**
   * Current instance of the game.
   */
  var game = (window.colourQuestGame = window.colourQuestGame || {});
  // main game logic, defines the flow that helps control how to show and hide
  // the games scenes.
  game.flow = {
    /**
     * Current game level.
     */
    currentLevel: -1,
    /**
     * Maximum game level.
     */
    maxLevel: game.questLevels.length - 1,
    /**
     * Restarts the game, and presents the start scene.
     */
    startOver: function () {
      game.startScene.hide();
      game.summaryScene.hide();
      game.gameoverScene.hide();
      game.gameScene.hide();
      game.startScene.show();
      this.currentLevel = -1;
    },
    /**
     * Ends the current level, and presents the level summary scene.
     */
    gameWin: function () {
      game.gameScene.hide();
      game.summaryScene.show();
      game.timer.stop();
    },
    /**
     * Ends the current game, and presents the game over scene.
     */
    gameOver: function () {
      game.startScene.show();
      game.gameScene.hide();
      game.gameoverScene.show();
      game.timer.stop();
    },
    /**
     * Progresses the game to the next level, and present the game scene.
     */
    nextLevel: function () {
      this.currentLevel += 1;
      if (this.currentLevel >= this.maxLevel) this.currentLevel = this.maxLevel;
      game.gameScene.updateLevelInfo(this.currentLevel + 1); // when displaying level, we start from 1 instead of 0, so +1 here
      game.startScene.hide();
      game.summaryScene.hide();
      game.gameScene.show();
      game.compositionView.node.removeAllChildren();
      this.startLevel();
    },
    /**
     * Completes the current level, and present the level summary scene.
     */
    finishLevel: function () {
      game.gameScene.hide();
      game.summaryScene.show();
    },
    /**
     * Starts the current level.
     */
    startLevel: function () {
      game.quest = new game.Quest(this.currentLevel);
      game.compositionSeq = [];
      game.composition = new game.Composition();
      game.gameScene.visualize(game.quest);
      game.gameScene.handleInput();
      game.timer.restart();
    },
  };
  /**
   * Entry point for the Colour Quest game.
   */
  var init = function () {
    console.log("Welcome to Colour Quest Game.");
    // register the click input listeners.
    game.startScene.handleInput();
    game.summaryScene.handleInput();
    game.gameoverScene.handleInput();
    game.gameScene.handleInput();
  };
  // window.onload = init; // use window.onload (or when DOM ready) if the script is not placed at the end of the HTML file.
  init(); // start the game
})(); // self-executing function.

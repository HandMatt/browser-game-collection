/**
 * scenes.js contains the scene management logic for the game.
 */
(function () {
  /**
   * Current instance of the game.
   */
  var game = (window.colourQuestGame = window.colourQuestGame || {});

  /**
   * Generic scene object.
   */
  var scene = {
    /**
     * Identifies specific scene instance.
     */
    node: document.querySelector(".scene"),
    /**
     * Adds the scene to the display.
     */
    show: function () {
      this.node.classList.remove("out");
      this.node.classList.add("in");
    },
    /**
     * Removes the scene from the display.
     */
    hide: function () {
      this.node.classList.remove("in");
      this.node.classList.add("out");
    },
  };

  /**
   * Game scene instance.
   */
  var gameScene = (game.gameScene = Object.create(scene));
  gameScene.node = document.getElementById("game-scene");
  /**
   * Allows player to select pattern for composition by clicking.
   */
  gameScene.handleInput = function () {
    document.querySelectorAll("#deck .pattern").forEach(function (elm) {
      /**
       * Removes pattern display from the deck and selects it for composition.
       */
      elm.onclick = function () {
        var pattern = elm.getAttribute("data-pattern");
        elm.style.display = "none";
        game.compositionView.selectPattern(pattern);
      };
    });

    /**
     * Adds undo functionality to the the undo button.
     */
    document.getElementById("undo-button").onclick = function (e) {
      game.compositionView.undo();
      e.preventDefault();
    };
  };
  /**
   * Removes the game scene from current display.
   */
  gameScene.hide = function () {
    // invoke the show function inside the prototype chain. (aka. super.hide())
    Object.getPrototypeOf(this).hide.call(this);

    // add the class for the out effect
    // var questView = document.getElementById('quest');
    // questView.classList.add('out');
  };
  /**
   * Updates the stage information with the current level.
   * @param {*} level - numeric representation of the current stage
   */
  gameScene.updateLevelInfo = function (level) {
    document.getElementById("stage").textContent = "Stage " + level;
  };
  /**
   * Displays the data in the game scene by creating the patterns in the quest
   * area of the game according to the provided data.
   * @param {*} quest - the quest data for composition display
   */
  gameScene.visualize = function (quest) {
    var questData = quest.data;
    var patternsToShow = [];
    for (var i in questData) {
      for (var j in questData[i]) {
        patternsToShow.push(questData[i][j]);
      }
    }

    // quest
    // visualize the quest composition view:
    var questCompositionNode = document.getElementById("quest-composition");

    // empty the DOM view
    questCompositionNode.removeAllChildren();

    // visualize the pattern view:
    for (var i in patternsToShow) {
      var patternNode = document
        .querySelector("#element-template .pattern")
        .cloneNode(/*clone children=*/ true);
      patternNode.setAttribute("data-pattern", patternsToShow[i]);
      questCompositionNode.appendChild(patternNode);
    }

    // player composition
    // randomize the patterns array
    patternsToShow.sort(function (a, b) {
      return Math.random() - 0.5;
    });

    // empty the current deck view
    var deckNode = document.getElementById("deck");
    deckNode.removeAllChildren();

    // add the pattern to the deck view
    for (var i in patternsToShow) {
      var patternSlotNode = document
        .querySelector("#element-template .pattern-slot")
        .cloneNode(/*clone children=*/ true);
      patternSlotNode
        .querySelector(".pattern")
        .setAttribute("data-pattern", patternsToShow[i]);
      deckNode.appendChild(patternSlotNode);
    }
  };

  /**
   * Start scene instance.
   */
  var startScene = (game.startScene = Object.create(scene));
  startScene.node = document.getElementById("start-scene");
  /**
   * Start the game and progress to the next level.
   */
  startScene.handleInput = function () {
    document.getElementById("start-btn").onclick = function () {
      game.flow.nextLevel();
    };
  };

  /**
   * Summary scene instance.
   */
  var summaryScene = (game.summaryScene = Object.create(scene));
  summaryScene.node = document.getElementById("summary-scene");
  /**
   * Progresses to the next level.
   */
  summaryScene.handleInput = function () {
    document.getElementById("next-level-button").onclick = function () {
      game.flow.nextLevel();
    };
  };

  /**
   * Game over scene instance.
   */
  var gameoverScene = (game.gameoverScene = Object.create(scene));
  gameoverScene.node = document.getElementById("gameover-scene");
  /**
   * Returns to the start scene.
   */
  gameoverScene.handleInput = function () {
    var scene = this;
    document.getElementById("back-to-menu-button").onclick = function () {
      game.flow.startOver();
    };
  };
})();

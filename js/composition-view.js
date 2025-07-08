/**
 * composition-view.js contains the logic for handling the display of the
 * composition.
 */
(function () {
  /**
   * Current instance of the game.
   */
  var game = (window.colourQuestGame = window.colourQuestGame || {});
  // composition module
  game.compositionView = {
    node: document.getElementById("your-composition"),
    /**
     * Adds a pattern tile to the composition.
     * @param {*} patternId - The target pattern element
     */
    pushPattern: function (patternId) {
      var newChild = document.createElement("div");
      newChild.classList.add("pattern");
      newChild.setAttribute("data-pattern", patternId);
      this.node.appendChild(newChild);
    },
    /**
     * Removes a pattern tile from the composition.
     */
    pullPattern: function () {
      var lastChild = this.node.querySelector(".pattern:last-child");
      if (lastChild) {
        // find the pattern in the deck and make it visible
        var deckNode = document.getElementById("deck");
        var resumePattern = deckNode.querySelector(
          '[data-pattern="' + lastChild.getAttribute("data-pattern") + '"]'
        );
        resumePattern.style.display = "block";
        // remove the current pattern in the composition
        this.node.removeChild(lastChild);
      }
    },
    /**
     * Adds selected pattern to the composition, and checks the compositions
     * match.
     * @param {*} pattern - The selected pattern
     */
    selectPattern: function (pattern) {
      this.pushPattern(pattern);
      game.compositionSeq.push(pattern);
      game.composition = game.Composition.createFromSequence(
        game.compositionSeq
      );
      if (game.quest.isEqualToComposition(game.composition)) {
        game.flow.gameWin();
      }
    },
    /**
     * Removes the most recently added pattern tile from the composition, and
     * checks the compositions match.
     */
    undo: function () {
      this.pullPattern();
      game.compositionSeq.pop();
      game.composition = game.Composition.createFromSequence(
        game.compositionSeq
      );
      if (game.quest.isEqualToComposition(game.composition)) {
        game.glow.gameWin();
      }
    },
  };
})();

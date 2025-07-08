/**
 * composition.js is used for logic than represents the composition
 */
(function () {
  /**
   * Current instance of the game.
   */
  var game = (window.colourQuestGame = window.colourQuestGame || {});
  /**
   * Composition is a layered stack of patterns.
   */
  var Composition = (game.Composition = (function () {
    function Composition() {
      this.data = [];
    }
    /**
     * Turns a composition back into an array.
     * @returns {seq} seq - one-dimension array representing the current composition
     */
    Composition.prototype.toSequence = function () {
      var seq = [];
      for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].length; j++) {
          seq.push(this.data[i][j]);
        }
      }
      return seq;
    };

    // static variable. available as only one copy among all composition instances
    Composition.nonOverlappedPattern = [
      [], // pattern 0
      [2], // pattern 1, doesn't overlap with pattern 2
      [1], // pattern 2, doesn't overlap with pattern 1
      [], // pattern 3
      [], // pattern 4
      [6], // pattern 5, doesn't overlap with pattern 6
      [5], // pattern 6, doesn't overlap with pattern 5
    ];

    /**
     * Turns a sequence back into a composition, the sequence does not handle
     * two patterns allowed in the same layer.
     * @param {*} sequence - one-dimension array representing the order of pattern cards
     * @returns {Composition} Composition - A collection of patterns stacked in a particular order
     */
    Composition.createFromSequence = function (sequence) {
      // helper functions
      /**
       * Determines if given two patterns can be overlapped.
       * @param {*} patternA
       * @param {*} patternB
       * @returns {boolean}
       */
      var allowPatternsInSameLevel = function (patternA, patternB) {
        // iterate the array to see if the current patterns overlap
        var nonOverlappedPattern = Composition.nonOverlappedPattern[patternA];
        var len = nonOverlappedPattern.length;
        for (var i = 0; i < len; i++) {
          if (nonOverlappedPattern[i] === parseInt(patternB)) {
            return true;
          }
        }
        return false;
      };
      /**
       * Determines if a pattern can occupy the same layer as another pattern.
       * @param {*} layer - an array that contains an existing pattern
       * @param {*} pattern - the pattern to add to the composition
       * @returns {boolean} - true if pattern can occupy the same layer, false if not
       */
      var layerAllowsPattern = function (layer, pattern) {
        for (var i = 0, len = layer.length; i < len; i++) {
          if (!allowPatternsInSameLevel(layer[i], pattern)) {
            return false;
          }
        }
        return true;
      };
      // end helper functions

      // scan the selection array in a sequence then put each pattern into
      // either the same layer or a new layer
      var newComposition = new Composition();
      var layer = [];
      for (var i = 0, len = sequence.length; i < len; i++) {
        if (layerAllowsPattern(layer, sequence[i])) {
          // we are still in the same layer
          layer.push(sequence[i]);
        } else {
          // two patterns overlapped, push the current layer to composition and
          // use new layer for the current pattern
          newComposition.data.push(layer);
          // new array instance to prevent browser using the same
          // array and crashes the data
          layer = [];
          layer.push(sequence[i]);
        }
      }
      if (layer.length > 0) newComposition.data.push(layer); // for the last layer
      return newComposition;
    };

    return Composition;
  })());
})();

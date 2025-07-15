var game = this.game || (this.game = {});
var createjs = createjs || {};

(function (game, cjs) {
  game.view = {};

  game.view.init = function () {
    initCustomerView();
    initResizeHandler();
  };

  function initCustomerView() {
    // Canvas
    game.canvas = document.getElementById("canvas");
  }

  function initResizeHandler() {
    var customerView = document.getElementById("customer-view");

    var getBorderWidths = function (element) {
      // get computed style.
      var style = getComputedStyle(element);
      var borderWidths = style.borderWidth.split(" ");

      var top, right, bottom, left;
      top = right = bottom = left = parseInt(borderWidth[0]);

      if (borderWidths.length >= 2) {
        right = left = parseInt(borderWidths[1]);
      }
      if (borderWidths.length >= 3) {
        bottom = parseInt(borderWidths[2]);
      }
      if (borderWidths.length >= 4) {
        left = parseInt(borderWidths[3]);
      }

      // return the 4 values as object.
      return {
        top: top,
        right: right,
        bottom: bottom,
        left: left,
      };
    };

    var resizeCanvas = function () {
      var borderWidths = getBorderWidths(customerView);
      game.canvas.width =
        customerView.offsetWidth - borderWidths.left - borderWidths.right; // border-width of left + right
      game.canvas.height =
        customerView.offsetHeight - borderWidths.top - borderWidths.bottom; // border-width of top + bottom
    };

    resizeCanvas();
    repositionCustomer();

    window.onresize = function () {
      resizeCanvas();
      repositionCustomer();
    };

    function repositionCustomer() {
      // code later for canvas resizing
    }
  }
}).call(this, game, createjs);

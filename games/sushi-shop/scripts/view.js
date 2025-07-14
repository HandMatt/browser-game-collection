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

    var resizeCanvas = function () {
      game.canvas.width = customerView.offsetWidth;
      game.canvas.height = customerView.offsetHeight;
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

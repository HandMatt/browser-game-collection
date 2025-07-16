var game = this.game || (this.game = {});
var createjs = createjs || {};

(function (game, cjs) {
  game.view = {};

  game.view.init = function () {
    initCustomerView();
    initDOMElements();
    initResizeHandler();
  };

  game.view.clearAllIngredients = function () {
    game.helper.clearChildren(others);
    game.helper.clearChildren(rices);
    game.helper.clearChildren(seaweeds);
  };

  // ------ view's internal logic starts here

  var ingredientsNode = document.getElementById("ingredients");

  function initCustomerView() {
    // Canvas
    game.canvas = document.getElementById("canvas");
  }

  function initDOMElements() {
    var ingredients = document.querySelectorAll(".ingredient");
    for (var i = 0, len = ingredients.length; i < len; i++) {
      var element = ingredients[i];
      element.onclick = ingredientOnClick;
    }

    // trash button
    var deleteButton = document.getElementById("delete-sushi-btn");
    deleteButton.onclick = function () {
      game.trashSushi();
    };
  }

  function initResizeHandler() {
    var customerView = document.getElementById("customer-view");

    var getBorderWidths = function (element) {
      // get computed style.
      var style = getComputedStyle(element);
      var borderWidths = style.borderWidth.split(" ");

      var top, right, bottom, left;
      top = right = bottom = left = parseInt(borderWidths[0]);

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

  // logic of clicking the ingredients
  // reference of 3 layers in sushi board
  // for the ingredientsOnClick function to use
  var others = document.getElementById("others");
  var rices = document.getElementById("rices");
  var seaweeds = document.getElementById("seaweeds");

  var addIngredientToScreen = function (type) {
    var isEqualToAnySushi = false;
    var sushiName = "";
    // loop all receipes
    for (var key in game.receipes) {
      if (game.receipes.hasOwnProperty(key)) {
        isEqualToAnySushi = game.helper.arrayIsEqual(
          game.sushiOnHand,
          game.receipes[key],
        );
        sushiName = key;
        if (isEqualToAnySushi) {
          break; // must break the loop to keep the current equal one.
        }
      }
    }

    // UI
    // show ingredients or final sushi image
    if (isEqualToAnySushi) {
      // show one sushi image instead of individual ingredient.
      game.view.clearAllIngredients();

      var sushi = document.createElement("div");
      sushi.classList.add(sushiName, "sushi");
      others.appendChild(sushi);
    } else {
      // clone the individual ingredient to sushi board.
      var node = ingredientsNode
        .querySelector(".ingredient[data-type=" + type + "]")
        .cloneNode();
      if (type === "rice") {
        rices.appendChild(node);
      } else if (type === "seaweed") {
        seaweeds.appendChild(node);
      } else {
        others.appendChild(node);
      }
    }
  };

  var ingredientOnClick = function () {
    var type = this.dataset.type;

    // DATA
    game.sushiOnHand.push(type);
    game.sushiOnHand = game.sushiOnHand.sort();

    addIngredientToScreen(type);
  };
}).call(this, game, createjs);

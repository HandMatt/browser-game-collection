(function () {
  var game = (this.spaceRunner = this.spaceRunner || {});

  // Generic Scene object.
  var scene = (game.scene = {
    node: document.querySelector(".scene"),
    setup: function () {},
    onShow: function () {}, // hook for child objects to use.
    show: function () {
      this.node.classList.remove("out");
      this.node.classList.add("in");
      this.onShow();
    },
    hide: function () {
      this.node.classList.remove("in");
      this.node.classList.add("out");
    },
  });

  // Gameover Scene
  var gameOverScene = (game.gameOverScene = Object.create(scene));
  gameOverScene.node = document.getElementById("gameover-scene");
  gameOverScene.setup = function () {
    document.getElementById("back-to-menu-button").onclick = function () {
      game.flow.startGame();
    };
  };
}).call(this);

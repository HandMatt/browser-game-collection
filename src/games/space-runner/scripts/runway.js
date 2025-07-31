// run way data
(function () {
  var game = this.spaceRunner || (this.spaceRunner = {});
  game.data = game.data || {};
  game.data.runway = [
    [0, 1, 2, 0],
    [0, 1, 2, 0],
    [0, 1, 2, 0],
    [0, 1, 2, 10],
    [0, 1, 2, 0],
    [0, 1, 2, 0],
    [0, 1, 2, 0],
    [0, 1, 2, 0],
    [10, 1, 2, 0],
    [0, 1, 2, 0],
    [0, 1, 100, 0],
    [0, 1, 2, 0],
    [0, 1, 2, 0],
    [0, 1, 2, 0],
    [0, 1, 2, 0],
  ];
}).call(this);

// runway view
(function () {
  var game = this.spaceRunner || (this.spaceRunner = {});
  game.view = game.view || {};

  game.view.floor = document.getElementById("floor");

  game.view.runway = {
    tiles: [],
    runwayIndex: 0,
    createTile: function (type, x, y) {
      // Create tiles
      var newTileDiv = document.createElement("div");
      newTileDiv.classList.add("tile");
      newTileDiv.classList.add("tile-" + type);
      this.tiles.push(new game.Tile(newTileDiv, type, x, y));
      game.view.floor.insertBefore(newTileDiv, game.player.element);
    },
    reset: function () {
      for (var i = 0, len = this.tiles.length; i < len; i++) {
        var tile = this.tiles[i];
        if (tile.element) {
          game.view.floor.removeChild(tile.element);
        }
      }
      this.tiles.length = 0;
    },
    updateTilesPosition: function () {
      for (var i = 0, len = this.tiles.length; i < len; i++) {
        var tile = this.tiles[i];
        tile.updatePosition();
      }
    },
    tick: function (round) {
      // move existing tiles
      for (var i = 0, len = this.tiles.length; i < len; i++) {
        var tile = this.tiles[i];
        tile.moveDown();
      }

      // increase the runway Index
      this.runwayIndex += 1;
      if (this.runwayIndex >= game.data.runway.length) {
        this.runwayIndex = 0;
      }

      // create new tiles
      var row = game.data.runway[this.runwayIndex];
      for (var i = 0, len = row.length; i < len; i++) {
        this.createTile(row[i], i * game.TILE_HEIGHT, 0);
      }

      // update floor background
      game.view.floor.style.backgroundPositionY =
        round * game.BACKGROUND_MOVEMENT_SPEED + "px";
    },
  };
}).call(this);

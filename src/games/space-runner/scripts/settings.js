(function () {
  var game = this.spaceRunner || (this.spaceRunner = {});

  game.BOUNDARY = 1000;

  game.BLOCKS = [100];

  game.TILE_HEIGHT = game.TILE_WIDTH = 100;
  game.BACKGROUND_MOVEMENT_SPEED = 5;
}).call(this);

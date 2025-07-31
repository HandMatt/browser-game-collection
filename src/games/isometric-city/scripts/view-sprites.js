var game = this.game || (this.game = {});
var createjs = createjs || {};

// Tile View
(function (game, cjs) {
  function Tile(imagePath) {
    imagePath = imagePath || "images/tile.png";
    cjs.Bitmap.call(this, imagePath);
    this.regX = 0;
    this.regY = 21;
  }

  Tile.prototype = Object.create(cjs.Bitmap.prototype);
  Tile.width = 86;
  Tile.height = 43;
  game.Tile = Tile;
}).call(this, game, createjs);

// Buildings View
(function (game, cjs) {
  (game.CoinsGenerator = function () {
    game.Tile.call(this, "images/coins-generator.png");
    this.regX = 0;
    this.regY = 94;
  }).prototype = Object.create(game.Tile.prototype);

  (game.Merchant = function () {
    game.Tile.call(this, "images/merchant.png");
    this.regX = 0;
    this.regY = 43;
  }).prototype = Object.create(game.Tile.prototype);

  (game.PowerSupply = function () {
    game.Tile.call(this, "images/power-supply.png");
    this.regX = 0;
    this.regY = 51;
  }).prototype = Object.create(game.Tile.prototype);

  (game.ConstructionStep1 = function () {
    game.Tile.call(this, "images/construction-step1.png");
    this.regX = 0;
    this.regY = 51;
  }).prototype = Object.create(game.Tile.prototype);

  (game.ConstructionStep2 = function () {
    game.Tile.call(this, "images/construction-step2.png");
    this.regX = 0;
    this.regY = 74;
  }).prototype = Object.create(game.Tile.prototype);

  (game.Diamond = function () {
    cjs.Container.call(this); // super
    var data = {
      framerate: 16,
      images: ["images/diamond-spritesheet.png"],
      frames: { width: 90, height: 90 },
    };
    var spritesheet = new cjs.SpriteSheet(data);
    var diamondSprite = new cjs.Sprite(spritesheet);
    diamondSprite.gotoAndPlay(0);
    diamondSprite.scaleX = diamondSprite.scaleY = 0.5;
    this.addChild(diamondSprite);

    this.on("click", function () {
      game.dispatchEvent("clickedDiamond");
      this.parent.removeChild(this);
    });
  }).prototype = Object.create(cjs.Container.prototype);
}).call(this, game, createjs);

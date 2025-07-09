var game = this.game || (this.game = {});
var createjs = createjs || {};

// Settings
(function (game) {
  game.canvas = document.getElementById("canvas");

  game.setting = {
    gameWidth: game.canvas.width,
    gameHeight: game.canvas.height,
    tickCountForMerchantDiamond: 800,
    coinsNeededForDiamond: 200,
  };
}).call(this, game);

// Buildings Growing
(function (game, cjs) {
  // params sample: 2, 3, "Building"
  game.Building = function (isoX, isoY, viewClassName) {
    this.name = viewClassName;
    this.x = isoX;
    this.y = isoY;
    this.isConstructionDone = false;
    this.currentStep = 1;
    this.stepsSeconds = game.BuildingsData[viewClassName].stepsSeconds;
    this.buildTime = new Date().getTime();
  };

  game.buildingsList = [];

  // grow the building on every tick.
  var cityGrowing = (game.cityGrowing = {});
  cityGrowing.tick = function () {
    for (var i = 0, len = game.buildingsList.length; i < len; i++) {
      var building = game.buildingsList[i];

      // is construction in the next stage?
      var secondsDiff = Math.floor(
        (new Date().getTime() - building.buildTime) / 1000
      );
      for (var j = 0, length = building.stepsSeconds.length; j < length; j++) {
        if (secondsDiff >= building.stepsSeconds[j]) {
          building.currentStep = j + 2;
          if (building.currentStep > length) {
            building.isConstructionDone = true;
          }
        }
      }
    }
  };
}).call(this, game, createjs);

// Layers
(function (game, cjs) {
  var Layer = (function () {
    function Layer() {
      cjs.Container.call(this); // super
    }
    Layer.prototype = Object.create(cjs.Container.prototype);
    return Layer;
  })();

  // Background Layer
  game.BGLayer = (function () {
    function BGLayer() {
      Layer.call(this); // super
      // background image
      var bitmap = new cjs.Bitmap("images/bg.png");
      this.addChild(bitmap);

      // Cloud 1
      var cloud1 = new cjs.Bitmap("images/cloud1.png");
      cloud1.y = 30;
      cloud1.alpha = 0.4;
      this.addChild(cloud1);

      // Cloud 1 tween animation
      cjs.Tween.get(cloud1, { loop: true })
        .to({ x: game.setting.gameWidth + 300 }, 0)
        .wait(15500)
        .to({ x: -300 }, 50 * 1000);

      // Cloud 2
      var cloud2 = new cjs.Bitmap("images/cloud2.png");
      cloud2.y = 300;
      cloud2.alpha = 0.4;
      this.addChild(cloud2);

      // Cloud 2 tween animation
      cjs.Tween.get(cloud2, { loop: true })
        .to({ x: game.setting.gameWidth + 50 }, 0)
        .wait(500)
        .to({ x: -300 }, 50 * 1000);
    }
    BGLayer.prototype = Object.create(Layer.prototype);
    return BGLayer;
  })();

  // City Layer
  game.CityLayer = (function () {
    function CityLayer() {
      Layer.call(this); // super

      // city background.
      var bg = new cjs.Bitmap("images/city-bg.png");
      bg.regX = 370; // adjust top fit the 9x9 tiles.
      bg.regY = 30;
      this.addChild(bg);

      // we need a flag to know whether we are creating a new building.
      // By default it is false.
      game.isCreatingNewBuilding = false;

      this.cols = 9;
      this.rows = 9; // 9x9 map.

      // 2D array that holds the type of building in string
      this.data = game.helper.create2DArray(this.rows, this.cols);

      // tiles container to contain all Tile instance.
      this.tiles = new cjs.Container();
      this.addChild(this.tiles);

      // 2D array that holds the ref. of building sprites
      this.viewMap = game.helper.create2DArray(this.rows, this.cols);

      // center align the city layer to the stage
      this.x = game.setting.gameWidth / 2 - game.Tile.width / 2;
      this.y =
        game.setting.gameHeight / 2 - ((this.rows - 1) * game.Tile.height) / 2;

      this.redraw(); // create that visual of the city.

      this.setupMouseInteraction();
    }
    CityLayer.prototype = Object.create(Layer.prototype);
    CityLayer.prototype.setupMouseInteraction = function () {
      // a ghost building
      var ghostBuilding = new game.CoinsGenerator();
      ghostBuilding.alpha = 0.5;
      ghostBuilding.visible = false;
      this.addChild(ghostBuilding);

      // change ghost building visual based on the building choice.
      var _this = this;
      game.on("newBuildingToBePlaced", function () {
        _this.removeChild(ghostBuilding);

        ghostBuilding = new game[game.buildingTypeToBePlaced]();
        ghostBuilding.alpha = 0.5;
        ghostBuilding.visible = false;
        _this.addChild(ghostBuilding);
      });

      function showGhostBuilding(x, y) {
        ghostBuilding.visible = true;

        // from screen cursor to city layer local x/y
        var localPt = _this.globalToLocal(x, y);
        // from screen's x/y of city layer to isometric x/y.
        var isoCoord = game.isoMaths.screenToIsoCoord(localPt.x, localPt.y);
        // back from iso x/y to screen x/y (get tile x/y).
        // in order to get the screen x/y at tile reg point.
        var tileScreenCoord = game.isoMaths.isoToScreenCoord(
          isoCoord.x,
          isoCoord.y
        );
        ghostBuilding.x = tileScreenCoord.x;
        ghostBuilding.y = tileScreenCoord.y;
        ghostBuilding.filters = [];
        var isTileAvailable =
          _this.data[isoCoord.y] &&
          _this.data[isoCoord.y][isoCoord.x] === "Tile";
        if (!isTileAvailable) {
          // overlay a red colour by using filter
          ghostBuilding.filters = [
            new cjs.ColorFilter(1, 0, 0, 1), // red
          ];
        }
        ghostBuilding.cache(0, 0, 100, 100); // we need to cache the Display Object as bitmap for the red filter.
      }

      // mouse move on city layer
      game.stage.on("stagemousemove", function (e) {
        // mousemove happens all the time, and if we are not creating ghost buildings is invisible
        if (!game.isCreatingNewBuilding) {
          ghostBuilding.visible = false;
          return;
        }

        showGhostBuilding(e.stageX, e.stageY);
      });

      this.on("click", function (e) {
        var localPt = this.globalToLocal(e.stageX, e.stageY);
        var isoCoord = game.isoMaths.screenToIsoCoord(localPt.x, localPt.y);
        var isTileAvailable =
          this.data[isoCoord.y] && this.data[isoCoord.y][isoCoord.x] === "Tile";
        if (game.isCreatingNewBuilding && isTileAvailable) {
          var needCoins =
            game.BuildingsData[game.buildingTypeToBePlaced].needCoins;
          game.coins -= needCoins;

          var event = new cjs.Event("placedBuilding");
          event.buildingType = game.buildingTypeToBePlaced;
          game.dispatchEvent(event); // trigger the event

          game.isCreatingNewBuilding = false;
          ghostBuilding.visible = false;

          var newBuildingData = new game.Building(
            isoCoord.x,
            isoCoord.y,
            event.buildingType
          );

          game.buildingsList.push(newBuildingData);

          // redraw the city tiles and buildings after changes.
          this.redraw();
        }
      });
    };

    CityLayer.prototype.redraw = function () {
      var newDataMap = game.helper.create2DArray(this.rows, this.cols, "Tile");

      // construct the 2D map data with building list.
      for (var i = 0, len = game.buildingsList.length; i < len; i++) {
        var b = game.buildingsList[i];
        var className = b.name;
        if (!b.isConstructionDone) {
          className = "ConstructionStep" + b.currentStep;
        }

        newDataMap[b.y][b.x] = className;
      }

      // loop the 2D array for visualisation.
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          if (this.data[i][j] !== newDataMap[i][j]) {
            this.tiles.removeChild(this.viewMap[i][j]);

            var className = newDataMap[i][j];

            // sprite based on the selected building type
            var tile = new game[className]();

            tile.x = ((j - i) * game.Tile.width) / 2;
            tile.y = ((j + i) * game.Tile.height) / 2;
            this.tiles.addChild(tile);

            this.viewMap[i][j] = tile;
          }
        }
      }

      this.data = newDataMap;

      // Reorder the building based on Y
      this.tiles.sortChildren(function (b1, b2) {
        if (b1.y > b2.y) {
          return 1;
        }
        if (b1.y < b2.y) {
          return -1;
        }
        return 0;
      });
    };

    return CityLayer;
  })();

  // User Interface Layer
  game.UILayer = (function () {
    function UILayer() {
      Layer.call(this); // super

      this.setupHUD();

      this.setupBuildingPanel();

      var _this = this; // for event handler to refer to 'this'

      game.on("placedBuilding", function () {
        _this.cancelBuildBtn.visible = false;
        _this.newBuildingBtn.visible = true;
      });
    }
    UILayer.prototype = Object.create(Layer.prototype);
    UILayer.prototype.placeBitmap = function (path, x, y) {
      var bitmap = new cjs.Bitmap(path);
      bitmap.x = x;
      bitmap.y = y;
      this.addChild(bitmap);
    };
    UILayer.prototype.placeText = function (text, size, x, y, align) {
      var text = new cjs.Text(text, size + "px Arial", "#222");
      text.x = x;
      text.y = y;
      text.textAlign = align;
      this.addChild(text);
      return text; // text content needs to be changed later.
    };
    UILayer.prototype.setupHUD = function () {
      this.placeBitmap("images/candies.png", 28, 16);
      this.placeBitmap("images/diamonds.png", 154, 14);
      this.placeBitmap("images/populations.png", 810, 14);

      this.coinsIndicator = this.placeText("12345", 12, 123, 34, "right");
      this.diamondsIndicator = this.placeText("0", 12, 250, 34, "right");
      this.powerSupplyIndicator = this.placeText("100", 16, 905, 32, "center");
      this.populationIndicator = this.placeText("100", 16, 845, 32, "center");
    };
    UILayer.prototype.setupBuildingPanel = function () {
      // Building Panels
      this.buildingPanel = new cjs.Container();
      this.buildingPanel.visible = false; // hide it at initialise
      this.addChild(this.buildingPanel);

      var _this = this;

      var buildings = [
        {
          name: "PowerSupply",
          image: "power-supply",
          x: 20,
        },
        {
          name: "CoinsGenerator",
          image: "coins-generator",
          x: 338,
        },
        {
          name: "Merchant",
          image: "merchant",
          x: 650,
        },
      ];

      // three building buttons

      // set up 1 building button based on the index and data
      function setupBuildingButton(i) {
        var b = buildings[i];
        var button = (_this["build" + b.name] = game.helper.createButton(
          "images/build-" + b.image + "-sprite.png",
          286,
          396
        ));
        button.x = b.x;
        button.y = 16;
        _this.buildingPanel.addChild(button);

        button.on("click", function () {
          game.buildingTypeToBePlaced = b.name;
          _this.readyToPlaceBuilding();
        });

        // disabled image
        var buttonDisabled = (_this["build" + b.name + "Disabled"] =
          new cjs.Bitmap("images/build-" + b.image + "-disabled.png"));
        buttonDisabled.x = button.x;
        buttonDisabled.y = button.y;
        buttonDisabled.visible = false;
        _this.buildingPanel.addChild(buttonDisabled);
      }

      // loop the 3 buttons
      for (var i = 0; i < 3; i++) {
        setupBuildingButton(i);
      }

      // *Cancel button while choosing place to build
      var cancelBuildBtn = (this.cancelBuildBtn = game.helper.createButton(
        "images/cancel-sprite.png",
        128,
        62
      ));
      cancelBuildBtn.x = 820;
      cancelBuildBtn.y = 400;
      this.addChild(cancelBuildBtn);
      cancelBuildBtn.visible = false;

      cancelBuildBtn.on("click", function () {
        game.isCreatingNewBuilding = false;
        cancelBuildBtn.visible = false;
        _this.newBuildingBtn.visible = true;
      });

      // Cancel button inside building panel
      var cancelButton = game.helper.createButton(
        "images/cancel-sprite.png",
        128,
        62
      );
      cancelButton.x = 820;
      cancelButton.y = 400;
      this.buildingPanel.addChild(cancelButton);

      cancelButton.on("click", function () {
        _this.hideBuildingPanel();
      });

      // New building button on stage
      this.newBuildingBtn = game.helper.createButton(
        "images/add-building-sprite.png",
        124,
        42
      );
      this.newBuildingBtn.x = 820;
      this.newBuildingBtn.y = 420;
      this.addChild(this.newBuildingBtn);

      this.newBuildingBtn.on("click", function () {
        _this.showBuildingPanel();
      });
    };
    UILayer.prototype.tick = function () {
      this.coinsIndicator.text = game.coins + ""; // force converting to string with ""
      this.diamondsIndicator.text = game.diamonds + "";
      this.powerSupplyIndicator.text = game.powerSupply + "";
      this.populationIndicator.text = game.population + "";
    };
    UILayer.prototype.showBuildingPanel = function () {
      this.newBuildingBtn.visible = false;
      this.buildingPanel.visible = true;

      var buildings = ["Merchant", "PowerSupply", "CoinsGenerator"];
      for (var i = 0, len = buildings.length; i < len; i++) {
        var name = buildings[i];

        // The boolean determines that the player has enough power supplies to build that building.
        // It returns true if the building doesn't need any population requirement.
        var hasEnoughPowerSupply =
          game.BuildingsData[name].needPopulation === 0 ||
          game.powerSupply - game.population >=
            game.BuildingsData[name].needPopulation;

        // The boolean determines that the player has enough coins to build that building.
        var hasEnoughCoins = game.coins >= game.BuildingsData[name].needCoins;

        if (hasEnoughPowerSupply && hasEnoughCoins) {
          // show the button and hide the disabled image
          this["build" + name + "Disabled"].visible = false;
          this["build" + name].y = this["build" + name + "Disabled"].y;
        } else {
          this["build" + name + "Disabled"].visible = true;
          this["build" + name].y = 999;
        }
      }
    };
    UILayer.prototype.hideBuildingPanel = function () {
      this.newBuildingBtn.visible = true;
      this.buildingPanel.visible = false;
    };
    UILayer.prototype.readyToPlaceBuilding = function () {
      this.buildingPanel.visible = false;
      this.cancelBuildBtn.visible = true;
      game.isCreatingNewBuilding = true;
      game.dispatchEvent("newBuildingToBePlaced");
    };
    UILayer.prototype.popDiamond = function (building) {
      game.diamonds += 1;
    };

    return UILayer;
  })();
}).call(this, game, createjs);

// The Game Logic
(function (game, cjs) {
  game.start = function () {
    cjs.EventDispatcher.initialize(game); // allow the game object to listen and dispatch custom events.

    game.stage = new cjs.Stage(game.canvas);
    game.stage.enableMouseOver();

    game.coins = 100;
    game.diamonds = 0;
    game.powerSupply = 100;
    game.population = 0;
    game.coinGenerationCountdown = 90;
    game.coinGenerationCount = 0;

    // in correct order: from background to foreground
    game.backgroundLayer = new game.BGLayer();
    game.cityLayer = new game.CityLayer();
    game.uiLayer = new game.UILayer();

    game.stage.addChild(game.backgroundLayer);
    game.stage.addChild(game.cityLayer);
    game.stage.addChild(game.uiLayer);

    cjs.Ticker.framerate = 40;
    cjs.Ticker.addEventListener("tick", game.stage); // add game.stage to ticker make the stage.update call automatically
    cjs.Ticker.addEventListener("tick", game.uiLayer.tick.bind(game.uiLayer));
    cjs.Ticker.addEventListener(
      "tick",
      game.cityLayer.redraw.bind(game.cityLayer)
    );
    cjs.Ticker.addEventListener(
      "tick",
      game.cityGrowing.tick.bind(game.cityGrowing)
    );
    cjs.Ticker.addEventListener("tick", game.tick);
  };

  game.calculateBuildingsEffects = function () {
    // refresh the population and power supply based on the building list.
    game.powerSupply = 10;
    game.population = 0;
    game.coinGenerationCountdown = 90; // default value, will be affected by coin generators

    for (var i = 0, len = game.buildingsList.length; i < len; i++) {
      var b = game.buildingsList[i];
      var data = game.BuildingsData[b.name];

      evaluatePopulation(data.needPopulation);

      if (b.isConstructionDone) {
        // only count power after it is built.
        evaluatePowerSupply(data.power);

        if (b.name === "CoinsGenerator") {
          evaluateCoinsGeneration();
        }

        if (b.name === "Merchant") {
          evaluateMerchant(b);
        }
      }
    }
  };

  function evaluatePopulation(value) {
    game.population += value;
  }

  function evaluatePowerSupply(value) {
    game.powerSupply += value;
  }

  function evaluateCoinsGeneration() {
    // each coin generator speed up the count down by 3 units.
    game.coinGenerationCountdown -= 3;
  }

  function evaluateMerchant(building) {
    var b = building;
    if (!b.diamondTick) {
      b.diamondTick = 0;
    }
    b.diamondTick += 1;
    if (b.diamondTick >= game.setting.tickCountForMerchantDiamond) {
      // trade coins to diamonds
      if (game.coins >= game.setting.coinsNeededForDiamond) {
        game.coins -= game.setting.coinsNeededForDiamond;
        game.uiLayer.popDiamond(b);
        b.diamondTick = 0;
      }
    }
  }

  game.tick = function () {
    game.coinGenerationCount += 1;
    if (game.coinGenerationCount >= game.coinGenerationCountdown) {
      game.coins += 1;
      game.coinGenerationCount = 0;
    }
    game.calculateBuildingsEffects();
  };
}).call(this, game, createjs);

// Entry Point
(function (game) {
  if (game) {
    game.start();
  } else {
    throw "No game logic found";
  }
}).call(this, game);

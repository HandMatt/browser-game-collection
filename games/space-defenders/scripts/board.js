var game = this.game || (this.game = {});
var createjs = createjs || {};
var lib = lib || {};

(function (game, cjs, lib) {
  function Board() {
    cjs.Container.call(this); // super

    this.x = 10;
    this.y = 60;

    // grid parameters
    this.rows = 10;
    this.cols = 7;
    this.tileWidth = 87;
    this.tileHeight = 83;

    // bg graphics
    var sprite = new lib.Board();
    this.addChild(sprite);
    sprite.y = this.tileHeight;

    // Selection graphic
    this.selection = new lib.Selection();
    this.addChild(this.selection);
    this.selection.visible = false;

    // by default, we are not adding building
    this.isAddingBuilding = false;

    // list of buildings and enemies
    this.buildingMap = game.helper.create2DArray(this.cols, this.rows);
    this.enemyMap = game.helper.create2DArray(this.cols, this.rows);
    this.enemyList = [];

    // bullet list for centralised collision detection
    this.bulletList = [];

    // event handling
    game.on("readyToPlaceBuilding", this.readyToPlaceBuilding.bind(this));

    // mouse interaction
    game.stage.on("stagemousemove", this.onMouseMove.bind(this));
    game.stage.on("stagemouseup", this.onClick.bind(this));

    // tick
    this.on("tick", this.tick);
  }

  Board.prototype = Object.create(cjs.Container.prototype);

  // utilities
  Board.prototype.screenToRowCol = function (x, y) {
    var col = Math.floor(x / this.tileWidth);
    var row = Math.floor(y / this.tileHeight);
    return { col: col, row: row };
  };
  Board.prototype.rowColToScreen = function (row, col) {
    var x = this.tileWidth * (col + 0.5); // +0.5 for tile center
    var y = this.tileHeight * (row + 0.5);
    return { x: x, y: y };
  };

  // Summon new piece on board
  Board.prototype.addBuildingAtTile = function (buildingClass, col, row) {
    var sprite = new game[buildingClass]();
    this.addChild(sprite);

    var pos = this.rowColToScreen(row, col);
    sprite.x = pos.x;
    sprite.y = pos.y;

    // store row/col for easy access later
    sprite.row = row;
    sprite.col = col;

    this.buildingMap[col][row] = sprite;
  };

  Board.prototype.removeBuilding = function (building) {
    this.buildingMap[building.col][building.row] = undefined;
    this.removeChild(building);
  };

  Board.prototype.removeAllBuildings = function () {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (this.buildingMap[i][j]) {
          this.removeBuilding(this.buildingMap[i][j]);
        }
      }
    }
  };
  Board.prototype.addEnemy = function (enemyClass) {
    var sprite = new game[enemyClass]();
    this.addChild(sprite);

    var col = Math.floor(Math.random() * this.cols); // random col
    var pos = this.rowColToScreen(0, col);
    sprite.x = pos.x;
    sprite.y = pos.y;

    // store row/col for easy access later
    sprite.row = 0;
    sprite.col = col;

    this.enemyList.push(sprite);
  };
  // Have all existing enemies been killed?
  Board.prototype.areEnemiesCleared = function () {
    return this.enemyList.length === 0;
  };
  Board.prototype.addBullet = function (bullet) {
    game.effectLayer.addChild(bullet);
    this.bulletList.push(bullet);
  };
  Board.prototype.removeAllBullets = function () {
    this.bulletList.length = 0;
    game.effectLayer.removeAllChildren();
  };
  // Tick Loop
  Board.prototype.tick = function () {
    if (cjs.Ticker.paused) {
      return;
    }

    // update the row/col for each enemy on the board
    this.enemyMap = game.helper.create2DArray(this.cols, this.rows);
    for (var i = 0, len = this.enemyList.length; i < len; i++) {
      var enemy = this.enemyList[i];
      var rowCol = this.screenToRowCol(enemy.x, enemy.y);

      // update both map and enemy's row/col
      this.enemyMap[rowCol.col][rowCol.row] = enemy;
      enemy.col = rowCol.col;
      enemy.row = rowCol.row;
    }

    // check enemy contacts buildings
    for (var i = this.enemyList.length - 1; i >= 0; i--) {
      var enemy = this.enemyList[i];
      var row = enemy.row;
      var col = enemy.col;

      // contact building
      var target = undefined;
      if (this.buildingMap[col][row] !== undefined) {
        // current tile
        target = this.buildingMap[col][row];
      } else if (this.buildingMap[col][row + 1] !== undefined) {
        // next tile
        target = this.buildingMap[col][row + 1];
      }
      // has target
      if (target !== undefined) {
        enemy.speed -= enemy.deceleration;
        enemy.startAttack(target);
      } else {
        enemy.stopAttack();
      }
    }

    // check for bullet collision
    // loop from to[ becuase we remove item inside loop
    for (var i = this.enemyList.length - 1; i >= 0; i--) {
      // loop all bullets
      for (var j = this.bulletList.length - 1; j >= 0; j--) {
        var bullet = this.bulletList[j];
        var pos = bullet.localToLocal(0, 0, this);
        var rowCol = this.screenToRowCol(pos.x, pos.y);
        if (this.enemyMap[rowCol.col][rowCol.row] !== undefined) {
          var enemy = this.enemyMap[rowCol.col][rowCol.row];

          // damage enemy
          enemy.damage(bullet.damageDeal);
          if (enemy.hp < -0) {
            this.enemyMap[enemy.col][enemy.row] = undefined;
            game.helper.removeItem(this.enemyList, enemy);
            enemy.parent.removeChild(enemy);
          }

          // remove bullet
          game.helper.removeItem(this.bulletList, bullet);
          bullet.parent.removeChild(bullet);
        }
      }
    }

    // check succeed enemies
    // succeed enemies means it goes through the bottom area.
    for (var i = 0, len = this.enemyMap.length; i < len; i++) {
      if (this.enemyMap[i][this.rows] !== undefined) {
        // found enemy at lthe last row
        var enemy = this.enemyMap[i][this.rows];
        game.lives -= 1;
        game.helper.removeItem(this.enemyList, enemy);
        enemy.parent.removeChild(enemy);
      }
    }
  };

  // Event Handlings
  Board.prototype.readyToPlaceBuilding = function (e) {
    this.upcomingBuildingType = e.buildingType;
    this.isAddingBuilding = true;
  };

  Board.prototype.onMouseMove = function (e) {
    if (!this.isAddingBuilding) {
      return;
    }

    var pos = this.globalToLocal(e.stageX, e.stageY);
    // convert to tile row and col
    var rowCol = this.screenToRowCol(pos.x, pos.y);
    var pos = this.rowColToScreen(rowCol.row, rowCol.col);

    this.selection.visible = true;

    // finally set the position
    this.selection.x = pos.x;
    this.selection.y = pos.y;
  };

  Board.prototype.onClick = function (e) {
    if (!this.isAddingBuilding) {
      return;
    }

    // coordinate conversation
    var pos = this.globalToLocal(e.stageX, e.stageY);
    var rowCol = this.screenToRowCol(pos.x, pos.y);
    var row = rowCol.row;
    var col = rowCol.col;

    // check out of bound
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return;
    }

    if (this.buildingMap[col][row] === undefined) {
      this.addBuildingAtTile(this.upcomingBuildingType, col, row);

      this.isAddingBuilding = false;
      this.selection.visible = false;
    }
  };

  game.Board = Board;
}).call(this, game, createjs, lib);

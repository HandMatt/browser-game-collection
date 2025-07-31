var game = this.game || (this.game = {});
var createjs = createjs || {};

// controlling waves
(function (game, cjs) {
  game.waves = {};
  game.waves.nextWave = 0;
  game.waves.isActive = false;

  game.waves.enemySummonOrders = [
    "EnemyDummy",
    "Enemy1",
    "Enemy2",
    "Enemy3",
    "Boss",
    "Boss2",
  ];

  game.waves.data = [
    {
      EnemyDummy: 1,
      frequency: 10,
    },
    {
      EnemyDummy: 5,
      frequency: 400,
    },
    {
      EnemyDummy: 10,
      frequency: 350,
    },
    {
      EnemyDummy: 6,
      Enemy1: 3,
      frequency: 300,
    },
    {
      EnemyDummy: 3,
      Enemy1: 3,
      frequency: 300,
    },
    {
      EnemyDummy: 6,
      Enemy1: 6,
      frequency: 250,
    },
    {
      Enemy1: 5,
      Enemy2: 3,
      Boss: 1,
      frequency: 200,
    },
    {
      Enemy1: 5,
      Enemy2: 5,
      Boss: 1,
      frequency: 150,
    },
    {
      EnemyDummy: 6,
      Enemy1: 5,
      Enemy2: 5,
      Boss: 1,
      frequency: 150,
    },
    {
      EnemyDummy: 8,
      Enemy1: 5,
      Enemy2: 5,
      Boss: 2,
      frequency: 150,
    },
    {
      EnemyDummy: 10,
      Enemy1: 8,
      Enemy2: 8,
      Boss: 1,
      frequency: 150,
    },
    {
      EnemyDummy: 6,
      Enemy1: 10,
      Enemy2: 10,
      Boss: 1,
      frequency: 140,
    },
    {
      EnemyDummy: 3,
      Enemy1: 10,
      Enemy2: 10,
      Enemy3: 1,
      Boss: 1,
      frequency: 135,
    },
    {
      EnemyDummy: 1,
      Enemy1: 10,
      Enemy2: 10,
      Enemy3: 1,
      Boss: 1,
      frequency: 135,
    },
    {
      Enemy1: 10,
      Enemy2: 10,
      Enemy3: 2,
      Boss: 2,
      frequency: 135,
    },
    {
      Enemy1: 5,
      Enemy2: 15,
      Enemy3: 2,
      Boss: 2,
      frequency: 135,
    },
    {
      Enemy1: 1,
      Enemy2: 10,
      Enemy3: 10,
      Boss: 2,
      frequency: 135,
    },
    {
      Enemy1: 5,
      Enemy2: 10,
      Enemy3: 10,
      Boss: 4,
      frequency: 130,
    },
    {
      Enemy1: 5,
      Enemy2: 10,
      Enemy3: 12,
      Boss: 4,
      Boss2: 4,
      frequency: 130,
    },
    {
      Enemy1: 3,
      Enemy2: 10,
      Enemy3: 12,
      Boss2: 4,
      frequency: 125,
    },
    {
      EnemyDummy: 1,
      Enemy1: 1,
      Enemy2: 1,
      Enemy3: 1,
      Boss: 1,
      Boss2: 30,
      frequency: 50,
    },
  ];
  game.waves.startWave = function () {
    // reset energies
    game.energies = 120;
    this.currentWave = this.data[this.nextWave];
    this.isActive = true;

    this.enemiesSummoned = 0;
  };
  game.waves.waveCleared = function () {
    this.nextWave += 1;

    if (this.nextWave >= this.data.length) {
      // bound to max waves data
      this.nextWave = this.data.length - 1;
    }
    this.startWave();
  };
  game.waves.tick = function () {
    if (!this.isActive) {
      return;
    } // wait until wave started

    // time to summon new enemy
    if (cjs.Ticker.getTicks() % this.currentWave.frequency === 0) {
      // determine next enemy type from the enemy summon order.
      var accumulateTargetCount = 0;
      for (var i = 0, len = this.enemySummonOrders.length; i < len; i++) {
        var enemyType = this.enemySummonOrders[i];
        var targetCount = this.currentWave[enemyType] || 0; // default 0 if the wave did not set that enemy type.
        accumulateTargetCount += targetCount;
        if (this.enemiesSummoned < accumulateTargetCount) {
          break;
        }
      }

      if (this.enemiesSummoned >= accumulateTargetCount) {
        this.isActive = false;
      } else {
        // summon the enemy
        game.boardLayer.addEnemy(enemyType);
        this.enemiesSummoned += 1;
      }
    }
  };
}).call(this, game, createjs);

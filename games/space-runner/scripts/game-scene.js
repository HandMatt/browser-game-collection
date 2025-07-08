// game scene module
; (function () {
    var game = this.spaceRunner || (this.spaceRunner = {});

    var gameScene = game.gameScene = Object.create(game.scene);
    gameScene.node = document.getElementById('game-scene');
    gameScene.onShow = function () { };

    gameScene.setup = function () {

        window.onkeyup = function (e) {

            if (e.keyCode === 37) { // Left
                game.player.moveToLeftLane();
            } else if (e.keyCode === 39) { // Right
                game.player.moveToRightLane();
            }

            e.preventDefault();

            return false;
        };

        this.startOver();
    };
    gameScene.startOver = function () {

        game.view.runway.reset();


        this.round = 0;

        game.isGameOver = false;
        setTimeout((this.tick).bind(this), 800);

        requestAnimationFrame((this.onFrame).bind(this));

    };
    gameScene.tick = function () {
        this.round += 1;

        game.view.runway.tick(this.round);


        if (!game.isGameOver) {
            var duration = Math.max(801 - this.round, 100);
            setTimeout((this.tick).bind(this), duration);
        }

        game.player.updateAnimationDuration(duration);
    };
    gameScene.onFrame = function () {
        game.view.runway.updateTilesPosition();
        requestAnimationFrame((this.onFrame).bind(this));
    }
}).call(this);
// anonymous function to put all variables local scope by default.
; (function () {
    var game = this.spaceRunner || (this.spaceRunner = {});

    // Main Game Flow
    game.flow = {
        startGame: function () {
            game.gameOverScene.hide();
            game.gameScene.startOver();
        },
        gameOver: function () {
            game.gameOverScene.show();
        }
    };

    // Entry Point
    var init = function () {
        console.log("Welcome to Space Runner Game.");

        game.isGameOver = true;

        game.gameScene.setup();
        game.gameOverScene.setup();

    };

    // window.onload = init; // use window.onload (or when DOM ready) if the script is not placed at the end of the HTML file.
    init();


}).call(this);

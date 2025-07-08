// Player module
; (function () {
    var game = this.spaceRunner || (this.spaceRunner = {});

    var player = game.player = {};
    player.element = document.getElementById('player');
    player.currentLane = 1;
    player.changeLane = function (lane) {
        player.currentLane = lane;

        player.element.classList.remove('lane1');
        player.element.classList.remove('lane2');
        player.element.classList.add('lane' + player.currentLane);
    };
    player.moveToLeftLane = function () {
        player.changeLane(1); // special case for 2 lanes.
    };
    player.moveToRightLane = function () {
        player.changeLane(2); // special case for 2 lanes.
    };

    player.changeLane(1);

    // view animation related
    player.updateAnimationDuration = function (duration) {
        if (duration % 50 === 0) {
            player.element.style.webkitAnimationDuration = duration + 'ms';
        }
    }

}).call(this);
; (function () {
    // HP System Module - Manages player and opponent health points
    var game = this.cardBattleGame = this.cardBattleGame || {};

    var HP = game.HP = {
        // Current HP values for both players
        playerHP: 100,
        opponentHP: 100,
        // DOM elements for displaying HP bars
        playerHPView: document.querySelector('.hp.player'),
        opponentHPView: document.querySelector('.hp.opponent'),

        // Reset both players' HP to full health and restore HP bar visuals
        reset: function () {
            this.playerHP = 100;
            this.opponentHP = 100;
            // Reset HP bar width to full (210px = 100% health)
            this.playerHPView.style.width = '210px';
            this.opponentHPView.style.width = '210px';
        },

        // Check if either player has been defeated (HP <= 0)
        isSomeoneDead: function () {
            return this.playerHP <= 0 || this.opponentHP <= 0;
        },

        // Check specifically if the player has been defeated
        isPlayerDead: function () {
            if (this.playerHP <= 0) return true;
            return false;
        },

        // Apply damage to player: attackPower - defensePower = actual damage
        // Updates both HP value and visual HP bar
        hurtPlayer: function (attackPower, defensePower) {
            var diff = attackPower - defensePower;
            if (diff > 0) {
                // Reduce HP but don't go below 0
                this.playerHP = Math.max(this.playerHP - diff, 0);
                // Update HP bar width proportionally (210px = 100% health)
                this.playerHPView.style.width = this.playerHP / 100 * 210 + 'px';
            }
        },

        // Apply damage to opponent: attackPower - defensePower = actual damage
        // Updates both HP value and visual HP bar
        hurtOpponent: function (attackPower, defensePower) {
            var diff = attackPower - defensePower;
            if (diff > 0) {
                // Reduce HP but don't go below 0
                this.opponentHP = Math.max(this.opponentHP - diff, 0);
                // Update HP bar width proportionally (210px = 100% health)
                this.opponentHPView.style.width = this.opponentHP / 100 * 210 + 'px';
            }
        }
    };
})();
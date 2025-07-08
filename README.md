# Card Battle

An action-packed card combat game with stunning CSS animations! Choose your card from three options and battle against an opponent in epic card duels. Each card has a power value - the higher the better! Compare cards to deal damage based on the power difference. Deplete your opponent's health bar to claim victory in this fast-paced, visually striking battle game.

## Quick Start

To run the game locally, use Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

Then open your browser and navigate to:

```
http://localhost:8000
```

## How to Play

1. **Select Your Card**: Choose one of three cards presented to you
2. **Power Battle**: Your card's power value battles against the opponent's randomly selected card
3. **Damage Calculation**: The difference between power values becomes damage dealt to the weaker side
4. **Health Management**: Each player starts with health points that decrease with damage
5. **Victory**: Deplete your opponent's health bar to win!

**Strategy**: Higher power values deal more damage, but luck plays a role in card selection. Watch for the dramatic battle animations as cards clash!

## Development TODO

- [x] ~~create the game scenes~~
- [x] ~~create a 3D card-flipping effect~~
- [x] ~~select a card~~
- [x] ~~add a power value to the cards~~
- [x] ~~create the opponent's card~~
- [x] ~~build the battle animation~~
- [x] ~~add health points to the game~~
- [x] ~~restart the game for the next round of battle~~
- [ ] add special items
- [ ] allow multiple players

## License

This game is a modified example from the HTML5 Game Development Hotshot book by Makzan and honors the original license terms. Free for personal and commercial use.

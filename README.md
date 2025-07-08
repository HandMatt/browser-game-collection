# Colour Quest

A strategic pattern-matching puzzle game where you layer colorful tiles to recreate complex designs. Study the target pattern, then carefully select and stack your tiles in the right order to match it perfectly. Each layer affects the final composition - think strategically to solve each quest!

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

1. **Study the Target**: Examine the pattern composition displayed in the quest area
2. **Plan Your Approach**: Analyze how multiple patterns can be overlaid to create the target design
3. **Select Patterns**: Choose patterns from your deck in the correct order
4. **Stack Strategically**: Place patterns in sequence, as each layer affects the final composition
5. **Match Perfectly**: Recreate the exact target pattern to complete the quest

**Strategy**: Think in layers! The order of pattern placement matters, as later patterns overlay and modify earlier ones. Take time to visualize how the patterns will combine before making your selections.

## Development TODO

- [x] ~~create the HTML structure~~
- [x] ~~manage the game scenes~~
- [x] ~~represent the quest pattern composition~~
- [x] ~~placing the patterns on the deck~~
- [x] ~~selecting the pattern~~
- [x] ~~comparing players and compositions of the quest~~
- [x] ~~showing different quests~~
- [x] ~~counting down the game~~
- [ ] improve global code commentary, use docblocks where applicable
- [ ] use ES2015 classes
- [ ] store game data in local storage
- [ ] collecting stars, completing a level can offer 1-3 stars
- [ ] explore ideas to extend game project
  - [ ] `Tile Maker`
  - [ ] rotate tiles
  - [ ] multiple composition frames
  - [ ] drag and drop control

## License

This game is a modified example from the HTML5 Game Development Hotshot book by Makzan and honors the original license terms. Free for personal and commercial use.

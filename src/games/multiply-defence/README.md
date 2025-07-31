# Multiply Defence

A fast-paced math game where numbered boxes fall from the top of the screen. Your goal is to eliminate them before they reach the bottom by solving multiplication problems. Use the numeric pad at the bottom to select two numbers that multiply together to match the value of the falling box. Quick thinking and math skills are your best defense!

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

1. **Watch for Falling Boxes**: Numbered boxes fall from the top of the screen
2. **Identify the Target**: Each box displays a number that you need to eliminate
3. **Solve the Multiplication**: Use the numeric pad to select two numbers that multiply to match the box's value
4. **Act Fast**: Eliminate boxes before they reach the bottom of the screen
5. **Survive**: Keep solving problems to prevent boxes from piling up!

**Strategy**: Think quickly! The faster you solve multiplication problems, the more boxes you can eliminate. Practice your times tables to become a multiplication master and defend against the falling numbers!

## Development TODO

- [x] ~~set up the canvas and EaselJS~~
- [x] ~~define the numbered box~~
- [x] ~~create game loop and falling boxes~~
- [x] ~~add Inputs and equations~~
- [x] ~~removing the boxes~~
- [x] ~~ending the game~~
- [x] ~~restarting the game~~
- [x] ~~replacing the rectangle shape with bitmap graphics~~
- [ ] gradually increase the boxes' falling speed
  - [ ] 0.3 - 1.0 over 5mins
- [ ] add new game mode
- [ ] add custom game mode

## License

This game is a modified example from the HTML5 Game Development Hotshot book by Makzan and honors the original license terms. Free for personal and commercial use.

# Hoop Shooter

A physics-based basketball shooting game with realistic ball physics! Aim and shoot balls through hoops while navigating around obstacles. Use your mouse to aim and control shot power - hold down to charge your shot and release to fire. Each successful basket earns you points, and you'll face increasingly challenging levels with moving obstacles and different ball types.

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

1. **Select Your Level**: Choose from multiple levels with different difficulty and obstacle configurations
2. **Aim Your Shot**: Click and drag from the ball position to set your aim direction
3. **Control Power**: Hold down the mouse button to charge your shot - the longer you hold, the more power
4. **Release to Shoot**: Let go of the mouse button to fire the ball with your chosen power and direction
5. **Score Points**: Successfully shoot the ball through the hoop to earn points
6. **Navigate Obstacles**: Avoid or use obstacles like spinning crosses and static blocks to your advantage

**Strategy**: Master the physics! Different ball types have unique properties - slow balls are easier to control but bouncy balls can reach tricky angles. Use obstacles strategically to redirect your shots, and remember that longer charge times mean more power but require more precise aiming.

## Game Mechanics

- **Physics-Based Shooting**: Realistic ball physics with gravity, friction, and bounce effects
- **Power Control**: Shot power is determined by how long you hold the mouse button
- **Multiple Ball Types**: Different balls with varying density, friction, and bounce properties
- **Dynamic Obstacles**: Spinning crosses and static blocks that affect ball trajectory
- **Level Progression**: Increasingly complex levels with different obstacle configurations
- **Scoring System**: Points awarded for each successful basket through the hoop
- **Real-time Physics**: Box2D physics engine provides realistic collision detection and movement

## Development TODO

- [x] ~~create simulated physics world~~
- [x] ~~shooting a ball~~
- [x] ~~handling collision detection~~
- [x] ~~defining levels~~
- [x] ~~launch bar with power indicator~~
- [x] ~~adding a cross obstacle~~
- [x] ~~visualising graphics~~
- [x] ~~choosing a level~~
- [ ] level complete condition
- [ ] back to level select
- [ ] advanced scoring calculation
- [ ] special items
- [ ] more obstacles and levels
- [ ] level awards and rewards

## License

This game is a modified example from the HTML5 Game Development Hotshot book by Makzan and honors the original license terms. Free for personal and commercial use.

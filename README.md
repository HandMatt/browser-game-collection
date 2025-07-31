# Browser Game Collection <!-- omit from toc -->

A collection of browser-based games built with **Phaser**, **React**, TypeScript, and Vite, featuring a stylish arcade cabinet UI inspired by retro MAME machines and PS1 demo disks.

## Table of Contents <!-- omit from toc -->

- [🎮 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [🎯 Available Games](#-available-games)
  - [Game List](#game-list)
- [🤝 Contributing](#-contributing)
  - [Development Setup](#development-setup)
  - [Pre-commit Hook Setup](#pre-commit-hook-setup)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Code Style](#code-style)
- [🎮 Game Development with Phaser](#-game-development-with-phaser)
  - [Game Structure](#game-structure)
  - [Adding New Games](#adding-new-games)
- [📁 Project Structure](#-project-structure)
- [📋 Roadmap](#-roadmap)
  - [Completed ✅](#completed-)
  - [In Progress 🚧](#in-progress-)
  - [Planned 📅](#planned-)
- [📄 License](#-license)
- [🙇 Acknowledgments](#-acknowledgments)
- [⚡ Quick Start for Contributors](#-quick-start-for-contributors)

## 🎮 Features

- **Arcade Cabinet Interface**: Immersive retro-style UI reminiscent of an actual arcade
- **8 Unique Games**: Diverse collection of browser games built with Phaser 3 for smooth performance
- **Modern Tech Stack**: Built with React, TypeScript, and Phaser for optimal gaming experience
- **Responsive Design**: Games work across different screen sizes
- **Easy Navigation**: Intuitive game selection through the arcade cabinet interface
- **Professional Game Engine**: All games powered by Phaser 3 for consistent performance and features

## 🛠️ Technology Stack

- **Game Engine**: Phaser 3 - Professional HTML5 game framework
- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with custom arcade cabinet design
- **Code Quality**: Prettier for code formatting
- **Development**: ESLint for code linting

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/browser-game-collection.git
   cd browser-game-collection
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Available Games

The games are accessible through the arcade cabinet interface at the main URL. Each game is embedded within the arcade cabinet UI for an authentic and nostalgic gaming experience.

### Game List

- **Card Battle** - Strategic card-based combat
- **Colour Quest** - Composition-matching puzzle game
- **Hoop Shoot** - Basketball shooting challenge
- **Isometric City** - City-building idle game
- **Multiply Defence** - Math-based defense game
- **Space Defenders** - Space shooter tower defence
- **Space Runner** - Endless runner in space
- **Sushi Shop** - Restaurant management game

_All games are built with Phaser 3 and optimized for browser play._

## 🤝 Contributing

We welcome contributions! Whether you want to add new games, improve the arcade cabinet UI, fix bugs, or provide assets here's how to get started.

### Development Setup

1. **Fork and clone the repository**
2. **Install dependencies:** `npm install`
3. **Set up pre-commit hooks** (see below)
4. **Create a feature branch** following our naming convention
5. **Make your changes** and test thoroughly
6. **Submit a pull request** with a clear description

### Pre-commit Hook Setup

The project includes automatic code formatting with Prettier. Set up the pre-commit hook:

```bash
# Create the pre-commit hook file
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0

# Prettify all selected files
echo "$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --write

# Add back the modified/prettified files to staging
echo "$FILES" | xargs git add

exit 0
EOF

# Make it executable
chmod +x .git/hooks/pre-commit
```

### Branch Naming Convention

- **New games:** `feature/add-[game-name]`
- **UI improvements:** `feature/improve-[component-name]`
- **Bug fixes:** `fix/[issue-description]`
- **Game features:** `feature/[game-name]/[feature-description]`

### Code Style

- Use TypeScript for all new code
- Follow the existing component structure
- **For new games**: Use Phaser 3 with TypeScript
- **For game development**: Follow Phaser 3 best practices
- Ensure games are responsive and accessible
- Test on different browsers and screen sizes
- **Game assets**: Use appropriate formats (PNG for sprites, MP3/OGG for audio)

## 🎮 Game Development with Phaser

This project uses **Phaser 3** as the primary game engine. Each game is built as a React component that wraps a Phaser game instance.

### Game Structure

Each game follows this structure:

- `scenes/` - Phaser scenes (MainMenu, GamePlay, GameOver, etc.)
- `sprites/` - Game sprites and visual assets
- `audio/` - Sound effects and music
- `config/` - Game configuration and constants
- `index.tsx` - React wrapper component

### Adding New Games

1. Create a new directory in `src/games/[game-name]/`
2. Set up Phaser scenes following the existing pattern
3. Create a React wrapper component
4. Add the game to the arcade cabinet navigation
5. Test thoroughly across different devices

## 📁 Project Structure

```text
browser-game-collection/
├── src/
│ ├── components/
│ │ └── ArcadeCabinet/     # Main arcade cabinet UI
│ ├── games/               # Individual Phaser game components
│ │ ├── card-battle/
│ │ │   ├── scenes/        # Phaser scenes for the game
│ │ │   ├── sprites/       # Game sprites and assets
│ │ │   └── index.tsx      # React wrapper for Phaser game
│ │ ├── colour-quest/
│ │ └── ... (other games)
│ ├── styles/              # Global styles
│ ├── App.tsx              # Main app component
│ └── index.tsx            # Entry point
├── public/                # Static assets
├── vendors/               # Third-party game resources
└── package.json
```

## 📋 Roadmap

### Completed ✅

- [x] ~~Migrate to React with TypeScript~~
- [x] ~~Implement basic arcade cabinet UI~~
- [x] ~~Complete 8 games (HTML/CSS/JS versions)~~
- [x] ~~Set up development environment with Vite~~
- [x] ~~Add code formatting with Prettier~~
- [x] ~~Configure ESLint for code quality~~

### In Progress 🚧

- [ ] Visual improvements to arcade cabinet UI
- [ ] **Phaser 3 Migration**: Converting games from vanilla JS to Phaser 3

### Planned 📅

- [ ] **Complete Phaser 3 Migration** for all 8 games
- [ ] **Enhanced Game Features** with Phaser's advanced capabilities:
  - [ ] Physics engines for realistic gameplay
  - [ ] Particle systems for visual effects
  - [ ] Sound management and audio effects
  - [ ] Animation systems for smooth gameplay
- [ ] Mobile responsiveness improvements
- [ ] Game performance optimizations
- [ ] Customize each game to be distinct from original vision
- [ ] Add game templates for easier Phaser development
- [ ] Implement game save/load functionality
- [ ] Create game difficulty settings
- [ ] Add multiplayer support for select games
- [ ] Implement game achievements system
- [ ] Add game statistics and leaderboards
- [ ] Create PWA capabilities for offline play

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙇 Acknowledgments

- Inspired by classic arcade machines and PS1 demo disks
- Built with modern web technologies for the best gaming experience
- Thanks to all contributors who help make this collection better!

## ⚡ Quick Start for Contributors

1. **Fork the repo**
2. **Clone your fork:** `git clone https://github.com/YOUR_USERNAME/browser-game-collection.git`
3. **Install deps:** `npm install`
4. **Set up hooks:** Follow the pre-commit setup above
5. **Start developing:** `npm run dev`
6. **Create branch:** `git checkout -b feature/your-feature`
7. **Make changes and commit**
8. **Push and create PR**

Need help? Open an issue or join our discussions!

---

> **📝 Note:** This project is a work-in-progress and the README represents the intended vision. The current implementation may differ from what's described here. The roadmap will be updated with each iteration.

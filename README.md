# Browser Game Collection

A collection of browser-based games built with HTML, CSS, and JavaScript.

## Setup

To get started with this project:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Pre-commit hook setup:**
   The project includes a pre-commit hook that automatically runs Prettier to format your code before each commit. Since `.git` folder contents aren't committed to the repository, you'll need to set up the hook manually:

   Create a file at `.git/hooks/pre-commit` with the following content:

   ```bash
   #!/bin/sh
   FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
   [ -z "$FILES" ] && exit 0

   # Prettify all selected files
   echo "$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --write

   # Add back the modified/prettified files to staging
   echo "$FILES" | xargs git add

   exit 0
   ```

   Then make the hook executable:

   ```bash
   chmod +x .git/hooks/pre-commit
   ```

   The hook will then run automatically when you make commits, ensuring consistent code formatting across the project.

## Running the Games

To play the games, you'll need to serve the project using a local web server. Here are a few options:

### Option 1: Using Python (if installed)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 2: Using Node.js

```bash
# Install a simple HTTP server globally
npm install -g http-server

# Serve the project
http-server -p 8000
```

### Option 3: Using Live Server (VS Code extension)

If you're using VS Code, install the "Live Server" extension and right-click on any HTML file to "Open with Live Server".

### Accessing the Games

Once you have a server running, you can access the games at:

- **Sushi Shop**: `http://localhost:8000/games/sushi-shop/`
- **Hoop Shoot**: `http://localhost:8000/games/hoop-shoot/`
- **Space Defenders**: `http://localhost:8000/games/space-defenders/`
- **Isometric City**: `http://localhost:8000/games/isometric-city/`
- **Space Runner**: `http://localhost:8000/games/space-runner/`
- **Multiply Defence**: `http://localhost:8000/games/multiply-defence/`
- **Colour Quest**: `http://localhost:8000/games/colour-quest/`
- **Card Battle**: `http://localhost:8000/games/card-battle/`

Each game is self-contained with its own HTML, CSS, and JavaScript files.

## TODO

- [x] ~~add .gitignore and remove .vscode from remote~~
- [x] ~~add instructions for installing dependencies and ensuring git hooks run~~
- [x] ~~complete 8 projects~~
- [ ] ensure vendor resources are shared across the project
- [ ] make use of templaces for common files .html and .css
- [x] ~~look into modern webgames, what libraries are being used?~~
  - [x] Phaser.js - seems to be the defacto for modern web based HTML games
  - [ ] ~~PixiJS~~
  - [ ] ~~Babylon.js~~
  - [ ] ~~Three.js~~
  - [ ] ~~PlayCanvas~~
  - [ ] ~~melonJS~~
  - [ ] ~~[JavaScript Game Engines](https://github.com/collections/javascript-game-engines)~~
- [ ] upgrade the code base to more modern tooling (phaser)
- [ ] design a creative landing page for the games to be accessed
- [ ] customise each game so that it is distinct from the original vision
- [ ] distributing the games
- [ ] make the game collection mobile friendly

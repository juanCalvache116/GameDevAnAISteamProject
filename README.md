# 🌊 Drowned Heart ⚓

> *A Cursed Tale of Love and Betrayal*

A grid-based puzzle adventure game built with Three.js and Electron. Explore a cursed pirate island, solve mysteries using a magical amulet that can absorb the essence of objects, and uncover the secrets of a lost love.

![Drowned Heart Screenshot](assets/img/logo.png)

## 🎮 Game Features

- **Grid-Based Movement**: Navigate a tile-based world with smooth character animations
- **Essence System**: Absorb properties from objects and transfer them to a magical box
- **Beautiful 3D Graphics**: Built with Three.js for stunning visuals
- **Atmospheric Audio**: Immersive underwater-themed soundtrack
- **Challenging Puzzles**: Use the amulet's power to solve environmental puzzles

## 🏴‍☠️ Story

You are a stowaway who has infiltrated a pirate ship heading to the dreaded Skeleton Island. Armed with a cursed amulet that can take on the properties of other objects, you must explore the island's secrets and break a terrible curse that has trapped your true love.

## 🛠️ Development

### Prerequisites

- Node.js 16+ 
- npm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/drowned-heart.git
cd drowned-heart

# Install dependencies
npm install
```

### Running the Game

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start

# Quick test (Windows)
# Double-click quick-test.bat or run:
quick-test.bat
```

### Performance Optimizations

The game includes several optimizations for smooth performance:

- **Lazy Shader Initialization** - WebGL shaders load only when needed
- **Optimized Transitions** - Smooth splash-to-menu transition with `requestAnimationFrame`
- **Asset Path Management** - Proper Electron file path handling
- **Performance Monitoring** - Built-in timing logs for debugging

### Building for Distribution

```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build-win    # Windows
npm run build-mac    # macOS
npm run build-linux  # Linux

# Create distributable packages
npm run dist
```

## 🎯 Controls

### Game Controls
- **WASD** or **Arrow Keys** - Move character
- **E** - Absorb/Transfer essence from/to objects
- **F** - Interact with world objects
- **ESC** - Return to main menu (in-game) or exit (in menu)
- **ENTER** - Advance through splash screen / start game

### Window Controls  
- **F1** - Toggle menu bar visibility (for cleaner, fullscreen-like experience)
- **F11** - Toggle fullscreen (system default)

## 🧩 Gameplay Mechanics

### Essence System
The core mechanic revolves around your cursed amulet:

1. **Absorb Essence**: Stand next to an object and press E to absorb its properties
2. **Transfer to Box**: Move the magical box around the world and transfer essence to it
3. **Solve Puzzles**: Use the box's new properties to overcome obstacles

### Essence Types
- **🔥 Fire** - Illuminate dark areas and burn obstacles
- **💨 Wind** - Push objects and extinguish flames
- **💣 Cannon** - Destroy fragile walls and barriers
- **🛡️ Steel** - Protect against damage and hazards

## 🏗️ Technical Details

### Built With
- **Electron** - Desktop application framework
- **Three.js** - 3D graphics and rendering
- **WebGL** - Hardware-accelerated graphics
- **HTML5 Canvas** - 2D minimap rendering
- **Web Audio API** - Sound and music playback

### Project Structure
```
drowned-heart/
├── src/
│   ├── index.html          # Main game file
│   └── preload.js          # Electron preload script
├── assets/
│   ├── img/
│   │   └── logo.png        # Game logo
│   ├── ost/
│   │   └── menu.mp3        # Background music
│   └── sfx/               # Sound effects
├── build/                 # Build assets (icons, etc.)
├── main.js               # Electron main process
└── package.json          # Project configuration
```

## 🔐 Security

This application follows Electron security best practices:
- Context isolation enabled
- Node integration disabled in renderer
- Preload scripts for secure IPC
- Content Security Policy enforced
- External navigation blocked

## 🎨 Art & Design

The game features a nautical theme with underwater caustics effects, animated logos, and a rich color palette inspired by deep ocean environments and pirate aesthetics.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Three.js community for excellent 3D graphics library
- Electron team for making desktop app development accessible
- All playtesters and contributors

---

*Set sail on a cursed voyage and discover the secrets of Drowned Heart...*

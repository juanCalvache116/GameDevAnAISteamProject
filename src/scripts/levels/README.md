# Level Configuration Format

This directory contains level configuration files for **Drowned Heart**. The game uses a human-friendly JSON format that's easy to read, edit, and extend.

## File Structure

Each level is defined as a `.json` file with the following main sections:

### 📋 Meta Information
```json
{
  "meta": {
    "name": "Level Name",
    "description": "A description of the level",
    "author": "Creator Name",
    "version": "1.0",
    "difficulty": "beginner|intermediate|advanced|expert"
  }
}
```

### 🌍 World Configuration
```json
{
  "world": {
    "spawn": { "x": 0, "z": 0 },
    "camera_start": { "x": 0, "z": 8 },
    "bounds": {
      "min": { "x": -25, "z": -25 },
      "max": { "x": 25, "z": 25 }
    }
  }
}
```

### 🌲 Terrain Objects

#### Trees
```json
{
  "terrain": {
    "trees": [
      { 
        "pos": [-4, -4], 
        "variant": "oak|palm|pine|dead_tree|ancient_tree", 
        "size": "small|medium|large|tall|huge" 
      }
    ]
  }
}
```

**Tree Variants:**
- `oak` - Standard brown trunk, green leaves
- `palm` - Light brown trunk, bright green leaves  
- `pine` - Dark brown trunk, dark green leaves
- `dead_tree` - Gray trunk, no leaves
- `ancient_tree` - Dark gray trunk, dark green leaves

#### Rocks
```json
{
  "rocks": [
    { 
      "pos": [-3, -3], 
      "type": "boulder|rock_pile|rock_formation", 
      "size": "small|medium|large|huge",
      "material": "granite|limestone|sandstone|volcanic|ancient_stone"
    }
  ]
}
```

**Rock Types:**
- `boulder` - Spherical rocks (dodecahedron geometry)
- `rock_pile` - Stacked rocks (box geometry)
- `rock_formation` - Tall rocky spires (cone geometry)

#### Water Areas
```json
{
  "water": {
    "areas": [
      {
        "name": "mysterious_pond",
        "type": "pond|lake|river|spring",
        "description": "A description of this water feature",
        "properties": {
          "depth": "shallow|deep",
          "clarity": "crystal_clear|clear|murky",
          "temperature": "freezing|cold|warm|hot"
        },
        "tiles": [
          [-8, -8], [-7, -8], [-6, -8]
        ]
      }
    ]
  }
}
```

### 🎁 Interactive Items

#### Containers (Pushable Boxes)
```json
{
  "items": {
    "containers": [
      {
        "type": "essence_box",
        "pos": [2, 2],
        "properties": {
          "pushable": true,
          "essence": null,
          "material": "wood|cursed_wood|metal|stone",
          "durability": 100,
          "locked": false
        },
        "description": "A mysterious box description"
      }
    ]
  }
}
```

#### Light Sources (Torches, etc.)
```json
{
  "light_sources": [
    {
      "type": "torch",
      "pos": [-5, 3],
      "properties": {
        "essence": "fire|wind|water|earth",
        "lit": true,
        "fuel": 100,
        "brightness": 0.8,
        "flicker": true,
        "color": "#ff4500"
      },
      "description": "An ancient torch description"
    }
  ]
}
```

### 🎯 Zones and Events

#### Zones
```json
{
  "zones": [
    {
      "name": "safe_area",
      "type": "safe_zone|danger_zone|water_zone|puzzle_zone",
      "bounds": {
        "center": [0, 0],
        "radius": 5
      },
      "properties": {
        "no_enemies": true,
        "tutorial_hints": true
      }
    }
  ]
}
```

#### Events
```json
{
  "events": [
    {
      "name": "tutorial_trigger",
      "trigger": "player_near_object|game_start|essence_collected",
      "condition": {
        "player_essence": null,
        "distance_to": [-5, 3],
        "max_distance": 3
      },
      "action": {
        "type": "show_hint|show_message|play_sound",
        "message": "Press E to interact!"
      }
    }
  ]
}
```

### 🔊 Audio Configuration
```json
{
  "audio": {
    "ambient": [
      {
        "name": "ocean_waves",
        "file": "beach_ambience.mp3",
        "volume": 0.3,
        "loop": true,
        "fade_distance": 15
      }
    ],
    "music": {
      "exploration": "mysterious_island.mp3",
      "volume": 0.2
    }
  }
}
```

## 🚀 Creating New Levels

1. **Copy an existing level** like `tutorial.json` as a starting template
2. **Update the meta information** with your level details
3. **Set spawn point and world bounds** appropriate for your level size
4. **Place terrain objects** (trees, rocks, water) to create the environment
5. **Add interactive items** (boxes, torches) for gameplay mechanics
6. **Define zones** for special areas or triggers
7. **Set up events** for tutorials, story moments, or gameplay triggers
8. **Configure audio** for atmosphere and music

## 🎨 Tips for Level Design

- **Start small**: Begin with a simple layout and gradually add complexity
- **Visual variety**: Mix different tree variants, rock types, and materials
- **Logical placement**: Put objects where they make thematic sense
- **Playtest frequently**: Load your level and test the player experience
- **Use zones**: Define areas for different gameplay experiences
- **Add descriptions**: Rich descriptions enhance the game's atmosphere
- **Balance difficulty**: Consider the puzzle complexity and player skill level

## 📁 File Examples

- `level_0.json` - The main starting beach level with full complexity
- `tutorial.json` - A simple tutorial level demonstrating basic concepts
- `README.md` - This documentation file

## 🔧 Technical Notes

- **Coordinates**: Use `[x, z]` format for positions (Y is vertical, handled automatically)
- **Grid system**: The game uses a tile-based grid where each unit = 1 tile
- **Performance**: Larger levels (>50x50 tiles) may impact performance
- **Validation**: The game will log errors if required properties are missing
- **Extensibility**: New object types can be easily added by extending the JSON structure

---

*Happy level building! 🏝️*

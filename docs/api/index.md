# API Reference

This section provides documentation for the ScheduleLua API functions and modules. 

<div class="custom-block warning">
  <p><strong>Beta Development Notice:</strong> ScheduleLua is currently in beta development. APIs may change, and some features described here are not yet fully implemented.</p>
</div>

## Implementation Status

The ScheduleLua API is being actively developed. Here's the current implementation status of major API categories:

| API Category | Status |
|--------------|--------|
| Core API | ✅ Stable |
| Player API | 🔄 Partial |
| World API | 🔄 Partial |
| NPC API | 🔄 Partial |
| Helper Functions | 🔄 Partial |
| Windows API | 🔄 Partial |
| UI API | 🔄 Partial |
| Registry API | 🔄 Partial |
| Economy API | 🔄 Partial |
| Law API | 🔄 Partial |

See the [Development Status](/guide/development-status) page for more detailed information.

## API Categories

### [Core API](./core/logging.md) - ✅ Stable
Core functionality including logging, commands, timing, general game object manipulation, and [global variables](./core/globals.md).

### [Player API](./player/) - 🔄 Partial
Functions for interacting with the player character, including movement, inventory, stats, and state.

### [NPC API](./npc/) - 🔄 Partial
Tools for finding, managing, and interacting with NPCs in the game world.

### [World API](./world/) - 🔄 Partial
Functions for interacting with the game world, including time, map regions, and explosions.

### [Helper Functions](./helper/) - 🔄 Partial
Utility functions such as Vector3 operations to simplify common tasks.

### [Windows API](./windows/) - 🔄 Partial
Functions for Windows-specific features like key detection and input handling.

### [UI API](./ui/) - 🔄 Experimental
Create notifications and basic UI elements. Advanced features are still in development.

### Registry API - 🔄 Experimental
Store and retrieve data persistent across script executions and game sessions.

### [Economy API](./economy/) - 🔄 Partial
Interact with the game's economy system, including player money and transactions.

### [Law API](./law/) - 🔄 Partial
Interact with the game's law system, including curfew management.

## Function Naming Conventions

ScheduleLua follows consistent naming conventions to make the API intuitive:

- `Get*` - Functions that retrieve data (e.g., `GetPlayerPosition`, `GetGameTime`)
- `Set*` - Functions that modify data (e.g., `SetPlayerHealth`, `SetNPCPosition`)
- `Find*` - Functions that search for specific entities (e.g., `FindNPC`, `FindGameObject`)
- `Is*` - Functions that return boolean values (e.g., `IsNightTime`, `IsNPCInRegion`)
- `Register*` - Functions that register callbacks or commands (e.g., `RegisterCommand`)
- `Unregister*` - Functions that remove registered callbacks or commands (e.g., `UnregisterCommand`)
- `On*` - Callback functions triggered by specific events (e.g., `OnPlayerReady`, `OnDayChanged`)

## Function Documentation Format

Each function in the API is documented with the following information:

- **Signature**: The function's parameter types and return value
- **Implementation Status**: Current development status (stable, experimental, planned)
- **Description**: What the function does
- **Parameters**: Details about each parameter
- **Returns**: Description of what the function returns
- **Examples**: Code examples showing how to use the function
- **Notes**: Additional information, limitations, and best practices

## Script Lifecycle Hooks

Your Lua scripts can implement several lifecycle hooks that are called at specific points during execution:

| Hook | Status | Description |
|------|--------|-------------|
| `Initialize()` | ✅ Stable | Called when the script is first loaded |
| `Update()` | ✅ Stable | Called every frame |
| `OnConsoleReady()` | ✅ Stable | Called when the console is loaded and ready |
| `OnPlayerReady()` | ✅ Stable | Called when the player is loaded and ready |
| `OnSceneLoaded(sceneName)` | ✅ Stable | Called when a new scene is loaded |
| `OnDayChanged(day)` | 🔄 Partial | Called when the game day changes |
| `OnTimeChanged(time)` | 🔄 Partial | Called when the game time changes |
| `OnPlayerHealthChanged(newHealth)` | 🔄 Partial | Called when player health changes |
| `OnPlayerEnergyChanged(newEnergy)` | 🔄 Partial | Called when player energy changes |
| `Shutdown()` | ✅ Stable | Called when the script is unloaded |

## Contributing to the API

ScheduleLua is an open-source project in active development. If you'd like to contribute:

- Check the [GitHub repository](https://github.com/ScheduleLua/ScheduleLua-Framework) for current issues and tasks
- Join the [ScheduleLua Discord](https://discord.gg/Ab8snpEFDn) to discuss development
- Report bugs or suggest improvements through [GitHub Issues](https://github.com/ScheduleLua/ScheduleLua-Framework/issues)

For detailed information about each function and module, explore the sidebar navigation. 
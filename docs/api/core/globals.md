# Global Variables

The ScheduleLua API provides several global variables that can be accessed from any Lua script. These variables provide useful information about the game, mod, and runtime environment.

## SCHEDULELUA_VERSION

**Type:** `string`

**Description:** Contains the current version of the ScheduleLua mod.

### Example

```lua
function Initialize()
    Log("Running with ScheduleLua version: " .. SCHEDULELUA_VERSION)
    return true
end
```

### Notes

- Useful for version checking in scripts that might depend on specific ScheduleLua features
- Can be used to provide conditional behavior based on the mod version
- Format follows semantic versioning (e.g., "0.1.0", "0.1.1")

## GAME_VERSION

**Type:** `string`

**Description:** Contains the current version of the game.

### Example

```lua
function Initialize()
    Log("Running with game version: " .. GAME_VERSION)
    return true
end
```

### Notes

- Useful for checking compatibility with specific game versions
- Can be used to provide conditional behavior based on game version
- Format follows the game's versioning scheme (e.g., "1.0.0", "1.2.3")

## SCRIPT_PATH

**Type:** `string`

**Description:** Contains the file path to the currently executing script.

### Example

```lua
function Initialize()
    Log("This script is located at: " .. SCRIPT_PATH)
    return true
end
```

### Notes

- Useful for loading additional files relative to the current script
- Provides the full path including filename and extension
- Can be used for debugging and logging purposes

## SCRIPT_NAME

**Type:** `string`

**Description:** Contains the filename of the currently executing script without the path.

### Example

```lua
function Initialize()
    Log("Currently running script: " .. SCRIPT_NAME)
    return true
end
```

### Notes

- Useful for identifying which script is currently running
- Contains only the filename with extension (e.g., "myscript.lua")
- Helpful for logging and debugging messages

## Best Practices

- Use version checking at the beginning of your scripts to ensure compatibility
- Include version information in error logs to help with troubleshooting
- When reporting issues, include the ScheduleLua version from this variable

## Related Components

- [Logging API](./logging.md) - Use with logging functions to include version information in debug messages 
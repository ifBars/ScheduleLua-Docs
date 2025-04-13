# Registry API

The Registry API provides functions for storing and retrieving persistent data across script executions and game sessions. It serves as a simple database system for your Lua scripts.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Planned for future implementation. Basic design completed, implementation not started.</p>
</div>

## Overview

The Registry API allows your scripts to:

1. Store data that persists between game sessions
2. Share data between different scripts
3. Save user preferences and configuration
4. Create and manage savepoints for game state
5. Build complex data-driven systems

## Available Functions

### Data Storage

- [`SetValue(key, value)`](./storage.md#setvalue) - Stores a value with the specified key
- [`GetValue(key, defaultValue)`](./storage.md#getvalue) - Retrieves a value by key
- [`DeleteValue(key)`](./storage.md#deletevalue) - Removes a value from the registry
- [`HasValue(key)`](./storage.md#hasvalue) - Checks if a key exists in the registry
- [`ClearValues()`](./storage.md#clearvalues) - Clears all stored values

### Data Management

- [`SaveData(namespace)`](./management.md#savedata) - Saves registry data to disk for the specified namespace
- [`LoadData(namespace)`](./management.md#loaddata) - Loads registry data from disk for the specified namespace
- [`ExportData(namespace, filepath)`](./management.md#exportdata) - Exports registry data to a file
- [`ImportData(namespace, filepath)`](./management.md#importdata) - Imports registry data from a file

### Configuration Helpers

- [`SaveConfiguration(configName, configTable)`](./config.md#saveconfiguration) - Saves a configuration object to the registry
- [`LoadConfiguration(configName)`](./config.md#loadconfiguration) - Loads a configuration object from the registry
- [`CreatePreset(presetName, presetTable)`](./config.md#createpreset) - Creates a named preset configuration
- [`ApplyPreset(presetName)`](./config.md#applypreset) - Applies a named preset configuration

## Registry Namespaces

Registry data is organized into namespaces to prevent conflicts between different scripts. Each script can have its own namespace, or multiple scripts can share a namespace for data sharing.

```lua
-- Example of using different namespaces
-- For script-specific data
SetValue("playerLastPosition", {x=100, y=0, z=200}, "myScript")

-- For shared data between scripts
SetValue("worldState", "peaceful", "sharedData")
```

If no namespace is specified, the current script's name is used as the default namespace.

## Data Types

The Registry API supports the following Lua data types:

- String values
- Number values (integers and floats)
- Boolean values
- Tables (including nested tables)
- nil values (to clear entries)

Complex data types like functions, coroutines, or userdata are not directly supported and must be serialized/deserialized by your script.

## Example Usage

```lua
function Initialize()
    -- Load saved player preferences
    local musicVolume = GetValue("musicVolume", 0.8) -- Default to 0.8 if not set
    local sfxVolume = GetValue("sfxVolume", 1.0)
    local difficulty = GetValue("difficulty", "normal")
    
    Log("Loaded player preferences:")
    Log("- Music Volume: " .. musicVolume)
    Log("- SFX Volume: " .. sfxVolume)
    Log("- Difficulty: " .. difficulty)
    
    -- Track number of script runs
    local runCount = GetValue("runCount", 0)
    runCount = runCount + 1
    SetValue("runCount", runCount)
    Log("This script has been run " .. runCount .. " times")
    
    -- Save data at regular intervals
    RegisterCommandOnce("schedule", function()
        Wait(60, function()
            SaveData()
            Log("Registry data saved")
            
            -- Schedule next save
            RunCommand("schedule")
        end)
    end)
    RunCommand("schedule")
end

function OnPlayerReady()
    -- Check if this is the player's first time
    local isFirstRun = GetValue("firstRunCompleted", false) == false
    
    if isFirstRun then
        ShowNotification("Welcome to the game! Enjoy your adventure!")
        SetValue("firstRunCompleted", true)
    else
        -- Load the player's last position if available
        local lastPos = GetValue("lastPlayerPosition")
        if lastPos then
            Log("Last player position found: " .. 
                "X=" .. lastPos.x .. ", Y=" .. lastPos.y .. ", Z=" .. lastPos.z)
        end
    end
end

function Shutdown()
    -- Save player's position for next time
    local pos = GetPlayerPosition()
    SetValue("lastPlayerPosition", {x=pos.x, y=pos.y, z=pos.z})
    
    -- Save all data to disk
    SaveData()
    Log("Registry data saved on shutdown")
end
```

## Best Practices

1. **Use descriptive keys**: Choose clear, descriptive names for your registry keys
2. **Set default values**: Always provide defaults when getting values
3. **Save regularly**: Call `SaveData()` at appropriate times (not too frequently)
4. **Use namespaces**: Use namespaces to organize data, especially in larger projects
5. **Handle errors**: Check for errors when loading or saving data
6. **Clean up**: Remove temporary or unused values to keep the registry clean
7. **Document**: Keep track of what keys your script uses
8. **Version your data**: Consider storing a version number with your data structure

## Implementation Notes

- Registry data is stored in JSON format
- Data is automatically saved during normal game exit
- There are reasonable size limits for registry entries
- Complex nested tables may have performance implications
- Registry access is optimized for reading over writing 
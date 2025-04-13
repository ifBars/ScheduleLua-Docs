# Script Lifecycle Hooks

ScheduleLua provides several lifecycle hooks that allow your script to respond to various game events. This guide explains each hook, when it's called, and how to use it effectively.

## Overview

Lifecycle hooks are functions with specific names that ScheduleLua calls at particular points during script and game execution. By implementing these functions in your script, you can respond to events like script initialization, game updates, player state changes, and more.

## Available Hooks

### Initialize

```lua
function Initialize()
    -- Initialization code here
    return true -- Must return true for the script to continue
end
```

The `Initialize` function is called when your script is first loaded. It should perform any one-time setup tasks and return `true` if initialization was successful. If it returns `false` or throws an error, the script will not be loaded.

**Best Practice:** Use this function for:
- Setting up initial variables
- Registering event listeners
- Initializing script state
- Performing compatibility checks

### Update

```lua
function Update()
    -- Code to run every frame
end
```

The `Update` function is called every frame while the game is running. This is where you can implement continuous monitoring and real-time reactions.

**Best Practice:** Because `Update` runs frequently, you should:
- Avoid expensive operations
- Use flags or timers to limit how often certain code runs
- Focus on critical real-time functionality
- Consider using coroutines for delayed operations

### OnConsoleReady

```lua
function OnConsoleReady()
    -- Code to run when console is ready
    RegisterCommand("mycommand", "Description", "usage", function(args)
        -- Command implementation
    end)
end
```

The `OnConsoleReady` function is called when the game console is fully loaded and ready to accept commands. This is the ideal place to register custom console commands.

### OnPlayerReady

```lua
function OnPlayerReady()
    -- Code to run when player is loaded
    local playerPos = GetPlayerPosition()
    Log("Player ready at position: " .. playerPos.x .. ", " .. playerPos.y .. ", " .. playerPos.z)
end
```

The `OnPlayerReady` function is called when the player character is fully loaded and ready. This is when you can safely access player data, inventory, position, etc.

### OnSceneLoaded

```lua
function OnSceneLoaded(sceneName)
    Log("Scene loaded: " .. sceneName)
    -- Code to run when a new scene is loaded
end
```

The `OnSceneLoaded` function is called whenever a new scene is loaded. The `sceneName` parameter provides the name of the loaded scene.

### OnDayChanged

```lua
function OnDayChanged(day)
    Log("Day changed to: " .. day)
    -- Code to run when the game day changes
end
```

The `OnDayChanged` function is called when the game day changes. The `day` parameter provides the new day value.

### OnTimeChanged

```lua
function OnTimeChanged(time)
    -- Code to run when game time changes
    -- 'time' is provided in game time units
    if time % 6 == 0 then -- Only log every 6 time units
        Log("Time is now: " .. FormatGameTime(time))
    end
end
```

The `OnTimeChanged` function is called when the game time changes. The `time` parameter provides the new time value.

### OnPlayerHealthChanged

```lua
function OnPlayerHealthChanged(newHealth)
    Log("Player health changed to: " .. newHealth)
    if newHealth < 30 then
        -- Provide healing items or warnings
    end
end
```

The `OnPlayerHealthChanged` function is called when the player's health changes. The `newHealth` parameter provides the new health value.

### OnPlayerEnergyChanged

```lua
function OnPlayerEnergyChanged(newEnergy)
    Log("Player energy changed to: " .. newEnergy)
    if newEnergy < 30 then
        -- Provide energy items or warnings
    end
end
```

The `OnPlayerEnergyChanged` function is called when the player's energy changes. The `newEnergy` parameter provides the new energy value.

### Shutdown

```lua
function Shutdown()
    -- Cleanup code here
    UnregisterCommand("mycommand")
    Log("Script shutdown complete")
end
```

The `Shutdown` function is called when your script is being unloaded. It should perform any necessary cleanup like unregistering commands or releasing resources.

## Hook Execution Order

When a script is loaded, hooks are called in this order:

1. `Initialize` - When script is first loaded
2. `OnConsoleReady` - When console is ready
3. `OnPlayerReady` - When player is loaded and ready
4. `Update` - Called every frame thereafter
5. Other event hooks - Called when their specific events occur
6. `Shutdown` - Called when script is unloaded

## Creating Custom Events

In addition to the built-in lifecycle hooks, you can create your own custom events. For example:

```lua
function OnPlayerMovedSignificantly()
    -- Custom event when player moves a significant distance
    local currentRegion = GetPlayerRegion()
    Log("Player moved to region: " .. currentRegion)
end

-- In the Update function, call your custom event when needed
function Update()
    local currentPos = GetPlayerPosition()
    if playerLastPosition then
        local distance = Vector3Distance(currentPos, playerLastPosition)
        if distance > 5 then
            playerLastPosition = currentPos
            OnPlayerMovedSignificantly() -- Call custom event
        end
    end
end
```

## Best Practices

- Implement only the hooks you need
- Keep hook implementations efficient, especially for frequently called hooks like `Update`
- Use appropriate hooks for specific tasks
- Handle errors gracefully in all hooks
- Always implement `Shutdown` to clean up resources properly
- Use custom events to organize your code logically

## Example: Complete Lifecycle Implementation

```lua
-- Track player state
local playerLastPosition = nil
local playerLastRegion = nil

-- Initialize function
function Initialize()
    Log("Script initialized!")
    return true
end

-- Update function
function Update()
    local currentPos = GetPlayerPosition()
    if playerLastPosition then
        local distance = Vector3Distance(currentPos, playerLastPosition)
        if distance > 5 then
            playerLastPosition = currentPos
            OnPlayerMovedSignificantly()
        end
    end
end

-- Console ready
function OnConsoleReady()
    RegisterCommand("pos", "Shows player position", "pos", function(args)
        local pos = GetPlayerPosition()
        Log("Position: " .. pos.x .. ", " .. pos.y .. ", " .. pos.z)
    end)
end

-- Player ready
function OnPlayerReady()
    playerLastPosition = GetPlayerPosition()
    playerLastRegion = GetPlayerRegion()
    Log("Player ready in region: " .. playerLastRegion)
end

-- Scene loaded
function OnSceneLoaded(sceneName)
    Log("Scene loaded: " .. sceneName)
end

-- Day changed
function OnDayChanged(day)
    Log("Day changed to: " .. day)
end

-- Time changed
function OnTimeChanged(time)
    if time % 3 == 0 then
        Log("Time is now: " .. FormatGameTime(time))
    end
end

-- Custom event
function OnPlayerMovedSignificantly()
    local currentRegion = GetPlayerRegion()
    if currentRegion ~= playerLastRegion then
        Log("Player changed region from " .. playerLastRegion .. " to " .. currentRegion)
        playerLastRegion = currentRegion
    end
end

-- Shutdown
function Shutdown()
    UnregisterCommand("pos")
    Log("Script shutdown complete")
end
```

This guide covers the main lifecycle hooks provided by ScheduleLua. For more specialized hooks related to specific game systems, refer to the relevant API documentation. 
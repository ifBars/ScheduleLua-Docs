# Script Structure

This guide covers the recommended structure for ScheduleLua scripts, explaining the key components and organization patterns to help you write clean, maintainable scripts.

## Basic Script Structure

A well-structured ScheduleLua script typically includes these key sections:

1. Header comment block
2. Global variables
3. Lifecycle hook functions
4. Helper functions
5. Custom event handlers

Here's a skeleton template that you can use as a starting point:

```lua
--[[
    ScriptName.lua
    Description: Brief description of what this script does
    Author: Your Name
    Version: 1.0
]]

-- Global variables and state
local someState = nil
local someOtherState = false
local lastUpdate = 0

-- Initialize function - called when script is loaded
function Initialize()
    Log("Script initializing...")
    -- Setup code here
    return true
end

-- Update function - called every frame
function Update()
    -- Performance optimization: Only run expensive operations every 10 frames
    if Time.frameCount - lastUpdate < 10 then
        return
    end
    lastUpdate = Time.frameCount
    
    -- Main update logic here
end

-- Console ready hook
function OnConsoleReady()
    -- Register commands
    RegisterCommand("mycommand", "Description", "usage", CommandHandler)
end

-- Player ready hook
function OnPlayerReady()
    -- Player initialization
    someState = GetPlayerPosition()
    Log("Player ready at position: " .. someState.x .. ", " .. someState.y .. ", " .. someState.z)
end

-- Other lifecycle hooks
function OnSceneLoaded(sceneName)
    -- Scene-specific logic
end

function OnDayChanged(day)
    -- Day change logic
end

-- Command handlers
function CommandHandler(args)
    -- Handle command logic
    Log("Command executed with args: " .. table.concat(args, ", "))
end

-- Custom helper functions
function CalculateSomething(value1, value2)
    return value1 * value2
end

-- Custom event handlers
function OnCustomEvent()
    -- Handle custom events
end

-- Shutdown function - called when script is unloaded
function Shutdown()
    -- Cleanup code
    UnregisterCommand("mycommand")
    Log("Script shutdown complete")
end
```

## Organizing State Management

For complex scripts, it's often helpful to group related state variables into tables:

```lua
-- Player state tracking
local playerState = {
    position = nil,
    health = 100,
    energy = 100,
    region = nil,
    inventory = {}
}

-- NPC tracking
local npcState = {
    tracked = {},
    lastInteraction = nil
}

-- Game state tracking
local gameState = {
    time = 0,
    day = 1,
    isNight = false
}
```

This approach makes it easier to pass state around and keep related data organized.

## Handling Commands

When registering multiple commands, it's best to group them together in the `OnConsoleReady` function:

```lua
function OnConsoleReady()
    -- Player information commands
    RegisterCommand("pos", "Shows player position", "pos", CommandPosition)
    RegisterCommand("health", "Shows player health", "health", CommandHealth)
    
    -- World information commands
    RegisterCommand("time", "Shows current game time", "time", CommandTime)
    RegisterCommand("npcs", "Shows nearby NPCs", "npcs [radius]", CommandNPCs)
    
    -- Utility commands
    RegisterCommand("help", "Shows available commands", "help", CommandHelp)
end

function CommandPosition(args)
    local pos = GetPlayerPosition()
    Log("Position: " .. pos.x .. ", " .. pos.y .. ", " .. pos.z)
end

function CommandHealth(args)
    Log("Health: " .. GetPlayerHealth())
end

-- Other command handlers...
```

## Managing Complex Update Logic

For scripts with complex update logic, split the functionality into separate functions:

```lua
function Update()
    -- Only run expensive checks every few frames
    if Time.frameCount % 5 == 0 then
        CheckPlayerStatus()
    end
    
    -- Run less frequently
    if Time.frameCount % 30 == 0 then
        CheckWorldState()
    end
    
    -- Always run
    HandleImportantEvents()
end

function CheckPlayerStatus()
    -- Player status checking logic
end

function CheckWorldState()
    -- World state checking logic
end

function HandleImportantEvents()
    -- Critical event handling
end
```

## Conditional Feature Enablement

For scripts with multiple features that can be enabled/disabled:

```lua
-- Configuration
local config = {
    enablePlayerTracking = true,
    enableNPCTracking = true,
    enableEconomyFeatures = false,
    logLevel = "normal" -- "minimal", "normal", "verbose"
}

function Initialize()
    Log("Initializing with configuration:")
    Log("- Player Tracking: " .. (config.enablePlayerTracking and "Enabled" or "Disabled"))
    Log("- NPC Tracking: " .. (config.enableNPCTracking and "Enabled" or "Disabled"))
    Log("- Economy Features: " .. (config.enableEconomyFeatures and "Enabled" or "Disabled"))
    
    if config.enablePlayerTracking then
        InitPlayerTracking()
    end
    
    if config.enableNPCTracking then
        InitNPCTracking()
    end
    
    return true
end

function Update()
    if config.enablePlayerTracking then
        UpdatePlayerTracking()
    end
    
    if config.enableNPCTracking then
        UpdateNPCTracking()
    end
end
```

## Error Handling

Proper error handling is important for script stability:

```lua
function TryGetNPC(npcName)
    if not npcName or npcName == "" then
        LogError("Invalid NPC name")
        return nil
    end
    
    local npc = FindNPC(npcName)
    if not npc then
        LogWarning("Could not find NPC: " .. npcName)
        return nil
    end
    
    return npc
end

-- Usage with error handling
function InteractWithNPC(npcName)
    local npc = TryGetNPC(npcName)
    if not npc then
        return false
    end
    
    -- Safe to proceed with NPC interaction
    Log("Interacting with NPC: " .. npc.fullName)
    return true
end
```

## Script Performance Optimization

For optimal performance, particularly in the `Update` function:

1. **Throttle operations** - Only perform expensive operations every X frames
2. **Cache results** - Store and reuse values that don't change frequently
3. **Check conditions early** - Return early if conditions aren't met
4. **Use efficient data structures** - Choose appropriate tables and access patterns
5. **Minimize string operations** - String concatenation can be expensive when done frequently

```lua
-- Example of performance optimization
local lastCheck = 0
local cachedResult = nil

function ExpensiveOperation()
    -- Only run every 30 frames
    if Time.frameCount - lastCheck < 30 then
        return cachedResult
    end
    
    lastCheck = Time.frameCount
    -- Perform expensive calculation
    cachedResult = CalculateResult()
    return cachedResult
end
```

## Best Practices

1. **Keep scripts focused** - Each script should have a clear, specific purpose
2. **Use comments** - Document complex logic and the "why" behind your code
3. **Use local variables** - Avoid globals to prevent conflicts with other scripts
4. **Follow naming conventions**:
   - Use camelCase for variables and functions
   - Use PascalCase for lifecycle hooks
   - Use descriptive names that indicate purpose
5. **Structure for readability** - Group related functions together
6. **Test thoroughly** - Test scripts under various game conditions
7. **Clean up resources** - Always implement `Shutdown()` to clean up

By following these structural patterns and best practices, you'll create ScheduleLua scripts that are easier to maintain, debug, and extend. 
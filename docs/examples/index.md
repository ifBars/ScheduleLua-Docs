# Example Scripts

This section provides example scripts for ScheduleLua to help you understand how to use the API. 

<div class="custom-block warning">
  <p><strong>Implementation Status Notice:</strong> Some examples in this section may showcase planned functionality that is not yet fully implemented in the current beta version.</p>
</div>

## Implementation Status

Before trying out these examples, please check their current implementation status:

| Example | Status |
|---------|--------|
| Basic Example | ✅ Working |
| UI Example | 🔄 Partially Working |
| Registry Example | 🔄 Partially Working |
| Economy Example | ✅ Planned |
| Curfew Example | ✅ Planned |

For the most up-to-date information on what's currently working, see the [Development Status](/guide/development-status) page.

## Basic Example Script (Working)

The following example demonstrates a basic ScheduleLua script that implements various **currently working** core functionality:

```lua
-- ScheduleLua Basic Example Script (Working in current beta)

-- Print a header for our script
Log("Basic example script loaded!")

-- Track player state
local playerLastPosition = nil
local playerLastRegion = nil

-- Initialize function called when script is first loaded
function Initialize()
    Log("Basic example script initialized!")
    return true
end

-- Update function called every frame
function Update()
    -- This function is called frequently, limiting operations for performance
    -- Check player position change every 30 frames (approximately)
    if Time.frameCount % 30 ~= 0 then
        return
    end
    
    -- Check if player has moved significantly
    local currentPos = GetPlayerPosition()
    if playerLastPosition then
        -- Use Vector3Distance to compare positions
        local distance = Vector3Distance(currentPos, playerLastPosition)
        if distance > 10 then
            Log("Player moved significantly!")
            Log("Distance moved: " .. distance)
            playerLastPosition = currentPos
        end
    else
        playerLastPosition = currentPos
    end
end

-- Called when the console is fully loaded and ready
function OnConsoleReady()
    -- These commands are fully working in the current version
    RegisterCommand(
        "hello",
        "Shows a greeting message",
        "hello [name]",
        function(args)
            local name = args[2] or "World"
            Log("Hello, " .. name .. "!")
        end
    )
    
    RegisterCommand(
        "pos",
        "Shows player position",
        "pos",
        function(args)
            local pos = GetPlayerPosition()
            Log("Position: " .. pos.x .. ", " .. pos.y .. ", " .. pos.z)
        end
    )
    
    RegisterCommand(
        "time",
        "Shows current game time and day",
        "time",
        function(args)
            Log("Time: " .. FormatGameTime(GetGameTime()) .. ", Day: " .. GetGameDay())
        end
    )
    
    RegisterCommand(
        "health",
        "Shows or sets player health",
        "health [value]",
        function(args)
            if args[2] then
                local health = tonumber(args[2])
                if health and health >= 0 and health <= 100 then
                    SetPlayerHealth(health)
                    Log("Set player health to " .. health)
                else
                    LogError("Health value must be between 0 and 100")
                end
            else
                Log("Current health: " .. GetPlayerHealth())
            end
        end
    )
end

-- Called when the player is fully loaded and ready
function OnPlayerReady()
    Log("Player is ready!")
    
    -- Get initial player state
    playerLastPosition = GetPlayerPosition()
    playerLastRegion = GetPlayerRegion()
    
    -- Log player information
    Log("Player starting in region: " .. (playerLastRegion or "Unknown"))
    Log("Player health: " .. GetPlayerHealth())
    Log("Player energy: " .. GetPlayerEnergy())
    
    -- Log player position
    local pos = GetPlayerPosition()
    if pos then
        Log("Player position: " .. pos.x .. ", " .. pos.y .. ", " .. pos.z)
    else
        Log("Player position: Unknown")
    end
    
    -- Get current game time
    local currentTime = GetGameTime()
    local formattedTime = FormatGameTime(currentTime)
    Log("Current game time: " .. formattedTime)
    Log("Current day: " .. GetGameDay())
    
    -- Check if it's night time
    if IsNightTime() then
        Log("It's currently night time")
    else
        Log("It's currently day time")
    end
end

-- Called when the game day changes
function OnDayChanged(day)
    Log("Day changed to: " .. day)
end

-- Called when the game time changes
function OnTimeChanged(time)
    -- Only log every 6 hours to avoid spam
    if time % 6 == 0 then
        Log("Time is now: " .. FormatGameTime(time))
        
        if IsNightTime() then
            Log("It's night time!")
        end
    end
end

-- Cleanup function called when script is unloaded
function Shutdown()
    -- Unregister all commands
    UnregisterCommand("hello")
    UnregisterCommand("pos")
    UnregisterCommand("time")
    UnregisterCommand("health")
    
    Log("Basic example script shutdown, all commands unregistered")
end
```

### Key Concepts Demonstrated (Working)

This basic example demonstrates these currently working features:

1. **Script Lifecycle Hooks**: Initialize, Update, OnConsoleReady, OnPlayerReady, OnDayChanged, OnTimeChanged, Shutdown
2. **Command Registration**: Creating and handling custom console commands
3. **Player Information**: Getting player position, health, energy
4. **Game Time**: Accessing and formatting game time, checking for night time
5. **Vector Handling**: Using vector functions for position calculations 
6. **Logging**: Using the Log, LogError functions to output information

## More Advanced Examples

<div class="custom-block warning">
  <p><strong>Note:</strong> The following examples may showcase features that are still in development.</p>
</div>

For more specialized examples, check out:

- [UI Example](./ui.md): Creating notifications and basic UI elements (partially implemented)
- [Registry Example](./registry.md): Storing and retrieving persistent data (planned feature)
- [Economy Example](./economy.md): Interacting with the game's economy system (planned feature)
- [Curfew Example](./curfew.md): Working with the game's law and curfew system (planned feature)

We recommend starting with the basic example as it uses the most stable parts of the API. As ScheduleLua development progresses, more examples will become fully functional.

## Contributing Examples

If you've created a working script for the current beta version that demonstrates a useful technique, consider sharing it with the community. You can submit your examples through:

1. Pull requests to the [documentation repository](https://github.com/ScheduleLua/ScheduleLua-Docs)
2. Posting in the #lua-examples channel of our [Discord server](https://discord.gg/Ab8snpEFDn)

When submitting examples, please:
- Indicate which version of ScheduleLua they were tested with
- Note any known issues or limitations
- Include comments explaining how the script works 
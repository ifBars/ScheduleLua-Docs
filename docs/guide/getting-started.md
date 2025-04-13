# Getting Started with ScheduleLua (Beta)

This guide will help you get started with writing your first Lua scripts for the ScheduleLua beta. It focuses on currently implemented features that you can use right away.

<div class="custom-block warning">
  <p><strong>Beta Notice:</strong> ScheduleLua is in active development. This guide focuses on stable features implemented in the current beta. For the latest implementation status, see the <a href="/guide/development-status">Development Status</a> page.</p>
</div>

## Prerequisites

Before getting started, make sure you have:

1. Schedule 1 game with MelonLoader installed
2. ScheduleLua installed and working
3. Basic understanding of Lua programming (or willingness to learn)

## Your First Script

Let's create a simple script that demonstrates working features in the current beta. Create a new file in your `Scripts` folder called `hello_world.lua`:

```lua
-- hello_world.lua - A simple first script for ScheduleLua beta

-- This function runs when your script is loaded
function Initialize()
    Log("Hello World script loaded!")
    
    -- Register a simple command
    RegisterCommand(
        "hello", 
        "Says hello to the player",
        "hello",
        function(args)
            local playerState = GetPlayerState()
            local playerName = playerState and playerState.playerName or "Player"
            Log("Hello, " .. playerName .. "!")
            
            -- Show a notification to the player
            ShowNotification("Hello World", "Welcome to ScheduleLua Beta!", 3)
        end
    )
    
    -- Get and log the current game time
    local timeString = FormatGameTime(GetGameTime())
    Log("Current game time: " .. timeString)
    
    return true -- Return true to indicate successful initialization
end

-- This function is called when game time changes
function OnTimeChanged(hour, minute)
    if hour == 8 and minute == 0 then
        Log("It's 8:00 AM!")
    end
end

-- This function runs when your script is unloaded
function Shutdown()
    Log("Hello World script unloaded!")
    UnregisterAllCommands()
end
```

## Understanding the Script

Let's break down what this script does:

1. `Initialize()` - This function runs when your script is loaded by ScheduleLua and returns true on success
2. `Log()` - Writes messages to the MelonLoader console
3. `RegisterCommand()` - Registers a custom command that can be typed in the console
4. `GetPlayerState()` - Gets information about the current player
5. `ShowNotification()` - Displays a UI notification
6. `FormatGameTime()` - Formats the game time value as a string
7. `GetGameTime()` - Gets the current game time value
8. `OnTimeChanged()` - Event handler that runs when game time changes
9. `Shutdown()` - Runs when your script is unloaded and cleans up resources

## Lifecycle Events

Your scripts will need to use ScheduleLua's lifecycle events to ensure your script executes at the right times:

```lua
-- Called when script is loaded
function Initialize()
    Log("Script loaded!")
end

-- Called when script is unloaded
function Shutdown()
    Log("Script unloaded!")
end

-- Called each frame (use sparingly)
function Update()
    -- This runs very frequently
    -- Avoid heavy operations here
end

-- Called when game time changes
function OnTimeChanged(hour, minute)
    if hour == 8 and minute == 0 then
        Log.Info("It's 8:00 AM!")
    end
end
```

## How to Test Your Script

1. Save your script in the `C:\Program Files (x86)\Steam\steamapps\common\Schedule I\Mods\ScheduleLua\Scripts` folder
2. Launch Schedule 1 and load into a game
3. Enable and open the console (~ key enabled from settings)
4. Type your command, e.g., `hello`
5. Watch for your script's output in the console

## Debugging Tips for Beta

1. Check the console for error messages
2. Use `Log()` for additional information
3. Remember that some features mentioned in documentation may not be fully implemented yet or fully documented properly
4. If a feature isn't working, check the [Development Status](/guide/development-status) page, and if it is not accurate, feel free to open a GitHub Issue on the Documentation repo.

## Next Steps

Now that you've created your first script, you can:

1. Experiment with the stable APIs mentioned above
2. Check the [Examples](/examples/) section for working code examples
3. Review the [API Reference](/api/) for details on implemented functions
4. Join the community to share your experiences and get help

Remember that ScheduleLua is still in development, and your feedback is valuable for improving it! 
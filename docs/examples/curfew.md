# Curfew API Example

This example demonstrates how to use the Curfew API in ScheduleLua to access information about the game's curfew system, respond to curfew events, and create custom curfew-related functionality.

## Complete Example Script

Below is a complete example script demonstrating the Curfew API:

```lua
-- Example script showing how to use the Curfew API with Event System
-- This script will display curfew status and use events for curfew notifications

function Initialize()
    Log("Updated Curfew example script initialized!")
end

-- Function called every game frame (use sparingly)
function Update()
    -- Only check curfew status once per minute
    local gameTime = GetGameTime()
    if gameTime ~= lastCheckedTime then
        lastCheckedTime = gameTime
        
        -- If curfew is active, show a warning if player is outside
        if IsCurfewActive() then
            local playerRegion = GetPlayerRegion()
            if playerRegion and not string.match(playerRegion:lower(), "indoor") and not string.match(playerRegion:lower(), "house") then
                -- Player is outdoors during curfew!
                if not warnedAboutCurfew then
                    LogWarning("You are outside during curfew! Police will be more active.")
                    warnedAboutCurfew = true
                end
            else
                -- Player is inside, reset warning flag
                warnedAboutCurfew = false
            end
        else
            -- Not curfew time, reset warning flag
            warnedAboutCurfew = false
            
            -- If curfew is approaching, give a countdown
            local timeUntilCurfew = GetTimeUntilCurfew()
            if timeUntilCurfew > 0 and timeUntilCurfew <= 15 and (timeUntilCurfew % 5 == 0) then
                Log("Curfew begins in " .. timeUntilCurfew .. " minutes!")
            end
        end
    end
end

-- Prints detailed information about the curfew
function PrintCurfewInfo()
    Log("==== Curfew Information ====")
    Log("Is Enabled: " .. tostring(IsCurfewEnabled()))
    Log("Is Active: " .. tostring(IsCurfewActive()))
    Log("Is Active (with tolerance): " .. tostring(IsCurfewActiveWithTolerance()))
    Log("Start Time: " .. FormatGameTime(GetCurfewStartTime()))
    Log("End Time: " .. FormatGameTime(GetCurfewEndTime()))
    Log("Warning Time: " .. FormatGameTime(GetCurfewWarningTime()))
    
    local timeUntilCurfew = GetTimeUntilCurfew()
    if timeUntilCurfew > 0 then
        Log("Time until curfew: " .. timeUntilCurfew .. " minutes")
    end
    Log("===========================")
end

-- Event system handler for curfew being enabled
function OnCurfewEnabled()
    Log("CURFEW SYSTEM HAS BEEN ENABLED")
    PrintCurfewInfo()
end

-- Event system handler for curfew being disabled
function OnCurfewDisabled()
    Log("CURFEW SYSTEM HAS BEEN DISABLED")
    PrintCurfewInfo()
end

-- Event system handler for curfew warning
function OnCurfewWarning()
    Log("CURFEW WARNING: Curfew will begin at 9:00 PM")
end

-- Event system handler for curfew hint
function OnCurfewHint()
    Log("CURFEW HINT: During curfew (9 PM - 5 AM), stay indoors to avoid detection by police.")
end

-- Global variables
lastCheckedTime = 0
warnedAboutCurfew = false 
```

## Key Concepts

The Curfew API provides information about the game's curfew system, which restricts player activity during certain hours (typically from 9:00 PM to 5:00 AM).

### Curfew Status Functions

#### IsCurfewEnabled

Checks if the curfew system is enabled in the game.

```lua
if IsCurfewEnabled() then
    Log("Curfew system is enabled")
else
    Log("Curfew system is disabled")
end
```

#### IsCurfewActive

Checks if curfew is currently active (i.e., it's currently between curfew hours).

```lua
if IsCurfewActive() then
    Log("Curfew is currently active! Stay indoors.")
else
    Log("No curfew right now. You can freely move outside.")
end
```

#### IsCurfewActiveWithTolerance

Checks if curfew is active, with a small tolerance period at the beginning and end.

```lua
if IsCurfewActiveWithTolerance() then
    Log("Curfew is active (with tolerance). Police may be watching.")
end
```

### Curfew Time Functions

#### GetCurfewStartTime

Gets the game time when curfew begins.

```lua
local startTime = GetCurfewStartTime()
Log("Curfew starts at: " .. FormatGameTime(startTime))  -- e.g., "21:00"
```

#### GetCurfewEndTime

Gets the game time when curfew ends.

```lua
local endTime = GetCurfewEndTime()
Log("Curfew ends at: " .. FormatGameTime(endTime))  -- e.g., "5:00"
```

#### GetCurfewWarningTime

Gets the game time when curfew warnings begin.

```lua
local warningTime = GetCurfewWarningTime()
Log("Curfew warnings begin at: " .. FormatGameTime(warningTime))  -- e.g., "20:30"
```

#### GetTimeUntilCurfew

Gets the number of minutes until curfew begins. Returns 0 if curfew is already active.

```lua
local timeUntil = GetTimeUntilCurfew()
if timeUntil > 0 then
    Log("Curfew begins in " .. timeUntil .. " minutes")
else
    Log("Curfew is already active")
end
```

### Curfew Event Hooks

The Curfew API provides several event hooks that are called at specific curfew-related times:

#### OnCurfewEnabled

Called when the curfew system is enabled.

```lua
function OnCurfewEnabled()
    Log("Curfew system has been enabled")
    -- Perform any setup for curfew-related features
end
```

#### OnCurfewDisabled

Called when the curfew system is disabled.

```lua
function OnCurfewDisabled()
    Log("Curfew system has been disabled")
    -- Clean up any curfew-related features
end
```

#### OnCurfewWarning

Called when a curfew warning is issued (typically 30 minutes before curfew).

```lua
function OnCurfewWarning()
    Log("WARNING: Curfew will begin soon!")
    -- Maybe show a UI notification to the player
end
```

#### OnCurfewBegin

Called when curfew begins.

```lua
function OnCurfewBegin()
    Log("Curfew has begun. Stay indoors!")
    -- Implement curfew-related effects or notifications
end
```

#### OnCurfewEnd

Called when curfew ends.

```lua
function OnCurfewEnd()
    Log("Curfew has ended. You can go outside safely now.")
    -- Clean up any curfew effects
end
```

#### OnCurfewHint

Called occasionally to provide the player with information about curfew.

```lua
function OnCurfewHint()
    Log("HINT: During curfew (9 PM - 5 AM), stay indoors to avoid detection.")
    -- Display a helpful UI hint to the player
end
```

## Example Use Cases

### Player Warning System

This example checks if the player is outside during curfew and issues warnings:

```lua
function Update()
    if IsCurfewActive() then
        local playerRegion = GetPlayerRegion()
        if playerRegion and not string.match(playerRegion:lower(), "indoor") then
            -- Player is outdoors during curfew!
            LogWarning("You are outside during curfew! Police will be more active.")
            -- Maybe play a sound effect or show a UI warning
        end
    end
end
```

### Curfew Countdown

This example provides countdown notifications as curfew approaches:

```lua
function Update()
    -- Only check once per minute
    local gameTime = GetGameTime()
    if gameTime ~= lastCheckedTime then
        lastCheckedTime = gameTime
        
        -- Check if curfew is approaching
        local timeUntilCurfew = GetTimeUntilCurfew()
        if timeUntilCurfew > 0 and timeUntilCurfew <= 30 then
            -- Show countdown at 30, 15, 10, 5 minutes
            if timeUntilCurfew == 30 or timeUntilCurfew == 15 or 
               timeUntilCurfew == 10 or timeUntilCurfew == 5 then
                Log("Curfew begins in " .. timeUntilCurfew .. " minutes!")
            end
        end
    end
end
```

### Custom Curfew Status UI

This example shows how you might create a simple curfew status indicator:

```lua
local curfewStatus = {}

function Initialize()
    -- Create a simple UI status indicator
    curfewStatus.panel = CreatePanel("CurfewStatus", 5, 5, 200, 40)
    curfewStatus.text = CreateText("CurfewText", curfewStatus.panel, "", 10, 10, 180, 20)
    
    -- Start updating the status
    Wait(1.0, UpdateCurfewStatusUI)
end

function UpdateCurfewStatusUI()
    if not curfewStatus.panel then return end
    
    if IsCurfewActive() then
        SetTextContent(curfewStatus.text, "CURFEW ACTIVE")
        SetTextColor(curfewStatus.text, 1.0, 0.2, 0.2, 1.0)  -- Red
    elseif GetTimeUntilCurfew() <= 30 then
        SetTextContent(curfewStatus.text, "CURFEW IN " .. GetTimeUntilCurfew() .. " MIN")
        SetTextColor(curfewStatus.text, 1.0, 0.7, 0.2, 1.0)  -- Orange
    else
        SetTextContent(curfewStatus.text, "NO CURFEW")
        SetTextColor(curfewStatus.text, 0.2, 0.8, 0.2, 1.0)  -- Green
    end
    
    -- Check again in 1 second
    Wait(1.0, UpdateCurfewStatusUI)
end

function Shutdown()
    -- Clean up UI elements
    if curfewStatus.panel then
        DestroyPanel(curfewStatus.panel)
        curfewStatus = {}
    end
end
```

## Best Practices

1. **Check curfew status efficiently**: Don't check every frame, but rather on a timer or when the game time changes
2. **Use event hooks**: Prefer to use the provided event hooks over continuous checking when possible
3. **Combine with player location**: The curfew system is most useful when combined with the player's location
4. **Provide clear warnings**: Always give players clear information about curfew status and time remaining
5. **Clean up resources**: Make sure to clean up any UI elements or timers in the Shutdown function

## Integration with Other APIs

The Curfew API works well with several other ScheduleLua APIs:

- **Time API**: For more detailed time information and formatting
- **Player API**: To determine player location and status
- **UI API**: To create curfew notifications and status indicators
- **Event System**: To respond to curfew-related events

## Console Commands

Consider adding custom console commands to help with curfew testing:

```lua
function OnConsoleReady()
    RegisterCommand(
        "curfew_info",
        "Display curfew information",
        "curfew_info",
        function(args)
            PrintCurfewInfo()
        end
    )
end
```

## Complete Example

For the complete example script, see `ScheduleLua/Resources/curfew_example.lua` in the ScheduleLua distribution. 
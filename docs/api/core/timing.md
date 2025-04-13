# Timing Functions

The Timing API provides functions for scheduling and managing timed events in Schedule 1.

<div class="custom-block tip">
  <p><strong>Implementation Status:</strong> Partially implemented. The Wait function is available, but custom time events are handled through event callbacks.</p>
</div>

## Wait Function

### Wait

**Signature:** `void Wait(number seconds, function callback)`

**Description:** Executes a function after the specified delay.

### Parameters

- `seconds` (number): The number of seconds to wait before executing the callback
- `callback` (function): The function to execute after the delay

### Returns

None.

### Example

```lua
-- Display a notification, then display another one 3 seconds later
function ShowDelayedNotifications()
    ShowNotification("First notification!")
    
    Wait(3.0, function()
        ShowNotification("This appears 3 seconds later!")
    end)
}

RegisterCommand("notify", "Shows sequential notifications", "notify", function(args)
    ShowDelayedNotifications()
end)
```

### Notes

- Wait is non-blocking; the script continues execution after scheduling the callback
- Nested Wait calls can be used for sequences of timed events
- The actual delay may vary slightly due to frame timing
- Wait timers persist even if the player loads a new area
- The Delay function is an alias for Wait and works exactly the same way

## Time Event Callbacks

Instead of registering custom time events, ScheduleLua provides event callbacks that are triggered by the game's time system. These are predefined events that your script can implement.

### OnTimeChanged

**Description:** Called when the game time changes (typically once every hour in game time).

### Parameters

- `time` (number): The current game time (hour in 24-hour format, 0-23)

### Example

```lua
-- Called when the game time changes
function OnTimeChanged(time)
    -- Only log time changes occasionally to avoid spam
    if time % 3 == 0 then
        Log("Time is now: " .. FormatGameTime(time))
        
        -- Check if it's night time
        if IsNightTime() then
            Log("It's night time!")
        end
    end
    
    -- Do custom actions at specific times
    if time == 8 then
        ShowNotification("It's 8:00 AM! Time to start the day.")
    elseif time == 12 then
        ShowNotification("It's noon! Lunch time!")
    elseif time == 20 then
        ShowNotification("It's 8:00 PM! Consider heading home soon.")
    end
}
```

### OnDayChanged

**Description:** Called when the game day changes.

### Parameters

- `day` (string): The name of the new day (e.g., "Monday", "Tuesday", etc.)

### Example

```lua
-- Called when the game day changes
function OnDayChanged(day)
    Log("Day changed to: " .. day)
    ShowNotification("Today is " .. day)
    
    -- Reset daily tracking variables
    dailyTasksCompleted = 0
    
    -- Schedule daily tasks
    if day == "Monday" or day == "Wednesday" or day == "Friday" then
        ShowNotification("Today is a delivery day!")
    end
}
```

### OnSleepStart

**Description:** Called when the player starts sleeping.

### Parameters

None.

### Example

```lua
-- Called when the player starts sleeping
function OnSleepStart()
    Log("Player is going to sleep")
    -- Save game state or prepare for time skip
}
```

### OnSleepEnd

**Description:** Called when the player wakes up after sleeping.

### Parameters

None.

### Example

```lua
-- Called when the player wakes up
function OnSleepEnd()
    Log("Player has woken up")
    
    -- Get current time after sleeping
    local currentTime = GetGameTime()
    Log("It's now " .. FormatGameTime(currentTime))
    
    -- Apply effects after sleeping
    local health = GetPlayerHealth()
    if health < 50 then
        ShowNotification("You didn't sleep well and still feel tired.")
    else
        ShowNotification("You feel refreshed after sleeping.")
    end
}
```

## Time Utility Functions

### GetGameTime

**Signature:** `number GetGameTime()`

**Description:** Gets the current game time as an hour value.

### Parameters

None.

### Returns

- `number`: The current game time (hour in 24-hour format, 0-23)

### Example

```lua
function CheckTimeOfDay()
    local currentTime = GetGameTime()
    Log("Current time: " .. currentTime)
    
    if currentTime >= 6 and currentTime < 12 then
        Log("It's morning")
    elseif currentTime >= 12 and currentTime < 18 then
        Log("It's afternoon")
    elseif currentTime >= 18 and currentTime < 22 then
        Log("It's evening")
    else
        Log("It's night")
    end
}
```

### GetGameDay

**Signature:** `string GetGameDay()`

**Description:** Gets the current game day as a string.

### Parameters

None.

### Returns

- `string`: The current game day (e.g., "Monday", "Tuesday", etc.)

### Example

```lua
function CheckWeekday()
    local day = GetGameDay()
    Log("Today is " .. day)
    
    if day == "Saturday" or day == "Sunday" then
        ShowNotification("It's the weekend!")
    else
        ShowNotification("It's a weekday.")
    end
}
```

### GetGameDayInt

**Signature:** `number GetGameDayInt()`

**Description:** Gets the current game day as an integer (0 = Monday, 1 = Tuesday, etc.).

### Parameters

None.

### Returns

- `number`: The current game day as an integer (0-6)

### Example

```lua
function IsWeekend()
    local dayInt = GetGameDayInt()
    -- 5 = Saturday, 6 = Sunday
    return dayInt >= 5
}
```

### IsNightTime

**Signature:** `boolean IsNightTime()`

**Description:** Checks if it's currently night time in the game.

### Parameters

None.

### Returns

- `boolean`: True if it's night time, false otherwise

### Example

```lua
function CheckNighttime()
    if IsNightTime() then
        ShowNotification("Be careful, it's night time!")
        -- Maybe spawn some dangers or modify game behavior
    else
        ShowNotification("It's daytime.")
    end
}
```

### FormatGameTime

**Signature:** `string FormatGameTime(number timeValue)`

**Description:** Formats a game time value into a readable 12-hour time string.

### Parameters

- `timeValue` (number): The game time value to format (0-23)

### Returns

- `string`: A formatted time string (e.g., "8:00 AM", "3:00 PM")

### Example

```lua
function DisplayCurrentTime()
    local currentTime = GetGameTime()
    local formattedTime = FormatGameTime(currentTime)
    ShowNotification("The time is now " .. formattedTime)
}
```

## Best Practices

### For Scheduling Events

1. **Use OnTimeChanged for time-specific events** - Check the time value in this event to trigger actions at specific hours
2. **Use OnDayChanged for daily events** - Reset daily counters or trigger events on specific days of the week
3. **Use Wait for sequences** - When you need actions to happen in sequence with delays

### For Performance

1. **Be selective in OnTimeChanged** - This event fires every hour of game time, so use conditions to only run code when needed
2. **Clean up after sleeping** - Sleep can skip many hours at once, so handle this appropriately in OnSleepEnd
3. **Avoid very short Wait times** - Very short delays (less than 0.1 seconds) may impact performance

### Example: Scheduling Daily Activities

```lua
-- Track when we last ran an activity
local lastRunDay = nil

-- Check and run daily activities when time changes
function OnTimeChanged(time)
    -- Only run daily activities once per day, at 8 AM
    if time == 8 then
        local today = GetGameDay()
        
        -- Skip if we already ran today's activities
        if today == lastRunDay then
            return
        end
        
        -- Run different activities on different days
        if today == "Monday" then
            ShowNotification("It's Monday! Market prices are refreshed.")
            -- Refresh market prices
        elseif today == "Wednesday" then
            ShowNotification("It's Wednesday! New inventory available.")
            -- Update shop inventories
        elseif today == "Friday" then
            ShowNotification("It's Friday! Weekend bonus active.")
            -- Apply weekend bonuses
        end
        
        -- Remember we ran today's activities
        lastRunDay = today
    end
}

-- Handle sleeping (time skips)
function OnSleepEnd()
    -- When player wakes up, we should check if we need to run activities
    -- This handles cases where player sleeps through multiple days
    local currentTime = GetGameTime()
    
    -- If it's past 8 AM, we should check and run daily activities
    if currentTime >= 8 then
        Wait(1.0, function()
            -- Call our time handler with the current time
            OnTimeChanged(currentTime)
        end)
    end
}
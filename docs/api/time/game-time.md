# Game Time API

The Game Time API provides functions for interacting with Schedule 1's time system. This includes getting the current game time, day, and checking for specific time conditions.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic functionality works, but some advanced features are still in development.</p>
</div>

## GetGameTime

**Signature:** `int GetGameTime()`

**Description:** Returns the current game time as an integer value.

### Parameters

None.

### Returns

An integer representing the current game time.

### Example

```lua
local currentTime = GetGameTime()
Log("Current game time: " .. currentTime)

-- Format the time for display
local formattedTime = FormatGameTime(currentTime)
Log("Formatted time: " .. formattedTime)
```

### Notes

- The game time is returned as an integer from 0-23 representing hours
- To get a human-readable time string, use `FormatGameTime()`

## FormatGameTime

**Signature:** `string FormatGameTime(int timeValue)`

**Description:** Converts a game time integer value into a human-readable time string.

### Parameters

- `timeValue` (int): The game time value to format

### Returns

A string representing the formatted time (e.g., "8:00 AM", "2:30 PM").

### Example

```lua
local currentTime = GetGameTime()
local formattedTime = FormatGameTime(currentTime)
Log("The time is now " .. formattedTime)

-- Using in OnTimeChanged hook
function OnTimeChanged(time)
    Log("Time changed to: " .. FormatGameTime(time))
end
```

### Notes

- This function handles AM/PM conversion
- Always use this function when displaying time to players

## GetGameDay

**Signature:** `string GetGameDay()`

**Description:** Returns the current game day as a string.

### Parameters

None.

### Returns

A string representing the current game day (e.g., "Monday", "Tuesday").

### Example

```lua
local currentDay = GetGameDay()
Log("Today is " .. currentDay)

-- Using in OnDayChanged hook
function OnDayChanged(day)
    Log("The day has changed to " .. day)
    if day == "Monday" then
        Log("It's the start of a new week!")
    end
end
```

### Notes

- The day is returned as a full name (e.g., "Monday", not abbreviated)
- To get a numeric day value, use `GetGameDayInt()`

## GetGameDayInt

**Signature:** `int GetGameDayInt()`

**Description:** Returns the current game day as an integer value.

### Parameters

None.

### Returns

An integer representing the current game day (1-7, where 1 is Monday).

### Example

```lua
local dayNumber = GetGameDayInt()
Log("Day number: " .. dayNumber)

-- Check if it's a weekend
if dayNumber >= 6 then
    Log("It's the weekend!")
end
```

### Notes

- Day values: 1 = Monday, 2 = Tuesday, ..., 7 = Sunday
- Useful for numeric comparisons and calculations

## IsNightTime

**Signature:** `bool IsNightTime()`

**Description:** Checks if it's currently night time in the game.

### Parameters

None.

### Returns

A boolean value: `true` if it's night time, `false` otherwise.

### Example

```lua
if IsNightTime() then
    Log("It's night time. Be careful out there!")
end

-- Using in Update function
function Update()
    if IsNightTime() and not hasWarnedAboutNight then
        Log("Night has fallen. The streets are more dangerous now.")
        hasWarnedAboutNight = true
    elseif not IsNightTime() then
        hasWarnedAboutNight = false
    end
end
```

### Notes

- Night time is typically defined as between 20:00 (8:00 PM) and 6:00 (6:00 AM)
- The exact night time hours may vary based on game settings

## Time-Related Events

The Time API includes event hooks that are called when time-related changes occur:

### OnTimeChanged

```lua
function OnTimeChanged(time)
    -- 'time' is the new game time value
    Log("Time changed to: " .. FormatGameTime(time))
    
    -- Perform actions at specific times
    if time == 8 then
        Log("It's 8:00 AM. Shops are opening!")
    elseif time == 20 then
        Log("It's 8:00 PM. Shops are closing!")
    end
end
```

### OnDayChanged

```lua
function OnDayChanged(day)
    -- 'day' is the new day name as a string
    Log("Day changed to: " .. day)
    
    -- Perform actions on specific days
    if day == "Monday" then
        Log("It's Monday! Weekly reset happens today.")
    end
end
```

## Time Utility Functions

### Calculating Time Differences

```lua
function GetTimeDifference(time1, time2)
    -- Handle day wrapping
    local diff = time2 - time1
    if diff < 0 then
        diff = diff + 24
    end
    return diff
end

-- Usage example
local currentTime = GetGameTime()
local shopCloseTime = 20
local hoursUntilClose = GetTimeDifference(currentTime, shopCloseTime)
Log("Shop closes in " .. hoursUntilClose .. " hours")
```

### Checking Time Ranges

```lua
function IsTimeInRange(currentTime, startTime, endTime)
    if startTime <= endTime then
        -- Simple range (e.g., 9 to 17)
        return currentTime >= startTime and currentTime <= endTime
    else
        -- Overnight range (e.g., 22 to 6)
        return currentTime >= startTime or currentTime <= endTime
    end
end

-- Usage examples
local currentTime = GetGameTime()

if IsTimeInRange(currentTime, 9, 17) then
    Log("It's business hours (9 AM - 5 PM)")
end

if IsTimeInRange(currentTime, 22, 6) then
    Log("It's overnight hours (10 PM - 6 AM)")
end
```

## Best Practices

1. **Cache Time Values**: When you need the same time value multiple times, store it in a variable
2. **Format Times for Display**: Always use `FormatGameTime()` when showing times to players
3. **Handle Day/Night Transitions**: Use the `OnTimeChanged` hook to detect day/night transitions
4. **Schedule Events**: Set up time-triggered events in the `OnTimeChanged` hook
5. **Think in 24-Hour Format**: The game uses 24-hour time internally (0-23)
6. **Check For Time Ranges**: Consider whether you need to check for times that span midnight

## Related Functions

- `OnTimeChanged(time)` - Lifecycle hook called when game time changes
- `OnDayChanged(day)` - Lifecycle hook called when game day changes
- All functions in the Time API are closely related 
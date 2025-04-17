# Time Events API

ScheduleLua provides a comprehensive event system for time-related events in Schedule I. This API allows scripts to register for various time-based events and respond to them appropriately.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic functionality works, but some advanced features are still in development.</p>
</div>

## Overview

The Time Events API enables scripts to:

- Register for time-based game events
- Schedule custom events to occur at specific game times
- Receive notifications about day/night transitions
- React to game calendar changes

## Event Hooks

### Time Change Events

The following hooks are called automatically when specific time events occur:

#### OnTimeChanged

Called when the game time changes significantly (not every minute).

```lua
function OnTimeChanged(oldTime, newTime)
    Log("Time changed from " .. FormatGameTime(oldTime) .. " to " .. FormatGameTime(newTime))
end
```

**Parameters:**
- `oldTime` (number): The previous game time
- `newTime` (number): The new game time

#### OnDayChanged

Called when the game day changes.

```lua
function OnDayChanged(oldDay, newDay)
    Log("Day changed from " .. oldDay .. " to " .. newDay)
end
```

**Parameters:**
- `oldDay` (number): The previous game day
- `newDay` (number): The new game day

#### OnNightBegin

Called when night begins (typically at sunset, around 7-8 PM).

```lua
function OnNightBegin()
    Log("Night has begun. Current time: " .. FormatGameTime(GetGameTime()))
end
```

#### OnDayBegin

Called when day begins (typically at sunrise, around 5-6 AM).

```lua
function OnDayBegin()
    Log("Day has begun. Current time: " .. FormatGameTime(GetGameTime()))
end
```

#### OnWeekChanged

Called when the game week changes.

```lua
function OnWeekChanged(oldWeek, newWeek)
    Log("Week changed from " .. oldWeek .. " to " .. newWeek)
end
```

**Parameters:**
- `oldWeek` (number): The previous game week
- `newWeek` (number): The new game week

## Time-Based Event Registration

### RegisterTimeEvent

Registers a function to be called at a specific game time.

```lua
RegisterTimeEvent(hour, minute, callback, repeating, dayOfWeek)
```

**Parameters:**
- `hour` (number): Hour of the day (0-23)
- `minute` (number): Minute of the hour (0-59)
- `callback` (function): The function to call when the time is reached
- `repeating` (boolean, optional): Whether the event should repeat daily (default: false)
- `dayOfWeek` (number, optional): Day of week to trigger on (0-6, Sunday is 0, default: any day)

**Returns:**
- `id` (number): Event ID that can be used to unregister the event

**Example:**
```lua
-- Register a one-time event for 9:30 PM
local eveningEventId = RegisterTimeEvent(21, 30, function()
    Log("It's 9:30 PM!")
end)

-- Register a repeating event for 6:00 AM every day
local morningEventId = RegisterTimeEvent(6, 0, function()
    Log("Good morning! It's 6:00 AM.")
end, true)

-- Register an event for 12:00 PM on Mondays only
local mondayLunchEventId = RegisterTimeEvent(12, 0, function()
    Log("It's Monday noon!")
end, true, 1)
```

### UnregisterTimeEvent

Removes a previously registered time event.

```lua
UnregisterTimeEvent(eventId)
```

**Parameters:**
- `eventId` (number): The event ID returned by RegisterTimeEvent

**Example:**
```lua
-- Stop the evening event from firing
UnregisterTimeEvent(eveningEventId)
```

### RegisterDailyEvent

Registers a function to be called at the same time every day.

```lua
RegisterDailyEvent(hour, minute, callback)
```

**Parameters:**
- `hour` (number): Hour of the day (0-23)
- `minute` (number): Minute of the hour (0-59)
- `callback` (function): The function to call daily

**Returns:**
- `id` (number): Event ID that can be used to unregister the event

**Example:**
```lua
-- Register a daily event at 8:00 AM
local dailyMorningEventId = RegisterDailyEvent(8, 0, function()
    Log("It's 8:00 AM. Time to start the day!")
end)
```

### RegisterWeeklyEvent

Registers a function to be called on specific days of the week.

```lua
RegisterWeeklyEvent(dayOfWeek, hour, minute, callback)
```

**Parameters:**
- `dayOfWeek` (number): Day of week (0-6, Sunday is 0)
- `hour` (number): Hour of the day (0-23)
- `minute` (number): Minute of the hour (0-59)
- `callback` (function): The function to call weekly

**Returns:**
- `id` (number): Event ID that can be used to unregister the event

**Example:**
```lua
-- Register an event for Fridays at 6:00 PM
local fridayEveningEventId = RegisterWeeklyEvent(5, 18, 0, function()
    Log("It's Friday evening! Weekend begins!")
end)
```

## Utility Functions

### GetNextTimeEvent

Returns the time until the next registered time event.

```lua
GetNextTimeEvent()
```

**Returns:**
- `minutes` (number): Minutes until the next event
- `eventId` (number): ID of the next event

**Example:**
```lua
local minutes, nextEventId = GetNextTimeEvent()
if minutes then
    Log("Next event (#" .. nextEventId .. ") will occur in " .. minutes .. " minutes")
end
```

### GetRegisteredEvents

Returns a list of all registered time events.

```lua
GetRegisteredEvents()
```

**Returns:**
- `events` (table): Array of event objects with fields:
  - `id` (number): Event ID
  - `hour` (number): Hour of the event
  - `minute` (number): Minute of the event
  - `repeating` (boolean): Whether the event repeats
  - `dayOfWeek` (number or nil): Day of week constraint (if any)

**Example:**
```lua
local events = GetRegisteredEvents()
for i, event in ipairs(events) do
    Log("Event #" .. event.id .. ": " .. event.hour .. ":" .. event.minute .. 
        (event.repeating and " (repeating)" or "") ..
        (event.dayOfWeek and " on day " .. event.dayOfWeek or ""))
end
```

## Curfew Events

The time events system integrates with the Curfew system. The following events are available:

### OnCurfewWarning

Called shortly before curfew begins (typically 30 minutes before).

```lua
function OnCurfewWarning()
    Log("WARNING: Curfew will begin soon!")
end
```

### OnCurfewBegin

Called when curfew begins.

```lua
function OnCurfewBegin()
    Log("NOTICE: Curfew is now in effect!")
end
```

### OnCurfewEnd

Called when curfew ends.

```lua
function OnCurfewEnd()
    Log("NOTICE: Curfew is now over.")
end
```

## Best Practices

### Efficient Event Usage

- Register only the events you need
- Unregister events when they're no longer needed
- For frequent checks, consider using the Update() function with time checks instead of many individual events

### Handling Game Load/Save

Time events persist across saves and loads. Be aware that:
- When a game is loaded, events might trigger immediately if their time has passed
- Consider using the OnSaveLoaded event to re-register time events to avoid unexpected behavior

### Example: Complete Time Events Script

```lua
-- Time Events Example

local eventIds = {}

function Initialize()
    Log("Time Events example initialized!")
    return true
end

function OnPlayerReady()
    -- Register a series of daily events
    table.insert(eventIds, RegisterDailyEvent(6, 0, function()
        Log("It's 6:00 AM. A good time to start the day.")
    end))
    
    table.insert(eventIds, RegisterDailyEvent(12, 0, function()
        Log("It's noon. Time for lunch.")
    end))
    
    table.insert(eventIds, RegisterDailyEvent(21, 0, function()
        Log("It's 9:00 PM. Consider wrapping up for the day.")
    end))
    
    -- Register a weekly event (Friday evening reminder)
    table.insert(eventIds, RegisterWeeklyEvent(5, 18, 0, function()
        Log("It's Friday evening! The weekend is here.")
    end))
    
    Log("Registered " .. #eventIds .. " time events")
    DisplayRegisteredEvents()
end

function DisplayRegisteredEvents()
    local events = GetRegisteredEvents()
    Log("Currently registered events:")
    for i, event in ipairs(events) do
        Log("Event #" .. event.id .. ": " .. event.hour .. ":" .. 
            string.format("%02d", event.minute) .. 
            (event.repeating and " (repeating)" or "") ..
            (event.dayOfWeek and " on day " .. event.dayOfWeek or ""))
    end
end

function OnDayBegin()
    Log("A new day has begun. Current game time: " .. FormatGameTime(GetGameTime()))
end

function OnNightBegin()
    Log("Night has fallen. Current game time: " .. FormatGameTime(GetGameTime()))
end

function OnTimeChanged(oldTime, newTime)
    -- Only log significant time changes (hourly)
    if math.floor(oldTime) ~= math.floor(newTime) then
        Log("Hour changed to " .. FormatGameTime(newTime))
    end
end

function Shutdown()
    -- Clean up by unregistering all events
    for i, eventId in ipairs(eventIds) do
        UnregisterTimeEvent(eventId)
    end
    Log("Unregistered all time events")
end
``` 
# NPC Schedule API

These functions allow you to access and manipulate NPC schedules, including their daily routines and activities.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Some functions are planned for future releases.</p>
</div>

## GetNPCSchedule

**Status:** 📅 Planned

**Signature:** `table GetNPCSchedule(NPC npc)`

**Description:** Gets the daily schedule of an NPC, showing their planned activities and locations throughout the day.

### Parameters

- `npc` (NPC): The NPC object to get the schedule for

### Returns

A table containing the NPC's daily schedule with entries for each time period:
- Each entry contains:
  - `time` (number): The game time when this activity starts
  - `endTime` (number): The game time when this activity ends
  - `activity` (string): The name of the activity (e.g., "Working", "Sleeping", "Eating")
  - `location` (string): The region or location name for this activity
  - `position` (Vector3): The target position for this activity

### Example

```lua
function OnPlayerReady()
    -- Find an NPC
    local shopkeeper = FindNPC("Shopkeeper")
    if shopkeeper then
        -- Get their schedule
        local schedule = GetNPCSchedule(shopkeeper)
        
        if schedule then
            Log("Shopkeeper's Schedule:")
            for i, entry in ipairs(schedule) do
                local timeStr = FormatGameTime(entry.time)
                local endTimeStr = FormatGameTime(entry.endTime)
                Log("- " .. timeStr .. " to " .. endTimeStr .. ": " .. 
                    entry.activity .. " at " .. entry.location)
            end
            
            -- Find when the shopkeeper goes home
            for i, entry in ipairs(schedule) do
                if entry.activity == "GoingHome" or entry.location == "Home" then
                    local timeStr = FormatGameTime(entry.time)
                    Log("Shopkeeper goes home at " .. timeStr)
                    break
                end
            end
        end
    end
end
```

### Notes

- This function is planned for a future release
- The schedule structure may change as development progresses
- Will be useful for creating time-dependent NPC interactions

## GetNPCCurrentActivity

**Status:** 📅 Planned

**Signature:** `table GetNPCCurrentActivity(NPC npc)`

**Description:** Gets the current activity that the NPC is engaged in.

### Parameters

- `npc` (NPC): The NPC object to get the current activity for

### Returns

A table containing information about the NPC's current activity:
- `activity` (string): The name of the activity
- `location` (string): The region or location name for this activity
- `startTime` (number): When this activity started
- `endTime` (number): When this activity will end
- `position` (Vector3): The target position for this activity

### Example

```lua
function Update()
    -- Find the mayor
    local mayor = FindNPC("Mayor")
    if mayor then
        -- Get current activity
        local activity = GetNPCCurrentActivity(mayor)
        
        if activity then
            -- Show notification if mayor is available for meeting
            if activity.activity == "OfficeHours" then
                ShowNotification("The Mayor is currently available for meetings!")
            elseif activity.activity == "Lunch" then
                local endTimeStr = FormatGameTime(activity.endTime)
                ShowNotification("The Mayor is at lunch until " .. endTimeStr)
            end
        end
    end
end
```

### Notes

- This function is planned for a future release
- Will be useful for creating gameplay that depends on NPC activities

## SetNPCScheduleEntry

**Status:** 📅 Planned

**Signature:** `boolean SetNPCScheduleEntry(NPC npc, number time, string activity, string location, Vector3 position)`

**Description:** Adds or modifies a schedule entry for an NPC.

### Parameters

- `npc` (NPC): The NPC object to modify the schedule for
- `time` (number): The game time when this activity should start
- `activity` (string): The name of the activity
- `location` (string): The region or location name for this activity
- `position` (Vector3): The target position for this activity

### Returns

`true` if the schedule entry was successfully set, `false` otherwise.

### Example

```lua
function OnPlayerReady()
    -- Find the blacksmith
    local blacksmith = FindNPC("Blacksmith")
    if blacksmith then
        -- Get blacksmith's normal position
        local position = GetNPCPosition(blacksmith)
        
        -- Add a lunch break to the blacksmith's schedule
        local lunchTime = 12 * 60 -- 12:00 PM
        SetNPCScheduleEntry(
            blacksmith, 
            lunchTime, 
            "Lunch", 
            "Tavern", 
            Vector3(120, 0, 80) -- Tavern coordinates
        )
        
        Log("Added lunch break to Blacksmith's schedule")
        
        -- Add another entry for returning to work
        local returnTime = 13 * 60 -- 1:00 PM
        SetNPCScheduleEntry(
            blacksmith, 
            returnTime, 
            "Working", 
            "Blacksmith", 
            position
        )
    end
end
```

### Notes

- This function is planned for a future release
- Modifying NPC schedules can have gameplay implications
- Some NPCs may have "fixed" schedule entries that cannot be modified

## ClearNPCSchedule

**Status:** 📅 Planned

**Signature:** `boolean ClearNPCSchedule(NPC npc)`

**Description:** Clears all schedule entries for an NPC, allowing you to build a new schedule from scratch.

### Parameters

- `npc` (NPC): The NPC object to clear the schedule for

### Returns

`true` if the schedule was successfully cleared, `false` otherwise.

### Example

```lua
function OnPlayerReady()
    -- Get all NPCs
    local npcs = GetAllNPCs()
    
    -- Find the bartender
    local bartender = nil
    for i, npc in pairs(npcs) do
        if npc.role == "Bartender" then
            bartender = npc
            break
        end
    end
    
    if bartender then
        -- Clear existing schedule
        if ClearNPCSchedule(bartender) then
            Log("Cleared bartender's schedule")
            
            -- Create custom schedule based on the day
            local gameDay = GetGameDayInt()
            
            if gameDay == 1 or gameDay == 7 then -- Weekend
                -- Weekend schedule
                SetNPCScheduleEntry(bartender, 10 * 60, "Opening", "Tavern", Vector3(120, 0, 80))
                SetNPCScheduleEntry(bartender, 22 * 60, "Closing", "Tavern", Vector3(120, 0, 80))
                Log("Set weekend schedule for bartender")
            else
                -- Weekday schedule
                SetNPCScheduleEntry(bartender, 14 * 60, "Opening", "Tavern", Vector3(120, 0, 80))
                SetNPCScheduleEntry(bartender, 24 * 60, "Closing", "Tavern", Vector3(120, 0, 80))
                Log("Set weekday schedule for bartender")
            end
        end
    end
end
```

### Notes

- This function is planned for a future release
- Some NPCs may have protected schedules that cannot be fully cleared
- Use with caution as it can significantly alter NPC behavior 
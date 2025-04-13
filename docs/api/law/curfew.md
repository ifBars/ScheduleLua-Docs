# Curfew System

The Curfew API provides functions for interacting with Schedule 1's curfew system, allowing scripts to respond to curfew state changes and create custom curfew-related scenarios.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic curfew detection is available, but custom curfew control is still in development.</p>
</div>

## Curfew Functions

### IsCurfewActive

**Signature:** `boolean IsCurfewActive()`

**Description:** Returns whether a curfew is currently active in the city.

### Parameters

None.

### Returns

- `boolean`: True if curfew is currently active, false otherwise.

### Example

```lua
function Update()
    if IsCurfewActive() then
        -- Do something during curfew hours
        ShowNotification("Curfew is active - be careful!")
    end
end
```

### Notes

- This function reflects the game's internal curfew state
- Curfew state can change based on game time and story progression

### RegisterCurfewChangeCallback

**Signature:** `void RegisterCurfewChangeCallback(function callback)`

**Description:** Registers a function to be called whenever the curfew status changes.

### Parameters

- `callback` (function): A function that will be called with a boolean parameter indicating the new curfew state (true when curfew becomes active, false when it ends)

### Returns

None.

### Example

```lua
-- Set up a callback when the script initializes
function OnInitialize()
    RegisterCurfewChangeCallback(function(isActive)
        if isActive then
            ShowNotification("WARNING: Curfew has begun!")
            -- Maybe play a sound, show UI indicator, etc.
        else
            ShowNotification("Curfew has ended.")
            -- Clear UI indicators, etc.
        end
    end)
end
```

### Notes

- This is useful for updating UI elements or altering script behavior when curfew changes
- The callback will be called immediately with the current state when registered
- Multiple callbacks can be registered from different scripts

### GetCurfewInfo

**Signature:** `table GetCurfewInfo()`

**Description:** Gets detailed information about the current curfew state and timing.

### Parameters

None.

### Returns

- `table`: A table containing information about the curfew with the following fields:
  - `active` (boolean): Whether curfew is currently active
  - `startHour` (number): The game hour when curfew begins (e.g., 22 for 10 PM)
  - `endHour` (number): The game hour when curfew ends (e.g., 6 for 6 AM)
  - `minutesUntilChange` (number): Minutes of game time until the next curfew state change

### Example

```lua
function DisplayCurfewInfo()
    local curfewInfo = GetCurfewInfo()
    
    local message = "Curfew Status:\n"
    message = message .. "Currently " .. (curfewInfo.active and "ACTIVE" or "inactive") .. "\n"
    message = message .. "Hours: " .. curfewInfo.startHour .. ":00 - " .. curfewInfo.endHour .. ":00\n"
    
    if curfewInfo.active then
        message = message .. "Ends in approximately " .. curfewInfo.minutesUntilChange .. " minutes"
    else
        message = message .. "Begins in approximately " .. curfewInfo.minutesUntilChange .. " minutes"
    end
    
    ShowDialogue("Curfew Information", message)
end

RegisterCommand("curfew", "Shows curfew information", "curfew", function(args)
    DisplayCurfewInfo()
end)
```

### Notes

- The timing information reflects the game's current curfew settings
- Game minutes are not the same as real-time minutes
- This function provides more detailed information than just checking if curfew is active

## Planned Features

The following features are planned for future updates:

- Setting custom curfew hours for specific districts
- Creating curfew violation events
- Configuring custom police responses to curfew violations
- Setting up curfew announcement systems
- Creating curfew safe zones

## Working with Curfew

The curfew system can be used to create interesting gameplay scenarios:

- Timing certain activities to avoid curfew hours
- Creating stealth challenges during curfew
- Establishing safe houses or hideouts for curfew hours
- Setting up underground businesses that only operate during curfew
- Creating missions that involve escorting NPCs to safety during curfew 
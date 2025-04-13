# Registry Storage API

These functions allow you to store and retrieve data in the ScheduleLua Registry.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Planned for future release. Current implementation is limited.</p>
</div>

## SetValue

**Status:** 🟡 Partial

**Signature:** `void SetValue(string key, any value, string namespace = nil)`

**Description:** Stores a value in the registry with the specified key. If the value already exists, it will be overwritten.

### Parameters

- `key` (string): The unique identifier for the stored value
- `value` (any): The value to store (string, number, boolean, table, or nil)
- `namespace` (string, optional): The namespace to use, defaults to the current script's name

### Returns

None.

### Example

```lua
-- Store simple values
SetValue("playerName", "Alex")
SetValue("playerLevel", 5)
SetValue("isFirstRun", false)

-- Store a table
local playerStats = {
    strength = 10,
    agility = 15,
    intelligence = 8,
    lastUpdated = GetGameTime()
}
SetValue("playerStats", playerStats)

-- Store a value in a specific namespace
SetValue("worldState", "peaceful", "gameState")
```

### Notes

- Keys are case-sensitive
- Setting a value to `nil` effectively removes it from the registry
- There is a size limit for individual values (particularly for tables)
- For large data sets, consider breaking them into smaller pieces

## GetValue

**Status:** 🟡 Partial

**Signature:** `any GetValue(string key, any defaultValue = nil, string namespace = nil)`

**Description:** Retrieves a value from the registry by its key. If the key doesn't exist, returns the defaultValue.

### Parameters

- `key` (string): The unique identifier for the stored value
- `defaultValue` (any, optional): Value to return if the key doesn't exist
- `namespace` (string, optional): The namespace to use, defaults to the current script's name

### Returns

The stored value, or defaultValue if the key doesn't exist.

### Example

```lua
-- Get simple values with defaults
local playerName = GetValue("playerName", "Unknown")
local playerLevel = GetValue("playerLevel", 1)
local isFirstRun = GetValue("isFirstRun", true)

Log("Player: " .. playerName)
Log("Level: " .. playerLevel)
Log("First run: " .. tostring(isFirstRun))

-- Get a stored table
local playerStats = GetValue("playerStats", {})
if playerStats.strength then
    Log("Player strength: " .. playerStats.strength)
end

-- Get a value from a specific namespace
local worldState = GetValue("worldState", "normal", "gameState")
Log("Current world state: " .. worldState)
```

### Notes

- Always provide a default value appropriate for the expected data type
- For tables, consider providing an empty table as default (`{}`)
- When getting a value that doesn't exist, no error is thrown - the default is returned

## DeleteValue

**Status:** 📅 Planned

**Signature:** `boolean DeleteValue(string key, string namespace = nil)`

**Description:** Removes a value from the registry.

### Parameters

- `key` (string): The unique identifier for the stored value to delete
- `namespace` (string, optional): The namespace to use, defaults to the current script's name

### Returns

`true` if the value was successfully deleted, `false` if the key didn't exist.

### Example

```lua
-- Delete a temporary value we no longer need
DeleteValue("tempCalculation")

-- Check if deletion was successful
if DeleteValue("playerCache") then
    Log("Player cache successfully cleared")
else
    Log("Player cache wasn't found")
end

-- Delete a value from a specific namespace
DeleteValue("debugFlag", "systemSettings")
```

### Notes

- Deleting a non-existent key is not considered an error
- Equivalent to calling `SetValue(key, nil)`
- Deleted values cannot be recovered unless backed up

## HasValue

**Status:** 📅 Planned

**Signature:** `boolean HasValue(string key, string namespace = nil)`

**Description:** Checks if a key exists in the registry.

### Parameters

- `key` (string): The unique identifier to check
- `namespace` (string, optional): The namespace to use, defaults to the current script's name

### Returns

`true` if the key exists, `false` otherwise.

### Example

```lua
-- Check if player has previously visited a location
if HasValue("visitedTown") then
    Log("Player has visited the town before")
else
    Log("This is the player's first visit to town")
    SetValue("visitedTown", true)
    
    -- Give first-time visitor rewards
    AddPlayerMoney(100)
    ShowNotification("Welcome to town! You received 100 gold as a welcome gift.")
end

-- Check in a specific namespace
if HasValue("tutorialCompleted", "onboarding") then
    -- Skip tutorial
else
    -- Show tutorial
end
```

### Notes

- More efficient than `GetValue` when you only need to check existence
- A key with value `nil` is considered non-existent

## ClearValues

**Status:** 📅 Planned

**Signature:** `void ClearValues(string namespace = nil)`

**Description:** Clears all stored values in the specified namespace.

### Parameters

- `namespace` (string, optional): The namespace to clear, defaults to the current script's name

### Returns

None.

### Example

```lua
-- Clear all values stored by the current script
ClearValues()

-- Create a reset command
RegisterCommand("reset", "Reset all script data", "reset", function(args)
    ClearValues()
    Log("All data has been reset")
    ShowNotification("All settings have been reset to default")
end)

-- Clear a specific namespace
ClearValues("tempData")
```

### Notes

- This operation cannot be undone - use with caution
- If no namespace is specified, only clears the current script's namespace
- Some protected values may not be cleared depending on implementation 
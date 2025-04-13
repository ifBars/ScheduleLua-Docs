# Data Storage

The Registry Data Storage API provides functions for storing and retrieving persistent data across game sessions in Schedule 1.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic storage functionality is available, but advanced features are still in development.</p>
</div>

## Storage Functions

### StoreValue

**Signature:** `boolean StoreValue(string key, any value)`

**Description:** Stores a value in the persistent registry under the specified key.

### Parameters

- `key` (string): A unique identifier for the stored value
- `value` (any): The value to store (can be string, number, boolean, or table)

### Returns

- `boolean`: True if the value was successfully stored, false otherwise

### Example

```lua
function SavePlayerProgress(level, score, inventory)
    -- Store individual values
    StoreValue("player_level", level)
    StoreValue("player_score", score)
    
    -- Store a complex table
    StoreValue("player_inventory", inventory)
    
    ShowNotification("Progress saved!")
end

-- Command to save current player stats
RegisterCommand("save", "Saves current player progress", "save", function(args)
    local playerLevel = GetPlayerLevel()
    local playerScore = GetPlayerScore()
    local playerInventory = GetPlayerInventory()
    
    SavePlayerProgress(playerLevel, playerScore, playerInventory)
end)
```

### Notes

- Values can be Lua strings, numbers, booleans, or tables
- Tables can contain nested tables, but with some limitations
- Keys are case-sensitive
- Each script has its own storage namespace to avoid conflicts

### GetValue

**Signature:** `any GetValue(string key, any defaultValue)`

**Description:** Retrieves a value from the persistent registry using the specified key.

### Parameters

- `key` (string): The unique identifier for the stored value
- `defaultValue` (any, optional): A default value to return if the key doesn't exist

### Returns

- `any`: The stored value, or the defaultValue if the key doesn't exist

### Example

```lua
function LoadPlayerProgress()
    -- Load individual values with defaults
    local level = GetValue("player_level", 1)
    local score = GetValue("player_score", 0)
    
    -- Load a complex table with default
    local inventory = GetValue("player_inventory", {})
    
    return {
        level = level,
        score = score,
        inventory = inventory
    }
end

-- Command to load player stats
RegisterCommand("load", "Loads saved player progress", "load", function(args)
    local progress = LoadPlayerProgress()
    
    -- Update player state with loaded values
    SetPlayerLevel(progress.level)
    SetPlayerScore(progress.score)
    RestorePlayerInventory(progress.inventory)
    
    ShowNotification("Progress loaded!")
end)
```

### Notes

- If the key doesn't exist and no defaultValue is provided, nil is returned
- The defaultValue parameter is useful for providing fallback values
- The returned value will be the same type as was stored (string, number, boolean, or table)

### DeleteValue

**Signature:** `boolean DeleteValue(string key)`

**Description:** Deletes a value from the persistent registry.

### Parameters

- `key` (string): The unique identifier for the stored value to delete

### Returns

- `boolean`: True if the value was successfully deleted or didn't exist, false if the deletion failed

### Example

```lua
function ResetPlayerProgress()
    -- Delete individual progress values
    DeleteValue("player_level")
    DeleteValue("player_score")
    DeleteValue("player_inventory")
    
    ShowNotification("Progress reset!")
end

-- Command to reset player progress
RegisterCommand("reset", "Resets saved player progress", "reset", function(args)
    -- Ask for confirmation before resetting
    ShowChoiceDialogue(
        "Confirm Reset",
        "Are you sure you want to reset all progress?",
        {"Yes, reset everything", "No, keep my progress"},
        function(choice)
            if choice == 1 then
                ResetPlayerProgress()
            end
        end
    )
end)
```

### Notes

- Deleting a non-existent key is not considered an error
- Once deleted, values cannot be recovered unless they were backed up elsewhere

### HasValue

**Signature:** `boolean HasValue(string key)`

**Description:** Checks if a key exists in the persistent registry.

### Parameters

- `key` (string): The unique identifier to check

### Returns

- `boolean`: True if the key exists, false otherwise

### Example

```lua
function CheckFirstRun()
    -- Check if this is the first time running
    if not HasValue("has_completed_tutorial") then
        ShowNotification("Welcome to your first time playing!")
        StartTutorial()
        
        -- Mark tutorial as completed for future sessions
        StoreValue("has_completed_tutorial", true)
    else
        ShowNotification("Welcome back!")
    end
}

-- Check first run when script initializes
function OnInitialize()
    CheckFirstRun()
end
```

### Notes

- This is more efficient than getting a value just to check for existence
- Useful for detecting first-run scenarios or checking optional settings

## Additional Features

### ListKeys

**Signature:** `table ListKeys(string prefix)`

**Description:** Returns a list of all keys in the registry that start with the specified prefix.

### Parameters

- `prefix` (string, optional): A prefix to filter keys by. If not provided, all keys are returned.

### Returns

- `table`: An array of key strings that match the prefix

### Example

```lua
function ListSavedGames()
    -- Get all keys starting with "savegame_"
    local saveKeys = ListKeys("savegame_")
    
    if #saveKeys == 0 then
        ShowNotification("No saved games found.")
        return
    end
    
    -- Display the saved games
    for i, key in ipairs(saveKeys) do
        local saveData = GetValue(key)
        Log("Save " .. i .. ": " .. saveData.name .. " (Level " .. saveData.level .. ")")
    end
}

-- Command to list saves
RegisterCommand("listsaves", "Lists all saved games", "listsaves", function(args)
    ListSavedGames()
end)
```

### Notes

- Useful for implementing save/load systems with multiple slots
- Can be used to iterate through related data
- Returns an empty table if no keys match the prefix 
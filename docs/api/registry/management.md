# Registry Management API

These functions allow you to manage the persistence of registry data, including saving to and loading from disk.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> In development. Basic functionality is being implemented.</p>
</div>

## SaveData

**Status:** 🔄 In Development

**Signature:** `boolean SaveData(string namespace = nil)`

**Description:** Saves the current registry data to disk for the specified namespace. If no namespace is provided, saves all namespaces.

### Parameters

- `namespace` (string, optional): The namespace to save, defaults to all namespaces

### Returns

`true` if the data was successfully saved, `false` otherwise.

### Example

```lua
-- Save all data
if SaveData() then
    Log("Successfully saved all registry data")
else
    LogError("Failed to save registry data")
end

-- Save only the player progress namespace
if SaveData("playerProgress") then
    Log("Player progress saved")
else
    LogError("Failed to save player progress")
end

-- Create an autosave function
function AutoSave()
    SaveData()
    Log("Autosave completed at: " .. FormatGameTime(GetGameTime()))
    
    -- Schedule next autosave in 5 minutes
    Wait(300, AutoSave)
end

-- Start autosave cycle
AutoSave()
```

### Notes

- Saving large amounts of data may cause a brief performance impact
- Data is saved to the game's save directory
- Registry data is automatically saved when the game exits normally
- Consider using this function at natural break points in gameplay

## LoadData

**Status:** 🔄 In Development

**Signature:** `boolean LoadData(string namespace = nil)`

**Description:** Loads registry data from disk for the specified namespace. If no namespace is provided, loads all namespaces.

### Parameters

- `namespace` (string, optional): The namespace to load, defaults to all namespaces

### Returns

`true` if the data was successfully loaded, `false` otherwise.

### Example

```lua
function Initialize()
    -- Load saved game data
    if LoadData() then
        Log("Successfully loaded registry data")
        
        -- Check if we have player settings
        local settings = GetValue("settings", {}, "playerSettings")
        if settings.musicVolume then
            Log("Loaded music volume: " .. settings.musicVolume)
        else
            Log("No saved settings found, using defaults")
        end
    else
        LogWarning("Failed to load registry data, using defaults")
    end
end

-- Load a specific namespace on demand
RegisterCommand("loadProgress", "Loads saved progress", "loadProgress", function(args)
    if LoadData("playerProgress") then
        ShowNotification("Progress loaded successfully")
    else
        ShowNotification("No saved progress found")
    end
end)
```

### Notes

- Registry data is automatically loaded when the game starts
- Manually loading data will overwrite any unsaved changes in memory
- If the save file is corrupt or missing, the function returns `false`
- Consider validating critical data after loading

## ExportData

**Status:** 📅 Planned

**Signature:** `boolean ExportData(string namespace, string filepath)`

**Description:** Exports registry data from the specified namespace to a JSON file at the given path.

### Parameters

- `namespace` (string): The namespace to export
- `filepath` (string): The path where the file should be saved

### Returns

`true` if the data was successfully exported, `false` otherwise.

### Example

```lua
function OnPlayerReady()
    -- Create a command to export player data
    RegisterCommand("exportPlayer", "Export player data to a file", "exportPlayer <filename>", function(args)
        if #args < 2 then
            Log("Usage: exportPlayer <filename>")
            return
        end
        
        local filename = args[2]
        if not filename:match("%.json$") then
            filename = filename .. ".json"
        end
        
        local filepath = "exports/" .. filename
        
        if ExportData("playerData", filepath) then
            ShowNotification("Player data exported to: " .. filepath)
            Log("Successfully exported player data")
        else
            ShowNotification("Failed to export player data")
            LogError("Export failed")
        end
    end)
end

-- Export game settings to share with other players
function ExportSettings()
    if ExportData("gameSettings", "exports/mySettings.json") then
        Log("Settings exported successfully")
    end
end
```

### Notes

- Useful for sharing configurations between players
- Files are saved in a human-readable JSON format
- Directory must exist for the export to succeed
- Exported files will not be automatically loaded by the game

## ImportData

**Status:** 📅 Planned

**Signature:** `boolean ImportData(string namespace, string filepath)`

**Description:** Imports registry data from a JSON file into the specified namespace.

### Parameters

- `namespace` (string): The namespace to import the data into
- `filepath` (string): The path to the file containing the data

### Returns

`true` if the data was successfully imported, `false` otherwise.

### Example

```lua
function OnPlayerReady()
    -- Create a command to import player data
    RegisterCommand("importPlayer", "Import player data from a file", "importPlayer <filename>", function(args)
        if #args < 2 then
            Log("Usage: importPlayer <filename>")
            return
        end
        
        local filename = args[2]
        if not filename:match("%.json$") then
            filename = filename .. ".json"
        end
        
        local filepath = "imports/" .. filename
        
        if ImportData("playerData", filepath) then
            ShowNotification("Player data imported successfully")
            Log("Successfully imported player data")
            
            -- Apply the imported data
            local playerName = GetValue("name", "Unknown", "playerData")
            Log("Imported player name: " .. playerName)
        else
            ShowNotification("Failed to import player data")
            LogError("Import failed - file may be missing or corrupt")
        end
    end)
end

-- Import community-made settings
function ImportCommunitySettings()
    if ImportData("gameSettings", "imports/communitySettings.json") then
        Log("Community settings imported")
        ShowNotification("Applied community settings")
    end
end
```

### Notes

- Be careful when importing unknown files as they may contain unexpected data
- The imported data will replace any existing data in the namespace
- Only imports valid JSON files with the expected structure
- Use this for cross-save functionality or sharing configurations

## MergeData

**Status:** 📅 Planned

**Signature:** `boolean MergeData(string sourceNamespace, string targetNamespace)`

**Description:** Merges data from one namespace into another, keeping existing values in the target namespace if they don't exist in the source.

### Parameters

- `sourceNamespace` (string): The namespace to merge from
- `targetNamespace` (string): The namespace to merge into

### Returns

`true` if the data was successfully merged, `false` otherwise.

### Example

```lua
function Initialize()
    -- Load default settings first
    if LoadData("defaultSettings") then
        -- Then merge with user's custom settings
        MergeData("defaultSettings", "userSettings")
        Log("Settings initialized with defaults and user preferences")
    else
        LogWarning("Failed to load default settings")
    end
}

-- Update settings while preserving user customizations
function UpdateGameSettings()
    -- Import new default settings
    ImportData("newDefaults", "system/newDefaults.json")
    
    -- Merge them with existing user settings
    MergeData("newDefaults", "userSettings")
    
    -- Use the merged settings as the active ones
    MergeData("userSettings", "activeSettings")
    
    ShowNotification("Game settings updated")
}
```

### Notes

- Only values that don't exist in the target will be copied from the source
- This is a non-destructive merge (doesn't overwrite existing values)
- Useful for applying default settings while preserving user customizations
- Complex nested tables are merged recursively 
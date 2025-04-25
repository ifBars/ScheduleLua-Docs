# World Map API

The Map API provides access to the game's world map, allowing mods to query and interact with regions, locations, and the overall game world.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic region functions are available.</p>
</div>

## Features

- Access to game regions and locations
- Check if player or NPCs are in specific regions
- Get information about map areas and boundaries

## Region Functions

### GetAllMapRegions

**Status:** ✅ Stable

**Signature:** `table GetAllMapRegions()`

**Description:** Gets a list of all available map regions in the game.

### Parameters

None.

### Returns

An array of strings containing the names of all map regions.

### Example

```lua
local regions = GetAllMapRegions()
Log("Available regions in the game:")
for i, region in pairs(regions) do
    Log("- " .. region)
end

-- Create a command to list regions
RegisterCommand("regions", "Lists all game regions", "regions", function(args)
    local regions = GetAllMapRegions()
    Log("All game regions:")
    for i, region in pairs(regions) do
        Log("- " .. region)
    end
end)
```

### Notes

- This function returns all regions defined in the game, even if they are currently empty
- Useful for validating region names for other region-related functions

## Examples

### Creating a Region Map

```lua
function CreateRegionMap()
    local regions = GetAllMapRegions()
    local regionData = {}
    
    Log("Building region map...")
    
    -- Collect data for each region
    for i, region in pairs(regions) do
        local npcsInRegion = GetNPCsInRegion(region)
        
        regionData[region] = {
            name = region,
            npcCount = #npcsInRegion,
            isPlayerHere = IsPlayerInRegion(region),
            npcs = {}
        }
        
        -- Store NPC names
        for j, npc in pairs(npcsInRegion) do
            table.insert(regionData[region].npcs, npc.fullName)
        end
    end
    
    -- Log the map info
    Log("Region Map:")
    for region, data in pairs(regionData) do
        local status = data.isPlayerHere and " (PLAYER HERE)" or ""
        Log("- " .. region .. status .. ": " .. data.npcCount .. " NPCs")
        
        if data.npcCount > 0 then
            for _, npc in pairs(data.npcs) do
                Log("  * " .. npc)
            end
        end
    end
    
    return regionData
end

-- Usage
function OnConsoleReady()
    RegisterCommand("map", "Creates a map of regions and NPCs", "map", function(args)
        CreateRegionMap()
    end)
end
```
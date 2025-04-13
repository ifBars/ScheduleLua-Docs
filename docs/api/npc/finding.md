# Finding NPCs

This section covers the functions used to find and get information about NPCs in Schedule 1.

## FindNPC

**Signature:** `NPC FindNPC(string npcName)`

**Description:** Finds and returns an NPC by name. This function is the primary way to locate a specific NPC in the game world.

### Parameters

- `npcName` (string): The name of the NPC to find

### Returns

An NPC object if found, or `nil` if no NPC with the given name exists.

### Example

```lua
function SayHelloToNPC(npcName)
    local npc = FindNPC(npcName)
    
    if npc then
        Log("Found NPC: " .. npcName)
        -- You can now use this NPC object with other functions
        local position = GetNPCPosition(npc)
        Log("NPC is at position: " .. position.x .. ", " .. position.y .. ", " .. position.z)
    else
        LogWarning("NPC not found: " .. npcName)
    end
end

-- Usage
SayHelloToNPC("Bob")
```

### Notes

- The NPC object returned can be used with other NPC functions like `GetNPCPosition`
- NPC names are case-sensitive
- Performance tip: Cache the NPC object if you need to use it repeatedly

## GetNPC

**Signature:** `Table GetNPC(string npcId)`

**Description:** Gets detailed information about an NPC by their identifier and returns it as a Lua table.

### Parameters

- `npcId` (string): The ID or name of the NPC

### Returns

A table containing NPC information with the following fields:
- `id` (string): The NPC's unique identifier
- `fullName` (string): The NPC's full name
- `isActive` (boolean): Whether the NPC is currently active in the game world
- `region` (string): The current region the NPC is in
- Additional fields may be available depending on the NPC type

Returns `nil` if the NPC is not found.

### Example

```lua
function DisplayNPCInfo(npcName)
    local npcInfo = GetNPC(npcName)
    
    if npcInfo then
        Log("----- NPC Information -----")
        Log("ID: " .. npcInfo.id)
        Log("Full Name: " .. npcInfo.fullName)
        Log("Active: " .. tostring(npcInfo.isActive))
        Log("Region: " .. (npcInfo.region or "Unknown"))
        
        -- Access any additional properties
        for key, value in pairs(npcInfo) do
            if type(value) ~= "table" and key ~= "id" and key ~= "fullName" and key ~= "isActive" and key ~= "region" then
                Log(key .. ": " .. tostring(value))
            end
        end
    else
        LogWarning("Could not get information for NPC: " .. npcName)
    end
end

-- Usage
DisplayNPCInfo("Bob")
```

### Notes

- This function is useful for getting detailed information without needing to use multiple separate function calls
- The table structure may be expanded in future updates with additional NPC properties

## GetNPCPosition

**Status:** 🔄 Partial

**Signature:** `table GetNPCPosition(userdata npc)`

**Description:** Gets the position of an NPC in the game world.

### Parameters

- `npc` (userdata): An NPC object reference (from `FindNPC`)

### Returns

A table containing the NPC's position as x, y, z coordinates:
- `x` (number): X coordinate
- `y` (number): Y coordinate
- `z` (number): Z coordinate

### Example

```lua
local npc = FindNPC("John")
if npc then
    local pos = GetNPCPosition(npc)
    if pos then
        Log("NPC position: X=" .. pos.x .. ", Y=" .. pos.y .. ", Z=" .. pos.z)
        
        -- Calculate distance to player
        local playerPos = GetPlayerPosition()
        if playerPos then
            local dx = playerPos.x - pos.x
            local dy = playerPos.y - pos.y
            local dz = playerPos.z - pos.z
            local distance = math.sqrt(dx*dx + dy*dy + dz*dz)
            Log("Distance to player: " .. distance)
        end
    else
        Log("Could not get NPC position")
    end
else
    Log("NPC not found")
end
```

### Notes

- Returns `nil` if the NPC reference is invalid
- The position is returned as a table with x, y, z properties

## GetNPCRegion

**Signature:** `string GetNPCRegion(string npcId)`

**Description:** Gets the name of the region that the specified NPC is currently in.

### Parameters

- `npcId` (string): The ID or name of the NPC

### Returns

A string containing the region name, or `nil` if the NPC is not found or not in any known region.

### Example

```lua
function CheckNPCLocation(npcName)
    local region = GetNPCRegion(npcName)
    
    if region then
        Log(npcName .. " is in the " .. region .. " region.")
        
        -- Check if player is in the same region
        local playerRegion = GetPlayerRegion()
        if playerRegion == region then
            Log("You are in the same region as " .. npcName)
        else
            Log("You are not in the same region as " .. npcName)
        end
    else
        LogWarning("Could not find " .. npcName .. " or they are not in any known region.")
    end
}

-- Usage
CheckNPCLocation("Bob")
```

### Notes

- Regions are designated areas in the game world with specific names
- This is more efficient than getting the NPC's position and then checking what region that position is in

## GetNPCsInRegion

**Signature:** `Table GetNPCsInRegion(string region)`

**Description:** Gets all NPCs currently located in the specified region.

### Parameters

- `region` (string): The name of the region to check

### Returns

A table (array) of NPC IDs that are in the specified region. Returns an empty table if no NPCs are found in the region.

### Example

```lua
function CountNPCsInRegions()
    -- Get all regions that have NPCs
    local regions = GetAllNPCRegions()
    
    if regions then
        for _, region in ipairs(regions) do
            local npcsInRegion = GetNPCsInRegion(region)
            local count = npcsInRegion and #npcsInRegion or 0
            
            Log(region .. ": " .. count .. " NPCs")
            
            -- List the first few NPCs in each region
            if count > 0 then
                local maxToShow = math.min(count, 3)
                for i = 1, maxToShow do
                    local npcInfo = GetNPC(npcsInRegion[i])
                    if npcInfo then
                        Log("  - " .. npcInfo.fullName)
                    else
                        Log("  - " .. npcsInRegion[i])
                    end
                end
                
                if count > maxToShow then
                    Log("  - ...and " .. (count - maxToShow) .. " more")
                end
            end
        end
    else
        Log("Could not retrieve region information.")
    end
}

-- Usage
CountNPCsInRegions()
```

### Notes

- Region names are case-sensitive
- If the region doesn't exist, an empty table is returned
- This is useful for finding NPCs in the player's vicinity

## GetAllNPCRegions

**Signature:** `Table GetAllNPCRegions()`

**Description:** Gets a list of all regions that currently contain at least one NPC.

### Parameters

None.

### Returns

A table (array) of region names, or `nil` if no regions with NPCs are found.

### Example

```lua
function MapNPCDistribution()
    local regions = GetAllNPCRegions()
    
    if regions and #regions > 0 then
        Log("NPCs are distributed across " .. #regions .. " regions:")
        
        local distribution = {}
        local totalNPCs = 0
        
        for _, region in ipairs(regions) do
            local npcsInRegion = GetNPCsInRegion(region)
            local count = npcsInRegion and #npcsInRegion or 0
            
            distribution[region] = count
            totalNPCs = totalNPCs + count
        end
        
        -- Sort regions by NPC count
        local sortedRegions = {}
        for region, _ in pairs(distribution) do
            table.insert(sortedRegions, region)
        end
        
        table.sort(sortedRegions, function(a, b)
            return distribution[a] > distribution[b]
        end)
        
        -- Display sorted results
        for _, region in ipairs(sortedRegions) do
            local percentage = math.floor((distribution[region] / totalNPCs) * 100)
            Log(region .. ": " .. distribution[region] .. " NPCs (" .. percentage .. "%)")
        end
    else
        Log("No regions with NPCs found.")
    end
}

-- Usage
MapNPCDistribution()
```

### Notes

- This function is useful for getting an overview of where NPCs are located
- Only regions that currently have at least one NPC will be included
- Empty regions will not appear in the list

## IsNPCInRegion

**Signature:** `bool IsNPCInRegion(string npcId, string region)`

**Description:** Checks if a specific NPC is currently in the specified region.

### Parameters

- `npcId` (string): The ID or name of the NPC
- `region` (string): The name of the region to check

### Returns

`true` if the NPC is in the specified region, `false` otherwise (including if the NPC or region doesn't exist).

### Example

```lua
function CheckImportantNPCLocations()
    local importantNPCs = {"Bob", "Alice", "Charlie"}
    local targetRegion = "Downtown"
    
    Log("Checking which NPCs are in " .. targetRegion .. ":")
    
    for _, npcName in ipairs(importantNPCs) do
        if IsNPCInRegion(npcName, targetRegion) then
            Log("- " .. npcName .. " is in " .. targetRegion)
        else
            local actualRegion = GetNPCRegion(npcName)
            if actualRegion then
                Log("- " .. npcName .. " is in " .. actualRegion .. " instead")
            else
                LogWarning("- " .. npcName .. " was not found")
            end
        end
    end
}

-- Usage
CheckImportantNPCLocations()
```

### Notes

- This is more efficient than getting the NPC's region and then comparing it
- Both NPC ID and region names are case-sensitive
- Returns `false` if either the NPC or region doesn't exist

## Best Practices

- **Cache NPC objects:** If you need to work with the same NPC multiple times, save the result of `FindNPC()` to avoid repeated lookups
- **Check for nil:** Always check if `FindNPC()` or `GetNPC()` returned a valid object before using it
- **Region awareness:** Use region-based functions when possible instead of position-based checks for better performance
- **Handle non-existent NPCs:** Add proper error handling for cases where NPCs might not exist
- **Limit processing in Update:** Be careful when calling NPC functions in the `Update()` function as it runs every frame 
# Finding NPCs

This section covers the functions used to find and get information about NPCs in Schedule 1.

## GetNPC

**Signature:** `NPCProxy GetNPC(string npcId)`

**Description:** Gets an NPC object by ID. This function is the primary way to locate a specific NPC in the game world.

### Parameters

- `npcId` (string): The unique identifier of the NPC to find

### Returns

An NPCProxy object if found, or `nil` if no NPC with the given ID exists.

### Example

```lua
function SayHelloToNPC(npcId)
    local npc = GetNPC(npcId)
    
    if npc then
        Log("Found NPC with ID: " .. npcId)
        Log("NPC full name: " .. npc.FullName)
        
        -- You can now use this NPC object with other functions
        local position = GetNPCPosition(npc)
        Log("NPC is at position: " .. position.x .. ", " .. position.y .. ", " .. position.z)
    else
        LogWarning("NPC not found: " .. npcId)
    end
end

-- Usage
SayHelloToNPC("doris_lubbin")
```

### Notes

- The NPCProxy object returned can be used with other NPC functions like `GetNPCPosition`
- NPC IDs are case-sensitive
- Performance tip: Cache the NPC object if you need to use it repeatedly
- The returned object is an NPCProxy, which provides controlled access to NPC properties

## GetNPCState

**Signature:** `Table GetNPCState(string npcId)`

**Description:** Gets detailed information about an NPC by their identifier and returns it as a Lua table.

### Parameters

- `npcId` (string): The ID of the NPC

### Returns

A table containing NPC information with the following fields:
- `id` (string): The NPC's unique identifier
- `fullName` (string): The NPC's full name
- `isConscious` (boolean): Whether the NPC is currently conscious
- `region` (string): The current region the NPC is in
- `position` (table): A table with x, y, z coordinates of the NPC's position
- `isMoving` (boolean): Whether the NPC is currently moving (if applicable)

Returns `nil` if the NPC is not found.

### Example

```lua
function DisplayNPCInfo(npcId)
    local npcState = GetNPCState(npcId)
    
    if npcState then
        Log("----- NPC Information -----")
        Log("ID: " .. npcState.id)
        Log("Full Name: " .. npcState.fullName)
        Log("Conscious: " .. tostring(npcState.isConscious))
        Log("Region: " .. (npcState.region or "Unknown"))
        
        if npcState.position then
            Log("Position: X=" .. npcState.position.x .. 
                ", Y=" .. npcState.position.y .. 
                ", Z=" .. npcState.position.z)
        end
        
        if npcState.isMoving ~= nil then
            Log("Moving: " .. tostring(npcState.isMoving))
        end
        
        -- Access any additional properties
        for key, value in pairs(npcState) do
            if type(value) ~= "table" and 
               key ~= "id" and 
               key ~= "fullName" and 
               key ~= "isConscious" and 
               key ~= "region" and 
               key ~= "isMoving" then
                Log(key .. ": " .. tostring(value))
            end
        end
    else
        LogWarning("Could not get information for NPC: " .. npcId)
    end
end

-- Usage
DisplayNPCInfo("bob_001")
```

### Notes

- This function is useful for getting detailed information without needing to use multiple separate function calls
- The table structure may be expanded in future updates with additional NPC properties
- As an alternative, you can access these properties directly from the NPCProxy returned by GetNPC, for example: `npc.FullName` or `npc.IsConscious`

## GetNPCPosition

**Status:** 🔄 Partial

**Signature:** `Vector3Proxy GetNPCPosition(NPCProxy npc)`

**Description:** Gets the position of an NPC in the game world.

### Parameters

- `npc` (NPCProxy): An NPCProxy object reference (from `GetNPC`)

### Returns

A Vector3Proxy object containing the NPC's position with x, y, and z coordinates.

Returns Vector3.zero (0,0,0) if the NPC is invalid.

### Example

```lua
local npc = GetNPC("bob_001")
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

- Returns Vector3.zero (0,0,0) if the NPC reference is invalid
- The returned position is a Vector3Proxy object with x, y, and z properties

## GetNPCRegion

**Signature:** `string GetNPCRegion(string npcId)`

**Description:** Gets the name of the region that the specified NPC is currently in.

### Parameters

- `npcId` (string): The ID of the NPC

### Returns

A string containing the region name, or `nil` if the NPC is not found or not in any known region.

### Example

```lua
function CheckNPCLocation(npcId)
    local region = GetNPCRegion(npcId)
    
    if region then
        Log("NPC with ID " .. npcId .. " is in the " .. region .. " region.")
        
        -- Check if player is in the same region
        local playerRegion = GetPlayerRegion()
        if playerRegion == region then
            Log("You are in the same region as this NPC")
        else
            Log("You are not in the same region as this NPC")
        end
    else
        LogWarning("Could not find NPC with ID " .. npcId .. " or they are not in any known region.")
    end
}

-- Usage
CheckNPCLocation("bob_001")
```

### Notes

- Regions are designated areas in the game world with specific names
- This is more efficient than getting the NPC's position and then checking what region that position is in
- Alternatively, you can access the region directly from an NPCProxy: `local region = npc.Region`

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

- **Cache NPC objects:** If you need to work with the same NPC multiple times, save the result of `GetNPC()` to avoid repeated lookups
- **Check for nil:** Always check if `GetNPC()` returned a valid object before using it
- **Region awareness:** Use region-based functions when possible instead of position-based checks for better performance
- **Handle non-existent NPCs:** Add proper error handling for cases where NPCs might not exist
- **Limit processing in Update:** Be careful when calling NPC functions in the `Update()` function as it runs every frame 
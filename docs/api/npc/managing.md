# Managing NPCs

These functions allow you to manage and modify NPCs in the game world.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> In Progress. Only basic management functions are currently available.</p>
</div>

## GetNPCPosition

**Signature:** `Vector3Proxy GetNPCPosition(NPC npc)`

**Description:** Gets the current position of an NPC in the game world as a Vector3 object.

### Parameters

- `npc` (NPC): An NPC object obtained from `FindNPC()`

### Returns

A Vector3Proxy object containing the NPC's position with x, y, and z coordinates.

Returns Vector3.zero (0,0,0) if the NPC is invalid.

### Example

```lua
function GetDistanceToNPC(npcName)
    local npc = FindNPC(npcName)
    if not npc then
        LogWarning("NPC not found: " .. npcName)
        return -1
    end
    
    local npcPosition = GetNPCPosition(npc)
    local playerPosition = GetPlayerPosition()
    
    local distance = Vector3Distance(npcPosition, playerPosition)
    Log("Distance to " .. npcName .. ": " .. distance .. " units")
    
    return distance
end

-- Usage
RegisterCommand("distance", "Shows distance to an NPC", "distance [npcName]", function(args)
    if not args[2] then
        LogError("Please specify an NPC name")
        return
    end
    
    GetDistanceToNPC(args[2])
end)
```

### Notes

- This function requires an NPC object from `FindNPC()`, not just an NPC ID
- The returned Vector3Proxy has x, y, and z properties
- Returns (0,0,0) for invalid NPCs rather than throwing an error

## SetNPCPosition

**Signature:** `void SetNPCPosition(NPC npc, float x, float y, float z)`

**Description:** Sets the position of an NPC to the specified coordinates in the game world.

### Parameters

- `npc` (NPC): An NPC object obtained from `FindNPC()`
- `x` (float): The X coordinate
- `y` (float): The Y coordinate (height)
- `z` (float): The Z coordinate

### Returns

None.

### Example

```lua
function TeleportNPCToPlayer(npcName, offset)
    local npc = FindNPC(npcName)
    if not npc then
        LogError("NPC not found: " .. npcName)
        return false
    end
    
    offset = offset or 1.0 -- Default offset if none specified
    
    local playerPos = GetPlayerPosition()
    SetNPCPosition(npc, 
        playerPos.x + offset, 
        playerPos.y,         -- Same height as player
        playerPos.z + offset)
    
    Log("Teleported " .. npcName .. " to player's location")
    return true
end

-- Usage
RegisterCommand("tpnpc", "Teleports an NPC to you", "tpnpc [npcName] [offset]", function(args)
    if not args[2] then
        LogError("Please specify an NPC name")
        return
    end
    
    local offset = tonumber(args[3]) or 1.0
    TeleportNPCToPlayer(args[2], offset)
end)
```

### Notes

- This function immediately teleports the NPC to the new position
- Moving NPCs may affect their AI behavior or scheduled activities
- Some NPCs might have movement restrictions in the game that could override this function
- This function is experimental and may not work with all NPCs

## Creating NPC Formations

You can use the NPC position functions to create formations of NPCs:

```lua
function ArrangeNPCsInCircle(npcNames, centerX, centerZ, radius)
    -- Check if we have a valid list of NPCs
    if not npcNames or #npcNames == 0 then
        LogError("No NPCs specified for circle formation")
        return
    end
    
    -- If no center specified, use player's position
    if not centerX or not centerZ then
        local playerPos = GetPlayerPosition()
        centerX = playerPos.x
        centerZ = playerPos.z
    end
    
    radius = radius or 5.0 -- Default radius
    
    -- Arrange NPCs in a circle
    local angleStep = (2 * math.pi) / #npcNames
    
    for i, npcName in ipairs(npcNames) do
        local npc = FindNPC(npcName)
        if npc then
            local angle = angleStep * (i - 1)
            local x = centerX + radius * math.cos(angle)
            local z = centerZ + radius * math.sin(angle)
            
            -- Get the NPC's current position to maintain the same height
            local currentPos = GetNPCPosition(npc)
            
            SetNPCPosition(npc, x, currentPos.y, z)
            Log("Positioned " .. npcName .. " in circle formation")
        else
            LogWarning("Could not find NPC: " .. npcName)
        end
    end
    
    Log("Arranged " .. #npcNames .. " NPCs in a circle formation")
end

-- Usage
RegisterCommand("circle", "Arranges NPCs in a circle around you", "circle [radius] [npc1] [npc2] ...", function(args)
    if #args < 3 then
        LogError("Please specify a radius and at least one NPC name")
        return
    end
    
    local radius = tonumber(args[2])
    local npcs = {}
    
    for i = 3, #args do
        table.insert(npcs, args[i])
    end
    
    ArrangeNPCsInCircle(npcs, nil, nil, radius)
end)
```

## NPC Following Behavior

You can create scripts to make NPCs follow the player or other NPCs:

```lua
-- Global variables to track following NPCs
local followingNPCs = {}
local isFollowingActive = false

function StartNPCFollowing(npcName, distance)
    local npc = FindNPC(npcName)
    if not npc then
        LogError("NPC not found: " .. npcName)
        return false
    end
    
    -- Add NPC to following list with desired following distance
    followingNPCs[npcName] = {
        npc = npc,
        distance = distance or 2.0,
        lastUpdateTime = 0 -- Used to throttle position updates
    }
    
    -- Activate following system if this is the first NPC
    if not isFollowingActive then
        isFollowingActive = true
        Log("NPC following system activated")
    end
    
    Log(npcName .. " is now following you (distance: " .. followingNPCs[npcName].distance .. ")")
    return true
end

function StopNPCFollowing(npcName)
    if npcName then
        -- Stop specific NPC from following
        if followingNPCs[npcName] then
            followingNPCs[npcName] = nil
            Log(npcName .. " has stopped following you")
        else
            LogWarning(npcName .. " was not following you")
        end
    else
        -- Stop all NPCs from following
        followingNPCs = {}
        Log("All NPCs have stopped following you")
    end
    
    -- If no NPCs are following, deactivate system
    if next(followingNPCs) == nil then
        isFollowingActive = false
        Log("NPC following system deactivated")
    end
end

function Update()
    -- Only process if following is active
    if not isFollowingActive then
        return
    end
    
    -- Get player position
    local playerPos = GetPlayerPosition()
    local currentTime = os.time()
    
    -- Update each following NPC position
    for npcName, data in pairs(followingNPCs) do
        -- Throttle updates to avoid excessive position changes (every 0.5 seconds)
        if currentTime - data.lastUpdateTime >= 0.5 then
            local npcPos = GetNPCPosition(data.npc)
            
            -- Calculate direction vector from NPC to player
            local dirX = playerPos.x - npcPos.x
            local dirZ = playerPos.z - npcPos.z
            
            -- Calculate distance
            local distance = math.sqrt(dirX*dirX + dirZ*dirZ)
            
            -- Only move if NPC is too far from desired following distance
            if distance > data.distance + 1.0 then
                -- Normalize direction vector
                local normFactor = data.distance / distance
                
                -- Calculate new position that's [followDistance] units away from player
                local newX = playerPos.x - dirX * normFactor
                local newZ = playerPos.z - dirZ * normFactor
                
                -- Update NPC position, maintaining their current height
                SetNPCPosition(data.npc, newX, npcPos.y, newZ)
                
                -- Update last update time
                followingNPCs[npcName].lastUpdateTime = currentTime
            end
        end
    end
end

-- Command to make an NPC follow you
RegisterCommand("follow", "Makes an NPC follow you", "follow [npcName] [distance]", function(args)
    if not args[2] then
        LogError("Please specify an NPC name")
        return
    end
    
    local distance = tonumber(args[3]) or 2.0
    StartNPCFollowing(args[2], distance)
end)

-- Command to stop NPCs from following
RegisterCommand("stopfollow", "Stops an NPC from following you", "stopfollow [npcName]", function(args)
    StopNPCFollowing(args[2]) -- If args[2] is nil, all NPCs will stop following
end)
```

## Best Practices for NPC Management

- **Respect the game world**: Teleporting NPCs to unreachable locations may cause gameplay issues
- **Update throttling**: When moving NPCs frequently (like in the follow example), throttle your updates to avoid performance issues
- **Error handling**: Always check if the NPC exists before trying to manipulate its position
- **Maintain the Y coordinate**: When moving NPCs horizontally, consider keeping their current Y position to avoid placing them inside terrain or floating in the air
- **Position validation**: Consider adding safety checks to ensure you're not positioning NPCs out of bounds
- **Performance awareness**: Manipulating many NPCs simultaneously can impact performance
- **Release tracking**: If you're tracking NPCs in a table (like in the follow example), make sure to remove them when they're no longer needed

## Upcoming NPC Management Functions

The following functions are planned for future updates:

### SpawnNPC

**Status:** 📝 Planned

**Signature:** `userdata SpawnNPC(string npcTemplate, number x, number y, number z)`

**Description:** Spawns a new NPC of the specified template at the given coordinates.

### RemoveNPC

**Status:** 📝 Planned

**Signature:** `boolean RemoveNPC(userdata npc)`

**Description:** Removes an NPC from the game world.

### SetNPCBehavior

**Status:** 📝 Planned

**Signature:** `void SetNPCBehavior(userdata npc, string behaviorType)`

**Description:** Changes an NPC's current behavior to the specified type.

### SetNPCSchedule

**Status:** 📝 Planned

**Signature:** `void SetNPCSchedule(userdata npc, table scheduleData)`

**Description:** Sets a custom schedule for an NPC to follow. 
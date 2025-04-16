# Managing NPCs

These functions allow you to manage and modify NPCs in the game world.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> In Progress. Only basic management functions are currently available.</p>
</div>

## GetNPCPosition

**Signature:** `Vector3Proxy GetNPCPosition(NPCProxy npc)`

**Description:** Gets the current position of an NPC in the game world as a Vector3Proxy object.

### Parameters

- `npc` (NPCProxy): An NPCProxy object obtained from `GetNPC()`

### Returns

A Vector3Proxy object containing the NPC's position with x, y, and z coordinates.

Returns Vector3.zero (0,0,0) if the NPC is invalid.

### Example

```lua
function GetDistanceToNPC(npcId)
    local npc = GetNPC(npcId)
    if not npc then
        LogWarning("NPC not found: " .. npcId)
        return -1
    end
    
    local npcPosition = GetNPCPosition(npc)
    local playerPosition = GetPlayerPosition()
    
    local distance = Vector3Distance(npcPosition, playerPosition)
    Log("Distance to NPC with ID " .. npcId .. ": " .. distance .. " units")
    
    return distance
end

-- Register command after the console is ready
function OnConsoleReady()
    RegisterCommand(
        "npc_distance",  -- Command name (avoid conflicting with built-in commands)
        "Shows distance to an NPC", -- Description
        "npc_distance <npcId>", -- Usage example
        function(args)
            if not args[2] then
                LogError("Please specify an NPC ID")
                return
            end
            
            GetDistanceToNPC(args[2])
        end
    )
    
    Log("NPC distance command registered successfully")
end
```

### Notes

- This function requires an NPCProxy object from `GetNPC()`, not just an NPC ID
- The returned Vector3Proxy has x, y, and z properties
- Returns (0,0,0) for invalid NPCs rather than throwing an error

## SetNPCPosition

**Status:** ⚠️ In Development

**Signature:** `void SetNPCPosition(NPCProxy npc, float x, float y, float z)`

**Description:** Sets the position of an NPC to the specified coordinates in the game world.

<div class="custom-block danger">
  <p><strong>Important Notice:</strong> This function is still in active development and might not work as intended in the current version. NPC position setting may not behave correctly or may have no effect.</p>
</div>

### Parameters

- `npc` (NPCProxy): An NPCProxy object obtained from `GetNPC()`
- `x` (float): The X coordinate
- `y` (float): The Y coordinate (height)
- `z` (float): The Z coordinate

### Returns

None.

### Example

```lua
-- NOTE: This example is provided for future reference, but the function
-- is currently still in development and may not work as intended

function TeleportNPCToPlayer(npcId, offset)
    local npc = GetNPC(npcId)
    if not npc then
        LogError("NPC not found: " .. npcId)
        return false
    end
    
    offset = offset or 1.0 -- Default offset if none specified
    
    local playerPos = GetPlayerPosition()
    SetNPCPosition(npc, 
        playerPos.x + offset, 
        playerPos.y,         -- Same height as player
        playerPos.z + offset)
    
    Log("Attempted to teleport NPC with ID " .. npcId .. " to player's location")
    Log("Note: SetNPCPosition is still in development and may not work correctly")
    return true
end

-- Register command after the console is ready
function OnConsoleReady()
    RegisterCommand(
        "npc_teleport",  -- Command name with prefix to avoid conflicts
        "Attempts to teleport an NPC to your location", 
        "npc_teleport <npcId> [offset]", 
        function(args)
            if not args[2] then
                LogError("Please specify an NPC ID")
                return
            end
            
            local offset = tonumber(args[3]) or 1.0
            local success = TeleportNPCToPlayer(args[2], offset)
            
            if success then
                Log("Teleport command executed successfully")
            else
                LogError("Failed to teleport NPC")
            end
        end
    )
    
    Log("NPC teleport command registered successfully")
end
```

### Notes

- This function is currently in development and may not work as intended
- In the current implementation, NPCs may not move or may behave unpredictably when their position is set
- NPC movement is generally controlled by the game's AI and pathfinding systems
- Some NPCs have fixed positions or movement patterns that override manual position settings
- Future updates will improve the reliability of this function

## Potential Future Feature: Creating NPC Formations

<div class="custom-block warning">
  <p><strong>Concept Only:</strong> This example demonstrates a potential future use of the NPC positioning API once it's fully implemented. The current API does not reliably support this functionality.</p>
</div>

The following example shows how you might arrange NPCs in a circle formation, which could be possible in the future once the SetNPCPosition function is fully implemented:

```lua
-- NOTE: This is a conceptual example that depends on SetNPCPosition
-- which is still in development and might not work as intended

function ArrangeNPCsInCircle(npcIds, centerX, centerZ, radius)
    -- Check if we have a valid list of NPCs
    if not npcIds or #npcIds == 0 then
        LogError("No NPCs specified for circle formation")
        return false
    end
    
    LogWarning("Note: The SetNPCPosition function is still in development and may not work correctly")
    
    -- If no center specified, use player's position
    if not centerX or not centerZ then
        local playerPos = GetPlayerPosition()
        centerX = playerPos.x
        centerZ = playerPos.z
    end
    
    radius = radius or 5.0 -- Default radius
    
    -- Arrange NPCs in a circle
    local angleStep = (2 * math.pi) / #npcIds
    
    for i, npcId in ipairs(npcIds) do
        local npc = GetNPC(npcId)
        if npc then
            local angle = angleStep * (i - 1)
            local x = centerX + radius * math.cos(angle)
            local z = centerZ + radius * math.sin(angle)
            
            -- Get the NPC's current position to maintain the same height
            local currentPos = GetNPCPosition(npc)
            
            SetNPCPosition(npc, x, currentPos.y, z)
            Log("Attempted to position NPC with ID " .. npcId .. " in circle formation")
        else
            LogWarning("Could not find NPC: " .. npcId)
        end
    end
    
    Log("Attempted to arrange " .. #npcIds .. " NPCs in a circle formation")
    return true
end

-- Register command only after the console is ready
function OnConsoleReady()
    RegisterCommand(
        "npc_formation_circle",
        "Arranges NPCs in a circle around the player or specified position",
        "npc_formation_circle <npcId1,npcId2,...> [radius]",
        function(args)
            if not args[2] then
                LogError("Please specify NPC IDs separated by commas")
                return
            end
            
            -- Parse the comma-separated list of NPC IDs
            local npcIds = {}
            for id in string.gmatch(args[2], "([^,]+)") do
                table.insert(npcIds, id)
            end
            
            -- Get optional radius
            local radius = tonumber(args[3]) or 5.0
            
            -- Use player position as center
            local result = ArrangeNPCsInCircle(npcIds, nil, nil, radius)
            
            if not result then
                LogError("Failed to create NPC formation")
            end
        end
    )
    
    Log("NPC formation command registered successfully")
end
```

## Best Practices for NPC Management

- **Respect the game world**: Teleporting NPCs to unreachable locations may cause gameplay issues
- **Update throttling**: When moving NPCs frequently, throttle your updates to avoid performance issues
- **Error handling**: Always check if the NPC exists before trying to manipulate its position
- **Maintain the Y coordinate**: When moving NPCs horizontally, consider keeping their current Y position to avoid placing them inside terrain or floating in the air
- **Position validation**: Consider adding safety checks to ensure you're not positioning NPCs out of bounds
- **Performance awareness**: Manipulating many NPCs simultaneously can impact performance
- **Be aware of limitations**: Currently, NPC positioning functions are still in development and may not work reliably

## Best Practices for Command Registration

- **Register commands in `OnConsoleReady`**: Always register commands after the console is ready to avoid conflicts with native game commands
- **Use prefixes for commands**: Consider using prefixes like `npc_` to avoid conflicts with built-in game commands
- **Provide clear descriptions**: Include descriptive help text and usage examples to make commands user-friendly
- **Include error handling**: Check for missing arguments and provide helpful error messages
- **Return feedback**: Let users know if the command succeeded or failed
- **Check command existence**: Avoid registering commands that might already exist
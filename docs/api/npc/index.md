# NPC API

The NPC API provides functions for finding, managing, and interacting with non-player characters (NPCs) in Schedule 1. This includes locating NPCs by ID, getting their positions, checking their regions, and more.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic NPC functions are working, but advanced interaction features are still in development.</p>
</div>

## Available Functions

### Finding NPCs

- [`GetNPC(npcId)`](./finding.md#getnpc) - Gets an NPC object by ID
- [`GetNPCState(npcId)`](./finding.md#getnpcstate) - Gets NPC information as a Lua table
- [`GetAllNPCs()`](./finding.md#getallnpcs) - Gets a list of all NPCs in the game

### NPC Location and Movement

- [`GetNPCPosition(npc)`](./managing.md#getnpcposition) - Gets the position of an NPC
- [`SetNPCPosition(npc, x, y, z)`](./managing.md#setnpcposition) - Sets the position of an NPC ⚠️ (In Development)
- [`GetNPCRegion(npcId)`](./managing.md#getnpcregion) - Gets the region an NPC is currently in
- [`IsNPCInRegion(npcId, region)`](./managing.md#isnpcinregion) - Checks if an NPC is in a specific region
- [`GetNPCsInRegion(region)`](./managing.md#getnpcsinregion) - Gets all NPCs in a specific region
- [`GetAllNPCRegions()`](./managing.md#getallnpcregions) - Gets a list of all regions that contain NPCs

## NPCProxy Type

To improve compatibility with the Lua scripting system, NPCs are now wrapped in an `NPCProxy` type that exposes only the necessary properties and functions while hiding complex internal implementation details. This provides better stability, especially on IL2CPP/AOT platforms once ScheduleLua supports it.

The `NPCProxy` type provides these properties:
- `ID` - The unique identifier of the NPC
- `FullName` - The NPC's full name
- `IsConscious` - Whether the NPC is currently conscious
- `Region` - The region the NPC is currently in
- `IsMoving` - Whether the NPC is currently moving

## Example Usage

### Basic NPC Lookup and Information

```lua
function Initialize()
    -- Get a specific NPC by ID
    local npc = GetNPC("bob_001")
    if npc then
        Log("Found NPC: Bob")
        
        -- Get NPC position
        local position = GetNPCPosition(npc)
        Log("Bob's position: X=" .. position.x .. ", Y=" .. position.y .. ", Z=" .. position.z)
        
        -- Get the region the NPC is in
        local region = GetNPCRegion("bob_001")
        Log("Bob is in region: " .. (region or "Unknown"))
        
        -- Get detailed NPC state information
        local npcState = GetNPCState("bob_001")
        if npcState then
            Log("NPC full name: " .. npcState.fullName)
            Log("NPC is conscious: " .. tostring(npcState.isConscious))
        end
    else
        LogWarning("Could not find NPC with ID bob_001")
    end
    
    return true
end
```

### Working with Multiple NPCs

```lua
function OnPlayerReady()
    -- Get all NPCs in the "Downtown" region
    local npcsInDowntown = GetNPCsInRegion("Downtown")
    if npcsInDowntown then
        Log("NPCs in Downtown:")
        for i, npcId in pairs(npcsInDowntown) do
            Log("- " .. npcId)
        end
    end
    
    -- Get all NPCs in the game
    local allNPCs = GetAllNPCs()
    if allNPCs then
        Log("Total NPCs in the game: " .. #allNPCs)
    end
    
    -- Get all regions that have NPCs
    local regions = GetAllNPCRegions()
    if regions then
        Log("Regions with NPCs:")
        for i, region in pairs(regions) do
            Log("- " .. region)
        end
    end
end
```

### Moving NPCs

<div class="custom-block warning">
  <p><strong>Development Status:</strong> The SetNPCPosition function is still in development and does not work as intended in the current version.</p>
</div>

```lua
-- NOTE: This example uses SetNPCPosition which is still in development
-- and may not work correctly in the current version

function MoveNPCToPlayer(npcId)
    local npc = GetNPC(npcId)
    if not npc then
        LogError("NPC not found: " .. npcId)
        return false
    end
    
    local playerPos = GetPlayerPosition()
    
    -- Move the NPC slightly away from the player
    SetNPCPosition(npc, 
        playerPos.x + 1.0, 
        playerPos.y, 
        playerPos.z + 1.0)
        
    Log("Attempted to move NPC with ID " .. npcId .. " to player's location")
    Log("Note: NPC position setting is still in development and may not work correctly")
    return true
end

-- Properly register command after console is ready
function OnConsoleReady()
    RegisterCommand(
        "npc_summon",
        "Attempts to summon an NPC to your location",
        "npc_summon <npcId>",
        function(args)
            if not args[2] then
                LogError("Please specify an NPC ID")
                return
            end
            
            local success = MoveNPCToPlayer(args[2])
            if not success then
                LogError("Failed to summon NPC")
            end
        end
    )
    
    Log("NPC summon command registered successfully")
end
```

### Tracking NPC Movements

```lua
-- Table to store last known positions
local npcLastPositions = {}

function Update()
    -- Check positions of important NPCs
    local importantNPCs = {"bob_001", "alice_002", "charlie_003"}
    
    for _, npcId in ipairs(importantNPCs) do
        local npc = GetNPC(npcId)
        if npc then
            local currentPos = GetNPCPosition(npc)
            local lastPos = npcLastPositions[npcId]
            
            if not lastPos then
                -- First time seeing this NPC
                npcLastPositions[npcId] = currentPos
            elseif Vector3Distance(lastPos, currentPos) > 5.0 then
                -- NPC has moved significantly
                Log("NPC with ID " .. npcId .. " has moved to a new location")
                local region = GetNPCRegion(npcId)
                Log("New region: " .. (region or "Unknown"))
                npcLastPositions[npcId] = currentPos
            end
        end
    end
end
```

## Current Limitations and Future Enhancements

Currently, the NPC API is limited to basic operations:

- Getting NPC information and position
- Checking NPC regions
- Finding NPCs by ID or region

The SetNPCPosition function is still in development and does not work reliably in the current version.

In future updates, we plan to expand the API to include:

- Improved NPC positioning and movement control
- NPC schedule access and modification
- Basic NPC interaction capabilities
- Additional NPC information attributes

Note that some commonly requested features, such as making NPCs follow players or complex NPC behavior control, are not currently planned for implementation.

## Command Registration Best Practices

When creating commands that utilize the NPC API, follow these best practices:

1. **Always register commands in `OnConsoleReady()`** to ensure the console system is fully initialized
2. **Use prefixes like `npc_`** for your commands to avoid conflicts with built-in game commands
3. **Provide clear descriptions and usage examples** to make your commands user-friendly
4. **Include proper error handling** for cases when NPCs don't exist or parameters are invalid
5. **Return success/failure status** to provide feedback to the user

See the [Command API documentation](../core/commands.md) for more details on registering and managing console commands.

Stay tuned for updates to the API as development progresses.

Explore the sections in the sidebar for detailed documentation of each function. 
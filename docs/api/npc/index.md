# NPC API

The NPC API provides functions for finding, managing, and interacting with non-player characters (NPCs) in Schedule 1. This includes locating NPCs by name, getting their positions, checking their regions, and more.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic NPC functions are working, but advanced interaction features are still in development.</p>
</div>

## Available Functions

### Finding NPCs

- [`FindNPC(npcName)`](./finding.md#findnpc) - Finds and returns an NPC by name
- [`GetNPC(npcId)`](./finding.md#getnpc) - Gets NPC information by ID
- [`GetAllNPCs()`](./finding.md#getallnpcs) - Gets a list of all NPCs in the game

### NPC Location and Movement

- [`GetNPCPosition(npc)`](./managing.md#getnpcposition) - Gets the position of an NPC
- [`SetNPCPosition(npc, x, y, z)`](./managing.md#setnpcposition) - Sets the position of an NPC
- [`GetNPCRegion(npcId)`](./managing.md#getnpcregion) - Gets the region an NPC is currently in
- [`IsNPCInRegion(npcId, region)`](./managing.md#isnpcinregion) - Checks if an NPC is in a specific region
- [`GetNPCsInRegion(region)`](./managing.md#getnpcsinregion) - Gets all NPCs in a specific region
- [`GetAllNPCRegions()`](./managing.md#getallnpcregions) - Gets a list of all regions that contain NPCs

## Example Usage

### Basic NPC Lookup and Information

```lua
function Initialize()
    -- Find a specific NPC by name
    local npc = FindNPC("Bob")
    if npc then
        Log("Found NPC: Bob")
        
        -- Get NPC position
        local position = GetNPCPosition(npc)
        Log("Bob's position: X=" .. position.x .. ", Y=" .. position.y .. ", Z=" .. position.z)
        
        -- Get the region the NPC is in
        local region = GetNPCRegion("Bob")
        Log("Bob is in region: " .. (region or "Unknown"))
    else
        LogWarning("Could not find NPC named Bob")
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

```lua
function MoveNPCToPlayer(npcName)
    local npc = FindNPC(npcName)
    if not npc then
        LogError("NPC not found: " .. npcName)
        return
    end
    
    local playerPos = GetPlayerPosition()
    
    -- Move the NPC slightly away from the player
    SetNPCPosition(npc, 
        playerPos.x + 1.0, 
        playerPos.y, 
        playerPos.z + 1.0)
        
    Log("Moved " .. npcName .. " to player's location")
end

-- Usage example
RegisterCommand("summon", "Summons an NPC to your location", "summon [npcName]", function(args)
    if not args[2] then
        LogError("Please specify an NPC name")
        return
    end
    
    MoveNPCToPlayer(args[2])
end)
```

### Tracking NPC Movements

```lua
-- Table to store last known positions
local npcLastPositions = {}

function Update()
    -- Check positions of important NPCs
    local importantNPCs = {"Bob", "Alice", "Charlie"}
    
    for _, npcName in ipairs(importantNPCs) do
        local npc = FindNPC(npcName)
        if npc then
            local currentPos = GetNPCPosition(npc)
            local lastPos = npcLastPositions[npcName]
            
            if not lastPos then
                -- First time seeing this NPC
                npcLastPositions[npcName] = currentPos
            elseif Vector3Distance(lastPos, currentPos) > 5.0 then
                -- NPC has moved significantly
                Log(npcName .. " has moved to a new location")
                local region = GetNPCRegion(npcName)
                Log("New region: " .. (region or "Unknown"))
                npcLastPositions[npcName] = currentPos
            end
        end
    end
end
```

## Future Enhancements

The NPC API is being expanded to include:

- NPC interaction (conversations, tasks)
- NPC relationship management
- Custom NPC creation
- NPC schedule modification
- NPC behavior customization

Stay tuned for updates to the API as these features are implemented.

Explore the sections in the sidebar for detailed documentation of each function. 
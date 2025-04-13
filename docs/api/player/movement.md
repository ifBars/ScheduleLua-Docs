# Player Movement API

These functions allow you to access and manipulate the player's position and movement state in the game world.

## GetPlayerMovementState

**Status:** ✅ Stable

**Signature:** `string GetPlayerMovementState()`

**Description:** Gets the current movement state of the player character.

### Parameters

None.

### Returns

A string representing the player's current movement state:
- `"Idle"`: Player is not moving
- `"Walking"`: Player is walking
- `"Running"`: Player is running
- `"Sprinting"`: Player is sprinting
- `"Jumping"`: Player is jumping
- `"Falling"`: Player is falling
- `"Swimming"`: Player is swimming
- `"Crouching"`: Player is crouching

### Example

```lua
function Update()
    local moveState = GetPlayerMovementState()
    
    if moveState == "Sprinting" then
        local energy = GetPlayerEnergy()
        if energy < 20 then
            ShowNotification("Low energy while sprinting!")
        end
    end
    
    if moveState == "Swimming" then
        -- Special swimming logic
        Log("Player is swimming")
    end
end
```

### Notes

- The movement state updates in real-time as the player changes actions
- This function is useful for conditional logic based on player movement
- Can be used for implementing stamina systems, footstep sounds, or other movement-dependent features

## GetPlayerPosition

**Status:** ✅ Stable

**Signature:** `Vector3 GetPlayerPosition()`

**Description:** Gets the current position of the player in the world.

### Parameters

None.

### Returns

A Vector3 object containing the x, y, and z coordinates of the player.

### Example

```lua
function OnPlayerReady()
    local pos = GetPlayerPosition()
    Log("Player position: X=" .. pos.x .. ", Y=" .. pos.y .. ", Z=" .. pos.z)
    
    -- Store initial position for reference
    initialPosition = pos
end

function Update()
    local currentPos = GetPlayerPosition()
    
    -- Calculate distance traveled from start
    local distance = Vector3Distance(initialPosition, currentPos)
    
    if distance > 100 then
        Log("Player has traveled more than 100 units from the starting position")
    end
end
```

## SetPlayerPosition

**Status:** ✅ Stable

**Signature:** `void SetPlayerPosition(number x, number y, number z)`

**Description:** Sets the position of the player in the world to the specified coordinates.

### Parameters

- `x` (number): The x-coordinate to set
- `y` (number): The y-coordinate to set
- `z` (number): The z-coordinate to set

### Returns

None.

### Example

```lua
-- Move player to specific coordinates
SetPlayerPosition(100, 0, 200)

-- Move player up by 5 units
local pos = GetPlayerPosition()
SetPlayerPosition(pos.x, pos.y + 5, pos.z)

-- Create a teleport command
RegisterCommand("goto", "Teleport to coordinates", "goto x y z", function(args)
    local x = tonumber(args[2]) or 0
    local y = tonumber(args[3]) or 0
    local z = tonumber(args[4]) or 0
    
    SetPlayerPosition(x, y, z)
    Log("Teleported to X=" .. x .. ", Y=" .. y .. ", Z=" .. z)
end)
```

### Notes

- This function changes the player's position immediately without animation
- May cause physics glitches if teleporting into solid objects
- Use with caution in complex environments

## TeleportPlayer

**Status:** ✅ Stable

**Signature:** `void TeleportPlayer(number x, number y, number z)`

**Description:** Teleports the player to the specified coordinates, handling proper physics and collision detection.

### Parameters

- `x` (number): The x-coordinate to teleport to
- `y` (number): The y-coordinate to teleport to
- `z` (number): The z-coordinate to teleport to

### Returns

None.

### Example

```lua
-- Safely teleport player to coordinates
TeleportPlayer(100, 0, 200)

-- Create a teleport command with enhanced safety
RegisterCommand("teleport", "Safely teleport to coordinates", "teleport x y z", function(args)
    local x = tonumber(args[2]) or 0
    local y = tonumber(args[3]) or 0
    local z = tonumber(args[4]) or 0
    
    TeleportPlayer(x, y, z)
    Log("Safely teleported to X=" .. x .. ", Y=" .. y .. ", Z=" .. z)
end)
```

### Notes

- Preferred over `SetPlayerPosition` for most teleportation needs
- Handles physics transitions and collision detection
- May include screen fade effects depending on game configuration

## GetPlayerRegion

**Status:** ✅ Stable

**Signature:** `string GetPlayerRegion()`

**Description:** Gets the name of the region or area that the player is currently in.

### Parameters

None.

### Returns

A string representing the current region name. Returns an empty string if player is not in any defined region.

### Example

```lua
function Update()
    local region = GetPlayerRegion()
    
    if region ~= lastRegion then
        Log("Player entered new region: " .. region)
        lastRegion = region
        
        if region == "Downtown" then
            ShowNotification("Welcome to Downtown!")
        elseif region == "Forest" then
            ShowNotification("You entered the forest area")
        end
    end
end
```

## IsPlayerInRegion

**Status:** ✅ Stable

**Signature:** `boolean IsPlayerInRegion(string regionName)`

**Description:** Checks if the player is currently in the specified region.

### Parameters

- `regionName` (string): The name of the region to check

### Returns

`true` if the player is in the specified region, `false` otherwise.

### Example

```lua
function Update()
    -- Check if player is in a restricted area
    if IsPlayerInRegion("RestrictedZone") then
        ShowNotification("WARNING: You are in a restricted area!")
        
        -- Check if it's also nighttime
        if IsNightTime() then
            ShowNotification("Nighttime security increased in this area!")
        end
    end
    
    -- Check if player is in town
    if IsPlayerInRegion("Town") and not townVisitRecorded then
        Log("Player visited town")
        townVisitRecorded = true
    end
end
```

### Notes

- Region names are case-sensitive
- Returns `false` if the region doesn't exist
- Useful for area-specific gameplay logic 
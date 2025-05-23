# Player Movement API

These functions allow you to access and manipulate the player's position and movement state in the game world.

## GetPlayerMovementState

**Signature:** `string GetPlayerMovementState()`

**Description:** Gets the current movement state of the player character.

### Parameters

None.

### Returns

A string representing the player's current movement state:
- `"Idle"`: Player is not moving
- `"Walking"`: Player is walking
- `"Sprinting"`: Player is sprinting
- `"Jumping"`: Player is jumping
- `"Falling"`: Player is falling
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
end
```

### Notes

- The movement state updates in real-time as the player changes actions
- This function is useful for conditional logic based on player movement
- Can be used for implementing stamina systems, footstep sounds, or other movement-dependent features

## GetPlayerPosition

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

**Signature:** `void SetPlayerPosition(number x, number y, number z)`

**Description:** Sets the position of the player in the world to the specified coordinates using the players Transform component.

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

-- Create a teleport command once console is ready
function OnConsoleReady()
    RegisterCommand("goto", "Teleport to coordinates", "goto x y z", function(args)
        local x = tonumber(args[2]) or 0
        local y = tonumber(args[3]) or 0
        local z = tonumber(args[4]) or 0
    
        SetPlayerPosition(x, y, z)
        Log("Teleported to X=" .. x .. ", Y=" .. y .. ", Z=" .. z)
    end)
end
```

### Notes

- This function changes the player's position using Unity's Transform component
- Use with caution in complex environments

## TeleportPlayer

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
-- Teleport player to coordinates
TeleportPlayer(-56, 1, 90)

-- Create a teleport command with enhanced safety once console is ready
function OnConsoleReady()
    RegisterCommand("teleport", "Teleport to coordinates", "teleport x y z", function(args)
        local x = tonumber(args[2]) or 0
        local y = tonumber(args[3]) or 0
        local z = tonumber(args[4]) or 0
    
        TeleportPlayer(x, y, z)
        Log("Teleported to X=" .. x .. ", Y=" .. y .. ", Z=" .. z)
    end)
end
```

### Notes

- Preferred over `SetPlayerPosition` for most teleportation needs
- Uses the Teleport function from Schedule 1's PlayerMovement class

## GetPlayerRegion

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

**Signature:** `boolean IsPlayerInRegion(string regionName)`

**Description:** Checks if the player is currently in the specified region.

### Parameters

- `regionName` (string): The name of the region to check

### Returns

`true` if the player is in the specified region, `false` otherwise.

### Example

```lua
function Update()
    -- Check if player is in Westville
    if IsPlayerInRegion("Westville") then
        ShowNotification("You are in westville!")
        
        -- Check if it's also nighttime
        if IsNightTime() then
            ShowNotification("Nighttime security increased in this area!")
        end
    end
end
```

### Notes

- Returns `false` if the region doesn't exist
- Useful for area-specific gameplay logic 

## GetPlayerMovementSpeed

**Signature:** `number GetPlayerMovementSpeed()`

**Description:** Gets the player's current movement speed multiplier.

### Parameters

None.

### Returns

A number representing the player's current movement speed multiplier (1.0 is normal speed).

### Example

```lua
function Update()
    local speed = GetPlayerMovementSpeed()
    
    if speed > 1.5 then
        ShowNotification("You're moving fast!")
    elseif speed < 0.5 then
        ShowNotification("You're moving slowly!")
    end
end

-- Best practice: Initialize player-related systems when player is ready
function OnPlayerReady()
    -- Initial speed check
    local initialSpeed = GetPlayerMovementSpeed()
    Log("Initial player speed: " .. initialSpeed)
end
```

### Notes

- This function returns the movement speed multiplier, where 1.0 represents normal speed
- Can be used to check if the player has speed-affecting buffs or debuffs
- For reliable initialization, check speed after player is loaded using the `OnPlayerReady()` callback

## SetPlayerMovementSpeed

**Signature:** `boolean SetPlayerMovementSpeed(number speedMultiplier)`

**Description:** Sets the player's movement speed multiplier to the specified value.

### Parameters

- `speedMultiplier` (number): The speed multiplier to set (1.0 is normal speed)

### Returns

`true` if successful, `false` otherwise.

### Example

```lua

-- Create a slowdown effect
local function ApplySlowEffect()
    SetPlayerMovementSpeed(0.5)
    Wait(5)
    SetPlayerMovementSpeed(1.0)
end

-- Best practice: Initialize speed settings when player is ready
function OnPlayerReady()
    -- Store original speed for reference
    originalSpeed = GetPlayerMovementSpeed()
    Log("Player ready with speed: " .. originalSpeed)
    
    -- Apply speed configurations
    if IsPlayerInRegion("Westville") then
        ApplySlowEffect()
    end
end
```

### Notes

- Affects all movement including walking, running, and sprinting
- Can be used to create speed boost or slowdown effects
- Wait for player to be fully loaded using `OnPlayerReady()` before setting initial speed values 
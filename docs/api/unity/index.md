# Unity Api

The Unity API provides functionality for interacting with the Unity game engine. This allows scripts to detect key presses.

## Key Input Functions

### IsKeyDown

**Signature:** `boolean IsKeyDown(string keyName)`

**Description:** Checks if a specific key is currently being held down.

#### Parameters

- `keyName` (string): The name of the key to check (matching Unity's KeyCode enum values)

#### Returns

`true` if the key is currently being held down, `false` otherwise.

#### Example

```lua
function Update()
    -- Check if the W key is being held down
    if IsKeyDown("W") then
        Log("W key is being held down")
    end
    
    -- Check if Shift is being held for sprint
    if IsKeyDown("LeftShift") then
        Log("Player is sprinting")
    end
end
```

### IsKeyPressed

**Signature:** `boolean IsKeyPressed(string keyName)`

**Description:** Checks if a specific key was pressed (single press detection).

#### Parameters

- `keyName` (string): The name of the key to check (matching Unity's KeyCode enum values)

#### Returns

`true` if the key was pressed since the last check, `false` otherwise.

#### Example

```lua
function Update()
    -- Check if the E key was pressed for interaction
    if IsKeyPressed("E") then
        Log("E was pressed - interacting with object")
        InteractWithNearbyObject()
    end
    
    -- Check if the Space key was pressed for jumping
    if IsKeyPressed("Space") then
        Log("Space was pressed - player jumped")
    end
end
```


## Example Script

Here's a complete example script demonstrating how to use the Windows API for key detection:

```lua
-- Initialize variables
local isRunning = false
local speed = running and 2.0 or 1.0

local function MoveForward(running)
    -- Movement implementation
    Log("Moving forward at speed: " .. speed)
end

local function MoveBackward(running)
    Log("Moving backward at speed: " .. speed)
end

local function MoveLeft(running)
    Log("Moving left at speed: " .. speed)
end

local function MoveRight(running)
    Log("Moving right at speed: " .. speed)
end

local function Interact()
    Log("Interacting...")
end

function Initialize()
    Log("Windows key input script initialized")
end

function Update()
    -- Toggle running state with Left Shift
    if IsKeyPressed("LeftShift") then
        isRunning = not isRunning
        Log("Running mode: " .. tostring(isRunning))
    end
    
    -- Check for WASD movement
    if IsKeyDown("W") then
        MoveForward(isRunning)
    end
    
    if IsKeyDown("S") then
        MoveBackward(isRunning)
    end
    
    if IsKeyDown("A") then
        MoveLeft(isRunning)
    end
    
    if IsKeyDown("D") then
        MoveRight(isRunning)
    end
    
    -- Interaction key
    if IsKeyPressed("Space") then
        Interact()
    end
end

local function ShowKeyStatus()
    Log("Current key status:")
    Log("W key down: " .. tostring(IsKeyDown("W")))
    Log("A key down: " .. tostring(IsKeyDown("A")))
    Log("S key down: " .. tostring(IsKeyDown("S")))
    Log("D key down: " .. tostring(IsKeyDown("D")))
    Log("Shift key down: " .. tostring(IsKeyDown("LeftShift")))
    Log("Running mode: " .. tostring(isRunning))
end

function OnConsoleReady()
    RegisterCommand("keys", "Shows current key detection status", "keys", ShowKeyStatus)
end
```

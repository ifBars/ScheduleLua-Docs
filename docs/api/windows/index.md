# Windows API

The Windows API provides functionality for interacting with the Windows operating system through low-level inputs. This allows scripts to detect key presses and key states on Windows platforms.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic key input functions are available.</p>
</div>

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

## Key Names

The API accepts key names based on Unity's KeyCode enum values, which are internally mapped to Windows virtual key codes. Common keys include:

### Movement Keys
- `W`, `A`, `S`, `D` - Standard movement keys
- `UpArrow`, `LeftArrow`, `DownArrow`, `RightArrow` - Arrow keys

### Modifier Keys
- `LeftShift`, `RightShift` - Shift keys
- `LeftControl`, `RightControl` - Control keys
- `LeftAlt`, `RightAlt` - Alt keys

### Function Keys
- `F1`, `F2`, `F3`, etc. - Function keys

### Other Common Keys
- `Space` - Space bar
- `Return` or `Enter` - Enter key
- `Escape` - Escape key
- `Tab` - Tab key
- `Backspace` - Backspace key

## Technical Implementation

The Windows API functions work by:
1. Converting the provided Unity KeyCode name string (e.g., "W", "Space") to a Unity KeyCode enum value
2. Internally mapping this to a Windows virtual key code
3. Using the Windows `GetAsyncKeyState()` function to detect key states

<div class="custom-block warning">
  <p><strong>Note:</strong> Due to this conversion process, there may be some rare keys where the mapping between Unity KeyCode and Windows virtual key codes is imperfect. The most common keys used in Schedule 1 should be properly supported. Better support will come in future updates as feedback is received.</p>
</div>

## Notes

- The current implementation uses GetAsyncKeyState internally
- Key names must match the Unity KeyCode enum values exactly (case-sensitive)
- `IsKeyDown` checks if the key is currently held down
- `IsKeyPressed` detects a single press (more useful for toggle actions)
- Be cautious about polling keys in every Update as it can be performance-intensive

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

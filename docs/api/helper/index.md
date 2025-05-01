# Helper Functions

Helper functions provide utility functionality that can be used across different parts of your code to simplify common operations.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic utility functions are available.</p>
</div>

## Vector3 Functions

### Vector3

**Status:** ✅ Stable

**Signature:** `table Vector3(number x, number y, number z)`

**Description:** Creates a new Vector3 object representing a 3D point or direction.

### Parameters

- `x` (number): The X coordinate
- `y` (number): The Y coordinate
- `z` (number): The Z coordinate

### Returns

A table representing a Vector3 with the following properties:
- `x` (number): X coordinate
- `y` (number): Y coordinate
- `z` (number): Z coordinate

### Example

```lua
-- Create a new Vector3
local position = Vector3(10, 5, 20)
Log("Position: X=" .. position.x .. ", Y=" .. position.y .. ", Z=" .. position.z)

-- Use it to teleport the player
TeleportPlayer(position.x, position.y, position.z)
```

- Vector3 objects are used to represent positions and directions in 3D space
- The returned object is a standard Lua table with x, y, z properties

## Vector3Distance

**Status:** ✅ Stable

**Signature:** `number Vector3Distance(table vector1, table vector2)`

**Description:** Calculates the distance between two Vector3 points in 3D space.

### Parameters

- `vector1` (table): First Vector3 with x, y, z properties
- `vector2` (table): Second Vector3 with x, y, z properties

### Returns

A number representing the straight-line distance between the two points.

### Example

```lua
-- Get player and NPC positions
local playerPos = GetPlayerPosition()
local npc = FindNPC("John")
local npcPos = GetNPCPosition(npc)

if playerPos and npcPos then
    -- Calculate distance between player and NPC
    local distance = Vector3Distance(playerPos, npcPos)
    Log("Distance to NPC: " .. distance)
    
    -- Check if NPC is nearby
    if distance < 5 then
        Log("NPC is nearby!")
    else
        Log("NPC is far away")
    end
end
```

- This calculates the straight-line distance (Euclidean distance)
- Useful for proximity checks and distance-based behaviors
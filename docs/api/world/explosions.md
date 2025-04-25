# Explosions API

The Explosions API allows mods to trigger explosions in the game world at specified positions with optional delays.

## Functions

### TriggerExplosion

```lua
TriggerExplosion(position, delay)
```

Triggers an explosion at the specified position after an optional delay.

**Parameters:**
- `position` (table): A table containing x, y, z coordinates for the explosion
  - `x` (number): X coordinate
  - `y` (number): Y coordinate
  - `z` (number): Z coordinate
- `delay` (number): Time in seconds to wait before triggering the explosion

**Returns:** None

**Notes:**
- This function only works when called on the server
- Uses the default small explosion type
- If called from a client, a warning will be logged but no explosion will occur

## Examples

### Basic Explosion

```lua
-- Trigger an immediate explosion at position x=100, y=0, z=50
TriggerExplosion({x = 100, y = 0, z = 50}, 0)
```

### Delayed Explosion

```lua
-- Trigger an explosion after 5 seconds at player position
local playerPos = Player.GetPosition()
TriggerExplosion(playerPos, 5.0)
```

### Creating Multiple Explosions

```lua
-- Create a sequence of explosions in a line
for i = 0, 5 do
    TriggerExplosion({x = 100 + (i * 10), y = 0, z = 50}, i * 0.5)
end
``` 
# Player Status API

These functions allow you to access and modify the player's status attributes like health, energy, and money.

## GetPlayerState

**Status:** ✅ Stable

**Signature:** `table GetPlayerState()`

**Description:** Gets a comprehensive table containing information about the player's current state.

### Parameters

None.

### Returns

A table containing the following player information:
- `playerName` (string): The player's name
- `health` (number): Current health value
- `maxHealth` (number): Maximum health value
- `energy` (number): Current energy value
- `maxEnergy` (number): Maximum energy value
- `money` (number): Current money amount
- `isAlive` (boolean): Whether the player is alive
- `isSprinting` (boolean): Whether the player is currently sprinting
- `position` (table): Player position as {x, y, z} coordinates
- And other state information

### Example

```lua
function OnPlayerReady()
    local playerState = GetPlayerState()
    if playerState then
        Log("Player state information:")
        Log("- Name: " .. (playerState.playerName or "Unknown"))
        Log("- Health: " .. (playerState.health or 0) .. "/" .. (playerState.maxHealth or 100))
        Log("- Energy: " .. (playerState.energy or 0) .. "/" .. (playerState.maxEnergy or 100))
        Log("- Money: " .. (playerState.money or 0))
        Log("- Is Alive: " .. tostring(playerState.isAlive or false))
        Log("- Is Sprinting: " .. tostring(playerState.isSprinting or false))
        
        local pos = playerState.position
        if pos then
            Log("- Position: X=" .. pos.x .. ", Y=" .. pos.y .. ", Z=" .. pos.z)
        end
    else
        Log("Player not found or not initialized")
    end
end
```

### Notes

- This function provides a convenient way to access multiple player properties at once
- Returns `nil` if the player is not found or initialized yet
- Use in or after the `OnPlayerReady()` event

## GetPlayerHealth

**Status:** ✅ Stable

**Signature:** `number GetPlayerHealth()`

**Description:** Gets the player's current health value.

### Parameters

None.

### Returns

A number representing the player's current health.

### Example

```lua
local health = GetPlayerHealth()
Log("Player health: " .. health)

-- Check if player is low on health
if health < 30 then
    Log("Warning: Low health!")
end
```

## SetPlayerHealth

**Status:** ✅ Stable

**Signature:** `void SetPlayerHealth(number amount)`

**Description:** Sets the player's health to the specified amount.

### Parameters

- `amount` (number): The new health value to set

### Returns

None.

### Example

```lua
-- Heal player to full health
SetPlayerHealth(100)

-- Damage the player severely
SetPlayerHealth(10)

-- Create a command to heal
RegisterCommand("heal", "Heals the player", "heal", function(args)
    SetPlayerHealth(100)
    Log("Player healed to full health")
end)
```

### Notes

- Values may be clamped to valid minimum and maximum values
- This will trigger the `OnPlayerHealthChanged` event

## GetPlayerEnergy

**Status:** ✅ Stable

**Signature:** `number GetPlayerEnergy()`

**Description:** Gets the player's current energy value.

### Parameters

None.

### Returns

A number representing the player's current energy.

### Example

```lua
local energy = GetPlayerEnergy()
Log("Player energy: " .. energy)

-- Check if player is low on energy
if energy < 30 then
    Log("Warning: Low energy!")
end
```

## SetPlayerEnergy

**Status:** ✅ Stable

**Signature:** `void SetPlayerEnergy(number amount)`

**Description:** Sets the player's energy to the specified amount.

### Parameters

- `amount` (number): The new energy value to set

### Returns

None.

### Example

```lua
-- Restore player's energy to full
SetPlayerEnergy(100)

-- Create a command to restore energy
RegisterCommand("energy", "Restores player energy", "energy", function(args)
    SetPlayerEnergy(100)
    Log("Player energy restored")
end)
```

### Notes

- Values may be clamped to valid minimum and maximum values
- This will trigger the `OnPlayerEnergyChanged` event

## GetPlayerMoney

**Status:** ✅ Stable

**Signature:** `number GetPlayerMoney()`

**Description:** Gets the player's current money amount.

### Parameters

None.

### Returns

A number representing the player's current money.

### Example

```lua
local money = GetPlayerMoney()
Log("Player has $" .. money)

-- Check if player can afford an item
if money >= 500 then
    Log("Player can afford the expensive item")
else
    Log("Player needs " .. (500 - money) .. " more money")
end
```

## AddPlayerMoney

**Status:** ✅ Stable

**Signature:** `void AddPlayerMoney(number amount)`

**Description:** Adds the specified amount of money to the player.

### Parameters

- `amount` (number): The amount of money to add (can be negative to remove money)

### Returns

None.

### Example

```lua
-- Give player 100 money
AddPlayerMoney(100)
Log("Added $100 to player")

-- Remove 50 money from player
AddPlayerMoney(-50)
Log("Removed $50 from player")

-- Create a money cheat command
RegisterCommand("money", "Gives money to player", "money [amount]", function(args)
    local amount = tonumber(args[2]) or 100
    AddPlayerMoney(amount)
    Log("Added $" .. amount .. " to player")
end)
```

### Notes

- Use a negative amount to remove money from the player
- The player's money will not go below zero 
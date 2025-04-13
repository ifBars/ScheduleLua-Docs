# Player API

The Player API provides functions for interacting with the player character in Schedule I. This includes getting player state information, manipulating player attributes, checking the player's location, and more.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic functionality works, but some advanced features are still in development.</p>
</div>

## Available Functions

### Player State

- [`GetPlayerState()`](./status.md#getplayerstate) - Returns a comprehensive table of player information
- [`GetPlayerHealth()`](./status.md#getplayerhealth) - Gets the player's current health
- [`SetPlayerHealth(amount)`](./status.md#setplayerhealth) - Sets the player's health
- [`GetPlayerEnergy()`](./status.md#getplayerenergy) - Gets the player's current energy
- [`SetPlayerEnergy(amount)`](./status.md#setplayerenergy) - Sets the player's energy
- [`GetPlayerMoney()`](./status.md#getplayermoney) - Gets the player's current money
- [`AddPlayerMoney(amount)`](./status.md#addplayermoney) - Adds money to the player

### Player Movement

- [`GetPlayerPosition()`](./movement.md#getplayerposition) - Gets the position of the player
- [`SetPlayerPosition(x, y, z)`](./movement.md#setplayerposition) - Sets the position of the player
- [`TeleportPlayer(x, y, z)`](./movement.md#teleportplayer) - Teleports the player to the specified coordinates

### Player Location

- [`GetPlayerRegion()`](./movement.md#getplayerregion) - Gets the name of the region the player is in
- [`IsPlayerInRegion(regionName)`](./movement.md#isplayerinregion) - Checks if the player is in a specific region

## Player Events

Your script can implement these event handlers to respond to player-related events:

```lua
-- Called when the player is fully loaded and ready
function OnPlayerReady()
    Log("Player is now ready!")
    -- Initialize your player-dependent code here
end

-- Called when player health changes
function OnPlayerHealthChanged(newHealth)
    Log("Health changed to: " .. newHealth)
    -- React to health changes
end

-- Called when player energy changes
function OnPlayerEnergyChanged(newEnergy)
    Log("Energy changed to: " .. newEnergy)
    -- React to energy changes
end
```

## Example Usage

```lua
function OnPlayerReady()
    -- Get player state
    local playerState = GetPlayerState()
    if playerState then
        Log("Player name: " .. (playerState.playerName or "Unknown"))
        Log("Player health: " .. (playerState.health or 0) .. "/" .. (playerState.maxHealth or 100))
        Log("Player is alive: " .. tostring(playerState.isAlive or false))
        
        -- Get position from the state table
        local pos = playerState.position
        if pos then
            Log("Position: X=" .. pos.x .. ", Y=" .. pos.y .. ", Z=" .. pos.z)
        end
    end
    
    -- Get player region
    local region = GetPlayerRegion()
    Log("Player is in region: " .. (region or "Unknown"))
    
    -- Check if player has enough money
    local money = GetPlayerMoney()
    if money >= 100 then
        Log("Player has enough money to buy the item")
    else
        Log("Player needs " .. (100 - money) .. " more money")
    end
end
```

Explore the sections in the sidebar for detailed documentation of each function. 
# ATM Management

Functions for customizing and controlling the ATM system in the game.

## GetATMDepositLimit

**Signature:** `float GetATMDepositLimit()`

**Implementation Status:** ✅ Stable

**Description:** Gets the current ATM deposit limit for the game.

### Returns

The current ATM deposit limit as a float.

### Example

```lua
local limit = GetATMDepositLimit()
Log("Current ATM deposit limit: " .. FormatMoney(limit))
```

### Notes

- The default ATM deposit limit in the game is $10,000.
- This limit applies to the amount of cash that can be deposited at ATMs within the game's weekly cycle.

## SetATMDepositLimit

**Signature:** `bool SetATMDepositLimit(float amount)`

**Implementation Status:** ✅ Stable

**Description:** Sets a new ATM deposit limit for the game, allowing you to change how much cash players can deposit at ATMs within the game's weekly cycle.

### Parameters

- `amount` (float): The new deposit limit amount.

### Returns

`true` if the deposit limit was successfully changed, `false` otherwise.

### Example

```lua
-- Double the ATM deposit limit to $20,000
if SetATMDepositLimit(20000) then
    Log("ATM deposit limit increased to $20,000")
else
    Log("Failed to change ATM deposit limit")
end

-- Set a lower deposit limit
if SetATMDepositLimit(5000) then
    Log("ATM deposit limit decreased to $5,000")
else
    Log("Failed to change ATM deposit limit")
end
```

### Notes

- This function uses Harmony patches to modify the game's behavior at runtime.
- The limit must be a positive number.
- The change applies to all ATMs in the game.
- This change persists until the game is restarted or the limit is changed again.
- Changes will be reflected in the ATM UI during the next interaction with an ATM.
- May require the player to exit and re-enter an ATM interface to see the changes. 
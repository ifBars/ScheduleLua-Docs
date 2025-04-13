# Money Management

Functions for accessing and manipulating the player's cash and online bank balance.

## GetPlayerCash

**Signature:** `float GetPlayerCash()`

**Implementation Status:** ✅ Stable

**Description:** Gets the player's current cash balance.

### Returns

The current cash balance as a float.

### Example

```lua
local currentCash = GetPlayerCash()
Log("Current cash: " .. FormatMoney(currentCash))
```

### Notes

- This reflects the amount of cash the player has on hand, not in their bank account.
- Returns 0 if the MoneyManager cannot be found.

## GetPlayerOnlineBalance

**Signature:** `float GetPlayerOnlineBalance()`

**Implementation Status:** ✅ Stable

**Description:** Gets the player's current online bank balance.

### Returns

The current online balance as a float.

### Example

```lua
local bankBalance = GetPlayerOnlineBalance()
Log("Bank balance: " .. FormatMoney(bankBalance))
```

### Notes

- This reflects the amount of money in the player's bank account, accessible through ATMs.
- Returns 0 if the MoneyManager cannot be found.

## GetLifetimeEarnings

**Signature:** `float GetLifetimeEarnings()`

**Implementation Status:** ✅ Stable

**Description:** Gets the player's total lifetime earnings.

### Returns

The lifetime earnings as a float.

### Example

```lua
local earnings = GetLifetimeEarnings()
Log("You've earned " .. FormatMoney(earnings) .. " in total")
```

### Notes

- This is the total amount of money the player has earned throughout the game.
- Does not decrease when money is spent.
- Returns 0 if the MoneyManager cannot be found.

## GetNetWorth

**Signature:** `float GetNetWorth()`

**Implementation Status:** ✅ Stable

**Description:** Gets the player's total net worth (cash + online balance).

### Returns

The total net worth as a float.

### Example

```lua
local netWorth = GetNetWorth()
Log("Net worth: " .. FormatMoney(netWorth))
```

### Notes

- This is the sum of the player's cash and online bank balance.
- Returns 0 if the MoneyManager cannot be found.

## AddPlayerCash

**Signature:** `bool AddPlayerCash(float amount)`

**Implementation Status:** ✅ Stable

**Description:** Adds cash to the player's on-hand balance.

### Parameters

- `amount` (float): The amount of cash to add.

### Returns

`true` if successful, `false` otherwise.

### Example

```lua
-- Add $100 to player's cash
if AddPlayerCash(100) then
    Log("Added $100 to your wallet")
else
    Log("Failed to add cash")
end
```

### Notes

- Amount must be positive.
- Returns false if the MoneyManager cannot be found.
- This action will be reflected in the game's UI immediately.

## RemovePlayerCash

**Signature:** `bool RemovePlayerCash(float amount)`

**Implementation Status:** ✅ Stable

**Description:** Removes cash from the player's on-hand balance.

### Parameters

- `amount` (float): The amount of cash to remove.

### Returns

`true` if successful, `false` otherwise.

### Example

```lua
-- Try to spend $50
if RemovePlayerCash(50) then
    Log("Spent $50")
else
    Log("Cannot afford $50")
end
```

### Notes

- Amount must be positive.
- Returns false if the player doesn't have enough cash or if the MoneyManager cannot be found.
- This action will be reflected in the game's UI immediately.

## AddOnlineBalance

**Signature:** `bool AddOnlineBalance(float amount)`

**Implementation Status:** ✅ Stable

**Description:** Adds to the player's online bank balance.

### Parameters

- `amount` (float): The amount to add to the online balance.

### Returns

`true` if successful, `false` otherwise.

### Example

```lua
-- Add $500 to player's bank account
if AddOnlineBalance(500) then
    Log("Added $500 to your bank account")
else
    Log("Failed to add to bank account")
end
```

### Notes

- Amount must be positive.
- Returns false if the MoneyManager cannot be found.
- The game's UI may not immediately reflect this change until an ATM is interacted with.

## RemoveOnlineBalance

**Signature:** `bool RemoveOnlineBalance(float amount)`

**Implementation Status:** ✅ Stable

**Description:** Removes from the player's online bank balance.

### Parameters

- `amount` (float): The amount to remove from the online balance.

### Returns

`true` if successful, `false` otherwise.

### Example

```lua
-- Try to withdraw $200 from bank account
if RemoveOnlineBalance(200) then
    Log("Withdrew $200 from your bank account")
else
    Log("Insufficient bank balance")
end
```

### Notes

- Amount must be positive.
- Returns false if the player doesn't have enough in their online balance or if the MoneyManager cannot be found.
- The game's UI may not immediately reflect this change until an ATM is interacted with.

## CheckIfCanAfford

**Signature:** `bool CheckIfCanAfford(float amount)`

**Implementation Status:** ✅ Stable

**Description:** Checks if the player can afford a specific amount with their current cash.

### Parameters

- `amount` (float): The amount to check.

### Returns

`true` if the player has enough cash, `false` otherwise.

### Example

```lua
local price = 150
if CheckIfCanAfford(price) then
    Log("You can afford this item")
    -- Process purchase
else
    Log("You cannot afford this item")
end
```

### Notes

- Only checks cash balance, not online balance.
- Returns false if the MoneyManager cannot be found.
- Does not affect the player's money; only checks the balance.

## FormatMoney

**Signature:** `string FormatMoney(float amount)`

**Implementation Status:** ✅ Stable

**Description:** Formats a money amount for display in the standard game format.

### Parameters

- `amount` (float): The money amount to format.

### Returns

A formatted string representing the money amount.

### Example

```lua
local cash = GetPlayerCash()
Log("You have " .. FormatMoney(cash))
-- Output example: "You have $1,250.00"
```

### Notes

- Uses the same formatting as the game uses in its UI.
- Useful for displaying consistent money values in logs and UI.
- Falls back to a simple formatting if the game's formatter is unavailable. 
# Transactions

Functions for creating and handling financial transactions in the game.

## CreateTransaction

**Signature:** `bool CreateTransaction(string transactionName, float unitAmount, int quantity, bool useOnlineBalance)`

**Implementation Status:** ✅ Stable

**Description:** Creates a transaction and deducts the appropriate funds from either the player's cash or online balance.

### Parameters

- `transactionName` (string): Name of the transaction for record-keeping.
- `unitAmount` (float): Unit price of the item or service.
- `quantity` (int): Quantity of items or services being purchased.
- `useOnlineBalance` (bool): Whether to deduct from online balance (`true`) or cash (`false`).

### Returns

`true` if the transaction was successful, `false` otherwise.

### Example

```lua
-- Purchase 5 items at $25 each using cash
local success = CreateTransaction("Hardware Store", 25, 5, false)
if success then
    Log("Purchased 5 items for $125")
else
    Log("Transaction failed - insufficient funds")
end

-- Pay a $100 bill using online banking
local billPaid = CreateTransaction("Electricity Bill", 100, 1, true)
if billPaid then
    Log("Bill paid successfully")
else
    Log("Failed to pay bill - check your bank balance")
end
```

### Notes

- The transaction will fail if the player doesn't have enough funds in the selected payment method.
- Total transaction amount is calculated as `unitAmount × quantity`.
- Transaction name cannot be empty.
- Quantity must be greater than zero.
- This function logs transaction details to the console if you have debug logging enabled. 
# Economy API

The Economy API allows your scripts to interact with the game's economy system, including accessing and manipulating the player's money, both cash and online balance, creating transactions, and modifying certain game economy rules.

## Implementation Status: 🔄 Partial

Economy functions are largely implemented and stable, with some advanced features still in development.

## Available Functions

### Money Management
- [GetPlayerCash](./money.md#getplayercash) - Get the player's current cash balance
- [GetPlayerOnlineBalance](./money.md#getplayeronlinebalance) - Get the player's current online bank balance
- [GetLifetimeEarnings](./money.md#getlifetimeearnings) - Get the player's lifetime earnings
- [GetNetWorth](./money.md#getnetworth) - Get the player's total net worth (cash + online balance)
- [AddPlayerCash](./money.md#addplayercash) - Add cash to the player's on-hand balance
- [RemovePlayerCash](./money.md#removeplayercash) - Remove cash from the player's on-hand balance
- [AddOnlineBalance](./money.md#addonlinebalance) - Add to the player's online bank balance
- [RemoveOnlineBalance](./money.md#removeonlinebalance) - Remove from the player's online bank balance
- [CheckIfCanAfford](./money.md#checkifcanafford) - Check if the player can afford a specific amount
- [FormatMoney](./money.md#formatmoney) - Format a money amount for display

### Transactions
- [CreateTransaction](./transactions.md#createtransaction) - Create a transaction and deduct money

### ATM Management
- [GetATMDepositLimit](./atm.md#getatmdeposit) - Get the current ATM deposit limit
- [SetATMDepositLimit](./atm.md#setatmdeposit) - Set the ATM deposit limit

## Examples

See the [Economy Examples](../../examples/economy.md) page for practical examples of using the Economy API in your scripts.

## Limitations

- Changes to the player's bank balance via the API won't be reflected in the game's UI until an ATM is interacted with or other game events update the UI.
- Transaction history is tracked internally but not currently exposed via the API.

## Coming Soon

- Transaction history access
- Store price manipulation
- Economic event hooks 
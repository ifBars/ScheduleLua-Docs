# Economy API Examples

This page provides real-world examples of using the Economy API in ScheduleLua scripts.

## Economy Functions Example

The following example demonstrates how to use the Economy API to interact with the game's money system, including displaying balances, adding money, making purchases, and transferring funds between cash and online balance:

```lua
-- ScheduleLua Example: Economy Functions
-- This script demonstrates how to use the Economy API to interact with the game's money system

-- Store functions to be initialized only after player is ready
local EconomyFunctions = {}
local currentScene = ""

-- Initialize function called when script is first loaded
function Initialize()
    Log("Economy API example initialized!")
    return true
end

-- Display player's money information
function EconomyFunctions.ShowPlayerMoneyInfo()
    local cash = GetPlayerCash()
    local online = GetPlayerOnlineBalance()
    local lifetime = GetLifetimeEarnings()
    local netWorth = GetNetWorth()
    
    Log("====== Player Money Information ======")
    Log("Cash on hand: " .. FormatMoney(cash))
    Log("Online balance: " .. FormatMoney(online))
    Log("Lifetime earnings: " .. FormatMoney(lifetime))
    Log("Total net worth: " .. FormatMoney(netWorth))
    Log("======================================")
end

-- Add cash to the player (100)
function EconomyFunctions.AddSomeCash()
    local amountToAdd = 100
    
    Log("Adding " .. FormatMoney(amountToAdd) .. " to your cash...")
    
    if AddPlayerCash(amountToAdd) then
        Log("Successfully added money! New balance: " .. FormatMoney(GetPlayerCash()))
    else
        LogError("Failed to add money!")
    end
end

-- Create a transaction for buying an item
function EconomyFunctions.MakePurchase(itemName, price, quantity, useOnlineBalance)
    if not itemName or not price or not quantity then
        LogError("MakePurchase requires itemName, price, and quantity")
        return false
    end
    
    -- Default to using cash if not specified
    useOnlineBalance = useOnlineBalance or false
    
    local totalCost = price * quantity
    local canAfford = false
    
    -- Check if player can afford based on payment method
    if useOnlineBalance then
        canAfford = GetPlayerOnlineBalance() >= totalCost
    else
        canAfford = CheckIfCanAfford(totalCost)
    end
    
    if not canAfford then
        LogWarning("Cannot afford " .. quantity .. "x " .. itemName .. " for " .. FormatMoney(totalCost))
        return false
    end
    
    -- Create transaction with the specified payment method
    if CreateTransaction("Purchase: " .. itemName, price, quantity, useOnlineBalance) then
        Log("Successfully purchased " .. quantity .. "x " .. itemName .. " for " .. FormatMoney(totalCost))
        Log("Payment method: " .. (useOnlineBalance and "Online Balance" or "Cash"))
        return true
    else
        LogError("Failed to process payment")
        return false
    end
end

-- Transfer money between cash and online balance
function EconomyFunctions.TransferToOnlineBalance(amount)
    if not amount or amount <= 0 then
        LogError("Transfer amount must be positive")
        return false
    end
    
    Log("Transferring " .. FormatMoney(amount) .. " from cash to online balance...")
    
    if RemovePlayerCash(amount) and AddOnlineBalance(amount) then
        Log("Transfer successful!")
        Log("New cash balance: " .. FormatMoney(GetPlayerCash()))
        Log("New online balance: " .. FormatMoney(GetPlayerOnlineBalance()))
        return true
    else
        LogError("Transfer failed!")
        return false
    end
end

-- Transfer money from online balance to cash
function EconomyFunctions.TransferToCash(amount)
    if not amount or amount <= 0 then
        LogError("Transfer amount must be positive")
        return false
    end
    
    Log("Transferring " .. FormatMoney(amount) .. " from online balance to cash...")
    
    if RemoveOnlineBalance(amount) and AddPlayerCash(amount) then
        Log("Transfer successful!")
        Log("New cash balance: " .. FormatMoney(GetPlayerCash()))
        Log("New online balance: " .. FormatMoney(GetPlayerOnlineBalance()))
        return true
    else
        LogError("Transfer failed!")
        return false
    end
end

-- Initialize player-dependent code only when player is ready
function OnPlayerReady()
    Log("Economy example: Player is ready, economy functions initialized")
    
    -- Show the player's current cash and online balance
    local cash = GetPlayerCash()
    local online = GetPlayerOnlineBalance()
    
    Log("====== Initial Player Finances ======")
    Log("Cash on hand: " .. FormatMoney(cash))
    Log("Online balance: " .. FormatMoney(online))
    Log("Total: " .. FormatMoney(cash + online))
    Log("===================================")
    
    Log("Use 'economy_examples' console command to see more detailed information")
end

function OnSceneLoaded(sceneName)
    currentScene = sceneName
end

-- Register console commands when the console is ready
function OnConsoleReady()
    if currentScene == "Menu" then return false end

    Log("Economy example: Console is ready, registering commands")
    
    -- Register economy examples command using proper syntax
    RegisterCommand(
        "economy_examples",
        "Demonstrates the Economy API functions",
        "economy_examples",
        function(args)
            Log("Running economy API examples...")
            
            -- Display initial money info
            EconomyFunctions.ShowPlayerMoneyInfo()
            
            -- Add some cash
            EconomyFunctions.AddSomeCash()
            
            -- Make a purchase using cash
            EconomyFunctions.MakePurchase("ogkush", 25.0, 2, false)
            
            -- Make another purchase using online balance
            EconomyFunctions.MakePurchase("ogkush", 25.0, 1, true)

            EconomyFunctions.ShowPlayerMoneyInfo()
            
            -- Transfer some money to online balance
            EconomyFunctions.TransferToOnlineBalance(250)
        end
    )
    
    -- Command to transfer money between cash and online balance
    RegisterCommand(
        "transfer",
        "Transfer money between cash and online balance",
        "transfer <direction> <amount>",
        function(args)
            if not args or #args < 2 then
                LogWarning("Usage: transfer <direction> <amount>")
                LogWarning("  direction: 'to_online' or 'to_cash'")
                LogWarning("  amount: amount to transfer")
                return
            end
            
            local direction = args[1]
            local amount = tonumber(args[2])
            
            if not amount then
                LogError("Amount must be a number")
                return
            end
            
            if direction == "to_online" then
                EconomyFunctions.TransferToOnlineBalance(amount)
            elseif direction == "to_cash" then
                EconomyFunctions.TransferToCash(amount)
            else
                LogWarning("Direction must be 'to_online' or 'to_cash'")
            end
        end
    )
    
    Log("Economy commands registered. Available commands:")
    Log("  economy_examples - Run a demonstration of economy functions")
    Log("  transfer <direction> <amount> - Transfer money between cash and online")
end

-- Update function called every frame (use sparingly)
function Update()
    -- This script doesn't need to do anything in Update
end

-- Cleanup function called when script is unloaded
function Shutdown()
    -- Unregister all commands
    UnregisterCommand("economy_examples")
    UnregisterCommand("transfer")
    
    Log("Economy example script shutdown, all commands unregistered")
end

-- Initial script load message
Log("Economy example script loaded.")
```

### Key Features

- **Money Information Display**: Shows cash balance, online balance, lifetime earnings, and net worth
- **Transaction System**: Creates transactions for purchases with either cash or online payment
- **Money Transfer**: Transfers money between cash and online balance
- **Console Commands**: Includes `economy_examples` to demonstrate features and `transfer` for moving funds

## ATM Deposit Limit Example

This example demonstrates how to modify the ATM deposit limit in the game using the Harmony patching system:

```lua
-- ATM Limit Example Script
-- This script demonstrates how to use the ATM Harmony patching to modify ATM deposit limits

-- Track ATM limit changes
local originalLimit = 10000.0
local presetLimits = {
    ["Default"] = 10000.0,
    ["Medium"] = 25000.0, 
    ["High"] = 50000.0,
    ["Very High"] = 100000.0,
    ["Unlimited"] = 999999.0
}

-- Initialize function called when script is first loaded
function Initialize()
    Log("ATM Limit Example script initialized!")
    return true
end

-- Called when the console is fully loaded and ready
function OnConsoleReady()
    -- Register console commands for ATM limits
    RegisterCommand(
        "atmlimit",
        "Shows or sets the ATM deposit limit using Harmony patching",
        "atmlimit [amount/preset]",
        function(args)
            if #args == 0 then
                -- No args, show current limit
                local currentLimit = GetATMDepositLimit()
                Log("Current ATM deposit limit: " .. FormatMoney(currentLimit))
                Log("Available presets: default, medium, high, veryhigh, unlimited")
                for name, limit in pairs(presetLimits) do
                    Log("  - " .. name .. ": " .. FormatMoney(limit))
                end
            else
                -- Try to set the limit
                local newLimit
                local presetName = string.lower(args[1])
                
                -- Check if it's a preset name
                if presetName == "default" then
                    newLimit = presetLimits["Default"]
                elseif presetName == "medium" then
                    newLimit = presetLimits["Medium"]
                elseif presetName == "high" then
                    newLimit = presetLimits["High"]
                elseif presetName == "veryhigh" then
                    newLimit = presetLimits["Very High"]
                elseif presetName == "unlimited" then
                    newLimit = presetLimits["Unlimited"]
                else
                    -- Try to parse as a number
                    newLimit = tonumber(args[1])
                    if not newLimit then
                        LogError("Invalid limit. Please specify a number or preset (default, medium, high, veryhigh, unlimited)")
                        return
                    end
                end
                
                -- Set the new limit
                Log("Applying Harmony patches for ATM deposit limit: " .. FormatMoney(newLimit))
                if SetATMDepositLimit(newLimit) then
                    Log("Successfully applied patches for ATM deposit limit: " .. FormatMoney(newLimit))
                    Log("Try visiting an ATM to see the new limit in action.")
                    Log("Note: This change affects all ATMs in the game!")
                else
                    LogError("Failed to apply patches for ATM deposit limit")
                end
            end
        end
    )
    
    RegisterCommand(
        "resetatmlimit",
        "Resets the ATM deposit limit to the default value",
        "resetatmlimit",
        function(args)
            if SetATMDepositLimit(originalLimit) then
                Log("Applied Harmony patches to reset ATM deposit limit to default: " .. FormatMoney(originalLimit))
            else
                LogError("Failed to reset ATM deposit limit")
            end
        end
    )
    
    RegisterCommand(
        "findatms",
        "Shows information about ATMs in the game world",
        "findatms",
        function(args)
            Log("Checking for ATM objects in the game...")
            local currentLimit = GetATMDepositLimit()
            Log("Current ATM deposit limit: " .. FormatMoney(currentLimit))
            Log("ATM patching status: Active")
            Log("Note: Changes made via the atmlimit command will apply to ALL ATMs in the game!")
            Log("Use 'atmlimit' command to change the limit value")
        end
    )
    
    Log("ATM Limit commands registered: 'atmlimit', 'resetatmlimit', 'findatms'")
end

-- Called when the player is fully loaded and ready
function OnPlayerReady()
    Log("ATM Limit Example: Player is ready!")
    
    -- Store the original limit when we start
    originalLimit = GetATMDepositLimit()
    Log("Current ATM deposit limit: " .. FormatMoney(originalLimit))
    
    -- Display available presets
    Log("Available ATM limit presets:")
    for name, limit in pairs(presetLimits) do
        Log("  - " .. name .. ": " .. FormatMoney(limit))
    end
    
    Log("Use the 'atmlimit' command to view or change the limit.")
end

-- Cleanup function called when script is unloaded
function Shutdown()
    -- Unregister all commands
    UnregisterCommand("atmlimit")
    UnregisterCommand("resetatmlimit")
    UnregisterCommand("findatms")
    
    Log("ATM Limit Example script shutdown, all commands unregistered")
end
```

### Key Features

- **Preset Limits**: Includes several preset ATM deposit limits (Default, Medium, High, Very High, Unlimited)
- **Command Interface**: Provides commands to check, set, and reset ATM limits
- **Harmony Patching**: Demonstrates how to use the Harmony patching system to modify game behavior
- **Player Feedback**: Shows detailed information about current limits and changes

## Using These Examples

To use these examples in your game:

1. **Copy the Scripts**: Copy the script code into a new Lua file in your ScheduleLua scripts directory
2. **Load the Scripts**: Use the ScheduleLua mod interface to load the scripts
3. **Run the Commands**: Once loaded, use the console commands to interact with the examples

## Combining Features

You can combine features from both examples to create more advanced economy mods, such as:

- A shop system that checks for funds before purchases
- A bank system with custom interest rates and deposit limits
- A salary system that pays the player based on in-game activities
- A taxation system that takes a percentage of transactions

## Best Practices

When working with the Economy API, keep these best practices in mind:

- Always check if functions return success before proceeding with dependent actions
- Handle errors gracefully to prevent script failures
- Use the lifecycle hooks (Initialize, OnConsoleReady, OnPlayerReady) to ensure your code runs at the appropriate time
- Clean up resources and unregister commands in the Shutdown function
- Format money values consistently using FormatMoney() for better readability 
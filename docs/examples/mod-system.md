# Mod System Example

This example demonstrates how to create and use mods with the ScheduleLua Mod System. We'll create two mods: a utilities mod that exports common functions, and a main mod that uses those functions.

## Utilities Mod

First, let's create a utilities mod that exports common functions:

### Folder Structure

```
utils_mod/
  manifest.json
  init.lua
  math_utils.lua
  string_utils.lua
```

### manifest.json

```json
{
  "name": "Utilities Mod",
  "version": "1.0.0",
  "description": "Common utility functions for other mods",
  "author": "Your Name",
  "main": "init.lua",
  "files": [
    "math_utils.lua",
    "string_utils.lua"
  ],
  "dependencies": [],
  "api_version": "0.1.2"
}
```

### init.lua

```lua
-- Utilities Mod: init.lua
UTILS_MOD = {
    version = "1.0.0",
    author = "Your Name"
}

Log("Utilities Mod v" .. UTILS_MOD.version .. " initializing...")

function Initialize()
    Log("Utilities Mod initialized!")
end

-- Export our version for other mods to check
ExportFunction("GetVersion", function()
    return UTILS_MOD.version
end)
```

### math_utils.lua

```lua
-- Utilities Mod: math_utils.lua
UTILS_MOD.Math = {}

-- Calculate tax amount
function UTILS_MOD.Math.CalculateTax(amount, rate)
    rate = rate or 0.15 -- Default rate if not specified
    return amount * rate
end

-- Calculate profit
function UTILS_MOD.Math.CalculateProfit(revenue, expenses)
    return revenue - expenses
end

-- Export math functions
ExportFunction("CalculateTax", UTILS_MOD.Math.CalculateTax)
ExportFunction("CalculateProfit", UTILS_MOD.Math.CalculateProfit)
```

### string_utils.lua

```lua
-- Utilities Mod: string_utils.lua
UTILS_MOD.String = {}

-- Format money
function UTILS_MOD.String.FormatMoney(amount)
    return "$" .. string.format("%.2f", amount)
end

-- Export string functions
ExportFunction("FormatMoney", UTILS_MOD.String.FormatMoney)
```

## Main Mod

Now, let's create a main mod that uses the utilities mod:

### Folder Structure

```
shop_mod/
  manifest.json
  init.lua
  shop.lua
```

### manifest.json

```json
{
  "name": "Shop Mod",
  "version": "1.0.0",
  "description": "A shop mod that uses the utilities mod",
  "author": "Your Name",
  "main": "init.lua",
  "files": [
    "shop.lua"
  ],
  "dependencies": [
    "utils_mod"
  ],
  "api_version": "0.1.2"
}
```

### init.lua

```lua
-- Shop Mod: init.lua
SHOP_MOD = {
    version = "1.0.0",
    author = "Your Name"
}

Log("Shop Mod v" .. SHOP_MOD.version .. " initializing...")

-- Check if the utilities mod is loaded
if not IsModLoaded("utils_mod") then
    LogError("Shop Mod requires utils_mod to be installed!")
    return
end

-- Import functions from the utilities mod
local CalculateTax = ImportFunction("utils_mod", "CalculateTax")
local CalculateProfit = ImportFunction("utils_mod", "CalculateProfit")
local FormatMoney = ImportFunction("utils_mod", "FormatMoney")

-- Check if we got the functions
if not CalculateTax or not CalculateProfit or not FormatMoney then
    LogError("Failed to import functions from utils_mod!")
    return
end

-- Get utilities mod version
local GetUtilsVersion = ImportFunction("utils_mod", "GetVersion")
if GetUtilsVersion then
    Log("Using utils_mod version: " .. GetUtilsVersion())
end

function Initialize()
    Log("Shop Mod initialized!")
    RegisterCommand("shop", SHOP_MOD.OpenShop, "Opens the shop")
end

-- Export our open shop function
ExportFunction("OpenShop", SHOP_MOD.OpenShop)
```

### shop.lua

```lua
-- Shop Mod: shop.lua

-- Import functions from the utilities mod again (needed in this file)
local CalculateTax = ImportFunction("utils_mod", "CalculateTax")
local FormatMoney = ImportFunction("utils_mod", "FormatMoney")

-- Example shop item
SHOP_MOD.items = {
    {
        name = "Health Potion",
        price = 100,
        description = "Restores 50 health"
    },
    {
        name = "Mana Potion",
        price = 150,
        description = "Restores 50 mana"
    }
}

-- Shop functions
function SHOP_MOD.OpenShop()
    Log("Opening shop...")
    SHOP_MOD.DisplayItems()
end

function SHOP_MOD.DisplayItems()
    Log("Available items:")
    for i, item in ipairs(SHOP_MOD.items) do
        local tax = CalculateTax(item.price)
        local totalPrice = item.price + tax
        Log(i .. ". " .. item.name .. " - " .. FormatMoney(totalPrice) .. " (" .. item.description .. ")")
    end
end

function SHOP_MOD.BuyItem(itemIndex)
    local item = SHOP_MOD.items[itemIndex]
    if not item then
        LogError("Invalid item index: " .. itemIndex)
        return
    end
    
    local tax = CalculateTax(item.price)
    local totalPrice = item.price + tax
    
    Log("Bought " .. item.name .. " for " .. FormatMoney(totalPrice))
    Log("Tax paid: " .. FormatMoney(tax))
end

-- Export our buy function
ExportFunction("BuyItem", SHOP_MOD.BuyItem)
```

## Testing the Mods

With both mods installed, you can test them by running the `shop` command in-game. The shop mod will use the utility functions from the utils_mod to calculate prices, taxes, and format the output.

You can also directly call exported functions from the console:

```
> CallModFunction("shop_mod", "OpenShop")
> CallModFunction("shop_mod", "BuyItem", 1)
```

This example demonstrates:

1. Creating mods with dependencies
2. Exporting and importing functions between mods
3. Checking for required dependencies
4. Creating a modular structure with separate files
5. Using namespaces to avoid conflicts 
# Player Inventory API

The Inventory API provides functions for managing the player's inventory, including adding, removing, and checking items.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic inventory functions are available.</p>
</div>

## Overview

The inventory system in Schedule 1 allows scripts to interact with the player's inventory, enabling mods to create custom items, manage inventory contents, and react to inventory changes.

## Available Functions

### GetInventoryItems

**Signature:** `table GetInventoryItems()`

**Description:** Returns a table containing all items in the player's inventory.

**Parameters:** None

**Returns:**
- `table`: An array of inventory items, where each item is a table with properties:
  - `id` (string): Unique identifier for the item
  - `name` (string): Display name of the item
  - `description` (string): Item description
  - `quantity` (number): How many of this item the player has
  - `type` (string): Item category (e.g., "Consumable", "Tool", "Key", etc.)
  - `icon` (string): Path to the item's icon texture
  - `value` (number): The monetary value of the item

**Example:**
```lua
function ListInventory()
    local items = GetInventoryItems()
    
    if #items == 0 then
        ShowNotification("Inventory is empty.")
        return
    end
    
    Log("Inventory contents:")
    for i, item in ipairs(items) do
        Log(i .. ". " .. item.name .. " x" .. item.quantity .. 
            " (" .. item.type .. ") - $" .. item.value)
    end
end

RegisterCommand("inventory", "Lists all inventory items", "inventory", function(args)
    ListInventory()
end)
```

### HasItem

**Signature:** `boolean HasItem(string itemId, number quantity)`

**Description:** Checks if the player has a specific item in their inventory.

**Parameters:**
- `itemId` (string): The ID of the item to check for
- `quantity` (number, optional): The minimum quantity to check for (defaults to 1)

**Returns:**
- `boolean`: True if the player has the item in the specified quantity, false otherwise

**Example:**
```lua
function CheckForKeycard()
    if HasItem("keycard_security") then
        ShowNotification("You have a security keycard.")
        return true
    else
        ShowNotification("You don't have a security keycard.")
        return false
    end
end

-- Use in a door script
function TryOpenSecureDoor()
    if CheckForKeycard() then
        PlaySound("door_unlock")
        ShowNotification("Door unlocked with security keycard.")
    else
        PlaySound("door_locked")
        ShowNotification("This door requires a security keycard.")
    end
end
```

### AddItem

**Signature:** `boolean AddItem(string itemId, number quantity)`

**Description:** Adds an item to the player's inventory.

**Parameters:**
- `itemId` (string): The ID of the item to add
- `quantity` (number, optional): The quantity to add (defaults to 1)

**Returns:**
- `boolean`: True if the item was successfully added, false otherwise

**Example:**
```lua
function GivePlayerMoney(amount)
    if AddItem("money", amount) then
        ShowNotification("You received $" .. amount)
        return true
    else
        ShowNotification("Failed to add money to inventory")
        return false
    end
end

RegisterCommand("givemoney", "Gives money to the player", "givemoney [amount]", function(args)
    if #args < 2 then
        ShowNotification("Please specify an amount")
        return
    end
    
    local amount = tonumber(args[2])
    if not amount or amount <= 0 then
        ShowNotification("Please enter a valid positive amount")
        return
    end
    
    GivePlayerMoney(amount)
end)
```

### RemoveItem

**Signature:** `boolean RemoveItem(string itemId, number quantity)`

**Description:** Removes an item from the player's inventory.

**Parameters:**
- `itemId` (string): The ID of the item to remove
- `quantity` (number, optional): The quantity to remove (defaults to 1)

**Returns:**
- `boolean`: True if the item was successfully removed, false otherwise

**Example:**
```lua
function UseHealthKit()
    if not HasItem("health_kit") then
        ShowNotification("You don't have a health kit.")
        return false
    end
    
    if RemoveItem("health_kit", 1) then
        -- Heal the player
        AddPlayerHealth(50)
        ShowNotification("Used health kit. Health restored.")
        return true
    else
        ShowNotification("Failed to use health kit.")
        return false
    end
}

RegisterCommand("heal", "Uses a health kit", "heal", function(args)
    UseHealthKit()
end)
```

### GetItemQuantity

**Signature:** `number GetItemQuantity(string itemId)`

**Description:** Gets the quantity of a specific item in the player's inventory.

**Parameters:**
- `itemId` (string): The ID of the item to check

**Returns:**
- `number`: The quantity of the item, or 0 if the player doesn't have the item

**Example:**
```lua
function CheckAmmo()
    local ammoCount = GetItemQuantity("ammo_pistol")
    ShowNotification("You have " .. ammoCount .. " pistol ammo remaining.")
    return ammoCount
end

RegisterCommand("ammo", "Checks pistol ammo count", "ammo", function(args)
    CheckAmmo()
end)
```

## Events

### OnInventoryChanged

**Description:** Registers a callback function that is called whenever the player's inventory changes.

**Parameters:**
- `callback` (function): The function to call when the inventory changes. Receives a table containing:
  - `action` (string): The action that occurred ("add", "remove", or "use")
  - `itemId` (string): The ID of the item that changed
  - `quantity` (number): The quantity that was added, removed, or used
  - `inventory` (table): The updated inventory items table

**Returns:** None

**Example:**
```lua
function InitInventoryMonitor()
    OnInventoryChanged(function(data)
        Log("Inventory changed: " .. data.action .. " " .. 
            data.quantity .. "x " .. data.itemId)
        
        -- Example: Alert when player is low on health kits
        if data.action == "remove" and data.itemId == "health_kit" then
            local remaining = GetItemQuantity("health_kit")
            if remaining <= 1 then
                ShowNotification("Warning: You're running low on health kits!")
            end
        end
    end)
end

-- Call this function when your script initializes
InitInventoryMonitor()
```

## Common Item IDs

Here are some common item IDs used in the game:

- `money` - In-game currency
- `keycard_security` - Security keycard for locked doors
- `health_kit` - Restores player health
- `food_sandwich` - Basic food item
- `drink_water` - Basic drink item
- `tool_lockpick` - Used to open certain locks
- `document_id` - Player's ID card
- `phone` - Mobile phone
- `watch` - Wristwatch

## Best Practices

### For Item Management

1. **Always check before removing** - Use HasItem before attempting to remove or use items
2. **Quantity matters** - Remember that some items stack (like money) while others don't
3. **Event-driven design** - Use OnInventoryChanged for reactive inventory behavior

### For User Experience

1. **Provide feedback** - Always show notifications when items are added or removed
2. **Show details** - Display item descriptions and properties when relevant
3. **Fail gracefully** - Handle cases where inventory operations might fail

### Example: Simple Shop System

```lua
local shopItems = {
    { id = "food_sandwich", name = "Sandwich", price = 5 },
    { id = "drink_water", name = "Water Bottle", price = 3 },
    { id = "health_kit", name = "Health Kit", price = 25 }
}

function ShowShop()
    local money = GetItemQuantity("money")
    local message = "Available Items (You have $" .. money .. "):\n"
    
    for i, item in ipairs(shopItems) do
        message = message .. i .. ". " .. item.name .. " - $" .. item.price .. "\n"
    end
    
    ShowDialogue("Shop", message, function(response)
        local selection = tonumber(response)
        if selection and selection >= 1 and selection <= #shopItems then
            BuyItem(shopItems[selection])
        else
            ShowNotification("Invalid selection.")
        end
    end)
end

function BuyItem(item)
    local money = GetItemQuantity("money")
    
    if money < item.price then
        ShowNotification("Not enough money. You need $" .. item.price)
        return
    end
    
    if RemoveItem("money", item.price) then
        if AddItem(item.id, 1) then
            ShowNotification("Purchased " .. item.name .. " for $" .. item.price)
        else
            -- Refund if item couldn't be added
            AddItem("money", item.price)
            ShowNotification("Couldn't purchase item. Inventory might be full.")
        end
    else
        ShowNotification("Transaction failed.")
    end
end

RegisterCommand("shop", "Opens the shop", "shop", function(args)
    ShowShop()
end)
``` 
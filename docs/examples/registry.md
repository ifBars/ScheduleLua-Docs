# Registry API Example

This example demonstrates how to properly use the Registry API in Schedule I, which allows you to access and modify game items, manage inventories, and work with item instances.

## Registry Example Script

Below is a complete example script showcasing best practices for using the Registry API:

```lua
--[[
    Registry API Example Script
    
    This script demonstrates how to properly use the Registry API in Schedule I.
    It shows best practices for:
    - Waiting for Registry to be ready
    - Checking and retrieving items
    - Modifying existing items
    - Working with item instances
    - Safe handling during scene changes
]]

-- Global variables to track state
local initialized = false
local pendingOperations = {}

-- Mod information
local MOD_NAME = "Registry Example"
local MOD_VERSION = "1.0"
local isRegistered = false

-- Called when the script is first loaded
function Initialize()
    Log("=== " .. MOD_NAME .. " v" .. MOD_VERSION .. " ===")
    Log("Script initialized. Waiting for player and registry...")
    
    -- Start monitoring Registry status for scene changes
    StartRegistryMonitoring()
    
    return true
end

-- Called when the player is fully loaded
function OnPlayerReady()
    Log("Player is ready!")
    
    -- The player is ready, but Registry might not be
    -- We'll check if the Registry is ready, otherwise OnRegistryReady will handle it later
    if IsRegistryReady() then
        Log("Registry is already ready when player loaded!")
        -- We can initialize now
        if not initialized then
            InitializeMod()
        end
    else
        Log("Waiting for Registry to be ready...")
        -- OnRegistryReady will handle initialization
    end
end

-- Main initialization function - called when Registry is ready
function InitializeMod()
    if initialized then return end
    
    Log("Initializing mod with Registry access...")
    
    -- Modify some vanilla items
    ModifyVanillaItems()
    
    -- Mark as initialized
    initialized = true
    Log("Mod initialized successfully!")
    
    -- Schedule some follow-up tasks
    ScheduleFollowUpTasks()
end

-- Schedule tasks to execute after initialization
function ScheduleFollowUpTasks()
    -- Example of tasks that we want to run slightly after initialization
    Wait(3.0, function()
        if IsRegistryReady() then
            Log("Running follow-up tasks...")
            
            -- Analyze inventory after player has time to look at new items
            AnalyzePlayerInventory()
        else
            Log("Registry not ready for follow-up tasks, rescheduling...")
            Wait(2.0, ScheduleFollowUpTasks)
        end
    end)
end

-- Modify some vanilla items as examples
function ModifyVanillaItems()
    Log("Modifying vanilla items...")
    
    -- Safe modification with error handling
    local function SafeModifyItem(itemId, properties)
        if not DoesItemExist(itemId) then
            LogWarning("Cannot modify " .. itemId .. ": Item doesn't exist")
            return false
        end
        
        local success = ModifyItem(itemId, properties)
        if success then
            Log("Successfully modified " .. itemId)
        else
            LogWarning("Failed to modify " .. itemId)
        end
        return success
    end
    
    -- Increase jar capacity
    SafeModifyItem("jar", {
        stackLimit = 40,
        description = "A glass jar for storing product. Modified by Lua to hold more!"
    })
    
    -- Improve a strain's quality
    if DoesItemExist("ogkush") then
        SafeModifyItem("ogkush", {
            defaultQuality = "Perfect",
            description = "The finest OG Kush, enhanced by Lua modding"
        })
    end
    
    -- Add custom keywords to items for searchability
    if DoesItemExist("baggie") then
        local baggie = GetItem("baggie")
        if baggie then
            local keywordsTable = {}
            -- Add original keywords if they exist
            if baggie.keywords then
                for i, keyword in ipairs(baggie.keywords) do
                    table.insert(keywordsTable, keyword)
                end
            end
            -- Add our new keywords
            table.insert(keywordsTable, "modded")
            table.insert(keywordsTable, "enhanced")
            
            SafeModifyItem("baggie", {
                keywords = keywordsTable
            })
        end
    end
end

-- Set up continuous monitoring for Registry changes
function StartRegistryMonitoring()
    Log("Starting Registry monitoring...")
    
    -- Keep track of Registry state
    local lastRegistryState = IsRegistryReady()
    
    -- Function to check Registry status periodically
    local function CheckRegistryStatus()
        local currentState = IsRegistryReady()
        
        -- Detect changes in Registry availability
        if currentState ~= lastRegistryState then
            if currentState then
                Log("Registry is now available - processing any pending operations")
                ProcessPendingOperations()
            else
                Log("Registry is no longer available (scene change?)")
            end
            
            lastRegistryState = currentState
        end
        
        -- Continue checking
        Wait(2.0, CheckRegistryStatus)
    end
    
    -- Start the monitoring loop
    CheckRegistryStatus()
end

-- Process operations that were queued when Registry was unavailable
function ProcessPendingOperations()
    if #pendingOperations == 0 then
        Log("No pending operations to process")
        return
    end
    
    Log("Processing " .. #pendingOperations .. " pending operations")
    
    for i, op in ipairs(pendingOperations) do
        Log("Executing: " .. op.name)
        local success, error = pcall(op.func)
        if not success then
            LogWarning("Failed to execute operation: " .. op.name .. " - " .. tostring(error))
        end
    end
    
    -- Clear the queue
    pendingOperations = {}
end

-- Queue operations for when Registry becomes available
function QueueOperation(name, func)
    if IsRegistryReady() then
        -- Execute immediately if Registry is ready
        Log("Executing operation immediately: " .. name)
        local success, error = pcall(func)
        if not success then
            LogWarning("Failed to execute operation: " .. name .. " - " .. tostring(error))
        end
    else
        -- Queue for later execution
        Log("Queuing operation: " .. name)
        table.insert(pendingOperations, {name = name, func = func})
    end
end

-- Example function to analyze inventory contents
function AnalyzePlayerInventory()
    if not IsRegistryReady() then
        Log("Cannot analyze inventory - Registry not ready")
        QueueOperation("Analyze inventory", AnalyzePlayerInventory)
        return
    end
    
    Log("Analyzing player inventory")
    
    -- Get inventory slot count
    local slotCount = GetInventorySlotCount()
    Log("Inventory has " .. slotCount .. " slots")
    
    -- Count items by category
    local categoryCounts = {}
    for i = 0, slotCount - 1 do
        local itemName = GetInventoryItemAt(i)
        if itemName and itemName ~= "" then
            -- Try to find the item's category
            local item = GetItem(itemName)
            if item and item.category then
                categoryCounts[item.category] = (categoryCounts[item.category] or 0) + 1
            end
        end
    end
    
    -- Report category counts
    for category, count in pairs(categoryCounts) do
        Log("Category " .. category .. ": " .. count .. " items")
    end
end

-- Register for console commands when console is ready
function OnConsoleReady()
    if isRegistered then return end
    
    -- Register commands for interacting with our mod
    RegisterCommand(
        "regmenu",
        "Show Registry Example menu",
        "regmenu",
        function(args)
            -- Show a sample mod menu (implementation not shown)
            Log("Would show Registry Example menu here")
        end
    )
    
    -- Command to add a custom item to inventory
    RegisterCommand(
        "regadd",
        "Add a custom item to inventory",
        "regadd <itemId> [quantity]",
        function(args)
            if not args or #args < 1 then
                LogWarning("Usage: regadd <itemId> [quantity]")
                return
            end
            
            local itemId = args[1]
            local quantity = tonumber(args[2] or "1")
            
            if not DoesItemExist(itemId) then
                LogWarning("Item '" .. itemId .. "' does not exist in Registry")
                return
            end
            
            AddToInventory(itemId, quantity)
            Log("Added " .. quantity .. "x " .. itemId .. " to inventory")
        end
    )
    
    isRegistered = true
    Log("Registry Example commands registered")
end

-- Called when Registry is ready (after player ready)
function OnRegistryReady()
    Log("Registry is now ready!")
    
    if not initialized then
        InitializeMod()
    end
end

-- Function called every frame (use sparingly!)
function Update()
    -- This example doesn't need Update functionality
end

-- Called when the script is unloaded
function Shutdown()
    Log("Shutting down Registry Example mod...")
    
    -- Clean up commands
    if isRegistered then
        UnregisterCommand("regmenu")
        UnregisterCommand("regadd")
    end
    
    Log("Registry Example mod shutdown complete")
end
```

## Key Concepts

### Checking Registry Availability

Always check if the Registry is ready before attempting to access it:

```lua
if IsRegistryReady() then
    -- Safe to use Registry functions
    local item = GetItem("itemid")
else
    -- Registry not ready, queue operations for later
    QueueOperation("Get item", function() 
        local item = GetItem("itemid")
        -- Do something with item
    end)
end
```

### Modifying Items

You can modify existing items in the game registry:

```lua
-- Example of modifying an item
ModifyItem("jar", {
    stackLimit = 40,
    description = "A glass jar for storing product. Modified by Lua to hold more!"
})
```

### Handling Scene Changes

Registry availability can change during scene transitions. Implement a monitoring system:

```lua
function StartRegistryMonitoring()
    local lastRegistryState = IsRegistryReady()
    
    local function CheckRegistryStatus()
        local currentState = IsRegistryReady()
        
        if currentState ~= lastRegistryState then
            if currentState then
                -- Registry just became available
                ProcessPendingOperations()
            else
                -- Registry just became unavailable
                -- Likely during scene change
            end
            
            lastRegistryState = currentState
        end
        
        Wait(2.0, CheckRegistryStatus)
    end
    
    CheckRegistryStatus()
end
```

### Queuing Operations

For operations that depend on Registry availability, implement a queuing system:

```lua
function QueueOperation(name, func)
    if IsRegistryReady() then
        -- Execute immediately
        local success, error = pcall(func)
        if not success then
            LogWarning("Failed: " .. tostring(error))
        end
    else
        -- Queue for later
        table.insert(pendingOperations, {name = name, func = func})
    end
end
```

## Common Registry Tasks

### Checking If Items Exist

```lua
if DoesItemExist("itemid") then
    -- Item exists
    Log("Item exists in registry")
else
    -- Item doesn't exist
    LogWarning("Item does not exist")
end
```

### Getting Item Properties

```lua
local item = GetItem("baggie")
if item then
    Log("Item name: " .. item.name)
    Log("Item description: " .. item.description)
    Log("Stack limit: " .. tostring(item.stackLimit))
    -- Access other properties as needed
end
```

### Adding Items to Inventory

```lua
-- Add 5 of "itemid" to player inventory
AddToInventory("itemid", 5)
```

### Checking Inventory Contents

```lua
-- Get inventory slot count
local slotCount = GetInventorySlotCount()

-- Iterate through inventory slots
for i = 0, slotCount - 1 do
    local itemName = GetInventoryItemAt(i)
    if itemName and itemName ~= "" then
        Log("Slot " .. i .. ": " .. itemName)
    end
end
```

## Best Practices

1. **Always check Registry availability** before accessing Registry functions
2. **Use error handling** with `pcall` for Registry operations
3. **Queue operations** when Registry is unavailable
4. **Clean up** registered commands in the `Shutdown` function
5. **Monitor Registry state changes** to handle scene transitions
6. **Use protected operations** to prevent script errors

## Console Commands

This example registers two console commands:

- `regmenu`: Shows a sample mod menu
- `regadd <itemId> [quantity]`: Adds a specified item to the player's inventory

You can register your own commands to interact with the Registry API.

## Complete Example

For the complete example script, see `ScheduleLua/Resources/registry_example.lua` in the ScheduleLua distribution. 
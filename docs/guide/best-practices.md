---
title: ScheduleLua Best Practices
description: Learn how to write efficient, maintainable Lua scripts for ScheduleLua
---

# ScheduleLua Best Practices

::: tip Overview
This guide outlines best practices and recommendations to help you create efficient, maintainable, and reliable scripts with ScheduleLua, based on the official [Lua 5.2 Reference Manual](https://www.lua.org/manual/5.2/).
:::

## Script Structure and Organization

### Script Lifecycle

Implement the following key lifecycle functions in your scripts to ensure proper initialization, execution, and cleanup:

- `Initialize()`: For setup when the script loads. Always return `true`.
- `Update()`: Called every frame (use cautiously to avoid performance issues).
- `OnPlayerReady()`: Called when the player entity is fully initialized.
- `OnConsoleReady()`: Called when the game console is fully initialized.
- `OnSceneLoaded(sceneName)`: Called when a scene is loaded.
- `Shutdown()`: For cleanup and resource de-allocation when the script is unloaded.

Example:
```lua
function Initialize()
    Log("Script initialized!")
    return true
end

function Shutdown()
    UnregisterAllCommands()
    Log("Script shutdown complete")
end
```

### Keep Scripts Focused
- Create scripts that serve a single purpose or feature
- Split complex systems into multiple interrelated scripts
- Use descriptive filenames that reflect functionality

### Variable Scope
::: warning Avoid Global Variables
According to the [Lua 5.2 Manual: 2.2 - Environments and the Global Environment](https://www.lua.org/manual/5.2/manual.html#2.2), global variables can cause unexpected conflicts between scripts.
:::

- Minimize global variables to prevent namespace conflicts 
- Use local variables whenever possible ([Lua 5.2 Manual: 3.3.7 - Local Declarations](https://www.lua.org/manual/5.2/manual.html#3.3.7))
- Prefix globals with your mod name if necessary

```lua
-- Bad
playerInventory = {}  -- Creates a global variable

-- Good
local playerInventory = {}  -- Properly scoped local variable

-- If global is needed
MyMod_PlayerInventory = {}  -- Prefixed global to avoid conflicts
```

## Modularizing Your Scripts

Organize related functionality into modules to improve code organization, reusability, and maintainability. This approach follows Lua's module pattern ([Lua 5.2 Manual: 6.3 - Modules](https://www.lua.org/manual/5.2/manual.html#6.3)), as demonstrated in ScheduleLua examples.

### Using Tables as Modules

Group related functions in a table to create a module. This is the standard Lua 5.2 approach for creating modules:

```lua
-- Create a module for economy-related functions
local EconomyModule = {}  -- Table that will act as our module

-- Add functions to the module
function EconomyModule.ShowBalance()
    local cash = GetPlayerCash()
    local online = GetPlayerOnlineBalance()
    Log("Cash: " .. FormatMoney(cash) .. ", Online: " .. FormatMoney(online))
end

function EconomyModule.TransferToOnline(amount)
    if not amount or amount <= 0 then
        LogWarning("Amount must be positive")
        return false
    end
    
    if RemovePlayerCash(amount) and AddOnlineBalance(amount) then
        Log("Transferred " .. FormatMoney(amount) .. " to online balance")
        return true
    end
    return false
end

-- You can return the module if you want to use it in other scripts
-- This pattern follows Lua 5.2's module practices
return EconomyModule
```

### Module Initialization

Initialize your modules in a structured way, especially when they depend on game systems that might not be immediately available:

```lua
-- Economy module following ScheduleLua patterns
local EconomyFunctions = {}
local isInitialized = false  -- File-scoped private variable

-- Initialize the module
function InitializeEconomyModule()
    if isInitialized then return end
    
    Log("Initializing economy module...")
    -- Do any setup needed
    isInitialized = true
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
    Log("Net worth: " .. FormatMoney(netWorth))
    Log("======================================")
end

-- Transfer money between cash and online balance
function EconomyFunctions.TransferToOnlineBalance(amount)
    -- Parameter validation
    if not amount or amount <= 0 then
        LogWarning("Transfer amount must be positive")
        return false
    end
    
    Log("Transferring " .. FormatMoney(amount) .. " from cash to online balance...")
    
    if RemovePlayerCash(amount) and AddOnlineBalance(amount) then
        Log("Transfer successful!")
        Log("New cash balance: " .. FormatMoney(GetPlayerCash()))
        Log("New online balance: " .. FormatMoney(GetPlayerOnlineBalance()))
        return true
    else
        LogWarning("Transfer failed!")
        return false
    end
end

-- Hook the module into the core game events
function OnPlayerReady()
    InitializeEconomyModule()
    EconomyFunctions.ShowPlayerMoneyInfo()
end

-- Register console commands for the module
function OnConsoleReady()
    RegisterCommand(
        "money_info",
        "Display player money information",
        "money_info",
        function(args)
            EconomyFunctions.ShowPlayerMoneyInfo()
        end
    )
    
    RegisterCommand(
        "transfer",
        "Transfer money to online balance",
        "transfer <amount>",
        function(args)
            if not args or #args < 1 then
                LogWarning("Usage: transfer <amount>")
                return
            end
            
            local amount = tonumber(args[1])
            if not amount then
                LogWarning("Amount must be a number")
                return
            end
            
            EconomyFunctions.TransferToOnlineBalance(amount)
        end
    )
end

-- Clean up when the script is unloaded
function Shutdown()
    UnregisterCommand("money_info")
    UnregisterCommand("transfer")
    Log("Economy module shutdown")
end
```

### Managing Module Dependencies

::: tip
When modules depend on each other, manage these dependencies carefully using Lua's ability to pass tables as references ([Lua 5.2 Manual: 2.1 - Values and Types](https://www.lua.org/manual/5.2/manual.html#2.1)).
:::

```lua
-- Main script

-- Create modules
local PlayerModule = {}
local ShopModule = {}
local UIModule = {}

-- Initialize with dependencies
function Initialize()
    -- Initialize modules in dependency order
    PlayerModule.Initialize()
    ShopModule.Initialize(PlayerModule) -- Shop needs Player
    UIModule.Initialize(PlayerModule, ShopModule) -- UI needs both
    
    return true
end

-- Example shop module with dependency injection
function ShopModule.Initialize(playerModule)
    ShopModule.player = playerModule
    
    -- Now can use the player module
    ShopModule.RefreshStock()
end

function ShopModule.RefreshStock()
    -- Use the player's level to determine available items
    local playerLevel = ShopModule.player.GetLevel()
    
    -- Stock based on player level
    if playerLevel >= 10 then
        -- Add high-level items
    end
end
```

### Exposing Public API

Keep implementation details private and expose only necessary functions, following Lua's approach to information hiding ([Lua 5.2 Manual: 6.3 - Modules](https://www.lua.org/manual/5.2/manual.html#6.3)):

```lua
-- Create a module with private and public parts
local RegistryHandler = {}

-- Private variables (by convention with _)
local _isReady = false
local _pendingOperations = {}

-- Private function (local)
local function checkRegistryStatus()
    local currentState = IsRegistryReady()
    
    if currentState ~= _isReady then
        if currentState then
            Log("Registry is now available")
            processPendingOperations()
        else
            Log("Registry is no longer available")
        end
        
        _isReady = currentState
    end
    
    -- Continue checking
    Wait(2.0, checkRegistryStatus)
end

-- Private function to process queued operations
local function processPendingOperations()
    if #_pendingOperations == 0 then return end
    
    Log("Processing " .. #_pendingOperations .. " pending operations")
    
    for i, op in ipairs(_pendingOperations) do
        Log("Executing: " .. op.name)
        local success, error = pcall(op.func)
        if not success then
            LogWarning("Failed to execute: " .. op.name)
        end
    end
    
    -- Clear the queue
    _pendingOperations = {}
end

-- Public function to start monitoring
function RegistryHandler.StartMonitoring()
    Log("Starting Registry monitoring...")
    checkRegistryStatus()
end

-- Public function to queue operations
function RegistryHandler.QueueOperation(name, func)
    if _isReady then
        -- Execute immediately if Registry is ready
        Log("Executing operation immediately: " .. name)
        local success, error = pcall(func)
        if not success then
            LogWarning("Failed to execute: " .. name)
        end
    else
        -- Queue for later execution
        Log("Queuing operation: " .. name)
        table.insert(_pendingOperations, {name = name, func = func})
    end
end

-- Return only public functions
return {
    StartMonitoring = RegistryHandler.StartMonitoring,
    QueueOperation = RegistryHandler.QueueOperation,
}
```

### Complete Module Example

Here's a complete example based on the ScheduleLua economy module pattern, following Lua 5.2 best practices:

```lua
-- Economy module following ScheduleLua patterns and Lua 5.2 module conventions
local EconomyFunctions = {}
local isInitialized = false  -- File-scoped private variable

-- Initialize the module
function InitializeEconomyModule()
    if isInitialized then return end
    
    Log("Initializing economy module...")
    -- Do any setup needed
    isInitialized = true
end

-- Display player's money information
function EconomyFunctions.ShowPlayerMoneyInfo()
    local cash = GetPlayerCash()
    local online = GetPlayerOnlineBalance()
    local lifetime = GetLifetimeEarnings()
    local netWorth = GetNetWorth()
    
    -- Using Lua's string concatenation operator ([Lua 5.2 Manual: 3.4.5](https://www.lua.org/manual/5.2/manual.html#3.4.5))
    Log("====== Player Money Information ======")
    Log("Cash on hand: " .. FormatMoney(cash))
    Log("Online balance: " .. FormatMoney(online))
    Log("Lifetime earnings: " .. FormatMoney(lifetime))
    Log("Net worth: " .. FormatMoney(netWorth))
    Log("======================================")
end

-- Transfer money between cash and online balance
function EconomyFunctions.TransferToOnlineBalance(amount)
    -- Parameter validation following Lua 5.2 nil and boolean handling
    -- ([Lua 5.2 Manual: 2.1 - Values and Types](https://www.lua.org/manual/5.2/manual.html#2.1))
    if not amount or amount <= 0 then
        LogWarning("Transfer amount must be positive")
        return false
    end
    
    -- Logical operators for conditional execution ([Lua 5.2 Manual: 3.4.4](https://www.lua.org/manual/5.2/manual.html#3.4.4))
    if RemovePlayerCash(amount) and AddOnlineBalance(amount) then
        Log("Transfer successful!")
        Log("New cash balance: " .. FormatMoney(GetPlayerCash()))
        Log("New online balance: " .. FormatMoney(GetPlayerOnlineBalance()))
        return true
    else
        LogWarning("Transfer failed!")
        return false
    end
end

-- Hook the module into the core game events
function OnPlayerReady()
    InitializeEconomyModule()
    EconomyFunctions.ShowPlayerMoneyInfo()
end

-- Register console commands for the module
function OnConsoleReady()
    RegisterCommand(
        "money_info",
        "Display player money information",
        "money_info",
        function(args)  -- Anonymous function ([Lua 5.2 Manual: 3.4.10](https://www.lua.org/manual/5.2/manual.html#3.4.10))
            EconomyFunctions.ShowPlayerMoneyInfo()
        end
    )
    
    RegisterCommand(
        "transfer",
        "Transfer money to online balance",
        "transfer <amount>",
        function(args)
            -- Array/table index checking ([Lua 5.2 Manual: 2.1](https://www.lua.org/manual/5.2/manual.html#2.1))
            if not args or #args < 1 then
                LogWarning("Usage: transfer <amount>")
                return
            end
            
            -- Using Lua's type conversion function ([Lua 5.2 Manual: 6.1 - tonumber](https://www.lua.org/manual/5.2/manual.html#pdf-tonumber))
            local amount = tonumber(args[1])
            if not amount then
                LogWarning("Amount must be a number")
                return
            end
            
            EconomyFunctions.TransferToOnlineBalance(amount)
        end
    )
end

-- Clean up when the script is unloaded
function Shutdown()
    UnregisterCommand("money_info")
    UnregisterCommand("transfer")
    Log("Economy module shutdown")
end

-- Return the module (following Lua 5.2 module pattern)
return EconomyFunctions
```

## Error Handling

### Use Nil Checks and Parameter Validation

::: warning
Always validate inputs and handle edge cases to prevent errors from occurring, following Lua 5.2's error handling mechanisms ([Lua 5.2 Manual: 2.3 - Error Handling](https://www.lua.org/manual/5.2/manual.html#2.3)).
:::

```lua
-- Bad: May cause errors if item doesn't exist
function ExamineItem(itemId)
    local item = GetItem(itemId)
    Log("Examining item: " .. item.name) -- Will cause error if item is nil
end

-- Good: Proper validation with parameter checks
function ExamineItem(itemId)
    -- Validate input parameter
    if not itemId or itemId == "" then
        LogWarning("ExamineItem: itemId is required")
        return false
    end
    
    -- Check if item exists in registry
    if not DoesItemExist(itemId) then
        LogWarning("ExamineItem: Item '" .. itemId .. "' does not exist in registry")
        return false
    end
    
    -- Get and validate item object
    local item = GetItem(itemId)
    if not item then
        LogWarning("ExamineItem: Failed to retrieve item '" .. itemId .. "'")
        return false
    end
    
    -- Now we can safely use item properties
    -- Using the "or" operator for providing defaults
    Log("Examining item: " .. item.name .. " (Quality: " .. (item.quality or "Standard") .. ")")
    return true
end
```

### Check API Availability

Always verify APIs are available before using them, which follows Lua's error prevention principles:

```lua
-- Registry operations should check if Registry is ready
function ModifyItemProperty(itemId, propertyName, value)
    if not IsRegistryReady() then
        LogWarning("Registry not ready, scheduling retry")
        Wait(1.0, function()
            ModifyItemProperty(itemId, propertyName, value)
        end)
        return false
    end
    
    -- Now safe to perform Registry operations
    if not DoesItemExist(itemId) then
        LogWarning("Item '" .. itemId .. "' does not exist")
        return false
    end
    
    -- Proceed with modification
    local properties = {}
    properties[propertyName] = value
    return ModifyItem(itemId, properties)
end
```

### Using pcall for Protected Function Calls

When working with functions that might throw errors, use `pcall` to catch and handle them gracefully:

```lua
-- Safe function execution with pcall
function SafeExecuteFunction(func, ...)
    local success, result = pcall(func, ...)
    if not success then
        LogWarning("Function execution failed: " .. tostring(result))
        return nil
    end
    return result
end

-- Example usage with UI functions that might error
function ShowSafeDialogue(title, message)
    local success, error = pcall(function()
        ShowDialogue(title, message)
    end)
    
    if not success then
        LogWarning("Failed to show dialogue: " .. tostring(error))
        -- Fall back to simple notification
        ShowNotification(message)
    end
end
```

## Performance Optimization

### Avoid Expensive Operations in Update()

::: warning
The `Update()` function runs every frame. Avoid heavy processing here to prevent performance issues.
:::

```lua
-- Bad: Expensive check every frame
function Update()
    if IsRegistryReady() then
        AnalyzePlayerInventory() -- Expensive operation
    end
end

-- Good: Use time-based checks
-- File-scoped local variable for state persistence
local lastInventoryCheck = 0

function Update()
    -- Only check inventory once per minute of game time
    local gameTime = GetGameTime()
    if math.floor(gameTime) ~= lastInventoryCheck then
        lastInventoryCheck = math.floor(gameTime)
        if IsRegistryReady() then
            AnalyzePlayerInventory()
        end
    end
}

-- Even better: Use event-based approach with Wait()
function Initialize()
    -- Schedule periodic checks instead of using Update
    Wait(5.0, PeriodicInventoryCheck)
    return true
end

function PeriodicInventoryCheck()
    if IsRegistryReady() then
        AnalyzePlayerInventory()
    end
    Wait(60.0, PeriodicInventoryCheck) -- Check every 60 seconds
end
```

### Limit Your Use of Update()

For most tasks, the ScheduleLua event system or `Wait()` function is more efficient than using `Update()`:

```lua
-- Example from curfew_example.lua - tracking player state without using Update every frame
function Initialize()
    Log("Player tracking initialized!")
    -- Start periodic position check using Wait
    StartPlayerTracking()
    return true
}

function StartPlayerTracking()
    -- Check player position every 3 seconds instead of every frame
    Wait(3.0, function()
        local currentPos = GetPlayerPosition()
        local currentRegion = GetPlayerRegion()
        
        -- Process position and region changes
        if currentRegion ~= lastRegion then
            Log("Player moved from " .. (lastRegion or "unknown") .. " to " .. currentRegion)
            lastRegion = currentRegion
        end
        
        -- Schedule next check
        StartPlayerTracking()
    end)
}
```

### Cache Results When Possible

Avoid recalculating or requesting the same information repeatedly:

```lua
-- Store frequently accessed data
local cachedData = {
    playerRegion = nil,
    lastUpdateTime = 0,
    npcsInRegion = {},
}

-- Update cache periodically rather than every frame
function UpdateDataCache()
    cachedData.playerRegion = GetPlayerRegion()
    cachedData.npcsInRegion = GetNPCsInRegion(cachedData.playerRegion) or {}
    cachedData.lastUpdateTime = GetGameTime()
    
    -- Schedule next cache update in 5 seconds
    Wait(5.0, UpdateDataCache)
}

function Initialize()
    -- Initialize the data cache
    UpdateDataCache()
    return true
}

-- Now use cached data in Update if needed
function Update()
    -- We can safely use cached data in every frame
    -- without expensive API calls
    for _, npc in pairs(cachedData.npcsInRegion) do
        -- Process NPCs
    end
}
```

## Event Handling

### Using ScheduleLua's Event Lifecycle Hooks

::: tip
ScheduleLua provides a powerful event system with predefined lifecycle hooks that get called automatically at specific moments. Implementing these functions in your scripts allows you to hook into the game's lifecycle.
:::

```lua
-- Called when the script is first loaded
function Initialize()
    Log("My script initialized!")
    -- Do initial setup that doesn't require loaded game systems
    return true  -- Return true to indicate successful initialization
}

-- Called when the player entity is fully loaded and ready
function OnPlayerReady()
    Log("Player is ready!")
    
    -- Safe to access player-related functions now
    local playerPos = GetPlayerPosition()
    local playerHealth = GetPlayerHealth()
    local playerRegion = GetPlayerRegion()
    
    Log("Player starting in region: " .. playerRegion)
    Log("Player position: " .. playerPos.x .. ", " .. playerPos.y .. ", " .. playerPos.z)
    Log("Player health: " .. playerHealth)
    
    -- Setup player-dependent functionality
    StartPlayerMonitoring()
}

-- Called when the console is fully loaded and ready for commands
function OnConsoleReady()
    -- Register custom console commands
    RegisterCommand(
        "heal",
        "Heals player to full health",
        "heal",
        function(args)
            SetPlayerHealth(100)
            Log("Healed player to full health")
        end
    )
    
    RegisterCommand(
        "pos",
        "Shows player position",
        "pos",
        function(args)
            local pos = GetPlayerPosition()
            Log("Position: " .. pos.x .. ", " .. pos.y .. ", " .. pos.z)
        end
    )
    
    Log("Custom commands registered")
}

-- Called when a scene is loaded
function OnSceneLoaded(sceneName)
    Log("Scene loaded: " .. sceneName)
    
    -- You can respond differently based on the scene
    if sceneName == "Menu" then
        -- Handle menu/lobby scene
    elseif sceneName == "Main" then
        -- Handle main/game scene
    end
}

-- Called when the game day changes
function OnDayChanged(day)
    Log("Day changed to: " .. day)
    
    -- Update daily quests
    if day % 7 == 0 then
        Log("It's the start of a new week!")
        -- Weekly reset logic
    end
}

-- Called when the game time changes significantly
function OnTimeChanged(time)
    -- Avoid logging every minute by checking modulo
    if time % 3 == 0 then
        Log("Time is now: " .. FormatGameTime(time))
        
        -- Check for special time-based conditions
        if IsNightTime() then
            Log("It's night time!")
        end
    end
}

-- Called when player health changes
function OnPlayerHealthChanged(newHealth)
    Log("Player health changed to: " .. newHealth)
    
    -- Provide warnings or effects at low health
    if newHealth < 30 then
        Log("Player health is low!")
        -- Maybe play a heartbeat sound or show a warning
    end
}

-- Called when player energy changes
function OnPlayerEnergyChanged(newEnergy)
    Log("Player energy changed to: " .. newEnergy)
    
    -- Provide warnings or effects at low energy
    if newEnergy < 30 then
        Log("Player energy is low!")
        -- Maybe show a warning UI element
    end
}

-- Called when the script is unloaded (cleanup)
function Shutdown()
    -- Unregister commands
    UnregisterCommand("heal")
    UnregisterCommand("pos")
    
    -- Clean up any resources
    Log("Script shutting down, cleaning up resources")
}
```

### Best Practices for Event Hooks

::: info
Understanding when to use each event hook will make your scripts more reliable.
:::

1. **Initialize Only What's Needed**: In the `Initialize` function, only set up variables and resources that don't depend on the game state.

2. **Wait for the Right Event**: Different game systems become available at different times:
   - Player-related functions should be called after `OnPlayerReady`
   - Registry operations should wait for `IsRegistryReady()` to be true
   - Console commands should be registered in `OnConsoleReady`

3. **Handle Scene Changes Properly**: The `OnSceneLoaded` event indicates that the game scene has changed, which often means:
   - Some game systems may temporarily become unavailable
   - Player might be in a different context (shop, home, outside)
   - You may need to reset or update UI elements

4. **Be Efficient in Frequent Events**: Events like `OnTimeChanged` can fire very frequently:
   - Use conditions to limit processing (e.g., only act every X minutes)
   - Keep the code lightweight to avoid performance issues

5. **Clean Up in Shutdown**: Always implement the `Shutdown` function to:
   - Unregister commands
   - Release resources
   - Remove event listeners
   - Clean up UI elements
```

## UI Considerations

### Keep UI Code Separate

Separate UI logic from game logic for better maintainability:

```lua
-- UI module for ScheduleLua
local UI = {}
local initialized = false

-- Initialize UI elements
function UI.Initialize()
    if initialized then return end
    
    -- Create main window
    UI.mainWindowId = CreateWindow("money_window", "Player Money", 10, 10, 300, 200)
    
    -- Add labels
    UI.cashLabelId = AddLabel(UI.mainWindowId, "cash_label", "Loading cash data...")
    SetControlPosition(UI.cashLabelId, 10, 40)
    SetControlSize(UI.cashLabelId, 280, 30)
    
    UI.onlineLabelId = AddLabel(UI.mainWindowId, "online_label", "Loading online data...")
    SetControlPosition(UI.onlineLabelId, 10, 80)
    SetControlSize(UI.onlineLabelId, 280, 30)
    
    -- Add refresh button with callback function
    UI.refreshBtnId = AddButton(UI.mainWindowId, "refresh_btn", "Refresh", function()
        UI.UpdateMoneyDisplay()
        ShowNotification("Money display refreshed")
    end)
    SetControlPosition(UI.refreshBtnId, 100, 140)
    SetControlSize(UI.refreshBtnId, 100, 40)
    
    -- Initially hide the window
    ShowWindow(UI.mainWindowId, false)
    initialized = true
end

-- Update money display with current values
function UI.UpdateMoneyDisplay()
    if not initialized then return end
    
    local cash = GetPlayerCash()
    local online = GetPlayerOnlineBalance()
    
    SetControlText(UI.cashLabelId, "Cash: " .. FormatMoney(cash))
    SetControlText(UI.onlineLabelId, "Online: " .. FormatMoney(online))
end

-- Show the money display
function UI.ShowMoneyDisplay()
    if not initialized then 
        UI.Initialize()
    end
    ShowWindow(UI.mainWindowId, true)
    UI.UpdateMoneyDisplay()
end

-- Hide the money display
function UI.HideMoneyDisplay()
    if initialized then
        ShowWindow(UI.mainWindowId, false)
    end
end

-- Toggle visibility
function UI.ToggleMoneyDisplay()
    if not initialized then
        UI.Initialize()
        ShowWindow(UI.mainWindowId, true)
    else
        local isVisible = IsWindowVisible(UI.mainWindowId)
        ShowWindow(UI.mainWindowId, not isVisible)
    end
    
    -- Update if showing
    if IsWindowVisible(UI.mainWindowId) then
        UI.UpdateMoneyDisplay()
    end
end

-- Clean up all UI elements
function UI.Destroy()
    if not initialized then return end
    
    -- Destroy all controls
    DestroyControl(UI.cashLabelId)
    DestroyControl(UI.onlineLabelId)
    DestroyControl(UI.refreshBtnId)
    
    -- Destroy the window (automatically removes all controls)
    DestroyWindow(UI.mainWindowId)
    
    initialized = false
end
```

### Handle Scene Changes with UI

::: warning
Always properly manage UI elements during scene changes to prevent errors.
:::

```lua
-- Track UI state across scenes
local mainUI = {
    windowId = nil,
    controlIds = {},
    initialized = false
}

function CreateUI()
    if mainUI.initialized then return end
    
    -- Create window
    mainUI.windowId = CreateWindow("main_ui", "Main Interface", 100, 100, 400, 300)
    
    -- Add controls
    local titleId = AddLabel(mainUI.windowId, "title_label", "Main Game UI")
    SetControlPosition(titleId, 10, 40)
    SetControlSize(titleId, 380, 30)
    table.insert(mainUI.controlIds, titleId)
    
    local closeBtnId = AddButton(mainUI.windowId, "close_btn", "Close", function()
        ShowWindow(mainUI.windowId, false)
    end)
    SetControlPosition(closeBtnId, 150, 230)
    SetControlSize(closeBtnId, 100, 40)
    table.insert(mainUI.controlIds, closeBtnId)
    
    -- Show the window
    ShowWindow(mainUI.windowId, true)
    mainUI.initialized = true
    
    Log("UI created successfully")
}

function DestroyUI()
    if not mainUI.initialized then return end
    
    -- Clean up all controls
    for _, controlId in ipairs(mainUI.controlIds) do
        DestroyControl(controlId)
    end
    
    -- Clean up window
    if mainUI.windowId then
        DestroyWindow(mainUI.windowId)
    end
    
    -- Reset state
    mainUI.windowId = nil
    mainUI.controlIds = {}
    mainUI.initialized = false
    
    Log("UI destroyed successfully")
}

function OnSceneLoaded(sceneName)
    Log("Scene loaded: " .. sceneName)
    
    if sceneName == "Main" then
        -- Create UI when entering main scene
        Wait(1.0, function()
            CreateUI()
        end)
    else
        -- Destroy UI when leaving main scene
        DestroyUI()
    end
}

function Shutdown()
    -- Always clean up UI elements when script unloads
    DestroyUI()
}
```

### Show Notifications and Dialogues

Use ScheduleLua's built-in functions for user interactions:

```lua
-- Quick notification
function NotifyPlayer(message)
    ShowNotification(message)
}

-- Show dialogue with player choices
function AskPlayerQuestion(title, question, choices)
    -- Create a table of choices
    choices = choices or {"Yes", "No", "Cancel"}
    
    -- Show dialogue with choices and callback function
    ShowChoiceDialogue(title, question, choices, function(index)
        Log("Player selected: " .. choices[index])
    end)
}

-- Show temporary dialogue that auto-closes
function ShowTemporaryMessage(title, message, delay)
    delay = delay or 5.0  -- Default to 5 seconds
    
    -- Show the dialogue
    ShowDialogue(title, message)
    
    -- Schedule closing the dialogue
    Wait(delay, function()
        CloseDialogue()
    end)
}
```

## Memory Management

### Release References

::: tip
Set variables to nil when you're done with them to help Lua's garbage collector ([Lua 5.2 Manual: 2.5 - Garbage Collection](https://www.lua.org/manual/5.2/manual.html#2.5)).
:::

```lua
function ProcessInventoryData()
    local inventoryData = GetCompleteInventoryData() -- Hypothetical large data structure
    
    -- Process inventory data
    for i, item in ipairs(inventoryData.items) do
        Log("Processing item: " .. item.name)
    end
    
    -- Release the reference to allow garbage collection
    inventoryData = nil
}
```

### Avoid Circular References

Circular references can prevent garbage collection, but Lua 5.2 provides weak tables to address this ([Lua 5.2 Manual: 2.5.2 - Weak Tables](https://www.lua.org/manual/5.2/manual.html#2.5.2)):

```lua
-- Bad: Circular reference that can prevent garbage collection
local shopSystem = {}
local inventorySystem = {}
shopSystem.inventory = inventorySystem
inventorySystem.shop = shopSystem  -- Creates circular reference

-- Good: Use weak references for back-references
local shopSystem = {}
local inventorySystem = {
    -- Store data but not the reference back to shop
    shopData = { name = "Main Shop", isOpen = true }
}
shopSystem.inventory = inventorySystem

-- Or use weak tables if you need the reference
local shopSystem = {}
local inventorySystem = {}
shopSystem.inventory = inventorySystem
-- Create weak table with value mode "v" so references to shopSystem are weak
local weakTable = setmetatable({shop = shopSystem}, {__mode = "v"})
inventorySystem.weakReferences = weakTable
```

## Documentation and Versioning

### Document Your Code

::: info
Well-documented code is easier to maintain and debug, especially when working with multiple scripts.
:::

```lua
-- Analyzes player inventory and calculates total value
-- Examines all items and calculates value based on current market prices
-- @param includeEquipped (boolean) - Whether to include equipped items
-- @returns (number) - Total value in game currency
function CalculateInventoryValue(includeEquipped)
    if not IsRegistryReady() then
        LogWarning("Registry not ready, cannot calculate inventory value")
        return 0
    end
    
    local totalValue = 0
    local slotCount = GetInventorySlotCount()
    
    for i = 0, slotCount - 1 do
        local itemId = GetInventoryItemAt(i)
        if itemId and itemId ~= "" then
            local item = GetItem(itemId)
            if item and item.value then
                totalValue = totalValue + item.value
            end
        end
    end
    
    -- Include equipped items if requested
    if includeEquipped then
        -- Add code to check equipped items
    end
    
    return totalValue
}
```

### Mark Version in Scripts

Include version information in your scripts to track changes and updates:

```lua
local MOD_NAME = "Economy Enhancer"
local MOD_VERSION = "1.2.3"

function Initialize()
    Log("=== " .. MOD_NAME .. " v" .. MOD_VERSION .. " ===")
    Log("Initializing economy enhancement features...")
    return true
}
```

## Testing Best Practices

### Test Script Lifecycle Events

::: tip
Thoroughly test your script through all lifecycle events, especially scene transitions.
:::

- Test script initialization with `Initialize()`
- Test player-dependent functions with `OnPlayerReady()`
- Test console commands with `OnConsoleReady()`
- Test scene transitions with `OnSceneLoaded(sceneName)`
- Verify cleanup with `Shutdown()`

### Check Error Cases

Always test edge cases and error conditions:

```lua
-- Test empty or invalid parameters
function TestParameterValidation()
    Log("Testing parameter validation...")
    
    -- Test with nil parameter
    local result1 = YourFunction(nil)
    Log("Result with nil: " .. tostring(result1) .. " (Should be false)")
    
    -- Test with empty string
    local result2 = YourFunction("")
    Log("Result with empty string: " .. tostring(result2) .. " (Should be false)")
    
    -- Test with valid parameter
    local result3 = YourFunction("validValue")
    Log("Result with valid value: " .. tostring(result3) .. " (Should be true)")
}
```

## Conclusion

Following these best practices will help you create more reliable, maintainable ScheduleLua scripts and provide a better experience for your users. By leveraging Lua 5.2's language features as documented in the [official Lua 5.2 Reference Manual](https://www.lua.org/manual/5.2/), you can write more efficient, cleaner code with fewer bugs and better performance.

Key Lua 5.2 concepts to master for ScheduleLua development include:
- [Values and Types](https://www.lua.org/manual/5.2/manual.html#2.1) - Understanding Lua's dynamic typing system
- [Variables](https://www.lua.org/manual/5.2/manual.html#3.2) - Proper use of local and global variables
- [Error Handling](https://www.lua.org/manual/5.2/manual.html#2.3) - Catching and handling errors properly
- [Garbage Collection](https://www.lua.org/manual/5.2/manual.html#2.5) - Managing memory efficiently
- [Functions](https://www.lua.org/manual/5.2/manual.html#3.4.10) - Using functions as first-class values
- [Tables](https://www.lua.org/manual/5.2/manual.html#3.4.8) - Utilizing Lua's primary data structure effectively
- [Modules](https://www.lua.org/manual/5.2/manual.html#6.3) - Organizing code into reusable components

Remember that well-structured code is easier to debug and extend as your mods grow in complexity.
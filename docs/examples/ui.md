# UI Example Script

This example demonstrates how to create and manipulate UI elements using the ScheduleLua UI API. The script creates notifications, custom windows, and buttons that interact with the game.

## Complete Example

```lua
-- UI Example Script for ScheduleLua
-- Demonstrates creating custom UI elements and notifications

-- Track our UI elements
local mainWindow = nil
local statusText = nil
local buttonCount = 0

-- Initialize function
function Initialize()
    Log("UI Example Script initialized!")
    return true
end

-- Called when the console is ready
function OnConsoleReady()
    -- Register commands for testing UI functions
    RegisterCommand("notify", "Shows a notification", "notify <text>", function(args)
        if args[2] then
            local message = table.concat(args, " ", 2)
            ShowNotification(message)
        else
            LogError("Please provide notification text")
        end
    end)
    
    RegisterCommand("window", "Opens/closes the example window", "window", function(args)
        if mainWindow and IsWindowVisible(mainWindow) then
            HideWindow(mainWindow)
        else
            CreateExampleWindow()
        end
    end)
end

-- Called when the player is ready
function OnPlayerReady()
    Log("UI Example: Player is ready, showing welcome notification")
    
    -- Show a welcome notification
    ShowNotification("Welcome to the UI Example Script!")
    
    -- Wait 2 seconds, then show another notification
    Wait(2, function()
        ShowNotification("Try the 'window' and 'notify' commands!")
    end)
end

-- Creates a custom window with various UI elements
function CreateExampleWindow()
    -- If window already exists but is hidden, just show it
    if mainWindow then
        ShowWindow(mainWindow)
        return
    end
    
    -- Create main window
    mainWindow = CreateWindow("UI Example", 400, 300)
    SetWindowPosition(mainWindow, 100, 100)
    
    -- Add a title label
    local titleLabel = CreateLabel(mainWindow, "ScheduleLua UI Example", 20, 20, 360, 30)
    SetTextSize(titleLabel, 20)
    SetTextColor(titleLabel, 1, 0.7, 0.3) -- Orange-ish color
    
    -- Add status text
    statusText = CreateLabel(mainWindow, "Player Status: OK", 20, 60, 360, 20)
    
    -- Add player info
    local healthLabel = CreateLabel(mainWindow, "Health: " .. GetPlayerHealth(), 20, 90, 170, 20)
    local energyLabel = CreateLabel(mainWindow, "Energy: " .. GetPlayerEnergy(), 210, 90, 170, 20)
    
    -- Add a button that updates player info
    local updateButton = CreateButton(mainWindow, "Update Status", 20, 120, 150, 30)
    SetButtonCallback(updateButton, function()
        SetLabelText(healthLabel, "Health: " .. GetPlayerHealth())
        SetLabelText(energyLabel, "Energy: " .. GetPlayerEnergy())
        
        -- Update status text based on player health
        local health = GetPlayerHealth()
        if health > 75 then
            SetLabelText(statusText, "Player Status: Excellent")
            SetTextColor(statusText, 0, 1, 0) -- Green
        elseif health > 50 then
            SetLabelText(statusText, "Player Status: Good")
            SetTextColor(statusText, 1, 1, 0) -- Yellow
        elseif health > 25 then
            SetLabelText(statusText, "Player Status: Poor")
            SetTextColor(statusText, 1, 0.5, 0) -- Orange
        else
            SetLabelText(statusText, "Player Status: Critical")
            SetTextColor(statusText, 1, 0, 0) -- Red
        end
        
        ShowNotification("Status updated!")
    end)
    
    -- Add a button that heals the player
    local healButton = CreateButton(mainWindow, "Heal Player", 180, 120, 150, 30)
    SetButtonCallback(healButton, function()
        SetPlayerHealth(100)
        SetLabelText(healthLabel, "Health: 100")
        SetLabelText(statusText, "Player Status: Excellent")
        SetTextColor(statusText, 0, 1, 0) -- Green
        ShowNotification("Player healed to full health!")
    end)
    
    -- Add a button that adds new buttons (demonstrating dynamic UI)
    local addButton = CreateButton(mainWindow, "Add Button", 20, 160, 150, 30)
    SetButtonCallback(addButton, function()
        buttonCount = buttonCount + 1
        local newButton = CreateButton(mainWindow, "Button " .. buttonCount, 20, 200 + (buttonCount * 35), 150, 30)
        SetButtonCallback(newButton, function()
            ShowNotification("Button " .. buttonCount .. " clicked!")
        end)
    end)
    
    -- Add a slider to control player energy
    local energySlider = CreateSlider(mainWindow, 20, 200, 310, 30, 0, 100, GetPlayerEnergy())
    local sliderLabel = CreateLabel(mainWindow, "Energy: " .. GetPlayerEnergy(), 340, 200, 40, 30)
    SetSliderCallback(energySlider, function(value)
        SetPlayerEnergy(value)
        SetLabelText(sliderLabel, "Energy: " .. math.floor(value))
        SetLabelText(energyLabel, "Energy: " .. math.floor(value))
    end)
    
    -- Add a close button
    local closeButton = CreateButton(mainWindow, "Close Window", 20, 240, 360, 30)
    SetButtonCallback(closeButton, function()
        HideWindow(mainWindow)
    end)
    
    -- Show the window
    ShowWindow(mainWindow)
end

-- Called every frame
function Update()
    -- Only run every 60 frames (approximately once per second)
    if Time.frameCount % 60 ~= 0 then return end
    
    -- Update UI if window is visible
    if mainWindow and IsWindowVisible(mainWindow) then
        -- Could update elements here if needed
    end
end

-- Called when the script is unloaded
function Shutdown()
    -- Clean up UI elements
    if mainWindow then
        DestroyWindow(mainWindow)
        mainWindow = nil
    end
    
    -- Unregister commands
    UnregisterCommand("notify")
    UnregisterCommand("window")
    
    Log("UI Example Script shutdown")
end
```

## Key Features Demonstrated

### Notifications

The script shows how to create notifications using `ShowNotification()`:

```lua
ShowNotification("Welcome to the UI Example Script!")
```

### Windows

It demonstrates creating and managing windows:

```lua
-- Create a window
mainWindow = CreateWindow("UI Example", 400, 300)
SetWindowPosition(mainWindow, 100, 100)

-- Show/hide a window
ShowWindow(mainWindow)
HideWindow(mainWindow)

-- Destroy a window when done
DestroyWindow(mainWindow)
```

### Labels

Text labels are used to display information:

```lua
-- Create a basic label
local titleLabel = CreateLabel(mainWindow, "ScheduleLua UI Example", 20, 20, 360, 30)

-- Customize label appearance
SetTextSize(titleLabel, 20)
SetTextColor(titleLabel, 1, 0.7, 0.3) -- Orange-ish color

-- Update label text dynamically
SetLabelText(healthLabel, "Health: " .. GetPlayerHealth())
```

### Buttons

Interactive buttons with callbacks:

```lua
-- Create a button
local updateButton = CreateButton(mainWindow, "Update Status", 20, 120, 150, 30)

-- Set button callback function
SetButtonCallback(updateButton, function()
    -- Code to run when button is clicked
    ShowNotification("Status updated!")
end)
```

### Sliders

Sliders for numeric input:

```lua
-- Create a slider with min, max, and default value
local energySlider = CreateSlider(mainWindow, 20, 200, 310, 30, 0, 100, GetPlayerEnergy())

-- Set slider callback function
SetSliderCallback(energySlider, function(value)
    SetPlayerEnergy(value)
    SetLabelText(sliderLabel, "Energy: " .. math.floor(value))
end)
```

### Dynamic UI Creation

The example shows how to create UI elements dynamically at runtime:

```lua
-- Add button creates new buttons dynamically
SetButtonCallback(addButton, function()
    buttonCount = buttonCount + 1
    local newButton = CreateButton(mainWindow, "Button " .. buttonCount, 20, 200 + (buttonCount * 35), 150, 30)
    SetButtonCallback(newButton, function()
        ShowNotification("Button " .. buttonCount .. " clicked!")
    end)
end)
```

### Delayed Actions

Using the `Wait()` function for delayed UI actions:

```lua
-- Wait 2 seconds, then show a notification
Wait(2, function()
    ShowNotification("Try the 'window' and 'notify' commands!")
end)
```

## Best Practices

1. **Store References**: Always store references to UI elements you'll need to access later
2. **Clean Up**: Destroy all UI elements in the `Shutdown()` function
3. **Error Handling**: Check that UI elements exist before trying to modify them
4. **Performance**: Don't create/destroy UI elements every frame
5. **Positioning**: Use consistent spacing and alignment for a professional look
6. **Responsiveness**: Keep UI responsive by avoiding heavy operations in button callbacks
7. **Feedback**: Provide visual and/or notification feedback when users interact with UI

## Known Limitations

The ScheduleLua UI API has some limitations to be aware of:

- UI elements don't automatically adapt to screen size changes
- Complex UI layouts may require manual positioning calculations
- UI performance may decrease with many active elements
- UI elements exist in the global game UI space, be careful not to conflict with game UI

## Using With Other API Features

UI elements can be combined with other API features, such as:

- Display NPC information retrieved with the NPC API
- Show real-time game time using the Time API
- Create inventory management interfaces using the player inventory functions
- Build economy tools using the Economy API

By using the UI API effectively, you can create enhanced gameplay experiences and tools to help players with various aspects of the game. 
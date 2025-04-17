# Window Functions

This section covers functions for creating and managing custom windows in your UI.

## CreateWindow

**Signature:** `string CreateWindow(string id, string title, float x, float y, float width, float height)`

**Description:** Creates a new UI window with the specified dimensions.

### Parameters

- `id` (string): A unique identifier for the window
- `title` (string): The title text displayed in the window's title bar
- `x` (float): The x-coordinate position of the window (pixels from the left)
- `y` (float): The y-coordinate position of the window (pixels from the top)
- `width` (float): The width of the window in pixels
- `height` (float): The height of the window in pixels

### Returns

The window ID if successful, or `nil` if the window could not be created.

### Example

```lua
function CreateInventoryWindow()
    -- Create a window for displaying inventory
    CreateWindow("inventoryWindow", "Player Inventory", 100, 100, 400, 300)
    
    -- Add some controls to the window (see control functions)
    AddLabel("inventoryWindow", "titleLabel", "Your Items:")
    SetControlPosition("titleLabel", 20, 40)
    
    -- Show the window
    ShowWindow("inventoryWindow", true)
end

-- Command to open inventory window
RegisterCommand("inventory", "Opens inventory window", "inventory", function(args)
    CreateInventoryWindow()
end)
```

### Notes

- Windows are not automatically visible; use `ShowWindow` to display them
- Window IDs must be unique across all windows
- Windows can contain multiple controls
- Windows cannot be resized by the user (only programmatically)
- Screen coordinates start from top-left (0,0)

## SetWindowPosition

**Signature:** `void SetWindowPosition(string windowId, float x, float y)`

**Description:** Updates the position of an existing window.

### Parameters

- `windowId` (string): The unique identifier of the window
- `x` (float): The new x-coordinate position (pixels from the left)
- `y` (float): The new y-coordinate position (pixels from the top)

### Returns

None.

### Example

```lua
-- Center a window on screen
function CenterWindow(windowId)
    -- Approximate screen dimensions (you might need to adjust these)
    local screenWidth = 1920
    local screenHeight = 1080
    
    -- Get current window size (this is hypothetical - there's no actual GetWindowSize function yet)
    local windowWidth = 400  -- Assuming default width
    local windowHeight = 300  -- Assuming default height
    
    -- Calculate center position
    local centerX = (screenWidth - windowWidth) / 2
    local centerY = (screenHeight - windowHeight) / 2
    
    -- Update window position
    SetWindowPosition(windowId, centerX, centerY)
}

-- Usage example
function CreateCenteredDialog()
    CreateWindow("messageWindow", "Important Message", 0, 0, 400, 200)
    AddLabel("messageWindow", "messageLabel", "This is an important announcement!")
    SetControlPosition("messageLabel", 20, 60)
    
    -- Center the window
    CenterWindow("messageWindow")
    
    -- Show the window
    ShowWindow("messageWindow", true)
}
```

### Notes

- This function can be used to move windows at runtime
- If the window doesn't exist, no error is thrown but no action is taken
- Positioning windows off-screen may make them inaccessible

## SetWindowSize

**Signature:** `void SetWindowSize(string windowId, float width, float height)`

**Description:** Resizes an existing window.

### Parameters

- `windowId` (string): The unique identifier of the window
- `width` (float): The new width in pixels
- `height` (float): The new height in pixels

### Returns

None.

### Example

```lua
function ResizeWindowForContent(windowId, contentHeight)
    -- Add some padding to the content height
    local newHeight = contentHeight + 80  -- Extra space for title bar and padding
    
    -- Set minimum height
    if newHeight < 150 then
        newHeight = 150
    end
    
    -- Update window size, maintaining current width
    SetWindowSize(windowId, 400, newHeight)
}

-- Example usage
function CreateDynamicWindow(message)
    -- Create window
    CreateWindow("dynamicWindow", "Dynamic Content", 200, 200, 400, 150)
    
    -- Add message content
    AddLabel("dynamicWindow", "contentLabel", message)
    SetControlPosition("contentLabel", 20, 50)
    
    -- Resize window based on message length (simple approximation)
    local lines = math.ceil(string.len(message) / 50)  -- Rough estimate of lines based on chars
    local contentHeight = lines * 20                   -- Assume 20px per line
    ResizeWindowForContent("dynamicWindow", contentHeight)
    
    -- Show the window
    ShowWindow("dynamicWindow", true)
}
```

### Notes

- If controls are positioned outside the new window size, they may be clipped
- After resizing a window, you might need to reposition some controls
- If the window doesn't exist, no error is thrown but no action is taken

## ShowWindow

**Signature:** `void ShowWindow(string windowId, bool visible)`

**Description:** Shows or hides a window.

### Parameters

- `windowId` (string): The unique identifier of the window
- `visible` (bool): Whether the window should be visible (`true`) or hidden (`false`)

### Returns

None.

### Example

```lua
-- Global window state
local isStatsWindowOpen = false
local windowVisible = false

function ToggleStatsWindow()
    if not isStatsWindowOpen then
        -- Create window if doesn't exist yet
        CreateWindow("statsWindow", "Player Statistics", 50, 50, 300, 400)
        
        -- Add content
        local energy = GetPlayerEnergy()
        local health = GetPlayerHealth()
        
        AddLabel("statsWindow", "energyLabel", "Energy: " .. energy)
        SetControlPosition("energyLabel", 20, 60)
        
        AddLabel("statsWindow", "healthLabel", "Health: " .. health)
        SetControlPosition("healthLabel", 20, 100)
        
        isStatsWindowOpen = true
    }
    
    -- Toggle visibility
    ShowWindow("statsWindow", not windowVisible)
    windowVisible = not windowVisible
}

-- Command to toggle stats window
RegisterCommand("stats", "Toggles statistics window", "stats", function(args)
    ToggleStatsWindow()
end)
```

### Notes

- Windows are created hidden by default; you must show them explicitly
- You can toggle a window's visibility without recreating it
- If the window doesn't exist, no error is thrown but no action is taken

## DestroyWindow

**Signature:** `void DestroyWindow(string windowId)`

**Description:** Destroys a window and all its controls.

### Parameters

- `windowId` (string): The unique identifier of the window

### Returns

None.

### Example

```lua
-- Create a temporary message window that auto-closes
function ShowTempMessage(title, message, duration)
    -- Create window with unique ID based on time
    local windowId = "tempWindow_" .. os.time()
    
    CreateWindow(windowId, title, 200, 200, 350, 200)
    AddLabel(windowId, windowId .. "_label", message)
    SetControlPosition(windowId .. "_label", 20, 60)
    
    -- Show the window
    ShowWindow(windowId, true)
    
    -- Schedule destruction after duration
    Wait(duration, function()
        DestroyWindow(windowId)
    end)
    
    return windowId
}

-- Usage example
RegisterCommand("alert", "Shows temporary alert", "alert [message]", function(args)
    if #args < 2 then
        LogError("Please provide a message")
        return
    end
    
    local message = table.concat(args, " ", 2)
    ShowTempMessage("Alert", message, 5.0)
end)
```

### Notes

- This completely removes the window and all its controls from memory
- Use this to clean up windows you no longer need
- Always destroy windows when they're no longer needed to free resources
- If the window doesn't exist, no error is thrown but no action is taken 
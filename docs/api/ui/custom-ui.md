# Custom UI

The Custom UI system provides functions for creating interactive UI elements in Schedule 1, including windows, dialogs, and controls.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Experimental. These functions are working but may have limitations or unexpected behavior in some cases.</p>
</div>

## Dialog Functions

### ShowDialogue

**Signature:** `void ShowDialogue(string title, string text)`

**Description:** Shows a simple dialogue box with a title and text content.

### Parameters

- `title` (string): The title text for the dialogue box
- `text` (string): The main content text for the dialogue box

### Returns

None.

### Example

```lua
function DisplayTutorialInfo()
    ShowDialogue(
        "Welcome to Schedule 1",
        "This is your first day in the city. Get to selling some drugs. " ..
        "What are ya waiting for?."
    )
end

-- Use with a command
RegisterCommand("tutorial", "Shows tutorial information", "tutorial", function(args)
    DisplayTutorialInfo()
end)
```

### Notes

- The dialogue will remain visible until explicitly closed
- Only one dialogue can be shown at a time
- The text will automatically wrap to fit the dialogue box

### ShowDialogueWithTimeout

**Signature:** `void ShowDialogueWithTimeout(string title, string text, float timeout)`

**Description:** Shows a dialogue box that automatically closes after the specified timeout.

### Parameters

- `title` (string): The title text for the dialogue box
- `text` (string): The main content text for the dialogue box
- `timeout` (float): The time in seconds before the dialogue automatically closes

### Returns

None.

### Example

```lua
function OnSceneLoaded(sceneName)
    if sceneName == "Downtown" then
        ShowDialogueWithTimeout(
            "Downtown District",
            "You've arrived in the bustling Downtown district. ",
            5.0
        )
    elseif sceneName == "Residential" then
        ShowDialogueWithTimeout(
            "Residential District", 
            "Welcome to the Residential district. ",
            5.0
        )
    end
end
```

### Notes

- The dialogue will automatically close after the specified timeout
- The timeout is approximate and may vary slightly based on game performance
- Useful for informational messages that don't require user interaction

### ShowChoiceDialogue

**Signature:** `void ShowChoiceDialogue(string title, string text, table choices, function callback)`

**Description:** Shows a dialogue box with multiple choices that the player can select from.

### Parameters

- `title` (string): The title text for the dialogue box
- `text` (string): The main content text for the dialogue box
- `choices` (table): An array of strings representing the available choices
- `callback` (function): A function that will be called when a choice is selected, with the index of the selected choice as a parameter

### Returns

None.

### Example

```lua
function OfferJob()
    local choices = {
        "Accept job ($100/hour)",
        "Decline job",
        "Ask about working conditions"
    }
    
    ShowChoiceDialogue(
        "Job Offer",
        "The manager at QuickMart is offering you a job as a cashier. The pay is $100 per hour. Do you accept?",
        choices,
        function(choiceIndex)
            if choiceIndex == 1 then
                -- Player accepted the job
                ShowNotification("You accepted the job at QuickMart!")
                -- Save job data if Registry is ready
                if IsRegistryReady() then
                    ShowNotification("Job details saved to your record.")
                else
                    ShowNotification("Unable to save job details - Registry not available.")
                end
            elseif choiceIndex == 2 then
                -- Player declined the job
                ShowNotification("You declined the job offer.")
            elseif choiceIndex == 3 then
                -- Player asked for more info
                ShowDialogue(
                    "Working Conditions",
                    "The job requires standing for long periods. Shifts are 8 hours with a 30-minute break. " ..
                    "Benefits include employee discounts and health insurance after 3 months."
                )
                -- Ask again after showing more info
                Wait(4.0, function()
                    OfferJob()  -- Show the original choice dialogue again
                end)
            end
        end
    )
end

-- Command to trigger the job offer
RegisterCommand("job", "Shows a sample job offer", "job", function(args)
    OfferJob()
end)
```

### Notes

- The dialogue will remain visible until a choice is selected
- The callback is called with the index of the selected choice (1-based)
- There is currently a limit of 6 choices per dialogue
- Long choice text will be automatically truncated

### CloseDialogue

**Signature:** `void CloseDialogue()`

**Description:** Closes any currently open dialogue box.

### Parameters

None.

### Returns

None.

### Example

```lua
-- Global dialogue state
local isDialogueOpen = false

function ToggleInfoDialogue()
    if isDialogueOpen then
        CloseDialogue()
        isDialogueOpen = false
    else
        ShowDialogue("Game Information", "Press TAB to open inventory. Press ESC to open main menu.")
        isDialogueOpen = true
    end
end

-- Command to toggle info dialogue
RegisterCommand("info", "Toggles information dialogue", "info", function(args)
    ToggleInfoDialogue()
end)

-- Close dialogue when player enters a new region
function OnPlayerRegionChanged()
    if isDialogueOpen then
        CloseDialogue()
        isDialogueOpen = false
    end
end
```

### Notes

- This function has no effect if no dialogue is currently open
- Useful for programmatically closing dialogues based on game events
- Can close any type of dialogue (normal, timed, or choice)

## Window Functions

### CreateWindow

**Signature:** `void CreateWindow(string id, string title, float x, float y, float width, float height)`

**Description:** Creates a new UI window with the specified dimensions.

### Parameters

- `id` (string): A unique identifier for the window
- `title` (string): The title text displayed in the window's title bar
- `x` (float): The x-coordinate position of the window (pixels from the left)
- `y` (float): The y-coordinate position of the window (pixels from the top)
- `width` (float): The width of the window in pixels
- `height` (float): The height of the window in pixels

### Returns

None.

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

### SetWindowPosition

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

### SetWindowSize

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

### ShowWindow

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

### DestroyWindow

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

## Control Functions

### AddButton

**Signature:** `void AddButton(string windowId, string id, string text, function callback)`

**Description:** Adds a clickable button to a window.

### Parameters

- `windowId` (string): The unique identifier of the parent window
- `id` (string): A unique identifier for the button
- `text` (string): The text displayed on the button
- `callback` (function): A function that will be called when the button is clicked

### Returns

None.

### Example

```lua
function CreateConfirmationDialog(message, onConfirm, onCancel)
    local windowId = "confirmDialog"
    
    -- Create the window
    CreateWindow(windowId, "Confirmation", 200, 200, 350, 200)
    
    -- Add message
    AddLabel(windowId, windowId .. "_message", message)
    SetControlPosition(windowId .. "_message", 20, 60)
    
    -- Add confirm button
    AddButton(windowId, windowId .. "_confirm", "Confirm", function()
        DestroyWindow(windowId)
        if onConfirm then onConfirm() end
    end)
    SetControlPosition(windowId .. "_confirm", 80, 120)
    
    -- Add cancel button
    AddButton(windowId, windowId .. "_cancel", "Cancel", function()
        DestroyWindow(windowId)
        if onCancel then onCancel() end
    end)
    SetControlPosition(windowId .. "_cancel", 200, 120)
    
    -- Show the window
    ShowWindow(windowId, true)
}

-- Usage example
RegisterCommand("repair", "Repair items", "repair", function(args)
    CreateConfirmationDialog(
        "Repair all damaged items for $100?",
        function() 
            -- Confirm callback
            if GetPlayerCash() >= 100 then
                RemovePlayerCash(100)
                ShowNotification("Items repaired!")
            else
                ShowNotification("Not enough money!")
            end
        },
        function() 
            -- Cancel callback
            ShowNotification("Repair cancelled")
        }
    )
end)
```

### Notes

- Button IDs must be unique across all controls
- Buttons execute their callback function when clicked
- Button position defaults to (0,0); use `SetControlPosition` to place it
- Button size defaults to a standard size; use `SetControlSize` to resize it

### AddLabel

**Signature:** `void AddLabel(string windowId, string id, string text)`

**Description:** Adds a text label to a window.

### Parameters

- `windowId` (string): The unique identifier of the parent window
- `id` (string): A unique identifier for the label
- `text` (string): The text displayed in the label

### Returns

None.

### Example

```lua
function CreatePlayerInfoWindow()
    local windowId = "playerInfo"
    
    -- Create window
    CreateWindow(windowId, "Player Information", 100, 100, 350, 250)
    
    -- Get player information
    local playerState = GetPlayerState()
    local region = GetPlayerRegion()
    local money = GetPlayerCash()
    
    -- Create labels with information
    AddLabel(windowId, "nameLabel", "Name: " .. playerState.playerName)
    SetControlPosition("nameLabel", 20, 50)
    
    AddLabel(windowId, "healthLabel", "Health: " .. playerState.health .. "/" .. playerState.maxHealth)
    SetControlPosition("healthLabel", 20, 80)
    
    AddLabel(windowId, "energyLabel", "Energy: " .. playerState.energy .. "/" .. playerState.maxEnergy)
    SetControlPosition("energyLabel", 20, 110)
    
    AddLabel(windowId, "moneyLabel", "Money: $" .. money)
    SetControlPosition("moneyLabel", 20, 140)
    
    AddLabel(windowId, "regionLabel", "Current Region: " .. (region or "Unknown"))
    SetControlPosition("regionLabel", 20, 170)
    
    -- Add close button
    AddButton(windowId, "closeButton", "Close", function()
        DestroyWindow(windowId)
    end)
    SetControlPosition("closeButton", 140, 210)
    
    -- Show the window
    ShowWindow(windowId, true)
}

-- Command to show player info
RegisterCommand("playerinfo", "Shows player information", "playerinfo", function(args)
    CreatePlayerInfoWindow()
end)
```

### Notes

- Label IDs must be unique across all controls
- Labels are not interactive (use buttons for clickable elements)
- Label position defaults to (0,0); use `SetControlPosition` to place it
- Label text can be updated with `SetControlText`

### AddTextField

**Signature:** `void AddTextField(string windowId, string id, string text)`

**Description:** Adds an editable text field to a window.

### Parameters

- `windowId` (string): The unique identifier of the parent window
- `id` (string): A unique identifier for the text field
- `text` (string): The initial text displayed in the text field

### Returns

None.

### Example

```lua
function CreateNotepadWindow()
    local windowId = "notepad"
    
    -- Create window
    CreateWindow(windowId, "Notepad", 200, 200, 400, 300)
    
    -- Add editable text field
    AddTextField(windowId, "noteText", "")
    SetControlPosition("noteText", 20, 50)
    SetControlSize("noteText", 360, 160)
    
    -- Add save button
    AddButton(windowId, "saveButton", "Save Note", function()
        local noteContent = GetControlText("noteText")
        
        if noteContent and noteContent ~= "" then
            -- Check if Registry is ready before saving
            if IsRegistryReady() then
                -- Save the note to the Registry once implemented
                ShowNotification("Note saved!")
            else
                ShowNotification("Registry not ready, cannot save note.")
            end
        else
            ShowNotification("Nothing to save.")
        end
    end)
    SetControlPosition("saveButton", 100, 230)
    
    -- Add close button
    AddButton(windowId, "closeButton", "Close", function()
        DestroyWindow(windowId)
    end)
    SetControlPosition("closeButton", 250, 230)
    
    -- Load previous note if exists (only if Registry is ready)
    if IsRegistryReady() then
        -- Get saved note from registry if it exists once implemented
    end
    
    -- Show the window
    ShowWindow(windowId, true)
end

-- Command to open notepad
RegisterCommand("notes", "Opens notepad", "notes", function(args)
    CreateNotepadWindow()
end)
```

### Notes

- Text field IDs must be unique across all controls
- Text fields allow user input
- Text field position defaults to (0,0); use `SetControlPosition` to place it
- Text field size defaults to a standard size; use `SetControlSize` to resize it
- Get the current text with `GetControlText`

### GetControlText

**Signature:** `string GetControlText(string controlId)`

**Description:** Gets the current text from a UI control.

### Parameters

- `controlId` (string): The unique identifier of the control

### Returns

A string containing the text of the control, or an empty string if the control doesn't exist or has no text.

### Example

```lua
function CreateSearchWindow()
    local windowId = "search"
    
    -- Create window
    CreateWindow(windowId, "Search NPCs", 200, 200, 400, 250)
    
    -- Add search field
    AddLabel(windowId, "instructionLabel", "Enter NPC name:")
    SetControlPosition("instructionLabel", 20, 50)
    
    AddTextField(windowId, "searchField", "")
    SetControlPosition("searchField", 20, 80)
    SetControlSize("searchField", 360, 30)
    
    -- Add search button
    AddButton(windowId, "searchButton", "Search", function()
        local searchText = GetControlText("searchField")
        
        if searchText and searchText ~= "" then
            -- Search for NPC
            local npc = FindNPC(searchText)
            
            if npc then
                local npcPos = GetNPCPosition(npc)
                local npcRegion = GetNPCRegion(searchText)
                
                -- Update result label with NPC information
                SetControlText("resultLabel", "Found " .. searchText .. " in " .. 
                    (npcRegion or "Unknown") .. " region.\nPosition: " .. 
                    npcPos.x .. ", " .. npcPos.y .. ", " .. npcPos.z)
            else
                SetControlText("resultLabel", "NPC not found: " .. searchText)
            end
        else
            SetControlText("resultLabel", "Please enter an NPC name")
        end
    end)
    SetControlPosition("searchButton", 150, 120)
    
    -- Add results label
    AddLabel(windowId, "resultLabel", "")
    SetControlPosition("resultLabel", 20, 160)
    
    -- Add close button
    AddButton(windowId, "closeButton", "Close", function()
        DestroyWindow(windowId)
    end)
    SetControlPosition("closeButton", 150, 210)
    
    -- Show the window
    ShowWindow(windowId, true)
}

-- Command to open search window
RegisterCommand("searchnpc", "Search for NPCs", "searchnpc", function(args)
    CreateSearchWindow()
end)
```

### Notes

- Works with labels, buttons, and text fields
- Most useful for getting user input from text fields
- Returns an empty string if the control doesn't exist
- Control IDs are case-sensitive

### SetControlText

**Signature:** `void SetControlText(string controlId, string text)`

**Description:** Sets the text of a UI control.

### Parameters

- `controlId` (string): The unique identifier of the control
- `text` (string): The new text to set for the control

### Returns

None.

### Example

```lua
function CreateTimeWatch()
    local windowId = "timeWatch"
    local timeLabel = "currentTime"
    local dayLabel = "currentDay"
    
    -- Create window
    CreateWindow(windowId, "Game Time", 50, 50, 250, 150)
    
    -- Add labels for time and day
    AddLabel(windowId, timeLabel, "")
    SetControlPosition(timeLabel, 20, 50)
    
    AddLabel(windowId, dayLabel, "")
    SetControlPosition(dayLabel, 20, 80)
    
    -- Update function for time display
    local function UpdateTimeDisplay()
        local gameTime = GetGameTime()
        local formattedTime = FormatGameTime(gameTime)
        local gameDay = GetGameDay()
        
        SetControlText(timeLabel, "Time: " .. formattedTime)
        SetControlText(dayLabel, "Day: " .. gameDay)
    end
    
    -- Initial update
    UpdateTimeDisplay()
    
    -- Schedule regular updates
    local function ScheduleUpdate()
        Wait(10.0, function()
            if IsWindowVisible(windowId) then  -- Check if window is still visible
                UpdateTimeDisplay()
                ScheduleUpdate()  -- Schedule next update
            end
        end)
    end
    
    ScheduleUpdate()
    
    -- Add close button
    AddButton(windowId, "closeButton", "Close", function()
        DestroyWindow(windowId)
    end)
    SetControlPosition("closeButton", 100, 110)
    
    -- Show the window
    ShowWindow(windowId, true)
    
    return windowId
}

-- Command to show time watch
RegisterCommand("timewatch", "Shows game time watch", "timewatch", function(args)
    CreateTimeWatch()
end)
```

### Notes

- Works with labels, buttons, and text fields
- Useful for updating UI based on game state changes
- If the control doesn't exist, no error is thrown but no action is taken
- Text updates are immediate

### SetControlPosition

**Signature:** `void SetControlPosition(string controlId, float x, float y)`

**Description:** Sets the position of a UI control within its parent window.

### Parameters

- `controlId` (string): The unique identifier of the control
- `x` (float): The x-coordinate position relative to the window (pixels from the left)
- `y` (float): The y-coordinate position relative to the window (pixels from the top)

### Returns

None.

### Example

```lua
function CreateLoginWindow()
    local windowId = "login"
    
    -- Create window
    CreateWindow(windowId, "Login", 200, 200, 300, 220)
    
    -- Add username label and field
    AddLabel(windowId, "usernameLabel", "Username:")
    SetControlPosition("usernameLabel", 20, 50)
    
    AddTextField(windowId, "usernameField", "")
    SetControlPosition("usernameField", 100, 50)
    SetControlSize("usernameField", 180, 30)
    
    -- Add password label and field
    AddLabel(windowId, "passwordLabel", "Password:")
    SetControlPosition("passwordLabel", 20, 90)
    
    AddTextField(windowId, "passwordField", "")
    SetControlPosition("passwordField", 100, 90)
    SetControlSize("passwordField", 180, 30)
    
    -- Add login button
    AddButton(windowId, "loginButton", "Login", function()
        local username = GetControlText("usernameField")
        local password = GetControlText("passwordField")
        
        if username == "admin" and password == "password" then
            ShowNotification("Login successful!")
            DestroyWindow(windowId)
        else
            ShowNotification("Invalid credentials")
        end
    end)
    SetControlPosition("loginButton", 100, 140)
    
    -- Add cancel button
    AddButton(windowId, "cancelButton", "Cancel", function()
        DestroyWindow(windowId)
    end)
    SetControlPosition("cancelButton", 200, 140)
    
    -- Show the window
    ShowWindow(windowId, true)
}

-- Command to show login window
RegisterCommand("login", "Shows login window", "login", function(args)
    CreateLoginWindow()
end)
```

### Notes

- Coordinates are relative to the parent window, not the screen
- (0,0) is the top-left corner of the window's content area
- Negative coordinates may position the control outside the visible window area
- If the control doesn't exist, no error is thrown but no action is taken

### SetControlSize

**Signature:** `void SetControlSize(string controlId, float width, float height)`

**Description:** Sets the size of a UI control.

### Parameters

- `controlId` (string): The unique identifier of the control
- `width` (float): The width of the control in pixels
- `height` (float): The height of the control in pixels

### Returns

None.

### Example

```lua
function CreateMessageComposer()
    local windowId = "composer"
    
    -- Create window
    CreateWindow(windowId, "Message Composer", 150, 150, 500, 400)
    
    -- Add recipient label and field
    AddLabel(windowId, "recipientLabel", "To:")
    SetControlPosition("recipientLabel", 20, 50)
    
    AddTextField(windowId, "recipientField", "")
    SetControlPosition("recipientField", 70, 50)
    SetControlSize("recipientField", 410, 30)
    
    -- Add subject label and field
    AddLabel(windowId, "subjectLabel", "Subject:")
    SetControlPosition("subjectLabel", 20, 90)
    
    AddTextField(windowId, "subjectField", "")
    SetControlPosition("subjectField", 70, 90)
    SetControlSize("subjectField", 410, 30)
    
    -- Add message content field
    AddLabel(windowId, "messageLabel", "Message:")
    SetControlPosition("messageLabel", 20, 130)
    
    AddTextField(windowId, "messageField", "")
    SetControlPosition("messageField", 20, 160)
    SetControlSize("messageField", 460, 170)
    
    -- Add send button
    AddButton(windowId, "sendButton", "Send", function()
        local recipient = GetControlText("recipientField")
        local subject = GetControlText("subjectField")
        local message = GetControlText("messageField")
        
        if recipient == "" or message == "" then
            ShowNotification("Please enter recipient and message")
        else
            -- Here you might implement actual message sending
            ShowNotification("Message sent to " .. recipient)
            DestroyWindow(windowId)
        end
    end)
    SetControlPosition("sendButton", 200, 350)
    SetControlSize("sendButton", 100, 30)
    
    -- Show the window
    ShowWindow(windowId, true)
}

-- Command to open message composer
RegisterCommand("compose", "Opens message composer", "compose", function(args)
    CreateMessageComposer()
end)
```

### Notes

- Control sizes are specified in pixels
- Some controls have minimum sizes that will be enforced
- Oversized controls may extend beyond the window boundaries
- If the control doesn't exist, no error is thrown but no action is taken

### ShowControl

**Signature:** `void ShowControl(string controlId, bool visible)`

**Description:** Shows or hides a UI control.

### Parameters

- `controlId` (string): The unique identifier of the control
- `visible` (bool): Whether the control should be visible (`true`) or hidden (`false`)

## UI Styling Functions

The UI API provides functions for styling UI elements directly from Lua. These functions allow you to customize the appearance of windows, buttons, labels, text fields, and boxes.

### SetWindowStyle

**Signature:** `void SetWindowStyle(string colorName, float r, float g, float b, float a = 1.0f)`

**Description:** Sets the background color of windows.

### Parameters

- `colorName` (string): The part of the style to modify ("background", "text", "border", etc.)
- `r` (float): Red component (0.0 to 1.0)
- `g` (float): Green component (0.0 to 1.0)
- `b` (float): Blue component (0.0 to 1.0)
- `a` (float): Alpha component (0.0 to 1.0, optional, defaults to 1.0)

### Returns

None.

### Example

```lua
-- Create a dark blue window with semi-transparency
CreateWindow("myWindow", "Styled Window", 100, 100, 400, 300)
SetWindowStyle("background", 0.1, 0.1, 0.3, 0.95)
```

### SetButtonStyle

**Signature:** `void SetButtonStyle(string colorName, float r, float g, float b, float a = 1.0f)`

**Description:** Sets the colors for button elements.

### Parameters

- `colorName` (string): The part of the style to modify ("background", "text", "hover", "active")
- `r` (float): Red component (0.0 to 1.0)
- `g` (float): Green component (0.0 to 1.0)
- `b` (float): Blue component (0.0 to 1.0)
- `a` (float): Alpha component (0.0 to 1.0, optional, defaults to 1.0)

### Returns

None.

### Example

```lua
-- Create a red button with white text
CreateWindow("myWindow", "Window with Styled Button", 100, 100, 400, 300)
AddButton("myWindow", "myButton", "Click Me", function() 
    ShowNotification("Button clicked!") 
end)
SetButtonStyle("background", 0.8, 0.2, 0.2, 1.0)
SetButtonStyle("text", 1.0, 1.0, 1.0, 1.0)
SetButtonStyle("hover", 1.0, 0.3, 0.3, 1.0)
```

### SetLabelStyle

**Signature:** `void SetLabelStyle(string colorName, float r, float g, float b, float a = 1.0f)`

**Description:** Sets the colors for label elements.

### Parameters

- `colorName` (string): The part of the style to modify (typically "text")
- `r` (float): Red component (0.0 to 1.0)
- `g` (float): Green component (0.0 to 1.0)
- `b` (float): Blue component (0.0 to 1.0)
- `a` (float): Alpha component (0.0 to 1.0, optional, defaults to 1.0)

### Returns

None.

### Example

```lua
-- Create a green label
CreateWindow("myWindow", "Window with Styled Label", 100, 100, 400, 300)
AddLabel("myWindow", "myLabel", "This is a styled label")
SetLabelStyle("text", 0.2, 0.8, 0.2, 1.0)
```

### SetTextFieldStyle

**Signature:** `void SetTextFieldStyle(string colorName, float r, float g, float b, float a = 1.0f)`

**Description:** Sets the colors for text field elements.

### Parameters

- `colorName` (string): The part of the style to modify ("background", "text")
- `r` (float): Red component (0.0 to 1.0)
- `g` (float): Green component (0.0 to 1.0)
- `b` (float): Blue component (0.0 to 1.0)
- `a` (float): Alpha component (0.0 to 1.0, optional, defaults to 1.0)

### Returns

None.

### Example

```lua
-- Create a dark text field with yellow text
CreateWindow("myWindow", "Window with Styled TextField", 100, 100, 400, 300)
AddTextField("myWindow", "myTextField", "Enter text here")
SetTextFieldStyle("background", 0.1, 0.1, 0.1, 1.0)
SetTextFieldStyle("text", 1.0, 1.0, 0.0, 1.0)
```

### SetBoxStyle

**Signature:** `void SetBoxStyle(string colorName, float r, float g, float b, float a = 1.0f)`

**Description:** Sets the colors for box elements.

### Parameters

- `colorName` (string): The part of the style to modify ("background", "text", "border")
- `r` (float): Red component (0.0 to 1.0)
- `g` (float): Green component (0.0 to 1.0)
- `b` (float): Blue component (0.0 to 1.0)
- `a` (float): Alpha component (0.0 to 1.0, optional, defaults to 1.0)

### Returns

None.

### Example

```lua
-- Set the box style for any boxes used in the UI
SetBoxStyle("background", 0.2, 0.2, 0.3, 0.8)
SetBoxStyle("border", 0.5, 0.5, 0.7, 1.0)
```

### SetFontSize

**Signature:** `void SetFontSize(string styleName, int size)`

**Description:** Sets the font size for the specified UI element style.

### Parameters

- `styleName` (string): The style to modify ("window", "button", "label", "textfield", "box")
- `size` (int): The font size in points

### Returns

None.

### Example

```lua
-- Create a window with larger text in the title and labels
CreateWindow("myWindow", "Large Font Window", 100, 100, 400, 300)
SetFontSize("window", 20)  -- Sets window title font size
AddLabel("myWindow", "myLabel", "This is a large label")
SetFontSize("label", 18)   -- Sets label font size
```

### SetFontStyle

**Signature:** `void SetFontStyle(string styleName, string fontStyle)`

**Description:** Sets the font style for the specified UI element.

### Parameters

- `styleName` (string): The style to modify ("window", "button", "label", "textfield", "box")
- `fontStyle` (string): The font style ("normal", "bold", "italic", "bolditalic")

### Returns

None.

### Example

```lua
-- Create a window with bold buttons and italic labels
CreateWindow("myWindow", "Font Style Window", 100, 100, 400, 300)
AddButton("myWindow", "myButton", "Bold Button", function() end)
SetFontStyle("button", "bold")
AddLabel("myWindow", "myLabel", "Italic Label")
SetFontStyle("label", "italic")
```

### SetTextAlignment

**Signature:** `void SetTextAlignment(string styleName, string alignment)`

**Description:** Sets the text alignment for the specified UI element.

### Parameters

- `styleName` (string): The style to modify ("window", "button", "label", "textfield", "box")
- `alignment` (string): The text alignment ("upperleft", "uppercenter", "upperright", "middleleft", "middlecenter", "middleright", "lowerleft", "lowercenter", "lowerright")

### Returns

None.

### Example

```lua
-- Create a window with centered button text and right-aligned label
CreateWindow("myWindow", "Text Alignment Window", 100, 100, 400, 300)
AddButton("myWindow", "myButton", "Centered Text", function() end)
SetTextAlignment("button", "middlecenter")
AddLabel("myWindow", "myLabel", "Right Aligned Text")
SetTextAlignment("label", "middleright")
```

### SetBorder

**Signature:** `void SetBorder(string styleName, int left, int right, int top, int bottom)`

**Description:** Sets the border dimensions for the specified UI element.

### Parameters

- `styleName` (string): The style to modify ("window", "button", "textfield", "box")
- `left` (int): Left border size in pixels
- `right` (int): Right border size in pixels
- `top` (int): Top border size in pixels
- `bottom` (int): Bottom border size in pixels

### Returns

None.

### Example

```lua
-- Create a window with custom borders
CreateWindow("myWindow", "Custom Borders Window", 100, 100, 400, 300)
SetBorder("window", 10, 10, 20, 10)
AddButton("myWindow", "myButton", "Custom Border Button", function() end)
SetBorder("button", 5, 5, 5, 5)
```

### SetPadding

**Signature:** `void SetPadding(string styleName, int left, int right, int top, int bottom)`

**Description:** Sets the padding dimensions for the specified UI element.

### Parameters

- `styleName` (string): The style to modify ("window", "button", "label", "textfield", "box")
- `left` (int): Left padding in pixels
- `right` (int): Right padding in pixels
- `top` (int): Top padding in pixels
- `bottom` (int): Bottom padding in pixels

### Returns

None.

### Example

```lua
-- Create a window with custom padding
CreateWindow("myWindow", "Custom Padding Window", 100, 100, 400, 300)
SetPadding("window", 15, 15, 30, 15)
AddButton("myWindow", "myButton", "Custom Padding Button", function() end)
SetPadding("button", 10, 10, 5, 5)
```

## Styling Examples

### Creating a Custom Themed Window

```lua
function CreateCustomStyledWindow()
    -- Create the base window
    CreateWindow("styledWindow", "Custom Styled UI", 100, 100, 500, 400)
    
    -- Style the window with a dark theme
    SetWindowStyle("background", 0.12, 0.12, 0.15, 0.95)
    SetFontSize("window", 18)
    SetFontStyle("window", "bold")
    SetBorder("window", 8, 8, 8, 8)
    SetPadding("window", 12, 12, 25, 12)
    
    -- Add a title label
    AddLabel("styledWindow", "titleLabel", "Welcome to the Custom UI Demo")
    SetControlPosition("titleLabel", 20, 40)
    SetControlSize("titleLabel", 460, 30)
    SetLabelStyle("text", 0.9, 0.9, 1.0, 1.0)
    SetFontSize("label", 16)
    SetFontStyle("label", "bold")
    SetTextAlignment("label", "middlecenter")
    
    -- Add a description
    AddLabel("styledWindow", "descLabel", "This window demonstrates the styling capabilities of the UI system.")
    SetControlPosition("descLabel", 20, 80)
    SetControlSize("descLabel", 460, 60)
    SetLabelStyle("text", 0.8, 0.8, 0.9, 1.0)
    SetFontSize("label", 14)
    SetTextAlignment("label", "middlecenter")
    
    -- Add a text field
    AddTextField("styledWindow", "nameField", "Enter your name")
    SetControlPosition("nameField", 150, 160)
    SetControlSize("nameField", 200, 30)
    SetTextFieldStyle("background", 0.18, 0.18, 0.22, 1.0)
    SetTextFieldStyle("text", 1.0, 1.0, 1.0, 1.0)
    SetBorder("textfield", 4, 4, 4, 4)
    SetPadding("textfield", 5, 5, 5, 5)
    
    -- Add buttons with different styles
    AddButton("styledWindow", "acceptButton", "Save", function()
        local name = GetControlText("nameField")
        ShowNotification("Name saved: " .. name)
    end)
    SetControlPosition("acceptButton", 150, 220)
    SetControlSize("acceptButton", 90, 35)
    SetButtonStyle("background", 0.2, 0.6, 0.3, 1.0)
    SetButtonStyle("hover", 0.3, 0.7, 0.4, 1.0)
    SetButtonStyle("active", 0.4, 0.8, 0.5, 1.0)
    SetButtonStyle("text", 1.0, 1.0, 1.0, 1.0)
    
    AddButton("styledWindow", "cancelButton", "Cancel", function()
        DestroyWindow("styledWindow")
    end)
    SetControlPosition("cancelButton", 260, 220)
    SetControlSize("cancelButton", 90, 35)
    SetButtonStyle("background", 0.6, 0.2, 0.2, 1.0)
    SetButtonStyle("hover", 0.7, 0.3, 0.3, 1.0)
    SetButtonStyle("active", 0.8, 0.4, 0.4, 1.0)
    SetButtonStyle("text", 1.0, 1.0, 1.0, 1.0)
    
    -- Show the window
    ShowWindow("styledWindow", true)
end

-- Register a command to show the window
RegisterCommand("styledui", "Shows a custom styled UI window", "styledui", function(args)
    CreateCustomStyledWindow()
end)
```

The example above demonstrates how to create a fully styled window with custom colors, fonts, and layout. You can adapt these styling techniques to create UI that matches your mod's visual theme.

## Storage Entity Functions

The Storage Entity system provides functions for creating and managing in-game storage containers that can hold items.

### CreateStorageEntity

**Signature:** `string CreateStorageEntity(string name, int slotCount, int rowCount)`

**Description:** Creates a storage entity with a specified number of slots and rows.

#### Parameters

- `name` (string): The name of the storage entity
- `slotCount` (int): The number of slots in the storage (1-50)
- `rowCount` (int): The number of rows to display in the UI

#### Returns

- `entityId` (string): A unique ID for the created storage entity

#### Example

```lua
function CreatePlayerChest()
    local chestId = CreateStorageEntity("Player's Chest", 24, 4)
    
    -- Add some starting items
    AddItemToStorage(chestId, "item_healing_potion", 5)
    AddItemToStorage(chestId, "item_gold_coin", 100)
    
    return chestId
end

-- Command to open the player's chest
RegisterCommand("chest", "Opens your personal storage chest", "chest", function(args)
    if not _G.playerChestId then
        _G.playerChestId = CreatePlayerChest()
    end
    
    OpenStorageEntity(_G.playerChestId)
end)
```

#### Notes

- Storage entities persist until the script is unloaded or the game is closed
- The slot count is clamped between 1 and 50
- Row count determines how many rows are visible in the UI at once
- Each storage entity has a unique ID that must be used for all operations

### OpenStorageEntity

**Signature:** `void OpenStorageEntity(string entityId)`

**Description:** Opens the UI for a storage entity.

#### Parameters

- `entityId` (string): The ID of the storage entity to open

#### Returns

None.

#### Example

```lua
function OpenQuestRewardChest(questName)
    local chestId = _G.questChests[questName]
    
    if chestId then
        -- Set a custom title before opening
        SetStorageName(chestId, questName .. " - Quest Rewards")
        SetStorageSubtitle(chestId, "Claim your rewards for completing the quest")
        
        -- Open the storage UI
        OpenStorageEntity(chestId)
    else
        ShowNotification("Error", "Reward chest not found!")
    end
end
```

#### Notes

- Only one storage entity can be open at a time
- Opening a storage entity will close any currently open storage
- The storage entity must exist or an error will be logged

### CloseStorageEntity

**Signature:** `void CloseStorageEntity(string entityId)`

**Description:** Closes the UI for a storage entity.

#### Parameters

- `entityId` (string): The ID of the storage entity to close

#### Returns

None.

#### Example

```lua
function CloseAllStorageEntities()
    -- Close all created storage entities
    for questName, chestId in pairs(_G.questChests) do
        CloseStorageEntity(chestId)
    end
end

-- Close all storage when player enters combat
function OnCombatStart()
    CloseAllStorageEntities()
    ShowNotification("Combat", "Storage closed due to combat!")
end
```

#### Notes

- Closing a storage that is not open has no effect
- The storage entity must exist or an error will be logged

### AddItemToStorage

**Signature:** `boolean AddItemToStorage(string entityId, string itemId, int quantity)`

**Description:** Adds an item to a storage entity.

#### Parameters

- `entityId` (string): The ID of the storage entity
- `itemId` (string): The ID of the item to add
- `quantity` (int): The quantity of the item to add (default: 1)

#### Returns

- `success` (boolean): Whether the item was successfully added

#### Example

```lua
function AddRewardsToChest(chestId, tier)
    local success = true
    
    if tier == "common" then
        success = success and AddItemToStorage(chestId, "item_gold_coin", 50)
        success = success and AddItemToStorage(chestId, "item_health_potion", 2)
    elseif tier == "rare" then
        success = success and AddItemToStorage(chestId, "item_gold_coin", 200)
        success = success and AddItemToStorage(chestId, "item_mana_potion", 3)
        success = success and AddItemToStorage(chestId, "item_rare_crystal", 1)
    elseif tier == "epic" then
        success = success and AddItemToStorage(chestId, "item_gold_coin", 500)
        success = success and AddItemToStorage(chestId, "item_epic_weapon", 1)
    end
    
    return success
end
```

#### Notes

- Returns false if the item cannot fit in the storage
- Returns false if the item ID does not exist in the registry
- The storage entity must exist or an error will be logged

### GetStorageItems

**Signature:** `table GetStorageItems(string entityId)`

**Description:** Gets all items in a storage entity as a table.

#### Parameters

- `entityId` (string): The ID of the storage entity

#### Returns

- `items` (table): A table of items in the storage, each with id, name, quantity, and stackLimit properties

#### Example

```lua
function PrintStorageContents(entityId)
    local items = GetStorageItems(entityId)
    
    if #items == 0 then
        print("Storage is empty")
        return
    end
    
    print("Storage contents:")
    for i, item in ipairs(items) do
        print(string.format("%d. %s (x%d)", i, item.name, item.quantity))
    end
end

-- Command to list chest contents
RegisterCommand("list", "Lists the contents of your chest", "list", function(args)
    if _G.playerChestId then
        PrintStorageContents(_G.playerChestId)
    else
        print("You don't have a chest yet!")
    end
end)
```

#### Notes

- Returns an empty table if the storage is empty
- Each item in the returned table has the following properties:
  - `id`: The item ID
  - `name`: The display name of the item
  - `quantity`: The quantity of the item
  - `stackLimit`: The maximum stack size for the item
  - `quality`: The quality of the item (if applicable)

### IsStorageOpen

**Signature:** `boolean IsStorageOpen(string entityId)`

**Description:** Checks if a storage entity is currently open.

#### Parameters

- `entityId` (string): The ID of the storage entity

#### Returns

- `isOpen` (boolean): Whether the storage entity is currently open

#### Example

```lua
function TryCloseStorage(entityId)
    if IsStorageOpen(entityId) then
        CloseStorageEntity(entityId)
        return true
    else
        return false
    end
end

-- Only allow item pickup if storage is closed
function CanPickupItem()
    return not IsStorageOpen(_G.playerChestId)
end
```

#### Notes

- Useful for checking if the player is currently interacting with a storage
- The storage entity must exist or an error will be logged

### SetStorageName

**Signature:** `void SetStorageName(string entityId, string name)`

**Description:** Sets the display name of a storage entity.

#### Parameters

- `entityId` (string): The ID of the storage entity
- `name` (string): The new name for the storage entity

#### Returns

None.

#### Example

```lua
function UpdateChestName(entityId, ownerName)
    SetStorageName(entityId, ownerName .. "'s Chest")
end

-- Update chest name when player changes their name
function OnPlayerNameChanged(oldName, newName)
    if _G.playerChestId then
        UpdateChestName(_G.playerChestId, newName)
    end
end
```

#### Notes

- Updates the name shown in the UI header when the storage is open
- The storage entity must exist or an error will be logged

### SetStorageSubtitle

**Signature:** `void SetStorageSubtitle(string entityId, string subtitle)`

**Description:** Sets the subtitle text of a storage entity.

#### Parameters

- `entityId` (string): The ID of the storage entity
- `subtitle` (string): The new subtitle for the storage entity

#### Returns

None.

#### Example

```lua
function UpdateChestSubtitle(entityId, usedSlots, totalSlots)
    local percentFull = math.floor((usedSlots / totalSlots) * 100)
    
    if percentFull < 50 then
        SetStorageSubtitle(entityId, "Storage space available: " .. percentFull .. "% full")
    elseif percentFull < 80 then
        SetStorageSubtitle(entityId, "Storage getting full: " .. percentFull .. "% full")
    else
        SetStorageSubtitle(entityId, "Storage almost full: " .. percentFull .. "% full!")
    end
end

-- Update chest subtitle when items are added
function OnItemAddedToChest(entityId)
    local items = GetStorageItems(entityId)
    local usedSlots = #items
    UpdateChestSubtitle(entityId, usedSlots, 24)
end
```

#### Notes

- Updates the subtitle shown in the UI when the storage is open
- Can be used to show additional information about the storage contents
- The storage entity must exist or an error will be logged

### ClearStorageContents

**Signature:** `void ClearStorageContents(string entityId)`

**Description:** Removes all items from a storage entity.

#### Parameters

- `entityId` (string): The ID of the storage entity

#### Returns

None.

#### Example

```lua
function ResetQuestChest(questId)
    local chestId = _G.questChests[questId]
    
    if chestId then
        ClearStorageContents(chestId)
        ShowNotification("Quest Reset", "Quest chest has been cleared")
    end
end

-- Reset all chests when starting a new game
function OnNewGameStarted()
    for questId, chestId in pairs(_G.questChests) do
        ClearStorageContents(chestId)
    end
end
```

#### Notes

- All items are immediately removed with no way to recover them
- Use with caution as this operation cannot be undone
- The storage entity must exist or an error will be logged

### GetStorageEntityCount

**Signature:** `int GetStorageEntityCount()`

**Description:** Gets the total number of storage entities created.

#### Parameters

None.

#### Returns

- `count` (int): The number of storage entities currently created

#### Example

```lua
function PrintStorageStats()
    local count = GetStorageEntityCount()
    print("Total storage entities created: " .. count)
    
    if count > 10 then
        print("Warning: Many storage entities created. Consider cleaning up unused ones.")
    end
end

-- Add a debug command
RegisterCommand("storagestats", "Shows storage entity statistics", "storagestats", function(args)
    PrintStorageStats()
end)
```

#### Notes

- Useful for debugging and monitoring resource usage
- High counts may indicate a memory leak if entities are created but not cleaned up

## UI Style Functions

The UI Style system provides functions for customizing the appearance of UI elements created with the Custom UI API.

### SetWindowStyle

**Signature:** `void SetWindowStyle(string colorName, float r, float g, float b, float a)`

**Description:** Sets the color properties for window styles.

#### Parameters

- `colorName` (string): The name of the color property to set ("background", "text", "hover", "active")
- `r` (float): Red component (0-1)
- `g` (float): Green component (0-1)
- `b` (float): Blue component (0-1)
- `a` (float): Alpha component (0-1, optional)

#### Returns

None.

#### Example

```lua
function SetDarkTheme()
    -- Set window background to dark blue with transparency
    SetWindowStyle("background", 0.1, 0.1, 0.2, 0.95)
    
    -- Set window text to white
    SetWindowStyle("text", 1.0, 1.0, 1.0, 1.0)
    
    -- Set hover state to lighter blue
    SetWindowStyle("hover", 0.2, 0.2, 0.3, 0.95)
end

function SetLightTheme()
    -- Set window background to light gray with transparency
    SetWindowStyle("background", 0.8, 0.8, 0.8, 0.95)
    
    -- Set window text to dark gray
    SetWindowStyle("text", 0.2, 0.2, 0.2, 1.0)
    
    -- Set hover state to slightly darker gray
    SetWindowStyle("hover", 0.7, 0.7, 0.7, 0.95)
end
```

#### Notes

- Changes apply to all windows created after the style is set
- The alpha component is optional and defaults to 1.0 (fully opaque)
- Valid color names are "background", "text", "hover", and "active"

### SetButtonStyle

**Signature:** `void SetButtonStyle(string colorName, float r, float g, float b, float a)`

**Description:** Sets the color properties for button styles.

#### Parameters

- `colorName` (string): The name of the color property to set ("background", "text", "hover", "active")
- `r` (float): Red component (0-1)
- `g` (float): Green component (0-1)
- `b` (float): Blue component (0-1)
- `a` (float): Alpha component (0-1, optional)

#### Returns

None.

#### Example

```lua
function SetBlueButtonTheme()
    -- Set button background to blue
    SetButtonStyle("background", 0.2, 0.2, 0.8, 0.9)
    
    -- Set button text to white
    SetButtonStyle("text", 1.0, 1.0, 1.0, 1.0)
    
    -- Set hover state to lighter blue
    SetButtonStyle("hover", 0.3, 0.3, 0.9, 0.9)
    
    -- Set active (pressed) state to brightest blue
    SetButtonStyle("active", 0.4, 0.4, 1.0, 0.9)
end

function SetRedButtonTheme()
    -- Set button background to red
    SetButtonStyle("background", 0.8, 0.2, 0.2, 0.9)
    
    -- Set button text to white
    SetButtonStyle("text", 1.0, 1.0, 1.0, 1.0)
    
    -- Set hover state to lighter red
    SetButtonStyle("hover", 0.9, 0.3, 0.3, 0.9)
    
    -- Set active (pressed) state to brightest red
    SetButtonStyle("active", 1.0, 0.4, 0.4, 0.9)
end
```

#### Notes

- Changes apply to all buttons created after the style is set
- The alpha component is optional and defaults to 1.0 (fully opaque)
- Valid color names are "background", "text", "hover", and "active"

### SetLabelStyle

**Signature:** `void SetLabelStyle(string colorName, float r, float g, float b, float a)`

**Description:** Sets the color properties for label styles.

#### Parameters

- `colorName` (string): The name of the color property to set ("background", "text")
- `r` (float): Red component (0-1)
- `g` (float): Green component (0-1)
- `b` (float): Blue component (0-1)
- `a` (float): Alpha component (0-1, optional)

#### Returns

None.

#### Example

```lua
function SetWhiteTextLabels()
    -- Set label text to white
    SetLabelStyle("text", 1.0, 1.0, 1.0, 1.0)
    
    -- Set label background to transparent
    SetLabelStyle("background", 0.0, 0.0, 0.0, 0.0)
}

function SetHighlightedLabels()
    -- Set label text to yellow
    SetLabelStyle("text", 1.0, 0.9, 0.2, 1.0)
    
    -- Set label background to dark with some opacity
    SetLabelStyle("background", 0.1, 0.1, 0.1, 0.5)
}
```

#### Notes

- Changes apply to all labels created after the style is set
- The alpha component is optional and defaults to 1.0 (fully opaque)
- Valid color names are "background" and "text"

### SetTextFieldStyle

**Signature:** `void SetTextFieldStyle(string colorName, float r, float g, float b, float a)`

**Description:** Sets the color properties for text field styles.

#### Parameters

- `colorName` (string): The name of the color property to set ("background", "text")
- `r` (float): Red component (0-1)
- `g` (float): Green component (0-1)
- `b` (float): Blue component (0-1)
- `a` (float): Alpha component (0-1, optional)

#### Returns

None.

#### Example

```lua
function SetDarkTextFields()
    -- Set text field background to dark gray
    SetTextFieldStyle("background", 0.15, 0.15, 0.15, 0.95)
    
    -- Set text field text to white
    SetTextFieldStyle("text", 1.0, 1.0, 1.0, 1.0)
}

function SetLightTextFields()
    -- Set text field background to light gray
    SetTextFieldStyle("background", 0.8, 0.8, 0.8, 0.95)
    
    -- Set text field text to dark
    SetTextFieldStyle("text", 0.1, 0.1, 0.1, 1.0)
}
```

#### Notes

- Changes apply to all text fields created after the style is set
- The alpha component is optional and defaults to 1.0 (fully opaque)
- Valid color names are "background" and "text"

### SetBoxStyle

**Signature:** `void SetBoxStyle(string colorName, float r, float g, float b, float a)`

**Description:** Sets the color properties for box styles.

#### Parameters

- `colorName` (string): The name of the color property to set ("background", "text")
- `r` (float): Red component (0-1)
- `g` (float): Green component (0-1)
- `b` (float): Blue component (0-1)
- `a` (float): Alpha component (0-1, optional)

#### Returns

None.

#### Example

```lua
function SetDarkBoxes()
    -- Set box background to dark gray with high transparency
    SetBoxStyle("background", 0.2, 0.2, 0.2, 0.95)
    
    -- Set box text to white
    SetBoxStyle("text", 1.0, 1.0, 1.0, 1.0)
}

function SetColoredBoxes(r, g, b)
    -- Set box background to provided color with some transparency
    SetBoxStyle("background", r, g, b, 0.7)
    
    -- Set box text to white for good contrast
    SetBoxStyle("text", 1.0, 1.0, 1.0, 1.0)
}
```

#### Notes

- Changes apply to all boxes created after the style is set
- The alpha component is optional and defaults to 1.0 (fully opaque)
- Valid color names are "background" and "text"

### SetFontSize

**Signature:** `void SetFontSize(string styleName, int size)`

**Description:** Sets the font size for a UI element style.

#### Parameters

- `styleName` (string): The name of the style to modify ("window", "button", "label", "textfield", "box")
- `size` (int): The font size in pixels

#### Returns

None.

#### Example

```lua
function SetLargeUIFonts()
    -- Set window title font size
    SetFontSize("window", 20)
    
    -- Set button font size
    SetFontSize("button", 16)
    
    -- Set label font size
    SetFontSize("label", 14)
    
    -- Set text field font size
    SetFontSize("textfield", 14)
}

function SetSmallUIFonts()
    -- Set window title font size
    SetFontSize("window", 14)
    
    -- Set button font size
    SetFontSize("button", 12)
    
    -- Set label font size
    SetFontSize("label", 10)
    
    -- Set text field font size
    SetFontSize("textfield", 10)
}
```

#### Notes

- Changes apply to all UI elements created after the style is set
- Valid style names are "window", "button", "label", "textfield", and "box"
- Very small font sizes may be difficult to read

### SetFontStyle

**Signature:** `void SetFontStyle(string styleName, string fontStyle)`

**Description:** Sets the font style for a UI element.

#### Parameters

- `styleName` (string): The name of the style to modify ("window", "button", "label", "textfield", "box")
- `fontStyle` (string): The font style ("normal", "bold", "italic", "bolditalic")

#### Returns

None.

#### Example

```lua
function SetDefaultFontStyles()
    -- Set window title to bold
    SetFontStyle("window", "bold")
    
    -- Set button text to bold
    SetFontStyle("button", "bold")
    
    -- Set label text to normal
    SetFontStyle("label", "normal")
    
    -- Set text field text to normal
    SetFontStyle("textfield", "normal")
}

function SetEmphasisFontStyles()
    -- Set window title to bold
    SetFontStyle("window", "bold")
    
    -- Set button text to bold
    SetFontStyle("button", "bold")
    
    -- Set label text to italic for emphasis
    SetFontStyle("label", "italic")
    
    -- Set text field text to normal
    SetFontStyle("textfield", "normal")
}
```

#### Notes

- Changes apply to all UI elements created after the style is set
- Valid style names are "window", "button", "label", "textfield", and "box"
- Valid font styles are "normal", "bold", "italic", and "bolditalic"

### SetTextAlignment

**Signature:** `void SetTextAlignment(string styleName, string alignment)`

**Description:** Sets the text alignment for a UI element.

#### Parameters

- `styleName` (string): The name of the style to modify ("window", "button", "label", "textfield", "box")
- `alignment` (string): The text alignment ("left", "center", "right", "topleft", "topcenter", "topright", "middleleft", "middlecenter", "middleright", "bottomleft", "bottomcenter", "bottomright")

#### Returns

None.

#### Example

```lua
function SetCenteredTextAlignment()
    -- Set window title to center
    SetTextAlignment("window", "center")
    
    -- Set button text to center
    SetTextAlignment("button", "center")
    
    -- Set label text to center
    SetTextAlignment("label", "center")
}

function SetLeftAlignedText()
    -- Set window title to center (headers often look best centered)
    SetTextAlignment("window", "center")
    
    -- Set button text to center (buttons often look best centered)
    SetTextAlignment("button", "center")
    
    -- Set label text to left aligned
    SetTextAlignment("label", "left")
    
    -- Set text field to left aligned
    SetTextAlignment("textfield", "left")
}
```

#### Notes

- Changes apply to all UI elements created after the style is set
- Valid style names are "window", "button", "label", "textfield", and "box"
- Valid alignments include all combinations of vertical (top, middle, bottom) and horizontal (left, center, right) positions

### SetBorder

**Signature:** `void SetBorder(string styleName, int left, int right, int top, int bottom)`

**Description:** Sets the border width for a UI element style.

#### Parameters

- `styleName` (string): The name of the style to modify ("window", "button", "textfield", "box")
- `left` (int): Left border width in pixels
- `right` (int): Right border width in pixels
- `top` (int): Top border width in pixels
- `bottom` (int): Bottom border width in pixels

#### Returns

None.

#### Example

```lua
function SetThickBorders()
    -- Set window borders (thicker on top for title bar)
    SetBorder("window", 10, 10, 20, 10)
    
    -- Set button borders
    SetBorder("button", 5, 5, 5, 5)
    
    -- Set box borders
    SetBorder("box", 5, 5, 5, 5)
}

function SetThinBorders()
    -- Set window borders
    SetBorder("window", 3, 3, 5, 3)
    
    -- Set button borders
    SetBorder("button", 2, 2, 2, 2)
    
    -- Set box borders
    SetBorder("box", 1, 1, 1, 1)
}
```

#### Notes

- Changes apply to all UI elements created after the style is set
- Valid style names are "window", "button", "textfield", and "box"
- Border width is specified in pixels

### SetPadding

**Signature:** `void SetPadding(string styleName, int left, int right, int top, int bottom)`

**Description:** Sets the padding for a UI element style.

#### Parameters

- `styleName` (string): The name of the style to modify ("window", "button", "label", "textfield", "box")
- `left` (int): Left padding in pixels
- `right` (int): Right padding in pixels
- `top` (int): Top padding in pixels
- `bottom` (int): Bottom padding in pixels

#### Returns

None.

#### Example

```lua
function SetSpacious()
    -- Set window padding
    SetPadding("window", 15, 15, 25, 15)
    
    -- Set button padding
    SetPadding("button", 10, 10, 10, 10)
    
    -- Set label padding
    SetPadding("label", 8, 8, 8, 8)
    
    -- Set text field padding
    SetPadding("textfield", 8, 8, 8, 8)
}

function SetCompact()
    -- Set window padding
    SetPadding("window", 5, 5, 10, 5)
    
    -- Set button padding
    SetPadding("button", 3, 3, 3, 3)
    
    -- Set label padding
    SetPadding("label", 2, 2, 2, 2)
    
    -- Set text field padding
    SetPadding("textfield", 2, 2, 2, 2)
}
```

#### Notes

- Changes apply to all UI elements created after the style is set
- Valid style names are "window", "button", "label", "textfield", and "box"
- Padding is specified in pixels and defines the space between the element's border and its content

## Global UI Functions

### EnableGUI

**Signature:** `void EnableGUI(bool enable)`

**Description:** Enables or disables all custom GUI rendering.

#### Parameters

- `enable` (bool): Whether to enable GUI rendering

#### Returns

None.

#### Example

```lua
function ToggleUI()
    -- Toggle UI based on current state
    EnableGUI(not IsGUIEnabled())
}

-- Hide UI during cutscenes
function OnCutsceneStart()
    EnableGUI(false)
}

function OnCutsceneEnd()
    EnableGUI(true)
}
```

#### Notes

- Disabling GUI will hide all custom windows and controls
- Useful for temporarily hiding the UI during cutscenes or other special game states
- Does not affect the game's native UI elements

### IsGUIEnabled

**Signature:** `bool IsGUIEnabled()`

**Description:** Checks if GUI rendering is currently enabled.

#### Parameters

None.

#### Returns

- `enabled` (bool): Whether GUI rendering is currently enabled

#### Example

```lua
function SafelyShowWindow(windowId)
    if IsGUIEnabled() then
        ShowWindow(windowId, true)
        return true
    else
        print("Cannot show window while GUI is disabled")
        return false
    end
}

-- Toggle a window based on command
RegisterCommand("togglewindow", "Toggles a window", "togglewindow <windowId>", function(args)
    local windowId = args[1]
    
    if not windowId then
        print("Window ID required")
        return
    end
    
    if not IsGUIEnabled() then
        print("GUI is currently disabled. Enable it first.")
        return
    end
    
    if IsWindowVisible(windowId) then
        ShowWindow(windowId, false)
    else
        ShowWindow(windowId, true)
    end
end)
```

#### Notes

- Useful for checking if GUI is enabled before attempting to show or modify UI elements
- Can be used to conditionally show UI based on the current GUI state
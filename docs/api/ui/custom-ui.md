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
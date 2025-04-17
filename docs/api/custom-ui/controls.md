# Control Functions

This section covers functions for creating and managing UI controls within custom windows.

## AddButton

**Signature:** `string AddButton(string windowId, string id, string text, function callback)`

**Description:** Adds a clickable button to a window.

### Parameters

- `windowId` (string): The unique identifier of the parent window
- `id` (string): A unique identifier for the button
- `text` (string): The text displayed on the button
- `callback` (function): A function that will be called when the button is clicked

### Returns

The control ID if successful, or `nil` if the control could not be created.

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

## AddLabel

**Signature:** `string AddLabel(string windowId, string id, string text)`

**Description:** Adds a text label to a window.

### Parameters

- `windowId` (string): The unique identifier of the parent window
- `id` (string): A unique identifier for the label
- `text` (string): The text displayed in the label

### Returns

The control ID if successful, or `nil` if the control could not be created.

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

## AddTextField

**Signature:** `string AddTextField(string windowId, string id, string text)`

**Description:** Adds an editable text field to a window.

### Parameters

- `windowId` (string): The unique identifier of the parent window
- `id` (string): A unique identifier for the text field
- `text` (string): The initial text displayed in the text field

### Returns

The control ID if successful, or `nil` if the control could not be created.

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
}

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

## GetControlText

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

## SetControlText

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

## SetControlPosition

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

## SetControlSize

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

## ShowControl

**Signature:** `void ShowControl(string controlId, bool visible)`

**Description:** Shows or hides a UI control.

### Parameters

- `controlId` (string): The unique identifier of the control
- `visible` (bool): Whether the control should be visible (`true`) or hidden (`false`)

### Returns

None.

### Example

```lua
function CreateFilterableList()
    local windowId = "filterList"
    
    -- Create window
    CreateWindow(windowId, "Filterable List", 200, 200, 400, 350)
    
    -- Add filter controls
    AddLabel(windowId, "filterLabel", "Filter:")
    SetControlPosition("filterLabel", 20, 40)
    
    AddTextField(windowId, "filterField", "")
    SetControlPosition("filterField", 80, 40)
    SetControlSize("filterField", 200, 30)
    
    AddButton(windowId, "filterButton", "Apply", function()
        local filterText = GetControlText("filterField")
        UpdateListItems(filterText)
    end)
    SetControlPosition("filterButton", 290, 40)
    
    -- Add list items (initially all visible)
    local items = {
        "Apple", "Banana", "Cherry", "Date", "Elderberry",
        "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"
    }
    
    local itemControls = {}
    for i, item in ipairs(items) do
        local itemId = "item_" .. i
        AddLabel(windowId, itemId, item)
        SetControlPosition(itemId, 40, 80 + (i-1)*25)
        table.insert(itemControls, itemId)
    end
    
    -- Function to update list based on filter
    function UpdateListItems(filter)
        filter = filter:lower()
        
        for i, itemId in ipairs(itemControls) do
            local itemText = GetControlText(itemId):lower()
            local visible = filter == "" or itemText:find(filter)
            ShowControl(itemId, visible)
        end
    end
    
    -- Add close button
    AddButton(windowId, "closeButton", "Close", function()
        DestroyWindow(windowId)
    end)
    SetControlPosition("closeButton", 160, 320)
    
    -- Show the window
    ShowWindow(windowId, true)
}

-- Command to show filterable list
RegisterCommand("list", "Shows filterable list", "list", function(args)
    CreateFilterableList()
end)
```

### Notes

- Controls are visible by default after creation
- Hidden controls don't receive input events
- Hidden controls don't take up interactive space, but the space is still reserved
- If the control doesn't exist, no error is thrown but no action is taken

## DestroyControl

**Signature:** `void DestroyControl(string controlId)`

**Description:** Removes a control from its parent window.

### Parameters

- `controlId` (string): The unique identifier of the control

### Returns

None.

### Example

```lua
function CreateDynamicForm()
    local windowId = "dynamicForm"
    local fieldCount = 0
    
    -- Create window
    CreateWindow(windowId, "Dynamic Form", 200, 200, 400, 350)
    
    -- Add buttons to add/remove fields
    AddButton(windowId, "addFieldButton", "Add Field", function()
        AddFormField()
    end)
    SetControlPosition("addFieldButton", 50, 50)
    
    AddButton(windowId, "removeFieldButton", "Remove Last Field", function()
        RemoveLastField()
    end)
    SetControlPosition("removeFieldButton", 250, 50)
    
    -- Add submit button
    AddButton(windowId, "submitButton", "Submit", function()
        SubmitForm()
    end)
    SetControlPosition("submitButton", 150, 300)
    
    -- Add close button
    AddButton(windowId, "closeButton", "Close", function()
        DestroyWindow(windowId)
    end)
    SetControlPosition("closeButton", 250, 300)
    
    -- Function to add a new field
    function AddFormField()
        fieldCount = fieldCount + 1
        local fieldId = "field_" .. fieldCount
        
        -- Add label
        AddLabel(windowId, fieldId .. "_label", "Field " .. fieldCount .. ":")
        SetControlPosition(fieldId .. "_label", 50, 90 + (fieldCount-1)*40)
        
        -- Add text field
        AddTextField(windowId, fieldId, "")
        SetControlPosition(fieldId, 150, 90 + (fieldCount-1)*40)
        SetControlSize(fieldId, 200, 30)
    end
    
    -- Function to remove the last field
    function RemoveLastField()
        if fieldCount > 0 then
            local fieldId = "field_" .. fieldCount
            
            -- Destroy label and field
            DestroyControl(fieldId .. "_label")
            DestroyControl(fieldId)
            
            fieldCount = fieldCount - 1
        end
    end
    
    -- Function to handle form submission
    function SubmitForm()
        local values = {}
        for i = 1, fieldCount do
            local fieldId = "field_" .. i
            table.insert(values, GetControlText(fieldId))
        end
        
        -- Do something with values
        ShowNotification("Form submitted with " .. fieldCount .. " fields")
        DestroyWindow(windowId)
    end
    
    -- Show the window
    ShowWindow(windowId, true)
}

-- Command to show dynamic form
RegisterCommand("form", "Shows dynamic form", "form", function(args)
    CreateDynamicForm()
end)
```

### Notes

- This completely removes the control from memory
- You cannot restore a destroyed control; you must create a new one
- If the control doesn't exist, no error is thrown but no action is taken
- Controls are automatically destroyed when their parent window is destroyed 
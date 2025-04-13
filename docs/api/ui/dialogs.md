# Dialogs

The Dialog system provides functions for displaying modal dialog boxes in Schedule 1. Unlike messages and notifications, dialogs command immediate attention from the player and often require input before proceeding.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic dialog functions are available.</p>
</div>

## Dialog Functions

### ShowDialog

**Signature:** `int ShowDialog(string title, string message, table options)`

**Description:** Shows a dialog box with a title, message, and customizable options.

### Parameters

- `title` (string): The dialog title
- `message` (string): The dialog message content
- `options` (table): A table of dialog options (buttons and settings)

### Returns

- `dialogId` (int): A unique identifier for the dialog

### Example

```lua
-- Show a basic confirmation dialog
function ConfirmItemPurchase(itemName, price)
    local dialogId = ShowDialog(
        "Confirm Purchase",
        "Do you want to purchase " .. itemName .. " for " .. price .. " coins?",
        {
            buttons = {
                {
                    text = "Purchase",
                    callback = function()
                        PurchaseItem(itemName, price)
                    end
                },
                {
                    text = "Cancel",
                    callback = function()
                        -- Do nothing or show canceled message
                    end
                }
            },
            closeOnButtonClick = true
        }
    )
}

-- Show a dialog with more options
function ShowQuestDetails(quest)
    local dialogId = ShowDialog(
        quest.title,
        quest.description,
        {
            buttons = {
                {
                    text = "Accept",
                    callback = function()
                        AcceptQuest(quest.id)
                    end
                },
                {
                    text = "Decline",
                    callback = function()
                        DeclineQuest(quest.id)
                    end
                },
                {
                    text = "More Info",
                    callback = function()
                        ShowQuestAdditionalInfo(quest.id)
                    end
                }
            },
            width = "large",
            closeOnButtonClick = true,
            showCloseButton = true
        }
    )
}
```

### Notes

- Dialogs are modal and pause gameplay until the player makes a choice
- Each dialog has a unique ID that can be used for reference
- The `options` table supports:
  - `buttons`: An array of button objects, each with `text` and `callback` properties
  - `closeOnButtonClick`: Whether to close the dialog when a button is clicked
  - `showCloseButton`: Whether to show an X button to close the dialog
  - `width`: Dialog width ("small", "medium", "large", or pixel value)

### ShowInputDialog

**Signature:** `int ShowInputDialog(string title, string message, table options)`

**Description:** Shows a dialog box with a text input field.

### Parameters

- `title` (string): The dialog title
- `message` (string): The dialog message content
- `options` (table): A table of dialog options

### Returns

- `dialogId` (int): A unique identifier for the dialog

### Example

```lua
-- Show a text input dialog for naming an item
function PromptItemRename(itemId, currentName)
    local dialogId = ShowInputDialog(
        "Rename Item",
        "Enter a new name for your " .. currentName,
        {
            defaultText = currentName,
            maxLength = 20,
            buttons = {
                {
                    text = "Save",
                    callback = function(inputText)
                        RenameItem(itemId, inputText)
                    end
                },
                {
                    text = "Cancel",
                    callback = function()
                        -- Do nothing, keep the current name
                    end
                }
            },
            placeholder = "Enter new name...",
            validator = function(text)
                -- Basic validation
                if #text < 3 then
                    return false, "Name must be at least 3 characters"
                end
                return true
            end
        }
    )
}

-- Show a password input dialog
function PromptPasswordEntry(doorId)
    local dialogId = ShowInputDialog(
        "Security Door",
        "Enter the security code to unlock the door",
        {
            defaultText = "",
            maxLength = 6,
            inputType = "password",
            buttons = {
                {
                    text = "Enter",
                    callback = function(inputText)
                        AttemptDoorUnlock(doorId, inputText)
                    end
                },
                {
                    text = "Cancel",
                    callback = function()
                        -- Player cancelled, do nothing
                    end
                }
            },
            placeholder = "Password",
            numeric = true
        }
    )
}
```

### Notes

- Input dialogs allow the player to enter text or numeric values
- Callbacks receive the input text as their first parameter
- The `options` table supports all standard dialog options plus:
  - `defaultText`: Initial text in the input field
  - `placeholder`: Placeholder text when the input is empty
  - `maxLength`: Maximum characters allowed
  - `inputType`: Input type ("text", "password", "number")
  - `numeric`: Whether to restrict input to numeric values
  - `validator`: Function to validate input, returns true/false and error message

### ShowCustomDialog

**Signature:** `int ShowCustomDialog(string title, string content, table options)`

**Description:** Shows a dialog with custom HTML/UI content.

### Parameters

- `title` (string): The dialog title
- `content` (string): HTML content to display in the dialog
- `options` (table): A table of dialog options

### Returns

- `dialogId` (int): A unique identifier for the dialog

### Example

```lua
-- Show item details with image and formatted text
function ShowItemDetails(item)
    local itemImagePath = GetItemImagePath(item.id)
    local itemStats = GetItemStats(item.id)
    
    local content = [[
        <div class="item-details">
            <div class="item-image">
                <img src="]] .. itemImagePath .. [[" alt="]] .. item.name .. [[">
            </div>
            <div class="item-info">
                <h3>]] .. item.name .. [[</h3>
                <p class="item-description">]] .. item.description .. [[</p>
                <div class="item-stats">
                    <div class="stat">Value: <span>]] .. item.value .. [[ coins</span></div>
                    <div class="stat">Weight: <span>]] .. item.weight .. [[ kg</span></div>
                    <div class="stat">Durability: <span>]] .. item.durability .. [[/]] .. item.maxDurability .. [[</span></div>
    ]]
    
    -- Add specific stats based on item type
    if item.type == "weapon" then
        content = content .. [[
                    <div class="stat">Damage: <span>]] .. itemStats.damage .. [[</span></div>
                    <div class="stat">Range: <span>]] .. itemStats.range .. [[</span></div>
        ]]
    elseif item.type == "armor" then
        content = content .. [[
                    <div class="stat">Defense: <span>]] .. itemStats.defense .. [[</span></div>
                    <div class="stat">Type: <span>]] .. itemStats.armorType .. [[</span></div>
        ]]
    end
    
    -- Close the HTML structure
    content = content .. [[
                </div>
            </div>
        </div>
    ]]
    
    local dialogId = ShowCustomDialog(
        "Item Details",
        content,
        {
            width = "medium",
            buttons = {
                {
                    text = "Equip",
                    callback = function()
                        EquipItem(item.id)
                    end,
                    disabled = not CanEquipItem(item.id)
                },
                {
                    text = "Drop",
                    callback = function()
                        DropItem(item.id)
                    end
                },
                {
                    text = "Close",
                    callback = function()
                        -- Just close the dialog
                    end
                }
            },
            showCloseButton = true,
            cssClass = "item-details-dialog"
        }
    )
}

-- Show a character skill tree with custom UI
function ShowSkillTree(characterId)
    local skills = GetCharacterSkills(characterId)
    local skillPoints = GetCharacterSkillPoints(characterId)
    
    -- Create the HTML for the skill tree
    local content = [[
        <div class="skill-tree">
            <div class="skill-points">Skill Points Available: ]] .. skillPoints .. [[</div>
            <div class="skill-branches">
    ]]
    
    -- Add each skill branch
    for branchName, branch in pairs(skills) do
        content = content .. [[
            <div class="skill-branch">
                <h3>]] .. branchName .. [[</h3>
                <div class="skills">
        ]]
        
        -- Add each skill in this branch
        for _, skill in ipairs(branch.skills) do
            local skillClass = "skill"
            if skill.unlocked then
                skillClass = skillClass .. " unlocked"
            end
            if skill.maxLevel then
                skillClass = skillClass .. " max-level"
            end
            
            content = content .. [[
                <div class="]] .. skillClass .. [[" data-skill-id="]] .. skill.id .. [[">
                    <div class="skill-name">]] .. skill.name .. [[</div>
                    <div class="skill-level">Level: ]] .. skill.level .. [[/]] .. skill.maxLevel .. [[</div>
                </div>
            ]]
        end
        
        content = content .. [[
                </div>
            </div>
        ]]
    end
    
    -- Close the HTML structure
    content = content .. [[
            </div>
        </div>
    ]]
    
    local dialogId = ShowCustomDialog(
        "Character Skills",
        content,
        {
            width = "large",
            buttons = {
                {
                    text = "Close",
                    callback = function()
                        -- Just close the dialog
                    end
                }
            },
            showCloseButton = true,
            cssClass = "skill-tree-dialog",
            onElementClick = function(elementId, dataset)
                if dataset.skillId then
                    AttemptSkillUpgrade(characterId, dataset.skillId)
                    -- Refresh the dialog with updated skill information
                    CloseDialog(dialogId)
                    ShowSkillTree(characterId)
                end
            end
        }
    )
}
```

### Notes

- Custom dialogs allow for complex UI elements beyond simple text
- The content is rendered as HTML within the dialog window
- The `options` table supports all standard dialog options plus:
  - `cssClass`: Additional CSS class for styling the dialog
  - `onElementClick`: Callback function that triggers when elements are clicked
  - Custom event handlers can be attached to specific elements

### CloseDialog

**Signature:** `boolean CloseDialog(int dialogId)`

**Description:** Programmatically closes a dialog.

### Parameters

- `dialogId` (int): The ID of the dialog to close

### Returns

- `success` (boolean): Whether the dialog was successfully closed

### Example

```lua
-- Close dialog after a timer
function ShowTimedWarning(message, duration)
    local dialogId = ShowDialog(
        "Warning",
        message,
        {
            buttons = {
                {
                    text = "OK",
                    callback = function()
                        -- Dialog will close automatically
                    end
                }
            },
            showCloseButton = true
        }
    )
    
    -- Close the dialog after the specified duration
    Wait(duration, function()
        CloseDialog(dialogId)
    end)
}

-- Close a dialog from an external event
function OnCombatStart()
    -- Find and close any open shop dialog
    local shopDialogId = GetActiveShopDialogId()
    if shopDialogId then
        CloseDialog(shopDialogId)
        ShowMessage("Shop interrupted - combat started!")
    end
}
```

### Notes

- This function allows you to close dialogs programmatically without user input
- Useful for time-sensitive situations or when game state changes
- Returns false if the dialog ID is invalid or already closed

### UpdateDialog

**Signature:** `boolean UpdateDialog(int dialogId, string title, string message, table options)`

**Description:** Updates the content and options of an existing dialog.

### Parameters

- `dialogId` (int): The ID of the dialog to update
- `title` (string): The new dialog title (or nil to keep current)
- `message` (string): The new dialog message (or nil to keep current)
- `options` (table): New dialog options (or nil to keep current)

### Returns

- `success` (boolean): Whether the dialog was successfully updated

### Example

```lua
-- Update a countdown dialog
function ShowCountdownDialog(duration, onComplete)
    local timeRemaining = duration
    
    local dialogId = ShowDialog(
        "System Shutdown",
        "System will shut down in " .. timeRemaining .. " seconds.",
        {
            buttons = {
                {
                    text = "Cancel",
                    callback = function()
                        CancelShutdown()
                    end
                }
            },
            showCloseButton = false
        }
    )
    
    -- Update the dialog every second
    local timerId = StartTimer(1.0, true, function()
        timeRemaining = timeRemaining - 1
        
        if timeRemaining <= 0 then
            StopTimer(timerId)
            CloseDialog(dialogId)
            if onComplete then
                onComplete()
            end
        else
            -- Just update the message, keep title and options
            UpdateDialog(
                dialogId,
                nil,
                "System will shut down in " .. timeRemaining .. " seconds.",
                nil
            )
            
            -- If we're getting close, change the message style
            if timeRemaining <= 5 then
                UpdateDialog(
                    dialogId,
                    "URGENT: System Shutdown",
                    "System will shut down in " .. timeRemaining .. " seconds!",
                    {
                        cssClass = "urgent-dialog"
                    }
                )
            end
        end
    end)
}

-- Update dialog based on changing game state
function ShowResourceMonitorDialog()
    local dialogId = ShowDialog(
        "Resource Monitor",
        "Loading resource data...",
        {
            buttons = {
                {
                    text = "Close",
                    callback = function()
                        -- Dialog will close
                    end
                }
            },
            showCloseButton = true,
            width = "medium"
        }
    )
    
    -- Simulate loading data
    Wait(1.0, function()
        local resources = GetResourceLevels()
        local resourceText = ""
        
        for name, level in pairs(resources) do
            local statusColor = "green"
            if level < 25 then
                statusColor = "red"
            elseif level < 50 then
                statusColor = "yellow"
            end
            
            resourceText = resourceText .. 
                '<div class="resource"><span class="name">' .. name .. 
                ':</span> <span class="level ' .. statusColor .. '">' .. 
                level .. '%</span></div>'
        end
        
        -- Update with the loaded data
        UpdateDialog(
            dialogId,
            "Resource Monitor",
            '<div class="resource-list">' .. resourceText .. '</div>',
            {
                -- Update to add a refresh button
                buttons = {
                    {
                        text = "Refresh",
                        callback = function()
                            UpdateResourceDisplay(dialogId)
                        end
                    },
                    {
                        text = "Close",
                        callback = function()
                            -- Dialog will close
                        end
                    }
                }
            }
        )
    end)
}

function UpdateResourceDisplay(dialogId)
    -- Update the dialog to show loading state
    UpdateDialog(
        dialogId,
        nil,
        "Refreshing resource data...",
        nil
    )
    
    -- Simulate loading updated data
    Wait(0.5, function()
        -- Same code as before to update with new data
        local resources = GetResourceLevels()
        -- ... update the dialog with new data
    end)
}
```

### Notes

- Any parameter passed as nil will keep its current value
- Updating a dialog allows for dynamic content without closing/reopening
- Useful for countdowns, progress updates, or reflecting game state changes
- Returns false if the dialog ID is invalid or already closed

## Dialog Options Reference

The options table accepts the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `buttons` | table | Array of button objects with text and callback properties |
| `closeOnButtonClick` | boolean | Whether to close the dialog when any button is clicked (default: true) |
| `showCloseButton` | boolean | Whether to show an X button in the corner (default: false) |
| `width` | string | Dialog width - "small", "medium", "large", or pixel value (default: "medium") |
| `height` | string | Dialog height - "auto" or pixel value (default: "auto") |
| `position` | string | Dialog position - "center", "top", "bottom" (default: "center") |
| `modal` | boolean | Whether the dialog blocks interaction with the game (default: true) |
| `cssClass` | string | Additional CSS class to apply to the dialog |
| `onClose` | function | Callback function when dialog is closed |
| `onOpen` | function | Callback function when dialog is opened |
| `defaultButtonIndex` | number | Index of the default focused button (default: 1) |
| `escapeToClose` | boolean | Whether pressing Escape closes the dialog (default: true) |

## Button Options Reference

Each button in the buttons array accepts the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Button text |
| `callback` | function | Function to call when button is clicked |
| `disabled` | boolean | Whether the button is disabled (default: false) |
| `cssClass` | string | Additional CSS class for the button |
| `closeDialog` | boolean | Whether to close the dialog when this button is clicked (overrides closeOnButtonClick) |
| `icon` | string | Optional icon to display on the button |

## Best Practices for Dialogs

### Dialog Design Principles

For effective dialog usage:

1. **Use sparingly**: Only interrupt the player when necessary
2. **Be clear and concise**: Make dialog titles and messages easy to understand
3. **Provide context**: Make sure players understand why they're seeing a dialog
4. **Offer meaningful choices**: Dialog buttons should present clear options
5. **Be consistent**: Use similar patterns for similar types of interactions
6. **Consider accessibility**: Make sure text is readable and buttons are easy to use

```lua
-- Example of good dialog practice
function ConfirmDangerousAction(actionName, consequence, onConfirm)
    local dialogId = ShowDialog(
        "Confirm: " .. actionName,
        "Are you sure you want to " .. string.lower(actionName) .. "?\n\n" ..
        "This will " .. consequence .. " and cannot be undone.",
        {
            buttons = {
                {
                    text = "Yes, " .. actionName,
                    callback = function()
                        if onConfirm then
                            onConfirm()
                        end
                    end,
                    cssClass = "warning-button"
                },
                {
                    text = "Cancel",
                    callback = function()
                        -- Do nothing, just close
                    end
                }
            },
            showCloseButton = true
        }
    )
}
```

### Building a Dialog System

For complex games, consider building a dialog management system:

```lua
-- Dialog Manager Example
DialogManager = {
    activeDialogs = {},
    dialogStack = {},
    
    -- Show a dialog and track it
    Show = function(dialogType, title, message, options)
        -- Ensure options exists
        options = options or {}
        
        -- Store original callbacks
        local originalButtonCallbacks = {}
        if options.buttons then
            for i, button in ipairs(options.buttons) do
                originalButtonCallbacks[i] = button.callback
            end
        end
        
        -- Create new options with wrapped callbacks
        local newOptions = DeepCopy(options) -- Assume DeepCopy function exists
        if newOptions.buttons then
            for i, button in ipairs(newOptions.buttons) do
                local originalCallback = originalButtonCallbacks[i]
                button.callback = function(...)
                    -- Track dialog closing if button should close dialog
                    if button.closeDialog ~= false and options.closeOnButtonClick ~= false then
                        DialogManager.RemoveDialog(dialogId)
                    end
                    
                    -- Call original callback
                    if originalCallback then
                        originalCallback(...)
                    end
                end
            end
        end
        
        -- Store original onClose
        local originalOnClose = options.onClose
        
        -- Wrap onClose to track dialog closing
        newOptions.onClose = function(...)
            DialogManager.RemoveDialog(dialogId)
            
            -- Call original onClose
            if originalOnClose then
                originalOnClose(...)
            end
        end
        
        -- Show the dialog based on type
        local dialogId
        if dialogType == "basic" then
            dialogId = ShowDialog(title, message, newOptions)
        elseif dialogType == "input" then
            dialogId = ShowInputDialog(title, message, newOptions)
        elseif dialogType == "custom" then
            dialogId = ShowCustomDialog(title, message, newOptions)
        else
            error("Unknown dialog type: " .. dialogType)
        end
        
        -- Track the dialog
        DialogManager.activeDialogs[dialogId] = {
            type = dialogType,
            title = title,
            message = message,
            options = options
        }
        
        -- Add to dialog stack if we're tracking z-order
        table.insert(DialogManager.dialogStack, dialogId)
        
        return dialogId
    end,
    
    -- Show a dialog that blocks all other dialogs until closed
    ShowModal = function(dialogType, title, message, options)
        -- If we have other dialogs, hide them temporarily
        local hiddenDialogs = {}
        for id, _ in pairs(DialogManager.activeDialogs) do
            CloseDialog(id)
            table.insert(hiddenDialogs, id)
        end
        
        -- Ensure options exists
        options = options or {}
        
        -- Store original onClose
        local originalOnClose = options.onClose
        
        -- Wrap onClose to restore hidden dialogs
        options.onClose = function(...)
            -- Call original onClose
            if originalOnClose then
                originalOnClose(...)
            end
            
            -- Restore hidden dialogs
            for _, id in ipairs(hiddenDialogs) do
                local dialog = DialogManager.activeDialogs[id]
                if dialog then
                    if dialog.type == "basic" then
                        ShowDialog(dialog.title, dialog.message, dialog.options)
                    elseif dialog.type == "input" then
                        ShowInputDialog(dialog.title, dialog.message, dialog.options)
                    elseif dialog.type == "custom" then
                        ShowCustomDialog(dialog.title, dialog.message, dialog.options)
                    end
                end
            end
        end
        
        -- Show the dialog
        return DialogManager.Show(dialogType, title, message, options)
    end,
    
    -- Remove dialog from tracking
    RemoveDialog = function(dialogId)
        DialogManager.activeDialogs[dialogId] = nil
        
        -- Remove from stack
        for i, id in ipairs(DialogManager.dialogStack) do
            if id == dialogId then
                table.remove(DialogManager.dialogStack, i)
                break
            end
        end
    end,
    
    -- Get the topmost dialog
    GetTopDialog = function()
        if #DialogManager.dialogStack > 0 then
            return DialogManager.dialogStack[#DialogManager.dialogStack]
        end
        return nil
    end,
    
    -- Close all active dialogs
    CloseAll = function()
        for id, _ in pairs(DialogManager.activeDialogs) do
            CloseDialog(id)
        end
        DialogManager.activeDialogs = {}
        DialogManager.dialogStack = {}
    end
}

-- Usage example
function ShowQuestDialog(quest)
    return DialogManager.Show(
        "basic",
        quest.title,
        quest.description,
        {
            buttons = {
                {
                    text = "Accept",
                    callback = function()
                        AcceptQuest(quest.id)
                    end
                },
                {
                    text = "Decline",
                    callback = function()
                        DeclineQuest(quest.id)
                    end
                }
            }
        }
    )
}
``` 
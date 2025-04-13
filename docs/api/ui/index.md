# UI API

The UI API provides functions for creating and managing user interface elements in Schedule 1. This includes displaying notifications, creating windows and controls, and showing dialog boxes.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Experimental. Basic notification functions are stable, but other UI elements may have limitations or unexpected behavior.</p>
</div>

## Available Functions

### Notifications

- [`ShowNotification(message)`](./notifications.md#shownotification) - Shows a simple notification message
- [`ShowNotificationWithTimeout(message, timeout)`](./notifications.md#shownotificationwithtimeout) - Shows a notification with a custom timeout
- [`HideNotification()`](./notifications.md#hidenotification) - Hides the currently displayed notification

### Messages and Dialogs

- [`ShowMessage(message)`](./custom-ui.md#showmessage) - Shows a text message
- [`ShowDialogue(title, text)`](./custom-ui.md#showdialogue) - Shows a dialogue box with a title and text
- [`ShowDialogueWithTimeout(title, text, timeout)`](./custom-ui.md#showdialoguewithtimeout) - Shows a dialogue box that disappears after a specified time
- [`ShowChoiceDialogue(title, text, choices, callback)`](./custom-ui.md#showchoicedialogue) - Shows a dialogue with choices
- [`CloseDialogue()`](./custom-ui.md#closedialogue) - Closes the current dialogue

### Custom Windows

- [`CreateWindow(id, title, x, y, width, height)`](./custom-ui.md#createwindow) - Creates a UI window
- [`SetWindowPosition(windowId, x, y)`](./custom-ui.md#setwindowposition) - Sets a window's position
- [`SetWindowSize(windowId, width, height)`](./custom-ui.md#setwindowsize) - Sets a window's size
- [`ShowWindow(windowId, visible)`](./custom-ui.md#showwindow) - Shows or hides a window
- [`DestroyWindow(windowId)`](./custom-ui.md#destroywindow) - Destroys a window

### UI Controls

- [`AddButton(windowId, id, text, callback)`](./custom-ui.md#addbutton) - Adds a button to a window
- [`AddLabel(windowId, id, text)`](./custom-ui.md#addlabel) - Adds a label to a window
- [`AddTextField(windowId, id, text)`](./custom-ui.md#addtextfield) - Adds a text field to a window
- [`GetControlText(controlId)`](./custom-ui.md#getcontroltext) - Gets the text of a UI control
- [`SetControlText(controlId, text)`](./custom-ui.md#setcontroltext) - Sets the text of a UI control
- [`SetControlPosition(controlId, x, y)`](./custom-ui.md#setcontrolposition) - Sets a control's position
- [`SetControlSize(controlId, width, height)`](./custom-ui.md#setcontrolsize) - Sets a control's size
- [`ShowControl(controlId, visible)`](./custom-ui.md#showcontrol) - Shows or hides a control
- [`DestroyControl(controlId)`](./custom-ui.md#destroycontrol) - Destroys a control

## Example Usage

### Basic Notification

```lua
function OnPlayerReady()
    -- Show a simple welcome notification
    ShowNotification("Welcome to my custom script!")
    
    -- Show an energy warning when energy is low
    if GetPlayerEnergy() < 20 then
        ShowNotification("Warning: Low energy!")
    end
    
    return true
end

-- Notification that disappears after 5 seconds
function OnPlayerHealthChanged(newHealth)
    if newHealth < 50 then
        ShowNotificationWithTimeout("Your health is low!", 5.0)
    end
end
```

### Interactive Dialog

```lua
function OfferPlayerChoice()
    local choices = {
        "Accept the quest",
        "Decline",
        "Ask for more information"
    }
    
    ShowChoiceDialogue(
        "New Quest Available", 
        "A stranger needs your help finding a lost item. Will you help?",
        choices,
        function(choiceIndex)
            if choiceIndex == 1 then
                ShowNotification("Quest accepted!")
                StartQuest()
            elseif choiceIndex == 2 then
                ShowNotification("Quest declined.")
            elseif choiceIndex == 3 then
                ShowDialogue(
                    "Quest Details", 
                    "The stranger lost a valuable watch somewhere in the Downtown area. " ..
                    "They will pay you 100 credits if you can find it."
                )
                -- Ask again after showing more info
                Wait(3.0, function()
                    OfferPlayerChoice()
                end)
            end
        end
    )
end

-- Register a command to start the dialogue
RegisterCommand("quest", "Starts a sample quest dialogue", "quest", function(args)
    OfferPlayerChoice()
end)
```

### Custom Window with Controls

```lua
local windowId = "myWindow"
local submitButtonId = "submitBtn"
local nameFieldId = "nameField"

function CreatePlayerInfoWindow()
    -- Create a window
    CreateWindow(windowId, "Player Information", 100, 100, 300, 200)
    
    -- Add label
    AddLabel(windowId, "nameLabel", "Enter your character name:")
    
    -- Add text field
    AddTextField(windowId, nameFieldId, "")
    SetControlPosition(nameFieldId, 20, 50)
    SetControlSize(nameFieldId, 260, 30)
    
    -- Add button
    AddButton(windowId, submitButtonId, "Save Name", function()
        local playerName = GetControlText(nameFieldId)
        if playerName and playerName ~= "" then
            ShowNotification("Name saved: " .. playerName)
            -- Here you might store the name in the Registry
            DestroyWindow(windowId)
        else
            ShowNotification("Please enter a valid name")
        }
    end)
    SetControlPosition(submitButtonId, 100, 150)
    
    -- Show the window
    ShowWindow(windowId, true)
}

-- Register a command to show the window
RegisterCommand("namechange", "Opens name change window", "namechange", function(args)
    CreatePlayerInfoWindow()
end)
```

## Current Limitations

- UI elements may not persist across scene changes
- Custom windows have limited styling options in the current version
- The UI system may have performance impacts with many elements
- Windows cannot be resized by the user (only programmatically)
- Limited support for complex UI layouts
- UI elements operate in screen space, not world space

## Best Practices

- **Clear UI when done**: Always destroy UI elements when they're no longer needed
- **Limit active UI**: Avoid having too many UI elements active at once
- **Be responsive**: Consider different screen resolutions in your UI design
- **Error checking**: Validate all IDs before using them with control functions
- **Limited Update calls**: Avoid updating UI elements every frame
- **User experience**: Keep notifications brief and only show when necessary

## Future Enhancements

Future updates to the UI API will include:

- Improved styling options
- UI theming capabilities
- More control types (checkboxes, radio buttons, sliders)
- World-space UI elements
- UI animations and transitions
- UI event system

Explore the sections in the sidebar for detailed documentation of each function. 
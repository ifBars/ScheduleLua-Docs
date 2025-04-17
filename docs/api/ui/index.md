# Native UI API

The Native UI API provides functions for interacting with the game's user interface elements in Schedule 1. This includes displaying notifications, showing dialog boxes, and managing in-game messages.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic functionality works, but some advanced features are still in development.</p>
</div>

## Overview

The Native UI API focuses on built-in game UI elements that allow your script to communicate with the player. For custom UI elements (windows, controls, styling), please refer to the [Custom UI API](../custom-ui/index.md).

## Available Functions

### Notifications

- [`ShowNotification(message)`](./notifications.md#shownotification) - Shows a simple notification message
- [`ShowNotificationWithTimeout(message, timeout)`](./notifications.md#shownotificationwithtimeout) - Shows a notification with a custom timeout
- [`HideNotification()`](./notifications.md#hidenotification) - Hides the currently displayed notification

### Dialogs

- [`ShowDialogue(title, text)`](./dialogs.md#showdialogue) - Shows a dialogue box with a title and text
- [`ShowDialogueWithTimeout(title, text, timeout)`](./dialogs.md#showdialoguewithtimeout) - Shows a dialogue box that disappears after a specified time
- [`ShowChoiceDialogue(title, text, choices, callback)`](./dialogs.md#showchoicedialogue) - Shows a dialogue with choices
- [`CloseDialogue()`](./dialogs.md#closedialogue) - Closes the current dialogue

### Messages

- [`ShowMessage(message)`](./messages.md#showmessage) - Shows a text message

### Phone UI

- [`IsPhoneOpen()`](./messages.md#isphoneopen) - Checks if the phone UI is currently open
- [`OpenPhone()`](./messages.md#openphone) - Opens the in-game phone interface
- [`ClosePhone()`](./messages.md#closephone) - Closes the in-game phone interface
- [`TogglePhoneFlashlight()`](./messages.md#togglephoneflashlight) - Toggles the phone flashlight
- [`IsPhoneFlashlightOn()`](./messages.md#isphoneflashliton) - Checks if the phone flashlight is on

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

## Custom UI

For creating custom UI elements like windows, buttons, labels, and text fields, please see the [Custom UI API](../custom-ui/index.md) section.

## Best Practices

- **User experience**: Keep notifications brief and only show when necessary
- **Dialog usage**: Use dialogs for important information that requires attention
- **Avoid spam**: Don't overuse notifications, as they can become annoying
- **Timeouts**: Consider using timed notifications for transient information
- **Clear dialogs**: Always close dialogs when they're no longer needed

Explore the sections in the sidebar for detailed documentation of each function. 
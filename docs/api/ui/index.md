# Native UI API

The Native UI API provides functions for interacting with the game's user interface elements in Schedule 1. This includes displaying notifications, showing dialog boxes, and managing in-game messages.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic functionality works, but some advanced features are still in development.</p>
</div>

## Overview

The Native UI API focuses on built-in game UI elements that allow your script to communicate with the player. For custom UI elements (windows, controls, styling), please refer to the [Custom UI API](./custom-ui.md).

## Available Functions

### Notifications

- [`ShowNotification(title, message)`](./notifications.md#shownotification) - Shows a notification with title and message
- [`ShowNotificationWithIcon(title, message, iconPath)`](./notifications.md#shownotificationwithicon) - Shows a notification with a custom icon
- [`ShowNotificationWithTimeout(message, timeout)`](./notifications.md#shownotificationwithtimeout) - Shows a notification with a custom timeout
- [`ShowNotificationWithIconAndTimeout(title, message, iconPath, timeout)`](./notifications.md#shownotificationwithiconandtimeout) - Shows a notification with both an icon and timeout

### Dialogs

- [`ShowDialogue(title, text)`](./dialogs.md#showdialogue) - Shows a dialogue box with a title and text
- [`ShowDialogueWithTimeout(title, text, timeout)`](./dialogs.md#showdialoguewithtimeout) - Shows a dialogue box that disappears after a specified time
- [`ShowChoiceDialogue(title, text, choices, callback)`](./dialogs.md#showchoicedialogue) - Shows a dialogue with choices
- [`CloseDialogue()`](./dialogs.md#closedialogue) - Closes the current dialogue
- [`SetCustomerDialogue(npcId, newText)`](./dialogs.md#setcustomerdialogue) - Sets dialogue text for a Customer NPC
- [`SetDealerDialogue(npcId, newText)`](./dialogs.md#setdealerdialogue) - Sets dialogue text for a Dealer NPC
- [`SetShopDialogue(npcId, newText)`](./dialogs.md#setshopdialogue) - Sets dialogue text for a ShopWorker NPC

### Phone UI

- [`IsPhoneOpen()`](./messages.md#isphoneopen) - Checks if the phone UI is currently open
- [`OpenPhone()`](./messages.md#openphone) - Opens the in-game phone interface
- [`ClosePhone()`](./messages.md#closephone) - Closes the in-game phone interface
- [`TogglePhoneFlashlight()`](./messages.md#togglephoneflashlight) - Toggles the phone flashlight
- [`IsPhoneFlashlightOn()`](./messages.md#isphoneflashliton) - Checks if the phone flashlight is on

### Tooltips

- [`ShowTooltip(text, x, y, worldspace)`](./custom-ui.md#showtooltip) - Shows a tooltip at specified position

### UI Items

- [`GetHoveredItemName()`](./custom-ui.md#gethovereditemname) - Gets the name of the item currently being hovered
- [`IsItemBeingDragged()`](./custom-ui.md#isitembeingdragged) - Checks if an item is currently being dragged

### Storage Entities

- [`CreateStorageEntity(name, slotCount, rowCount)`](./custom-ui.md#createstorageentity) - Creates a storage entity with specified slots
- [`OpenStorageEntity(entityId)`](./custom-ui.md#openstorageentity) - Opens a storage entity UI
- [`CloseStorageEntity(entityId)`](./custom-ui.md#closestorageentity) - Closes a storage entity UI
- [`AddItemToStorage(entityId, itemId, quantity)`](./custom-ui.md#additemtostorage) - Adds an item to a storage entity
- [`GetStorageItems(entityId)`](./custom-ui.md#getstorageentityitems) - Gets all items in a storage entity
- [`IsStorageOpen(entityId)`](./custom-ui.md#isstorageopen) - Checks if a storage entity is open
- [`SetStorageName(entityId, name)`](./custom-ui.md#setstoragename) - Sets the name of a storage entity
- [`SetStorageSubtitle(entityId, subtitle)`](./custom-ui.md#setstoragesubtitle) - Sets the subtitle of a storage entity
- [`ClearStorageContents(entityId)`](./custom-ui.md#clearstoragecontents) - Clears all items from a storage entity
- [`GetStorageEntityCount()`](./custom-ui.md#getstorageentitycount) - Gets the total number of storage entities created

## Custom GUI

- [`CreateWindow(id, title, x, y, width, height)`](./custom-ui.md#createwindow) - Creates a new window
- [`SetWindowPosition(windowId, x, y)`](./custom-ui.md#setwindowposition) - Sets window position
- [`SetWindowSize(windowId, width, height)`](./custom-ui.md#setwindowsize) - Sets window size
- [`ShowWindow(windowId, visible)`](./custom-ui.md#showwindow) - Shows or hides a window
- [`IsWindowVisible(windowId)`](./custom-ui.md#iswindowvisible) - Checks if a window is visible
- [`DestroyWindow(windowId)`](./custom-ui.md#destroywindow) - Destroys a window

### Controls

- [`AddButton(windowId, id, text, callback)`](./custom-ui.md#addbutton) - Adds a button to a window
- [`AddLabel(windowId, id, text)`](./custom-ui.md#addlabel) - Adds a label to a window
- [`AddTextField(windowId, id, text)`](./custom-ui.md#addtextfield) - Adds a text field to a window
- [`GetControlText(controlId)`](./custom-ui.md#getcontroltext) - Gets the text of a control
- [`SetControlText(controlId, text)`](./custom-ui.md#setcontroltext) - Sets the text of a control
- [`SetControlPosition(controlId, x, y)`](./custom-ui.md#setcontrolposition) - Sets control position
- [`SetControlSize(controlId, width, height)`](./custom-ui.md#setcontrolsize) - Sets control size
- [`ShowControl(controlId, visible)`](./custom-ui.md#showcontrol) - Shows or hides a control
- [`DestroyControl(controlId)`](./custom-ui.md#destroycontrol) - Destroys a control

### UI Style Functions

- [`SetWindowStyle(colorName, r, g, b, a)`](./custom-ui.md#setwindowstyle) - Sets window style colors
- [`SetButtonStyle(colorName, r, g, b, a)`](./custom-ui.md#setbuttonstyle) - Sets button style colors
- [`SetLabelStyle(colorName, r, g, b, a)`](./custom-ui.md#setlabelstyle) - Sets label style colors
- [`SetTextFieldStyle(colorName, r, g, b, a)`](./custom-ui.md#settextfieldstyle) - Sets text field style colors
- [`SetBoxStyle(colorName, r, g, b, a)`](./custom-ui.md#setboxstyle) - Sets box style colors
- [`SetFontSize(styleName, size)`](./custom-ui.md#setfontsize) - Sets the font size for a UI element style
- [`SetFontStyle(styleName, fontStyle)`](./custom-ui.md#setfontstyle) - Sets the font style for a UI element
- [`SetTextAlignment(styleName, alignment)`](./custom-ui.md#settextalignment) - Sets the text alignment for a UI element
- [`SetBorder(styleName, left, right, top, bottom)`](./custom-ui.md#setborder) - Sets the border for a UI element style
- [`SetPadding(styleName, left, right, top, bottom)`](./custom-ui.md#setpadding) - Sets the padding for a UI element style

### Global UI Functions

- [`EnableGUI(enable)`](./custom-ui.md#enablegui) - Enables or disables GUI rendering
- [`IsGUIEnabled()`](./custom-ui.md#isguienabled) - Checks if GUI is enabled

## Example Usage

### Basic Notification

```lua
function OnPlayerReady()
    -- Show a simple welcome notification
    ShowNotification("Welcome", "Welcome to my custom script!")
    
    -- Show an energy warning when energy is low
    if GetPlayerEnergy() < 20 then
        ShowNotification("Warning", "Low energy!")
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
                ShowNotification("Quest", "Quest accepted!")
                StartQuest()
            elseif choiceIndex == 2 then
                ShowNotification("Quest", "Quest declined.")
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

### Custom Window UI

```lua
function CreateInventoryUI()
    -- Create main window
    local windowId = CreateWindow("inventory", "Player Inventory", 100, 100, 400, 300)
    
    -- Add title and instructions
    AddLabel(windowId, "title", "Manage your items")
    SetControlPosition("title", 150, 30)
    
    -- Add a button to close the window
    AddButton(windowId, "closeBtn", "Close", function()
        ShowWindow(windowId, false)
    end)
    SetControlPosition("closeBtn", 150, 250)
    
    -- Show the window
    ShowWindow(windowId, true)
    
    return windowId
end

-- Register a command to toggle the inventory UI
RegisterCommand("inventory", "Shows inventory UI", "inventory", function(args)
    if IsWindowVisible("inventory") then
        ShowWindow("inventory", false)
    else
        if not _G.inventoryWindowId then
            _G.inventoryWindowId = CreateInventoryUI()
        else
            ShowWindow(_G.inventoryWindowId, true)
        end
    end
end)
```

## Best Practices

- **User experience**: Keep notifications brief and only show when necessary
- **Dialog usage**: Use dialogs for important information that requires attention
- **Avoid spam**: Don't overuse notifications, as they can become annoying
- **Timeouts**: Consider using timed notifications for transient information
- **Clear dialogs**: Always close dialogs when they're no longer needed
- **Resource management**: Destroy windows and controls when no longer needed

Explore the sections in the sidebar for detailed documentation of each function. 
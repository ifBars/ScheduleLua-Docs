# Custom UI API

The Custom UI API provides functions for creating interactive UI elements in Schedule 1. This includes windows, controls, and styling options to create custom interfaces for your mods and scripts.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic custom UI functions are available.</p>
</div>

## Overview

The Custom UI system allows you to create your own user interface elements from Lua scripts. You can build windows with various controls like buttons, labels, and text fields, and customize their appearance using styling functions.

## Available Functions

### Window Management

- [`CreateWindow(id, title, x, y, width, height)`](./windows.md#createwindow) - Creates a UI window
- [`SetWindowPosition(windowId, x, y)`](./windows.md#setwindowposition) - Sets a window's position
- [`SetWindowSize(windowId, width, height)`](./windows.md#setwindowsize) - Sets a window's size
- [`ShowWindow(windowId, visible)`](./windows.md#showwindow) - Shows or hides a window
- [`DestroyWindow(windowId)`](./windows.md#destroywindow) - Destroys a window

### UI Controls

- [`AddButton(windowId, id, text, callback)`](./controls.md#addbutton) - Adds a button to a window
- [`AddLabel(windowId, id, text)`](./controls.md#addlabel) - Adds a label to a window
- [`AddTextField(windowId, id, text)`](./controls.md#addtextfield) - Adds a text field to a window
- [`GetControlText(controlId)`](./controls.md#getcontroltext) - Gets the text of a UI control
- [`SetControlText(controlId, text)`](./controls.md#setcontroltext) - Sets the text of a UI control
- [`SetControlPosition(controlId, x, y)`](./controls.md#setcontrolposition) - Sets a control's position
- [`SetControlSize(controlId, width, height)`](./controls.md#setcontrolsize) - Sets a control's size
- [`ShowControl(controlId, visible)`](./controls.md#showcontrol) - Shows or hides a control
- [`DestroyControl(controlId)`](./controls.md#destroycontrol) - Destroys a control

### UI Styling

- [`SetWindowStyle(colorName, r, g, b, a)`](./styling.md#setwindowstyle) - Sets window style colors
- [`SetButtonStyle(colorName, r, g, b, a)`](./styling.md#setbuttonstyle) - Sets button style colors
- [`SetLabelStyle(colorName, r, g, b, a)`](./styling.md#setlabelstyle) - Sets label style colors
- [`SetTextFieldStyle(colorName, r, g, b, a)`](./styling.md#settextfieldstyle) - Sets text field style colors
- [`SetBoxStyle(colorName, r, g, b, a)`](./styling.md#setboxstyle) - Sets box style colors
- [`SetFontSize(styleName, size)`](./styling.md#setfontsize) - Sets font size for UI elements
- [`SetFontStyle(styleName, fontStyle)`](./styling.md#setfontstyle) - Sets font style (bold, italic, etc.)
- [`SetTextAlignment(styleName, alignment)`](./styling.md#settextalignment) - Sets text alignment
- [`SetBorder(styleName, left, right, top, bottom)`](./styling.md#setborder) - Sets border dimensions
- [`SetPadding(styleName, left, right, top, bottom)`](./styling.md#setpadding) - Sets padding dimensions

## Example Usage

### Basic Window with Controls

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
    AddButton(windowId, submitButtonId, "Save Name", OnSaveNameClick)
    SetControlPosition(submitButtonId, 100, 150)
    
    -- Show the window
    ShowWindow(windowId, true)
}

function OnSaveNameClick()
    local playerName = GetControlText(nameFieldId)
    if playerName and playerName ~= "" then
        ShowNotification("Name saved: " .. playerName)
        -- Here you might store the name in the Registry
        DestroyWindow(windowId)
    else
        ShowNotification("Please enter a valid name")
    end
end

function CommandNameChange(args)
    CreatePlayerInfoWindow()
end

function OnConsoleReady()
    -- Register commands
    RegisterCommand("namechange", "Opens name change window", "namechange", CommandNameChange)
end
```

### Styled Window Example

```lua
function CreateStyledWindow()
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
    SetLabelStyle("text", 0.8, 0.8, 0.9, 1.0)
    
    -- Add buttons with different styles
    AddButton("styledWindow", "acceptButton", "OK", OnAcceptButtonClick)
    SetControlPosition("acceptButton", 200, 350)
    SetButtonStyle("background", 0.3, 0.6, 0.3, 1.0)
    SetButtonStyle("text", 1.0, 1.0, 1.0, 1.0)
    
    -- Show the window
    ShowWindow("styledWindow", true)
}

function OnAcceptButtonClick()
    DestroyWindow("styledWindow")
end

function CommandShowStyledUI(args)
    CreateStyledWindow()
end

function OnConsoleReady()
    -- Register UI commands
    RegisterCommand("namechange", "Opens name change window", "namechange", CommandNameChange)
    RegisterCommand("styledui", "Shows a styled UI example", "styledui", CommandShowStyledUI)
end
```

## Current Limitations

- UI elements may not persist across scene changes
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
- **Consistent styling**: Use the styling functions to maintain a consistent look across your UI elements

## Future Enhancements

Future updates to the Custom UI API will include:

- Additional control types (checkboxes, radio buttons, sliders)
- World-space UI elements
- UI animations and transitions
- UI event system
- Drag-and-drop support
- Advanced layout containers

Explore the sections in the sidebar for detailed documentation of each function.

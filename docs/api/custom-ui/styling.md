# UI Styling Functions

This section covers functions for styling custom UI elements in your interface.

## SetWindowStyle

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
SetWindowStyle("background", 0.1, 0.1, 0.3, 0.9)
```

## SetButtonStyle

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

## SetLabelStyle

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

## SetTextFieldStyle

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

## SetBoxStyle

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

## SetFontSize

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

## SetFontStyle

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

## SetTextAlignment

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

## SetBorder

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

## SetPadding

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

## Complete Styling Example

Here's an example showing how to create a fully styled window with various elements:

```lua
function CreateFullyStyledWindow()
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
    CreateFullyStyledWindow()
end)
```

## Best Practices for UI Styling

1. **Consistent Color Scheme**: Use a consistent color palette throughout your UI
2. **Contrast**: Ensure text has good contrast against its background for readability
3. **Hierarchy**: Use font sizes and styles to create visual hierarchy
4. **Feedback**: Style interactive elements (like buttons) to provide visual feedback on hover/active states
5. **Padding & Spacing**: Use padding and borders to create visual breathing room
6. **Theme Support**: Consider creating theme functions that can apply a consistent set of styles
7. **Performance**: Be mindful that excessive style changes might impact performance 
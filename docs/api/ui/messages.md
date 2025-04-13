# Messages and Dialogs

The Messages and Dialog system provides functions for displaying various types of messages to the player in Schedule 1.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic message functions are stable.</p>
</div>

## Message Functions

### ShowMessage

**Signature:** `void ShowMessage(string message)`

**Description:** Shows a simple text message to the player.

### Parameters

- `message` (string): The text message to display

### Returns

None.

### Example

```lua
function OnPlayerEnterShop()
    ShowMessage("Welcome to the General Store! Press E to interact with items.")
}

-- More complex example with conditional messaging
function CheckPlayerInventory()
    local inventorySpace = GetPlayerInventorySpace()
    local usedSpace = GetPlayerInventoryUsedSpace()
    
    if usedSpace >= inventorySpace then
        ShowMessage("Your inventory is full! Consider selling items at the store.")
    elseif usedSpace >= inventorySpace * 0.8 then
        ShowMessage("Your inventory is almost full.")
    end
}
```

### Notes

- Messages display for a default duration (approximately 3 seconds)
- Simple messages should be short and concise
- For longer or more complex messages, use dialogs

### ShowTimedMessage

**Signature:** `void ShowTimedMessage(string message, float duration)`

**Description:** Shows a text message for a specified duration.

### Parameters

- `message` (string): The text message to display
- `duration` (float): Time in seconds to display the message

### Returns

None.

### Example

```lua
-- Simple timed message
function NotifyPlayerOfCurfew()
    local currentHour = GetGameHour()
    
    if currentHour == 21 then  -- 9 PM
        ShowTimedMessage("Curfew begins in 1 hour. Return to your residence.", 8.0)
    elseif currentHour == 22 then  -- 10 PM
        ShowTimedMessage("Curfew has begun. Return to your residence immediately!", 10.0)
    end
}

-- Display temporary achievement notification
function AwardAchievement(achievementName, description)
    ShowTimedMessage("Achievement Unlocked: " .. achievementName .. "\n" .. description, 5.0)
    -- Additional code to register achievement in player stats
}
```

### Notes

- Useful for notifications that need specific display times
- Longer durations are appropriate for more important or detailed messages
- Very short durations (< 1 second) may not be noticeable to players

### ShowMessageWithPosition

**Signature:** `void ShowMessageWithPosition(string message, float x, float y)`

**Description:** Shows a message at a specific screen position.

### Parameters

- `message` (string): The text message to display
- `x` (float): X-coordinate on screen (0.0 to 1.0, where 0.0 is left and 1.0 is right)
- `y` (float): Y-coordinate on screen (0.0 to 1.0, where 0.0 is top and 1.0 is bottom)

### Returns

None.

### Example

```lua
-- Display contextual hints in different screen positions
function ShowTutorialHints()
    -- Show inventory hint at top right
    ShowMessageWithPosition("Press I to open inventory", 0.9, 0.1)
    
    -- Show interaction hint at bottom center
    ShowMessageWithPosition("Press E to interact with objects", 0.5, 0.9)
}

-- Display region name when entering new area
function OnRegionEnter(regionName)
    -- Display region name at top center
    ShowMessageWithPosition(regionName, 0.5, 0.1)
    
    -- Additional information at bottom
    if IsNewRegion(regionName) then
        ShowMessageWithPosition("New area discovered! Check your map for details.", 0.5, 0.9)
    end
}
```

### Notes

- Coordinates are normalized values (0.0 to 1.0), not pixel values
- Useful for contextual UI elements that need specific placement
- Messages appear for the default duration (approximately 3 seconds)
- For positioned messages with custom duration, use `ShowTimedMessageWithPosition`

### ShowTimedMessageWithPosition

**Signature:** `void ShowTimedMessageWithPosition(string message, float x, float y, float duration)`

**Description:** Shows a message at a specific screen position for a specified duration.

### Parameters

- `message` (string): The text message to display
- `x` (float): X-coordinate on screen (0.0 to 1.0, where 0.0 is left and 1.0 is right)
- `y` (float): Y-coordinate on screen (0.0 to 1.0, where 0.0 is top and 1.0 is bottom)
- `duration` (float): Time in seconds to display the message

### Returns

None.

### Example

```lua
-- Create a temporary tutorial overlay
function DisplayControlTutorial()
    -- Movement controls (top left)
    ShowTimedMessageWithPosition("WASD - Move character", 0.1, 0.1, 10.0)
    
    -- Action controls (top right)
    ShowTimedMessageWithPosition("E - Interact\nF - Use item\nR - Reload", 0.9, 0.1, 10.0)
    
    -- Menu controls (bottom left)
    ShowTimedMessageWithPosition("Tab - Inventory\nM - Map\nJ - Journal", 0.1, 0.9, 10.0)
}

-- Display countdown timer
function StartCountdown(seconds)
    for i = seconds, 1, -1 do
        local countStr = tostring(i)
        Wait((seconds - i), function()
            ShowTimedMessageWithPosition(countStr, 0.5, 0.4, 1.0)
        end)
    end
    
    Wait(seconds, function()
        ShowTimedMessageWithPosition("Go!", 0.5, 0.4, 1.0)
    end)
}
```

### Notes

- Combines the flexibility of positioned messages with custom duration
- Useful for temporary UI overlays and tutorials
- Multiple positioned messages can be shown simultaneously
- For complex multi-element UI, consider using custom window functionality

## Styled Message Functions

### ShowInfoMessage

**Signature:** `void ShowInfoMessage(string message)`

**Description:** Shows an informational message with appropriate styling.

### Parameters

- `message` (string): The informational message to display

### Returns

None.

### Example

```lua
-- Provide game tips during loading
function ShowRandomTip()
    local tips = {
        "You can fast travel between discovered regions using the map.",
        "Eating food restores energy while sleeping restores health.",
        "Complete daily tasks to earn reputation with local merchants.",
        "Check the job board regularly for new employment opportunities."
    }
    
    local randomTip = tips[math.random(1, #tips)]
    ShowInfoMessage("TIP: " .. randomTip)
}

-- Provide context-sensitive information
function OnExamineObject(objectType)
    if objectType == "Computer" then
        ShowInfoMessage("Computers can be used to check email and browse job listings.")
    elseif objectType == "Bookshelf" then
        ShowInfoMessage("Reading books can increase your skills and knowledge.")
    end
}
```

### Notes

- Info messages are styled with a blue or neutral color scheme
- Use for helpful tips, hints, and non-critical information
- The message displays for the default duration
- For custom duration, use `ShowTimedInfoMessage`

### ShowSuccessMessage

**Signature:** `void ShowSuccessMessage(string message)`

**Description:** Shows a success message with appropriate styling.

### Parameters

- `message` (string): The success message to display

### Returns

None.

### Example

```lua
-- Notify player of successful actions
function OnItemCrafted(itemName)
    ShowSuccessMessage("Successfully crafted: " .. itemName)
}

-- Indicate completed objectives
function OnQuestCompleted(questName, reward)
    ShowSuccessMessage("Quest Completed: " .. questName)
    
    if reward and reward > 0 then
        Wait(2.0, function()
            ShowSuccessMessage("Received " .. reward .. " credits")
        end)
    end
}
```

### Notes

- Success messages are styled with a green color scheme
- Use for positive feedback, achievements, and completed actions
- The message displays for the default duration
- For custom duration, use `ShowTimedSuccessMessage`

### ShowWarningMessage

**Signature:** `void ShowWarningMessage(string message)`

**Description:** Shows a warning message with appropriate styling.

### Parameters

- `message` (string): The warning message to display

### Returns

None.

### Example

```lua
-- Alert player of potential dangers
function CheckEnvironmentalHazards()
    local currentRegion = GetPlayerRegion()
    local weatherCondition = GetCurrentWeather()
    
    if currentRegion == "Wasteland" then
        ShowWarningMessage("Radiation levels rising. Protective gear recommended.")
    end
    
    if weatherCondition == "Storm" then
        ShowWarningMessage("Severe storm approaching. Seek shelter.")
    end
}

-- Warn of resource depletion
function CheckResources()
    local energy = GetPlayerEnergy()
    local health = GetPlayerHealth()
    
    if energy < 20 then
        ShowWarningMessage("Low energy! Find food or rest soon.")
    end
    
    if health < 30 then
        ShowWarningMessage("Health critical! Seek medical attention.")
    end
}
```

### Notes

- Warning messages are styled with a yellow/orange color scheme
- Use for cautionary information that requires player attention
- The message displays for the default duration
- For custom duration, use `ShowTimedWarningMessage`

### ShowErrorMessage

**Signature:** `void ShowErrorMessage(string message)`

**Description:** Shows an error message with appropriate styling.

### Parameters

- `message` (string): The error message to display

### Returns

None.

### Example

```lua
-- Indicate failed actions
function AttemptHacking(terminal)
    local hackingSkill = GetPlayerSkill("Hacking")
    local terminalDifficulty = terminal.difficulty
    
    if hackingSkill < terminalDifficulty then
        ShowErrorMessage("Hacking failed: Insufficient skill level")
        
        -- Apply consequences
        if math.random() < 0.3 then
            TriggerAlarm(terminal)
        end
    else
        -- Hacking success code
    end
}

-- Alert player of impossible actions
function AttemptItemUse(itemId, targetId)
    if not CanUseItemOn(itemId, targetId) then
        ShowErrorMessage("This item cannot be used here")
    end
}
```

### Notes

- Error messages are styled with a red color scheme
- Use for failed actions, errors, and critical issues
- The message displays for the default duration
- For custom duration, use `ShowTimedErrorMessage`

## Best Practices for Messages

### Message Length and Formatting

- **Keep messages concise**: Most messages should be 1-2 lines for readability
- **Use formatting sparingly**: While basic formatting (line breaks) is supported, complex formatting may not display correctly
- **Consider screen space**: Messages may be truncated if too long

### Message Priority and Timing

- **Avoid message spam**: Too many messages at once will confuse players
- **Prioritize messages**: Critical messages should take precedence over informational ones
- **Consider timing**: Space out messages to ensure they're read

### Creating a Message Queue System

For complex mods with many potential messages, consider implementing a queue system:

```lua
-- Simple message queue system example
local messageQueue = {}
local isDisplayingMessage = false

function QueueMessage(messageType, message, duration)
    table.insert(messageQueue, {
        type = messageType,  -- "info", "success", "warning", "error"
        text = message,
        time = duration or 3.0  -- Default 3 seconds
    })
    
    if not isDisplayingMessage then
        DisplayNextMessage()
    end
end

function DisplayNextMessage()
    if #messageQueue == 0 then
        isDisplayingMessage = false
        return
    end
    
    isDisplayingMessage = true
    local currentMessage = table.remove(messageQueue, 1)
    
    -- Display based on type
    if currentMessage.type == "info" then
        ShowTimedInfoMessage(currentMessage.text, currentMessage.time)
    elseif currentMessage.type == "success" then
        ShowTimedSuccessMessage(currentMessage.text, currentMessage.time)
    elseif currentMessage.type == "warning" then
        ShowTimedWarningMessage(currentMessage.text, currentMessage.time)
    elseif currentMessage.type == "error" then
        ShowTimedErrorMessage(currentMessage.text, currentMessage.time)
    else
        -- Default to regular message
        ShowTimedMessage(currentMessage.text, currentMessage.time)
    end
    
    -- Schedule next message
    Wait(currentMessage.time + 0.5, function()  -- Extra 0.5s buffer between messages
        DisplayNextMessage()
    end)
end

-- Usage example
function OnGameStart()
    QueueMessage("info", "Welcome to Schedule 1", 4.0)
    QueueMessage("info", "Press TAB to view your inventory", 3.0)
    QueueMessage("warning", "Remember to monitor your hunger and energy levels", 4.0)
end
```

### Message Contexts

Organize your messages by context for better readability:

```lua
-- Organize messages by context example
local MessageContexts = {
    Tutorial = {
        showTutorials = true,  -- Player setting
        
        ShowMessage = function(message, duration)
            if MessageContexts.Tutorial.showTutorials then
                ShowTimedInfoMessage("[TUTORIAL] " .. message, duration or a4.0)
            end
        end
    },
    
    Combat = {
        showCombatMessages = true,  -- Player setting
        
        ShowMessage = function(message, duration)
            if MessageContexts.Combat.showCombatMessages then
                ShowTimedMessage("[COMBAT] " .. message, duration or 3.0)
            end
        end
    },
    
    Quest = {
        ShowMessage = function(message, isImportant)
            if isImportant then
                ShowSuccessMessage("[QUEST] " .. message)
            else
                ShowInfoMessage("[QUEST] " .. message)
            end
        end
    }
}

-- Usage example
function OnGameEvent(eventType, data)
    if eventType == "tutorial_trigger" then
        MessageContexts.Tutorial.ShowMessage(data.message)
    elseif eventType == "combat_event" then
        MessageContexts.Combat.ShowMessage(data.message)
    elseif eventType == "quest_update" then
        MessageContexts.Quest.ShowMessage(data.message, data.isImportant)
    end
end
``` 
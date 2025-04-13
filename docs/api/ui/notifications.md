# Notifications

The Notification system provides functions for displaying persistent notifications in Schedule 1's UI. Unlike temporary messages, notifications remain visible until dismissed or replaced.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic notification functions are available.</p>
</div>

## Notification Functions

### ShowNotification

**Signature:** `int ShowNotification(string title, string message, string type)`

**Description:** Shows a notification with a title and message of the specified type.

### Parameters

- `title` (string): The notification title
- `message` (string): The notification message content
- `type` (string): The notification type - "info", "success", "warning", or "error"

### Returns

- `notificationId` (int): A unique identifier for the notification that can be used to update or dismiss it

### Example

```lua
-- Display a simple notification
function OnQuestAvailable(questName, questGiver)
    local notificationId = ShowNotification(
        "New Quest Available",
        "Visit " .. questGiver .. " to start the quest: " .. questName,
        "info"
    )
    
    -- Store the notification ID for later reference
    SaveNotificationId("quest_" .. questName, notificationId)
}

-- Show success notification with rewards
function OnSkillLevelUp(skillName, newLevel)
    local bonusText = ""
    
    if skillName == "Strength" then
        bonusText = "Increased carrying capacity by 5kg"
    elseif skillName == "Intelligence" then
        bonusText = "Unlocked new dialogue options"
    end
    
    ShowNotification(
        skillName .. " Increased!",
        "Your " .. skillName .. " skill is now level " .. newLevel .. ".\n" .. bonusText,
        "success"
    )
}
```

### Notes

- Notifications remain visible until dismissed or replaced
- Each notification has a unique ID returned by the function
- Standard types are "info" (blue), "success" (green), "warning" (yellow), and "error" (red)
- Notifications can be updated or dismissed using their ID

### UpdateNotification

**Signature:** `boolean UpdateNotification(int notificationId, string title, string message, string type)`

**Description:** Updates an existing notification with new content.

### Parameters

- `notificationId` (int): The ID of the notification to update
- `title` (string): The new notification title
- `message` (string): The new notification message content
- `type` (string): The new notification type

### Returns

- `success` (boolean): Whether the notification was successfully updated

### Example

```lua
-- Update quest progress notification
function UpdateQuestProgress(questName, progress, maxProgress)
    local notificationId = GetSavedNotificationId("quest_" .. questName)
    local progressText = "Progress: " .. progress .. "/" .. maxProgress
    
    if progress == maxProgress then
        UpdateNotification(
            notificationId,
            "Quest Ready to Complete",
            questName .. " is ready to be completed!\n" .. progressText,
            "success"
        )
    else
        UpdateNotification(
            notificationId,
            "Quest In Progress",
            questName .. " is in progress.\n" .. progressText,
            "info"
        )
    end
}

-- Update resource notification as resources deplete
function UpdateResourceNotification(resourceType, amount, previousAmount)
    local notificationId = GetResourceNotificationId(resourceType)
    local type = "info"
    
    if amount < 10 then
        type = "error"
    elseif amount < 25 then
        type = "warning"
    end
    
    UpdateNotification(
        notificationId,
        resourceType .. " Status",
        "Current " .. resourceType .. ": " .. amount,
        type
    )
}
```

### Notes

- To update a notification, you must store the notification ID when it's created
- If the notification ID doesn't exist, the function returns false
- Updating a notification resets its display time (if applicable)
- You can change the notification type to reflect changes in status

### DismissNotification

**Signature:** `boolean DismissNotification(int notificationId)`

**Description:** Dismisses (removes) a notification from the UI.

### Parameters

- `notificationId` (int): The ID of the notification to dismiss

### Returns

- `success` (boolean): Whether the notification was successfully dismissed

### Example

```lua
-- Dismiss a quest notification when completed
function OnQuestCompleted(questName)
    local notificationId = GetSavedNotificationId("quest_" .. questName)
    DismissNotification(notificationId)
    
    -- Show temporary success message instead
    ShowSuccessMessage("Quest Completed: " .. questName)
}

-- Dismiss alert when danger passes
function OnAreaClear(areaName, dangerType)
    local notificationId = GetAreaAlertNotificationId(areaName)
    
    if notificationId then
        DismissNotification(notificationId)
        
        -- Inform player that the area is now safe
        ShowTimedMessage("The " .. areaName .. " is now clear of " .. dangerType, 5.0)
    end
}
```

### Notes

- Once dismissed, a notification ID is no longer valid
- You should remove any stored references to the notification ID after dismissing
- Returns false if the notification ID doesn't exist or has already been dismissed

### ShowTimedNotification

**Signature:** `int ShowTimedNotification(string title, string message, string type, float duration)`

**Description:** Shows a notification that automatically dismisses after the specified duration.

### Parameters

- `title` (string): The notification title
- `message` (string): The notification message content
- `type` (string): The notification type - "info", "success", "warning", or "error"
- `duration` (float): Time in seconds before the notification is automatically dismissed

### Returns

- `notificationId` (int): A unique identifier for the notification

### Example

```lua
-- Show temporary buff notification
function OnBuffApplied(buffName, duration, effect)
    local notificationId = ShowTimedNotification(
        "Buff Applied: " .. buffName,
        "Effect: " .. effect .. "\nDuration: " .. duration .. " seconds",
        "success",
        5.0  -- Show notification for 5 seconds
    )
}

-- Show limited-time offer notification
function OnLimitedTimeOffer(merchantName, itemName, discount, timeRemaining)
    local notificationId = ShowTimedNotification(
        "Limited Time Offer!",
        merchantName .. " is offering " .. itemName .. " at " .. discount .. "% off!\n" ..
        "Offer expires in " .. timeRemaining .. " minutes.",
        "info",
        10.0  -- Show for 10 seconds
    )
}
```

### Notes

- Timed notifications are useful for temporary information that doesn't need permanent visibility
- The notification can still be manually dismissed before the duration expires
- The notification ID can be used to update the notification before it expires

### DismissAllNotifications

**Signature:** `void DismissAllNotifications()`

**Description:** Dismisses all active notifications.

### Parameters

None.

### Returns

None.

### Example

```lua
-- Clear all notifications when entering a new area
function OnAreaTransition(fromArea, toArea)
    DismissAllNotifications()
    
    -- Show a fresh notification for the new area
    ShowNotification(
        "Entering: " .. toArea,
        "You have entered " .. toArea .. " from " .. fromArea,
        "info"
    )
}

-- Clear all notifications on game load
function OnGameLoad()
    DismissAllNotifications()
}
```

### Notes

- Use this function sparingly, as it removes all active notifications
- Ideal for major game state changes like loading a save or entering a new area
- All notification IDs become invalid after this call

## Advanced Notification Features

### ShowActionNotification

**Signature:** `int ShowActionNotification(string title, string message, string type, string actionText, function callback)`

**Description:** Shows a notification with an action button that triggers a callback function when clicked.

### Parameters

- `title` (string): The notification title
- `message` (string): The notification message content
- `type` (string): The notification type
- `actionText` (string): The text to display on the action button
- `callback` (function): The function to call when the action button is clicked

### Returns

- `notificationId` (int): A unique identifier for the notification

### Example

```lua
-- Show notification with action button to accept quest
function OfferQuest(questName, questGiver, questDescription)
    local notificationId = ShowActionNotification(
        "New Quest Available",
        "From: " .. questGiver .. "\n" .. questDescription,
        "info",
        "Accept Quest",
        function()
            AcceptQuest(questName)
            DismissNotification(notificationId)
        end
    )
}

-- Show notification with action button to fast travel
function OfferFastTravel(locationName, travelTime)
    local notificationId = ShowActionNotification(
        "Fast Travel Available",
        "You can fast travel to " .. locationName .. ".\nTravel time: " .. travelTime .. " minutes",
        "info",
        "Fast Travel",
        function()
            FastTravelToLocation(locationName)
            DismissNotification(notificationId)
        end
    )
}
```

### Notes

- Action notifications are useful for providing interactive choices
- The callback function is executed when the player clicks the action button
- You should dismiss the notification in the callback to prevent multiple clicks
- Only one action button is supported per notification

### ShowChoiceNotification

**Signature:** `int ShowChoiceNotification(string title, string message, string type, table choices)`

**Description:** Shows a notification with multiple choice buttons.

### Parameters

- `title` (string): The notification title
- `message` (string): The notification message content
- `type` (string): The notification type
- `choices` (table): A table of choice objects, each with text and callback properties

### Returns

- `notificationId` (int): A unique identifier for the notification

### Example

```lua
-- Show notification with multiple response options
function ShowDialogueChoices(npcName, dialogueLine, responses)
    local choices = {}
    
    for i, response in ipairs(responses) do
        table.insert(choices, {
            text = response.text,
            callback = function()
                SelectDialogueResponse(npcName, i)
                DismissNotification(notificationId)
            end
        })
    end
    
    local notificationId = ShowChoiceNotification(
        npcName,
        dialogueLine,
        "info",
        choices
    )
}

-- Offer player choices for handling a situation
function OfferSituationChoices(situation, choices)
    local choiceOptions = {}
    
    for i, choice in ipairs(choices) do
        table.insert(choiceOptions, {
            text = choice.text,
            callback = function()
                ResolveSituation(situation, i)
                DismissNotification(notificationId)
            end
        })
    end
    
    local notificationId = ShowChoiceNotification(
        "Situation: " .. situation.title,
        situation.description,
        "warning",
        choiceOptions
    )
}
```

### Notes

- Choice notifications allow for multiple interactive options
- Each choice should have a text property (string) and a callback property (function)
- You should dismiss the notification in the callback to prevent multiple selections
- The notification ID is available within the callback scope

## Best Practices for Notifications

### Notification Management

When working with multiple notifications, consider implementing a notification manager:

```lua
-- Notification Manager Example
NotificationManager = {
    notifications = {}, -- Stores active notification IDs by category
    
    -- Show a notification and store its ID
    Show = function(category, title, message, type)
        -- Dismiss existing notification in this category if it exists
        if NotificationManager.notifications[category] then
            DismissNotification(NotificationManager.notifications[category])
        end
        
        -- Create new notification and store ID
        local notificationId = ShowNotification(title, message, type)
        NotificationManager.notifications[category] = notificationId
        
        return notificationId
    end,
    
    -- Update an existing notification by category
    Update = function(category, title, message, type)
        if NotificationManager.notifications[category] then
            UpdateNotification(
                NotificationManager.notifications[category],
                title,
                message,
                type
            )
            return true
        end
        return false
    end,
    
    -- Dismiss a notification by category
    Dismiss = function(category)
        if NotificationManager.notifications[category] then
            DismissNotification(NotificationManager.notifications[category])
            NotificationManager.notifications[category] = nil
            return true
        end
        return false
    end,
    
    -- Check if a notification exists for a category
    Exists = function(category)
        return NotificationManager.notifications[category] ~= nil
    end,
    
    -- Clear all tracked notifications
    Clear = function()
        for category, notificationId in pairs(NotificationManager.notifications) do
            DismissNotification(notificationId)
        end
        NotificationManager.notifications = {}
    end
}

-- Usage example
function UpdateQuestStatus(questName, status, progress, maxProgress)
    local category = "quest_" .. questName
    local title = questName
    local message = "Progress: " .. progress .. "/" .. maxProgress
    local type = "info"
    
    if status == "Available" then
        message = "New quest available! Speak to the quest giver to begin."
        type = "info"
    elseif status == "InProgress" then
        if progress == maxProgress then
            message = "Quest objectives complete! Return to the quest giver."
            type = "success"
        else
            message = "Progress: " .. progress .. "/" .. maxProgress
            type = "info"
        end
    elseif status == "Completed" then
        NotificationManager.Dismiss(category)
        return
    end
    
    if NotificationManager.Exists(category) then
        NotificationManager.Update(category, title, message, type)
    else
        NotificationManager.Show(category, title, message, type)
    end
}
```

### Notification Design Principles

For effective notification usage:

1. **Be selective**: Only show notifications for important information
2. **Group related updates**: Use the update function rather than creating multiple notifications
3. **Prioritize by type**: Use appropriate types to indicate importance
4. **Be concise**: Keep titles and messages short and clear
5. **Provide actions**: When appropriate, give users a way to respond directly from the notification
6. **Clean up**: Always dismiss notifications when they're no longer relevant

```lua
-- Example of good notification practice
function MonitorPlayerStatus()
    -- Check player conditions
    local health = GetPlayerHealth()
    local maxHealth = GetPlayerMaxHealth()
    local healthPercent = (health / maxHealth) * 100
    
    local radiation = GetPlayerRadiation()
    local hunger = GetPlayerHunger()
    local thirst = GetPlayerThirst()
    
    -- Determine most critical status
    local criticalStatus = nil
    local criticalValue = 0
    
    if healthPercent < 25 then
        criticalStatus = "Health"
        criticalValue = healthPercent
    end
    
    if radiation > 75 and (not criticalStatus or radiation > criticalValue) then
        criticalStatus = "Radiation"
        criticalValue = radiation
    end
    
    if hunger > 80 and (not criticalStatus or hunger > criticalValue) then
        criticalStatus = "Hunger"
        criticalValue = hunger
    end
    
    if thirst > 85 and (not criticalStatus or thirst > criticalValue) then
        criticalStatus = "Thirst"
        criticalValue = thirst
    end
    
    -- Update or clear status notification
    if criticalStatus then
        local title = "Critical: " .. criticalStatus
        local message = ""
        local type = "error"
        
        if criticalStatus == "Health" then
            message = "Health critical at " .. math.floor(healthPercent) .. "%. Find medical supplies."
        elseif criticalStatus == "Radiation" then
            message = "Radiation levels at " .. radiation .. "%. Take Rad-Away immediately."
        elseif criticalStatus == "Hunger" then
            message = "Extreme hunger. Find food soon or face health penalties."
        elseif criticalStatus == "Thirst" then
            message = "Severe dehydration. Drink water immediately."
        end
        
        -- Show or update notification
        if NotificationManager.Exists("player_status") then
            NotificationManager.Update("player_status", title, message, type)
        else
            NotificationManager.Show("player_status", title, message, type)
        end
    else
        -- If no critical status, dismiss any existing status notification
        NotificationManager.Dismiss("player_status")
    end
} 
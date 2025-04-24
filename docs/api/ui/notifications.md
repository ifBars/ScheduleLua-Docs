# Notifications

The Notification system provides functions for displaying persistent notifications in Schedule 1's UI. Unlike temporary messages, notifications remain visible until dismissed or replaced.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Fully implemented. All notification functions are available.</p>
</div>

## Notification Functions

### ShowNotification

**Signature:** `void ShowNotification(string title, string message)`

**Description:** Shows a notification with a title and message.

### Parameters

- `title` (string): The notification title
- `message` (string): The notification message content

### Returns

None.

### Example

```lua
-- Display a simple notification
function OnQuestAvailable(questName, questGiver)
    ShowNotification(
        "New Quest Available",
        "Visit " .. questGiver .. " to start the quest: " .. questName
    )
end

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
        "Your " .. skillName .. " skill is now level " .. newLevel .. ".\n" .. bonusText
    )
end
```

### Notes

- Notifications remain visible until dismissed by the player
- Keep notification content concise and relevant
- For temporary notifications, use `ShowNotificationWithTimeout`

### ShowNotificationWithIcon

**Signature:** `void ShowNotificationWithIcon(string title, string message, string iconPath)`

**Description:** Shows a notification with a title, message, and custom icon.

### Parameters

- `title` (string): The notification title
- `message` (string): The notification message content
- `iconPath` (string): Path to the icon image file (relative to script or absolute)

### Returns

None.

### Example

```lua
-- Display a notification with a custom icon
function OnItemDiscovered(itemName, itemType)
    local iconPath = "assets/icons/" .. itemType .. ".png"
    
    ShowNotificationWithIcon(
        "New Item Discovered",
        "You found: " .. itemName,
        iconPath
    )
end

-- Show achievement notification with icon
function AwardAchievement(achievementId, achievementName)
    local iconPath = "assets/achievements/" .. achievementId .. ".png"
    
    ShowNotificationWithIcon(
        "Achievement Unlocked",
        achievementName,
        iconPath
    )
end
```

### Notes

- The icon path can be relative to the script directory or an absolute path
- Supported image formats include PNG, JPG, and other common formats
- If the icon cannot be loaded, the notification will display without an icon
- Icon images should be square for best results (recommended size: 64x64 pixels)

### ShowNotificationWithTimeout

**Signature:** `void ShowNotificationWithTimeout(string message, float timeout)`

**Description:** Shows a notification that automatically disappears after the specified timeout.

### Parameters

- `message` (string): The notification message content
- `timeout` (float): Time in seconds before the notification is automatically dismissed

### Returns

None.

### Example

```lua
-- Show temporary buff notification
function OnBuffApplied(buffName, duration)
    ShowNotificationWithTimeout(
        "Buff applied: " .. buffName .. " (" .. duration .. "s)",
        5.0  -- Show notification for 5 seconds
    )
end

-- Show temporary warning
function OnAreaEntered(areaName, dangerLevel)
    if dangerLevel > 3 then
        ShowNotificationWithTimeout(
            "Warning: Entering high-danger area " .. areaName,
            8.0  -- Show warning for 8 seconds
        )
    end
end
```

### Notes

- Useful for notifications that are only relevant for a short time
- The timeout is approximate and may vary slightly
- For more complex timed notifications with icons, use `ShowNotificationWithIconAndTimeout`

### ShowNotificationWithIconAndTimeout

**Signature:** `void ShowNotificationWithIconAndTimeout(string title, string message, string iconPath, float timeout)`

**Description:** Shows a notification with a title, message, custom icon, and timeout.

### Parameters

- `title` (string): The notification title
- `message` (string): The notification message content
- `iconPath` (string): Path to the icon image file (relative to script or absolute)
- `timeout` (float): Time in seconds before the notification is automatically dismissed

### Returns

None.

### Example

```lua
-- Show limited-time event notification
function OnSpecialEventStarted(eventName, hoursRemaining)
    ShowNotificationWithIconAndTimeout(
        "Special Event",
        eventName .. " has started! Event ends in " .. hoursRemaining .. " hours.",
        "assets/events/special_event.png",
        10.0  -- Show for 10 seconds
    )
end

-- Show item pickup with icon and timeout
function OnRareItemPickup(itemName, itemRarity)
    local iconPath = "assets/items/" .. string.lower(itemName:gsub(" ", "_")) .. ".png"
    local timeout = 6.0  -- More important items show longer
    
    if itemRarity == "Legendary" then
        timeout = 10.0
    elseif itemRarity == "Epic" then
        timeout = 8.0
    end
    
    ShowNotificationWithIconAndTimeout(
        itemRarity .. " Item Found",
        "You found: " .. itemName,
        iconPath,
        timeout
    )
end
```

### Notes

- Combines the visual appeal of icons with the temporary nature of timed notifications
- Perfect for important but transient information
- The icon path can be relative to the script directory or an absolute path
- If the icon cannot be loaded, the notification will display without an icon
- The timeout is approximate and may vary slightly

## Best Practices

### General Guidelines

- **Keep it concise**: Notifications should be brief and to the point
- **Use appropriate timeouts**: More important information should stay longer
- **Don't overuse**: Too many notifications can annoy players
- **Icons matter**: Use icons that clearly relate to the notification content
- **Prioritize**: Only show notifications for important information

### Icon Guidelines

- **Size**: Icons should be square and ideally 64x64 pixels
- **Format**: PNG format with transparency works best
- **Clarity**: Icons should be clear even at small sizes
- **Consistency**: Use a consistent style for your icons
- **Contrast**: Ensure icons have good contrast with the notification background

### Timeout Guidelines

- **Critical information**: 8-10 seconds
- **Important information**: 5-7 seconds
- **Normal notifications**: 3-4 seconds
- **Minor information**: 1-2 seconds

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
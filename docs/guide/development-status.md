# Development Status

<div class="custom-block warning">
  <p><strong>Beta Software:</strong> ScheduleLua is currently in beta development. This page tracks the implementation status of various features.</p>
</div>

## Implementation Status

This page provides a transparent overview of what's currently working in ScheduleLua beta, what's partially implemented, and what's planned for future releases.

### Status Legend

- ✅ **Implemented** - Feature is fully working and stable
- 🟡 **Partial** - Feature is partially implemented but may have limitations
- 🔄 **In Progress** - Feature is actively being developed
- 📅 **Planned** - Feature is planned for future implementation
- ❌ **Not Planned** - Feature is not yet planned

## Core Systems

| Feature | Status | Notes |
|---------|--------|-------|
| Script Loading | ✅ | Scripts are properly loaded from the Scripts directory |
| Error Handling | 🟡 | Basic error reporting works, advanced diagnostics planned |
| Hot Reloading | ✅ | Scripts & Mods can be manually reloaded with the `luareload` command or automatically reloaded upon file change when the `EnableHotReload` MelonPreference is enabled |
| Lifecycle Event Hooks | ✅ | Core events like Initialize(), Update(), and Shutdown() function properly |
| Performance Profiling | 🔄 | Basic performance monitoring is in development |
| Debugging Tools | 📅 | Comprehensive debugging utilities planned |

## Example Scripts Status

Most example scripts located in the `Resources` directory are fully functional and demonstrate working features of the API. If you're looking for working examples of API usage, refer to these files:

- `example.lua` - Core API functionality
- `ui_example.lua` - UI system features
- `registry_example.lua` - Data storage functionality (**Note**: May have limited functionality as Registry system is still in development)
- `economy_example.lua` - Economy and player money systems
- `curfew_example.lua` - Law/curfew systems

## API Implementation

### Core API

| Function | Status | Notes |
|---------|--------|-------|
| Log(message) | ✅ | Prints a message to the console |
| LogWarning(message) | ✅ | Prints a warning message to the console |
| LogError(message) | ✅ | Prints an error message to the console |
| Wait(seconds, callback) | ✅ | Executes a function after a specified delay |
| Delay(seconds, callback) | ✅ | Alias for Wait() |

### Command API

| Function | Status | Notes |
|---------|--------|-------|
| RegisterCommand(name, description, usage, callback) | ✅ | Registers a custom console command |
| UnregisterCommand(name) | ✅ | Removes a registered command |
| UnregisterAllCommands() | ✅ | Removes all commands registered by the script |
| IsCommandRegistered(name) | ✅ | Checks if a command is already registered |
| GetGameCommands() | ✅ | Returns a table of all available game commands |

### Time API

| Function | Status | Notes |
|---------|--------|-------|
| GetGameTime() | ✅ | Returns the current in-game time (minutes) |
| FormatGameTime(timeValue) | ✅ | Formats a time value as a string (HH:MM) |
| GetGameDay() | ✅ | Returns the current day name (e.g., "Monday") |
| GetGameDayInt() | ✅ | Returns the current day as a number (1-7) |
| IsNightTime() | ✅ | Returns true if it's currently night time |
| SetTime(timeValue) | 📅 | Sets the game time to the specified value |

### Player API

| Function | Status | Notes |
|---------|--------|-------|
| GetPlayerState() | ✅ | Returns a table with comprehensive player information |
| GetPlayerPosition() | ✅ | Returns the player's position as a Vector3 |
| SetPlayerPosition(x, y, z) | ✅ | Sets the player's position |
| GetPlayerEnergy() | ✅ | Returns the player's current energy level |
| SetPlayerEnergy(amount) | ✅ | Sets the player's energy level |
| GetPlayerHealth() | ✅ | Returns the player's current health |
| SetPlayerHealth(amount) | ✅ | Sets the player's health |
| GetPlayerRegion() | ✅ | Returns the name of the region the player is in |
| GetPlayerMovementSpeed() | ✅ | Returns the player's current movement speed |
| SetPlayerMovementSpeed(speed) | ✅ | Sets the player's current movement speed |

### Economy API

| Function | Status | Notes |
|---------|--------|-------|
| GetPlayerCash() | ✅ | Returns the player's current cash amount |
| AddPlayerCash(amount) | ✅ | Adds the specified amount to player's cash |
| RemovePlayerCash(amount) | ✅ | Removes the specified amount from player's cash |
| GetPlayerOnlineBalance() | ✅ | Returns the player's online bank balance |
| AddOnlineBalance(amount) | ✅ | Adds to player's online balance but UI doesn't update |
| RemoveOnlineBalance(amount) | ✅ | Removes from player's online balance but UI doesn't update |
| GetLifetimeEarnings() | ✅ | Returns the player's lifetime earnings |
| GetNetWorth() | ✅ | Returns the player's total net worth |
| FormatMoney(amount) | ✅ | Formats a money amount as a string |
| CheckIfCanAfford(amount) | ✅ | Checks if the player can afford the specified amount |
| CreateTransaction(description, price, quantity, useOnline) | 🔄 | Creates and processes a transaction |
| GetATMDepositLimit() | ✅ | Gets the ATM deposit limit |
| SetATMDepositLimit(amount) | ✅ | Sets the ATM deposit limit |

### GameObject API

| Function | Status | Notes |
|---------|--------|-------|
| FindGameObject(name) | ✅ | Finds a GameObject by name |
| GetPosition(gameObject) | ✅ | Gets position of a GameObject as Vector3 |
| SetPosition(gameObject, x, y, z) | ✅ | Sets position of a GameObject |

### Inventory API

| Function | Status | Notes |
|---------|--------|-------|
| GetInventorySlotCount() | ✅ | Returns the number of inventory slots |
| GetInventoryItemAt(slotIndex) | ✅ | Returns the item at specified inventory slot |
| AddItemToInventory(itemName, amount) | 🟡 | Adds an item to player's inventory |
| RemoveItemFromInventory(itemName, amount) | 🟡 | Removes an item from player's inventory |

### NPC API

| Function | Status | Notes |
|---------|--------|-------|
| GetNPC(npcId) | ✅ | Gets NPC data by ID |
| GetNPCPosition(npc) | ✅ | Gets an NPC's position |
| SetNPCPosition(npc, x, y, z) | 🔄 | Sets an NPC's position (Untested) |
| GetNPCRegion(npcId) | ✅ | Gets the region an NPC is in |
| GetNPCsInRegion(region) | ✅ | Gets all NPCs in a specific region |
| GetAllNPCs() | ✅ | Gets a list of all NPCs |
| GetAllNPCRegions() | ✅ | Gets a list of all regions with NPCs |
| IsNPCInRegion(npcId, region) | ✅ | Checks if an NPC is in a specific region |

### UI API

| Function | Status | Notes |
|---------|--------|-------|
| ShowNotification(message) | ✅ | Shows a notification message |
| ShowNotificationWithTimeout(message, timeout) | ✅ | Shows a notification with custom timeout |
| HideNotification() | ✅ | Hides currently displayed notification |
| ShowMessage(message) | 🟡 | Shows a text message |
| CreateWindow(id, title, x, y, width, height) | ✅ | Creates a UI window |
| SetWindowPosition(windowId, x, y) | ✅ | Sets a window's position |
| SetWindowSize(windowId, width, height) | ✅ | Sets a window's size |
| ShowWindow(windowId, visible) | ✅ | Shows or hides a window |
| DestroyWindow(windowId) | ✅ | Destroys a window |
| AddButton(windowId, id, text, callback) | ✅ | Adds a button to a window |
| AddLabel(windowId, id, text) | ✅ | Adds a label to a window |
| AddTextField(windowId, id, text) | ✅ | Adds a text field to a window |
| GetControlText(controlId) | ✅ | Gets the text of a UI control |
| SetControlText(controlId, text) | ✅ | Sets the text of a UI control |
| SetControlPosition(controlId, x, y) | ✅ | Sets a control's position |
| SetControlSize(controlId, width, height) | ✅ | Sets a control's size |
| ShowControl(controlId, visible) | ✅ | Shows or hides a control |
| DestroyControl(controlId) | ✅ | Destroys a control |
| ShowDialogue(title, text) | ✅ | Shows a dialogue box |
| ShowDialogueWithTimeout(title, text, timeout) | ✅ | Shows a dialogue with timeout |
| ShowChoiceDialogue(title, text, choices, callback) | ✅ | Shows a dialogue with choices |
| CloseDialogue() | ✅ | Closes the current dialogue |

### Registry API

| Function | Status | Notes |
|---------|--------|-------|
| IsRegistryReady() | ✅ | Checks if the registry system is ready |
| OnRegistryReady(callback) | ✅ | Registers a callback for when registry is ready |

### Item Registry API

| Function | Status | Notes |
|---------|--------|-------|
| GetItem(itemId) | ✅ | Gets item definition by ID |
| DoesItemExist(itemId) | ✅ | Checks if an item exists in the registry |
| GetItemCategories() | 🟡 | Gets a list of all item categories |
| GetItemsInCategory(categoryName) | 🟡 | Gets all items in a category |
| GetAllItems() | 🔄 | Gets a list of all available items |
| CreateItem(id, name, description, category, stackLimit) | 🔄 | Creates a new item definition |
| CreateQualityItem(id, name, description, category, stackLimit, defaultQuality) | 🔄 | Creates a quality item |
| CreateIntegerItem(id, name, description, category, stackLimit, defaultValue) | 🔄 | Creates an integer item |
| ModifyItem(itemId, properties) | ✅ | Modifies an existing item's properties |
| CreateItemInstance(itemId, quantity) | 🔄 | Creates an instance of an item |
| AddItemToPlayerInventory(itemInstance) | ✅ | Adds an item instance to player inventory |

### Vector/Math API

| Function | Status | Notes |
|---------|--------|-------|
| Vector3(x, y, z) | ✅ | Creates a 3D vector |
| Vector3Distance(v1, v2) | ✅ | Calculates distance between vectors |
| Vector3.zero | ✅ | Constant for zero vector |
| Vector3.one | ✅ | Constant for (1,1,1) vector |
| Vector3.up/down/left/right/forward/back | ✅ | Direction constants |

### Law/Curfew API

| Function | Status | Notes |
|---------|--------|-------|
| IsCurfewEnabled() | ✅ | Checks if curfew system is enabled |
| IsCurfewActive() | ✅ | Checks if curfew is currently active |
| IsCurfewActiveWithTolerance() | ✅ | Checks if curfew is active with grace period |
| GetCurfewStartTime() | ✅ | Gets the curfew start time |
| GetCurfewEndTime() | ✅ | Gets the curfew end time |
| GetCurfewWarningTime() | ✅ | Gets the curfew warning time |
| GetTimeUntilCurfew() | ✅ | Gets minutes until curfew starts |

## Script Events

| Event | Status | Notes |
|---------|--------|-------|
| Initialize() | ✅ | Called when script is first loaded |
| Update() | ✅ | Called every frame |
| Shutdown() | ✅ | Called when script is unloaded |
| OnPlayerReady() | ✅ | Called when player character is fully initialized |
| OnConsoleReady() | ✅ | Called when console is fully loaded |
| OnRegistryReady() | ✅ | Called when registry system is fully loaded |
| OnSceneLoaded(sceneName) | ✅ | Called when a scene is loaded |
| OnDayChanged(dayName, dayIndex) | ✅ | Called when game day changes |
| OnTimeChanged(timeValue) | ✅ | Called when game time changes |
| OnPlayerHealthChanged(oldValue, newValue) | ✅ | Called when player health changes |
| OnPlayerEnergyChanged(oldValue, newValue) | ✅ | Called when player energy changes |
| OnSleepStart() | 🟡 | Called when player goes to sleep |
| OnSleepEnd() | 🟡 | Called when player wakes up |
| OnItemAdded() | 🔄 | Called when inventory changes |
| OnItemRemoved() | 🔄 | Called when inventory changes |
| OnPlayerMoneyChanged() | ✅ | Called when player money changes |
| OnCurfewEnabled() | ✅ | Called when curfew system is enabled |
| OnCurfewDisabled() | ✅ | Called when curfew system is disabled |
| OnCurfewWarning() | ✅ | Called when curfew warning is issued |
| OnCurfewHint() | ✅ | Called when curfew hint is shown |

## Known Issues

- UI functions may break upon hot-reload
- Networking is not explicitly handled in any scenario
- When modifying player's online balance with AddOnlineBalance() or RemoveOnlineBalance(), the actual balance changes correctly but the UI display in the hotbar does not update

## Reporting Issues

If you encounter bugs or have suggestions:

1. Check if the issue is already known in this documentation
2. Test with the latest beta version
3. Provide a minimal example script that reproduces the issue
4. Report the issue through our [GitHub Issues](https://github.com/schedulelua/issues) or [Discord](https://discord.gg/Ab8snpEFDn)

## Credits and Acknowledgments

ScheduleLua is currently developed and maintained by a single developer. As a one-person project, updates and new features may be released at a slower pace compared to larger projects. Your patience and understanding are greatly appreciated!

If you're interested in contributing to the project, whether through code contributions, testing, or documentation improvements, please see the [Contributing](/guide/contributing) page. Every contribution helps make ScheduleLua better for everyone.

## Beta Testing

Your participation in beta testing is invaluable! Please provide feedback on:

- Features that work well or need improvement
- Documentation clarity and completeness
- Performance issues or crashes
- Script examples that would be helpful

Thank you for helping improve ScheduleLua! 
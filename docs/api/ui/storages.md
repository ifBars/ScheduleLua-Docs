# Storage Entities

ScheduleLua provides an API for creating and managing storage entities, which are UI elements that represent containers for items in the game. These storage entities can be used to create custom chests, lockers, backpacks, or any other type of item storage that players can interact with.

## Creating Storage Entities

### CreateStorageEntity

Creates a new storage entity with the specified name and slots.

```lua
-- Create a storage entity with 12 slots (3 rows of 4 slots)
local storageId = UI.CreateStorageEntity("My Chest", 12, 3)
```

**Parameters:**
- `name` (string): The display name of the storage entity
- `slotCount` (integer): The total number of item slots in the storage
- `rowCount` (integer): The number of rows to display (slots will be arranged accordingly)

**Returns:**
- `entityId` (string): Unique identifier for the created storage entity

## Managing Storage Entities

### OpenStorageEntity

Opens the storage entity UI for player interaction.

```lua
UI.OpenStorageEntity(storageId)
```

**Parameters:**
- `entityId` (string): The ID of the storage entity to open

### CloseStorageEntity

Closes the storage entity UI if it's currently open.

```lua
UI.CloseStorageEntity(storageId)
```

**Parameters:**
- `entityId` (string): The ID of the storage entity to close

### IsStorageOpen

Checks if a storage entity UI is currently open.

```lua
local isOpen = UI.IsStorageOpen(storageId)
```

**Parameters:**
- `entityId` (string): The ID of the storage entity to check

**Returns:**
- `isOpen` (boolean): True if the storage entity is open, false otherwise

### SetStorageName

Changes the display name of a storage entity.

```lua
UI.SetStorageName(storageId, "Rare Items Chest")
```

**Parameters:**
- `entityId` (string): The ID of the storage entity
- `name` (string): The new display name

### SetStorageSubtitle

Sets the subtitle text for a storage entity.

```lua
UI.SetStorageSubtitle(storageId, "Contains 5/12 items")
```

**Parameters:**
- `entityId` (string): The ID of the storage entity
- `subtitle` (string): The subtitle text to display

## Managing Storage Contents

### AddItemToStorage

Adds an item to the storage entity.

```lua
local success = UI.AddItemToStorage(storageId, "apple", 5)
```

**Parameters:**
- `entityId` (string): The ID of the storage entity
- `itemId` (string): The ID of the item to add
- `quantity` (integer, optional): The quantity to add (default: 1)

**Returns:**
- `success` (boolean): True if the item was added successfully, false if there was no space

### GetStorageItems

Returns a table containing all items in the storage entity.

```lua
local items = UI.GetStorageItems(storageId)
for id, item in pairs(items) do
    print(id, item.name, item.quantity)
end
```

**Parameters:**
- `entityId` (string): The ID of the storage entity

**Returns:**
- `items` (table): A table mapping slot IDs to item data

### ClearStorageContents

Removes all items from the storage entity.

```lua
UI.ClearStorageContents(storageId)
```

**Parameters:**
- `entityId` (string): The ID of the storage entity

### GetStorageEntityCount

Returns the total number of storage entities that have been created.

```lua
local count = UI.GetStorageEntityCount()
```

**Returns:**
- `count` (integer): The number of storage entities

## Example

Here's a complete example of creating and using a storage entity:

```lua
function OnLoad()
    -- Create a backpack with 15 slots (3 rows of 5)
    backpackId = UI.CreateStorageEntity("Backpack", 15, 3)
    
    -- Add some items
    UI.AddItemToStorage(backpackId, "apple", 2)
    UI.AddItemToStorage(backpackId, "water_bottle", 1)
    
    -- Register a command to open the backpack
    Commands.Register("backpack", function()
        UI.OpenStorageEntity(backpackId)
    end)
end

function OnUpdate()
    -- Check if backpack is open and update subtitle with item count
    if UI.IsStorageOpen(backpackId) then
        local items = UI.GetStorageItems(backpackId)
        local count = 0
        for _, _ in pairs(items) do
            count = count + 1
        end
        UI.SetStorageSubtitle(backpackId, count .. "/15 slots used")
    end
end
```

## Notes

- Storage entities persist for the lifetime of your script, but their contents are not automatically saved between game sessions.
- To implement persistent storage, you'll need to use the Registry API to save and load the storage contents.
- Storage entities use the game's native UI system and appear similar to other in-game containers. 
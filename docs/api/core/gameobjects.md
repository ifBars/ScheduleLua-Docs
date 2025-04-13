# GameObject Functions

The GameObject API provides functions for interacting with in-game objects and entities in Schedule 1.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Limited implementation. Only basic object finding and position functions are currently available.</p>
</div>

## Finding GameObjects

### FindGameObject

**Signature:** `table FindGameObject(string name)`

**Description:** Finds a GameObject by name and returns its information.

### Parameters

- `name` (string): The name of the GameObject to find

### Returns

- `table`: A table with GameObject information, or nil if not found

### Example

```lua
function CheckPostBox()
    local postBox = FindGameObject("PostBox")
    
    if postBox then
        Log("Found post box at position: " .. 
            GetPosition(postBox).x .. ", " .. 
            GetPosition(postBox).y .. ", " .. 
            GetPosition(postBox).z)
        return true
    else
        Log("Post box not found in the scene")
        return false
    end
}

RegisterCommand("postbox", "Finds the post box", "postbox", function(args)
    if CheckPostBox() then
        ShowNotification("Post box found!")
    else
        ShowNotification("Post box not found in this area.")
    end
end)
```

### Notes

- GameObject names are case-sensitive
- Only returns objects that are currently loaded in the scene
- The returned table represents the Unity GameObject
- Some GameObjects may have different names in different scenes

## Manipulating GameObjects

### GetPosition

**Signature:** `table GetPosition(table gameObject)`

**Description:** Gets the position of a GameObject.

### Parameters

- `gameObject` (table): The GameObject to get the position from

### Returns

- `table`: A position vector with x, y, z coordinates

### Example

```lua
function ShowObjectPosition(objectName)
    local obj = FindGameObject(objectName)
    
    if not obj then
        ShowNotification("Object not found: " .. objectName)
        return
    end
    
    local pos = GetPosition(obj)
    ShowNotification(objectName .. " position: " .. pos.x .. ", " .. pos.y .. ", " .. pos.z)
}

RegisterCommand("pos", "Shows position of an object", "pos [object name]", function(args)
    if #args < 2 then
        ShowNotification("Please specify an object name")
        return
    end
    
    ShowObjectPosition(args[2])
end)
```

### Notes

- Position coordinates are in world space
- The position vector has x, y, and z fields
- This function works with any GameObject, including NPCs and the player

### SetPosition

**Signature:** `void SetPosition(table gameObject, number x, number y, number z)`

**Description:** Sets the position of a GameObject.

### Parameters

- `gameObject` (table): The GameObject to set the position for
- `x` (number): The x-coordinate
- `y` (number): The y-coordinate
- `z` (number): The z-coordinate

### Returns

None.

### Example

```lua
function MoveObjectUp(objectName)
    local obj = FindGameObject(objectName)
    
    if not obj then
        ShowNotification("Object not found: " .. objectName)
        return
    end
    
    local pos = GetPosition(obj)
    SetPosition(obj, pos.x, pos.y + 1.0, pos.z)
    ShowNotification("Moved " .. objectName .. " up by 1 unit")
}

RegisterCommand("moveup", "Moves an object up", "moveup [object name]", function(args)
    if #args < 2 then
        ShowNotification("Please specify an object name")
        return
    end
    
    MoveObjectUp(args[2])
end)
```

### Notes

- Not all GameObjects can have their position changed
- Setting position directly may not work for objects with physics components
- Use with caution as it can potentially cause game issues if misused

## Helper Functions

### Vector3

**Signature:** `table Vector3(number x, number y, number z)`

**Description:** Creates a Vector3 position object.

### Parameters

- `x` (number): The x-coordinate
- `y` (number): The y-coordinate
- `z` (number): The z-coordinate

### Returns

- `table`: A Vector3 object with x, y, z components

### Example

```lua
function CreateWaypoint(x, y, z)
    local position = Vector3(x, y, z)
    Log("Created waypoint at: " .. position.x .. ", " .. position.y .. ", " .. position.z)
    return position
}
```

### Notes

- Useful for creating position vectors
- Can be used with other position functions
- Represents a Unity Vector3 in Lua

### Vector3Distance

**Signature:** `number Vector3Distance(table positionA, table positionB)`

**Description:** Calculates the distance between two positions.

### Parameters

- `positionA` (table): The first position (vector with x, y, z coordinates)
- `positionB` (table): The second position (vector with x, y, z coordinates)

### Returns

- `number`: The distance in game units

### Example

```lua
function MeasureDistance(objectNameA, objectNameB)
    local objA = FindGameObject(objectNameA)
    local objB = FindGameObject(objectNameB)
    
    if not objA then
        ShowNotification("Object not found: " .. objectNameA)
        return
    end
    
    if not objB then
        ShowNotification("Object not found: " .. objectNameB)
        return
    end
    
    local posA = GetPosition(objA)
    local posB = GetPosition(objB)
    local distance = Vector3Distance(posA, posB)
    
    ShowNotification("Distance between " .. objectNameA .. " and " .. 
        objectNameB .. ": " .. string.format("%.2f", distance) .. " units")
}

RegisterCommand("distance", "Measures distance between objects", 
    "distance [object1] [object2]", function(args)
    if #args < 3 then
        ShowNotification("Please specify two object names")
        return
    end
    
    MeasureDistance(args[2], args[3])
end)
```

### Notes

- Distance is calculated in 3D space (Euclidean distance)
- This function works with any Vector3 objects
- The distance is in game units (approximately 1 unit = 1 meter)

## Best Practices

### For Finding GameObjects

1. **Cache references** - If you'll use the same GameObject multiple times, save the reference
2. **Check for null results** - Always verify FindGameObject returned a valid object before using it
3. **Handle errors** - Provide user feedback when objects can't be found

### For Performance

1. **Don't search every frame** - For repeated checks, search only when needed
2. **Avoid manipulating critical game objects** - Focus on modding non-essential objects
3. **Use safe manipulation** - Check if operations succeed to avoid game crashes

### Example: Object Inspector Tool

```lua
-- Simple tool for inspecting game objects
function InspectObject(objectName)
    local obj = FindGameObject(objectName)
    
    if not obj then
        ShowNotification("Object not found: " .. objectName)
        return
    end
    
    -- Get position
    local pos = GetPosition(obj)
    
    -- Format the output message
    local info = "Object: " .. objectName .. "\n"
    info = info .. "Position: " .. string.format("%.2f, %.2f, %.2f", pos.x, pos.y, pos.z) .. "\n"
    
    -- Show information in a dialog
    ShowDialogue("Object Inspector", info)
}

-- Register a command to inspect objects
RegisterCommand("inspect", "Inspects a game object", "inspect [object name]", function(args)
    if #args < 2 then
        ShowNotification("Please specify an object name")
        return
    end
    
    InspectObject(args[2])
end)
``` 
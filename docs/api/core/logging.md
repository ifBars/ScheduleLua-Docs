# Logging API

The Logging API provides functions for outputting information, warnings, and errors to the game console. These functions are essential for debugging and providing feedback in your scripts.

## Log

**Signature:** `void Log(string message)`

**Description:** Outputs a standard informational message to the console.

### Parameters

- `message` (string): The message to log

### Returns

None.

### Example

```lua
Log("Player entered the town area!")
```

### Notes

- Use for general information and debugging
- Messages appear in white text in the console

## LogWarning

**Signature:** `void LogWarning(string message)`

**Description:** Outputs a warning message to the console.

### Parameters

- `message` (string): The warning message to log

### Returns

None.

### Example

```lua
LogWarning("Player health is below 20%!")
```

### Notes

- Use for potential issues that don't prevent script execution
- Messages appear in yellow text in the console
- Use sparingly to avoid console clutter

## LogError

**Signature:** `void LogError(string message)`

**Description:** Outputs an error message to the console.

### Parameters

- `message` (string): The error message to log

### Returns

None.

### Example

```lua
LogError("Failed to find NPC: " .. npcName)
```

### Notes

- Use for errors that might affect script functionality
- Messages appear in red text in the console
- Does not stop script execution - use error handling for that

## Best Practices

- Use the appropriate log level for different types of messages
- Include relevant context in log messages
- For variables, convert to strings or use concatenation
- Avoid excessive logging, especially in the `Update()` function
- Use logging during development and debug builds, but consider reducing it in release scripts

## Related Functions

- No directly related functions, but logging is commonly used with all other API functions for debugging 
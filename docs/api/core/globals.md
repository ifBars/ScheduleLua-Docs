# Global Variables

The ScheduleLua API provides several global variables that can be accessed from any Lua script. These variables provide useful information about the game, mod, and runtime environment.

## SCHEDULELUA_VERSION

**Type:** `string`

**Description:** Contains the current version of the ScheduleLua mod.

### Example

```lua
function Initialize()
    Log("Running with ScheduleLua version: " .. SCHEDULELUA_VERSION)
    return true
end
```

### Notes

- Useful for version checking in scripts that might depend on specific ScheduleLua features
- Can be used to provide conditional behavior based on the mod version
- Format follows semantic versioning (e.g., "0.1.0", "0.1.1")

## Best Practices

- Use version checking at the beginning of your scripts to ensure compatibility
- Include version information in error logs to help with troubleshooting
- When reporting issues, include the ScheduleLua version from this variable

## Related Components

- [Logging API](./logging.md) - Use with logging functions to include version information in debug messages 
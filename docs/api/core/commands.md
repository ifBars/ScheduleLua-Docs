# Command API

The Command API allows you to register and manage custom console commands that players can use to interact with your script. These commands are accessible through the in-game console (toggled with the tilde `~` key).

## RegisterCommand

**Signature:** `void RegisterCommand(string name, string description, string usage, function callback)`

**Description:** Registers a new console command with the specified name, description, usage pattern, and callback function.

### Parameters

- `name` (string): The name of the command (what the player will type to execute it)
- `description` (string): A brief description of what the command does
- `usage` (string): Usage information showing the command syntax
- `callback` (function): A Lua function that will be called when the command is executed

### Returns

None.

### Example

```lua
function OnConsoleReady()
    RegisterCommand(
        "heal", 
        "Heals the player to full health", 
        "heal", 
        function(args)
            SetPlayerHealth(100)
            Log("Player healed to full health")
        end
    )

    RegisterCommand(
        "pos",
        "Shows player position",
        "pos",
        function(args)
            local pos = GetPlayerPosition()
            Log("Position: " .. pos.x .. ", " .. pos.y .. ", " .. pos.z)
        end
    )
    
    RegisterCommand(
        "lua_teleport", 
        "Teleports player to specified coordinates", 
        "lua_teleport <x> <y> <z>", 
        function(args)
            -- Command name is already removed from args, so actual arguments start at index 1
            if #args < 3 then
                LogError("Not enough arguments. Usage: lua_teleport <x> <y> <z>")
                return
            end
            
            local x = tonumber(args[1])
            local y = tonumber(args[2])
            local z = tonumber(args[3])
            
            if not x or not y or not z then
                LogError("Invalid coordinates. All values must be numbers.")
                return
            end
            
            SetPlayerPosition(x, y, z)
            Log("Teleported to: " .. x .. ", " .. y .. ", " .. z)
        end
    )
end
```

### Notes

- Commands should be registered in the `OnConsoleReady()` lifecycle hook
- Command names should be lowercase and should not contain spaces
- Each command must have a unique name
- The callback function receives a table of arguments, with the first argument at `args[1]` (the command name is not included in args)

## UnregisterCommand

**Signature:** `void UnregisterCommand(string name)`

**Description:** Removes a previously registered command.

### Parameters

- `name` (string): The name of the command to unregister

### Returns

None.

### Example

```lua
-- In your Shutdown() function
function Shutdown()
    UnregisterCommand("heal")
    UnregisterCommand("teleport")
    Log("Commands unregistered")
end
```

### Notes

- Always unregister your commands in the `Shutdown()` function to clean up properly
- If you try to unregister a command that doesn't exist, nothing will happen

## Handling Command Arguments

The arguments passed to your command callback function are provided as a table:

```lua
RegisterCommand(
    "give", 
    "Gives specified item to player", 
    "give <item> [amount]", 
    function(args)
        -- args[1] = item name (required)
        -- args[2] = amount (optional)
        
        local itemName = args[1]
        if not itemName then
            LogError("Missing item name. Usage: give <item> [amount]")
            return
        end
        
        local amount = 1 -- Default amount
        if args[2] then
            amount = tonumber(args[2])
            if not amount or amount < 1 then
                LogError("Invalid amount. Must be a positive number.")
                return
            end
        end
        
        local success = AddItemToInventory(itemName, amount)
        if success then
            Log("Added " .. amount .. "x " .. itemName .. " to inventory")
        else
            LogError("Failed to add item to inventory")
        end
    end
)
```

## Command Organization

For scripts with many commands, it's recommended to organize them by category:

```lua
function OnConsoleReady()
    -- Player commands
    RegisterPlayerCommands()
    
    -- World manipulation commands
    RegisterWorldCommands()
    
    -- Utility commands
    RegisterUtilityCommands()
end

function RegisterPlayerCommands()
    RegisterCommand("heal", "Heals the player", "heal", CommandHeal)
    RegisterCommand("energy", "Restores player energy", "energy", CommandEnergy)
    -- More player commands...
end

function RegisterWorldCommands()
    RegisterCommand("time", "Sets game time", "time <hour>", CommandTime)
    RegisterCommand("weather", "Changes weather", "weather <type>", CommandWeather)
    -- More world commands...
end

function RegisterUtilityCommands()
    RegisterCommand("help", "Shows all commands", "help", CommandHelp)
    RegisterCommand("version", "Shows script version", "version", CommandVersion)
    -- More utility commands...
end
```

## Building a Help System

You can create a help command that lists all available commands:

```lua
-- Store command info for help system
local commandInfo = {}

function RegisterCommandWithHelp(name, description, usage, callback)
    RegisterCommand(name, description, usage, callback)
    commandInfo[name] = {
        description = description,
        usage = usage
    }
end

function CommandHelp(args)
    if args[1] then
        -- Show help for specific command
        local cmdName = args[1]
        local info = commandInfo[cmdName]
        
        if info then
            Log("Command: " .. cmdName)
            Log("Description: " .. info.description)
            Log("Usage: " .. info.usage)
        else
            LogError("Unknown command: " .. cmdName)
        end
    else
        -- Show all commands
        Log("Available commands:")
        
        local sortedNames = {}
        for name, _ in pairs(commandInfo) do
            table.insert(sortedNames, name)
        end
        table.sort(sortedNames)
        
        for _, name in ipairs(sortedNames) do
            Log("  " .. name .. " - " .. commandInfo[name].description)
        end
        
        Log("Type 'help <command>' for more information on a specific command")
    end
end

-- Register the help command itself
function OnConsoleReady()
    RegisterCommandWithHelp(
        "help",
        "Shows available commands or info about a specific command",
        "help [command]",
        CommandHelp
    )
    
    -- Register other commands...
end
```

## Best Practices

1. **Clear Descriptions**: Provide clear, concise descriptions for your commands
2. **Proper Usage Info**: Include all required and optional parameters in the usage string, using `<required>` and `[optional]` notation
3. **Input Validation**: Always validate command arguments before using them
4. **Error Handling**: Provide helpful error messages when commands fail
5. **Command Categories**: Organize related commands together
6. **Cleanup**: Unregister all commands in the `Shutdown()` function
7. **Prefixing**: For large scripts or mod packs, prefix your commands to avoid conflicts (e.g., `mymod_heal` instead of just `heal`)

## Related Functions

- `Log()` - Used to output command results to the console
- `LogError()` - Used to output error messages from commands
- All game API functions that your commands might call to perform actions 
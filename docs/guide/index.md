# Introduction to ScheduleLua

ScheduleLua is a MelonLoader mod for Schedule 1 that allows you to write custom Lua scripts to extend and modify game functionality. This guide will help you understand the basics of ScheduleLua and get started with writing your own scripts.

## What is ScheduleLua?

ScheduleLua is a modding framework that bridges the gap between the Schedule 1 game and Lua scripts. It exposes game functionality to Lua, allowing you to:

- Modify player attributes and inventory
- Interact with NPCs in the game world
- Create custom UI elements and notifications
- Hook into game events and time changes
- Create custom console commands
- Store and retrieve persistent data
- Interact with the game's economy and law systems

## How ScheduleLua Works

ScheduleLua uses MelonLoader to hook into Schedule 1 at runtime. When the game starts, ScheduleLua:

1. Loads all Lua scripts from the designated scripts folder
2. Initializes a Lua environment for each script
3. Exposes game functions to each Lua environment
4. Calls initialization functions in each script
5. Provides ongoing updates and event callbacks to scripts

Your scripts run concurrently with the game, allowing you to respond to game events and modify game behavior in real-time.

## Lua Basics

If you're new to Lua, here's a quick overview of the syntax:

```lua
-- This is a comment

-- Variables
local name = "Player"
local health = 100
local isActive = true

-- Functions
function SayHello(name)
    return "Hello, " .. name
end

-- Conditionals
if health > 50 then
    print("Player is healthy")
elseif health > 20 then
    print("Player is wounded")
else
    print("Player is critical")
end

-- Loops
for i = 1, 10 do
    print(i)
end

-- Tables (Lua's main data structure)
local player = {
    name = "Player1",
    health = 100,
    inventory = {"Sword", "Potion", "Gold"}
}

-- Accessing table properties
print(player.name)
print(player.inventory[1])
```

For a more comprehensive Lua tutorial, check out the [official Lua documentation](https://www.lua.org/manual/5.3/).

## Next Steps

- [Installation Guide](./installation.md) - Learn how to install ScheduleLua
- [Getting Started](./getting-started.md) - Write your first ScheduleLua script
- [Script Structure](./script-structure.md) - Understand the structure of ScheduleLua scripts
- [Lifecycle Hooks](./lifecycle-hooks.md) - Learn about the various script lifecycle events
- [API Reference](/api/) - Explore the full ScheduleLua API
- [Examples](/examples/) - See example scripts in action 
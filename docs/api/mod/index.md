# Mod System API

The Mod System API allows you to work with mods in ScheduleLua, including managing dependencies, and exporting/importing functionality between mods.

## Mod Management Functions

### GetMod

**Signature:** `table GetMod(string modName)`

**Description:** Gets information about a loaded mod by its folder name.

#### Parameters

- `modName` (string): The folder name of the mod to get information about

#### Returns

A table containing information about the mod, or nil if the mod is not loaded. The table has the following structure:

```lua
{
  name = "My Mod",          -- Display name from manifest
  folder = "my_mod",        -- Folder name
  version = "1.0.0",        -- Version from manifest
  description = "...",      -- Description from manifest
  author = "Your Name",     -- Author from manifest
  dependencies = {...},     -- Table of dependency folder names
  api_version = "0.1.2"     -- API version from manifest
}
```

#### Example

```lua
local mod = GetMod("economy_mod")
if mod then
    Log("Mod name: " .. mod.name)
    Log("Mod version: " .. mod.version)
    Log("Mod author: " .. mod.author)
end
```

### GetAllMods

**Signature:** `table GetAllMods()`

**Description:** Gets information about all loaded mods.

#### Returns

An array of mod information tables, each with the same structure as returned by `GetMod()`.

#### Example

```lua
local mods = GetAllMods()
Log("Loaded mods: " .. #mods)
for _, mod in ipairs(mods) do
    Log("- " .. mod.name .. " v" .. mod.version .. " by " .. mod.author)
end
```

### IsModLoaded

**Signature:** `boolean IsModLoaded(string modName)`

**Description:** Checks if a mod is loaded by its folder name.

#### Parameters

- `modName` (string): The folder name of the mod to check

#### Returns

`true` if the mod is loaded, `false` otherwise.

#### Example

```lua
if IsModLoaded("required_mod") then
    Log("Required mod is loaded!")
else
    LogError("Required mod is not loaded!")
end
```

## Function Import/Export

### ExportFunction

**Signature:** `void ExportFunction(string name, function func)`

**Description:** Exports a function from the current mod, making it available for other mods to import.

#### Parameters

- `name` (string): The name to export the function as
- `func` (function): The function to export

#### Example

```lua
ExportFunction("CalculateTax", function(amount, rate)
    rate = rate or 0.15
    return amount * rate
end)
```

### ImportFunction

**Signature:** `function ImportFunction(string modName, string functionName)`

**Description:** Imports a function exported by another mod.

#### Parameters

- `modName` (string): The folder name of the mod that exports the function
- `functionName` (string): The name of the exported function to import

#### Returns

The exported function, or nil if the mod is not loaded or the function is not exported.

#### Example

```lua
local CalculateTax = ImportFunction("economy_mod", "CalculateTax")
if CalculateTax then
    local tax = CalculateTax(1000)
    Log("Tax amount: " .. tax)
end
```

### GetModExport

**Signature:** `any GetModExport(string modName, string exportName)`

**Description:** Gets an exported value (function or other value) from a mod.

#### Parameters

- `modName` (string): The folder name of the mod that exports the value
- `exportName` (string): The name of the exported value to get

#### Returns

The exported value, or nil if the mod is not loaded or the value is not exported.

#### Example

```lua
local TAX_RATE = GetModExport("economy_mod", "TAX_RATE")
if TAX_RATE then
    Log("Current tax rate: " .. TAX_RATE)
end
```

## Best Practices

1. Always check if required mods are loaded before trying to use them:

```lua
if not IsModLoaded("required_mod") then
    LogError("This mod requires 'required_mod' to be installed")
    return
end
```

2. Check if imported functions exist before using them:

```lua
local func = ImportFunction("mod", "func")
if func then
    func()
else
    LogError("Failed to import function 'func' from 'mod'")
end
```

3. Use namespaces for your mod's global data to avoid conflicts:

```lua
MY_MOD = {
    version = "1.0.0",
    settings = {}
}
```

4. Document your exported functions for other mod authors: 
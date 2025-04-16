# Mod Imports and Exports

One of the key features of the ScheduleLua Mod System is the ability for mods to export and import functionality, allowing for better modularity and code reuse between different mods.

## Exporting Functions

You can export functions from your mod to make them available to other mods that depend on yours:

```lua
-- Export a function from your mod
ExportFunction("calculateTaxes", function(amount)
    return amount * 0.15
end)
```

You can also define your functions separately and then export them, which is often cleaner for more complex functions:

```lua
-- Define the function separately
function TaxesModule.calculateTaxes(amount, rate)
    rate = rate or 0.15
    local tax = amount * rate
    if amount > 1000 then
        tax = tax + 50
    end
    return tax
end

-- Then export the pre-defined function
ExportFunction("calculateTaxes", TaxesModule.calculateTaxes)
```

Exported functions become part of your mod's public API that other mods can access.

## Importing Functions

To use functions exported by other mods, you can import them using the `ImportFunction` function:

```lua
-- Import a function from another mod
local calculateTaxes = ImportFunction("tax_mod", "calculateTaxes")
if calculateTaxes then
    local tax = calculateTaxes(1000)
    Log("Tax amount: " .. tax)
end
```

It's good practice to check if the imported function exists before using it, as shown in the example above.

## Available Mod Functions

The mod system provides several functions to interact with mods:

- `GetMod(modName)`: Get a mod object by folder name
  ```lua
  local mod = GetMod("economy_mod")
  if mod then
      Log("Mod version: " .. mod.version)
  end
  ```

- `GetAllMods()`: Get information about all loaded mods
  ```lua
  local mods = GetAllMods()
  for _, mod in ipairs(mods) do
      Log("Loaded mod: " .. mod.name .. " v" .. mod.version)
  end
  ```

- `IsModLoaded(modName)`: Check if a mod is loaded
  ```lua
  if IsModLoaded("required_mod") then
      -- Safe to use functionality from required_mod
  else
      LogError("Required mod is not loaded!")
  end
  ```

- `GetModExport(modName, exportName)`: Get an exported value from a mod
  ```lua
  local taxRate = GetModExport("economy_mod", "TAX_RATE")
  if taxRate then
      Log("Current tax rate: " .. taxRate)
  end
  ```

- `ExportFunction(name, function)`: Export a function from the current mod
  ```lua
  ExportFunction("calculateProfit", function(revenue, expenses)
      return revenue - expenses
  end)
  ```

- `ImportFunction(modName, functionName)`: Import a function from another mod
  ```lua
  local calculateProfit = ImportFunction("economy_mod", "calculateProfit")
  ```

## Best Practices for Mod Interoperability

1. **Document your exports**: Make sure to document what functions and values your mod exports, their parameters, and return values.

2. **Handle missing dependencies gracefully**: Always check if a mod is loaded before trying to import functions from it:

   ```lua
   if not IsModLoaded("required_mod") then
       LogError("This mod requires 'required_mod' to be installed")
       return
   end
   ```

3. **Create a public API**: Consider creating a dedicated module that exports all public functions:

   ```lua
   -- In api.lua
   local API = {}
   
   function API.calculateTaxes(amount)
       return amount * 0.15
   end
   
   function API.calculateProfit(revenue, expenses)
       return revenue - expenses
   end
   
   -- Export all API functions in a for loop
   for name, func in pairs(API) do
       ExportFunction(name, func)
   end
   ```
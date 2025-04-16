# ScheduleLua Mod System

The ScheduleLua Mod System allows you to create modular Lua mods with dependencies, versions, and exported functionality. This system is designed to help organize your code and enable better interoperability between different mods.

## Folder Structure

The mod system uses the existing scripts directory. Your mods should be placed in the ScheduleLua/Scripts directory, with each mod in its own folder:

```
Mods/
  ScheduleLua/
    Scripts/
      single_script.lua        # Still supported but might be deprecated in favor of mod system
      my_mod/                  # Mod folder
        manifest.json          # Required: Mod metadata
        init.lua               # Required: Main entry point
        utils.lua              # Optional: Additional scripts
        features/              # Optional: Subdirectories for organization
          feature1.lua
          feature2.lua
```

## Manifest File

Each mod must have a `manifest.json` file in its root folder with the following structure:

```json
{
  "name": "My Mod",                        // Display name
  "version": "1.0.0",                      // Semantic version
  "description": "Description of the mod", // Short description
  "author": "Your Name",                   // Author name
  "main": "init.lua",                      // Main script (default: init.lua)
  "files": [                               // Additional scripts to load
    "utils.lua",
    "features/feature1.lua",
    "features/feature2.lua"
  ],
  "dependencies": [                        // Other mods this mod depends on
    "other_mod"
  ],
  "api_version": "0.1.2"                   // ScheduleLua API version
}
```

## Creating a Mod

To create a mod:

1. Create a folder in the `Mods/ScheduleLua/Scripts` directory.
2. Create a `manifest.json` file with your mod's metadata.
3. Create an `init.lua` file as the main entry point.
4. Add any additional script files and list them in the manifest.
5. Optionally create subdirectories for organization.

Example structure:

```
farming_mod/
  manifest.json
  init.lua
  utils.lua
  crops/
    wheat.lua
    cotton.lua
```

## Using Mods

When your mod is loaded, two special variables are set in the Lua environment:

- `MOD_NAME`: The folder name of your mod
- `MOD_PATH`: The full path to your mod folder

These can be used to reference files within your mod:

```lua
local imagePath = MOD_PATH .. "/images/icon.png"
```

## Mod Lifecycle

Mods are loaded in this order:

1. Dependencies are loaded before the mods that depend on them
2. The `init.lua` file is loaded first, then additional files listed in the manifest
3. The `Initialize()` function is called if it exists
4. The `Update()` function is called every frame if it exists

## Best Practices

1. **Use namespaces**: Store your mod's data in a global table with a unique name to avoid conflicts:

```lua
MY_MOD = {
    version = "1.0.0",
    settings = {}
}
```

2. **Check for dependencies**:

```lua
if not IsModLoaded("required_mod") then
    LogError("This mod requires 'required_mod' to be installed")
    return
end
```

3. **Organize your code** by splitting it into multiple files by functionality.

4. **Document your exports** so other mod authors know what functions are available. 
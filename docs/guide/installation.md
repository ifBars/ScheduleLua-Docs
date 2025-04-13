# Installation Guide

This guide will walk you through the process of installing the ScheduleLua beta for Schedule 1.

<div class="custom-block warning">
  <p><strong>Beta Software Notice:</strong> ScheduleLua is currently in active development. Expect bugs, incomplete features, and potential changes to the API between versions.</p>
</div>

## Prerequisites

Before installing ScheduleLua, you'll need:

1. [Schedule 1](https://store.steampowered.com/app/3164500/Schedule_I/) (Steam version)
2. [MelonLoader](https://melonwiki.xyz/) version 0.5.7 or newer
3. Basic familiarity with file management
4. Backup of your save files (recommended for beta testing)

## Step 1: Install MelonLoader

If you haven't already installed MelonLoader, follow these steps:

1. Download the latest MelonLoader installer from the [official GitHub releases page](https://github.com/LavaGang/MelonLoader/releases)
2. Run the installer executable
3. When prompted, select your Schedule 1 executable file (typically located at `C:\Program Files (x86)\Steam\steamapps\common\Schedule I\Schedule I.exe`)
4. Click "INSTALL" and wait for the installation to complete
5. Verify that the installation was successful by checking for a `MelonLoader` folder in your Schedule 1 game directory

## Step 2: Install ScheduleLua Beta

1. Download the latest ScheduleLua beta release from [GitHub](https://github.com/ifBars/ScheduleLua/releases) (ZIP file)
2. Extract the contents of the ZIP file
3. Copy the following files to your Schedule 1 game directory:
   - `ScheduleLua.dll` → `Schedule 1/Mods/`
   - `moonsharp.dll` → `Schedule 1/UserLibs/`

Your directory structure should look like this:

```
Schedule 1/
├── Mods/
│   ├── ScheduleLua.dll
│   └── ... (other mod DLLs)
├── UserLibs/
│   ├── moonsharp.dll
│   └── ... (other library DLLs)
└── ... (other game files)
```

## Step 3: Create Script Directory

1. Run Schedule 1 with ScheduleLua installed, and ScheduleLua will create your `Scripts` folder in `UserData/ScheduleLua/Scripts/`

## Step 4: Install Example Scripts (Optional)

1. Copy the example Lua scripts from the ScheduleLua GitHub to your `Scripts` folder
2. The beta includes working examples that demonstrate currently available features:
   - `example.lua` - Uses stable core functionality
   - `ui_example.lua` - Demonstrates notifications (note: advanced UI is experimental)
   - `registry_example.lua` - Shows how to use the time system

## Step 5: Verify Installation

1. Launch Schedule 1
2. Wait for the game to load
3. Look for messages indicating that ScheduleLua has loaded successfully inside MelonLoader console:

```
[ScheduleLua] Beta v0.1.0 loaded
[ScheduleLua] Initializing Lua environment
[ScheduleLua] Loading scripts from Scripts directory
[ScheduleLua] Loaded X scripts successfully
```

If you see these messages, congratulations! The ScheduleLua beta is installed and working correctly.

## Beta-Specific Troubleshooting

### Known Beta Issues

- **UI Windows**: If UI windows don't appear correctly, restart the game
- **Script Errors**: Some API functions mentioned in documentation may not be fully implemented
- **Performance**: Heavy script usage may cause performance issues in the current beta
- **Errors on Load**: If you see red error text at startup, check that you're using a compatible script

### Beta Error Reporting

If you encounter issues with the beta:

1. Check the [Known Issues](https://github.com/ifBars/ScheduleLua/issues?q=is%3Aissue+is%3Aopen+label%3A%22known+issue%22) on GitHub
2. If your issue isn't listed, report it with:
   - Clear description of the problem
   - Steps to reproduce
   - Log files from `Schedule 1/MelonLoader/Latest.log`
   - Your script code (if applicable)

### Using the Safe Mode

If you're experiencing crashes:

1. Hold Shift when launching Schedule 1 to enter MelonLoader's Safe Mode
2. This will temporarily disable mods, allowing you to safely remove problematic scripts

## Common Issues

### MelonLoader Not Loading

If MelonLoader isn't loading properly:
- Verify that you're using a compatible version of MelonLoader (0.5.7+)
- Reinstall MelonLoader using the official installer
- Check the game's launch options in Steam and remove any conflicting parameters

### ScheduleLua Not Loading

If ScheduleLua isn't loading:
- Verify that `ScheduleLua.dll` is in the correct location (`Schedule 1/Mods/`)
- Check that `moonsharp.dll` is in the correct location (`Schedule 1/UserLibs/`)
- Look for error messages in the MelonLoader console logs

### Scripts Not Loading

If your scripts aren't loading:
- Ensure they're in the correct directory (`Schedule 1/Scripts/`)
- Check script syntax for errors (the console will typically show Lua errors)
- Verify file permissions (scripts should be readable)
- Try the included example scripts to verify basic functionality

## Getting Help

If you encounter issues not covered in this guide:
- Check the [GitHub repository issues](https://github.com/ifBars/ScheduleLua/issues/new) for similar problems
- Join the [Schedule 1 Modding Discord](https://discord.gg/rV2QSAnqhX)
- Create a detailed bug report on [GitHub]() with logs and system information

## Next Steps

Now that you have the ScheduleLua beta installed:

1. Try out the included example scripts to learn how the API works
2. Read the [Development Status](/guide/development-status) page to understand what's currently implemented
3. Follow the [Getting Started guide](./getting-started.md) to learn the basics of writing your own scripts
4. Join the community to stay updated on beta developments and contribute feedback

Happy testing! 
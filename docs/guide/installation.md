# Installation Guide

This guide will walk you through the process of installing the ScheduleLua beta for Schedule 1.

<div class="custom-block warning">
  <p><strong>Beta Software Notice:</strong> ScheduleLua is currently in active development. Expect bugs, incomplete features, and potential changes to the API between versions.</p>
</div>

## Prerequisites

Before installing ScheduleLua, you'll need:

1. [Schedule 1](https://store.steampowered.com/app/3164500/Schedule_I/) (Steam)
2. The game must be running on the **Mono backend** version, which is available on the "alternate" or "alternate-beta" Steam branches
   - In Steam, right-click on Schedule 1 → Properties → Betas → Select "alternate" or "alternate-beta"
   - ScheduleLua is NOT compatible with the main branch or "beta" branch, which use IL2CPP
3. [MelonLoader](https://melonwiki.xyz/) version 0.7.0 or newer
4. Basic familiarity with file management
5. Backup of your save files (recommended for beta testing)

## Step 1: Install MelonLoader

If you haven't already installed MelonLoader, follow these steps:

1. Download the latest MelonLoader installer from the [official GitHub releases page](https://github.com/LavaGang/MelonLoader/releases)
2. Run the installer executable
3. When prompted, select your Schedule 1 executable file (typically located at `C:\Program Files (x86)\Steam\steamapps\common\Schedule I\Schedule I.exe`)
4. Click "INSTALL" and wait for the installation to complete
5. Verify that the installation was successful by checking for a `MelonLoader` folder in your Schedule 1 game directory

## Step 2: Install ScheduleLua Beta

1. Download the latest ScheduleLua beta release from [Thunderstore](https://github.com/) (ZIP file)
2. Drag the `Mods` and `UserLibs` folders into your `Schedule 1` game directory
Your directory structure should look like this:

```
Schedule 1/
├── Mods/
│   ├── ScheduleLua
│   ├── ScheduleLua.dll
│   └── ... (other mod DLLs)
├── UserLibs/
│   ├── MoonSharp.Interpreter.dll
│   └── ... (other library DLLs)
└── ... (other game files)
```

## Step 3: Install Example Scripts (Optional)

1. Copy the example Lua scripts from the ScheduleLua GitHub to your `Scripts` folder
2. The beta includes working examples that demonstrate currently available features:
   - `example.lua` - Uses stable core functionality
   - `ui_example.lua` - Demonstrates notifications (note: advanced UI is experimental)
   - See `Resources` directory in the `ScheduleLua` repository for more info

## Step 4: Verify Installation

1. Launch Schedule 1
2. Wait for the game to load
3. Look for messages indicating that ScheduleLua has loaded successfully inside MelonLoader console:

```
[ScheduleLua] Initializing ScheduleLua...
[ScheduleLua] Initializing Lua engine...
[ScheduleLua] Initializing GUI system...
[ScheduleLua] Lua GUI system initialized
[ScheduleLua] Loading scripts from Scripts directory
[ScheduleLua] Loaded X scripts successfully
```

If you see these messages, congratulations! The ScheduleLua beta is installed and working correctly.

## Troubleshooting

### Known Beta Issues

- **UI Windows**: If UI windows don't appear correctly, restart the game
- **Script Errors**: Some API functions mentioned in documentation may not be fully implemented
- **Performance**: Heavy script usage may cause performance issues in the current beta

### Beta Error Reporting

If you encounter issues with the beta:

1. Check the [Known Issues](https://github.com/ScheduleLua/ScheduleLua-Framework/issues) on GitHub
2. If your issue isn't listed, report it with:
   - Clear description of the problem
   - Steps to reproduce
   - Log files from `Schedule 1/MelonLoader/Latest.log`
   - Your script code (if applicable)

## Common Issues

### MelonLoader Not Loading

If MelonLoader isn't loading properly:
- Verify that you're using a compatible version of MelonLoader (0.7.0 Open Beta)
- Reinstall MelonLoader using the official installer
- Check the game's launch options in Steam and remove any conflicting parameters

### ScheduleLua Not Loading

If ScheduleLua isn't loading:
- Verify that you're using the correct Steam branch ("alternate" or "alternate-beta") as ScheduleLua only works with the Mono version of the game
- Verify that `ScheduleLua.dll` is in the correct location (`Schedule 1/Mods/`)
- Check that `moonsharp.dll` is in the correct location (`Schedule 1/UserLibs/`)
- Look for error messages in the MelonLoader console logs

### Scripts Not Loading

If your scripts aren't loading:
- Ensure they're in the correct directory (`Schedule 1/Scripts/`)
- Check script syntax for errors (the MelonLoader console will typically show Lua errors)
- Try the included example scripts to verify basic functionality

## Getting Help

If you encounter issues not covered in this guide:
- Check the [GitHub repository issues](https://github.com/ScheduleLua/ScheduleLua-Framework/issues) for similar problems
- Join the [ScheduleLua Discord](https://discord.gg/Ab8snpEFDn)
- Create a detailed bug report on [GitHub]() with logs and system information

## Next Steps

Now that you have the ScheduleLua beta installed:

1. Try out the included example scripts to learn how the API works
2. Read the [Development Status](/guide/development-status) page to understand what's currently implemented
3. Follow the [Getting Started guide](./getting-started.md) to learn the basics of writing your own scripts
4. Join the community to stay updated on beta developments and contribute feedback

Happy testing! 
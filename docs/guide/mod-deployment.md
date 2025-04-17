# Mod Deployment Guide

This guide will walk you through the process of packaging and distributing your ScheduleLua mods so that other players can easily install them.

## Preparing Your Mod for Distribution

Before distributing your mod, ensure:

1. Your mod has been thoroughly tested
2. You have a complete `manifest.json` file with correct information
3. All required files are included and listed in the manifest
4. Your mod follows the [best practices](/guide/best-practices) for compatibility

## Folder Structure for Distribution

To make installation easy for users, structure your ZIP file to match the game's folder structure:

```
YourMod.zip/
├── Mods/
│   └── ScheduleLua/
│       └── Scripts/
│           └── your_mod_folder/
│               ├── manifest.json
│               ├── init.lua
│               └── [other mod files]
```

This structure allows users to simply extract the ZIP into their Schedule 1 game directory, and all files will be placed in the correct locations.

## Creating the Distribution ZIP

Follow these steps to create a properly structured ZIP file:

1. Create a temporary folder for packaging, wherever you desire, like your Desktop (e.g., `package_temp`)
2. Inside it, recreate the folder structure: `Mods/ScheduleLua/Scripts/`
3. Copy your mod folder into the `Scripts` directory
4. Compress the `Mods` folder into a ZIP file
5. Name your ZIP file descriptively (e.g., `YourModName_v1.0.0.zip`)

## Installation Instructions for Users

Include these instructions in your mod's README or description and replace your_mod_folder:

1. Install ScheduleLua
2. Download the mod ZIP file
3. Extract the ZIP file directly into your Schedule 1 game directory
   - Typically: `C:\Program Files (x86)\Steam\steamapps\common\Schedule I\`
4. The ZIP already contains the correct folder structure, so files will be placed in:
   - `[Game Directory]/Mods/ScheduleLua/Scripts/your_mod_folder/`
5. Launch the game and verify the mod is loaded in the console

## Distribution Platforms

Consider these platforms for sharing your mods:

1. [GitHub](https://github.com/) - Create a repository for your mod
2. [Thunderstore](https://thunderstore.io/) - Game modding platform
3. [ScheduleLua Discord](https://discord.gg/Ab8snpEFDn) - Share with the community

## Versioning Your Mods

Use semantic versioning for your mods:

- **Major version** (X.0.0): Breaking changes
- **Minor version** (0.X.0): New features, backwards-compatible
- **Patch version** (0.0.X): Bug fixes, backwards-compatible

Update the version in your `manifest.json` file with each release.

## Documentation

Include documentation with your mod:

1. **README.md** - Overview, installation, and basic usage
2. **CHANGELOG.md** - Version history and changes
3. In-game documentation or wiki for complex mods

## Best Practices for Deployment

1. **Test on a clean installation** before distributing
2. **Include dependencies** or clearly document them
3. **Use relative paths** within your scripts
4. **Version check** to detect incompatible game or API versions
5. **Create a backup** system for user data

## Example README Template

```markdown
# Your Mod Name

Brief description of what your mod does.

## Installation

1. Download the mod ZIP file
2. Extract the ZIP file directly into your Schedule 1 game directory
3. Launch the game

## Features

* Feature 1
* Feature 2
* Feature 3

## Dependencies

* ScheduleLua v0.1.2 or higher
* [Other Mod] v1.0.0 or higher (if applicable)

## Usage

Instructions on how to use the mod...

## License

MIT License (or your chosen license)
```

By following this deployment guide, you'll make it easy for users to install and enjoy your mods.

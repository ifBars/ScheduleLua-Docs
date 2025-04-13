# Reporting Issues with ScheduleLua

This guide explains how to effectively report issues with ScheduleLua to help the development team quickly understand, reproduce, and fix problems.

## Before Reporting an Issue

Before submitting a new issue, please:

1. **Check the known issues**: Review the [known_issues.md](https://github.com/ORIGINAL-OWNER/ScheduleLua/blob/main/ScheduleLua/known_issues.md) file to see if your problem is already documented
2. **Search existing issues**: Check if someone has already reported the same problem
3. **Update to the latest version**: Ensure you're using the most recent version of ScheduleLua
4. **Try simple troubleshooting**: Disable other mods, restart the game, or try a clean install

## Where to Report Issues

Issues can be reported through:

- GitHub Issues (preferred): [https://github.com/ORIGINAL-OWNER/ScheduleLua/issues](https://github.com/ORIGINAL-OWNER/ScheduleLua/issues)
- Discord: Join our community Discord and post in the #bug-reports channel
- Email: For security vulnerabilities only, contact us directly at [email@example.com](mailto:email@example.com)

## How to Write a Good Bug Report

A good bug report should include:

### 1. Clear and Descriptive Title

Provide a concise title that summarizes the issue.

**Good**: "Game crashes when using Registry API in OnSceneLoaded hook"  
**Bad**: "Game crashes" or "Help please"

### 2. Environment Information

Include details about your setup:

- ScheduleLua version
- Schedule I game version
- MelonLoader version
- Operating system
- Other mods installed (if any)
- Hardware specs (if relevant)

### 3. Steps to Reproduce

Provide detailed, step-by-step instructions to reproduce the issue:

```
1. Start a new game
2. Load the attached script
3. Enter the shop
4. Open the inventory menu
5. Click on an item
```

### 4. Expected vs. Actual Behavior

Clearly describe:
- What you expected to happen
- What actually happened

### 5. Error Messages and Logs

Include any error messages or stack traces. Attach the full logs from:

- MelonLoader console output
- `MelonLoader/Latest.log`
- Windows Event Viewer (if applicable)

### 6. Screenshots or Videos

If possible, include visual evidence of the issue, especially for UI problems or visual glitches.

### 7. Sample Code

For script-related issues, provide the simplest code example that reproduces the problem:

```lua
-- Minimal example demonstrating the issue
function OnSceneLoaded(sceneName)
    local item = GetItem("itemid")  -- This line causes a crash
    Log(item.name)
end
```

## Example Bug Report Template

```
Title: Game crashes when accessing Registry items during scene transition

Environment:
- ScheduleLua v1.2.3
- Schedule I v1.4.5
- MelonLoader v0.5.7
- Windows 10 64-bit
- No other mods installed

Steps to Reproduce:
1. Start a new game
2. Run the attached script
3. Travel from Home to Downtown
4. The game crashes during loading

Expected Behavior:
The script should wait until the Registry is ready before accessing items.

Actual Behavior:
Game crashes with NullReferenceException during scene loading.

Error Message:
NullReferenceException: Object reference not set to an instance of an object
at ScheduleLua.RegistryAPI.GetItem(String itemId) in RegistryAPI.cs:line 42
at UserScript.OnSceneLoaded(String sceneName) in script.lua:line 5

Sample Code:
```lua
function OnSceneLoaded(sceneName)
    -- This causes the crash because Registry isn't ready yet
    local item = GetItem("baggie")
    Log(item.name)
end
```

I've attached the full MelonLoader log and a screenshot of the crash.
```

## Bug Report Lifecycle

After submitting your issue:

1. **Triage**: The team will review and categorize the issue
2. **Reproduction**: We'll attempt to reproduce the issue
3. **Investigation**: The root cause will be investigated
4. **Resolution**: The issue will be fixed or marked for future work
5. **Feedback**: You may be asked for additional information

## Tips for Effective Bug Reporting

- **One issue per report**: File separate reports for unrelated issues
- **Be specific**: Provide exact details, not general descriptions
- **Be concise**: Include necessary information, but avoid lengthy explanations
- **Stay factual**: Describe what happened, not why you think it happened
- **Be responsive**: Reply to questions from developers if they need more information
- **Test fixes**: When a fix is released, confirm if it resolves your issue

## Security Vulnerabilities

For security vulnerabilities, please do not file a public issue. Instead:

1. Contact the development team directly via email
2. Provide a detailed description of the vulnerability
3. Wait for acknowledgment before disclosing publicly

## Feature Requests vs. Bug Reports

Remember that feature requests are different from bug reports:

- **Bug**: Something that doesn't work as designed or documented
- **Feature Request**: A suggestion for new or improved functionality

For feature requests, please use the feature request template instead.

## Thank You!

Thank you for helping improve ScheduleLua by reporting issues. Your detailed reports are essential for maintaining and improving the quality of the project. 
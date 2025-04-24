# Contributing to ScheduleLua

Thank you for your interest in contributing to ScheduleLua! This guide will help you understand how to contribute to the project effectively.

## Ways to Contribute

There are several ways you can contribute to ScheduleLua:

- **Code contributions**: Implement new features or fix bugs
- **Documentation**: Improve existing documentation or add new guides
- **Examples**: Create example scripts that demonstrate API usage
- **Bug reports**: Report issues you encounter
- **Feature requests**: Suggest new features or improvements
- **Community support**: Help other users in discussions and forums

## Setting Up Development Environment

### Prerequisites

- [Visual Studio](https://visualstudio.microsoft.com/downloads/)
- [MelonLoader](https://melonwiki.xyz/#/README)
- [MoonSharp Interpreter (.NET 3.5)](https://github.com/moonsharp-devs/moonsharp/releases) - Download the latest release and extract the .NET 3.5 DLL from `interpreter/net35/MoonSharp.Interpreter.dll`
- Basic knowledge of C# and Lua

### Getting the Source

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```
   git clone https://github.com/YOUR-USERNAME/ScheduleLua-Framework.git
   ```
3. Add the upstream repository as a remote:
   ```
   git remote add upstream https://github.com/ScheduleLua/ScheduleLua-Framework.git
   ```

### Building the Project

1. Open the solution file (`ScheduleLua.sln`) in Visual Studio
2. Add the MoonSharp .NET 3.5 DLL as an assembly reference to the project
   - Right-click on "References" in Solution Explorer
   - Select "Add Reference..."
   - Click "Browse" and locate the MoonSharp DLL you downloaded
   - Click "Add" and then "OK"
3. Build the solution
4. The compiled DLL will be copied to your Schedule 1 mods folder, and Visual Studio will start your Schedule 1 game

## Contribution Workflow

1. **Fork the repository**: Create your own fork of the ScheduleLua repository on GitHub
   - Click the "Fork" button at the top right of the [ScheduleLua repository](https://github.com/ScheduleLua/ScheduleLua-Framework)

2. **Clone your fork**: Download your fork to your local machine
   ```
   git clone https://github.com/YOUR-USERNAME/ScheduleLua-Framework.git
   cd ScheduleLua
   ```

3. **Make your changes**: Implement your feature or fix the bug

4. **Follow coding standards**:
   - Use consistent indentation (4 spaces)
   - Follow C# naming conventions
   - Include XML documentation comments for public APIs
   - Add appropriate exception handling

5. **Test your changes**: Ensure your changes work as expected in the game

6. **Commit your changes**: Use clear commit messages that explain what and why
   ```
   git commit -m "Added feature: description of what was added"
   ```

7. **Push to your fork**: Upload your changes to your GitHub fork
   ```
   git push origin main
   ```

8. **Create a Pull Request**: Go to the original ScheduleLua repository and click "New Pull Request"
   - Select "compare across forks"
   - Select your fork and branch as the source
   - The main ScheduleLua repository and branch as the destination
   - Fill out the PR template with a clear description of your changes

9. **Respond to feedback**: Be prepared to make additional changes based on the code review

### Keeping Your Fork Updated

Regularly sync your fork with the upstream repository:
```
git remote add upstream https://github.com/ScheduleLua/ScheduleLua-Framework.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### For Documentation Changes

The ScheduleLua documentation uses VitePress, a static site generator optimized for documentation sites. When contributing to documentation:

1. **Focus on Markdown Files**: All documentation is in Markdown files in the `docs/` directory
   - Each `.md` file becomes a page in the documentation site
   - File names become part of the URL structure

2. **Follow VitePress Conventions**:
   - Use standard Markdown for most content
   - Organize content with proper headings (starting with `##` for main sections)
   - Use relative links to reference other documentation pages

3. **Use VitePress-specific Features**:
   - Use `:::tip`, `:::warning`, and `:::danger` containers for callouts
   - Use code blocks with syntax highlighting by specifying the language: ```lua

4. **Preview Your Changes**:
   - Install dependencies: `npm install`
   - Start local dev server: `npm run docs:dev`
   - Your changes will be visible at `http://localhost:5173/`

5. **Keep Documentation Consistent**:
   - Follow existing documentation style and tone
   - Use the same formatting patterns as other pages
   - Keep explanations clear and concise with examples

6. **Submit Documentation PRs** the same way as code PRs:
   - Push changes to your fork
   - Create a Pull Request to the main repository

## Pull Request Guidelines

When submitting a PR, please:

1. **Describe your changes**: Explain what your PR does and why it should be included
2. **Link related issues**: Reference any related issues with "Fixes #12" or "Relates to #3"
3. **Keep it focused**: Each PR should address a single concern, don't make PR to refactor the entire framework, it will be closed
4. **Be responsive**: Respond to review comments and make requested changes
5. **Be patient**: PRs are reviewed as time permits

## Documentation Guidelines

When writing documentation:

1. Use clear, concise language
2. Include code examples where appropriate
3. Structure content with proper headings
4. Link to related documentation when relevant
5. Follow the existing documentation format

## Creating Example Scripts

Example scripts are valuable for demonstrating how to use ScheduleLua. When creating examples:

1. Place scripts in the `ScheduleLua/Resources` directory of the `ScheduleLua` GitHub Repository
2. Include detailed comments explaining what the code does
3. Focus on demonstrating specific features or patterns
4. Ensure examples are complete and functional
5. Follow [best practices for Lua 5.2 scripting](https://www.lua.org/manual/5.2/)

## Bug Reports

When reporting bugs:

1. Check if the bug has already been reported
2. Use the issue template if available
3. Include detailed steps to reproduce the issue
4. Provide information about your environment (OS, game version, etc.)
5. Include any error messages or logs
6. Attach screenshots or videos if they help illustrate the issue

## Feature Requests

When requesting features:

1. Check if the feature has already been requested
2. Use the feature request template if available
3. Clearly describe the feature and its use case
4. Explain why it would be valuable to the project
5. Provide examples of how the feature might work

## Community Guidelines

When participating in the ScheduleLua community:

1. Be respectful and inclusive
2. Help newcomers with patience and understanding
3. Give constructive feedback
4. Stay on topic in discussions
5. Follow the project's code of conduct

## License

By contributing to ScheduleLua, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing to ScheduleLua and helping make it better for everyone! 
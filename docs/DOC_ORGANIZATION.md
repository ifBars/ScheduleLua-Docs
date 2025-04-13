# ScheduleLua Documentation Organization

This document outlines the organization and development process for the ScheduleLua documentation. It serves as a guide for maintaining and expanding the documentation.

## Directory Structure

```
docs/
├── .vitepress/             # VitePress configuration
│   └── config.js           # Main config file with sidebar and navigation
├── public/                 # Static assets (images, favicon, etc.)
├── api/                    # API Reference documentation
│   ├── index.md            # API overview
│   ├── core/               # Core API functions
│   ├── player/             # Player-related API
│   ├── npc/                # NPC-related API
│   ├── time/               # Time-related API
│   ├── ui/                 # UI-related API
│   ├── registry/           # Registry-related API
│   ├── economy/            # Economy-related API
│   └── law/                # Law-related API
├── guide/                  # User guides and tutorials
│   ├── index.md            # Introduction
│   ├── installation.md     # Installation guide
│   ├── getting-started.md  # Getting started tutorial
│   ├── script-structure.md # Script structure guide
│   ├── lifecycle-hooks.md  # Lifecycle hooks guide
│   └── best-practices.md   # Best practices
├── examples/               # Example scripts
│   ├── index.md            # Basic example
│   ├── ui.md               # UI example
│   ├── registry.md         # Registry example
│   ├── economy.md          # Economy example
│   └── curfew.md           # Curfew example
├── index.md                # Home page
└── DOC_ORGANIZATION.md     # This file
```

## Documentation Categories

### API Reference

The API Reference should:
- Document every function in the ScheduleLua API
- Use consistent formatting and structure
- Include function signatures, parameters, return values, and examples
- Group related functions together
- Cross-reference related functions

Each API function should be documented with the following format:

```md
## FunctionName

**Signature:** `ReturnType FunctionName(ParameterType parameterName, ...)`

**Description:** Brief description of the function's purpose.

### Parameters

- `parameterName` (ParameterType): Description of the parameter
- ...

### Returns

Description of the return value.

### Example

```lua
-- Example code showing the function in use
local result = FunctionName(parameter1, parameter2)
Log(result)
```

### Notes

- Any important notes, caveats, or best practices
- Performance considerations
- Common errors
```

### User Guides

User guides should:
- Use clear, concise language
- Provide step-by-step instructions where appropriate
- Include screenshots or diagrams when helpful
- Explain concepts rather than just documenting APIs
- Be organized from basic to advanced topics

### Examples

Example scripts should:
- Be fully functional and tested
- Demonstrate one or more aspects of the API
- Include comments explaining key concepts
- Follow best practices
- Be ready to copy-paste and use with minimal modification

## Documentation Development Process

1. **API Reference First**: Start by documenting each API function with a template
2. **Example Development**: Create example scripts that demonstrate API usage
3. **Guide Writing**: Write guides that explain concepts and link to API reference
4. **Review & Testing**: Ensure all examples work and documentation is accurate
5. **Ongoing Maintenance**: Keep documentation updated as the API evolves

## Writing Style Guidelines

- Use active voice
- Be concise and direct
- Use consistent terminology
- Format code blocks with appropriate syntax highlighting
- Use appropriate headers for organization
- Include examples for all functions and concepts
- Link to related documentation sections
- Avoid unnecessary technical jargon
- Define terms when first introduced

## Function Documentation Priority

Document API functions in the following order based on importance and usage frequency:

1. Core logging and command functions
2. Player state and interaction functions
3. Time and event functions
4. NPC interaction functions
5. UI functions
6. Registry functions
7. Economy functions
8. Law/Curfew functions

## Template Files

Each section of the documentation has a template file to maintain consistency:

- API function template
- Guide section template
- Example script template

## Updating Documentation

When updating the documentation:

1. Update the API reference first when API changes occur
2. Update examples to reflect API changes
3. Update guides to explain new concepts
4. Update the main navigation and sidebar if needed
5. Add new sections when introducing major new features

## Documentation TODOs

Initial documentation tasks:

1. Complete API reference for all core functions
2. Document player, time, and NPC APIs thoroughly
3. Create basic examples for all API categories
4. Write getting started guide and installation instructions
5. Document script lifecycle hooks in detail

## Documentation Maintenance Checklist

- [ ] Ensure all API functions are documented
- [ ] Verify all examples are functional
- [ ] Check for broken links
- [ ] Update for latest API changes
- [ ] Add new examples for recent features
- [ ] Review and improve existing guides 
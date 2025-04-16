---
layout: home

hero:
  name: "ScheduleLua"
  text: "Lua Scripting API for Schedule 1"
  tagline: A work-in-progress modding framework for Schedule 1
  image:
    src: /logo.png
    alt: ScheduleLua Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/
    - theme: alt
      text: Contribute
      link: https://github.com/ifBars/ScheduleLua

features:
  - icon: 🚧
    title: Development Status
    details: ScheduleLua is currently in early development. The API is subject to change and some features may not be fully implemented yet.
    link: /guide/development-status
    linkText: Current Status
  - icon: 🔌
    title: Game Integration
    details: Access player data, NPCs, and game systems through an evolving API that will continue to expand as Schedule 1 develops.
    link: /api/
    linkText: Available APIs
  - icon: 📦
    title: Mod System
    details: Create modular Lua mods with dependencies, versioning, and function sharing between mods.
    link: /guide/mod-system
    linkText: Mod System Guide
  - icon: 📝
    title: Lua Examples
    details: ScheduleLua provides multiple example scripts for you to test with.
    link: /examples/
    linkText: View Examples
  - icon: 🤝
    title: Community Driven
    details: Contribute to the development of ScheduleLua by testing, reporting issues, or submitting code improvements.
    link: https://github.com/ifBars/ScheduleLua
    linkText: Contribute
---

<div class="vp-doc custom-container">

<div class="custom-block warning">
  <p><strong>Beta Status:</strong> ScheduleLua is currently in beta development. Some features may be incomplete or subject to change.</p>
</div>

# What is ScheduleLua?

ScheduleLua is an in-development modding framework that aims to bridge Schedule 1 with the Lua programming language, allowing you to create scripts to customize and enhance your gameplay experience. As a work in progress, it's growing alongside Schedule 1 itself, with new features being added regularly.

## Quick Start

<div class="quick-start-grid">
  <div class="quick-start-card">
    <div class="step-number">1</div>
    <h3><a href="/ScheduleLua-Docs/guide/installation">Installation</a></h3>
    <p>Set up MelonLoader and install the ScheduleLua mod</p>
  </div>
  <div class="quick-start-card">
    <div class="step-number">2</div>
    <h3><a href="/ScheduleLua-Docs/guide/getting-started">Basic Scripting</a></h3>
    <p>Learn Lua basics and test available features</p>
  </div>
  <div class="quick-start-card">
    <div class="step-number">3</div>
    <h3><a href="/ScheduleLua-Docs/guide/mod-system">Mod System</a></h3>
    <p>Create modular mods with dependencies</p>
  </div>
  <div class="quick-start-card">
    <div class="step-number">4</div>
    <h3><a href="/ScheduleLua-Docs/api/">API Reference</a></h3>
    <p>Explore currently implemented functionality</p>
  </div>
</div>

## Example Script

```lua
-- A simple script showcasing currently working functionality

function Initialize()
    Log("Basic Example Script initialized!")
    return true
end

function OnConsoleReady()
    -- Basic command registration works
    RegisterCommand("hello", "Displays a greeting", "hello [name]", function(args)
        local name = args[2] or "World"
        Log("Hello, " .. name .. "!")
    end)
end

function OnPlayerReady()
    -- Basic player data access is available
    local position = GetPlayerPosition()
    
    Log("Player Information (Available in current beta):")
    Log("Position: " .. position.x .. ", " .. position.y .. ", " .. position.z)
    
    -- Note: Some player properties might not be functional yet
end

function Shutdown()
    UnregisterCommand("hello")
    Log("Basic Example Script shutdown")
end
```

## New Mod System

ScheduleLua now features a modular mod system that allows you to:

- Create folder-based mods with a manifest file
- Define dependencies between mods
- Export and import functions between mods
- Organize your code across multiple files

Learn more in the [Mod System Guide](/guide/mod-system).

## Join the Community

<div class="community-grid">
  <a href="https://github.com/ifBars/ScheduleLua" class="community-card">
    <div class="community-icon">👨‍💻</div>
    <div>
      <h3>Code Contributions</h3>
      <p>Submit pull requests to help implement new features</p>
    </div>
  </a>
  <a href="https://github.com/ifBars/ScheduleLua/issues" class="community-card">
    <div class="community-icon">🐛</div>
    <div>
      <h3>Bug Reports</h3>
      <p>Report issues to help improve stability</p>
    </div>
  </a>
  <a href="https://discord.gg/Ab8snpEFDn" class="community-card">
    <div class="community-icon">💬</div>
    <div>
      <h3>Discord Community</h3>
      <p>Join for testing, feedback, and discussions</p>
    </div>
  </a>
</div>

</div>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #42b883 30%, #347474);
  --card-border: 1px solid var(--vp-c-divider);
  --card-radius: 8px;
  --section-gap: 32px;
}

.custom-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px 24px 48px;
}

.custom-container h1 {
  margin-top: 0;
}

/* Quick Start Section */
.quick-start-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin: 24px 0 var(--section-gap) 0;
}

.quick-start-card {
  position: relative;
  padding: 24px;
  background-color: var(--vp-c-bg-soft);
  border-radius: var(--card-radius);
  border: var(--card-border);
  transition: transform 0.2s, box-shadow 0.2s;
}

.quick-start-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  margin-bottom: 12px;
  font-weight: bold;
}

.quick-start-card h3 {
  margin: 0 0 8px 0;
}

.quick-start-card h3 a {
  color: inherit;
  text-decoration: none;
}

.quick-start-card p {
  margin: 0;
  font-size: 0.9em;
  opacity: 0.9;
}

/* API Grid */
.api-note {
  padding: 16px;
  border-radius: var(--card-radius);
  background-color: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand);
  margin: 24px 0;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: var(--section-gap);
}

.api-card {
  padding: 20px;
  background-color: var(--vp-c-bg-soft);
  border-radius: var(--card-radius);
  border: var(--card-border);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.api-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.api-card h3 {
  margin: 0 0 8px 0;
}

.api-card p {
  margin: 0 0 12px 0;
  font-size: 0.9em;
  opacity: 0.9;
}

.api-status {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.stable {
  background-color: rgba(66, 184, 131, 0.15);
  color: #42b883;
}

.partial {
  background-color: rgba(255, 197, 23, 0.15);
  color: #e8a307;
}

.experimental {
  background-color: rgba(237, 137, 54, 0.15);
  color: #ed8936;
}

/* Community Grid */
.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: var(--section-gap);
}

.community-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: var(--vp-c-bg-soft);
  border-radius: var(--card-radius);
  border: var(--card-border);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.community-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.community-icon {
  font-size: 1.5rem;
}

.community-card div:last-child {
  flex: 1;
}

.community-card h3 {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
}

.community-card p {
  margin: 0;
  font-size: 0.9em;
  opacity: 0.9;
}
</style>
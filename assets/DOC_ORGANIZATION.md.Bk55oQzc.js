import{_ as s,c as a,o as e,ag as p}from"./chunks/framework.D8iaFA0a.js";const u=JSON.parse('{"title":"ScheduleLua Documentation Organization","description":"","frontmatter":{},"headers":[],"relativePath":"DOC_ORGANIZATION.md","filePath":"DOC_ORGANIZATION.md","lastUpdated":1747817230000}'),i={name:"DOC_ORGANIZATION.md"};function l(t,n,c,o,r,d){return e(),a("div",null,n[0]||(n[0]=[p(`<h1 id="schedulelua-documentation-organization" tabindex="-1">ScheduleLua Documentation Organization <a class="header-anchor" href="#schedulelua-documentation-organization" aria-label="Permalink to &quot;ScheduleLua Documentation Organization&quot;">​</a></h1><p>This document outlines the organization and development process for the ScheduleLua documentation. It serves as a guide for maintaining and expanding the documentation.</p><h2 id="directory-structure" tabindex="-1">Directory Structure <a class="header-anchor" href="#directory-structure" aria-label="Permalink to &quot;Directory Structure&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docs/</span></span>
<span class="line"><span>├── .vitepress/             # VitePress configuration</span></span>
<span class="line"><span>│   └── config.js           # Main config file with sidebar and navigation</span></span>
<span class="line"><span>├── public/                 # Static assets (images, favicon, etc.)</span></span>
<span class="line"><span>├── api/                    # API Reference documentation</span></span>
<span class="line"><span>│   ├── index.md            # API overview</span></span>
<span class="line"><span>│   ├── core/               # Core API functions</span></span>
<span class="line"><span>│   ├── player/             # Player-related API</span></span>
<span class="line"><span>│   ├── npc/                # NPC-related API</span></span>
<span class="line"><span>│   ├── time/               # Time-related API</span></span>
<span class="line"><span>│   ├── ui/                 # UI-related API</span></span>
<span class="line"><span>│   ├── registry/           # Registry-related API</span></span>
<span class="line"><span>│   ├── economy/            # Economy-related API</span></span>
<span class="line"><span>│   └── law/                # Law-related API</span></span>
<span class="line"><span>├── guide/                  # User guides and tutorials</span></span>
<span class="line"><span>│   ├── index.md            # Introduction</span></span>
<span class="line"><span>│   ├── installation.md     # Installation guide</span></span>
<span class="line"><span>│   ├── getting-started.md  # Getting started tutorial</span></span>
<span class="line"><span>│   ├── script-structure.md # Script structure guide</span></span>
<span class="line"><span>│   ├── lifecycle-hooks.md  # Lifecycle hooks guide</span></span>
<span class="line"><span>│   └── best-practices.md   # Best practices</span></span>
<span class="line"><span>├── examples/               # Example scripts</span></span>
<span class="line"><span>│   ├── index.md            # Basic example</span></span>
<span class="line"><span>│   ├── ui.md               # UI example</span></span>
<span class="line"><span>│   ├── registry.md         # Registry example</span></span>
<span class="line"><span>│   ├── economy.md          # Economy example</span></span>
<span class="line"><span>│   └── curfew.md           # Curfew example</span></span>
<span class="line"><span>├── index.md                # Home page</span></span>
<span class="line"><span>└── DOC_ORGANIZATION.md     # This file</span></span></code></pre></div><h2 id="documentation-categories" tabindex="-1">Documentation Categories <a class="header-anchor" href="#documentation-categories" aria-label="Permalink to &quot;Documentation Categories&quot;">​</a></h2><h3 id="api-reference" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference" aria-label="Permalink to &quot;API Reference&quot;">​</a></h3><p>The API Reference should:</p><ul><li>Document every function in the ScheduleLua API</li><li>Use consistent formatting and structure</li><li>Include function signatures, parameters, return values, and examples</li><li>Group related functions together</li><li>Cross-reference related functions</li></ul><p>Each API function should be documented with the following format:</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## FunctionName</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Signature:**</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \`ReturnType FunctionName(ParameterType parameterName, ...)\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Description:**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Brief description of the function&#39;s purpose.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### Parameters</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \`parameterName\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (ParameterType): Description of the parameter</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### Returns</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Description of the return value.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### Example</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`lua</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-- Example code showing the function in use</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">local result = FunctionName(parameter1, parameter2)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Log(result)</span></span></code></pre></div><h3 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h3><ul><li>Any important notes, caveats, or best practices</li><li>Performance considerations</li><li>Common errors</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### User Guides</span></span>
<span class="line"><span></span></span>
<span class="line"><span>User guides should:</span></span>
<span class="line"><span>- Use clear, concise language</span></span>
<span class="line"><span>- Provide step-by-step instructions where appropriate</span></span>
<span class="line"><span>- Include screenshots or diagrams when helpful</span></span>
<span class="line"><span>- Explain concepts rather than just documenting APIs</span></span>
<span class="line"><span>- Be organized from basic to advanced topics</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Examples</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Example scripts should:</span></span>
<span class="line"><span>- Be fully functional and tested</span></span>
<span class="line"><span>- Demonstrate one or more aspects of the API</span></span>
<span class="line"><span>- Include comments explaining key concepts</span></span>
<span class="line"><span>- Follow best practices</span></span>
<span class="line"><span>- Be ready to copy-paste and use with minimal modification</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Documentation Development Process</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **API Reference First**: Start by documenting each API function with a template</span></span>
<span class="line"><span>2. **Example Development**: Create example scripts that demonstrate API usage</span></span>
<span class="line"><span>3. **Guide Writing**: Write guides that explain concepts and link to API reference</span></span>
<span class="line"><span>4. **Review &amp; Testing**: Ensure all examples work and documentation is accurate</span></span>
<span class="line"><span>5. **Ongoing Maintenance**: Keep documentation updated as the API evolves</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Writing Style Guidelines</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- Use active voice</span></span>
<span class="line"><span>- Be concise and direct</span></span>
<span class="line"><span>- Use consistent terminology</span></span>
<span class="line"><span>- Format code blocks with appropriate syntax highlighting</span></span>
<span class="line"><span>- Use appropriate headers for organization</span></span>
<span class="line"><span>- Include examples for all functions and concepts</span></span>
<span class="line"><span>- Link to related documentation sections</span></span>
<span class="line"><span>- Avoid unnecessary technical jargon</span></span>
<span class="line"><span>- Define terms when first introduced</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Function Documentation Priority</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Document API functions in the following order based on importance and usage frequency:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Core logging and command functions</span></span>
<span class="line"><span>2. Player state and interaction functions</span></span>
<span class="line"><span>3. Time and event functions</span></span>
<span class="line"><span>4. NPC interaction functions</span></span>
<span class="line"><span>5. UI functions</span></span>
<span class="line"><span>6. Registry functions</span></span>
<span class="line"><span>7. Economy functions</span></span>
<span class="line"><span>8. Law/Curfew functions</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Template Files</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Each section of the documentation has a template file to maintain consistency:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- API function template</span></span>
<span class="line"><span>- Guide section template</span></span>
<span class="line"><span>- Example script template</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Updating Documentation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>When updating the documentation:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Update the API reference first when API changes occur</span></span>
<span class="line"><span>2. Update examples to reflect API changes</span></span>
<span class="line"><span>3. Update guides to explain new concepts</span></span>
<span class="line"><span>4. Update the main navigation and sidebar if needed</span></span>
<span class="line"><span>5. Add new sections when introducing major new features</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Documentation TODOs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Initial documentation tasks:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Complete API reference for all core functions</span></span>
<span class="line"><span>2. Document player, time, and NPC APIs thoroughly</span></span>
<span class="line"><span>3. Create basic examples for all API categories</span></span>
<span class="line"><span>4. Write getting started guide and installation instructions</span></span>
<span class="line"><span>5. Document script lifecycle hooks in detail</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Documentation Maintenance Checklist</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- [ ] Ensure all API functions are documented</span></span>
<span class="line"><span>- [ ] Verify all examples are functional</span></span>
<span class="line"><span>- [ ] Check for broken links</span></span>
<span class="line"><span>- [ ] Update for latest API changes</span></span>
<span class="line"><span>- [ ] Add new examples for recent features</span></span>
<span class="line"><span>- [ ] Review and improve existing guides</span></span></code></pre></div>`,13)]))}const m=s(i,[["render",l]]);export{u as __pageData,m as default};

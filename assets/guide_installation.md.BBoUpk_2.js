import{_ as a,c as t,o as l,ag as o}from"./chunks/framework.D8iaFA0a.js";const p=JSON.parse('{"title":"Installation Guide","description":"","frontmatter":{},"headers":[],"relativePath":"guide/installation.md","filePath":"guide/installation.md","lastUpdated":1745052823000}'),i={name:"guide/installation.md"};function s(n,e,r,c,d,u){return l(),t("div",null,e[0]||(e[0]=[o(`<h1 id="installation-guide" tabindex="-1">Installation Guide <a class="header-anchor" href="#installation-guide" aria-label="Permalink to &quot;Installation Guide&quot;">​</a></h1><p>This guide will walk you through the process of installing the ScheduleLua beta for Schedule 1.</p><div class="custom-block warning"><p><strong>Beta Software Notice:</strong> ScheduleLua is currently in active development. Expect bugs, incomplete features, and potential changes to the API between versions.</p></div><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><p>Before installing ScheduleLua, you&#39;ll need:</p><ol><li><a href="https://store.steampowered.com/app/3164500/Schedule_I/" target="_blank" rel="noreferrer">Schedule 1</a> (Steam)</li><li>The game must be running on the <strong>Mono backend</strong> version, which is available on the &quot;alternate&quot; or &quot;alternate-beta&quot; Steam branches <ul><li>In Steam, right-click on Schedule 1 → Properties → Betas → Select &quot;alternate&quot; or &quot;alternate-beta&quot;</li><li>ScheduleLua is NOT compatible with the main branch or &quot;beta&quot; branch, which use IL2CPP</li></ul></li><li><a href="https://melonwiki.xyz/" target="_blank" rel="noreferrer">MelonLoader</a> version 0.7.0 or newer</li><li>Basic familiarity with file management</li><li>Backup of your save files (recommended for beta testing)</li></ol><h2 id="step-1-install-melonloader" tabindex="-1">Step 1: Install MelonLoader <a class="header-anchor" href="#step-1-install-melonloader" aria-label="Permalink to &quot;Step 1: Install MelonLoader&quot;">​</a></h2><p>If you haven&#39;t already installed MelonLoader, follow these steps:</p><ol><li>Download the latest MelonLoader installer from the <a href="https://github.com/LavaGang/MelonLoader/releases" target="_blank" rel="noreferrer">official GitHub releases page</a></li><li>Run the installer executable</li><li>When prompted, select your Schedule 1 executable file (typically located at <code>C:\\Program Files (x86)\\Steam\\steamapps\\common\\Schedule I\\Schedule I.exe</code>)</li><li>Click &quot;INSTALL&quot; and wait for the installation to complete</li><li>Verify that the installation was successful by checking for a <code>MelonLoader</code> folder in your Schedule 1 game directory</li></ol><h2 id="step-2-install-schedulelua-beta" tabindex="-1">Step 2: Install ScheduleLua Beta <a class="header-anchor" href="#step-2-install-schedulelua-beta" aria-label="Permalink to &quot;Step 2: Install ScheduleLua Beta&quot;">​</a></h2><ol><li>Download the latest ScheduleLua beta release from <a href="https://github.com/" target="_blank" rel="noreferrer">Thunderstore</a> (ZIP file)</li><li>Drag the <code>Mods</code> and <code>UserLibs</code> folders into your <code>Schedule 1</code> game directory Your directory structure should look like this:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Schedule 1/</span></span>
<span class="line"><span>├── Mods/</span></span>
<span class="line"><span>│   ├── ScheduleLua</span></span>
<span class="line"><span>│   ├── ScheduleLua.dll</span></span>
<span class="line"><span>│   └── ... (other mod DLLs)</span></span>
<span class="line"><span>├── UserLibs/</span></span>
<span class="line"><span>│   ├── MoonSharp.Interpreter.dll</span></span>
<span class="line"><span>│   └── ... (other library DLLs)</span></span>
<span class="line"><span>└── ... (other game files)</span></span></code></pre></div><h2 id="step-3-install-example-scripts-optional" tabindex="-1">Step 3: Install Example Scripts (Optional) <a class="header-anchor" href="#step-3-install-example-scripts-optional" aria-label="Permalink to &quot;Step 3: Install Example Scripts (Optional)&quot;">​</a></h2><ol><li>Copy the example Lua scripts from the ScheduleLua GitHub to your <code>Scripts</code> folder</li><li>The beta includes working examples that demonstrate currently available features: <ul><li><code>example.lua</code> - Uses stable core functionality</li><li><code>ui_example.lua</code> - Demonstrates notifications (note: advanced UI is experimental)</li><li>See <code>Resources</code> directory in the <code>ScheduleLua</code> repository for more info</li></ul></li></ol><h2 id="step-4-verify-installation" tabindex="-1">Step 4: Verify Installation <a class="header-anchor" href="#step-4-verify-installation" aria-label="Permalink to &quot;Step 4: Verify Installation&quot;">​</a></h2><ol><li>Launch Schedule 1</li><li>Wait for the game to load</li><li>Look for messages indicating that ScheduleLua has loaded successfully inside MelonLoader console:</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[ScheduleLua] Initializing ScheduleLua...</span></span>
<span class="line"><span>[ScheduleLua] Initializing Lua engine...</span></span>
<span class="line"><span>[ScheduleLua] Initializing GUI system...</span></span>
<span class="line"><span>[ScheduleLua] Lua GUI system initialized</span></span>
<span class="line"><span>[ScheduleLua] Loading scripts from Scripts directory</span></span>
<span class="line"><span>[ScheduleLua] Loaded X scripts successfully</span></span></code></pre></div><p>If you see these messages, congratulations! The ScheduleLua beta is installed and working correctly.</p><h2 id="troubleshooting" tabindex="-1">Troubleshooting <a class="header-anchor" href="#troubleshooting" aria-label="Permalink to &quot;Troubleshooting&quot;">​</a></h2><h3 id="known-beta-issues" tabindex="-1">Known Beta Issues <a class="header-anchor" href="#known-beta-issues" aria-label="Permalink to &quot;Known Beta Issues&quot;">​</a></h3><ul><li><strong>UI Windows</strong>: If UI windows don&#39;t appear correctly, restart the game</li><li><strong>Script Errors</strong>: Some API functions mentioned in documentation may not be fully implemented</li><li><strong>Performance</strong>: Heavy script usage may cause performance issues in the current beta</li></ul><h3 id="beta-error-reporting" tabindex="-1">Beta Error Reporting <a class="header-anchor" href="#beta-error-reporting" aria-label="Permalink to &quot;Beta Error Reporting&quot;">​</a></h3><p>If you encounter issues with the beta:</p><ol><li>Check the <a href="https://github.com/ifBars/ScheduleLua/issues" target="_blank" rel="noreferrer">Known Issues</a> on GitHub</li><li>If your issue isn&#39;t listed, report it with: <ul><li>Clear description of the problem</li><li>Steps to reproduce</li><li>Log files from <code>Schedule 1/MelonLoader/Latest.log</code></li><li>Your script code (if applicable)</li></ul></li></ol><h2 id="common-issues" tabindex="-1">Common Issues <a class="header-anchor" href="#common-issues" aria-label="Permalink to &quot;Common Issues&quot;">​</a></h2><h3 id="melonloader-not-loading" tabindex="-1">MelonLoader Not Loading <a class="header-anchor" href="#melonloader-not-loading" aria-label="Permalink to &quot;MelonLoader Not Loading&quot;">​</a></h3><p>If MelonLoader isn&#39;t loading properly:</p><ul><li>Verify that you&#39;re using a compatible version of MelonLoader (0.7.0 Open Beta)</li><li>Reinstall MelonLoader using the official installer</li><li>Check the game&#39;s launch options in Steam and remove any conflicting parameters</li></ul><h3 id="schedulelua-not-loading" tabindex="-1">ScheduleLua Not Loading <a class="header-anchor" href="#schedulelua-not-loading" aria-label="Permalink to &quot;ScheduleLua Not Loading&quot;">​</a></h3><p>If ScheduleLua isn&#39;t loading:</p><ul><li>Verify that you&#39;re using the correct Steam branch (&quot;alternate&quot; or &quot;alternate-beta&quot;) as ScheduleLua only works with the Mono version of the game</li><li>Verify that <code>ScheduleLua.dll</code> is in the correct location (<code>Schedule 1/Mods/</code>)</li><li>Check that <code>moonsharp.dll</code> is in the correct location (<code>Schedule 1/UserLibs/</code>)</li><li>Look for error messages in the MelonLoader console logs</li></ul><h3 id="scripts-not-loading" tabindex="-1">Scripts Not Loading <a class="header-anchor" href="#scripts-not-loading" aria-label="Permalink to &quot;Scripts Not Loading&quot;">​</a></h3><p>If your scripts aren&#39;t loading:</p><ul><li>Ensure they&#39;re in the correct directory (<code>Schedule 1/Scripts/</code>)</li><li>Check script syntax for errors (the MelonLoader console will typically show Lua errors)</li><li>Try the included example scripts to verify basic functionality</li></ul><h2 id="getting-help" tabindex="-1">Getting Help <a class="header-anchor" href="#getting-help" aria-label="Permalink to &quot;Getting Help&quot;">​</a></h2><p>If you encounter issues not covered in this guide:</p><ul><li>Check the <a href="https://github.com/ifBars/ScheduleLua/issues" target="_blank" rel="noreferrer">GitHub repository issues</a> for similar problems</li><li>Join the <a href="https://discord.gg/Ab8snpEFDn" target="_blank" rel="noreferrer">ScheduleLua Discord</a></li><li>Create a detailed bug report on <a href="./.html">GitHub</a> with logs and system information</li></ul><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><p>Now that you have the ScheduleLua beta installed:</p><ol><li>Try out the included example scripts to learn how the API works</li><li>Read the <a href="/ScheduleLua-Docs/guide/development-status.html">Development Status</a> page to understand what&#39;s currently implemented</li><li>Follow the <a href="./getting-started.html">Getting Started guide</a> to learn the basics of writing your own scripts</li><li>Join the community to stay updated on beta developments and contribute feedback</li></ol><p>Happy testing!</p>`,41)]))}const m=a(i,[["render",s]]);export{p as __pageData,m as default};

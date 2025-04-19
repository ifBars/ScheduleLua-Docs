import{_ as i,c as a,o as e,ag as t}from"./chunks/framework.D8iaFA0a.js";const c=JSON.parse('{"title":"What is ScheduleLua?","description":"","frontmatter":{"layout":"home","hero":{"name":"ScheduleLua","text":"Lua Scripting API for Schedule 1","tagline":"A work-in-progress modding framework for Schedule 1","image":{"src":"/logo.png","alt":"ScheduleLua Logo"},"actions":[{"theme":"brand","text":"Get Started","link":"/guide/getting-started"},{"theme":"alt","text":"API Reference","link":"/api/"},{"theme":"alt","text":"Contribute","link":"https://github.com/ifBars/ScheduleLua"}]},"features":[{"icon":"🔌","title":"Game Integration","details":"Access player data, NPCs, and game systems through an evolving API that will continue to expand as Schedule 1 develops.","link":"/api/","linkText":"Available APIs"},{"icon":"📦","title":"Mod System","details":"Create modular Lua mods with dependencies, versioning, and function sharing between mods.","link":"/guide/mod-system","linkText":"Mod System Guide"},{"icon":"📝","title":"Lua Examples","details":"ScheduleLua provides multiple example scripts for you to test with.","link":"/examples/","linkText":"View Examples"},{"icon":"🤝","title":"Community Driven","details":"Contribute to the development of ScheduleLua by testing, reporting issues, or submitting code improvements.","link":"https://discord.gg/Ab8snpEFDn","linkText":"Contribute"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1745052823000}'),n={name:"index.md"};function l(h,s,p,k,d,r){return e(),a("div",null,s[0]||(s[0]=[t(`<div class="vp-doc custom-container"><div class="custom-block warning"><p><strong>Beta Status:</strong> ScheduleLua is currently in beta development. Some features may be incomplete or subject to change.</p></div><h1 id="what-is-schedulelua" tabindex="-1">What is ScheduleLua? <a class="header-anchor" href="#what-is-schedulelua" aria-label="Permalink to &quot;What is ScheduleLua?&quot;">​</a></h1><p>ScheduleLua is an in-development modding framework that aims to bridge Schedule 1 with the Lua programming language, allowing you to create scripts to customize and enhance your gameplay experience. As a work in progress, it&#39;s growing alongside Schedule 1 itself, with new features being added regularly.</p><h2 id="quick-start" tabindex="-1">Quick Start <a class="header-anchor" href="#quick-start" aria-label="Permalink to &quot;Quick Start&quot;">​</a></h2><div class="quick-start-grid"><div class="quick-start-card"><div class="step-number">1</div><h3><a href="/ScheduleLua-Docs/guide/installation">Installation</a></h3><p>Set up MelonLoader and install the ScheduleLua mod</p></div><div class="quick-start-card"><div class="step-number">2</div><h3><a href="/ScheduleLua-Docs/guide/getting-started">Basic Scripting</a></h3><p>Learn Lua basics and test available features</p></div><div class="quick-start-card"><div class="step-number">3</div><h3><a href="/ScheduleLua-Docs/guide/mod-system">Mod System</a></h3><p>Create modular mods with dependencies</p></div><div class="quick-start-card"><div class="step-number">4</div><h3><a href="/ScheduleLua-Docs/api/">API Reference</a></h3><p>Explore currently implemented functionality</p></div></div><h2 id="example-script" tabindex="-1">Example Script <a class="header-anchor" href="#example-script" aria-label="Permalink to &quot;Example Script&quot;">​</a></h2><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- A simple script showcasing currently working functionality</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Initialize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Basic Example Script initialized!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> OnConsoleReady</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    -- Basic command registration works</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    RegisterCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Displays a greeting&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello [name]&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(args)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> args[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">or</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;World&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello, &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> OnPlayerReady</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    -- Basic player data access is available</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> position </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> GetPlayerPosition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Player Information (Available in current beta):&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Position: &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ..</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;, &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ..</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;, &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">z</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    -- Note: Some player properties might not be functional yet</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Shutdown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    UnregisterCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Basic Example Script shutdown&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><h2 id="new-mod-system" tabindex="-1">New Mod System <a class="header-anchor" href="#new-mod-system" aria-label="Permalink to &quot;New Mod System&quot;">​</a></h2><p>ScheduleLua now features a modular mod system that allows you to:</p><ul><li>Create folder-based mods with a manifest file</li><li>Define dependencies between mods</li><li>Export and import functions between mods</li><li>Organize your code across multiple files</li></ul><p>Learn more in the <a href="/ScheduleLua-Docs/guide/mod-system.html">Mod System Guide</a>.</p><h2 id="join-the-community" tabindex="-1">Join the Community <a class="header-anchor" href="#join-the-community" aria-label="Permalink to &quot;Join the Community&quot;">​</a></h2><div class="community-grid"><a href="https://github.com/ifBars/ScheduleLua" class="community-card"><div class="community-icon">👨‍💻</div><div><h3>Code Contributions</h3><p>Submit pull requests to help implement new features</p></div></a><a href="https://github.com/ifBars/ScheduleLua/issues" class="community-card"><div class="community-icon">🐛</div><div><h3>Bug Reports</h3><p>Report issues to help improve stability</p></div></a><a href="https://discord.gg/Ab8snpEFDn" class="community-card"><div class="community-icon">💬</div><div><h3>Discord Community</h3><p>Join for testing, feedback, and discussions</p></div></a></div></div>`,1)]))}const u=i(n,[["render",l]]);export{c as __pageData,u as default};

import{_ as a,c as i,o as s,ag as t}from"./chunks/framework.D8iaFA0a.js";const u=JSON.parse('{"title":"Global Variables","description":"","frontmatter":{},"headers":[],"relativePath":"api/core/globals.md","filePath":"api/core/globals.md","lastUpdated":1745052823000}'),n={name:"api/core/globals.md"};function l(o,e,r,h,p,d){return s(),i("div",null,e[0]||(e[0]=[t(`<h1 id="global-variables" tabindex="-1">Global Variables <a class="header-anchor" href="#global-variables" aria-label="Permalink to &quot;Global Variables&quot;">​</a></h1><p>The ScheduleLua API provides several global variables that can be accessed from any Lua script. These variables provide useful information about the game, mod, and runtime environment.</p><h2 id="schedulelua-version" tabindex="-1">SCHEDULELUA_VERSION <a class="header-anchor" href="#schedulelua-version" aria-label="Permalink to &quot;SCHEDULELUA_VERSION&quot;">​</a></h2><p><strong>Type:</strong> <code>string</code></p><p><strong>Description:</strong> Contains the current version of the ScheduleLua mod.</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Initialize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Running with ScheduleLua version: &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SCHEDULELUA_VERSION)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><h3 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h3><ul><li>Useful for version checking in scripts that might depend on specific ScheduleLua features</li><li>Can be used to provide conditional behavior based on the mod version</li><li>Format follows semantic versioning (e.g., &quot;0.1.0&quot;, &quot;0.1.1&quot;)</li></ul><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ul><li>Use version checking at the beginning of your scripts to ensure compatibility</li><li>Include version information in error logs to help with troubleshooting</li><li>When reporting issues, include the ScheduleLua version from this variable</li></ul><h2 id="related-components" tabindex="-1">Related Components <a class="header-anchor" href="#related-components" aria-label="Permalink to &quot;Related Components&quot;">​</a></h2><ul><li><a href="./logging.html">Logging API</a> - Use with logging functions to include version information in debug messages</li></ul>`,13)]))}const g=a(n,[["render",l]]);export{u as __pageData,g as default};

import{_ as s,c as a,o as t,ag as e}from"./chunks/framework.D8iaFA0a.js";const c=JSON.parse('{"title":"Helper Functions","description":"","frontmatter":{},"headers":[],"relativePath":"api/helper/index.md","filePath":"api/helper/index.md","lastUpdated":1745052823000}'),n={name:"api/helper/index.md"};function l(h,i,r,p,o,k){return t(),a("div",null,i[0]||(i[0]=[e(`<h1 id="helper-functions" tabindex="-1">Helper Functions <a class="header-anchor" href="#helper-functions" aria-label="Permalink to &quot;Helper Functions&quot;">​</a></h1><p>Helper functions provide utility functionality that can be used across different parts of your code to simplify common operations.</p><div class="custom-block warning"><p><strong>Implementation Status:</strong> Partially implemented. Basic utility functions are available.</p></div><h2 id="vector3-functions" tabindex="-1">Vector3 Functions <a class="header-anchor" href="#vector3-functions" aria-label="Permalink to &quot;Vector3 Functions&quot;">​</a></h2><h3 id="vector3" tabindex="-1">Vector3 <a class="header-anchor" href="#vector3" aria-label="Permalink to &quot;Vector3&quot;">​</a></h3><p><strong>Status:</strong> ✅ Stable</p><p><strong>Signature:</strong> <code>table Vector3(number x, number y, number z)</code></p><p><strong>Description:</strong> Creates a new Vector3 object representing a 3D point or direction.</p><h3 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><ul><li><code>x</code> (number): The X coordinate</li><li><code>y</code> (number): The Y coordinate</li><li><code>z</code> (number): The Z coordinate</li></ul><h3 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h3><p>A table representing a Vector3 with the following properties:</p><ul><li><code>x</code> (number): X coordinate</li><li><code>y</code> (number): Y coordinate</li><li><code>z</code> (number): Z coordinate</li></ul><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Create a new Vector3</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> position </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Vector3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Position: X=&quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ..</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;, Y=&quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ..</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;, Z=&quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">z</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Use it to teleport the player</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TeleportPlayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, position.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">z</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h3 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h3><ul><li>Vector3 objects are used to represent positions and directions in 3D space</li><li>The returned object is a standard Lua table with x, y, z properties</li></ul><h2 id="vector3distance" tabindex="-1">Vector3Distance <a class="header-anchor" href="#vector3distance" aria-label="Permalink to &quot;Vector3Distance&quot;">​</a></h2><p><strong>Status:</strong> ✅ Stable</p><p><strong>Signature:</strong> <code>number Vector3Distance(table vector1, table vector2)</code></p><p><strong>Description:</strong> Calculates the distance between two Vector3 points in 3D space.</p><h3 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><ul><li><code>vector1</code> (table): First Vector3 with x, y, z properties</li><li><code>vector2</code> (table): Second Vector3 with x, y, z properties</li></ul><h3 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h3><p>A number representing the straight-line distance between the two points.</p><h3 id="example-1" tabindex="-1">Example <a class="header-anchor" href="#example-1" aria-label="Permalink to &quot;Example&quot;">​</a></h3><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- Get player and NPC positions</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> playerPos </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> GetPlayerPosition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npc </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> FindNPC</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;John&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npcPos </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> GetNPCPosition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(npc)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> playerPos </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> npcPos </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    -- Calculate distance between player and NPC</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> distance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Vector3Distance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(playerPos, npcPos)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Distance to NPC: &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> distance)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    -- Check if NPC is nearby</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> distance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> then</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;NPC is nearby!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    else</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        Log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;NPC is far away&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    end</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><h3 id="notes-1" tabindex="-1">Notes <a class="header-anchor" href="#notes-1" aria-label="Permalink to &quot;Notes&quot;">​</a></h3><ul><li>This calculates the straight-line distance (Euclidean distance)</li><li>Useful for proximity checks and distance-based behaviors</li></ul><h2 id="future-helper-functions" tabindex="-1">Future Helper Functions <a class="header-anchor" href="#future-helper-functions" aria-label="Permalink to &quot;Future Helper Functions&quot;">​</a></h2><p>Additional helper functions are planned for future updates, including:</p><h3 id="string-manipulation" tabindex="-1">String Manipulation <a class="header-anchor" href="#string-manipulation" aria-label="Permalink to &quot;String Manipulation&quot;">​</a></h3><p><strong>Status:</strong> 📝 Planned</p><p>String manipulation utilities for common text operations.</p><h3 id="table-operations" tabindex="-1">Table Operations <a class="header-anchor" href="#table-operations" aria-label="Permalink to &quot;Table Operations&quot;">​</a></h3><p><strong>Status:</strong> 📝 Planned</p><p>Functions for working with Lua tables more efficiently.</p><h3 id="mathematical-utilities" tabindex="-1">Mathematical Utilities <a class="header-anchor" href="#mathematical-utilities" aria-label="Permalink to &quot;Mathematical Utilities&quot;">​</a></h3><p><strong>Status:</strong> 📝 Planned</p><p>Extended math functions beyond what&#39;s available in Lua&#39;s standard math library.</p><h3 id="time-utilities" tabindex="-1">Time Utilities <a class="header-anchor" href="#time-utilities" aria-label="Permalink to &quot;Time Utilities&quot;">​</a></h3><p><strong>Status:</strong> 📝 Planned</p><p>Helper functions for time calculations and conversions.</p><h3 id="path-finding" tabindex="-1">Path Finding <a class="header-anchor" href="#path-finding" aria-label="Permalink to &quot;Path Finding&quot;">​</a></h3><p><strong>Status:</strong> 📝 Planned</p><p>Utilities to help with navigation and path finding in the game world.</p><h3 id="data-conversion" tabindex="-1">Data Conversion <a class="header-anchor" href="#data-conversion" aria-label="Permalink to &quot;Data Conversion&quot;">​</a></h3><p><strong>Status:</strong> 📝 Planned</p><p>Functions to convert between different data formats and types.</p>`,49)]))}const u=s(n,[["render",l]]);export{c as __pageData,u as default};

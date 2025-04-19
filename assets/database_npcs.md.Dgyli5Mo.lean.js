import{p as k,h as E,c as e,o as l,j as s,ag as C,a as o,ah as g,ai as b,aj as m,F as u,B as y,t as h,e as D}from"./chunks/framework.D8iaFA0a.js";const v={class:"database-controls"},A={class:"search-box"},N={class:"filter-box"},B=["value"],f={class:"database-table"},P=["onClick"],_={key:0},w=JSON.parse('{"title":"NPC Database","description":"","frontmatter":{},"headers":[],"relativePath":"database/npcs.md","filePath":"database/npcs.md","lastUpdated":1745052823000}'),q={name:"database/npcs.md"},I=Object.assign(q,{setup(L){const r=k([{id:"doris_lubbin",name:"Doris Lubbin",region:"DOWNTOWN",description:"Local shop owner"}]),t=k(""),p=k("ALL"),c=E(()=>{const n=new Set(["ALL"]);return r.value.forEach(i=>n.add(i.region)),Array.from(n)}),d=E(()=>r.value.filter(n=>{const i=t.value===""||n.id.toLowerCase().includes(t.value.toLowerCase())||n.name.toLowerCase().includes(t.value.toLowerCase())||n.description.toLowerCase().includes(t.value.toLowerCase()),a=p.value==="ALL"||n.region===p.value;return i&&a})),F=n=>{navigator.clipboard.writeText(n),alert(`Copied: ${n}`)};return(n,i)=>(l(),e("div",null,[i[5]||(i[5]=s("h1",{id:"npc-database",tabindex:"-1"},[o("NPC Database "),s("a",{class:"header-anchor",href:"#npc-database","aria-label":'Permalink to "NPC Database"'},"​")],-1)),i[6]||(i[6]=s("div",{class:"custom-block tip"},[s("p",null,[s("strong",null,"Usage:"),o(" Use the search box to filter NPCs by ID, name, or region. Click on an NPC ID to copy it to clipboard.")])],-1)),i[7]||(i[7]=s("div",{class:"custom-block warning"},[s("p",null,[s("strong",null,"Incomplete Database:"),o(" This NPC database is currently under development and does not contain all NPCs available in the game. More entries will be added in future updates.")])],-1)),s("div",v,[s("div",A,[g(s("input",{"onUpdate:modelValue":i[0]||(i[0]=a=>t.value=a),type:"text",placeholder:"Search by ID, name or description..."},null,512),[[b,t.value]])]),s("div",N,[i[2]||(i[2]=s("label",{for:"region-filter"},"Filter by region:",-1)),g(s("select",{"onUpdate:modelValue":i[1]||(i[1]=a=>p.value=a),id:"region-filter"},[(l(!0),e(u,null,y(c.value,a=>(l(),e("option",{key:a,value:a},h(a),9,B))),128))],512),[[m,p.value]])])]),s("table",f,[i[4]||(i[4]=s("thead",null,[s("tr",null,[s("th",null,"NPC ID"),s("th",null,"Name"),s("th",null,"Region"),s("th",null,"Description")])],-1)),s("tbody",null,[(l(!0),e(u,null,y(d.value,a=>(l(),e("tr",{key:a.id},[s("td",{class:"id-cell",onClick:x=>F(a.id)},h(a.id),9,P),s("td",null,h(a.name),1),s("td",null,h(a.region),1),s("td",null,h(a.description),1)]))),128)),d.value.length===0?(l(),e("tr",_,i[3]||(i[3]=[s("td",{colspan:"4",class:"no-results"},"No NPCs match your search criteria",-1)]))):D("",!0)])]),i[8]||(i[8]=C("",2))]))}});export{w as __pageData,I as default};

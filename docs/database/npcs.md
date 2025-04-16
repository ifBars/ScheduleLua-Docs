# NPC Database

<div class="custom-block tip">
  <p><strong>Usage:</strong> Use the search box to filter NPCs by ID, name, or region. Click on an NPC ID to copy it to clipboard.</p>
</div>

<div class="custom-block warning">
  <p><strong>Incomplete Database:</strong> This NPC database is currently under development and does not contain all NPCs available in the game. More entries will be added in future updates.</p>
</div>

<script setup>
import { ref, computed, onMounted } from 'vue'

const npcs = ref([
  { id: 'doris_lubbin', name: 'Doris Lubbin', region: 'DOWNTOWN', description: 'Local shop owner' },
])

const searchQuery = ref('')
const selectedRegion = ref('ALL')

const regions = computed(() => {
  const uniqueRegions = new Set(['ALL'])
  npcs.value.forEach(npc => uniqueRegions.add(npc.region))
  return Array.from(uniqueRegions)
})

const filteredNpcs = computed(() => {
  return npcs.value.filter(npc => {
    const matchesSearch = searchQuery.value === '' || 
      npc.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      npc.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      npc.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRegion = selectedRegion.value === 'ALL' || npc.region === selectedRegion.value
    
    return matchesSearch && matchesRegion
  })
})

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  alert(`Copied: ${text}`)
}
</script>

<div class="database-controls">
  <div class="search-box">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Search by ID, name or description..." 
    />
  </div>
  
  <div class="filter-box">
    <label for="region-filter">Filter by region:</label>
    <select v-model="selectedRegion" id="region-filter">
      <option v-for="region in regions" :key="region" :value="region">
        {{ region }}
      </option>
    </select>
  </div>
</div>

<table class="database-table">
  <thead>
    <tr>
      <th>NPC ID</th>
      <th>Name</th>
      <th>Region</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="npc in filteredNpcs" :key="npc.id">
      <td class="id-cell" @click="copyToClipboard(npc.id)">{{ npc.id }}</td>
      <td>{{ npc.name }}</td>
      <td>{{ npc.region }}</td>
      <td>{{ npc.description }}</td>
    </tr>
    <tr v-if="filteredNpcs.length === 0">
      <td colspan="4" class="no-results">No NPCs match your search criteria</td>
    </tr>
  </tbody>
</table>

## Example Usage

```lua
-- Get information about an NPC
local npc = GetNPC("doris_lubbin")

if npc then
  Log("Found NPC: " .. npc.FullName)
  Log("Current region: " .. npc.Region)
  
  -- Get NPC position
  local position = GetNPCPosition(npc)
  Log("Position: " .. position.x .. ", " .. position.y .. ", " .. position.z)
end

-- Check if NPC is in a specific region
if IsNPCInRegion("mayor_wilson", "CITY_HALL") then
  Log("The mayor is at City Hall")
else
  Log("The mayor is not at City Hall")
end
```

<style>
.database-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-box input {
  width: 300px;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.filter-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-box select {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.database-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.database-table th,
.database-table td {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.database-table th {
  background-color: var(--vp-c-bg-soft);
  font-weight: bold;
}

.database-table tr:nth-child(even) {
  background-color: var(--vp-c-bg-soft);
}

.id-cell {
  font-family: monospace;
  cursor: pointer;
  color: var(--vp-c-brand);
  transition: background-color 0.2s;
}

.id-cell:hover {
  background-color: var(--vp-c-brand-dimm);
}

.no-results {
  text-align: center;
  font-style: italic;
  color: var(--vp-c-text-2);
}
</style> 
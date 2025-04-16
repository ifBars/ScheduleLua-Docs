# Region Database

<div class="custom-block tip">
  <p><strong>Usage:</strong> Use the search box to filter regions by ID or description. Click on a region ID to copy it to clipboard.</p>
</div>

<div class="custom-block warning">
  <p><strong>Incomplete Database:</strong> This region database is currently under development and does not contain all regions available in the game. More entries will be added in future updates.</p>
</div>

<script setup>
import { ref, computed, onMounted } from 'vue'

const regions = ref([
  { id: 'DOWNTOWN', description: 'Central downtown area', hasRestrictedAreas: false, curfewEnabled: true },
  { id: 'WESTVILLE', description: 'Westville', hasRestrictedAreas: false, curfewEnabled: true },
])

const searchQuery = ref('')
const showRestrictedOnly = ref(false)
const showCurfewOnly = ref(false)

const filteredRegions = computed(() => {
  return regions.value.filter(region => {
    const matchesSearch = searchQuery.value === '' || 
      region.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      region.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRestricted = !showRestrictedOnly.value || region.hasRestrictedAreas
    const matchesCurfew = !showCurfewOnly.value || region.curfewEnabled
    
    return matchesSearch && matchesRestricted && matchesCurfew
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
      placeholder="Search by ID or description..." 
    />
  </div>
  
  <div class="filter-box">
    <label>
      <input type="checkbox" v-model="showRestrictedOnly" />
      Show regions with restricted areas only
    </label>
  </div>
  
  <div class="filter-box">
    <label>
      <input type="checkbox" v-model="showCurfewOnly" />
      Show regions with curfew only
    </label>
  </div>
</div>

<table class="database-table">
  <thead>
    <tr>
      <th>Region ID</th>
      <th>Description</th>
      <th>Restricted Areas</th>
      <th>Curfew Enabled</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="region in filteredRegions" :key="region.id">
      <td class="id-cell" @click="copyToClipboard(region.id)">{{ region.id }}</td>
      <td>{{ region.description }}</td>
      <td>{{ region.hasRestrictedAreas ? 'Yes' : 'No' }}</td>
      <td>{{ region.curfewEnabled ? 'Yes' : 'No' }}</td>
    </tr>
    <tr v-if="filteredRegions.length === 0">
      <td colspan="4" class="no-results">No regions match your search criteria</td>
    </tr>
  </tbody>
</table>

## Example Usage

```lua
-- Get the player's current region
local currentRegion = GetPlayerRegion()
Log("Player is in region: " .. currentRegion)

-- Check if the region has curfew
local isCurfewActive = IsRegionCurfewActive(currentRegion)
if isCurfewActive then
  Log("Curfew is active in this region!")
  
  -- Get curfew time range
  local startTime, endTime = GetRegionCurfewTime(currentRegion)
  Log("Curfew runs from " .. startTime .. " to " .. endTime)
  
  -- Show notification to player
  ShowNotification("Warning: Curfew is active from " .. startTime .. " to " .. endTime)
end

-- Check if player is in a specific region
if currentRegion == "DOWNTOWN" then
  Log("Player is downtown")
  
  -- Do region-specific things
  local npcsInRegion = GetNPCsInRegion("DOWNTOWN")
  Log("There are " .. #npcsInRegion .. " NPCs in downtown")
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

.filter-box label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
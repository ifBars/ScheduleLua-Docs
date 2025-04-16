# Prefab Database

<div class="custom-block tip">
  <p><strong>Usage:</strong> Use the search box to filter prefabs by ID or type. Click on a prefab ID to copy it to clipboard.</p>
</div>

<div class="custom-block warning">
  <p><strong>Incomplete Database:</strong> This prefab database is currently under development and does not contain all prefabs available in the game. More entries will be added in future updates.</p>
</div>

<script setup>
import { ref, computed, onMounted } from 'vue'

const prefabs = ref([

])

const searchQuery = ref('')
const selectedType = ref('ALL')

const types = computed(() => {
  const uniqueTypes = new Set(['ALL'])
  prefabs.value.forEach(prefab => uniqueTypes.add(prefab.type))
  return Array.from(uniqueTypes)
})

const filteredPrefabs = computed(() => {
  return prefabs.value.filter(prefab => {
    const matchesSearch = searchQuery.value === '' || 
      prefab.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      prefab.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = selectedType.value === 'ALL' || prefab.type === selectedType.value
    
    return matchesSearch && matchesType
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
    <label for="type-filter">Filter by type:</label>
    <select v-model="selectedType" id="type-filter">
      <option v-for="type in types" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
  </div>
</div>

<table class="database-table">
  <thead>
    <tr>
      <th>Prefab ID</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="prefab in filteredPrefabs" :key="prefab.id">
      <td class="id-cell" @click="copyToClipboard(prefab.id)">{{ prefab.id }}</td>
      <td>{{ prefab.type }}</td>
      <td>{{ prefab.description }}</td>
    </tr>
    <tr v-if="filteredPrefabs.length === 0">
      <td colspan="3" class="no-results">No prefabs match your search criteria</td>
    </tr>
  </tbody>
</table>

## Example Usage

```lua
-- Check if a prefab exists
if DoesPrefabExist("container_box_small") then
  Log("Container box prefab exists")
  
  -- Get the prefab
  local prefab = GetPrefab("container_box_small")
  if prefab then
    Log("Got container box prefab")
    
    -- Now you can spawn it at a position
    local pos = Vector3(10, 0, 10)
    local instance = InstantiateGameObject(prefab, pos)
    
    if instance then
      Log("Spawned container at " .. pos.x .. ", " .. pos.y .. ", " .. pos.z)
    end
  end
end

-- Check if a constructable exists (for building system)
if DoesConstructableExist("furniture_bed_single") then
  local constructable = GetConstructable("furniture_bed_single")
  -- Work with constructable...
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
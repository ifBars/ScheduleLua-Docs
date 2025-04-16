# Item Database

<div class="custom-block tip">
  <p><strong>Usage:</strong> Use the search box to filter items by ID, name, or category. Click on an item ID to copy it to clipboard.</p>
</div>

<script setup>
import { ref, computed, onMounted } from 'vue'

const items = ref([
  { id: 'acid', name: 'Acid', category: 'CHEMICAL', stackLimit: 100, description: 'A corrosive substance' },
  { id: 'addy', name: 'Addy', category: 'DRUG', stackLimit: 100, description: 'Stimulant medication' },
  { id: 'airpot', name: 'Airpot', category: 'CONTAINER', stackLimit: 10, description: 'Container for liquids' },
  { id: 'antiquewalllamp', name: 'Antique Wall Lamp', category: 'FURNITURE', stackLimit: 10, description: 'Decorative wall fixture' },
  { id: 'apron', name: 'Apron', category: 'CLOTHING', stackLimit: 5, description: 'Protective garment worn while cooking' },
  { id: 'artworkbeachday', name: 'Artwork Beach Day', category: 'DECORATION', stackLimit: 5, description: 'Decorative artwork' },
  { id: 'artworklines', name: 'Artwork Lines', category: 'DECORATION', stackLimit: 5, description: 'Abstract line art' },
  { id: 'artworkmenace', name: 'Artwork Menace', category: 'DECORATION', stackLimit: 5, description: 'Intimidating artwork' },
  { id: 'artworkmillie', name: 'Artwork Millie', category: 'DECORATION', stackLimit: 5, description: 'Portrait artwork' },
  { id: 'artworkoffer', name: 'Artwork Offer', category: 'DECORATION', stackLimit: 5, description: 'Business-themed artwork' },
  { id: 'artworkrapscallion', name: 'Artwork Rapscallion', category: 'DECORATION', stackLimit: 5, description: 'Mischievous artwork' },
  { id: 'babyblue', name: 'Baby Blue', category: 'DRUG', stackLimit: 100, description: 'Distinctive blue substance' },
  { id: 'baggie', name: 'Baggie', category: 'CONTAINER', stackLimit: 100, description: 'Small plastic bag for storage' },
  { id: 'banana', name: 'Banana', category: 'FOOD', stackLimit: 20, description: 'Yellow fruit rich in potassium' },
  { id: 'baseballbat', name: 'Baseball Bat', category: 'WEAPON', stackLimit: 5, description: 'Wooden sports equipment and improvised weapon' },
  { id: 'battery', name: 'Battery', category: 'COMPONENT', stackLimit: 50, description: 'Portable power source' },
  { id: 'bed', name: 'Bed', category: 'FURNITURE', stackLimit: 5, description: 'Place to sleep' },
  { id: 'belt', name: 'Belt', category: 'CLOTHING', stackLimit: 10, description: 'Worn around waist' },
  { id: 'bigsprinkler', name: 'Big Sprinkler', category: 'TOOL', stackLimit: 10, description: 'Large irrigation device' },
  { id: 'bikercrank', name: 'Biker Crank', category: 'DRUG', stackLimit: 100, description: 'Stimulant popular with bikers' },
  { id: 'blazer', name: 'Blazer', category: 'CLOTHING', stackLimit: 10, description: 'Formal jacket' },
  { id: 'brain_enhancer', name: 'Brain Enhancer', category: 'DRUG', stackLimit: 100, description: 'Cognitive enhancement supplement' },
  { id: 'brick', name: 'Brick', category: 'BUILDING', stackLimit: 100, description: 'Construction material' },
  { id: 'brickpress', name: 'Brick Press', category: 'TOOL', stackLimit: 5, description: 'Creates bricks from raw materials' },
  { id: 'brutdugloop', name: 'Brut Dug Loop', category: 'MISC', stackLimit: 50, description: 'Unknown purpose' },
  { id: 'buckethat', name: 'Bucket Hat', category: 'CLOTHING', stackLimit: 10, description: 'Casual headwear' },
  { id: 'buttonup', name: 'Button Up', category: 'CLOTHING', stackLimit: 20, description: 'Formal shirt with buttons' },
  { id: 'cap', name: 'Cap', category: 'CLOTHING', stackLimit: 20, description: 'Casual headwear with a brim' },
  { id: 'cargopants', name: 'Cargo Pants', category: 'CLOTHING', stackLimit: 20, description: 'Pants with many pockets' },
  { id: 'cash', name: 'Cash', category: 'CASH', stackLimit: 9999, description: 'In-game currency' },
  { id: 'cauldron', name: 'Cauldron', category: 'CONTAINER', stackLimit: 5, description: 'Large metal pot for cooking' },
  { id: 'cerebral_powder', name: 'Cerebral Powder', category: 'DRUG', stackLimit: 100, description: 'Powdered nootropic substance' },
  { id: 'chateaulapeepee', name: 'Chateau La Peepee', category: 'DRINK', stackLimit: 20, description: 'Fancy wine with a silly name' },
  { id: 'cheapskateboard', name: 'Cheap Skateboard', category: 'TRANSPORT', stackLimit: 5, description: 'Low-cost transportation device' },
  { id: 'chefhat', name: 'Chef Hat', category: 'CLOTHING', stackLimit: 10, description: 'Tall white hat worn by chefs' },
  { id: 'chemistrystation', name: 'Chemistry Station', category: 'EQUIPMENT', stackLimit: 5, description: 'Used for chemical experiments' },
  { id: 'chili', name: 'Chili', category: 'FOOD', stackLimit: 20, description: 'Spicy food dish' },
  { id: 'cocaine', name: 'Cocaine', category: 'DRUG', stackLimit: 100, description: 'Processed stimulant drug' },
  { id: 'cocainebase', name: 'Cocaine Base', category: 'DRUG', stackLimit: 100, description: 'Intermediate form of cocaine' },
  { id: 'cocaleaf', name: 'Coca Leaf', category: 'PLANT', stackLimit: 100, description: 'Raw plant material' },
  { id: 'cocaseed', name: 'Coca Seed', category: 'SEED', stackLimit: 100, description: 'Seed for growing coca plants' },
  { id: 'coffeetable', name: 'Coffee Table', category: 'FURNITURE', stackLimit: 10, description: 'Small table for living spaces' },
  { id: 'collarjacket', name: 'Collar Jacket', category: 'CLOTHING', stackLimit: 10, description: 'Jacket with pronounced collar' },
  { id: 'combatboots', name: 'Combat Boots', category: 'CLOTHING', stackLimit: 10, description: 'Durable military footwear' },
  { id: 'cowboyhat', name: 'Cowboy Hat', category: 'CLOTHING', stackLimit: 10, description: 'Western-style hat' },
  { id: 'cruiser', name: 'Cruiser', category: 'TRANSPORT', stackLimit: 5, description: 'Comfortable skateboard for cruising' },
  { id: 'cuke', name: 'Cuke', category: 'FOOD', stackLimit: 50, description: 'Slang for cucumber' },
  { id: 'defaultweed', name: 'Default Weed', category: 'DRUG', stackLimit: 100, description: 'Standard cannabis product' },
  { id: 'displaycabinet', name: 'Display Cabinet', category: 'FURNITURE', stackLimit: 10, description: 'Furniture for showing off items' },
  { id: 'donut', name: 'Donut', category: 'FOOD', stackLimit: 20, description: 'Sweet fried dough' },
  { id: 'dressshoes', name: 'Dress Shoes', category: 'CLOTHING', stackLimit: 10, description: 'Formal footwear' },
  { id: 'dryingrack', name: 'Drying Rack', category: 'EQUIPMENT', stackLimit: 10, description: 'Used to dry herbs and plants' },
  { id: 'dumpster', name: 'Dumpster', category: 'CONTAINER', stackLimit: 5, description: 'Large waste container' },
  { id: 'electrictrimmers', name: 'Electric Trimmers', category: 'TOOL', stackLimit: 10, description: 'Powered cutting tool' },
  { id: 'energydrink', name: 'Energy Drink', category: 'DRINK', stackLimit: 20, description: 'Caffeinated beverage' },
  { id: 'extralonglifesoil', name: 'Extra Long Life Soil', category: 'GARDENING', stackLimit: 50, description: 'Premium soil with extended nutrients' },
  { id: 'fertilizer', name: 'Fertilizer', category: 'GARDENING', stackLimit: 50, description: 'Plant growth enhancer' },
  { id: 'filingcabinet', name: 'Filing Cabinet', category: 'FURNITURE', stackLimit: 10, description: 'Storage for documents' },
  { id: 'fingerlessgloves', name: 'Fingerless Gloves', category: 'CLOTHING', stackLimit: 20, description: 'Gloves with exposed fingertips' },
  { id: 'flannelshirt', name: 'Flannel Shirt', category: 'CLOTHING', stackLimit: 20, description: 'Warm patterned shirt' },
  { id: 'flashlight', name: 'Flashlight', category: 'TOOL', stackLimit: 10, description: 'Portable light source' },
  { id: 'flatcap', name: 'Flat Cap', category: 'CLOTHING', stackLimit: 20, description: 'Low profile hat' },
  { id: 'flats', name: 'Flats', category: 'CLOTHING', stackLimit: 20, description: 'Comfortable women\'s shoes' },
  { id: 'floorlamp', name: 'Floor Lamp', category: 'FURNITURE', stackLimit: 10, description: 'Standing light fixture' },
  { id: 'flumedicine', name: 'Flu Medicine', category: 'MEDICAL', stackLimit: 50, description: 'Treats cold symptoms' },
  { id: 'fryingpan', name: 'Frying Pan', category: 'TOOL', stackLimit: 10, description: 'Cooking implement' },
  { id: 'fullspectrumgrowlight', name: 'Full Spectrum Grow Light', category: 'EQUIPMENT', stackLimit: 10, description: 'Premium plant lighting' },
  { id: 'gasoline', name: 'Gasoline', category: 'CHEMICAL', stackLimit: 50, description: 'Fuel for engines' },
  { id: 'glass', name: 'Glass', category: 'MATERIAL', stackLimit: 100, description: 'Transparent material' },
  { id: 'gloves', name: 'Gloves', category: 'CLOTHING', stackLimit: 20, description: 'Hand coverings' },
  { id: 'goldbar', name: 'Gold Bar', category: 'VALUABLE', stackLimit: 50, description: 'Precious metal ingot' },
  { id: 'goldchain', name: 'Gold Chain', category: 'VALUABLE', stackLimit: 50, description: 'Valuable jewelry' },
  { id: 'goldenskateboard', name: 'Golden Skateboard', category: 'TRANSPORT', stackLimit: 1, description: 'Luxury transportation device' },
  { id: 'goldentoilet', name: 'Golden Toilet', category: 'FURNITURE', stackLimit: 1, description: 'Extremely fancy bathroom fixture' },
  { id: 'goldwatch', name: 'Gold Watch', category: 'VALUABLE', stackLimit: 10, description: 'Luxury timepiece' },
  { id: 'granddaddypurple', name: 'Granddaddy Purple', category: 'DRUG', stackLimit: 100, description: 'Premium cannabis strain' },
  { id: 'granddaddypurpleseed', name: 'Granddaddy Purple Seed', category: 'SEED', stackLimit: 100, description: 'Seeds for growing Granddaddy Purple' },
  { id: 'grandfatherclock', name: 'Grandfather Clock', category: 'FURNITURE', stackLimit: 5, description: 'Tall antique timepiece' },
  { id: 'greencrack', name: 'Green Crack', category: 'DRUG', stackLimit: 100, description: 'Energetic cannabis strain' },
  { id: 'greencrackseed', name: 'Green Crack Seed', category: 'SEED', stackLimit: 100, description: 'Seeds for growing Green Crack' },
  { id: 'growtent', name: 'Grow Tent', category: 'EQUIPMENT', stackLimit: 5, description: 'Enclosed growing environment' },
  { id: 'halogengrowlight', name: 'Halogen Grow Light', category: 'EQUIPMENT', stackLimit: 10, description: 'Plant lighting system' },
  { id: 'highqualitypseudo', name: 'High Quality Pseudo', category: 'CHEMICAL', stackLimit: 50, description: 'Premium chemical precursor' },
  { id: 'horsesemen', name: 'Horse Semen', category: 'MISC', stackLimit: 50, description: 'Breeding material' },
  { id: 'iodine', name: 'Iodine', category: 'CHEMICAL', stackLimit: 50, description: 'Chemical element used in medicine' },
  { id: 'jar', name: 'Jar', category: 'CONTAINER', stackLimit: 50, description: 'Glass storage container' },
  { id: 'jeans', name: 'Jeans', category: 'CLOTHING', stackLimit: 20, description: 'Denim pants' },
  { id: 'jorts', name: 'Jorts', category: 'CLOTHING', stackLimit: 20, description: 'Jean shorts' },
  { id: 'laboven', name: 'Lab Oven', category: 'EQUIPMENT', stackLimit: 5, description: 'Scientific heating device' },
  { id: 'largestoragerack', name: 'Large Storage Rack', category: 'FURNITURE', stackLimit: 5, description: 'Big storage solution' },
  { id: 'launderingstation', name: 'Laundering Station', category: 'EQUIPMENT', stackLimit: 5, description: 'Used for money laundering' },
  { id: 'ledgrowlight', name: 'LED Grow Light', category: 'EQUIPMENT', stackLimit: 10, description: 'Energy efficient plant lighting' },
  { id: 'legendsunglasses', name: 'Legend Sunglasses', category: 'CLOTHING', stackLimit: 10, description: 'Prestigious eyewear' },
  { id: 'lightweightskateboard', name: 'Lightweight Skateboard', category: 'TRANSPORT', stackLimit: 5, description: 'Easy to carry transportation' },
  { id: 'liquidbabyblue', name: 'Liquid Baby Blue', category: 'CHEMICAL', stackLimit: 50, description: 'Chemical in liquid form' },
  { id: 'liquidbikercrank', name: 'Liquid Biker Crank', category: 'CHEMICAL', stackLimit: 50, description: 'Dissolved stimulant' },
  { id: 'liquidglass', name: 'Liquid Glass', category: 'CHEMICAL', stackLimit: 50, description: 'Glass in liquid state' },
  { id: 'liquidmeth', name: 'Liquid Meth', category: 'DRUG', stackLimit: 50, description: 'Dissolved methamphetamine' },
  { id: 'longlifesoil', name: 'Long Life Soil', category: 'GARDENING', stackLimit: 50, description: 'Nutrient-rich growing medium' },
  { id: 'longskirt', name: 'Long Skirt', category: 'CLOTHING', stackLimit: 20, description: 'Floor-length garment' },
  { id: 'lowqualitypseudo', name: 'Low Quality Pseudo', category: 'CHEMICAL', stackLimit: 50, description: 'Basic chemical precursor' },
  { id: 'm1911', name: 'M1911', category: 'WEAPON', stackLimit: 5, description: 'Semi-automatic pistol' },
  { id: 'm1911mag', name: 'M1911 Mag', category: 'WEAPON', stackLimit: 20, description: 'Magazine for M1911 pistol' },
  { id: 'machete', name: 'Machete', category: 'WEAPON', stackLimit: 5, description: 'Large cutting blade' },
  { id: 'managementclipboard', name: 'Management Clipboard', category: 'TOOL', stackLimit: 10, description: 'For organizational tasks' },
  { id: 'mediumstoragerack', name: 'Medium Storage Rack', category: 'FURNITURE', stackLimit: 10, description: 'Mid-sized storage solution' },
  { id: 'megabean', name: 'Mega Bean', category: 'FOOD', stackLimit: 50, description: 'Oversized legume' },
  { id: 'metalsign', name: 'Metal Sign', category: 'DECORATION', stackLimit: 20, description: 'Durable signage' },
  { id: 'metalsquaretable', name: 'Metal Square Table', category: 'FURNITURE', stackLimit: 10, description: 'Sturdy table made of metal' },
  { id: 'meth', name: 'Meth', category: 'DRUG', stackLimit: 100, description: 'Crystalline stimulant' },
  { id: 'mixingstation', name: 'Mixing Station', category: 'EQUIPMENT', stackLimit: 5, description: 'For combining ingredients' },
  { id: 'mixingstationmk2', name: 'Mixing Station Mk2', category: 'EQUIPMENT', stackLimit: 5, description: 'Advanced mixing equipment' },
  { id: 'modernwalllamp', name: 'Modern Wall Lamp', category: 'FURNITURE', stackLimit: 10, description: 'Contemporary lighting fixture' },
  { id: 'moisturepreservingpot', name: 'Moisture Preserving Pot', category: 'GARDENING', stackLimit: 20, description: 'Maintains optimal plant hydration' },
  { id: 'motoroil', name: 'Motor Oil', category: 'CHEMICAL', stackLimit: 50, description: 'Engine lubricant' },
  { id: 'mouthwash', name: 'Mouthwash', category: 'HYGIENE', stackLimit: 50, description: 'Oral cleaning solution' },
  { id: 'ogkush', name: 'OG Kush', category: 'DRUG', stackLimit: 100, description: 'Classic cannabis strain' },
  { id: 'ogkushseed', name: 'OG Kush Seed', category: 'SEED', stackLimit: 100, description: 'Seeds for growing OG Kush' },
  { id: 'oldmanjimmys', name: 'Old Man Jimmys', category: 'MISC', stackLimit: 50, description: 'Unknown item with a colorful name' },
  { id: 'overalls', name: 'Overalls', category: 'CLOTHING', stackLimit: 20, description: 'Full-body work garment' },
  { id: 'packagingstation', name: 'Packaging Station', category: 'EQUIPMENT', stackLimit: 5, description: 'For preparing items for sale' },
  { id: 'packagingstationmk2', name: 'Packaging Station Mk2', category: 'EQUIPMENT', stackLimit: 5, description: 'Advanced packaging equipment' },
  { id: 'paracetamol', name: 'Paracetamol', category: 'MEDICAL', stackLimit: 50, description: 'Pain relief medication' },
  { id: 'pgr', name: 'PGR', category: 'CHEMICAL', stackLimit: 50, description: 'Plant growth regulator' },
  { id: 'phosphorus', name: 'Phosphorus', category: 'CHEMICAL', stackLimit: 50, description: 'Chemical element used in fertilizers' },
  { id: 'plasticpot', name: 'Plastic Pot', category: 'GARDENING', stackLimit: 50, description: 'Container for growing plants' },
  { id: 'porkpiehat', name: 'Porkpie Hat', category: 'CLOTHING', stackLimit: 20, description: 'Short-brimmed hat' },
  { id: 'potsprinkler', name: 'Pot Sprinkler', category: 'GARDENING', stackLimit: 20, description: 'Waters individual plants' },
  { id: 'pseudo', name: 'Pseudo', category: 'CHEMICAL', stackLimit: 50, description: 'Chemical precursor' },
  { id: 'rectangleframeglasses', name: 'Rectangle Frame Glasses', category: 'CLOTHING', stackLimit: 20, description: 'Geometric eyewear' },
  { id: 'revolver', name: 'Revolver', category: 'WEAPON', stackLimit: 5, description: 'Rotating cylinder firearm' },
  { id: 'revolvercylinder', name: 'Revolver Cylinder', category: 'WEAPON', stackLimit: 20, description: 'Ammunition component for revolver' },
  { id: 'rolledbuttonup', name: 'Rolled Button Up', category: 'CLOTHING', stackLimit: 20, description: 'Shirt with rolled sleeves' },
  { id: 'safe', name: 'Safe', category: 'FURNITURE', stackLimit: 5, description: 'Secure storage container' },
  { id: 'sandals', name: 'Sandals', category: 'CLOTHING', stackLimit: 20, description: 'Open footwear' },
  { id: 'saucepan', name: 'Saucepan', category: 'TOOL', stackLimit: 10, description: 'Cooking pot with handle' },
  { id: 'silverchain', name: 'Silver Chain', category: 'VALUABLE', stackLimit: 50, description: 'Jewelry made of silver' },
  { id: 'silverwatch', name: 'Silver Watch', category: 'VALUABLE', stackLimit: 20, description: 'Timepiece made of silver' },
  { id: 'skateboard', name: 'Skateboard', category: 'TRANSPORT', stackLimit: 5, description: 'Standard transportation board' },
  { id: 'skirt', name: 'Skirt', category: 'CLOTHING', stackLimit: 20, description: 'Lower body garment' },
  { id: 'smallroundglasses', name: 'Small Round Glasses', category: 'CLOTHING', stackLimit: 20, description: 'Circular eyewear' },
  { id: 'smallstoragerack', name: 'Small Storage Rack', category: 'FURNITURE', stackLimit: 20, description: 'Compact storage solution' },
  { id: 'smalltrashcan', name: 'Small Trash Can', category: 'CONTAINER', stackLimit: 20, description: 'Waste disposal bin' },
  { id: 'sneakers', name: 'Sneakers', category: 'CLOTHING', stackLimit: 20, description: 'Athletic footwear' },
  { id: 'soil', name: 'Soil', category: 'GARDENING', stackLimit: 100, description: 'Basic growing medium' },
  { id: 'soilpourer', name: 'Soil Pourer', category: 'TOOL', stackLimit: 10, description: 'Used to distribute soil' },
  { id: 'sourdiesel', name: 'Sour Diesel', category: 'DRUG', stackLimit: 100, description: 'Energetic cannabis strain' },
  { id: 'sourdieselseed', name: 'Sour Diesel Seed', category: 'SEED', stackLimit: 100, description: 'Seeds for growing Sour Diesel' },
  { id: 'speeddealershades', name: 'Speed Dealer Shades', category: 'CLOTHING', stackLimit: 20, description: 'Distinctive sunglasses' },
  { id: 'speedgrow', name: 'Speed Grow', category: 'GARDENING', stackLimit: 50, description: 'Plant growth accelerator' },
  { id: 'suspensionrack', name: 'Suspension Rack', category: 'FURNITURE', stackLimit: 10, description: 'Hanging storage solution' },
  { id: 'tacticalvest', name: 'Tactical Vest', category: 'CLOTHING', stackLimit: 10, description: 'Utility garment with many pockets' },
  { id: 'testweed', name: 'Test Weed', category: 'DRUG', stackLimit: 100, description: 'Sample cannabis for testing' },
  { id: 'toilet', name: 'Toilet', category: 'FURNITURE', stackLimit: 5, description: 'Bathroom fixture' },
  { id: 'trashbag', name: 'Trash Bag', category: 'CONTAINER', stackLimit: 50, description: 'Waste collection sack' },
  { id: 'trashcan', name: 'Trash Can', category: 'CONTAINER', stackLimit: 10, description: 'Waste disposal container' },
  { id: 'trashgrabber', name: 'Trash Grabber', category: 'TOOL', stackLimit: 10, description: 'Tool for picking up litter' },
  { id: 'trimmers', name: 'Trimmers', category: 'TOOL', stackLimit: 10, description: 'Manual cutting tool' },
  { id: 'tshirt', name: 'T-Shirt', category: 'CLOTHING', stackLimit: 20, description: 'Casual short-sleeved shirt' },
  { id: 'TV', name: 'TV', category: 'ELECTRONICS', stackLimit: 5, description: 'Television set' },
  { id: 'vest', name: 'Vest', category: 'CLOTHING', stackLimit: 20, description: 'Sleeveless garment' },
  { id: 'viagra', name: 'Viagra', category: 'MEDICAL', stackLimit: 50, description: 'Medication for ED' },
  { id: 'vneck', name: 'V-Neck', category: 'CLOTHING', stackLimit: 20, description: 'Shirt with V-shaped neckline' },
  { id: 'wallclock', name: 'Wall Clock', category: 'FURNITURE', stackLimit: 10, description: 'Time-keeping wall fixture' },
  { id: 'wallmountedshelf', name: 'Wall Mounted Shelf', category: 'FURNITURE', stackLimit: 20, description: 'Storage attached to wall' },
  { id: 'wateringcan', name: 'Watering Can', category: 'TOOL', stackLimit: 10, description: 'Used to water plants' },
  { id: 'woodensign', name: 'Wooden Sign', category: 'DECORATION', stackLimit: 20, description: 'Sign made of wood' },
  { id: 'woodsquaretable', name: 'Wood Square Table', category: 'FURNITURE', stackLimit: 10, description: 'Table made of wood' }
])

const searchQuery = ref('')
const selectedCategory = ref('ALL')

const categories = computed(() => {
  const uniqueCategories = new Set(['ALL'])
  items.value.forEach(item => uniqueCategories.add(item.category))
  return Array.from(uniqueCategories)
})

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesSearch = searchQuery.value === '' || 
      item.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = selectedCategory.value === 'ALL' || item.category === selectedCategory.value
    
    return matchesSearch && matchesCategory
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
    <label for="category-filter">Filter by category:</label>
    <select v-model="selectedCategory" id="category-filter">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</div>

<table class="database-table">
  <thead>
    <tr>
      <th>Item ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Stack Limit</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in filteredItems" :key="item.id">
      <td class="id-cell" @click="copyToClipboard(item.id)">{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.category }}</td>
      <td>{{ item.stackLimit }}</td>
      <td>{{ item.description }}</td>
    </tr>
    <tr v-if="filteredItems.length === 0">
      <td colspan="5" class="no-results">No items match your search criteria</td>
    </tr>
  </tbody>
</table>

## Example Usage

```lua
-- Check if player has an item
if HasItem("health_kit") then
  Log("Player has a health kit")
  
  -- Get the quantity
  local quantity = GetItemQuantity("health_kit")
  Log("Player has " .. quantity .. " health kits")
  
  -- Use the item
  if RemoveItem("health_kit", 1) then
    Log("Used a health kit")
    -- Add health to player or other effects
  end
end

-- Add an item to player inventory
if AddItem("food_sandwich", 1) then
  Log("Added a sandwich to inventory")
  ShowNotification("You got a sandwich!")
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
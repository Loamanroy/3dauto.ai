const API_BASE = 'http://localhost:5000/api'

export interface Part {
  id: number
  name: string
  oem: string
  price: number
  image: string
  category: string
  compatibility: string
  inStock: boolean
  hasGuide: boolean
  description?: string
  specifications?: Record<string, string>
  alternatives?: Part[]
}

const mockParts: Part[] = [
  {
    id: 1,
    name: "Свечи зажигания NGK",
    oem: "1234567890",
    price: 45.99,
    image: "/api/placeholder/200/200",
    category: "Зажигание",
    compatibility: "Ford Focus III 2011-2018",
    inStock: true,
    hasGuide: true,
    description: "Высококачественные свечи зажигания NGK для Ford Focus III",
    specifications: {
      "Тип": "Иридиевые",
      "Зазор": "0.8мм",
      "Резьба": "M14x1.25"
    }
  },
  {
    id: 2,
    name: "Лампа H7 Philips",
    oem: "0987654321", 
    price: 12.50,
    image: "/api/placeholder/200/200",
    category: "Освещение",
    compatibility: "Ford Focus III 2011-2018",
    inStock: true,
    hasGuide: true
  },
  {
    id: 3,
    name: "Термостат Wahler",
    oem: "1122334455",
    price: 89.99,
    image: "/api/placeholder/200/200", 
    category: "Охлаждение",
    compatibility: "Ford Focus III 2011-2018",
    inStock: false,
    hasGuide: true
  }
]

export async function getParts(): Promise<Part[]> {
  try {
    const response = await fetch(`${API_BASE}/parts`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  return mockParts
}

export async function getPartById(id: number): Promise<Part | null> {
  try {
    const response = await fetch(`${API_BASE}/parts/${id}`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  return mockParts.find(part => part.id === id) || null
}

export async function searchParts(query: string, category?: string): Promise<Part[]> {
  try {
    const params = new URLSearchParams()
    if (query) params.append('q', query)
    if (category) params.append('category', category)
    
    const response = await fetch(`${API_BASE}/parts/search?${params}`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  return mockParts.filter(part => {
    const matchesQuery = !query || 
      part.name.toLowerCase().includes(query.toLowerCase()) ||
      part.oem.includes(query)
    const matchesCategory = !category || category === 'Все' || part.category === category
    return matchesQuery && matchesCategory
  })
}

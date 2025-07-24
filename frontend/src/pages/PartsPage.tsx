import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ShoppingCart, Eye } from 'lucide-react'

const parts = [
  {
    id: 1,
    name: "Свечи зажигания NGK",
    oem: "1234567890",
    price: 45.99,
    image: "/api/placeholder/200/200",
    category: "Зажигание",
    compatibility: "Ford Focus III 2011-2018",
    inStock: true,
    hasGuide: true
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
  },
  {
    id: 4,
    name: "Масляный фильтр Mann",
    oem: "5566778899",
    price: 15.75,
    image: "/api/placeholder/200/200",
    category: "Фильтры",
    compatibility: "Ford Focus III 2011-2018",
    inStock: true,
    hasGuide: false
  }
]

const categories = ["Все", "Зажигание", "Освещение", "Охлаждение", "Фильтры"]

export function PartsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [showFilters, setShowFilters] = useState(false)

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.oem.includes(searchTerm)
    const matchesCategory = selectedCategory === 'Все' || part.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Каталог запчастей
        </h1>
        <p className="text-gray-600">
          Найдите нужные запчасти с инструкциями по установке
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию, OEM номеру или VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Фильтры
          </button>
        </div>

        {showFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Автомобиль
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Все модели</option>
                  <option>Ford Focus III</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Наличие
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Все товары</option>
                  <option>В наличии</option>
                  <option>Под заказ</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredParts.map(part => (
          <div key={part.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Фото</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                {part.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                OEM: {part.oem}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {part.compatibility}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900">
                  €{part.price}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  part.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {part.inStock ? 'В наличии' : 'Под заказ'}
                </span>
              </div>

              <div className="flex gap-2">
                {part.hasGuide && (
                  <Link
                    to={`/guide/Ford/Focus III/2015/spark-plugs`}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Гайд
                  </Link>
                )}
                <Link
                  to={`/product/${part.id}`}
                  className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingCart className="h-4 w-4" />
                  В корзину
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredParts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Запчасти не найдены. Попробуйте изменить параметры поиска.
          </p>
        </div>
      )}
    </div>
  )
}

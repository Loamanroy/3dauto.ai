import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Eye, Star, Truck, Shield, ArrowLeft } from 'lucide-react'

const productData = {
  1: {
    name: "Свечи зажигания NGK LZKAR6AP-11",
    oem: "1234567890",
    price: 45.99,
    images: ["/api/placeholder/400/400", "/api/placeholder/400/400"],
    category: "Зажигание",
    compatibility: "Ford Focus III 2011-2018",
    inStock: true,
    hasGuide: true,
    description: "Высококачественные свечи зажигания NGK с иридиевым электродом. Обеспечивают стабильное зажигание и увеличенный ресурс работы.",
    specifications: {
      "Тип электрода": "Иридий",
      "Зазор": "1.1 мм",
      "Резьба": "M14x1.25",
      "Длина резьбы": "19 мм",
      "Ключ": "16 мм"
    },
    alternatives: [
      { brand: "Bosch", partNumber: "FR7DC+", price: 42.99 },
      { brand: "Denso", partNumber: "IK20", price: 48.50 }
    ],
    reviews: [
      { author: "Михаил К.", rating: 5, text: "Отличные свечи, двигатель работает ровно" },
      { author: "Анна С.", rating: 4, text: "Хорошее качество, быстрая доставка" }
    ]
  }
}

export function ProductPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const product = productData[id as '1']
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Товар не найден</h1>
        <Link to="/parts" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Вернуться к каталогу
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        to="/parts" 
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Назад к каталогу
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-80 h-80 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Фото товара</span>
            </div>
          </div>
          <div className="flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 bg-gray-200 rounded border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                <span className="text-xs text-gray-500">{index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600">(2 отзыва)</span>
            </div>
            <span className={`px-3 py-1 rounded text-sm ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'В наличии' : 'Под заказ'}
            </span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">€{product.price}</span>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">OEM номер:</span> {product.oem}
              </div>
              <div>
                <span className="font-medium">Категория:</span> {product.category}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Совместимость:</span> {product.compatibility}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <span className="text-gray-600">шт.</span>
          </div>

          <div className="flex gap-4 mb-8">
            {product.hasGuide && (
              <Link
                to="/guide/Ford/Focus III/2015/spark-plugs"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="h-5 w-5" />
                Перейти в 3D-гид
              </Link>
            )}
            <button className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Добавить в корзину
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="h-4 w-4" />
              Доставка 2-3 дня
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="h-4 w-4" />
              Гарантия 2 года
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Технические характеристики
          </h2>
          <div className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Аналоги
          </h2>
          <div className="space-y-3">
            {product.alternatives.map((alt, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">{alt.brand}</div>
                  <div className="text-sm text-gray-600">{alt.partNumber}</div>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  €{alt.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Отзывы покупателей
        </h2>
        <div className="space-y-4">
          {product.reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-900">{review.author}</span>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

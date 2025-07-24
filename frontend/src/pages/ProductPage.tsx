import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ShoppingCart, Eye, Star, Truck, Shield, ArrowLeft } from 'lucide-react'
import { getPartById, Part } from '../api/parts'
import { addToCart } from '../api/cart'


export function ProductPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Part | null>(null)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [addToCartSuccess, setAddToCartSuccess] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const data = await getPartById(Number(id))
        setProduct(data)
      } catch (error) {
        console.error('Failed to load product:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      loadProduct()
    }
  }, [id])

  const handleAddToCart = async () => {
    if (!product) return
    
    try {
      setAddingToCart(true)
      await addToCart(product.id, quantity)
      setAddToCartSuccess(true)
      setTimeout(() => setAddToCartSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setAddingToCart(false)
    }
  }
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Загрузка товара...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Товар не найден</p>
          <Link 
            to="/parts" 
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к каталогу
          </Link>
        </div>
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

      {addToCartSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">✅ Товар добавлен в корзину!</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-80 h-80 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Фото товара</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedImage(0)}
              className={`w-16 h-16 bg-gray-200 rounded border-2 ${
                selectedImage === 0 ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <span className="text-xs text-gray-500">1</span>
            </button>
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
            {searchParams.get('oem') && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  Вы перешли из гайда для OEM: {searchParams.get('oem')}
                </p>
              </div>
            )}
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
            <button 
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart className="h-5 w-5" />
              {addingToCart ? 'Добавление...' : 'Добавить в корзину'}
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
            {product.specifications ? Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            )) : (
              <p className="text-gray-500">Технические характеристики не указаны</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Аналоги
          </h2>
          <div className="space-y-3">
            {product.alternatives ? product.alternatives.map((alt, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-900">{alt.name}</div>
                  <div className="text-sm text-gray-600">{alt.oem}</div>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  €{alt.price}
                </div>
              </div>
            )) : (
              <p className="text-gray-500">Аналоги не найдены</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Отзывы покупателей
        </h2>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-900">Михаил К.</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600">Отличные свечи, двигатель работает ровно</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-900">Анна С.</span>
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600">Хорошее качество, быстрая доставка</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react'

const cartItems = [
  {
    id: 1,
    name: "Свечи зажигания NGK",
    oem: "1234567890",
    price: 45.99,
    quantity: 4,
    image: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Лампа H7 Philips",
    oem: "0987654321",
    price: 12.50,
    quantity: 2,
    image: "/api/placeholder/100/100"
  }
]

const subscriptionPlans = [
  {
    id: 'monthly',
    name: 'Месячная подписка',
    price: 10,
    period: 'месяц',
    features: [
      'Доступ ко всем 3D-гайдам',
      'Скачивание PDF инструкций',
      'Техническая поддержка',
      'Новые гайды каждый месяц'
    ]
  },
  {
    id: 'yearly',
    name: 'Годовая подписка',
    price: 100,
    period: 'год',
    features: [
      'Доступ ко всем 3D-гайдам',
      'Скачивание PDF инструкций',
      'Техническая поддержка',
      'Новые гайды каждый месяц',
      'Скидка 17%'
    ],
    popular: true
  }
]

export function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [purchaseType, setPurchaseType] = useState<'parts' | 'subscription'>('parts')

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter(item => item.id !== id))
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  const selectedSubscription = subscriptionPlans.find(plan => plan.id === selectedPlan)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        to="/parts" 
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Продолжить покупки
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setPurchaseType('parts')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  purchaseType === 'parts'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Запчасти
              </button>
              <button
                onClick={() => setPurchaseType('subscription')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  purchaseType === 'subscription'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Подписка
              </button>
            </div>

            {purchaseType === 'parts' ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Товары в корзине
                </h2>
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Корзина пуста</p>
                    <Link 
                      to="/parts"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Перейти к покупкам
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Фото</span>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">OEM: {item.oem}</p>
                          <p className="text-lg font-bold text-gray-900">€{item.price}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => updateQuantity(item.id, 0)}
                            className="text-red-600 hover:text-red-700 mt-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Выберите план подписки
                </h2>
                <div className="space-y-4">
                  {subscriptionPlans.map(plan => (
                    <div
                      key={plan.id}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-colors relative ${
                        selectedPlan === plan.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Популярный
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                          <p className="text-2xl font-bold text-gray-900">
                            €{plan.price}
                            <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                          </p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPlan === plan.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedPlan === plan.id && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Итого
            </h2>
            
            {purchaseType === 'parts' ? (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары</span>
                  <span className="font-medium">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Бесплатно' : `€${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-green-600">
                    Бесплатная доставка при заказе от €50
                  </p>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">{selectedSubscription?.name}</span>
                  <span className="font-medium">€{selectedSubscription?.price}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого</span>
                    <span>€{selectedSubscription?.price}</span>
                  </div>
                </div>
              </div>
            )}

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <CreditCard className="h-5 w-5" />
              Оформить заказ
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Безопасная оплата через Stripe
              </p>
            </div>

            {purchaseType === 'subscription' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  После оплаты вы получите полный доступ ко всем 3D-гайдам и сможете скачивать PDF инструкции.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

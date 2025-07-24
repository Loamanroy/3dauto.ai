import { Link } from 'react-router-dom'
import { ArrowRight, Wrench, Eye, Clock } from 'lucide-react'

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Интерактивные 3D-гайды по ремонту авто
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Изучайте ремонт автомобилей с помощью интерактивных 3D-моделей. 
          Пошаговые инструкции, точные моменты затяжки и визуализация каждого этапа.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/cars"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Выбрать автомобиль
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link 
            to="/parts"
            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            Каталог запчастей
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">3D Визуализация</h3>
          <p className="text-gray-600">
            Интерактивные 3D-модели узлов автомобиля с подсветкой деталей
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Пошаговые инструкции</h3>
          <p className="text-gray-600">
            Детальные гайды с указанием инструментов и моментов затяжки
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Экономия времени</h3>
          <p className="text-gray-600">
            Быстрое изучение процедур ремонта без ошибок
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Доступные процедуры
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Замена свечей зажигания</h3>
            <p className="text-gray-600 text-sm">Пошаговая замена свечей с 3D-визуализацией</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Замена лампочек в фарах</h3>
            <p className="text-gray-600 text-sm">Доступ к фарам и замена ламп</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Замена термостата</h3>
            <p className="text-gray-600 text-sm">Снятие и установка термостата системы охлаждения</p>
          </div>
        </div>
      </div>
    </div>
  )
}

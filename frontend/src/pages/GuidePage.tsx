import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Download, Wrench, Clock, ShoppingCart } from 'lucide-react'
import EngineModel from '../components/EngineModel'
import { useGuideData } from '../hooks/useGuideData.ts'

const sparkPlugSteps = [
  {
    id: 1,
    title: "Подготовка",
    description: "Убедитесь, что двигатель остыл. Отключите аккумулятор.",
    tools: ["Ключ на 10мм", "Отвертка"],
    torque: null,
    highlight: "battery"
  },
  {
    id: 2,
    title: "Снятие декоративной крышки",
    description: "Снимите пластиковую крышку двигателя, открутив 4 болта.",
    tools: ["Ключ на 10мм"],
    torque: null,
    highlight: "cover"
  },
  {
    id: 3,
    title: "Отключение катушек зажигания",
    description: "Отсоедините разъемы катушек зажигания и выкрутите болты крепления.",
    tools: ["Ключ на 8мм"],
    torque: null,
    highlight: "coils"
  },
  {
    id: 4,
    title: "Выкручивание старых свечей",
    description: "Используйте свечной ключ для выкручивания старых свечей зажигания.",
    tools: ["Свечной ключ 16мм"],
    torque: null,
    highlight: "sparkplugs"
  },
  {
    id: 5,
    title: "Установка новых свечей",
    description: "Вкрутите новые свечи с правильным моментом затяжки.",
    tools: ["Свечной ключ 16мм", "Динамометрический ключ"],
    torque: "25 Нм",
    highlight: "sparkplugs"
  },
  {
    id: 6,
    title: "Сборка в обратном порядке",
    description: "Установите катушки зажигания и декоративную крышку.",
    tools: ["Ключ на 8мм", "Ключ на 10мм"],
    torque: "8 Нм (катушки), 5 Нм (крышка)",
    highlight: "assembly"
  }
]


export function GuidePage() {
  const { make, model, year, procedure } = useParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  
  const { guideData, loading, error } = useGuideData(
    make || 'Ford', 
    model?.replace('%20', ' ') || 'Focus III', 
    year || '2015', 
    procedure || 'spark-plugs'
  )

  const steps = guideData?.steps || sparkPlugSteps
  const currentStepData = steps[currentStep]
  const highlightPart = hoveredStep !== null ? steps[hoveredStep].highlight : currentStepData?.highlight || 'engine'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {make} {model?.replace('%20', ' ')} {year} - {guideData?.title || 'Замена свечей зажигания'}
        </h1>
        <p className="text-gray-600">
          Пошаговая инструкция с 3D-визуализацией
        </p>
        {error && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Пошаговые инструкции
          </h2>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Загрузка гайда...</p>
              </div>
            ) : (
              steps.map((step: any, index: number) => (
              <div
                key={step.id || index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  index === currentStep
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setCurrentStep(index)}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index === currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {guideData?.tools?.map((tool: string, i: number) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded">
                          {tool}
                        </span>
                      )) || step.tools?.map((tool: string, i: number) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                      {step.torque && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-medium">
                          {step.torque}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            3D-модель двигателя
          </h2>
          <div className="h-96 bg-gray-100 rounded-lg border-2 border-gray-200">
            <EngineModel highlightPart={highlightPart} />
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Шаг {currentStep + 1}: {currentStepData?.title}
            </h3>
            <p className="text-blue-800 text-sm">
              {currentStepData?.description}
            </p>
            <div className="mt-3">
              <Link
                to="/product/1?oem=1234567890"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                Купить запчасть
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Инструменты и моменты затяжки
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4">Инструмент</th>
                <th className="text-left py-2 px-4">Применение</th>
                <th className="text-left py-2 px-4">Момент затяжки</th>
              </tr>
            </thead>
            <tbody>
              {guideData?.tools?.map((tool: string, index: number) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 px-4 flex items-center">
                    <Wrench className="h-4 w-4 mr-2 text-gray-500" />
                    {tool}
                  </td>
                  <td className="py-2 px-4">
                    {Object.keys(guideData.torqueSpecs)[index] || 'Общее применение'}
                  </td>
                  <td className="py-2 px-4 font-semibold text-red-600">
                    {Object.values(guideData.torqueSpecs || {})[index] as string || '-'}
                  </td>
                </tr>
              )) || (
                <>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 flex items-center">
                      <Wrench className="h-4 w-4 mr-2 text-gray-500" />
                      Свечной ключ 16мм
                    </td>
                    <td className="py-2 px-4">Свечи зажигания</td>
                    <td className="py-2 px-4 font-semibold text-red-600">25 Нм</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 flex items-center">
                      <Wrench className="h-4 w-4 mr-2 text-gray-500" />
                      Ключ на 8мм
                    </td>
                    <td className="py-2 px-4">Катушки зажигания</td>
                    <td className="py-2 px-4 font-semibold text-red-600">8 Нм</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 flex items-center">
                      <Wrench className="h-4 w-4 mr-2 text-gray-500" />
                      Ключ на 10мм
                    </td>
                    <td className="py-2 px-4">Декоративная крышка</td>
                    <td className="py-2 px-4 font-semibold text-red-600">5 Нм</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            Примерное время: 30 минут
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Скачать PDF
          </button>
        </div>
      </div>
    </div>
  )
}

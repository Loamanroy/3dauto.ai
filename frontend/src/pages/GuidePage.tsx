import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Download, Wrench, Clock } from 'lucide-react'

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

function EngineModel({ highlightPart }: { highlightPart: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent"></div>
      <div className={`relative z-10 w-48 h-32 rounded-lg flex items-center justify-center text-white font-semibold shadow-lg transition-all duration-300 ${
        highlightPart === 'sparkplugs' 
          ? 'bg-gradient-to-br from-red-400 to-red-600 scale-110 shadow-red-300/50' 
          : 'bg-gradient-to-br from-gray-600 to-gray-800'
      }`}>
        <div className="text-center">
          <div className="text-lg font-bold">3D Engine Model</div>
          <div className="text-sm opacity-80">
            {highlightPart === 'sparkplugs' ? 'Spark Plugs Highlighted' : 'Interactive View'}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
        Click steps to highlight parts
      </div>
    </div>
  )
}

export function GuidePage() {
  const { make, model, year } = useParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const currentStepData = sparkPlugSteps[currentStep]
  const highlightPart = hoveredStep !== null ? sparkPlugSteps[hoveredStep].highlight : currentStepData.highlight

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {make} {model} {year} - Замена свечей зажигания
        </h1>
        <p className="text-gray-600">
          Пошаговая инструкция с 3D-визуализацией
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Пошаговые инструкции
          </h2>
          <div className="space-y-4">
            {sparkPlugSteps.map((step, index) => (
              <div
                key={step.id}
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
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {step.tools.map((tool, i) => (
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
            ))}
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
              Шаг {currentStepData.id}: {currentStepData.title}
            </h3>
            <p className="text-blue-800 text-sm">
              {currentStepData.description}
            </p>
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

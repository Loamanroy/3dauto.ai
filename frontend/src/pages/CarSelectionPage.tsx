import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const carData = {
  Ford: {
    'Focus III': ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
  },
  Volkswagen: {
    'Golf VII': ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
  },
  BMW: {
    '3 Series F30': ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
  }
}

const procedures = [
  { id: 'spark-plugs', name: 'Замена свечей зажигания', duration: '30 мин' },
  { id: 'headlight-bulbs', name: 'Замена лампочек в фарах', duration: '15 мин' },
  { id: 'thermostat', name: 'Замена термостата', duration: '60 мин' }
]

export function CarSelectionPage() {
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const navigate = useNavigate()

  const makes = Object.keys(carData)
  const models = selectedMake ? Object.keys(carData[selectedMake as keyof typeof carData]) : []
  const years = selectedMake && selectedModel ? carData[selectedMake as keyof typeof carData][selectedModel as keyof typeof carData[keyof typeof carData]] : []

  const handleProcedureSelect = (procedureId: string) => {
    if (selectedMake && selectedModel && selectedYear) {
      navigate(`/guide/${selectedMake}/${selectedModel}/${selectedYear}/${procedureId}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Выберите ваш автомобиль
        </h1>
        <p className="text-lg text-gray-600">
          Укажите марку, модель и год выпуска для доступа к инструкциям по ремонту
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Марка
            </label>
            <div className="relative">
              <select
                value={selectedMake}
                onChange={(e) => {
                  setSelectedMake(e.target.value)
                  setSelectedModel('')
                  setSelectedYear('')
                }}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Выберите марку</option>
                {makes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Модель
            </label>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value)
                  setSelectedYear('')
                }}
                disabled={!selectedMake}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Выберите модель</option>
                {models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Год
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                disabled={!selectedModel}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Выберите год</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {selectedMake && selectedModel && selectedYear && (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Доступные процедуры для {selectedMake} {selectedModel} {selectedYear}
          </h2>
          <div className="grid gap-4">
            {procedures.map(procedure => (
              <div
                key={procedure.id}
                onClick={() => handleProcedureSelect(procedure.id)}
                className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {procedure.name}
                    </h3>
                    <p className="text-gray-600">
                      Примерное время: {procedure.duration}
                    </p>
                  </div>
                  <div className="text-blue-600 font-medium">
                    Открыть гайд →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

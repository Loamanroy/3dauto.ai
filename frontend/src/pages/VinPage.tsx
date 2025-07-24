import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Car, Wrench, Eye, AlertCircle } from 'lucide-react'
import { getVinInfo, validateVin, VinResponse } from '../api/vin'
import EngineModel from '../components/EngineModel'

export function VinPage() {
  const [vin, setVin] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VinResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateVin(vin)) {
      setError('Неверный формат VIN. VIN должен содержать 17 символов.')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const vinInfo = await getVinInfo(vin.toUpperCase())
      if (vinInfo) {
        setResult(vinInfo)
      } else {
        setError('VIN не найден в базе данных.')
      }
    } catch (err) {
      setError('Ошибка при получении данных. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setVin('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          VIN-декодер
        </h1>
        <p className="text-gray-600">
          Введите VIN-номер автомобиля для получения информации и доступа к 3D-моделям
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
              VIN-номер (17 символов)
            </label>
            <div className="relative">
              <input
                type="text"
                id="vin"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="WFAFXXGCDXGJ12345"
                maxLength={17}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg"
              />
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Пример: WFAFXXGCDXGJ12345, WFAFXXGCDXGJ54321, WVWZZZ1KZXW123456
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || vin.length !== 17}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Проверяем...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Проверить VIN
                </>
              )}
            </button>
            
            {(result || error) && (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Очистить
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>

      {result && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Car className="h-6 w-6 text-blue-600" />
              Информация об автомобиле
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Марка:</span>
                <span className="font-semibold text-gray-900">{result.make}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Модель:</span>
                <span className="font-semibold text-gray-900">{result.model}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Год:</span>
                <span className="font-semibold text-gray-900">{result.year}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Двигатель:</span>
                <span className="font-semibold text-gray-900">{result.engine}</span>
              </div>
            </div>

            {result.guideId && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  to={`/guide/${result.make}/${result.model}/${result.year}/spark-plugs`}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="h-5 w-5" />
                  Открыть гайд
                </Link>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Доступны инструкции по ремонту для этого автомобиля
                </p>
              </div>
            )}
          </div>

          {result.glbModelPath && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Wrench className="h-6 w-6 text-blue-600" />
                3D-модель двигателя
              </h2>
              <div className="h-96 bg-gray-50 rounded-lg border border-gray-200">
                <EngineModel highlightPart="engine" />
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Двигатель:</strong> {result.engine}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Интерактивная 3D-модель с возможностью вращения и масштабирования
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {result && !result.glbModelPath && !result.guideId && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="text-yellow-800">
              Для данного автомобиля пока недоступны 3D-модели и гайды по ремонту.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

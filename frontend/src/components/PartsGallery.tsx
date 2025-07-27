import { useState, useEffect } from 'react'
import { AlertCircle, Package } from 'lucide-react'
import { getLaximoParts, LaximoPart } from '../api/parts'
import { PartsItem } from './PartsItem'

interface PartsGalleryProps {
  catalogCode?: string
  unitId?: string
  vin?: string
  make?: string
  model?: string
  year?: string
}

export function PartsGallery({ 
  catalogCode = "PSA_P202311", 
  unitId = "1724523522", 
  vin,
  make,
  model,
  year 
}: PartsGalleryProps) {
  const [parts, setParts] = useState<LaximoPart[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadParts()
  }, [catalogCode, unitId, vin])

  const loadParts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const partsData = await getLaximoParts(catalogCode, unitId, vin)
      setParts(partsData)
    } catch (err) {
      setError('Ошибка загрузки запчастей')
      console.error('Parts loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBuyClick = (part: LaximoPart) => {
    window.location.href = `/product/1?oem=${part.oem}`
  }

  const handleViewCatalog = (part: LaximoPart) => {
    window.open(`https://catalog.laximo.ru/part/${part.unitId}`, '_blank')
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Загрузка запчастей...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={loadParts}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    )
  }

  if (parts.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Запчасти недоступны</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {parts.map((part) => (
        <PartsItem
          key={part.unitId}
          part={part}
          onBuyClick={handleBuyClick}
          onViewCatalog={handleViewCatalog}
        />
      ))}
    </div>
  )
}

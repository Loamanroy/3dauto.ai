import { ShoppingCart, ExternalLink } from 'lucide-react'
import { LaximoPart } from '../api/parts'

interface PartsItemProps {
  part: LaximoPart
  onBuyClick?: (part: LaximoPart) => void
  onViewCatalog?: (part: LaximoPart) => void
}

export function PartsItem({ part, onBuyClick, onViewCatalog }: PartsItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={part.imageUrl}
          alt={part.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/api/placeholder/200/200'
          }}
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
          {part.name}
        </h3>
        
        <p className="text-xs text-gray-600">
          OEM: <span className="font-mono">{part.oem}</span>
        </p>
        
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onBuyClick?.(part)}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs flex items-center justify-center gap-1"
          >
            <ShoppingCart className="h-3 w-3" />
            Купить
          </button>
          
          <button
            onClick={() => onViewCatalog?.(part)}
            className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs flex items-center justify-center"
          >
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

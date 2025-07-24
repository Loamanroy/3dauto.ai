import { useState, useEffect } from 'react'

interface EngineModelProps {
  highlightPart: string
}

export function EngineModel({ highlightPart }: EngineModelProps) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const getPartStyle = (partName: string) => {
    const isHighlighted = highlightPart === partName
    return {
      backgroundColor: isHighlighted ? '#ff6b6b' : '#888888',
      boxShadow: isHighlighted ? '0 0 20px rgba(255, 107, 107, 0.6)' : '0 2px 4px rgba(0,0,0,0.1)',
      transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
      transition: 'all 0.3s ease'
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          transform: `perspective(800px) rotateY(${rotation * 0.5}deg) rotateX(10deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Engine block */}
        <div 
          className="absolute rounded-lg"
          style={{
            width: '120px',
            height: '80px',
            ...getPartStyle('engine'),
            transform: 'translateZ(0px)'
          }}
        />
        
        {/* Spark plugs */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '12px',
            height: '40px',
            ...getPartStyle('sparkplugs'),
            transform: 'translateY(-50px) translateZ(10px)',
            borderRadius: '6px'
          }}
        />
        
        {/* Ignition coils */}
        <div 
          className="absolute rounded"
          style={{
            width: '20px',
            height: '30px',
            ...getPartStyle('coils'),
            transform: 'translateY(-70px) translateZ(15px)'
          }}
        />
        
        {/* Engine cover */}
        <div 
          className="absolute rounded-lg"
          style={{
            width: '140px',
            height: '15px',
            ...getPartStyle('cover'),
            transform: 'translateY(-90px) translateZ(20px)'
          }}
        />
        
        {/* Battery */}
        <div 
          className="absolute rounded"
          style={{
            width: '40px',
            height: '30px',
            ...getPartStyle('battery'),
            transform: 'translateX(100px) translateY(20px) translateZ(5px)'
          }}
        />
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
        {highlightPart === 'sparkplugs' && 'Свечи зажигания выделены'}
        {highlightPart === 'coils' && 'Катушки зажигания выделены'}
        {highlightPart === 'cover' && 'Крышка двигателя выделена'}
        {highlightPart === 'battery' && 'Аккумулятор выделен'}
        {!['sparkplugs', 'coils', 'cover', 'battery'].includes(highlightPart) && 'Интерактивная 3D модель'}
      </div>
      
      <div className="absolute top-4 left-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        CSS 3D Engine Model
      </div>
    </div>
  )
}

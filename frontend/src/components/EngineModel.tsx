import { useRef, useEffect } from 'react'

interface EngineModelProps {
  highlightPart: string
}

function FallbackModel({ highlightPart }: { highlightPart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const engineGroup = container.querySelector('.engine-group') as HTMLElement
      if (engineGroup) {
        let rotation = 0
        const animate = () => {
          rotation += 0.005
          engineGroup.style.transform = `rotateX(-15deg) rotateY(${rotation}rad) scale(0.8)`
          requestAnimationFrame(animate)
        }
        animate()
      }
    }
  }, [])

  const getPartStyle = (partName: string) => {
    const isHighlighted = highlightPart === partName
    return {
      backgroundColor: isHighlighted ? '#ff6b6b' : '#888888',
      boxShadow: isHighlighted ? '0 0 20px #ff6b6b, inset 0 0 20px rgba(255, 107, 107, 0.3)' : 'none',
      filter: isHighlighted ? 'brightness(1.2)' : 'none',
      transition: 'all 0.3s ease'
    }
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="flex items-center justify-center h-full">
        <div 
          className="engine-group relative"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-15deg) rotateY(0deg) scale(0.8)'
          }}
        >
          <div
            className="absolute rounded-lg shadow-lg"
            style={{
              width: '120px',
              height: '80px',
              ...getPartStyle('engine'),
              transform: 'translateZ(0px)'
            }}
          />
          
          <div
            className="absolute rounded-full shadow-lg"
            style={{
              width: '12px',
              height: '60px',
              left: '30px',
              top: '-30px',
              ...getPartStyle('sparkplugs'),
              transform: 'translateZ(10px)'
            }}
          />
          <div
            className="absolute rounded-full shadow-lg"
            style={{
              width: '12px',
              height: '60px',
              left: '50px',
              top: '-30px',
              ...getPartStyle('sparkplugs'),
              transform: 'translateZ(10px)'
            }}
          />
          <div
            className="absolute rounded-full shadow-lg"
            style={{
              width: '12px',
              height: '60px',
              left: '70px',
              top: '-30px',
              ...getPartStyle('sparkplugs'),
              transform: 'translateZ(10px)'
            }}
          />
          
          <div
            className="absolute rounded-lg shadow-lg"
            style={{
              width: '20px',
              height: '40px',
              left: '25px',
              top: '-50px',
              ...getPartStyle('coils'),
              transform: 'translateZ(20px)'
            }}
          />
          <div
            className="absolute rounded-lg shadow-lg"
            style={{
              width: '20px',
              height: '40px',
              left: '45px',
              top: '-50px',
              ...getPartStyle('coils'),
              transform: 'translateZ(20px)'
            }}
          />
          <div
            className="absolute rounded-lg shadow-lg"
            style={{
              width: '20px',
              height: '40px',
              left: '65px',
              top: '-50px',
              ...getPartStyle('coils'),
              transform: 'translateZ(20px)'
            }}
          />
          
          <div
            className="absolute rounded-lg shadow-lg"
            style={{
              width: '140px',
              height: '15px',
              left: '-10px',
              top: '-70px',
              ...getPartStyle('cover'),
              transform: 'translateZ(30px)'
            }}
          />
          
          <div
            className="absolute rounded-lg shadow-lg"
            style={{
              width: '50px',
              height: '35px',
              left: '140px',
              top: '20px',
              ...getPartStyle('battery'),
              transform: 'translateZ(5px)'
            }}
          />
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
        {highlightPart === 'sparkplugs' && 'Свечи зажигания выделены'}
        {highlightPart === 'coils' && 'Катушки зажигания выделены'}
        {highlightPart === 'cover' && 'Крышка двигателя выделена'}
        {highlightPart === 'battery' && 'Аккумулятор выделен'}
        {!['sparkplugs', 'coils', 'cover', 'battery'].includes(highlightPart) && 'Интерактивная 3D модель'}
      </div>
      
      <div className="absolute top-4 left-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        3D Engine Model (Enhanced CSS)
      </div>
    </div>
  )
}

export default function EngineModel({ highlightPart }: EngineModelProps) {
  return <FallbackModel highlightPart={highlightPart} />
}

import { useState, useEffect } from 'react'

export interface GuideStep {
  title: string
  description: string
  highlight: string
  tools?: string[]
  torque?: string
}

export interface GuideData {
  title: string
  tools: string[]
  torqueSpecs: Record<string, string>
  steps: GuideStep[]
}

export function useGuideData(make: string, model: string, year: string, procedure: string) {
  const [guideData, setGuideData] = useState<GuideData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGuideData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const guidePath = `/guides/${make}/${model}/${year}/${procedure}.json`
        const response = await fetch(guidePath)
        
        if (!response.ok) {
          throw new Error('Guide not found')
        }
        
        const data = await response.json()
        setGuideData(data)
      } catch (err) {
        setError('Гайд в разработке')
        setGuideData(null)
      } finally {
        setLoading(false)
      }
    }

    if (make && model && year && procedure) {
      loadGuideData()
    }
  }, [make, model, year, procedure])

  return { guideData, loading, error }
}

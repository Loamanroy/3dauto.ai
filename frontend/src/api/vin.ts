const API_BASE = 'http://localhost:5000/api'

export interface VinResponse {
  make: string
  model: string
  year: number
  engine: string
  glbModelPath?: string
  guideId?: string
}

const mockVinData: Record<string, VinResponse> = {
  'WFAFXXGCDXGJ12345': {
    make: 'Ford',
    model: 'Focus III',
    year: 2015,
    engine: '1.6 Ti-VCT',
    glbModelPath: '/models/focus-2015-1.6.glb',
    guideId: 'sparkplug-ford-2015'
  },
  'WFAFXXGCDXGJ54321': {
    make: 'Ford',
    model: 'Focus III',
    year: 2016,
    engine: '2.0 EcoBoost',
    glbModelPath: '/models/focus-2016-2.0.glb',
    guideId: 'sparkplug-ford-2016'
  },
  'WVWZZZ1KZXW123456': {
    make: 'Volkswagen',
    model: 'Golf VII',
    year: 2014,
    engine: '1.4 TSI',
    glbModelPath: '/models/golf-2014-1.4.glb',
    guideId: 'sparkplug-vw-2014'
  }
}

export async function getVinInfo(vinCode: string): Promise<VinResponse | null> {
  try {
    const response = await fetch(`${API_BASE}/vin/${vinCode}`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  return mockVinData[vinCode] || null
}

export function validateVin(vin: string): boolean {
  return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin)
}

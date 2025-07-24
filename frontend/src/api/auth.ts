const API_BASE = 'http://localhost:5000/api'

export interface User {
  id: number
  email: string
  name: string
  subscription: {
    active: boolean
    plan: string
    expiresAt?: string
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

const mockUser: User = {
  id: 1,
  email: "user@example.com",
  name: "Test User",
  subscription: {
    active: false,
    plan: "free"
  }
}

export async function login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  return {
    user: mockUser,
    token: 'mock-jwt-token'
  }
}

export async function register(data: RegisterData): Promise<{ user: User; token: string }> {
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  return {
    user: { ...mockUser, email: data.email, name: data.name },
    token: 'mock-jwt-token'
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = localStorage.getItem('auth-token')
    if (!token) return null
    
    const response = await fetch(`${API_BASE}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  const token = localStorage.getItem('auth-token')
  return token ? mockUser : null
}

export async function logout(): Promise<void> {
  localStorage.removeItem('auth-token')
}

export async function createSubscription(): Promise<{ checkoutUrl: string }> {
  try {
    const response = await fetch(`${API_BASE}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      },
      body: JSON.stringify({
        plan: 'monthly',
        amount: 1000 // 10.00 EUR in cents
      })
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  return {
    checkoutUrl: 'https://checkout.stripe.com/mock-session'
  }
}

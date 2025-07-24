const API_BASE = 'http://localhost:5000/api'

export interface CartItem {
  id: number
  partId: number
  name: string
  oem: string
  price: number
  quantity: number
  image: string
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  shipping: number
}

let mockCart: Cart = {
  items: [
    {
      id: 1,
      partId: 1,
      name: "Свечи зажигания NGK",
      oem: "1234567890",
      price: 45.99,
      quantity: 4,
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      partId: 2,
      name: "Лампа H7 Philips",
      oem: "0987654321",
      price: 12.50,
      quantity: 2,
      image: "/api/placeholder/200/200"
    }
  ],
  subtotal: 208.96,
  shipping: 0,
  total: 208.96
}

export async function getCart(): Promise<Cart> {
  try {
    const response = await fetch(`${API_BASE}/cart`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  return mockCart
}

export async function addToCart(partId: number, quantity: number = 1): Promise<Cart> {
  try {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ partId, quantity })
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  const existingItem = mockCart.items.find(item => item.partId === partId)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    mockCart.items.push({
      id: Date.now(),
      partId,
      name: "Mock Part",
      oem: "MOCK123",
      price: 25.00,
      quantity,
      image: "/api/placeholder/200/200"
    })
  }
  
  mockCart.subtotal = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  mockCart.total = mockCart.subtotal + mockCart.shipping
  
  return mockCart
}

export async function updateCartItem(itemId: number, quantity: number): Promise<Cart> {
  try {
    const response = await fetch(`${API_BASE}/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log('API not available, using mock data')
  }
  
  const item = mockCart.items.find(item => item.id === itemId)
  if (item) {
    if (quantity <= 0) {
      mockCart.items = mockCart.items.filter(item => item.id !== itemId)
    } else {
      item.quantity = quantity
    }
  }
  
  mockCart.subtotal = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  mockCart.total = mockCart.subtotal + mockCart.shipping
  
  return mockCart
}

export async function removeFromCart(itemId: number): Promise<Cart> {
  return updateCartItem(itemId, 0)
}

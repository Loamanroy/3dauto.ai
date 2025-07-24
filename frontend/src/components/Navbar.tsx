import { Link } from 'react-router-dom'
import { Car, ShoppingCart, User } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">3Dauto.ai</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/cars" className="text-gray-700 hover:text-blue-600 font-medium">
              Выбрать автомобиль
            </Link>
            <Link to="/parts" className="text-gray-700 hover:text-blue-600 font-medium">
              Каталог запчастей
            </Link>
            <Link to="/vin" className="text-gray-700 hover:text-blue-600 font-medium">
              VIN-декодер
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-gray-700 hover:text-blue-600">
                <ShoppingCart className="h-6 w-6" />
              </Link>
              <Link to="/auth" className="text-gray-700 hover:text-blue-600">
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { CarSelectionPage } from './pages/CarSelectionPage.tsx'
import { GuidePage } from './pages/GuidePage.tsx'
import { PartsPage } from './pages/PartsPage.tsx'
import { ProductPage } from './pages/ProductPage.tsx'
import { CartPage } from './pages/CartPage.tsx'
import { AuthPage } from './pages/AuthPage.tsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarSelectionPage />} />
        <Route path="/guide/:make/:model/:year/:procedure" element={<GuidePage />} />
        <Route path="/parts" element={<PartsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  )
}

export default App

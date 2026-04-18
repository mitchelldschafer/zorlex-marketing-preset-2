import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ServicePage from './components/ServicePage'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  return (
    <main className="w-full min-h-screen bg-dark overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App

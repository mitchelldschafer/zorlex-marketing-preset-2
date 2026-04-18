import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ServicePage from './components/ServicePage'
import Pricing from './components/Pricing'
import About from './components/About'
import ProcessPage from './components/ProcessPage'
import ContactPage from './components/ContactPage'
import Footer from './components/Footer'

function App() {
  return (
    <main className="w-full min-h-screen bg-dark overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App

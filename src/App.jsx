import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import SocialProof from './components/SocialProof'
import Manifesto from './components/Manifesto'
import Portfolio from './components/Portfolio'
import Features from './components/Features'
import Services from './components/Services'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Cta from './components/Cta'
import Footer from './components/Footer'

function App() {
  return (
    <main className="w-full min-h-screen bg-dark overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <SocialProof />
      <Manifesto />
      <Portfolio />
      <Features />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <Cta />
      <Footer />
    </main>
  )
}

export default App

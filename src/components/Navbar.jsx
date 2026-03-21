import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-[1320px] transition-all duration-300 ease-out rounded-full ${scrolled ? 'bg-dark-surface/80 backdrop-blur-xl border border-border py-4 px-6' : 'bg-transparent py-6 px-4'}`}
      >
        <div className="flex items-center justify-between">
          <div className="font-heading font-semibold text-xl tracking-[-0.04em] text-light">
            Zorlex
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-body text-sm text-light/80">
            <a href="#work" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">Work</a>
            <a href="#services" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">Services</a>
            <a href="#about" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">About</a>
            <a href="#process" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">Process</a>
            <a href="#faq" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">FAQ</a>
          </div>
          
          <div className="hidden md:block">
            <button className="relative overflow-hidden bg-accent text-dark font-body font-medium text-sm px-6 py-2.5 rounded-full group hover:scale-[1.03] transition-transform duration-300" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
              <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
            </button>
          </div>

          <button 
            className="md:hidden text-light p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-dark z-[100] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute top-6 right-6">
          <button 
            className="text-light p-2"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={32} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full gap-8 font-heading text-3xl font-semibold">
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent">Work</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent">Services</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent">About</a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent">Process</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent">FAQ</a>
          <button className="mt-8 bg-accent text-dark px-8 py-4 rounded-full text-lg">
            Start a Project
          </button>
        </div>
      </div>
    </>
  );
}

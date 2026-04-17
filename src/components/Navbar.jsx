import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceLinks = [
    { title: "Website Design and Development", slug: "website-design-development" },
    { title: "SEO", slug: "seo" },
    { title: "Digital Strategy", slug: "digital-strategy" },
    { title: "Branding", slug: "branding" },
    { title: "Maintenance", slug: "maintenance" }
  ];

  return (
    <>
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-[1320px] transition-all duration-300 ease-out rounded-full shadow-lg ${scrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 py-4 px-6' : 'bg-black/10 backdrop-blur-md border border-white/5 py-6 px-4'}`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading font-semibold text-xl tracking-[-0.04em] text-light">
            Zorlex
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-body text-sm text-light/80">
            <Link to="/#work" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">Work</Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-accent transition-colors hover:-translate-y-[1px] transform py-2">
                Services <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-dark-surface border border-border/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 origin-top ${dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                {serviceLinks.map((link) => (
                  <Link 
                    key={link.slug}
                    to={`/services/${link.slug}`}
                    className="block px-4 py-3 rounded-xl hover:bg-white/5 hover:text-accent transition-colors text-sm"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/#about" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">About</Link>
            <Link to="/#process" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">Process</Link>
            <Link to="/#faq" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">FAQ</Link>
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
          <Link to="/#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent">Work</Link>
          <div className="flex flex-col items-center gap-4">
            <span className="text-muted text-sm font-mono uppercase tracking-widest">Services</span>
            {serviceLinks.map((link) => (
              <Link 
                key={link.slug}
                to={`/services/${link.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl hover:text-accent"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <Link to="/#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent">About</Link>
          <button className="mt-8 bg-accent text-dark px-8 py-4 rounded-full text-lg">
            Start a Project
          </button>
        </div>
      </div>
    </>
  );
}


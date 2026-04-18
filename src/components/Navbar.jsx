import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [marketingDropdownOpen, setMarketingDropdownOpen] = useState(false);
  const [automationDropdownOpen, setAutomationDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marketingLinks = [
    { title: "Website Design and Development", slug: "website-design-development" },
    { title: "SEO", slug: "seo" },
    { title: "Digital Strategy", slug: "digital-strategy" },
    { title: "Branding", slug: "branding" },
    { title: "Maintenance", slug: "maintenance" }
  ];

  const automationLinks = [
    { title: "Financial & Bookkeeping", slug: "financial-automation" },
    { title: "Operational Automations", slug: "operational-automation" },
    { title: "Custom Applications", slug: "custom-applications" }
  ];

  return (
    <>
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-[1320px] transition-all duration-300 ease-out rounded-full shadow-lg ${scrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 py-4 px-6' : 'bg-black/10 backdrop-blur-md border border-white/5 py-6 px-4'}`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/zorlex-logo.png" alt="Zorlex AI" className="h-8 w-8" />
            <span className="font-heading font-semibold text-xl tracking-[-0.04em] text-light">Zorlex AI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-body text-sm text-light/80">
            <Link to="/#work" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">Work</Link>
            <Link to="/pricing" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">Pricing</Link>
            
            {/* Marketing Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setMarketingDropdownOpen(true)}
              onMouseLeave={() => setMarketingDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-accent transition-colors hover:-translate-y-[1px] transform py-2">
                Marketing Services <ChevronDown size={14} className={`transition-transform duration-300 ${marketingDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-dark-surface border border-border/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 origin-top ${marketingDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                {marketingLinks.map((link) => (
                  <Link 
                    key={link.slug}
                    to={`/services/${link.slug}`}
                    className="block px-4 py-3 rounded-xl hover:bg-white/5 hover:text-accent transition-colors text-sm"
                    onClick={() => setMarketingDropdownOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Automation Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setAutomationDropdownOpen(true)}
              onMouseLeave={() => setAutomationDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-accent transition-colors hover:-translate-y-[1px] transform py-2">
                Automation Services <ChevronDown size={14} className={`transition-transform duration-300 ${automationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-dark-surface border border-border/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 origin-top ${automationDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                {automationLinks.map((link) => (
                  <Link 
                    key={link.slug}
                    to={`/services/${link.slug}`}
                    className="block px-4 py-3 rounded-xl hover:bg-white/5 hover:text-accent transition-colors text-sm"
                    onClick={() => setAutomationDropdownOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" className="hover:text-accent transition-colors hover:-translate-y-[1px] transform">About</Link>
          </div>
          
          <div className="hidden md:block">
            <Link to="/contact" className="relative block overflow-hidden bg-accent text-dark font-body font-medium text-sm px-6 py-2.5 rounded-full group hover:scale-[1.03] transition-transform duration-300" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
              <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
            </Link>
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
        <div className="flex flex-col items-center justify-center min-h-full py-20 gap-8 font-heading text-xl font-semibold overflow-y-auto">
          <Link to="/#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent text-3xl">Work</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent text-3xl">Pricing</Link>
          
          <div className="flex flex-col items-center gap-4">
            <span className="text-muted text-xs font-mono uppercase tracking-widest">Marketing</span>
            {marketingLinks.map((link) => (
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

          <div className="flex flex-col items-center gap-4">
            <span className="text-muted text-xs font-mono uppercase tracking-widest">Automation</span>
            {automationLinks.map((link) => (
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

          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent text-3xl">About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-4 bg-accent text-dark px-12 py-4 rounded-full text-lg block text-center">
            Start a Project
          </Link>
        </div>
      </div>
    </>
  );
}



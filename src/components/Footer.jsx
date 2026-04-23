import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-dark-surface px-4 sm:px-6 pt-14 md:pt-24 pb-10 md:pb-12 rounded-t-[2rem] md:rounded-t-[3rem] border-t border-border/10">
      <div className="max-w-[1320px] mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 mb-14 md:mb-24">

          <div className="col-span-2 md:col-span-1 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <img src="/Logo.png" alt="Zorlex AI" className="h-10 w-10 rounded" />
              <h3 className="font-heading font-semibold text-3xl text-light tracking-[-0.04em]">Zorlex AI</h3>
            </div>
            <p className="font-body text-muted text-sm">Elevating Digital Outcomes</p>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-mono text-light/50 text-xs uppercase tracking-widest mb-2">Navigation</h4>
            <a href="#work" className="font-body text-light/80 hover:text-accent transition-all duration-300 hover:translate-x-2 w-max">Work</a>
            <a href="#services" className="font-body text-light/80 hover:text-accent transition-all duration-300 hover:translate-x-2 w-max">Services</a>
            <a href="#about" className="font-body text-light/80 hover:text-accent transition-all duration-300 hover:translate-x-2 w-max">About</a>
            <a href="#process" className="font-body text-light/80 hover:text-accent transition-all duration-300 hover:translate-x-2 w-max">Process</a>
            <a href="#faq" className="font-body text-light/80 hover:text-accent transition-all duration-300 hover:translate-x-2 w-max">FAQ</a>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-mono text-light/50 text-xs uppercase tracking-widest mb-2">Social</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3 text-light/80 hover:text-accent transition-all duration-300 group w-max">
                <Instagram size={18} className="transform transition-transform group-hover:-translate-y-1 group-hover:scale-110" /> <span className="group-hover:translate-x-1 transition-transform">Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-light/80 hover:text-accent transition-all duration-300 group w-max">
                <Linkedin size={18} className="transform transition-transform group-hover:-translate-y-1 group-hover:scale-110" /> <span className="group-hover:translate-x-1 transition-transform">LinkedIn</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-light/80 hover:text-accent transition-all duration-300 group w-max">
                <Twitter size={18} className="transform transition-transform group-hover:-translate-y-1 group-hover:scale-110" /> <span className="group-hover:translate-x-1 transition-transform">X / Twitter</span>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-mono text-light/50 text-xs uppercase tracking-widest mb-2">Contact</h4>
            <a href="mailto:hello@zorlex.com" className="font-body text-light/80 hover:text-accent transition-all duration-300 hover:-translate-y-1 w-max block">hello@zorlex.com</a>
            <Link to="/contact" className="font-body text-light/80 hover:text-accent transition-all duration-300 hover:-translate-y-1 w-max block">Contact Form</Link>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/10 pt-8 gap-4">
          <p className="font-body text-muted text-sm">© 2026 Zorlex AI. All rights reserved.</p>
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
            System Operational
          </div>
        </div>

      </div>
    </footer>
  );
}

import { Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-dark-surface px-6 pt-24 pb-12 rounded-t-[3rem] border-t border-border/10">
      <div className="max-w-[1320px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          
          <div className="col-span-1 md:col-span-1 flex flex-col">
            <h3 className="font-heading font-semibold text-3xl text-light mb-2 tracking-[-0.04em]">Zorlex</h3>
            <p className="font-body text-muted text-sm">Elevating Digital Outcomes</p>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-mono text-light/50 text-xs uppercase tracking-widest mb-2">Navigation</h4>
            <a href="#work" className="font-body text-light/80 hover:text-accent transition-colors w-max">Work</a>
            <a href="#services" className="font-body text-light/80 hover:text-accent transition-colors w-max">Services</a>
            <a href="#about" className="font-body text-light/80 hover:text-accent transition-colors w-max">About</a>
            <a href="#process" className="font-body text-light/80 hover:text-accent transition-colors w-max">Process</a>
            <a href="#faq" className="font-body text-light/80 hover:text-accent transition-colors w-max">FAQ</a>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-mono text-light/50 text-xs uppercase tracking-widest mb-2">Social</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3 text-light/80 hover:text-accent transition-colors w-max group">
                <Instagram size={18} className="transform transition-transform group-hover:-translate-y-1" /> <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-light/80 hover:text-accent transition-colors w-max group">
                <Linkedin size={18} className="transform transition-transform group-hover:-translate-y-1" /> <span>LinkedIn</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-light/80 hover:text-accent transition-colors w-max group">
                <Twitter size={18} className="transform transition-transform group-hover:-translate-y-1" /> <span>X / Twitter</span>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-mono text-light/50 text-xs uppercase tracking-widest mb-2">Contact</h4>
            <a href="mailto:hello@zorlex.com" className="font-body text-light/80 hover:text-accent transition-colors w-max block">hello@zorlex.com</a>
            <a href="tel:+15550198273" className="font-body text-light/80 hover:text-accent transition-colors w-max block">+1 (555) 019-8273</a>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/10 pt-8 gap-4">
          <p className="font-body text-muted text-sm">© 2026 Zorlex. All rights reserved.</p>
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
            System Operational
          </div>
        </div>

      </div>
    </footer>
  );
}

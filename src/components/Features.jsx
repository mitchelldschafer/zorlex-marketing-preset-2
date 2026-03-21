import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Features() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="w-full py-24 md:py-32 bg-dark px-6 overflow-hidden">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Diagnostic Shuffler */}
        <div className="feature-card bg-dark-surface rounded-[24px] border border-border/10 p-10 flex flex-col h-[400px]">
          <div className="h-40 relative w-full mb-8 flex justify-center items-center">
            <div className="w-48 h-12 bg-light/5 border border-border/10 rounded-xl absolute flex items-center justify-center text-sm font-mono text-light shadow-lg">Layout Matrix</div>
            <div className="w-48 h-12 bg-accent/20 border border-accent/40 rounded-xl absolute -translate-y-4 translate-x-4 flex items-center justify-center text-sm font-mono text-accent shadow-lg">Color Theory</div>
            <div className="w-48 h-12 bg-light/10 border border-border/20 rounded-xl absolute translate-y-4 -translate-x-4 flex items-center justify-center text-sm font-mono text-light z-10 shadow-xl border-l-[3px] border-l-accent animate-pulse">Cinematic Flow</div>
          </div>
          <h3 className="font-heading text-2xl font-semibold text-light mb-3">High-Fidelity Design</h3>
          <p className="font-body text-muted leading-relaxed">We don't just build pages. We engineer digital instruments with intentional layouts and cinematic aesthetics.</p>
        </div>

        {/* Card 2: Telemetry Typewriter */}
        <div className="feature-card bg-dark-surface rounded-[24px] border border-border/10 p-10 flex flex-col h-[400px]">
          <div className="h-40 relative w-full mb-8 bg-dark/50 rounded-xl border border-border/5 p-4 overflow-hidden font-mono text-xs flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-4 absolute top-4 right-4">
              <span className="w-2 h-2 rounded-full bg-accent relative"><span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75"></span></span>
              <span className="text-muted text-[10px] uppercase tracking-widest">Live Feed</span>
            </div>
            <div className="text-accent/40 mb-2">Initializing edge network...</div>
            <div className="text-accent/60 mb-2">Optimizing asset delivery...</div>
            <div className="text-accent mb-2">TTFB: 42ms [Instantaneous]</div>
            <div className="text-light mt-1 flex items-center gap-2"><span className="text-accent">❯</span> System running flawlessly <span className="w-1.5 h-3 bg-accent animate-pulse"></span></div>
          </div>
          <h3 className="font-heading text-2xl font-semibold text-light mb-3">Performance Driven</h3>
          <p className="font-body text-muted leading-relaxed">Built for speed and scalability, our sites ensure instant load times and flawless user experiences globally.</p>
        </div>

        {/* Card 3: Cursor Protocol */}
        <div className="feature-card bg-dark-surface rounded-[24px] border border-border/10 p-10 flex flex-col h-[400px]">
          <div className="h-40 relative w-full mb-8 flex justify-center items-center">
            <div className="w-32 h-10 rounded-lg border border-border/20 flex items-center justify-center text-light font-body text-sm relative overflow-hidden group bg-light/5">
              <span className="relative z-10 transition-colors duration-300">Add to Cart</span>
              <div className="absolute inset-0 bg-accent transform transition-transform duration-300 translate-y-[100%] group-hover:translate-y-0"></div>
            </div>
            {/* Fake SVG cursor moving */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute text-light drop-shadow-lg z-20 translate-x-6 translate-y-6">
              <path d="M4 4L9.5 20L11.5 13L18.5 11L4 4Z" fill="white" stroke="black" strokeWidth="1" />
            </svg>
          </div>
          <h3 className="font-heading text-2xl font-semibold text-light mb-3">Conversion Focused</h3>
          <p className="font-body text-muted leading-relaxed">Every scroll, interaction, and path is engineered to turn your traffic into tangible business results.</p>
        </div>

      </div>
    </section>
  );
}

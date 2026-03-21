import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const container = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".pill-tag", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", delay: 0.1 })
        .from(".headline-line-1", { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".headline-line-2", { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" }, "-=0.65")
        .from(".subtext", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".hero-btn", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6")
        .from(".hero-img", { opacity: 0, scale: 1.05, duration: 1.2, stagger: 0.15, ease: "power2.out" }, "-=0.5");
        
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] bg-dark flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      
      {/* Top Tag */}
      <div className="pill-tag px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 mt-8 mb-8 z-10">
        <span className="font-mono text-accent text-xs tracking-widest uppercase font-medium">✦ Elevating Digital Outcomes</span>
      </div>

      {/* Massive Headline */}
      <div className="z-10 text-center w-full max-w-[1200px] flex flex-col items-center gap-2 md:gap-4 mb-8">
        <h1 className="headline-line-1 text-5xl sm:text-7xl lg:text-[100px] leading-[1.05] text-light font-semibold -tracking-[0.04em] whitespace-nowrap">
          Engineering the Next
        </h1>
        <h1 className="headline-line-2 text-5xl sm:text-7xl lg:text-[100px] leading-[1.05] text-light font-semibold -tracking-[0.04em]">
          Generation of the Web
        </h1>
      </div>

      {/* Subtext */}
      <p className="subtext z-10 text-center text-muted text-[18px] leading-relaxed max-w-[560px] font-body mb-10">
        We craft cinematic, high-conversion websites that command attention and drive growth. Step into the new standard of web presence.
      </p>

      {/* Buttons */}
      <div className="z-10 flex flex-col sm:flex-row items-center gap-4 mb-24 w-full justify-center">
        <button className="hero-btn relative overflow-hidden bg-accent text-dark font-body font-medium text-lg px-8 py-4 rounded-full group hover:scale-[1.03] w-full sm:w-[200px] transition-transform duration-300">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
          <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </button>
        <button className="hero-btn font-body font-medium text-lg px-8 py-4 rounded-full border border-border/50 text-light hover:bg-light/5 hover:border-border transition-colors w-full sm:w-[200px] hover:-translate-y-[2px] backdrop-blur-sm">
          View Our Work
        </button>
      </div>

      {/* Image Collage */}
      <div className="relative w-full max-w-[1320px] h-[400px] md:h-[500px]">
        {/* Large Center Image */}
        <div className="hero-img absolute left-1/2 -translate-x-1/2 top-0 w-full sm:w-[80%] md:w-[60%] h-[300px] md:h-[450px] rounded-[24px] overflow-hidden shadow-2xl z-0">
          <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80" alt="Warm Studio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-accent/10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
        </div>
        
        {/* Small Left Image */}
        <div className="hero-img hidden md:block absolute left-[5%] xl:left-[10%] top-[20%] w-[25%] xl:w-[22%] h-[280px] rounded-[20px] overflow-hidden border border-border/10 shadow-xl z-10 transform -rotate-3">
          <img src="https://images.unsplash.com/photo-1600174097489-32240b938cdd?auto=format&fit=crop&q=80" alt="Terracotta" className="w-full h-full object-cover" />
        </div>
        
        {/* Small Right Image */}
        <div className="hero-img hidden md:block absolute right-[5%] xl:right-[10%] top-[10%] w-[22%] xl:w-[20%] h-[240px] rounded-[20px] overflow-hidden border border-border/10 shadow-xl z-20 transform rotate-3">
          <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80" alt="Golden Hour" className="w-full h-full object-cover" />
        </div>
      </div>
      
    </section>
  );
}

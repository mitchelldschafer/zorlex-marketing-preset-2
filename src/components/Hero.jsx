import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export default function Hero() {
  const container = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".pill-tag", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", delay: 0.1 })
        .from(".headline-line-1", { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".headline-line-2", { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" }, "-=0.65")
        .from(".subtext", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".hero-btn", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");
        
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] bg-dark flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-[105%] object-cover object-top"
      >
        <source src="/Neural_architecture.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-dark/90 pointer-events-none" />

      {/* Top Tag with Logo */}
      <div className="pill-tag flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 mt-8 mb-8 z-10">
        <img src="/zorlex-logo.png" alt="Zorlex AI" className="h-5 w-5" />
        <span className="font-mono text-accent text-xs tracking-widest uppercase font-medium">Zorlex AI - Elevating Digital Outcomes</span>
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
      <div className="z-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <Link to="/contact" className="hero-btn relative overflow-hidden bg-accent text-dark font-body font-medium text-lg px-8 py-4 rounded-full group hover:scale-[1.03] w-full sm:w-[200px] transition-transform duration-300 text-center">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
          <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </Link>
        <Link to="/services/website-design-development" className="hero-btn font-body font-medium text-lg px-8 py-4 rounded-full border border-border/50 text-light hover:bg-light/5 hover:border-border transition-colors w-full sm:w-[200px] hover:-translate-y-[2px] backdrop-blur-sm text-center">
          View Our Work
        </Link>
      </div>
      
    </section>
  );
}

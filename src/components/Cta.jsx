import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

export default function Cta() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".cta-elem", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} id="contact" className="w-full py-20 md:py-48 bg-dark px-4 sm:px-6 flex items-center justify-center text-center relative">
      <div className="max-w-[700px] w-full flex flex-col items-center">

        <div className="cta-elem font-mono text-sm text-accent uppercase tracking-widest mb-5 md:mb-6">Ready to start?</div>

        <h2 className="cta-elem text-3xl sm:text-5xl md:text-[80px] font-heading font-semibold text-light tracking-[-0.04em] leading-[1.1] md:leading-[1.05] mb-8 md:mb-12">
          Let's build something extraordinary.
        </h2>
        
        <Link to="/contact" className="cta-elem relative overflow-hidden bg-accent text-dark font-body font-medium text-lg px-12 py-5 rounded-full group hover:scale-[1.03] transition-transform duration-300 w-full sm:w-auto mb-8 shadow-[0_0_30px_rgba(123,107,255,0.2)] text-center">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
          <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
        </Link>
        
        <a href="mailto:hello@zorlex.com" className="cta-elem font-mono text-muted hover:text-light transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-muted hover:after:bg-light inline-block pb-1">
          hello@zorlex.com
        </a>

      </div>
    </section>
  );
}


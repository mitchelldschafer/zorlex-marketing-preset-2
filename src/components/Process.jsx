import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Process() {
  const comp = useRef(null);

  const steps = [
    {
      num: "01 / 04",
      title: "Discovery & Strategy",
      desc: "We dive deep into your business objectives, audience, and market landscape to forge a strategic roadmap."
    },
    {
      num: "02 / 04",
      title: "Cinematic Design",
      desc: "Our creative team crafts bold, high-fidelity prototypes establishing the visual language of your brand."
    },
    {
      num: "03 / 04",
      title: "Precision Engineering",
      desc: "We build out the platform using modern architectures, ensuring pixel-perfect execution and blazing fast performance."
    },
    {
      num: "04 / 04",
      title: "Launch & Scale",
      desc: "After rigorous QA, we launch your site and shift focus to analytics, optimization, and scaling your digital presence."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card');
      
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out"
        });

        if (index < cards.length - 1 && window.innerWidth >= 768) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true
            },
            scale: 0.92,
            opacity: 0.4,
            filter: "blur(12px)",
            ease: "none"
          });
        }
      });
      
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} id="process" className="w-full bg-dark py-24 md:py-40 px-6 relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-heading font-semibold text-light tracking-[-0.04em] text-center">How We Work</h2>
        </div>
        
        <div className="flex flex-col gap-12 md:gap-0 relative">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="process-card w-full min-h-[60vh] md:min-h-[100vh] bg-dark-surface rounded-[32px] md:sticky md:top-0 flex flex-col justify-center p-10 md:p-20 border border-border/10 overflow-hidden"
              style={{ zIndex: i }}
            >
              
              {/* Background Animations */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden flex items-center justify-end pr-10 md:pr-40">
                {i === 0 && (
                  <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] animate-[spin_20s_linear_infinite]">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1" strokeDasharray="4 8" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1" strokeDasharray="2 6" />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" className="text-accent" strokeWidth="0.5" />
                  </svg>
                )}
                {i === 1 && (
                  <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] relative">
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2">
                      {Array(100).fill(0).map((_, j) => <div key={j} className="w-1.5 h-1.5 bg-accent rounded-full opacity-30"></div>)}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-[4px] bg-accent/80 blur-[2px] animate-[slideDown_4s_ease-in-out_infinite_alternate]" style={{boxShadow: '0 0 20px 5px rgba(123, 107, 255, 0.5)'}}></div>
                  </div>
                )}
                {i === 2 && (
                  <svg viewBox="0 0 400 200" className="w-[400px] h-[200px] md:w-[800px] md:h-[400px]">
                    <path d="M0,100 Q50,0 100,100 T200,100 T300,100 T400,100" fill="none" stroke="currentColor" className="text-accent" strokeWidth="4" strokeDasharray="800" strokeDashoffset="0">
                      <animate attributeName="stroke-dashoffset" values="800;0" dur="3s" repeatCount="indefinite" />
                    </path>
                  </svg>
                )}
                {i === 3 && (
                  <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-accent/20 relative animate-[spin_10s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_5px_rgba(123,107,255,0.8)]"></div>
                    <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-accent/70 rounded-full translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_3px_rgba(123,107,255,0.6)]"></div>
                  </div>
                )}
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes slideDown {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(500px); }
                  }
                `}} />
              </div>

              <div className="relative z-10 max-w-[800px]">
                <div className="font-mono text-accent text-sm tracking-widest uppercase mb-12">{step.num}</div>
                <h3 className="font-heading text-5xl md:text-7xl lg:text-[80px] font-semibold text-light mb-8 tracking-tight">{step.title}</h3>
                <p className="font-body text-xl md:text-2xl text-muted leading-[1.6] max-w-[600px]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

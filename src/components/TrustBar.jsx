import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TrustBar() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray('.stat-num');
      
      numbers.forEach(num => {
        const target = parseFloat(num.getAttribute('data-target'));
        const prefix = num.getAttribute('data-prefix') || '';
        const suffix = num.getAttribute('data-suffix') || '';
        
        gsap.to(num, {
          scrollTrigger: {
            trigger: comp.current,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          innerHTML: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            num.innerHTML = prefix + Math.abs(Math.round(num.innerHTML)) + suffix;
          }
        });
      });

      gsap.from('.stat-label', {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 10,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.5
      });
      
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="w-full py-16 md:py-24 bg-dark-surface border-y border-border px-6 relative z-20">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
        
        <div className="flex flex-col items-center justify-center pt-6 md:pt-0 group cursor-default">
          <div className="stat-num text-5xl md:text-6xl font-heading font-semibold text-light mb-2 tracking-tight transition-all duration-500 group-hover:scale-110 group-hover:text-accent/80" data-target="150" data-suffix="+">0</div>
          <div className="stat-label font-mono text-sm text-muted uppercase tracking-widest transition-colors group-hover:text-light/50">Websites Launched</div>
        </div>

        <div className="flex flex-col items-center justify-center pt-8 md:pt-0 relative group cursor-default">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/5 rounded-full blur-2xl -z-10 transition-transform duration-700 group-hover:scale-150 group-hover:bg-accent/10"></div>
          <div className="stat-num text-5xl md:text-6xl font-heading font-semibold text-light mb-2 tracking-tight text-accent transition-transform duration-500 group-hover:scale-110" data-target="40" data-prefix="$" data-suffix="M+">0</div>
          <div className="stat-label flex items-center gap-2 font-mono text-sm text-muted uppercase tracking-widest transition-colors group-hover:text-light/50">
            <span className="w-2 h-2 rounded-full bg-accent relative"><span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75"></span></span>
            Client Revenue
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-8 md:pt-0 group cursor-default">
          <div className="stat-num text-5xl md:text-6xl font-heading font-semibold text-light mb-2 tracking-tight transition-all duration-500 group-hover:scale-110 group-hover:text-accent/80" data-target="98" data-suffix="%">0</div>
          <div className="stat-label font-mono text-sm text-muted uppercase tracking-widest transition-colors group-hover:text-light/50">Client Retention</div>
        </div>

      </div>
    </section>
  );
}

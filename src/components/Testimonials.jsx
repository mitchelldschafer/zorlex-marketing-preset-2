import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Testimonials() {
  const comp = useRef(null);

  const testimonials = [
    {
      quote: "Zorlex transformed our entire digital infrastructure. Our conversion rates climbed 40% in the first quarter after launch.",
      name: "Sarah Jenkins",
      title: "CMO at Apex Fintech"
    },
    {
      quote: "Their attention to cinematic flow completely changed how patients engage with our clinic online. Pure artistry and engineered logic.",
      name: "Dr. James Miller",
      title: "Founder, MostLife"
    },
    {
      quote: "A rare breed of agency that truly understands both high-end aesthetics and hardcore performance engineering. They deliver.",
      name: "Marcus Thorne",
      title: "CEO, Delta Systems"
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".test-card", {
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
    <section ref={comp} className="w-full py-24 md:py-40 bg-light px-6 border-b border-border/50">
      <div className="max-w-[1320px] mx-auto flex flex-col">
        
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <div className="font-mono text-sm text-muted uppercase tracking-widest mb-4">Client Voices</div>
          <h2 className="text-5xl md:text-7xl font-heading font-semibold text-dark tracking-[-0.04em]">The Verdict</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <div key={i} className="test-card bg-light-surface rounded-[20px] p-10 border border-border/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
              
              <div className="absolute -top-4 -left-2 text-accent/20 font-heading text-[120px] leading-none select-none">"</div>
              
              <div className="relative z-10">
                <p className="font-body text-dark/80 text-lg md:text-xl italic leading-relaxed mb-10 h-32">"{test.quote}"</p>
                <div className="w-10 h-[2px] bg-accent mb-6 rounded-full"></div>
                <div>
                  <h4 className="font-heading font-semibold text-dark text-lg">{test.name}</h4>
                  <p className="font-body text-sm text-muted">{test.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

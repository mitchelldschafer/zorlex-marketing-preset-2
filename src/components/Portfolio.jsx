import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play } from 'lucide-react';

export default function Portfolio() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.from(".portfolio-head", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".proj-card", {
        scrollTrigger: {
          trigger: ".proj-grid",
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        scale: 0.97,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} id="work" className="w-full py-24 md:py-40 bg-light px-6 border-b border-border/50">
      <div className="max-w-[1320px] mx-auto flex flex-col">
        
        {/* Masked Headline */}
        <div className="portfolio-head mb-20 md:mb-32">
          <h2 className="text-[70px] sm:text-[100px] md:text-[120px] lg:text-[160px] font-heading font-semibold tracking-[-0.04em] leading-[0.9] text-dark flex flex-wrap gap-x-4 md:gap-x-8">
            <span className="block">OUR</span>
            <span className="masked-word block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80')" }}>BEST</span>
            <span className="block">WORKS</span>
          </h2>
        </div>

        {/* Project Grid */}
        <div className="proj-grid flex flex-col gap-6 md:gap-10">
          
          {/* Card Pattern A (Wide) */}
          <div className="proj-card relative w-full h-[60vh] md:h-[70vh] rounded-[24px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-500 bg-dark-surface">
            <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80" alt="Apex Fintech" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-dark/90 via-dark/40 to-transparent flex items-end p-8 md:p-12">
              <div className="w-full flex justify-between items-end transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-heading text-3xl md:text-5xl font-semibold text-white">Apex Fintech</h3>
                <div className="hidden md:flex flex-col md:flex-row items-end md:items-center gap-4">
                  <span className="font-mono text-white/80 uppercase tracking-widest text-sm">SaaS Platform</span>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Pattern B (Split) */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Split Card 1 */}
            <div className="proj-card relative w-full md:w-1/2 h-[50vh] md:h-[60vh] rounded-[24px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-500 bg-dark-surface">
              <img src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80" alt="MostLife" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent flex items-end p-8">
                <div className="w-full flex justify-between items-end transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-heading text-2xl md:text-4xl font-semibold text-white">MostLife</h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Color Block */}
            <div className="proj-card relative w-full md:w-1/2 h-[50vh] md:h-[60vh] rounded-[24px] overflow-hidden bg-accent group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-500 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-dark flex items-center justify-center text-accent transform transition-transform duration-500 group-hover:scale-[1.15]">
                <Play size={40} className="ml-2" fill="currentColor" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end p-8">
                <span className="font-mono text-dark uppercase tracking-widest text-sm font-semibold">Showreel</span>
              </div>
            </div>
          </div>

          {/* Card Pattern A (Wide) */}
          <div className="proj-card relative w-full h-[60vh] md:h-[70vh] rounded-[24px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-500 bg-dark-surface">
            <img src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80" alt="Delta Systems" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-dark/90 via-dark/40 to-transparent flex items-end p-8 md:p-12">
              <div className="w-full flex justify-between items-end transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-heading text-3xl md:text-5xl font-semibold text-white">Delta Systems</h3>
                <div className="hidden md:flex flex-col md:flex-row items-end md:items-center gap-4">
                  <span className="font-mono text-white/80 uppercase tracking-widest text-sm">Enterprise Data</span>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

export default function Manifesto() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.from(".manifesto-text", {
        scrollTrigger: {
          trigger: ".manifesto-left",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out"
      });

      gsap.from(".manifesto-img", {
        scrollTrigger: {
          trigger: ".manifesto-right",
          start: "top 80%",
        },
        opacity: 0,
        x: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".manifesto-huge", {
        scrollTrigger: {
          trigger: ".manifesto-huge",
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
      });

    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} id="about" className="w-full py-24 md:py-40 bg-light text-dark px-6 overflow-hidden">
      <div className="max-w-[1320px] mx-auto flex flex-col pt-10">
        
        {/* Split Section */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center mb-24 lg:mb-40">
          
          <div className="manifesto-left w-full md:w-[55%] flex flex-col order-2 md:order-1">
            <div className="manifesto-text font-mono text-sm text-muted uppercase tracking-widest mb-8">Our Story</div>
            <p className="manifesto-text font-body text-[18px] md:text-xl leading-[1.6] text-dark/90 mb-6 max-w-[600px]">
              Zorlex was born out of frustration with the generic web. Most agencies rely on tired templates and cookie-cutter designs that blend into the noise. We build bespoke digital instruments from the ground up.
            </p>
            <p className="manifesto-text font-body text-[18px] md:text-xl leading-[1.6] text-dark/90 mb-10 max-w-[600px]">
              We believe your digital presence should be as ambitious as your business. We engineer bespoke platforms that don't just look pretty, but perform as high-octane growth engines.
            </p>
            <a href="#team" className="manifesto-text flex items-center gap-2 text-accent font-body font-medium hover:-translate-y-[1px] group w-max transition-transform text-lg">
              Meet the Team
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="manifesto-right w-full md:w-[45%] relative h-[450px] md:h-[600px] order-1 md:order-2">
            <div className="manifesto-img absolute right-[10%] top-0 w-[80%] h-[350px] md:h-[450px] rounded-[24px] overflow-hidden shadow-2xl z-20">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" alt="Team collaborating" className="w-full h-full object-cover" />
            </div>
            <div className="manifesto-img absolute left-0 bottom-[10%] w-[70%] h-[300px] md:h-[400px] rounded-[24px] overflow-hidden shadow-xl z-10 border-[6px] border-light">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80" alt="Workspace" className="w-full h-full object-cover grayscale opacity-90" />
            </div>
          </div>
          
        </div>

        {/* Big Headline */}
        <h2 className="manifesto-huge text-5xl sm:text-[80px] lg:text-[110px] xl:text-[130px] font-heading font-semibold tracking-[-0.04em] text-dark leading-[1.0] text-center md:text-left mt-10">
          BEYOND THE TEMPLATE
        </h2>

      </div>
    </section>
  );
}

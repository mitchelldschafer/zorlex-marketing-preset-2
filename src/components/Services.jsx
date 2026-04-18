import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const comp = useRef(null);

  const services = [
    {
      num: "01",
      title: "Website Design and Development",
      slug: "website-design-development",
      desc: "Award-winning interface design with an emphasis on conversion and cinematic flow."
    },
    {
      num: "02",
      title: "Digital Strategy",
      slug: "digital-strategy",
      desc: "Comprehensive roadmaps positioning your digital assets for maximum market impact."
    },
    {
      num: "03",
      title: "SEO Optimization",
      slug: "seo",
      desc: "Technical and content-driven search engine mastery to ensure your site is found."
    },
    {
      num: "04",
      title: "Branding",
      slug: "branding",
      desc: "Cohesive, sophisticated visual identities that separate your business from the noise."
    },
    {
      num: "05",
      title: "Maintenance",
      slug: "maintenance",
      desc: "Ongoing optimization, security, and updates to keep your digital engine running flawlessly."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });
      
      gsap.from(".services-head", {
        scrollTrigger: { trigger: comp.current, start: "top 85%" },
        opacity: 0,
        y: 30,
        duration: 0.8
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} id="services" className="w-full py-16 md:py-40 bg-light px-4 sm:px-6 border-y border-border/50">
      <div className="max-w-[1320px] mx-auto flex flex-col">

        <div className="services-head flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-24 gap-4 md:gap-6">
          <div>
            <div className="font-mono text-sm text-muted uppercase tracking-widest mb-4 md:mb-6">Our Capabilities</div>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-semibold text-dark tracking-[-0.04em]">The Offering</h2>
          </div>
          <p className="font-body text-base md:text-xl text-dark/70 max-w-[400px]">
            Comprehensive digital engineering to elevate your brand's presence and accelerate growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((svc, i) => (
            <Link
              key={i}
              to={`/services/${svc.slug}`}
              className="service-card block bg-light-surface rounded-[20px] md:rounded-[24px] p-6 sm:p-8 md:p-12 group cursor-pointer hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-md border border-border/40 relative overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="font-mono text-accent text-xl font-semibold mb-8 md:mb-12">{svc.num}</div>
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-dark mb-3 md:mb-4">{svc.title}</h3>
                  <p className="font-body text-dark/70 text-base md:text-[18px] leading-relaxed max-w-[480px]">{svc.desc}</p>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-10 h-10 md:w-12 md:h-12 rounded-full bg-light flex items-center justify-center transform transition-transform duration-300 group-hover:bg-accent group-hover:text-white shadow-sm">
                <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

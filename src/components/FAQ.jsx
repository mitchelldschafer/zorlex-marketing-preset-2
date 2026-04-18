import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

export default function FAQ() {
  const comp = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is a cinematic landing page?",
      a: "It's a digital experience engineered to feel like a high-end film—using intentional motion, dramatic lighting contrast, and precise typography to guide the user's attention and drive action."
    },
    {
      q: "How long does a typical project take?",
      a: "Most of our bespoke builds average between 4 to 8 weeks, depending on the complexity of the architecture, custom animations, and integrations required."
    },
    {
      q: "Do you provide ongoing support after launch?",
      a: "Yes. We offer comprehensive maintenance retainers to ensure your digital instrument remains optimized, secure, and blazing fast as your business scales."
    },
    {
      q: "What technologies do you use?",
      a: "We build utilizing modern, high-performance stacks. Typically: React, Tailwind CSS, Vite, and GSAP for fluid, scroll-driven cinematic animations."
    },
    {
      q: "Can you integrate with our existing CRM?",
      a: "Absolutely. We regularly build headless architectures integrating with HubSpot, Salesforce, Sanity, Shopify, and bespoke backend systems."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".faq-head", {
        scrollTrigger: { trigger: comp.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.8
      });
      
      gsap.from(".faq-item", {
        scrollTrigger: { trigger: comp.current, start: "top 70%" },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={comp} className="w-full py-16 md:py-40 bg-light px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto flex flex-col">

        <h2 className="faq-head text-3xl sm:text-4xl md:text-[64px] font-heading font-semibold text-dark tracking-[-0.04em] text-center mb-10 md:mb-24">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item border-b border-border/60">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 text-left flex items-center justify-between group focus:outline-none"
              >
                <h3 className="font-heading text-xl md:text-2xl font-medium text-dark group-hover:text-accent transition-colors">
                  {faq.q}
                </h3>
                <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center bg-light-surface group-hover:border-accent group-hover:bg-accent/5 transition-colors shrink-0">
                  <Plus size={20} className={`text-dark transform transition-transform duration-500 ${openIndex === i ? 'rotate-[-45deg] text-accent' : ''}`} />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-[300px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
              >
                <p className="font-body text-base md:text-[18px] text-dark/70 leading-relaxed pr-4 md:pr-10">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

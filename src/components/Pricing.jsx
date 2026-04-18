import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Check } from 'lucide-react';

const pricingData = [
  {
    name: "Essential Website Build",
    price: "1,649",
    description: "Simple, focused, effective.",
    subtext: "Perfect for startups and small teams.",
    buttonText: "Start with Essential",
    features: [
      "Up to five pages website design",
      "Fully responsive mobile layout",
      "SEO ready architecture",
      "Professional pictures & icons ready",
      "Light animations & transitions"
    ],
    highlight: false
  },
  {
    name: "Pro",
    price: "2,549",
    description: "For growth at scale.",
    subtext: "Best for growing businesses and creative studios.",
    buttonText: "Start with Pro",
    features: [
      "Advanced GSAP custom animations",
      "Custom CMS for easy editing",
      "Professional Blog integration",
      "Dynamic collections & filtering",
      "Custom UI/UX component library",
      "Everything in Essential"
    ],
    highlight: true,
    tag: "BEST VALUE"
  },
  {
    name: "Custom",
    price: "Custom",
    description: "Everything you need to dominate.",
    subtext: "Complete business and social infrastructure.",
    buttonText: "Contact for Custom",
    features: [
      "Google & Yelp business profile setup",
      "Social media setup & management",
      "High-end content creation",
      "Digital strategy & brand voice",
      "Ongoing maintenance & support",
      "Custom specialized integrations"
    ],
    highlight: false
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header animation
      gsap.from(".pricing-header", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Cards staggered animation
      gsap.fromTo(".pricing-card", 
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1, 
          ease: "power4.out", 
          delay: 0.2 
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark pt-16 pb-20 md:pb-32 px-4 sm:px-6">
      <div className="max-w-[1320px] mx-auto">

        {/* Header Section */}
        <div className="pricing-header opacity-0 text-center mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-heading font-semibold text-light mb-6 md:mb-8 tracking-[-0.04em]">
            Two ways to <span className="italic font-light">begin.</span>
          </h1>
          
          {/* Billing Toggle UI - Non-functional as requested, just for aesthetic */}
          <div className="flex items-center justify-center gap-4">
            <div className="bg-dark-surface p-1 rounded-full border border-white/5 flex items-center relative">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`relative z-10 px-6 py-2 text-sm font-body font-medium transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-white' : 'text-white/40'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`relative z-10 px-6 py-2 text-sm font-body font-medium transition-colors duration-300 ${billingCycle === 'yearly' ? 'text-white' : 'text-white/40'}`}
              >
                Yearly
              </button>
              <div 
                className={`absolute top-1 bottom-1 left-1 bg-accent rounded-full transition-all duration-300 ease-out`}
                style={{ 
                  width: 'calc(50% - 4px)',
                  transform: billingCycle === 'monthly' ? 'translateX(0)' : 'translateX(100%)' 
                }}
              />
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingData.map((pkg, i) => (
            <div
              key={i}
              className={`pricing-card opacity-0 relative flex flex-col p-6 sm:p-8 md:p-10 rounded-[24px] md:rounded-[32px] border transition-all duration-500 group ${pkg.highlight ? 'bg-dark-surface/80 border-accent shadow-[0_0_40px_rgba(123,107,255,0.1)]' : 'bg-dark-surface border-border/10 hover:border-white/20'}`}
            >
              {pkg.tag && (
                <div className="absolute top-6 right-6 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-white/50">
                  {pkg.tag}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-heading font-semibold text-white mb-2">{pkg.name}</h3>
                <p className="text-sm font-body text-white/50 leading-relaxed">{pkg.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-white">
                    {pkg.price !== 'Custom' ? `$${pkg.price}` : pkg.price}
                  </span>
                  {pkg.price !== 'Custom' && <span className="text-xl text-white/30 font-light">/project</span>}
                </div>
                <p className="text-sm font-body text-white/40 mt-3">{pkg.subtext}</p>
              </div>

              <button 
                className={`w-full py-4 rounded-xl font-body font-semibold text-sm transition-all duration-300 mb-12 ${pkg.highlight ? 'bg-accent text-white shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
              >
                {pkg.buttonText}
              </button>

              <div className="mt-auto">
                <p className="text-xs font-mono text-white/30 uppercase tracking-[0.2em] font-bold mb-6">You'll Get</p>
                <ul className="flex flex-col gap-4">
                  {pkg.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                        <Check size={12} className="text-accent stroke-[3]" />
                      </div>
                      <span className="text-sm text-white/70 font-body leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

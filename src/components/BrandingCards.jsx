import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Palette, Share2, Layers, BookOpen, Monitor, Shield } from 'lucide-react';

const brandingFeatures = [
  {
    icon: <Palette className="text-accent" size={24} />,
    title: "Visual Identity Systems",
    description: "We engineer more than just logos. We develop comprehensive visual protocols including mathematical grids, color theory systems, and typographic hierarchies that ensure your brand is instantly recognizable and structurally sound across all digital and physical mediums."
  },
  {
    icon: <Share2 className="text-accent" size={24} />,
    title: "Brand Voice & Messaging",
    description: "Our strategic copywriters define a distinct linguistic DNA for your brand. By codifying tone, diction, and communication principles, we ensure your message remains authoritative and consistent across every internal and external touchpoint."
  },
  {
    icon: <Layers className="text-accent" size={24} />,
    title: "Strategic Market Positioning",
    description: "We utilize competitive audits and psychographic modeling to carve out a unique sector for your brand. Our positioning logic ensures your company isn't just a participant in the market, but the dominant authority within its specific niche."
  },
  {
    icon: <BookOpen className="text-accent" size={24} />,
    title: "Design Language Documentation",
    description: "We ship complete brand bibles and digital asset modules. This documentation serves as a single source of truth for your engineering and marketing teams, guaranteeing that scaling never compromises visual or structural integrity."
  },
  {
    icon: <Monitor className="text-accent" size={24} />,
    title: "Digital Experience Branding",
    description: "Modern branding happens in the interface. We design interactive brand signatures—animations, micro-interactions, and UX patterns—that translate your brand values into tangible digital experiences that users can feel and trust."
  },
  {
    icon: <Shield className="text-accent" size={24} />,
    title: "Integrity & Governance",
    description: "Sustainability requires governance. We implement systems to monitor brand usage and ensure compliance sitewide. This proactive stewardship protects your brand equity as you expand into new products and global markets."
  }
];

export default function BrandingCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".branding-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {brandingFeatures.map((feature, i) => (
        <div 
          key={i} 
          className="branding-card bg-dark-surface p-8 rounded-[24px] border border-border/20 hover:border-accent/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 flex flex-col gap-6 group hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
            {feature.icon}
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-light mb-3 group-hover:text-accent transition-colors">
              {feature.title}
            </h3>
            <p className="font-body text-white/70 text-[15px] leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

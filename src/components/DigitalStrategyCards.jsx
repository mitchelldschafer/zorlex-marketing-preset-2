import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Target, Navigation, Database, Workflow, ShieldCheck, Cpu } from 'lucide-react';

const strategyFeatures = [
  {
    icon: <Database className="text-accent" size={24} />,
    title: "Data-Driven Market Architecture",
    description: "We abandon guesswork. Our foundational strategy relies on extracting granular quantitative metrics from your market sector. We build a comprehensive data architecture that maps competitor blind spots, pricing elasticities, and untapped demand channels to construct an impenetrable structural advantage."
  },
  {
    icon: <Cpu className="text-accent" size={24} />,
    title: "Algorithmic Growth Modeling",
    description: "True scaling requires predictive infrastructure. We engineer custom growth models to forecast customer acquisition costs (CAC) against lifetime value (LTV) at varying degrees of scale. This allows us to allocate capital dynamically to the most efficient acquisition vectors in real-time."
  },
  {
    icon: <Workflow className="text-accent" size={24} />,
    title: "Omnichannel Funnel Integration",
    description: "We synchronize your user journeys across every touchpoint. From initial programmatic ad impressions to CRM lifecycle automation, we architect frictionless, interconnected funnels that mathematically optimize for conversion, retention, and maximum engagement velocity."
  },
  {
    icon: <Target className="text-accent" size={24} />,
    title: "Precision Audience Engineering",
    description: "Broad targeting is inefficient. We utilize deterministic and probabilistic data modeling to slice your total addressable market into highly defined micro-cohorts. By layering behavioral, firmographic, and psychographic signals, we isolate the highest-intent prospects."
  },
  {
    icon: <Navigation className="text-accent" size={24} />,
    title: "Agile Campaign Deployment",
    description: "Strategic execution demands rapid iteration. We operate on algorithmic testing cycles, deploying multivariate split tests across creatives, copy, and landing pages. Continuous feedback loops ensure that our campaign strategies evolve aggressively ahead of market fatigue."
  },
  {
    icon: <ShieldCheck className="text-accent" size={24} />,
    title: "Risk-Mitigated Scaling",
    description: "Aggressive growth introduces structural fragility. We implement robust defense mechanisms—diversifying lead sources, ensuring strict data compliance, and establishing contingency protocols—so that as your operations scale exponentially, the foundation remains mathematically sound."
  }
];

export default function DigitalStrategyCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".strategy-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {strategyFeatures.map((feature, i) => (
        <div 
          key={i} 
          className="strategy-card opacity-0 bg-dark-surface p-8 rounded-[24px] border border-border/20 hover:border-accent/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 flex flex-col gap-6 group hover:-translate-y-1"
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

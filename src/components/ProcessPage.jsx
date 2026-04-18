import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const processSteps = [
  {
    icon: <Search className="text-accent" size={32} />,
    title: "01. Discovery & Strategy",
    description: "We begin by auditing your current ecosystem and identifying market vulnerabilities. We don't just ask what you want; we use data to determine exactly what your sector is missing to ensure maximum leverage on day one."
  },
  {
    icon: <PenTool className="text-accent" size={32} />,
    title: "02. Architecture & Design",
    description: "Our design process is mathematical. We architect high-fidelity blueprints that balance cinematic aesthetics with conversion-optimized UX. No placeholders, no filler—just intentional, high-performance structural design."
  },
  {
    icon: <Code2 className="text-accent" size={32} />,
    title: "03. Engineering & Animation",
    description: "This is where we build the muscle. Using advanced GSAP libraries and modern framework logic, we engineer a lightning-fast, interactive machine. Every transition is smooth, and every line of code is optimized for edge-delivery."
  },
  {
    icon: <Rocket className="text-accent" size={32} />,
    title: "04. Optimization & Deployment",
    description: "Before shipping, we run a gauntlet of performance audits. From SEO schema injection to lazy-load tuning, we ensure your site arrives in the wild with a 100/100 performance score, ready to scale globally."
  }
];

export default function ProcessPage() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".process-header", { opacity: 0, y: 30, duration: 1, ease: "power3.out" })
        .from(".process-step", { opacity: 0, x: -30, stagger: 0.2, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="min-h-screen bg-dark pt-40 pb-32 px-6">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header Section */}
        <div className="process-header mb-24 max-w-[800px]">
          <h1 className="text-5xl md:text-8xl font-heading font-semibold text-light mb-8 tracking-[-0.04em]">
            Technical <span className="italic font-light text-accent">precision.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-body leading-relaxed">
            Our methodology is designed for predictable, high-end results. We follow a rigorous four-phase engineering cycle to move from initial concept to global scale.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col gap-12">
          {processSteps.map((step, i) => (
            <div key={i} className="process-step group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-12 bg-dark-surface rounded-[40px] border border-white/5 hover:border-accent/30 transition-all duration-500">
              <div className="lg:col-span-1">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-500">
                  {step.icon}
                </div>
              </div>
              <div className="lg:col-span-11 flex flex-col gap-4">
                <h3 className="text-3xl font-heading font-semibold text-white group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-xl text-white/60 leading-relaxed font-body max-w-[900px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

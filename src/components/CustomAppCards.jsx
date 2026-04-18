import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Layout, Lock, Database, Code } from 'lucide-react';

const cards = [
  {
    icon: <Layout className="text-accent" size={32} />,
    title: "Bespoke Portals",
    desc: "Build a premium digital interface for your clients. We engineer custom portals that give your customers a transparent, branded view into their projects, reports, and billing."
  },
  {
    icon: <Database className="text-accent" size={32} />,
    title: "Internal Micro-SaaS",
    desc: "Sometimes off-the-shelf software isn't enough. We build lightweight, specialized applications designed to solve your specific organizational friction points."
  },
  {
    icon: <Lock className="text-accent" size={32} />,
    title: "Secure Data Repos",
    desc: "Custom database architectures that centralize your proprietary business data. Controlled access, real-time sync, and enterprise-grade security as standard."
  },
  {
    icon: <Code className="text-accent" size={32} />,
    title: "Integrative Logic Layers",
    desc: "We build custom middleware that sits between your disparate tools, adding an intelligent logic layer that automates decision-making before data reaches its destination."
  }
];

export default function CustomAppCards() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".app-card", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {cards.map((card, i) => (
        <div key={i} className="app-card bg-dark-surface p-10 rounded-[32px] border border-white/5 hover:border-accent/30 transition-all duration-500 group">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            {card.icon}
          </div>
          <h3 className="text-3xl font-heading font-semibold text-white mb-6 tracking-tight">
            {card.title}
          </h3>
          <p className="text-lg text-white/60 leading-relaxed font-body">
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

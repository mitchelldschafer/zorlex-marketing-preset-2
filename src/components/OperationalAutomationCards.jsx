import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Network, Users, Repeat, Cpu } from 'lucide-react';

const cards = [
  {
    icon: <Network className="text-accent" size={32} />,
    title: "Workflow Orchestration",
    desc: "Seamlessly connect your CRM, project management, and communication tools. We build the bridges that ensure data flows automatically between every department."
  },
  {
    icon: <Users className="text-accent" size={32} />,
    title: "Automated Onboarding",
    desc: "From contract signature to team kickoff. Automate the generation of folders, task lists, and welcome emails to ensure every new client feels the premium touch immediately."
  },
  {
    icon: <Repeat className="text-accent" size={32} />,
    title: "Inventory & Asset Tech",
    desc: "Automated tracking systems that monitor usage, manage procurement cycles, and alert stakeholders before bottlenecks occur in your supply chain."
  },
  {
    icon: <Cpu className="text-accent" size={32} />,
    title: "Internal Ops Dashboard",
    desc: "Centralized command centers that aggregate data from all automated workflows, giving management a single pane of glass to monitor organizational throughput."
  }
];

export default function OperationalAutomationCards() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".ops-card", 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {cards.map((card, i) => (
        <div key={i} className="ops-card opacity-0 bg-dark-surface p-10 rounded-[32px] border border-white/5 hover:border-accent/30 transition-all duration-500 group">
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

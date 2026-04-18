import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Activity, ShieldCheck, Zap, Database, Server, LifeBuoy } from 'lucide-react';

const maintenanceFeatures = [
  {
    icon: <Activity className="text-accent" size={24} />,
    title: "Uptime & Health Monitoring",
    description: "We deploy real-time EKG-style tracking across your entire infrastructure. Our automated systems ping your servers every 60 seconds, detecting latency spikes or outages before they impact your users, ensuring a 99.9% availability threshold."
  },
  {
    icon: <ShieldCheck className="text-accent" size={24} />,
    title: "Security Patch Management",
    description: "Digital threats evolve hourly. We maintain a proactive security posture by pushing critical kernel updates, firewall adjustments, and library patches the moment vulnerabilities are identified, keeping your system impenetrable."
  },
  {
    icon: <Zap className="text-accent" size={24} />,
    title: "Performance Optimization",
    description: "Maintenance isn't just about stability; it's about speed. We conduct continuous performance audits to prune redundant code, optimize database queries, and refresh cache headers, ensuring your platform remains lightning fast over time."
  },
  {
    icon: <Database className="text-accent" size={24} />,
    title: "Redundant Asset Backups",
    description: "Your data is your most valuable asset. We engineer automated, multi-region redundancy protocols that capture daily snapshots of your databases and media assets, allowing for instant recovery in the event of a catastrophic failure."
  },
  {
    icon: <Server className="text-accent" size={24} />,
    title: "Infrastructure Scaling",
    description: "As your traffic grows, your system must adapt. We manage your cloud orchestration—autoscaling instances and monitoring load balancers—to ensure your infrastructure expands horizontally without service degradation."
  },
  {
    icon: <LifeBuoy className="text-accent" size={24} />,
    title: "Technical Support & Troubleshooting",
    description: "We act as your dedicated engineering tier. From resolving obscure CSS bugs to troubleshooting API integration failures, we provide rapid-response technical resolution to ensure your operations never grind to a halt."
  }
];

export default function MaintenanceCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".maintenance-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {maintenanceFeatures.map((feature, i) => (
        <div 
          key={i} 
          className="maintenance-card opacity-0 bg-dark-surface p-8 rounded-[24px] border border-border/20 hover:border-accent/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 flex flex-col gap-6 group hover:-translate-y-1"
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

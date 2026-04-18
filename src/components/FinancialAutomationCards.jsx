import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Receipt, BarChart3, Calculator, ShieldCheck } from 'lucide-react';

const cards = [
  {
    icon: <Receipt className="text-accent" size={32} />,
    title: "AI Ledger Processing",
    desc: "Eliminate manual entry. Our systems use machine learning to categorize and process invoices, receipts, and bank statements with 99% accuracy."
  },
  {
    icon: <BarChart3 className="text-accent" size={32} />,
    title: "Real-time Reconciliation",
    desc: "Move away from monthly closings. Get a live view of your financial health with automated bank-to-ledger matching that runs 24/7."
  },
  {
    icon: <Calculator className="text-accent" size={32} />,
    title: "Tax-Ready Infrastructure",
    desc: "Bespoke systems that automatically generate financial statements and compliance reports, ensuring your books are always audit-ready."
  },
  {
    icon: <ShieldCheck className="text-accent" size={32} />,
    title: "Revenue Forecasting",
    desc: "Dynamic dashboards that connect directly to your sales data to provide predictive cash-flow modeling and trend analysis."
  }
];

export default function FinancialAutomationCards() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".fin-card", {
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
        <div key={i} className="fin-card bg-dark-surface p-10 rounded-[32px] border border-white/5 hover:border-accent/30 transition-all duration-500 group">
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

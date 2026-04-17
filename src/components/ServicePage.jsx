import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ServicePage() {
  const { slug } = useParams();
  
  // Map slug to human readable title
  const titles = {
    'website-design-development': 'Website Design and Development',
    'seo': 'Search Engine Optimization',
    'digital-strategy': 'Digital Strategy',
    'branding': 'Branding & Identity',
    'maintenance': 'Systems Maintenance'
  };

  const title = titles[slug] || 'Service Offering';

  return (
    <div className="min-h-screen bg-dark pt-32 pb-20 px-6">
      <div className="max-w-[1320px] mx-auto">
        <Link to="/" className="flex items-center gap-2 text-accent mb-12 hover:-translate-x-1 transition-transform w-fit font-body">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <div className="pill-tag px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 mb-8 w-fit">
          <span className="font-mono text-accent text-xs tracking-widest uppercase font-medium">✦ Service Category</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-heading font-semibold text-light tracking-[-0.04em] mb-12 leading-[1.1]">
          {title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <p className="font-body text-xl md:text-2xl text-light/80 leading-relaxed">
              We are currently engineering the full details for this capability. Our approach to {title.toLowerCase()} focuses on high-performance logic and cinematic aesthetics.
            </p>
            <p className="font-body text-lg text-muted leading-relaxed">
              This page will soon feature our full technical methodology, case studies, and integrated performance metrics for this specific offering.
            </p>
          </div>
          
          <div className="bg-dark-surface p-12 rounded-[24px] border border-border/10 flex flex-col justify-between h-[400px]">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-light mb-4">Request Specs</h3>
              <p className="font-body text-muted mb-8">Want to see our previous work and technical stack for this service?</p>
            </div>
            <button className="bg-accent text-dark font-body font-medium px-8 py-4 rounded-full w-full hover:scale-[1.02] transition-transform">
              Get the Capabilities Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

// NEW GOOGLE SHEET CSV URL HERE
// Example: 'https://docs.google.com/spreadsheets/d/e/2PAC.../pub?output=csv'
const CMS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQh7STGpeUU1gEjKFifVncLS0ATzDz8CM7qJcf6cl11Jn-Me5QrquN7Da5edNvseiAnhil-qoW0Cw4/pub?output=csv';

export default function ServicePage() {
  const { slug } = useParams();
  const [projects, setProjects] = useState([]);
  const gridRef = useRef(null);
  const [loading, setLoading] = useState(true);
  
  // Map slug to human readable title
  const titles = {
    'website-design-development': 'Website Design and Development',
    'seo': 'Search Engine Optimization',
    'digital-strategy': 'Digital Strategy',
    'branding': 'Branding & Identity',
    'maintenance': 'Systems Maintenance'
  };

  const title = titles[slug] || 'Service Offering';

  useEffect(() => {
    if (slug === 'website-design-development') {
      setLoading(true);
      fetch(CMS_CSV_URL)
        .then(res => res.text())
        .then(text => {
          const rows = [];
          let row = [];
          let col = '';
          let inQuotes = false;
          for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (inQuotes) {
              if (char === '"' && text[i+1] === '"') { col += '"'; i++; }
              else if (char === '"') inQuotes = false;
              else col += char;
            } else {
              if (char === '"') inQuotes = true;
              else if (char === ',') { row.push(col); col = ''; }
              else if (char === '\n' || (char === '\r' && text[i+1] === '\n')) {
                row.push(col); rows.push(row); row = []; col = '';
                if (char === '\r') i++;
              } else { col += char; }
            }
          }
          row.push(col); rows.push(row);

          // Auto-detect new vs old spreadsheet schema based on number of columns
          const dataRows = rows.slice(1).filter(r => r.length > 3); // Minimum columns
          
          const mapped = dataRows.map(r => {
            const isNewFormat = r.length > 12;
            
            // Map indices dynamically
            const statusIdx = isNewFormat ? 15 : 8;
            if (r[statusIdx] && r[statusIdx].trim().toLowerCase() !== 'publish') return null;

            let coverUrl = isNewFormat ? r[5] : r[6];
            coverUrl = coverUrl || '';
            
            if (coverUrl.includes('drive.google.com/file/d/')) {
              const idMatch = coverUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
              if (idMatch && idMatch[1]) {
                coverUrl = `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
              }
            }

            const clientName = isNewFormat ? r[1] : (r[0] || '').split(' ')[0];
            const industry = isNewFormat ? r[2] : 'Productivity';
            
            let stackTags = [];
            if (isNewFormat) {
              stackTags = r[8] ? r[8].split(',').map(s => s.trim()).filter(Boolean) : [];
            } else {
              stackTags = [r[3], r[4], r[5]].filter(Boolean);
            }

            return {
              title: r[0],
              clientName: clientName,
              industry: industry,
              shortDesc: isNewFormat ? r[3] : r[1],
              skills: stackTags,
              coverUrl
            };
          }).filter(Boolean);
          
          setProjects(mapped);
          setLoading(false);
        }).catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!loading && projects.length > 0 && gridRef.current) {
      let ctx = gsap.context(() => {
        gsap.fromTo(".cms-proj-card", 
          { y: 50, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.8, ease: "power3.out" }
        );
      }, gridRef);
      return () => ctx.revert();
    }
  }, [loading, projects]);

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
        
        {slug === 'website-design-development' ? (
          loading ? (
            <div className="flex animate-pulse gap-4 text-accent font-mono py-12">Fetching from CMS...</div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, i) => (
                <div key={i} className="cms-proj-card flex flex-col bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
                  
                  {/* Top Image Section */}
                  <div className="relative w-full h-[240px] bg-gray-100 overflow-hidden">
                    <img 
                      src={proj.coverUrl || 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=800&q=80'} 
                      alt={proj.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    {/* Industry Pill Overlaid */}
                    <div className="absolute left-4 bottom-4 bg-[#2C2C2C]/90 backdrop-blur-sm text-white/95 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-wide uppercase shadow-md">
                      {proj.industry}
                    </div>
                  </div>

                  {/* Bottom Content Section */}
                  <div className="p-8 flex flex-col flex-grow">
                    
                    <div className="font-mono text-[10px] text-blue-600 uppercase tracking-[0.2em] font-semibold mb-3">
                      {proj.clientName}
                    </div>
                    
                    <h3 className="font-serif italic text-2xl text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {proj.title}
                    </h3>
                    
                    <p className="font-body text-slate-500 text-[15px] leading-relaxed mb-6 flex-grow">
                      {proj.shortDesc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {proj.skills.map((skill, si) => (
                        <span key={si} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-mono rounded-md font-medium tracking-wide">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex items-center gap-2 text-blue-600 font-body text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      View Details
                      <ArrowLeft size={16} className="rotate-180" />
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          )
        ) : (
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
        )}
      </div>
    </div>
  );
}

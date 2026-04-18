import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { gsap } from 'gsap';
import BrowserMockupSVG from './BrowserMockupSVG';
import SEOCards from './SEOCards';
import DigitalStrategyCards from './DigitalStrategyCards';
import signalSvg from '../assets/signal_amplification.svg';
import assemblingSvg from '../assets/scattered_components_assembling.svg';

// NEW GOOGLE SHEET CSV URL HERE
// Pointing specifically to the "websites" tab instead of the "projects" tab via gid=2134175586 & single=true
const CMS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSQh7STGpeUU1gEjKFifVncLS0ATzDz8CM7qJcf6cl11Jn-Me5QrquN7Da5edNvseiAnhil-qoW0Cw4/pub?gid=2134175586&single=true&output=csv';

export default function ServicePage() {
  const { slug } = useParams();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const gridRef = useRef(null);
  const modalRef = useRef(null);
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
            if (!r[statusIdx] || r[statusIdx].trim().toLowerCase() !== 'publish') return null;

            let coverUrl = isNewFormat ? r[5] : r[6];
            coverUrl = coverUrl || '';
            
            // Fix Google Drive Embed URLs
            if (coverUrl.includes('drive.google.com/file/d/')) {
              const idMatch = coverUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
              if (idMatch && idMatch[1]) {
                coverUrl = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
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
              fullDesc: isNewFormat ? r[4] : r[2], // Map full description correctly depending on format
              liveUrl: isNewFormat ? r[6] : r[7],
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

  useEffect(() => {
    if (selectedProject && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-dark pt-32 pb-20 px-6 relative overflow-hidden">
      
      <div className="max-w-[1320px] mx-auto relative z-10">
        <Link to="/" className="flex items-center gap-2 text-accent mb-12 hover:-translate-x-1 transition-transform w-fit font-body">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
          {/* Left Side: Category and Title */}
          <div className="flex flex-col items-start pr-0 lg:pr-8">
            <div className="pill-tag px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 mb-8 w-fit">
              <span className="font-mono text-accent text-xs tracking-widest uppercase font-medium">✦ Service Category</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold text-light tracking-[-0.04em] leading-[1.1]">
              {title}
            </h1>
          </div>
          
          {/* Right Side: Interactive Animated component */}
          <div className="w-full flex justify-center lg:justify-end">
            {slug === 'website-design-development' && (
              <BrowserMockupSVG />
            )}
            {slug === 'seo' && (
              <img 
                src={signalSvg} 
                alt="Search Engine Signal Amplification" 
                className="w-full max-w-[600px] xl:max-w-[700px] h-auto object-contain opacity-90 drop-shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:opacity-100 hover:drop-shadow-[0_0_60px_rgba(99,102,241,0.25)] transition-all duration-700" 
              />
            )}
            {slug === 'digital-strategy' && (
              <img 
                src={assemblingSvg} 
                alt="Digital Strategy Assembling" 
                className="w-full max-w-[600px] xl:max-w-[700px] h-auto object-contain opacity-90 drop-shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:opacity-100 hover:drop-shadow-[0_0_60px_rgba(99,102,241,0.25)] transition-all duration-700" 
              />
            )}
          </div>
        </div>
        
        {slug === 'website-design-development' ? (
          loading ? (
            <div className="flex animate-pulse gap-4 text-accent font-mono py-12">Fetching from CMS...</div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, i) => (
                <div key={i} className="cms-proj-card flex flex-col bg-dark-surface rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/20 group">
                  
                  {/* Top Image Section */}
                  <div className="relative w-full h-[240px] overflow-hidden bg-[#0A0A0A]">
                    <img 
                      src={proj.coverUrl || 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=800&q=80'} 
                      alt={proj.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                    />
                    
                    {/* Industry Pill Overlaid */}
                    <div className="absolute left-6 bottom-4 bg-white/10 backdrop-blur-md text-white/95 px-4 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase border border-white/20">
                      {proj.industry}
                    </div>
                  </div>

                  {/* Bottom Content Section */}
                  <div className="p-8 flex flex-col flex-grow">
                    
                    <div className="font-mono text-[11px] text-accent uppercase tracking-widest font-semibold mb-3">
                      {proj.clientName}
                    </div>
                    
                    <h3 className="font-heading text-2xl font-semibold text-white leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
                      {proj.title}
                    </h3>
                    
                    <p className="font-body text-white/70 text-[15px] leading-relaxed mb-6 flex-grow">
                      {proj.shortDesc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {proj.skills.map((skill, si) => (
                        <span key={si} className="px-3 py-1 bg-white/5 border border-white/10 text-white/90 text-[11px] font-mono rounded-full font-medium tracking-wide">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setSelectedProject(proj)}
                      className="mt-auto flex items-center gap-2 text-accent font-body text-sm font-semibold hover:gap-3 transition-all duration-300"
                    >
                      View Details
                      <ArrowLeft size={16} className="rotate-180" />
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
          )
        ) : slug === 'seo' ? (
          <SEOCards />
        ) : slug === 'digital-strategy' ? (
          <DigitalStrategyCards />
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

        {/* Lightbox Modal Overlay */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-dark/80 backdrop-blur-md">
            <div 
              ref={modalRef} 
              className="relative w-full max-w-[900px] max-h-[90vh] bg-dark-surface border border-border/20 rounded-[32px] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-dark/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-dark/80 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Modal Content Scroll Area */}
              <div className="overflow-y-auto w-full h-full custom-scrollbar">
                
                {/* Hero Image */}
                <div className="w-full h-[300px] md:h-[400px] relative bg-[#0A0A0A]">
                  <img 
                    src={selectedProject.coverUrl || 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1200&q=80'} 
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent"></div>
                  <div className="absolute left-8 md:left-12 bottom-8">
                    <div className="bg-accent/20 backdrop-blur-md text-accent border border-accent/20 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase mb-4 w-fit">
                      {selectedProject.industry}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-8 md:p-12 flex flex-col gap-8">
                  <div>
                    <div className="font-mono text-xs text-white/50 uppercase tracking-widest font-semibold mb-2">
                      Client: <span className="text-accent">{selectedProject.clientName}</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white tracking-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="h-[1px] w-full bg-border/10"></div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Left Column: Descriptions */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                      <div>
                        <h4 className="font-heading text-xl text-white mb-3">Project Overview</h4>
                        <p className="font-body text-white/70 text-lg leading-relaxed">
                          {selectedProject.fullDesc || selectedProject.shortDesc || "No structured description was provided for this project."}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Meta Info */}
                    <div className="md:col-span-1 flex flex-col gap-8">
                      <div>
                        <h4 className="font-heading text-lg text-white mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.skills.map((skill, si) => (
                            <span key={si} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/90 text-xs font-mono rounded-full font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {selectedProject.liveUrl && selectedProject.liveUrl !== '[URL]' && (
                        <div>
                          <a 
                            href={selectedProject.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex py-4 px-8 bg-accent text-white font-body font-semibold rounded-full items-center gap-3 hover:scale-[1.02] transition-transform"
                          >
                            Visit Live Site
                            <ArrowLeft size={18} className="rotate-180" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

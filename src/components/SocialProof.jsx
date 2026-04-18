import { Zap, Code2, MessageSquare, Brain, Sparkles, Share2, FileCode2, Database, Globe, Github } from 'lucide-react';

export default function SocialProof() {
  const logos = [
    { id: 1, icon: Zap, name: "bolt.new" },
    { id: 2, icon: Code2, name: "replit" },
    { id: 3, icon: MessageSquare, name: "ChatGPT" },
    { id: 4, icon: Brain, name: "Claude code" },
    { id: 5, icon: Sparkles, name: "Gemini" },
    { id: 6, icon: Share2, name: "n8n" },
    { id: 7, icon: FileCode2, name: "Python" },
    { id: 8, icon: Database, name: "supabase" },
    { id: 9, icon: Globe, name: "netlify" },
    { id: 10, icon: Github, name: "github" }
  ];

  return (
    <section className="w-full py-16 bg-light border-b border-border/50 overflow-hidden relative z-10">
      <div className="text-center mb-10">
        <p className="font-mono text-sm text-muted uppercase tracking-widest pl-2">Tools we work in</p>
      </div>
      
      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden shrink-0 pb-6 relative group mask-image-linear">
        
        {/* Animated Track */}
        <div className="flex animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] w-max">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="flex items-center gap-3 px-8 md:px-12 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <logo.icon size={28} className="text-dark" />
              <span className="font-heading font-semibold text-xl text-dark tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .mask-image-linear {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `}} />
      </div>
    </section>
  );
}

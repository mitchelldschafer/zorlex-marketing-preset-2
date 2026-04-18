import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Target, Cpu, Zap, Award } from 'lucide-react';

export default function About() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".about-header", { opacity: 0, y: 30, duration: 1, ease: "power3.out" })
        .from(".about-grid-item", { opacity: 0, y: 40, stagger: 0.2, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="min-h-screen bg-dark pt-40 pb-32 px-6">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header Section */}
        <div className="about-header mb-24 max-w-[800px]">
          <h1 className="text-5xl md:text-8xl font-heading font-semibold text-light mb-8 tracking-[-0.04em]">
            Obsessed with <span className="italic font-light text-accent">performance.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-body leading-relaxed">
            Zorlex is a technical creative agency specialized in engineering high-conversion digital experiences. We don't just build websites; we architect cinematic sales engines that command attention.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="about-grid-item p-12 bg-dark-surface rounded-[40px] border border-white/5 group hover:border-accent/30 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Target className="text-accent" size={32} />
            </div>
            <h3 className="text-3xl font-heading font-semibold text-white mb-6">Our Mission</h3>
            <p className="text-lg text-white/60 leading-relaxed font-body">
              To dismantle the status quo of "good enough" web design. We provide ambitious brands with the technical superiorities and visual leverage required to dominate their sectors through algorithmic strategy and premium engineering.
            </p>
          </div>

          <div className="about-grid-item p-12 bg-dark-surface rounded-[40px] border border-white/5 group hover:border-accent/30 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Cpu className="text-accent" size={32} />
            </div>
            <h3 className="text-3xl font-heading font-semibold text-white mb-6">Our Philosophy</h3>
            <p className="text-lg text-white/60 leading-relaxed font-body">
              We believe speed is a feature, and design is a science. Every pixel and every line of code is measured against its ability to drive user action. If it doesn't contribute to growth, it doesn't belong in the build.
            </p>
          </div>

          <div className="about-grid-item p-12 bg-dark-surface rounded-[40px] border border-white/5 group hover:border-accent/30 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Zap className="text-accent" size={32} />
            </div>
            <h3 className="text-3xl font-heading font-semibold text-white mb-6">Technical Edge</h3>
            <p className="text-lg text-white/60 leading-relaxed font-body">
              Utilizing the latest in AI-driven automation, advanced GSAP animation libraries, and edge-computing infrastructure, we ensure your brand operates on the bleeding edge of what is possible on the modern web.
            </p>
          </div>

          <div className="about-grid-item p-12 bg-dark-surface rounded-[40px] border border-white/5 group hover:border-accent/30 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Award className="text-accent" size={32} />
            </div>
            <h3 className="text-3xl font-heading font-semibold text-white mb-6">Built for Trust</h3>
            <p className="text-lg text-white/60 leading-relaxed font-body">
              Premium results require premium trust. We operate with radical transparency, providing our clients with deep technical insights and measurable data points that prove the ROI of high-end engineering.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

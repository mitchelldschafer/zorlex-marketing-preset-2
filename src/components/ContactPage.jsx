import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, MessageSquare, Send, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".contact-header", { opacity: 0, y: 30, duration: 1, ease: "power3.out" })
        .from(".contact-form-item", { opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="min-h-screen bg-dark pt-40 pb-32 px-6">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Header Section */}
        <div className="contact-header mb-24 max-w-[800px]">
          <h1 className="text-5xl md:text-8xl font-heading font-semibold text-light mb-8 tracking-[-0.04em]">
            Start a <span className="italic font-light text-accent">project.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-body leading-relaxed">
            Ready to eclipse the competition? Tell us about your vision. We’re ready to architect your next digital advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Form Tier */}
          <div className="flex flex-col gap-8">
            <div className="contact-form-item flex flex-col gap-2">
              <label className="text-sm font-mono text-muted uppercase tracking-widest pl-2">Full Name</label>
              <input type="text" placeholder="John Doe" className="bg-dark-surface border border-white/5 rounded-2xl p-6 text-white font-body focus:outline-none focus:border-accent/50 transition-colors" />
            </div>

            <div className="contact-form-item flex flex-col gap-2">
              <label className="text-sm font-mono text-muted uppercase tracking-widest pl-2">Email Address</label>
              <input type="email" placeholder="john@company.com" className="bg-dark-surface border border-white/5 rounded-2xl p-6 text-white font-body focus:outline-none focus:border-accent/50 transition-colors" />
            </div>

            <div className="contact-form-item flex flex-col gap-2">
              <label className="text-sm font-mono text-muted uppercase tracking-widest pl-2">Services Needed</label>
              <select className="bg-dark-surface border border-white/5 rounded-2xl p-6 text-white font-body focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer">
                <option>Website Design & Development</option>
                <option>Search Engine Optimization</option>
                <option>Digital Strategy</option>
                <option>Branding & Identity</option>
                <option>Full Agency Retainer</option>
              </select>
            </div>

            <div className="contact-form-item flex flex-col gap-2">
              <label className="text-sm font-mono text-muted uppercase tracking-widest pl-2">Project Details</label>
              <textarea rows="5" placeholder="Tell us about your objectives..." className="bg-dark-surface border border-white/5 rounded-2xl p-6 text-white font-body focus:outline-none focus:border-accent/50 transition-colors resize-none"></textarea>
            </div>

            <button className="contact-form-item relative overflow-hidden bg-accent text-dark font-body font-semibold text-lg px-12 py-5 rounded-full group hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-3">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Submit Project Brief</span>
              <Send size={20} className="relative z-10 group-hover:text-white transition-colors duration-300" />
              <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
            </button>
          </div>

          {/* Contact Details Tier */}
          <div className="flex flex-col gap-12">
            <div className="contact-form-item p-12 bg-accent/5 rounded-[40px] border border-accent/10 flex flex-col gap-6">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
                <Mail className="text-accent" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-white">General Inquiries</h3>
              <p className="text-white/60 font-body leading-relaxed">For general questions or partnership opportunities, reach out via our direct channel.</p>
              <a href="mailto:hello@zorlex.com" className="text-xl text-accent font-medium hover:text-white transition-colors flex items-center gap-2 group">
                hello@zorlex.com
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </a>
            </div>

            <div className="contact-form-item p-12 bg-white/5 rounded-[40px] border border-white/5 flex flex-col gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <MessageSquare className="text-light-surface" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-white">Client Support</h3>
              <p className="text-white/60 font-body leading-relaxed">Current clients needing technical assistance or maintenance updates.</p>
              <a href="mailto:support@zorlex.com" className="text-xl text-white font-medium hover:text-accent transition-colors flex items-center gap-2 group">
                support@zorlex.com
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

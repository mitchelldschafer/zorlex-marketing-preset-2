import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Leadership() {
  return (
    <section id="leadership" className="scroll-mt-28 border-t border-white/5 pt-16 sm:pt-28">
      <div className="max-w-[1320px] mx-auto">
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 mb-6 text-xs font-mono tracking-[0.18em] text-accent uppercase">
            <Sparkles size={14} /> Leadership
          </div>
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-semibold leading-[0.92] tracking-[-0.06em] text-light">
            Built with ambition.<br />
            <span className="italic font-light text-accent">Led with intention.</span>
          </h1>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white/10 bg-dark-surface aspect-[4/5] max-h-[760px]">
            <img
              src="/mitchell-schafer.jpg"
              alt="Mitchell Schafer, founder of Zorlex AI"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
              <span className="font-mono text-xs tracking-[0.18em] text-white/70 uppercase">Zorlex AI / 01</span>
              <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_20px_5px_rgba(123,107,255,0.45)]" />
            </div>
          </div>

          <div className="lg:py-10">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-5">Founder &amp; Digital Strategist</p>
            <h2 className="font-heading text-4xl sm:text-6xl font-semibold tracking-[-0.05em] text-light mb-7">Mitchell Schafer</h2>
            <p className="max-w-xl font-body text-lg sm:text-xl leading-relaxed text-white/70 mb-6">
              Mitchell leads Zorlex with a focus on turning ambitious ideas into high-performing digital experiences. He combines strategy, design, and modern technology to help brands move with clarity and momentum.
            </p>
            <p className="max-w-xl font-body text-base sm:text-lg leading-relaxed text-white/50 mb-10">
              From the first concept to a refined launch, every engagement is built around practical outcomes: a sharper brand, a stronger web presence, and systems that make growth easier to sustain.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-body text-sm font-medium text-dark transition-transform duration-300 hover:scale-105"
            >
              Start a conversation <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

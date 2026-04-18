import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Search, Bot, Zap, LineChart, Target, Code } from 'lucide-react';

const seoFeatures = [
  {
    icon: <Search className="text-accent" size={24} />,
    title: "Technical SEO & Architecture",
    description: "We rebuild your foundational architecture for maximum crawlability and indexing speed. This includes server-side rendering optimizations, semantic HTML structuring, dynamic XML sitemaps, and strict core web vitals compliance to ensure search engines can instantly parse and rank your content."
  },
  {
    icon: <Bot className="text-accent" size={24} />,
    title: "AEO (AI Engine Optimization)",
    description: "Traditional search is evolving. We optimize your digital presence for Large Language Models (LLMs) like ChatGPT, Claude, and Gemini. By structuring data mathematically and utilizing entity-based optimization, we ensure your brand is cited as the authoritative source in AI-generated answers."
  },
  {
    icon: <Target className="text-accent" size={24} />,
    title: "Intent-Driven Content Strategy",
    description: "We don't just target high-volume keywords; we map content directly to user intent and buyer journeys. Our algorithmic analysis identifies semantic gaps in your market, allowing us to deploy hyper-relevant, authoritative content that dominates long-tail queries and highly specific search intents."
  },
  {
    icon: <Code className="text-accent" size={24} />,
    title: "Schema Markup & Rich Snippets",
    description: "We implement advanced JSON-LD schema markup across your entire platform. Translating your business context into structured data gives search engines and AI models unambiguous understanding of your products, reviews, and services, driving higher click-through rates via rich snippets."
  },
  {
    icon: <Zap className="text-accent" size={24} />,
    title: "Performance & Page Experience",
    description: "Speed is a ranking factor. We deploy aggressive caching strategies, edge networking (CDN), next-gen image formats, and minimal thread-blocking JavaScript. Delivering sub-second load times signals extreme quality to algorithms and significantly improves user retention metrics."
  },
  {
    icon: <LineChart className="text-accent" size={24} />,
    title: "Predictive Analytics & Tracking",
    description: "Optimization is an iterative science. We implement server-side tracking and advanced analytics to monitor real-time SERP volatility, keyword cannibalization, and conversion attribution. This data fuels our continuous deployment of algorithmic adjustments to maintain your competitive edge."
  }
];

export default function SEOCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".seo-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {seoFeatures.map((feature, i) => (
        <div 
          key={i} 
          className="seo-card bg-dark-surface p-8 rounded-[24px] border border-border/20 hover:border-accent/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 flex flex-col gap-6 group hover:-translate-y-1"
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

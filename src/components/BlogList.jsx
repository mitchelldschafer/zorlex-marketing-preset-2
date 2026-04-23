import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { client, queries, urlFor } from "../lib/sanity";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    client
      .fetch(queries.posts)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && posts.length > 0) {
      let ctx = gsap.context(() => {
        gsap.from(".blog-card", {
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, posts]);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-[1320px] mx-auto">
        <header className="mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8">
            <span className="font-mono text-accent text-xs tracking-widest uppercase font-medium">✦ Thinking & Engineering</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold text-light tracking-[-0.04em] leading-[0.9]">
            Architecting the <span className="italic font-light">future.</span>
          </h1>
        </header>

        {loading ? (
          <div className="flex animate-pulse gap-4 text-accent font-mono py-12">Fetching ideas from the edge...</div>
        ) : (
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, i) => (
              <Link 
                key={i} 
                to={`/blog/${post.slug.current}`}
                className="blog-card group bg-dark-surface rounded-[24px] border border-border/10 overflow-hidden flex flex-col transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(123,107,255,0.05)]"
              >
                <div className="relative h-64 overflow-hidden">
                  {post.mainImage ? (
                    <img 
                      src={urlFor(post.mainImage).width(800).url()} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark/50 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/5 animate-pulse" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {post.categories?.map((cat, ci) => (
                      <span key={ci} className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90 uppercase tracking-widest">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-white/40 font-mono text-[11px] mb-4">
                    <Calendar size={12} />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  
                  <h3 className="font-heading text-2xl font-semibold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="font-body text-white/60 text-[15px] leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-accent font-semibold text-sm font-body">
                    Read Post <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

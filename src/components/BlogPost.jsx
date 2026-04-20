import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { client, queries, urlFor } from "../lib/sanity";
import { PortableText } from "@portabletext/react";
import { gsap } from "gsap";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

// PortableText components for custom rendering
const ptComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-12 rounded-[32px] overflow-hidden">
        <img 
          src={urlFor(value).url()} 
          alt={value.alt || "Blog image"} 
          className="w-full h-auto object-cover"
        />
        {value.caption && (
          <figcaption className="mt-4 text-center text-sm font-mono text-white/40 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-heading font-semibold text-light mt-16 mb-8 tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl md:text-4xl font-heading font-semibold text-light mt-12 mb-6 tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl md:text-3xl font-heading font-semibold text-light mt-10 mb-4 tracking-tight">{children}</h3>,
    normal: ({ children }) => <p className="text-lg text-white/70 font-body leading-[1.8] mb-8">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent bg-accent/5 p-8 my-10 rounded-r-2xl italic text-xl text-white/90">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a href={value.href} rel={rel} className="text-accent underline hover:text-accent/80 transition-colors">
          {children}
        </a>
      );
    },
    code: ({ children }) => <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-accent text-sm">{children}</code>,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    client
      .fetch(queries.postBySlug, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (!loading && post) {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [loading, post]);

  if (loading) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="animate-pulse text-accent font-mono">Decoding transmissions...</div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl text-white font-heading mb-8 uppercase tracking-widest">Entry Not Found</h1>
      <Link to="/blog" className="text-accent flex items-center gap-2 hover:gap-3 transition-all font-body">
        <ArrowLeft size={20} /> Return to Blog
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] mb-20 overflow-hidden">
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1600).url()} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-12">
          <div className="max-w-[800px] mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-accent bg-accent/10 backdrop-blur-md px-4 py-2 rounded-full border border-accent/20 mb-8 hover:bg-accent/20 transition-all font-body text-sm">
              <ArrowLeft size={16} /> Back to Thinking
            </Link>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-semibold text-light tracking-tight leading-[1.1] mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/50 font-mono text-xs uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-accent" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-accent" />
                5 min read
              </div>
              <div className="flex items-center gap-2">
                <Share2 size={14} className="text-accent" />
                Share Insight
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <article ref={contentRef} className="max-w-[800px] mx-auto px-6">
        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText value={post.body} components={ptComponents} />
        </div>

        {/* Footer Meta */}
        <div className="mt-20 pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase block mb-2">Written By</span>
            <span className="text-lg text-white font-medium">{post.authorName || "Zorlex Engineering"}</span>
          </div>
          <div className="flex gap-4">
            {post.categories?.map((cat, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/60 tracking-wider">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

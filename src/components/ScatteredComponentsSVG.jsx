import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ScatteredComponentsSVG() {
  const svgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Sub-components assembling
      gsap.from(".scattered-part", {
        x: () => Math.random() * 400 - 200,
        y: () => Math.random() * 400 - 200,
        rotation: () => Math.random() * 90 - 45,
        opacity: 0,
        scale: 0.5,
        duration: 2.5,
        stagger: 0.15,
        ease: "elastic.out(1, 0.7)",
      });

      // Flow lines
      gsap.from(".flow-line", {
        scaleX: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1.5,
        transformOrigin: "left center"
      });

      // Central core breathing 
      gsap.to(".system-core", {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center center"
      });
      
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} width="100%" viewBox="0 0 680 440" className="w-full max-w-[600px] xl:max-w-[700px] h-auto drop-shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:drop-shadow-[0_0_60px_rgba(99,102,241,0.25)] transition-all duration-700">
      <defs>
        <radialGradient id="systemGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity=".2"/>
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect x="80" y="90" width="520" height="260" rx="12" fill="none" stroke="#C7D2FE" strokeWidth="1" strokeDasharray="6 4" opacity="0.5"/>
      <circle cx="340" cy="220" r="180" fill="url(#systemGlow)" />

      <g className="flow-line" fill="none" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round">
        <line x1="220" y1="160" x2="300" y2="160" />
        <line x1="380" y1="160" x2="460" y2="160" />
        <line x1="220" y1="300" x2="300" y2="300" />
        <line x1="380" y1="300" x2="460" y2="300" />
      </g>

      <g className="flow-line" fill="none" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round">
        <line x1="180" y1="200" x2="180" y2="260" />
        <line x1="340" y1="200" x2="340" y2="260" />
        <line x1="500" y1="200" x2="500" y2="260" />
      </g>

      <g className="scattered-part" style={{transformOrigin: "180px 160px"}}>
        <rect x="140" y="130" width="80" height="60" rx="8" fill="#ffffff" stroke="#4F46E5" strokeWidth="1.2"/>
        <rect x="152" y="144" width="28" height="6" rx="3" fill="#4F46E5"/>
        <rect x="152" y="156" width="44" height="3" rx="1.5" fill="#C7D2FE"/>
        <rect x="152" y="164" width="36" height="3" rx="1.5" fill="#C7D2FE"/>
        <circle cx="200" cy="178" r="4" fill="#6366F1"/>
      </g>

      <g className="scattered-part system-core" style={{transformOrigin: "340px 160px"}}>
        <rect x="300" y="130" width="80" height="60" rx="8" fill="#4F46E5"/>
        <circle cx="320" cy="160" r="8" fill="#ffffff"/>
        <rect x="334" y="152" width="34" height="5" rx="2.5" fill="#ffffff"/>
        <rect x="334" y="162" width="26" height="3" rx="1.5" fill="#93C5FD"/>
        <rect x="334" y="170" width="20" height="3" rx="1.5" fill="#93C5FD"/>
      </g>

      <g className="scattered-part" style={{transformOrigin: "500px 160px"}}>
        <rect x="460" y="130" width="80" height="60" rx="8" fill="#1A1A24" stroke="#6366F1" strokeWidth="1"/>
        <polyline points="472,175 484,160 498,170 512,150 528,162" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="484" cy="160" r="2.5" fill="#4F46E5"/>
        <circle cx="498" cy="170" r="2.5" fill="#4F46E5"/>
      </g>

      <g className="scattered-part" style={{transformOrigin: "180px 300px"}}>
        <rect x="140" y="270" width="80" height="60" rx="8" fill="#ffffff" stroke="#6366F1" strokeWidth="1"/>
        <circle cx="180" cy="300" r="12" fill="#1A1A24" stroke="#4F46E5" strokeWidth="1"/>
        <path d="M175 300 L179 304 L185 296" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      <g className="scattered-part" style={{transformOrigin: "340px 300px"}}>
        <rect x="300" y="270" width="80" height="60" rx="8" fill="#ffffff" stroke="#4F46E5" strokeWidth="1.2"/>
        <rect x="312" y="284" width="56" height="4" rx="2" fill="#4F46E5"/>
        <rect x="312" y="294" width="40" height="3" rx="1.5" fill="#C7D2FE"/>
        <rect x="312" y="302" width="48" height="3" rx="1.5" fill="#C7D2FE"/>
        <rect x="312" y="312" width="32" height="6" rx="3" fill="#4F46E5"/>
      </g>

      <g className="scattered-part" style={{transformOrigin: "500px 300px"}}>
        <rect x="460" y="270" width="80" height="60" rx="8" fill="#6366F1"/>
        <rect x="474" y="284" width="52" height="4" rx="2" fill="#ffffff" opacity=".9"/>
        <g transform="translate(474 296)">
          <rect x="0" y="0" width="10" height="18" rx="2" fill="#ffffff" opacity=".4"/>
          <rect x="14" y="4" width="10" height="14" rx="2" fill="#ffffff" opacity=".6"/>
          <rect x="28" y="-2" width="10" height="20" rx="2" fill="#ffffff" opacity=".8"/>
        </g>
      </g>
      
      <text x="340" y="400" textAnchor="middle" fill="#4F46E5" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="500" letterSpacing=".5" opacity="0.6">ONE CONNECTED SYSTEM</text>
    </svg>
  );
}

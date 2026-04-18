import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BrandingSwatchesSVG() {
  const svgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Swatches flying in
      gsap.from(".swatch", {
        y: 100,
        x: (i) => (i % 2 === 0 ? -50 : 50),
        rotation: (i) => (i % 2 === 0 ? -15 : 15),
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Subtle floating animation for the whole system
      gsap.to(".swatch-grid", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Highlight pulse
      gsap.to(".swatch-highlight", {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: "sine.inOut"
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  const swatches = [
    { x: 100, y: 100, color: "#6366F1" }, // Electric Indigo
    { x: 220, y: 100, color: "#4F46E5" }, // Indigo
    { x: 340, y: 100, color: "#4338CA" }, // Darker Indigo
    { x: 460, y: 100, color: "#3730A3" }, // Even Darker
    
    { x: 100, y: 220, color: "#93C5FD" }, // Sky Blue
    { x: 220, y: 220, color: "#60A5FA" }, // Blue
    { x: 340, y: 220, color: "#3B82F6" }, // Royal Blue
    { x: 460, y: 220, color: "#2563EB" }, // Dark Blue
  ];

  return (
    <svg ref={svgRef} width="100%" viewBox="0 0 680 440" className="w-full max-w-[600px] xl:max-w-[700px] h-auto drop-shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:drop-shadow-[0_0_60px_rgba(99,102,241,0.25)] transition-all duration-700">
      <defs>
        <radialGradient id="brandingGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity=".15"/>
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <circle cx="340" cy="220" r="200" fill="url(#brandingGlow)" />
      
      <g className="swatch-grid">
        {/* Background Grid Lines */}
        <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
          {[100, 220, 340, 460, 580].map(x => <line key={'vx'+x} x1={x} y1={50} x2={x} y2={390} />)}
          {[100, 220, 340].map(y => <line key={'hy'+y} x1={50} y1={y} x2={630} y2={y} />)}
        </g>

        {swatches.map((s, i) => (
          <g key={i} className="swatch">
            <rect x={s.x} y={s.y} width="100" height="100" rx="16" fill={s.color} fillOpacity="0.9" stroke="#ffffff" strokeOpacity="0.1" />
            <rect x={s.x + 10} y={s.y + 10} width="80" height="20" rx="4" fill="#ffffff" fillOpacity="0.1" />
            <circle cx={s.x + 80} cy={s.y + 80} r="6" fill="#ffffff" fillOpacity="0.2" className="swatch-highlight" />
            <text x={s.x + 12} y={s.y + 85} fill="#ffffff" fillOpacity="0.4" fontFamily="monospace" fontSize="8" fontWeight="bold">{s.color}</text>
          </g>
        ))}
      </g>
      
      <text x="340" y="380" textAnchor="middle" fill="#4F46E5" fontFamily="var(--font-heading, sans-serif)" fontSize="12" fontWeight="600" letterSpacing="2" opacity="0.6">SYSTEMATIC COLOR ARCHITECTURE</text>
    </svg>
  );
}

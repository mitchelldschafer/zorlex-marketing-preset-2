import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MaintenancePulseSVG() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pulse animation
      const length = pathRef.current.getTotalLength();
      
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "none",
      })
      .to(pathRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });

      // Scanner line
      gsap.fromTo(".scanner-line", 
        { x: -100 },
        { 
          x: 700, 
          duration: 3, 
          repeat: -1, 
          ease: "none" 
        }
      );

      // Status dots
      gsap.to(".status-dot", {
        opacity: 0.3,
        scale: 0.8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut"
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  const ekgPath = "M0,220 L150,220 L170,180 L190,260 L210,140 L230,300 L250,220 L400,220 L420,180 L440,260 L460,140 L480,300 L500,220 L680,220";

  return (
    <svg ref={svgRef} width="100%" viewBox="0 0 680 440" className="w-full max-w-[600px] xl:max-w-[700px] h-auto drop-shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:drop-shadow-[0_0_60px_rgba(99,102,241,0.25)] transition-all duration-700">
      <defs>
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
          <stop offset="50%" stopColor="#6366F1" stopOpacity="1" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="scannerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity=".3"/>
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Grid background */}
      <rect x="0" y="0" width="680" height="440" fill="#0A0A0A" rx="24" />
      <g stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1">
        {Array.from({length: 18}).map((_, i) => <line key={'v'+i} x1={i*40} y1={0} x2={i*40} y2={440} />)}
        {Array.from({length: 12}).map((_, i) => <line key={'h'+i} x1={0} y1={i*40} x2={680} y2={440} />)}
      </g>

      {/* The EKG Path */}
      <path 
        ref={pathRef}
        d={ekgPath}
        fill="none"
        stroke="#6366F1"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glowing Head */}
      <g className="scanner-line">
        <circle cx="0" cy="220" r="8" fill="#93C5FD" opacity="0.8">
          <animate attributeName="cy" values="220;180;260;140;300;220;220;180;260;140;300;220" dur="3s" repeatCount="indefinite" calcMode="linear" />
        </circle>
        <rect x="-1" y="50" width="2" height="340" fill="url(#scannerGlow)" />
      </g>

      {/* Connectivity Status */}
      <g transform="translate(50, 50)">
        <circle cx="0" cy="0" r="5" fill="#10B981" className="status-dot" />
        <text x="15" y="5" fill="#10B981" fillOpacity="0.8" fontFamily="monospace" fontSize="10">Uptime: 99.9%</text>
        <circle cx="0" cy="25" r="5" fill="#6366F1" className="status-dot" />
        <text x="15" y="30" fill="#6366F1" fillOpacity="0.8" fontFamily="monospace" fontSize="10">System: Healthy</text>
      </g>
      
      <text x="340" y="380" textAnchor="middle" fill="#4F46E5" fontFamily="var(--font-mono, monospace)" fontSize="10" fontWeight="bold" letterSpacing="4" opacity="0.6">CONTINUOUS UPTIME MONITORING</text>
    </svg>
  );
}

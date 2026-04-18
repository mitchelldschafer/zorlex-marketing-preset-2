import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SignalAmplificationSVG() {
  const svgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Source pulse
      gsap.to(".source-core", {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center"
      });

      // Expanding waves
      gsap.fromTo(".signal-wave", 
        { r: 20, opacity: 1, strokeWidth: 2 },
        { 
          r: 250, 
          opacity: 0, 
          strokeWidth: 0, 
          duration: 3, 
          stagger: 1, 
          repeat: -1, 
          ease: "power1.out",
          transformOrigin: "center"
        }
      );

      // Audience dots appearing
      gsap.fromTo(".audience-dot",
        { opacity: 0.2, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: {
            each: 0.1,
            from: "random",
            repeat: -1,
            yoyo: true
          },
          ease: "sine.inOut",
          transformOrigin: "center"
        }
      );
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} width="100%" viewBox="0 0 680 440" className="w-full max-w-[600px] xl:max-w-[700px] h-auto drop-shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:drop-shadow-[0_0_60px_rgba(99,102,241,0.25)] transition-all duration-700">
      <defs>
        <radialGradient id="sourceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity=".3"/>
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="audienceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity=".2"/>
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Background Glows */}
      <circle cx="560" cy="220" r="130" fill="url(#audienceGlow)"/>
      <circle cx="150" cy="220" r="80" fill="url(#sourceGlow)"/>

      {/* Signal Waves */}
      <g fill="none" strokeWidth="2">
        <circle className="signal-wave" cx="150" cy="220" stroke="#4F46E5" />
        <circle className="signal-wave" cx="150" cy="220" stroke="#6366F1" />
        <circle className="signal-wave" cx="150" cy="220" stroke="#93C5FD" />
      </g>

      {/* Source Core */}
      <g className="source-core">
        <circle cx="150" cy="220" r="22" fill="#ffffff" stroke="#4F46E5" strokeWidth="2"/>
        <circle cx="150" cy="220" r="12" fill="#4F46E5"/>
        <rect x="143" y="213" width="14" height="14" rx="2" fill="#ffffff"/>
        <rect x="146" y="216" width="8" height="2" rx="1" fill="#4F46E5"/>
        <rect x="146" y="220" width="8" height="2" rx="1" fill="#4F46E5"/>
        <rect x="146" y="224" width="5" height="2" rx="1" fill="#4F46E5"/>
      </g>

      {/* Connection dots */}
      <g fill="#6366F1">
        {[0, 20, -20, 10, -10, 0].map((yOffset, i) => (
          <circle key={'conn'+i} cy={220 + yOffset} cx={250 + i * 40} r="3" className="audience-dot" />
        ))}
      </g>

      {/* Target Audience Cloud */}
      <g fill="#4F46E5">
        {[
          [500,140], [540,110], [580,130], [620,160],
          [510,190], [555,170], [600,200], [630,220],
          [500,240], [545,230], [590,260], [525,280],
          [570,290], [615,275], [490,310], [550,330],
          [600,320], [640,300]
        ].map(([cx, cy], i) => (
          <circle key={'aud'+i} cx={cx} cy={cy} r={Math.random() * 4 + 3} className="audience-dot" />
        ))}
      </g>

      <text x="150" y="280" textAnchor="middle" fill="#4F46E5" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="500">Your site</text>
      <text x="565" y="385" textAnchor="middle" fill="#4F46E5" fontFamily="var(--font-sans, sans-serif)" fontSize="11" fontWeight="500">Your audience</text>
    </svg>
  );
}

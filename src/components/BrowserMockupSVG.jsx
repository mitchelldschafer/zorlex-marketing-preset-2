import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BrowserMockupSVG() {
  const codeLinesRef = useRef([]);
  const uiBlocksRef = useRef([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Play animations once mounted
    let ctx = gsap.context(() => {
      // 1. Animate code lines being written
      gsap.fromTo(codeLinesRef.current, 
        { width: 0, opacity: 0 },
        { 
          width: (i, el) => el.getAttribute('data-w') || '100%', 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.15, 
          ease: "power2.out", 
          delay: 0.3 
        }
      );

      // 2. Animate UI layout blocks popping into place on the right
      gsap.fromTo(uiBlocksRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.2, 
          ease: "back.out(1.5)", 
          delay: 1.2 
        }
      );

      // 3. Infinite blinking cursor effect
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.4,
        ease: "steps(1)"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg width="100%" viewBox="0 0 680 440" className="w-full max-w-[650px] h-auto drop-shadow-2xl">
      <defs>
        <clipPath id="code-clip">
          <rect y="10" width="280" height="240" />
        </clipPath>
      </defs>

      {/* Main Browser Window Frame (Dark Mode) */}
      <rect x="60" y="50" width="560" height="340" rx="12" fill="#0D0D12" stroke="#2D2D3A" strokeWidth="1.5"/>
      
      {/* Top Header Bar */}
      <rect x="60" y="50" width="560" height="36" rx="12" fill="#1A1A24"/>
      <rect x="60" y="74" width="560" height="12" fill="#1A1A24"/>
      
      {/* Mac OS Window Controls */}
      <circle cx="82" cy="68" r="5" fill="#3F3F4E"/>
      <circle cx="102" cy="68" r="5" fill="#3F3F4E"/>
      <circle cx="122" cy="68" r="5" fill="#3F3F4E"/>
      
      {/* URL Search Bar */}
      <rect x="160" y="58" width="380" height="20" rx="10" fill="#0D0D12" stroke="#2D2D3A" strokeWidth="1"/>
      <text x="180" y="72" fill="#6366F1" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="500" letterSpacing="1px">
        zorlex.ai/services
      </text>

      {/* Code Editor Panel (Left Side) */}
      <svg x="90" y="110" width="280" height="240">
        <rect y="10" width="280" height="240" fill="transparent"/>
        <g strokeLinecap="round" strokeWidth="6" clipPath="url(#code-clip)">
            <line x1="0" y1="20" x2="160" y2="20" stroke="#4F46E5" ref={el => codeLinesRef.current[0] = el} data-w="160" />
            <line x1="0" y1="40" x2="110" y2="40" stroke="#3F3F4E" ref={el => codeLinesRef.current[1] = el} data-w="110" />
            <line x1="0" y1="60" x2="200" y2="60" stroke="#93C5FD" ref={el => codeLinesRef.current[2] = el} data-w="200" />
            <line x1="20" y1="80" x2="150" y2="80" stroke="#3F3F4E" ref={el => codeLinesRef.current[3] = el} data-w="130" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#93C5FD" ref={el => codeLinesRef.current[4] = el} data-w="160" />
            <line x1="40" y1="120" x2="120" y2="120" stroke="#3F3F4E" ref={el => codeLinesRef.current[5] = el} data-w="80" />
            <line x1="40" y1="140" x2="190" y2="140" stroke="#4F46E5" ref={el => codeLinesRef.current[6] = el} data-w="150" />
            <line x1="20" y1="160" x2="80" y2="160" stroke="#3F3F4E" ref={el => codeLinesRef.current[7] = el} data-w="60" />
        </g>
        <rect x="85" y="154" width="2" height="12" fill="#4F46E5" ref={cursorRef} />
      </svg>

      {/* Visual Rendered UI Panel (Right Side) */}
      <g ref={el => uiBlocksRef.current[0] = el} style={{ transformOrigin: "500px 180px" }}>
        {/* Main Hero Card */}
        <rect x="410" y="120" width="180" height="90" rx="8" fill="#4F46E5"/>
        <rect x="426" y="138" width="90" height="6" rx="3" fill="#ffffff" opacity="0.9"/>
        <rect x="426" y="152" width="140" height="4" rx="2" fill="#ffffff" opacity="0.5"/>
        <rect x="426" y="162" width="110" height="4" rx="2" fill="#ffffff" opacity="0.5"/>
        <rect x="426" y="180" width="60" height="20" rx="10" fill="#ffffff"/>
        <text x="456" y="194" textAnchor="middle" fill="#4F46E5" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700">Launch</text>
      </g>

      <g ref={el => uiBlocksRef.current[1] = el} style={{ transformOrigin: "450px 280px" }}>
        {/* Sub-Card 1 */}
        <rect x="410" y="230" width="85" height="110" rx="8" fill="#1A1A24" stroke="#2D2D3A" strokeWidth="1"/>
        <rect x="422" y="244" width="60" height="40" rx="4" fill="#0D0D12"/>
        <rect x="422" y="292" width="45" height="5" rx="2.5" fill="#4F46E5"/>
        <rect x="422" y="304" width="60" height="3" rx="1.5" fill="#3F3F4E"/>
        <rect x="422" y="313" width="50" height="3" rx="1.5" fill="#3F3F4E"/>
      </g>

      <g ref={el => uiBlocksRef.current[2] = el} style={{ transformOrigin: "550px 280px" }}>
        {/* Sub-Card 2 */}
        <rect x="505" y="230" width="85" height="110" rx="8" fill="#1A1A24" stroke="#2D2D3A" strokeWidth="1"/>
        <rect x="517" y="244" width="60" height="40" rx="4" fill="#0D0D12"/>
        <rect x="517" y="292" width="45" height="5" rx="2.5" fill="#4F46E5"/>
        <rect x="517" y="304" width="60" height="3" rx="1.5" fill="#3F3F4E"/>
        <rect x="517" y="313" width="50" height="3" rx="1.5" fill="#3F3F4E"/>
      </g>
    </svg>
  );
}

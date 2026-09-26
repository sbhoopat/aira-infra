import React from 'react';

export default function AiraLogo({ height = 50, variant = 'dark', className = '' }) {
  // Determine color theme based on variant
  const isLight = variant === 'light';
  const mainLetterColor = isLight ? '#ffffff' : '#110e2e';
  const infraColor = isLight ? '#f1f5f9' : '#1e1b4b';
  const orangeBrand = '#f15a24';
  const glowColor = isLight ? 'rgba(241, 90, 36, 0.35)' : 'rgba(241, 90, 36, 0.25)';

  return (
    <div
      className={`aira-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        lineHeight: 1
      }}
    >
      <svg
        height={height}
        viewBox="0 0 320 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          overflow: 'visible'
        }}
        aria-label="Aira Infra Logo"
      >
        <defs>
          {/* Brand Orange Gradient (#f15a24) for Skyscraper 'I' Bars and Accent Line */}
          <linearGradient id="airaBrandOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7a45" />
            <stop offset="40%" stopColor="#f15a24" />
            <stop offset="80%" stopColor="#e04812" />
            <stop offset="100%" stopColor="#b83808" />
          </linearGradient>

          {/* Warm Backlit Glow Filter */}
          <filter id="backlitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={glowColor} floodOpacity="0.8" />
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity={isLight ? '0.4' : '0.15'} />
          </filter>

          {/* Orange Tower Glow */}
          <filter id="orangeTowerGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(241, 90, 36, 0.65)" floodOpacity="0.8" />
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(241, 90, 36, 0.35)" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Backlit Ambient Glow Backdrop */}
        <g filter="url(#backlitGlow)">
          
          {/* First 'A' - Sharp Architectural Chevron */}
          <path
            d="M 30 76 L 62 16 L 94 76"
            fill="none"
            stroke={mainLetterColor}
            strokeWidth="8.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* 'I' - 3 Stepped Brand Orange (#f15a24) Skyscraper Tower Bars */}
          <g filter="url(#orangeTowerGlow)">
            {/* Tower 1 (Left - Short) */}
            <rect
              x="116"
              y="38"
              width="6.5"
              height="38"
              rx="0.5"
              fill="url(#airaBrandOrange)"
            />
            {/* Tower 2 (Middle - Medium) */}
            <rect
              x="126"
              y="26"
              width="6.5"
              height="50"
              rx="0.5"
              fill="url(#airaBrandOrange)"
            />
            {/* Tower 3 (Right - Tallest Flagship) */}
            <rect
              x="136"
              y="14"
              width="7"
              height="62"
              rx="0.5"
              fill="url(#airaBrandOrange)"
            />
          </g>

          {/* 'R' - Modern Architectural Upper Loop with Sweeping Tail */}
          {/* Top Bar & Loop */}
          <path
            d="M 172 18 H 210 C 226 18 232 28 226 38 C 220 48 206 48 190 48"
            fill="none"
            stroke={mainLetterColor}
            strokeWidth="8"
            strokeLinecap="square"
          />
          {/* Graceful Extended Swoosh Tail */}
          <path
            d="M 194 46 Q 212 56 226 66 Q 238 74 254 75"
            fill="none"
            stroke={mainLetterColor}
            strokeWidth="7.5"
            strokeLinecap="round"
          />

          {/* Second 'A' - Sharp Architectural Chevron */}
          <path
            d="M 264 76 L 296 16 L 328 76"
            fill="none"
            stroke={mainLetterColor}
            strokeWidth="8.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Horizontal Accent Line under R in Brand Orange (#f15a24) */}
          <line
            x1="186"
            y1="94"
            x2="236"
            y2="94"
            stroke="url(#airaBrandOrange)"
            strokeWidth="3.4"
            strokeLinecap="round"
            filter="url(#orangeTowerGlow)"
          />

          {/* Bottom Centered Subtitle: I N F R A */}
          <text
            x="211"
            y="126"
            textAnchor="middle"
            fill={infraColor}
            style={{
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '0.45em'
            }}
          >
            INFRA
          </text>
        </g>
      </svg>
    </div>
  );
}

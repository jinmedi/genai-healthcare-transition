import React from "react";
import { note } from "../noteTheme";

/**
 * 크림색 종이 배경. 미세한 종이 질감(feTurbulence), 아주 옅은 점 격자, 가장자리 비네팅.
 * 모든 값이 고정이라 매 프레임 동일하게 렌더된다.
 */
export const Paper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", inset: 0, background: note.cream, overflow: "hidden" }}>
    <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%">
      <defs>
        <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.09" />
          </feComponentTransfer>
        </filter>
        <pattern id="paper-dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.6" fill={note.ink} opacity="0.08" />
        </pattern>
        <radialGradient id="paper-vignette" cx="50%" cy="50%" r="72%">
          <stop offset="60%" stopColor={note.creamDark} stopOpacity="0" />
          <stop offset="100%" stopColor={note.creamDark} stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#paper-dots)" />
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
      <rect width="100%" height="100%" fill="url(#paper-vignette)" />
    </svg>
    {children}
  </div>
);

import React from "react";
import { noise2D } from "@remotion/noise";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type Blob = {
  color: string;
  size: number;
  /** 0~1 비율 위치 */
  x: number;
  y: number;
  seed: string;
  opacity?: number;
};

type Props = {
  gradient: string;
  blobs?: Blob[];
  /** 노이즈로 흔들리는 폭(px) */
  drift?: number;
  children?: React.ReactNode;
};

/**
 * 그라데이션 배경 + 노이즈로 천천히 떠다니는 컬러 블롭.
 * 블롭은 screen 블렌딩으로 겹치는 곳이 더 밝고 화려해진다.
 */
export const Background: React.FC<Props> = ({ gradient, blobs = [], drift = 140, children }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, background: gradient, overflow: "hidden" }}>
      {blobs.map((b) => {
        const dx = noise2D(b.seed + "x", t * 0.18, 0) * drift;
        const dy = noise2D(b.seed + "y", 0, t * 0.18) * drift;
        const s = 1 + noise2D(b.seed + "s", t * 0.12, 7) * 0.18;
        return (
          <div
            key={b.seed}
            style={{
              position: "absolute",
              width: b.size,
              height: b.size,
              left: b.x * width - b.size / 2,
              top: b.y * height - b.size / 2,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${b.color} 0%, ${b.color}00 68%)`,
              opacity: b.opacity ?? 0.85,
              mixBlendMode: "screen",
              translate: `${dx}px ${dy}px`,
              scale: String(s),
            }}
          />
        );
      })}
      {children}
    </div>
  );
};

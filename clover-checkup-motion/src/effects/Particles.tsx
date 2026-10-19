import React from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  count?: number;
  colors?: string[];
  seed?: string;
  /** 초당 상승 px */
  speed?: number;
  minSize?: number;
  maxSize?: number;
  opacity?: number;
};

/** 위로 천천히 떠오르며 반짝이는 입자 (결정적 난수라 매 렌더 동일) */
export const Particles: React.FC<Props> = ({
  count = 40,
  colors = ["#ffffff"],
  seed = "p",
  speed = 40,
  minSize = 4,
  maxSize = 14,
  opacity = 0.8,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = minSize + r("size") * (maxSize - minSize);
        const x = r("x") * width + Math.sin(frame / fps + r("phase") * 6.28) * 24;
        const travel = (frame / fps) * speed * (0.6 + r("v") * 0.8);
        const y = ((r("y") * height - travel) % (height + 60) + height + 60) % (height + 60) - 30;
        const twinkle = 0.45 + 0.55 * Math.sin(frame * (0.08 + r("tw") * 0.08) + r("phase") * 6.28);
        const color = colors[Math.floor(r("c") * colors.length)];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              opacity: opacity * twinkle,
            }}
          />
        );
      })}
    </div>
  );
};

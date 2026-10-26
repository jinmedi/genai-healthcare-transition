import React from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  count?: number;
  colors: string[];
  seed?: string;
  /** 초당 낙하 px */
  speed?: number;
};

/** 위에서 흩날리며 떨어지는 색종이 */
export const Confetti: React.FC<Props> = ({ count = 70, colors, seed = "c", speed = 260 }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const w = 10 + r("w") * 10;
        const h = 14 + r("h") * 14;
        const v = speed * (0.7 + r("v") * 0.7);
        const sway = Math.sin(t * (1.5 + r("sw") * 2) + r("ph") * 6.28) * 60;
        const y = ((r("y") * (height + 200) + t * v) % (height + 200)) - 100;
        const x = r("x") * width + sway;
        const rot = r("r0") * 360 + t * (120 + r("rs") * 240) * (r("dir") > 0.5 ? 1 : -1);
        const color = colors[Math.floor(r("c") * colors.length)];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: h,
              background: color,
              borderRadius: 3,
              rotate: `${rot}deg`,
              scale: `${0.6 + Math.abs(Math.sin(t * 3 + r("fl") * 6.28)) * 0.4} 1`,
              opacity: 0.9,
              boxShadow: `0 0 10px ${color}66`,
            }}
          />
        );
      })}
    </div>
  );
};

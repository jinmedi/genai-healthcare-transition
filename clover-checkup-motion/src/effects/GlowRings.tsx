import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  color: string;
  size: number;
  count?: number;
  /** 링 하나가 퍼지는 시간(초) */
  period?: number;
  /** 최대 확대 배율 */
  spread?: number;
  thickness?: number;
  delaySec?: number;
  style?: React.CSSProperties;
};

/** 중심에서 바깥으로 퍼져 사라지는 네온 링 (파동 효과) */
export const GlowRings: React.FC<Props> = ({
  color,
  size,
  count = 3,
  period = 2.4,
  spread = 2.2,
  thickness = 3,
  delaySec = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame / fps - delaySec);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        translate: "-50% -50%",
        pointerEvents: "none",
        ...style,
      }}
    >
      {Array.from({ length: count }).map((_, k) => {
        const p = ((t / period) + k / count) % 1;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `${thickness}px solid ${color}`,
              boxShadow: `0 0 24px ${color}, inset 0 0 24px ${color}`,
              opacity: (1 - p) * 0.7 * Math.min(1, t * 2),
              scale: String(1 + p * (spread - 1)),
            }}
          />
        );
      })}
    </div>
  );
};

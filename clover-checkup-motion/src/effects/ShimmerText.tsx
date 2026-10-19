import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  children: React.ReactNode;
  /** 그라데이션 양 끝 색 */
  colors?: [string, string];
  /** 빛줄기 색 */
  shine?: string;
  /** 시머 한 번 지나가는 시간(초) */
  period?: number;
  style?: React.CSSProperties;
};

/** 그라데이션 글자 위로 빛줄기가 주기적으로 지나가는 텍스트 */
export const ShimmerText: React.FC<Props> = ({
  children,
  colors = ["#c8ff3d", "#39e5ff"],
  shine = "#ffffff",
  period = 2.4,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = ((frame / fps) % period) / period; // 0~1
  const pos = 200 - p * 300; // 200% → -100%

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(110deg, ${colors[0]} 0%, ${colors[1]} 38%, ${shine} 50%, ${colors[1]} 62%, ${colors[0]} 100%)`,
        backgroundSize: "300% 100%",
        backgroundPosition: `${pos}% 0`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

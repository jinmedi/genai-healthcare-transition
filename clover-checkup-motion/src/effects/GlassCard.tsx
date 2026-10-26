import React from "react";

type Props = {
  children: React.ReactNode;
  /** 그라데이션 테두리 (예: gradients.limeCyan). 없으면 반투명 흰 테두리 */
  glowBorder?: string;
  glowColor?: string;
  radius?: number;
  padding?: string | number;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
};

/** 반투명 유리 질감 카드. glowBorder 를 주면 네온 그라데이션 테두리가 생긴다. */
export const GlassCard: React.FC<Props> = ({
  children,
  glowBorder,
  glowColor,
  radius = 36,
  padding = "36px 40px",
  style,
  innerStyle,
}) => {
  return (
    <div
      style={{
        borderRadius: radius,
        padding: glowBorder ? 3 : 0,
        background: glowBorder ?? "transparent",
        boxShadow: glowColor
          ? `0 0 60px ${glowColor}66, 0 30px 70px rgba(0,0,0,.35)`
          : "0 30px 70px rgba(0,0,0,.3)",
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: glowBorder ? radius - 3 : radius,
          padding,
          background: "rgba(255,255,255,.1)",
          border: glowBorder ? "none" : "1.5px solid rgba(255,255,255,.28)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};

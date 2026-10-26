import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { handFont, note } from "../noteTheme";

type Props = {
  children: React.ReactNode;
  delaySec?: number;
  size?: number;
  color?: string;
  rotate?: number;
  style?: React.CSSProperties;
};

/** 손글씨 메모. 살짝 기울어진 채로 떠오르며 나타난다. */
export const Handwriting: React.FC<Props> = ({
  children,
  delaySec = 0,
  size = 44,
  color = note.coral,
  rotate = -2,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = delaySec * fps;
  const p = interpolate(frame, [start, start + 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        fontFamily: handFont,
        fontSize: size,
        color,
        lineHeight: 1.2,
        rotate: `${rotate}deg`,
        opacity: p,
        translate: `0px ${(1 - p) * 18}px`,
        whiteSpace: "pre-wrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

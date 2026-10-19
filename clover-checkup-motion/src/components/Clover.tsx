import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

type Props = {
  /** 전체 크기(px). 잎 4장이 들어가는 정사각형 한 변 */
  size?: number;
  /** 등장 시작 시점(초) */
  delaySec?: number;
  leafColor?: string;
  stemColor?: string;
  /** 잎 주변 네온 글로우 색 */
  glow?: string;
  style?: React.CSSProperties;
};

const LEAF_ROTATIONS = [-90, 0, 90, 180]; // 좌상, 우상, 우하, 좌하

/**
 * CSS만으로 그린 네잎클로버 로고.
 * 잎 4장이 차례로 튀어나오고 줄기가 아래로 자란 뒤, 전체가 살짝 숨 쉬듯 흔들린다.
 */
export const Clover: React.FC<Props> = ({
  size = 260,
  delaySec = 0,
  leafColor = colors.lime,
  stemColor = colors.teal,
  glow,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const leaf = size * 0.455;
  const gap = size * 0.045;
  const positions = [
    { left: gap, top: gap },
    { left: size - gap - leaf, top: gap },
    { left: size - gap - leaf, top: size - gap - leaf },
    { left: gap, top: size - gap - leaf },
  ];

  const stemStart = (delaySec + 0.5) * fps;
  const sway = Math.sin(t * 1.6) * 3;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size * 1.15,
        rotate: `${sway}deg`,
        transformOrigin: "50% 90%",
        filter: glow ? `drop-shadow(0 0 ${size * 0.08}px ${glow})` : undefined,
        ...style,
      }}
    >
      {positions.map((pos, i) => {
        const start = (delaySec + i * 0.12) * fps;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: leaf,
              height: leaf,
              left: pos.left,
              top: pos.top,
              background: `radial-gradient(circle at 30% 30%, #ffffffaa 0%, ${leafColor} 45%, ${leafColor} 100%)`,
              borderRadius: "50% 50% 50% 0",
              boxShadow: "inset -8px -8px 0 rgba(0,0,0,.12)",
              rotate: `${LEAF_ROTATIONS[i]}deg`,
              opacity: interpolate(frame, [start, start + 0.2 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: String(
                interpolate(frame, [start, start + 0.7 * fps], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.34, 1.56, 0.64, 1),
                }),
              ),
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          width: size * 0.062,
          height: size * 0.3,
          left: size / 2 - size * 0.031,
          top: size * 0.87,
          background: stemColor,
          borderRadius: size * 0.03,
          transformOrigin: "50% 0%",
          rotate: "-8deg",
          scale: `1 ${interpolate(frame, [stemStart, stemStart + 0.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}`,
        }}
      />
    </div>
  );
};

/** 검진 등급 표시용 작은 잎 아이콘 (세잎 / 네잎 / 다섯잎) */
export const LeafBadge: React.FC<{ count: number; size?: number; color?: string }> = ({
  count,
  size = 28,
  color = colors.lime,
}) => (
  <div style={{ display: "flex", gap: size * 0.22 }}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: "50% 50% 50% 0",
          rotate: "-45deg",
          boxShadow: `0 0 ${size * 0.5}px ${color}99`,
        }}
      />
    ))}
  </div>
);

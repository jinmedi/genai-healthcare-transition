import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  color: string;
  /** 높이(px). 폭은 0.6배 */
  size?: number;
  /** 액체가 차오르기 시작하는 시점(초) */
  delaySec?: number;
  /** 최종 액체 높이 비율 0~1 */
  level?: number;
  /** 점적 방울 표시 */
  drip?: boolean;
  style?: React.CSSProperties;
};

/**
 * 수액 봉지. 액체가 아래에서 차오르고, 점적통에서 방울이 떨어진다.
 * 네온 팔레트에 맞춰 봉지는 반투명 유리, 액체는 색 그라데이션으로 그린다.
 */
export const IVBag: React.FC<Props> = ({ color, size = 220, delaySec = 0, level = 0.78, drip = true, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - delaySec;
  const id = React.useId().replace(/:/g, "");

  const fill = interpolate(t, [0, 1.2], [0, level], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const wobble = t > 0 ? Math.sin(t * 2.4) * 1.5 : 0;
  // 봉지 본체: y 22~150 (높이 128). 액체 상단 y
  const top = 150 - 128 * fill;
  // 방울: 0.7초 주기로 점적통(y 176~198)을 낙하
  const period = 0.7;
  const dp = t > 0.8 ? ((t - 0.8) % period) / period : -1;
  const dropY = 176 + dp * 20;
  const sway = t > 0 ? Math.sin(t * 1.3) * 2 : 0;

  return (
    <svg
      width={size * 0.6}
      height={size}
      viewBox="0 0 120 200"
      style={{ overflow: "visible", rotate: `${sway}deg`, transformOrigin: "50% 0%", ...style }}
    >
      <defs>
        <clipPath id={`bag-${id}`}>
          <rect x="22" y="22" width="76" height="128" rx="16" />
        </clipPath>
        <linearGradient id={`liq-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="18%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {/* 걸이 */}
      <path d="M60 2 C 52 2, 52 14, 60 14 C 68 14, 68 2, 60 2" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="3" />
      <line x1="60" y1="14" x2="60" y2="22" stroke="rgba(255,255,255,.85)" strokeWidth="3" />
      {/* 봉지 본체 (유리) */}
      <rect x="22" y="22" width="76" height="128" rx="16" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.85)" strokeWidth="3.5" />
      {/* 액체 */}
      <g clipPath={`url(#bag-${id})`}>
        <path
          d={`M22 ${top + wobble} C 40 ${top - 4 + wobble}, 60 ${top + 4 - wobble}, 98 ${top - wobble} L 98 160 L 22 160 Z`}
          fill={`url(#liq-${id})`}
        />
        {/* 기포 */}
        {[0, 1, 2].map((i) => {
          const bp = t > 0.4 ? ((t * 0.5 + i * 0.33) % 1) : 0;
          const by = 150 - bp * (150 - top - 6);
          return by > top ? <circle key={i} cx={38 + i * 20} cy={by} r={2.2 + i * 0.6} fill="#fff" opacity={0.5 * (1 - bp)} /> : null;
        })}
      </g>
      {/* 라벨 띠 */}
      <rect x="34" y="64" width="52" height="30" rx="6" fill="rgba(255,255,255,.85)" />
      <rect x="40" y="71" width="40" height="4" rx="2" fill={color} />
      <rect x="40" y="81" width="26" height="4" rx="2" fill="rgba(42,36,32,.35)" />
      {/* 하이라이트 */}
      <rect x="28" y="30" width="8" height="60" rx="4" fill="#fff" opacity="0.35" />
      {/* 출구 포트 */}
      <rect x="52" y="150" width="16" height="14" rx="3" fill="rgba(255,255,255,.9)" />
      {/* 점적통 */}
      {drip ? (
        <>
          <line x1="60" y1="164" x2="60" y2="174" stroke="rgba(255,255,255,.85)" strokeWidth="3" />
          <rect x="47" y="174" width="26" height="26" rx="8" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.85)" strokeWidth="3" />
          {dp >= 0 ? <circle cx="60" cy={dropY} r="3.4" fill={color} /> : null}
          <rect x="49" y="192" width="22" height="6" rx="3" fill={color} opacity="0.9" />
        </>
      ) : null}
    </svg>
  );
};

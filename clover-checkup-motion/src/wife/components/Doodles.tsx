import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { note } from "../noteTheme";

/* 손으로 그린 듯한 라인 일러스트 모음. 굵은 선, 둥근 끝, 단색 면.
   모든 path 는 pathLength=1 로 정규화해 progress(0~1)로 '그려지는' 효과를 낸다. */

const STROKE = 6;
const base = {
  fill: "none",
  stroke: note.ink,
  strokeWidth: STROKE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 0→1 로 그려지는 선 */
export const Stroke: React.FC<React.SVGProps<SVGPathElement> & { p: number }> = ({ p, ...rest }) => (
  <path {...base} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.max(0, Math.min(1, p))} {...rest} />
);

/** 지연 후 duration 동안 0→1 */
export const useDraw = (delaySec: number, durationSec = 0.8, easing = Easing.bezier(0.3, 0, 0.3, 1)) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame, [delaySec * fps, (delaySec + durationSec) * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
};

/** 튀어나오는 등장 (scale) */
export const usePop = (delaySec: number, durationSec = 0.5) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame, [delaySec * fps, (delaySec + durationSec) * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
};

/** 네잎클로버 (잎 4장 + 줄기) */
export const CloverDoodle: React.FC<{ size?: number; delaySec?: number; color?: string }> = ({
  size = 120,
  delaySec = 0,
  color = note.clover,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stem = useDraw(delaySec + 0.45, 0.4);
  const leaves = [0, 90, 180, 270];
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 100 115">
      {leaves.map((rot, i) => {
        const start = (delaySec + i * 0.1) * fps;
        const s = interpolate(frame, [start, start + 0.5 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        });
        return (
          <g key={i} transform={`translate(50 50) rotate(${rot}) scale(${s})`}>
            {/* 하트 모양 잎: 뾰족한 끝이 중심(0,0)을 향한다 */}
            <path
              d="M0 0 C -2 -8, -24 -14, -24 -27 A 12 12 0 0 1 0 -24 A 12 12 0 0 1 24 -27 C 24 -14, 2 -8, 0 0 Z"
              fill={color}
              stroke={note.ink}
              strokeWidth={4}
              strokeLinejoin="round"
            />
          </g>
        );
      })}
      <Stroke p={stem} d="M50 56 C 52 76, 48 90, 56 108" stroke={note.cloverDark} />
    </svg>
  );
};

/** 내시경 핸들을 잡은 손 */
export const HandDoodle: React.FC<{ delaySec?: number; size?: number }> = ({ delaySec = 0, size = 300 }) => {
  const p1 = useDraw(delaySec, 0.7);
  const p2 = useDraw(delaySec + 0.4, 0.7);
  const p3 = useDraw(delaySec + 0.8, 0.5);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {/* 스코프 핸들 */}
      <g opacity={p3}>
        <rect x="118" y="30" width="34" height="96" rx="17" fill={note.sky} stroke={note.ink} strokeWidth={STROKE} />
        <circle cx="135" cy="60" r="9" fill={note.cream} stroke={note.ink} strokeWidth={5} />
        <circle cx="135" cy="84" r="6" fill={note.ink} />
        <path d="M135 126 C 135 150, 160 150, 160 178" {...base} />
      </g>
      {/* 손바닥 + 손가락 */}
      <Stroke p={p1} d="M40 120 C 36 90, 44 70, 62 68 L 62 100" fill={note.cream} />
      <Stroke p={p1} d="M62 100 L 62 50 C 62 40, 76 40, 76 50 L 76 96" fill={note.cream} />
      <Stroke p={p2} d="M76 96 L 76 42 C 76 32, 90 32, 90 42 L 90 96" fill={note.cream} />
      <Stroke p={p2} d="M90 96 L 90 52 C 90 42, 104 42, 104 52 L 104 100" fill={note.cream} />
      <Stroke p={p2} d="M104 100 L 104 66 C 104 58, 116 58, 116 66 L 116 120 C 116 150, 96 164, 70 164 C 50 164, 40 150, 40 120" fill={note.cream} />
      {/* 손목 */}
      <Stroke p={p2} d="M60 164 L 56 190 M 100 164 L 104 190" />
    </svg>
  );
};

/** 반짝임 ✦ */
export const Sparkle: React.FC<{ x: number; y: number; delaySec: number; size?: number; color?: string }> = ({
  x,
  y,
  delaySec,
  size = 28,
  color = note.marker,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - delaySec;
  const s = t < 0 ? 0 : 0.6 + 0.4 * Math.abs(Math.sin(t * 3));
  const o = interpolate(t, [0, 0.25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg
      style={{ position: "absolute", left: x, top: y, opacity: o, scale: String(s), rotate: `${t * 40}deg` }}
      width={size}
      height={size}
      viewBox="0 0 20 20"
    >
      <path d="M10 1 C 11 7, 13 9, 19 10 C 13 11, 11 13, 10 19 C 9 13, 7 11, 1 10 C 7 9, 9 7, 10 1 Z" fill={color} stroke={note.ink} strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  );
};

/** 가운 입은 사람 아이콘 (줄 서는 동료, 남편) */
export const PersonDoodle: React.FC<{
  size?: number;
  glasses?: boolean;
  sweat?: boolean;
  blush?: boolean;
  gown?: string;
  mouth?: "smile" | "worried" | "flat";
}> = ({ size = 90, glasses = false, sweat = false, blush = false, gown = note.cream, mouth = "smile" }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 100 140">
    {/* 가운 */}
    <path d="M22 138 L 24 84 C 24 68, 36 62, 50 62 C 64 62, 76 68, 76 84 L 78 138 Z" fill={gown} stroke={note.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M50 64 L 42 76 L 50 96 L 58 76 Z" fill={note.cream} stroke={note.ink} strokeWidth={3.5} strokeLinejoin="round" />
    {/* 청진기 */}
    <path d="M38 76 C 36 92, 44 100, 52 98" fill="none" stroke={note.ink} strokeWidth={3.5} strokeLinecap="round" />
    <circle cx="54" cy="99" r="4" fill={note.sky} stroke={note.ink} strokeWidth={3} />
    {/* 머리 */}
    <circle cx="50" cy="36" r="24" fill={note.cream} stroke={note.ink} strokeWidth={5} />
    <path d="M27 32 C 30 14, 70 14, 73 32 C 64 26, 36 26, 27 32 Z" fill={note.ink} />
    {glasses ? (
      <g fill="none" stroke={note.ink} strokeWidth={3.5}>
        <circle cx="41" cy="40" r="7" />
        <circle cx="59" cy="40" r="7" />
        <path d="M48 40 L 52 40" />
      </g>
    ) : (
      <g fill={note.ink}>
        <circle cx="42" cy="40" r="2.6" />
        <circle cx="58" cy="40" r="2.6" />
      </g>
    )}
    {mouth === "smile" && <path d="M44 50 C 47 54, 53 54, 56 50" fill="none" stroke={note.ink} strokeWidth={3} strokeLinecap="round" />}
    {mouth === "worried" && <path d="M44 53 C 47 49, 53 49, 56 53" fill="none" stroke={note.ink} strokeWidth={3} strokeLinecap="round" />}
    {mouth === "flat" && <path d="M45 51 L 55 51" fill="none" stroke={note.ink} strokeWidth={3} strokeLinecap="round" />}
    {blush && (
      <g fill={note.blush} opacity={0.9}>
        <ellipse cx="36" cy="47" rx="5" ry="3" />
        <ellipse cx="64" cy="47" rx="5" ry="3" />
      </g>
    )}
    {sweat && <path d="M76 24 C 80 30, 82 34, 78 37 C 74 34, 74 30, 76 24 Z" fill={note.sky} stroke={note.ink} strokeWidth={2.5} />}
  </svg>
);

/** 결과지: 줄 + 체크 */
export const ResultSheet: React.FC<{ delaySec?: number; size?: number }> = ({ delaySec = 0, size = 300 }) => {
  const paper = usePop(delaySec, 0.5);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const checks = [0, 1, 2, 3, 4].map((i) =>
    interpolate(frame, [(delaySec + 0.5 + i * 0.35) * fps, (delaySec + 0.8 + i * 0.35) * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" style={{ scale: String(paper) }}>
      <rect x="20" y="10" width="160" height="220" rx="10" fill="#fff" stroke={note.ink} strokeWidth={STROKE} />
      <path d="M40 40 L 120 40" {...base} strokeWidth={5} />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 72 + i * 32;
        return (
          <g key={i}>
            <path d={`M66 ${y} L 160 ${y}`} stroke={note.rule} strokeWidth={8} strokeLinecap="round" fill="none" />
            <path d={`M66 ${y} L ${66 + 60 + (i % 3) * 12} ${y}`} stroke={note.inkSoft} strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.5} />
            <rect x="36" y={y - 10} width="20" height="20" rx="5" fill="none" stroke={note.ink} strokeWidth={4} />
            <Stroke p={checks[i]} d={`M39 ${y} L 45 ${y + 6} L 56 ${y - 8}`} stroke={note.clover} strokeWidth={5} />
          </g>
        );
      })}
    </svg>
  );
};

/** 돋보기 */
export const Magnifier: React.FC<{ delaySec?: number; size?: number; style?: React.CSSProperties }> = ({ delaySec = 0, size = 120, style }) => {
  const p = usePop(delaySec, 0.5);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ scale: String(p), ...style }}>
      <circle cx="40" cy="40" r="26" fill={note.sky} fillOpacity={0.35} stroke={note.ink} strokeWidth={STROKE} />
      <path d="M60 60 L 88 88" {...base} strokeWidth={10} />
      <path d="M28 32 C 30 26, 36 22, 42 22" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
};

/** 데스크 + 벨 */
export const DeskDoodle: React.FC<{ delaySec?: number; size?: number }> = ({ delaySec = 0, size = 260 }) => {
  const p = usePop(delaySec, 0.5);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - delaySec - 0.6;
  const ring = t > 0 ? Math.sin(t * 14) * Math.exp(-t * 2.2) * 10 : 0;
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 200 160" style={{ scale: String(p) }}>
      <rect x="10" y="96" width="180" height="22" rx="6" fill={note.clover} stroke={note.ink} strokeWidth={STROKE} />
      <rect x="22" y="118" width="156" height="34" rx="4" fill={note.cream} stroke={note.ink} strokeWidth={STROKE} />
      <g transform={`translate(140 92) rotate(${ring})`}>
        <path d="M-22 0 C -22 -22, 22 -22, 22 0 Z" fill={note.marker} stroke={note.ink} strokeWidth={5} strokeLinejoin="round" />
        <rect x="-28" y="-2" width="56" height="8" rx="3" fill={note.ink} />
        <circle cx="0" cy="-24" r="4" fill={note.ink} />
      </g>
      <rect x="40" y="56" width="60" height="40" rx="6" fill="#fff" stroke={note.ink} strokeWidth={5} />
      <path d="M50 70 L 90 70 M50 82 L 78 82" stroke={note.inkSoft} strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
};

/** 달력에 동그라미 */
export const CalendarDoodle: React.FC<{ delaySec?: number; size?: number }> = ({ delaySec = 0, size = 200 }) => {
  const p = usePop(delaySec, 0.5);
  const circle = useDraw(delaySec + 0.7, 0.6);
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ scale: String(p) }}>
      <rect x="10" y="20" width="100" height="90" rx="10" fill="#fff" stroke={note.ink} strokeWidth={STROKE} />
      <rect x="10" y="20" width="100" height="24" rx="10" fill={note.coral} stroke={note.ink} strokeWidth={STROKE} />
      <path d="M34 12 L 34 30 M86 12 L 86 30" {...base} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => <circle key={`${r}${c}`} cx={28 + c * 16} cy={58 + r * 14} r="2.6" fill={note.inkSoft} opacity={0.5} />),
      )}
      <Stroke p={circle} d="M 50 60 C 42 52, 66 50, 68 60 C 70 70, 50 74, 46 66 C 44 60, 52 56, 58 58" stroke={note.coral} strokeWidth={5} />
    </svg>
  );
};

/** CO₂ 거품 */
export const Bubble: React.FC<{ x: number; y: number; r: number; delaySec: number; label?: string }> = ({ x, y, r, delaySec, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - delaySec;
  const rise = interpolate(t, [0, 2.4], [0, -140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pop = interpolate(t, [0, 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
  const sway = Math.sin(t * 2.2 + x) * 10;
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        background: `radial-gradient(circle at 32% 30%, #fff 0%, ${note.sky} 55%, ${note.sky} 100%)`,
        border: `5px solid ${note.ink}`,
        boxShadow: "inset -6px -6px 0 rgba(42,36,32,.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Pretendard",
        fontWeight: 800,
        fontSize: r * 0.42,
        color: note.ink,
        translate: `${sway}px ${rise}px`,
        scale: String(pop),
        opacity: t < 0 ? 0 : 1,
      }}
    >
      {label}
    </div>
  );
};

/** 지도 핀 */
export const PinDoodle: React.FC<{ delaySec?: number; size?: number }> = ({ delaySec = 0, size = 80 }) => {
  const p = usePop(delaySec, 0.5);
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 60 78" style={{ scale: String(p), transformOrigin: "50% 100%" }}>
      <path d="M30 74 C 10 46, 4 36, 4 26 A 26 26 0 1 1 56 26 C 56 36, 50 46, 30 74 Z" fill={note.coral} stroke={note.ink} strokeWidth={5} strokeLinejoin="round" />
      <circle cx="30" cy="27" r="9" fill="#fff" stroke={note.ink} strokeWidth={4} />
    </svg>
  );
};

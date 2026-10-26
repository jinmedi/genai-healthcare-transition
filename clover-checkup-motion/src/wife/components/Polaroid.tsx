import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { handFont, note } from "../noteTheme";

type Props = {
  /** public/ 기준 경로 (예: photos/wife-hand.jpg) */
  src: string;
  caption?: string;
  width?: number;
  /** 사진 영역 높이 */
  photoHeight?: number;
  rotate?: number;
  delaySec?: number;
  /** 사진 크롭 기준점 (object-position) */
  position?: string;
  style?: React.CSSProperties;
};

/**
 * 폴라로이드 사진. 위에서 떨어져 종이에 붙고(살짝 튕김), 그 다음 테이프가 눌린다.
 * 캡션은 손글씨.
 */
export const Polaroid: React.FC<Props> = ({
  src,
  caption,
  width = 400,
  photoHeight = 364,
  rotate = -4,
  delaySec = 0,
  position = "50% 50%",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = delaySec * fps;

  // 떨어지며 붙는 동작: 위에서 내려오고, 약간 크게 시작해 제자리로
  const drop = interpolate(frame, [start, start + 0.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.9, 0.3, 1.15),
  });
  const opacity = interpolate(frame, [start, start + 0.15 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const settleRotate = rotate + (1 - drop) * -6;
  // 테이프: 붙은 뒤 눌리듯 등장
  const tape = interpolate(frame, [start + 0.55 * fps, start + 0.85 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const cap = interpolate(frame, [start + 0.9 * fps, start + 1.3 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "relative",
        width,
        padding: "18px 18px 64px",
        background: "#ffffff",
        boxShadow: `0 ${18 * drop}px ${40 * drop}px rgba(42,36,32,.18)`,
        rotate: `${settleRotate}deg`,
        scale: String(1.12 - 0.12 * drop),
        translate: `0px ${(1 - drop) * -120}px`,
        opacity,
        ...style,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{ display: "block", width: "100%", height: photoHeight, objectFit: "cover", objectPosition: position }}
      />
      {/* 테이프 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: -16,
          width: 150,
          height: 38,
          marginLeft: -75,
          background: "rgba(255,231,107,.85)",
          boxShadow: "0 2px 6px rgba(0,0,0,.08)",
          rotate: "3deg",
          scale: String(tape),
          transformOrigin: "50% 50%",
        }}
      />
      {caption ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 14,
            textAlign: "center",
            fontFamily: handFont,
            fontSize: 34,
            color: note.inkSoft,
            opacity: cap,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};

/** 땀방울 스티커 (사진 옆에 붙이는 용) */
export const SweatSticker: React.FC<{ delaySec?: number; size?: number; style?: React.CSSProperties }> = ({ delaySec = 0, size = 70, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - delaySec;
  const pop = interpolate(t, [0, 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
  const wobble = t > 0 ? Math.sin(t * 5) * 4 : 0;
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 30 40"
      style={{ scale: String(pop), rotate: `${wobble}deg`, transformOrigin: "50% 0%", ...style }}
    >
      <path d="M15 2 C 24 16, 28 24, 20 32 C 12 38, 4 30, 8 20 C 10 14, 13 8, 15 2 Z" fill={note.sky} stroke={note.ink} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M12 24 C 11 27, 13 30, 16 30" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

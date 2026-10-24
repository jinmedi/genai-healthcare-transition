import { Easing, interpolate } from "remotion";
import type { CSSProperties } from "react";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** 아래에서 위로 떠오르며 나타나는 기본 등장 애니메이션 */
export const fadeUp = (
  frame: number,
  fps: number,
  delaySec = 0,
  durationSec = 0.7,
  distance = 60,
): CSSProperties => {
  const start = delaySec * fps;
  const end = start + durationSec * fps;
  return {
    opacity: interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    }),
    translate: `0px ${interpolate(frame, [start, end], [distance, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    })}px`,
  };
};

/** 작게 시작해 튀어오르듯 커지는 등장 애니메이션 */
export const popIn = (
  frame: number,
  fps: number,
  delaySec = 0,
  durationSec = 0.6,
): CSSProperties => {
  const start = delaySec * fps;
  const end = start + durationSec * fps;
  return {
    opacity: interpolate(frame, [start, start + 0.2 * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    scale: String(
      interpolate(frame, [start, end], [0.6, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
      }),
    ),
  };
};

/** 왼쪽에서 밀려 들어오는 등장 애니메이션 */
export const slideInX = (
  frame: number,
  fps: number,
  delaySec = 0,
  durationSec = 0.7,
  distance = -120,
): CSSProperties => {
  const start = delaySec * fps;
  const end = start + durationSec * fps;
  return {
    opacity: interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    }),
    translate: `${interpolate(frame, [start, end], [distance, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    })}px 0px`,
  };
};

/** 0 → 1 진행률 (가로선, 프로그레스 바 등에 사용) */
export const progress = (
  frame: number,
  fps: number,
  delaySec: number,
  durationSec: number,
  easing: (t: number) => number = Easing.bezier(0.65, 0, 0.35, 1),
): number =>
  interpolate(frame, [delaySec * fps, (delaySec + durationSec) * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

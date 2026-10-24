import React from "react";
import { useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { W1, W2, W3, W4, W5, W6, W7, W8, W9 } from "./scenes";
import { FADE_SECONDS, SCENE_SECONDS } from "./script";
import "./noteTheme";
import { VariantProvider, type Variant } from "../variant";

/** 전체 길이(프레임). 씬 합계 42초에 페이드 겹침을 더하고 빼면 그대로 42초. */
export const wifeDurationInFrames = (fps: number): number =>
  Math.round(SCENE_SECONDS.reduce((a, b) => a + b, 0) * fps);

const SCENES = [W1, W2, W3, W4, W5, W6, W7, W8, W9];
const NAMES = ["자랑 좀 할게요", "손이 좋아요", "줄을 섰어요", "꼼꼼히", "저도 받습니다", "크로바내과", "덜 아파요", "미리 예약", "심했나요?"];

export const WifePromo: React.FC<{ variant?: Variant }> = ({ variant = "internal" }) => {
  const { fps } = useVideoConfig();
  const fadeFrames = Math.round(FADE_SECONDS * fps);

  return (
    <VariantProvider variant={variant}>
    <TransitionSeries>
      {SCENES.map((Scene, i) => {
        const last = i === SCENES.length - 1;
        // 페이드가 앞뒤로 겹치므로 마지막 씬을 뺀 각 씬에 페이드 길이를 더해 총 길이를 42초로 맞춘다.
        const frames = Math.round(SCENE_SECONDS[i] * fps) + (last ? 0 : fadeFrames);
        return (
          <React.Fragment key={NAMES[i]}>
            <TransitionSeries.Sequence name={NAMES[i]} durationInFrames={frames}>
              <Scene />
            </TransitionSeries.Sequence>
            {last ? null : (
              <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: fadeFrames })} />
            )}
          </React.Fragment>
        );
      })}
    </TransitionSeries>
    </VariantProvider>
  );
};

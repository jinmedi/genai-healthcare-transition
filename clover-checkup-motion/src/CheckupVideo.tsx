import React from "react";
import { useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { flip } from "@remotion/transitions/flip";
import { Intro } from "./scenes/Intro";
import { Hook } from "./scenes/Hook";
import { Programs } from "./scenes/Programs";
import { CustomTests } from "./scenes/CustomTests";
import { Equipment } from "./scenes/Equipment";
import { Outro } from "./scenes/Outro";
import { VariantProvider, type Variant } from "./variant";

/** 씬 길이(초). Root.tsx 의 durationInFrames 계산에도 사용된다. */
export const SCENE_SECONDS = {
  intro: 4.5,
  hook: 4.5,
  programs: 10,
  customTests: 7,
  equipment: 8,
  outro: 6.5,
} as const;

export const TRANSITION_SECONDS = 0.7;

export const totalDurationInFrames = (fps: number): number => {
  // 씬 6개 + 마지막 페이드아웃 시퀀스(전환 길이만큼), 전환 6개는 겹치므로 뺀다.
  const scenes = Object.values(SCENE_SECONDS).reduce((a, b) => a + b, 0) + TRANSITION_SECONDS;
  const transitions = Object.keys(SCENE_SECONDS).length * TRANSITION_SECONDS;
  return Math.round((scenes - transitions) * fps);
};

export const CheckupVideo: React.FC<{ variant?: Variant }> = ({ variant = "internal" }) => {
  const { fps, width, height } = useVideoConfig();
  const frames = Math.round(TRANSITION_SECONDS * fps);
  const linear = linearTiming({ durationInFrames: frames });
  const spring = springTiming({ config: { damping: 200 }, durationInFrames: frames });

  return (
    <VariantProvider variant={variant}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="인트로" durationInFrames={SCENE_SECONDS.intro * fps}>
        <Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={spring} />

      <TransitionSeries.Sequence name="핵심 메시지" durationInFrames={SCENE_SECONDS.hook * fps}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom-left" })} timing={linear} />

      <TransitionSeries.Sequence name="종합검진 프로그램" durationInFrames={SCENE_SECONDS.programs * fps}>
        <Programs />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={spring} />

      <TransitionSeries.Sequence name="맞춤형 검사" durationInFrames={SCENE_SECONDS.customTests * fps}>
        <CustomTests />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={clockWipe({ width, height })} timing={linear} />

      <TransitionSeries.Sequence name="내시경 장비" durationInFrames={SCENE_SECONDS.equipment * fps}>
        <Equipment />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={flip({ direction: "from-bottom" })} timing={spring} />

      <TransitionSeries.Sequence name="예약 안내" durationInFrames={SCENE_SECONDS.outro * fps}>
        <Outro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linear} />
      <TransitionSeries.Sequence name="페이드아웃" durationInFrames={Math.round(TRANSITION_SECONDS * fps)}>
        <div style={{ position: "absolute", inset: 0, background: "#1a0b3d" }} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    </VariantProvider>
  );
};

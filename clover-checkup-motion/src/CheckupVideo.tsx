import React from "react";
import { useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Intro } from "./scenes/Intro";
import { Hook } from "./scenes/Hook";
import { Programs } from "./scenes/Programs";
import { CustomTests } from "./scenes/CustomTests";
import { Equipment } from "./scenes/Equipment";
import { Outro } from "./scenes/Outro";

/** 씬 길이(초). Root.tsx 의 durationInFrames 계산에도 사용된다. */
export const SCENE_SECONDS = {
  intro: 4,
  hook: 4,
  programs: 10,
  customTests: 7,
  equipment: 8,
  outro: 6,
} as const;

export const TRANSITION_SECONDS = 0.5;

export const totalDurationInFrames = (fps: number): number => {
  const scenes = Object.values(SCENE_SECONDS).reduce((a, b) => a + b, 0);
  const transitions = (Object.keys(SCENE_SECONDS).length - 1) * TRANSITION_SECONDS;
  return Math.round((scenes - transitions) * fps);
};

export const CheckupVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const t = linearTiming({ durationInFrames: Math.round(TRANSITION_SECONDS * fps) });

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="인트로" durationInFrames={SCENE_SECONDS.intro * fps}>
        <Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence name="핵심 메시지" durationInFrames={SCENE_SECONDS.hook * fps}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence name="종합검진 프로그램" durationInFrames={SCENE_SECONDS.programs * fps}>
        <Programs />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence name="맞춤형 검사" durationInFrames={SCENE_SECONDS.customTests * fps}>
        <CustomTests />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence name="내시경 장비" durationInFrames={SCENE_SECONDS.equipment * fps}>
        <Equipment />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />

      <TransitionSeries.Sequence name="예약 안내" durationInFrames={SCENE_SECONDS.outro * fps}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

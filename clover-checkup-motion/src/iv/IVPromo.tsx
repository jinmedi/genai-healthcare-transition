import React from "react";
import { useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { IVAmino, IVBasic, IVColors, IVHook, IVIntro, IVNotice } from "./scenes";

/** 씬 길이(초) */
export const IV_SECONDS = { intro: 4.5, hook: 5, basic: 6.5, colors: 7.5, amino: 7, notice: 5.5 } as const;
export const IV_TRANSITION_SECONDS = 0.6;

export const ivDurationInFrames = (fps: number): number => {
  // 씬 6개 + 마지막 페이드아웃(전환 길이), 전환 6개 겹침을 뺀다
  const scenes = Object.values(IV_SECONDS).reduce((a, b) => a + b, 0) + IV_TRANSITION_SECONDS;
  return Math.round((scenes - Object.keys(IV_SECONDS).length * IV_TRANSITION_SECONDS) * fps);
};

export const IVPromo: React.FC = () => {
  const { fps, width, height } = useVideoConfig();
  const frames = Math.round(IV_TRANSITION_SECONDS * fps);
  const linear = linearTiming({ durationInFrames: frames });
  const spring = springTiming({ config: { damping: 200 }, durationInFrames: frames });

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="인트로" durationInFrames={IV_SECONDS.intro * fps}>
        <IVIntro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={spring} />

      <TransitionSeries.Sequence name="이럴 때" durationInFrames={IV_SECONDS.hook * fps}>
        <IVHook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom-left" })} timing={linear} />

      <TransitionSeries.Sequence name="기본 비타민 수액" durationInFrames={IV_SECONDS.basic * fps}>
        <IVBasic />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={spring} />

      <TransitionSeries.Sequence name="컬러 수액" durationInFrames={IV_SECONDS.colors * fps}>
        <IVColors />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={clockWipe({ width, height })} timing={linear} />

      <TransitionSeries.Sequence name="아미노산 · 리피드" durationInFrames={IV_SECONDS.amino * fps}>
        <IVAmino />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linear} />

      <TransitionSeries.Sequence name="안내" durationInFrames={IV_SECONDS.notice * fps}>
        <IVNotice />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linear} />
      <TransitionSeries.Sequence name="페이드아웃" durationInFrames={frames}>
        <div style={{ position: "absolute", inset: 0, background: "#1a0b3d" }} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

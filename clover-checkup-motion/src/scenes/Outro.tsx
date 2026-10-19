import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Clover } from "../components/Clover";
import { fadeUp, popIn } from "../anim";
import { colors, creamGradient, font } from "../theme";
import { clinic } from "../content";
import { Blob } from "./Intro";

const OutroInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 전화번호 강조 펄스 (2.4초부터 3회)
  const pulse = interpolate(
    frame,
    [2.4 * fps, 2.9 * fps, 3.4 * fps, 3.9 * fps, 4.4 * fps, 4.9 * fps, 5.4 * fps],
    [1, 1.04, 1, 1.04, 1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) },
  );

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: creamGradient }} />
      <Blob left={-200} top={-220} size={620} color={colors.green300} opacity={0.35} />
      <Blob right={-120} bottom={-160} size={420} color={colors.accent} opacity={0.18} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: font,
          textAlign: "center",
        }}
      >
        <Clover size={130} delaySec={0.1} />
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: colors.green900,
            ...fadeUp(frame, fps, 0.6),
          }}
        >
          {clinic.closing}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 34,
            fontWeight: 500,
            color: colors.inkSoft,
            ...fadeUp(frame, fps, 0.9, 0.6, 30),
          }}
        >
          {clinic.closingSub}
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 28,
            background: colors.green700,
            color: colors.white,
            borderRadius: 44,
            padding: "18px 64px 18px 44px",
            boxShadow: "0 24px 60px rgba(15, 77, 46, .3)",
            ...popIn(frame, fps, 1.3),
            scale: String(
              Number(popIn(frame, fps, 1.3).scale ?? 1) * pulse,
            ),
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "8px 18px",
              borderRadius: 999,
              background: colors.accent,
              color: colors.green900,
            }}
          >
            {clinic.phoneLabel}
          </div>
          <div style={{ fontSize: 108, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {clinic.phone}
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: colors.green900,
            ...fadeUp(frame, fps, 1.9, 0.6, 20),
          }}
        >
          {clinic.name} {clinic.tagline}
        </div>
      </div>
    </>
  );
};

export const Outro = Interactive.create({
  Component: OutroInner,
  layout: "absolute-fill",
});

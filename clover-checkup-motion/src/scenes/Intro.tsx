import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Clover } from "../components/Clover";
import { Background } from "../effects/Background";
import { Particles } from "../effects/Particles";
import { ShimmerText } from "../effects/ShimmerText";
import { GlowRings } from "../effects/GlowRings";
import { fadeUp, popIn } from "../anim";
import { colors, font, gradients } from "../theme";
import { clinic } from "../content";

const IntroInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Background
        gradient={gradients.aurora}
        blobs={[
          { color: colors.magenta, size: 700, x: 0.12, y: 0.2, seed: "i1" },
          { color: colors.cyan, size: 800, x: 0.9, y: 0.5, seed: "i2" },
          { color: colors.lime, size: 520, x: 0.3, y: 0.95, seed: "i3", opacity: 0.6 },
        ]}
        drift={90}
      />
      <Particles count={45} colors={[colors.white, colors.cyan, colors.lime]} seed="intro" minSize={3} maxSize={10} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: font,
          color: colors.white,
          paddingBottom: 20,
        }}
      >
        <div style={{ position: "relative", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GlowRings color={colors.lime} size={210} period={2.6} spread={2.4} delaySec={0.8} />
          <div
            style={{
              position: "absolute",
              width: 210,
              height: 210,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,255,61,.35) 0%, rgba(200,255,61,0) 70%)",
              ...popIn(frame, fps, 0.1, 0.8),
            }}
          />
          <Clover size={180} delaySec={0.2} glow={colors.lime} />
        </div>

        <ShimmerText
          colors={[colors.lime, colors.cyan]}
          style={{
            marginTop: 26,
            fontSize: 112,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            ...fadeUp(frame, fps, 1.0, 0.8, 60),
          }}
        >
          {clinic.name}
        </ShimmerText>

        <div
          style={{
            marginTop: 22,
            padding: "10px 34px",
            borderRadius: 999,
            border: "2px solid rgba(255,255,255,.45)",
            background: "rgba(255,255,255,.1)",
            backdropFilter: "blur(12px)",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.14em",
            ...fadeUp(frame, fps, 1.35, 0.6, 30),
          }}
        >
          {clinic.tagline}
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 27,
            fontWeight: 500,
            color: "rgba(255,255,255,.8)",
            letterSpacing: "0.04em",
            ...fadeUp(frame, fps, 1.8, 0.6, 20),
          }}
        >
          건강은 미리, 검진은 지금
        </div>
      </div>
    </>
  );
};

export const Intro = Interactive.create({
  Component: IntroInner,
  layout: "absolute-fill",
});

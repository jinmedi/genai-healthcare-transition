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
import { useFormat } from "../format";

const IntroInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { wide } = useFormat();

  const logo = (
    <div style={{ position: "relative", width: wide ? 260 : 300, height: wide ? 260 : 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GlowRings color={colors.lime} size={wide ? 180 : 210} period={2.6} spread={2.4} delaySec={0.8} />
      <div
        style={{
          position: "absolute",
          width: wide ? 180 : 210,
          height: wide ? 180 : 210,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,61,.35) 0%, rgba(200,255,61,0) 70%)",
          ...popIn(frame, fps, 0.1, 0.8),
        }}
      />
      <Clover size={wide ? 150 : 180} delaySec={0.2} glow={colors.lime} />
    </div>
  );

  const text = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: wide ? "flex-start" : "center" }}>
      <ShimmerText
        colors={[colors.lime, colors.cyan]}
        style={{
          marginTop: wide ? 0 : 26,
          fontSize: wide ? 96 : 112,
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
          marginTop: wide ? 18 : 22,
          padding: wide ? "8px 26px" : "10px 34px",
          borderRadius: 999,
          border: "2px solid rgba(255,255,255,.45)",
          background: "rgba(255,255,255,.1)",
          backdropFilter: "blur(12px)",
          fontSize: wide ? 28 : 34,
          fontWeight: 700,
          letterSpacing: "0.14em",
          ...fadeUp(frame, fps, 1.35, 0.6, 30),
        }}
      >
        {clinic.tagline}
      </div>
      <div
        style={{
          marginTop: wide ? 26 : 36,
          fontSize: wide ? 24 : 27,
          fontWeight: 500,
          color: "rgba(255,255,255,.8)",
          letterSpacing: "0.04em",
          ...fadeUp(frame, fps, 1.8, 0.6, 20),
        }}
      >
        건강은 미리, 검진은 지금
      </div>
    </div>
  );

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
          flexDirection: wide ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          gap: wide ? 40 : 0,
          fontFamily: font,
          color: colors.white,
          paddingBottom: wide ? 0 : 20,
        }}
      >
        {logo}
        {text}
      </div>
    </>
  );
};

export const Intro = Interactive.create({
  Component: IntroInner,
  layout: "absolute-fill",
});

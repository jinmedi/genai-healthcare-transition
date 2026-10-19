import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Clover } from "../components/Clover";
import { fadeUp } from "../anim";
import { colors, creamGradient, font } from "../theme";
import { clinic } from "../content";

const IntroInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
        }}
      >
        <Clover size={260} delaySec={0.2} />
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: colors.green900,
              ...fadeUp(frame, fps, 1.0),
            }}
          >
            {clinic.name}
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 42,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: colors.inkSoft,
              ...fadeUp(frame, fps, 1.3, 0.6, 30),
            }}
          >
            {clinic.tagline}
          </div>
        </div>
      </div>
    </>
  );
};

export const Blob: React.FC<{
  size: number;
  color: string;
  opacity: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}> = ({ size, color, opacity, ...pos }) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      opacity,
      filter: "blur(2px)",
      ...pos,
    }}
  />
);

export const Intro = Interactive.create({
  Component: IntroInner,
  layout: "absolute-fill",
});

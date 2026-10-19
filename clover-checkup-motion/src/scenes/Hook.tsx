import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../effects/Background";
import { Particles } from "../effects/Particles";
import { GlowRings } from "../effects/GlowRings";
import { fadeUp, progress } from "../anim";
import { colors, font, gradients } from "../theme";
import { hook, clinic } from "../content";

const HookInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Background
        gradient={gradients.sunset}
        blobs={[
          { color: colors.yellow, size: 900, x: 0.8, y: 0.15, seed: "h1" },
          { color: colors.magenta, size: 1000, x: 0.1, y: 0.75, seed: "h2" },
          { color: colors.white, size: 500, x: 0.5, y: 0.5, seed: "h3", opacity: 0.25 },
        ]}
      />
      <GlowRings color="rgba(255,255,255,.7)" size={700} count={4} period={3.2} spread={2.6} thickness={2} />
      <Particles count={35} colors={[colors.white, colors.yellow]} seed="hook" speed={60} minSize={3} maxSize={9} />

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
          textAlign: "center",
          padding: "0 70px",
        }}
      >
        {hook.map((line, i) => {
          const start = (0.3 + i * 0.4) * fps;
          return (
            <div key={i} style={{ overflow: "hidden", padding: "6px 0" }}>
              <div
                style={{
                  fontSize: 118,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.15,
                  textShadow: "0 12px 40px rgba(0,0,0,.25)",
                  translate: `0px ${interpolate(frame, [start, start + 0.8 * fps], [120, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  })}%`,
                  scale: String(
                    interpolate(frame, [start, start + 0.8 * fps], [0.8, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.bezier(0.16, 1, 0.3, 1),
                    }),
                  ),
                }}
              >
                {line}
              </div>
            </div>
          );
        })}

        <div
          style={{
            marginTop: 40,
            height: 20,
            borderRadius: 10,
            background: gradients.limeCyan,
            boxShadow: `0 0 30px ${colors.lime}`,
            width: 620 * progress(frame, fps, 1.4, 0.7),
          }}
        />

        <div
          style={{
            marginTop: 90,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "16px 40px",
            borderRadius: 999,
            background: "rgba(255,255,255,.18)",
            border: "2px solid rgba(255,255,255,.5)",
            ...fadeUp(frame, fps, 2.2, 0.6, 30),
          }}
        >
          {clinic.name} {clinic.tagline}
        </div>
      </div>
    </>
  );
};

export const Hook = Interactive.create({
  Component: HookInner,
  layout: "absolute-fill",
});

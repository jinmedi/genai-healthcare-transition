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
          { color: colors.yellow, size: 700, x: 0.85, y: 0.15, seed: "h1" },
          { color: colors.magenta, size: 800, x: 0.1, y: 0.8, seed: "h2" },
          { color: colors.white, size: 420, x: 0.5, y: 0.5, seed: "h3", opacity: 0.25 },
        ]}
        drift={90}
      />
      <GlowRings color="rgba(255,255,255,.7)" size={520} count={4} period={3.2} spread={2.4} thickness={2} />
      <Particles count={30} colors={[colors.white, colors.yellow]} seed="hook" speed={50} minSize={3} maxSize={8} />

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
          padding: "0 60px",
        }}
      >
        {hook.map((line, i) => {
          const start = (0.3 + i * 0.4) * fps;
          return (
            <div key={i} style={{ overflow: "hidden", padding: "6px 0" }}>
              <div
                style={{
                  fontSize: 96,
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
            marginTop: 30,
            height: 16,
            borderRadius: 8,
            background: gradients.limeCyan,
            boxShadow: `0 0 30px ${colors.lime}`,
            width: 520 * progress(frame, fps, 1.4, 0.7),
          }}
        />

        <div
          style={{
            marginTop: 70,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "12px 32px",
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

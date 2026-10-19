import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { progress } from "../anim";
import { colors, font, greenGradient } from "../theme";
import { hook } from "../content";

const HookInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: greenGradient }} />
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
        }}
      >
        {hook.map((line, i) => {
          const start = (0.4 + i * 0.35) * fps;
          return (
            <div key={i} style={{ overflow: "hidden", padding: "0 20px" }}>
              <div
                style={{
                  fontSize: 104,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.18,
                  translate: `0px ${interpolate(frame, [start, start + 0.8 * fps], [120, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  })}%`,
                }}
              >
                {line}
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 36,
            height: 18,
            borderRadius: 9,
            background: colors.accent,
            width: 560 * progress(frame, fps, 1.5, 0.6),
          }}
        />
      </div>
    </>
  );
};

export const Hook = Interactive.create({
  Component: HookInner,
  layout: "absolute-fill",
});

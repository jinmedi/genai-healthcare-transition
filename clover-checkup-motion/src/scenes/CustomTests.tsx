import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../effects/Background";
import { Particles } from "../effects/Particles";
import { ShimmerText } from "../effects/ShimmerText";
import { fadeUp, popIn, slideInX } from "../anim";
import { colors, font, gradients } from "../theme";
import { bloodPanel, customTests } from "../content";

const CustomTestsInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <>
      <Background
        gradient={gradients.grape}
        blobs={[
          { color: colors.cyan, size: 900, x: 0.15, y: 0.1, seed: "c1" },
          { color: colors.yellow, size: 800, x: 0.9, y: 0.5, seed: "c2", opacity: 0.6 },
          { color: colors.magenta, size: 1000, x: 0.3, y: 0.95, seed: "c3" },
        ]}
      />
      <Particles count={45} colors={[colors.white, colors.yellow, colors.magenta]} seed="custom" speed={35} />

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
          padding: "0 70px",
        }}
      >
        <ShimmerText
          colors={[colors.yellow, colors.magenta]}
          style={{
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            ...fadeUp(frame, fps, 0.2),
          }}
        >
          맞춤형 검사
        </ShimmerText>
        <div
          style={{
            marginTop: 10,
            marginBottom: 50,
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(255,255,255,.85)",
            ...fadeUp(frame, fps, 0.45, 0.6, 30),
          }}
        >
          걱정되는 부위만 골라서 꼼꼼하게
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, width: "100%" }}>
          {customTests.map((c, i) => {
            const delay = 0.7 + i * 0.25;
            const fromLeft = i % 2 === 0;
            const bob = Math.sin(t * 2 + i) * 6;
            return (
              <div
                key={c.organ}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 34,
                  flexDirection: fromLeft ? "row" : "row-reverse",
                  textAlign: fromLeft ? "left" : "right",
                  ...slideInX(frame, fps, delay, 0.7, fromLeft ? -160 : 160),
                }}
              >
                <div
                  style={{
                    width: 170,
                    height: 170,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, #ffffffcc 0%, ${c.color} 40%, ${c.color} 100%)`,
                    color: c.textColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 50px ${c.color}, 0 20px 40px rgba(0,0,0,.3)`,
                    translate: `0px ${bob}px`,
                    ...popIn(frame, fps, delay + 0.1, 0.6),
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: 700, opacity: 0.85 }}>{c.tag}</div>
                  <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.1, marginTop: 2 }}>{c.organ}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: 24,
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      padding: "6px 16px",
                      borderRadius: 999,
                      background: c.color,
                      color: c.textColor,
                      boxShadow: `0 0 18px ${c.color}99`,
                    }}
                  >
                    {c.organ} 검사
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 34,
                      fontWeight: 700,
                      lineHeight: 1.35,
                      wordBreak: "keep-all",
                      textShadow: "0 4px 20px rgba(0,0,0,.3)",
                    }}
                  >
                    {c.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 56,
            padding: "18px 44px",
            borderRadius: 999,
            background: gradients.cyanMagenta,
            color: colors.ink,
            fontSize: 30,
            fontWeight: 900,
            boxShadow: `0 0 40px ${colors.cyan}88`,
            ...fadeUp(frame, fps, 2.4, 0.6, 30),
          }}
        >
          {bloodPanel}
        </div>
      </div>
    </>
  );
};

export const CustomTests = Interactive.create({
  Component: CustomTestsInner,
  layout: "absolute-fill",
});

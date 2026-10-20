import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../effects/Background";
import { Particles } from "../effects/Particles";
import { ShimmerText } from "../effects/ShimmerText";
import { fadeUp, popIn } from "../anim";
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
          { color: colors.cyan, size: 700, x: 0.12, y: 0.1, seed: "c1" },
          { color: colors.yellow, size: 600, x: 0.9, y: 0.5, seed: "c2", opacity: 0.6 },
          { color: colors.magenta, size: 800, x: 0.3, y: 1.0, seed: "c3" },
        ]}
        drift={90}
      />
      <Particles count={35} colors={[colors.white, colors.yellow, colors.magenta]} seed="custom" speed={30} minSize={3} maxSize={9} />

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
          padding: "0 40px",
          textAlign: "center",
        }}
      >
        <ShimmerText
          colors={[colors.yellow, colors.magenta]}
          style={{
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            ...fadeUp(frame, fps, 0.2),
          }}
        >
          맞춤형 검사
        </ShimmerText>
        <div
          style={{
            marginTop: 6,
            marginBottom: 44,
            fontSize: 28,
            fontWeight: 500,
            color: "rgba(255,255,255,.85)",
            ...fadeUp(frame, fps, 0.45, 0.6, 30),
          }}
        >
          걱정되는 부위만 골라서 꼼꼼하게
        </div>

        <div style={{ display: "flex", gap: 14, width: "100%", justifyContent: "center" }}>
          {customTests.map((c, i) => {
            const delay = 0.7 + i * 0.22;
            const bob = Math.sin(t * 2 + i) * 6;
            return (
              <div
                key={c.organ}
                style={{
                  width: 172,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, #ffffffcc 0%, ${c.color} 40%, ${c.color} 100%)`,
                    color: c.textColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 40px ${c.color}, 0 16px 30px rgba(0,0,0,.3)`,
                    translate: `0px ${bob}px`,
                    ...popIn(frame, fps, delay, 0.6),
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.85 }}>{c.tag}</div>
                  <div style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.1, marginTop: 2 }}>{c.organ}</div>
                </div>
                <div
                  style={{
                    marginTop: 18,
                    fontSize: 16,
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: c.color,
                    color: c.textColor,
                    boxShadow: `0 0 14px ${c.color}99`,
                    ...fadeUp(frame, fps, delay + 0.25, 0.5, 14),
                  }}
                >
                  {c.organ} 검사
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    wordBreak: "keep-all",
                    textShadow: "0 4px 20px rgba(0,0,0,.3)",
                    ...fadeUp(frame, fps, delay + 0.35, 0.5, 14),
                  }}
                >
                  {c.detail}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 44,
            padding: "13px 34px",
            borderRadius: 999,
            background: gradients.cyanMagenta,
            color: colors.ink,
            fontSize: 23,
            fontWeight: 900,
            boxShadow: `0 0 36px ${colors.cyan}88`,
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

import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { LeafBadge } from "../components/Clover";
import { Background } from "../effects/Background";
import { Particles } from "../effects/Particles";
import { GlassCard } from "../effects/GlassCard";
import { ShimmerText } from "../effects/ShimmerText";
import { fadeUp, popIn } from "../anim";
import { colors, font, gradients } from "../theme";
import { programs } from "../content";

const ProgramsInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Background
        gradient={gradients.ocean}
        blobs={[
          { color: colors.cyan, size: 700, x: 0.9, y: 0.1, seed: "p1" },
          { color: colors.lime, size: 600, x: 0.1, y: 0.6, seed: "p2", opacity: 0.6 },
          { color: colors.purple, size: 700, x: 0.7, y: 1.0, seed: "p3" },
        ]}
        drift={90}
      />
      <Particles count={30} colors={[colors.cyan, colors.lime, colors.white]} seed="prog" speed={25} minSize={3} maxSize={9} />

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
          padding: "0 50px",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.3em",
            color: colors.cyan,
            ...fadeUp(frame, fps, 0.1, 0.6, 20),
          }}
        >
          CLOVER CHECK-UP
        </div>
        <ShimmerText
          colors={[colors.white, colors.lime]}
          style={{
            marginTop: 6,
            marginBottom: 30,
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            ...fadeUp(frame, fps, 0.25),
          }}
        >
          종합검진 프로그램
        </ShimmerText>

        <div style={{ display: "flex", gap: 18, width: "100%", alignItems: "stretch" }}>
          {programs.map((p, i) => {
            const delay = 0.7 + i * 0.35;
            const featured = p.featured === true;
            return (
              <div key={p.name} style={{ flex: 1, display: "flex", ...popIn(frame, fps, delay, 0.7) }}>
                <GlassCard
                  glowBorder={featured ? gradients.limeCyan : undefined}
                  glowColor={featured ? colors.lime : undefined}
                  padding="22px 22px 18px"
                  radius={28}
                  style={{ flex: 1, display: "flex" }}
                  innerStyle={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    ...(featured ? { background: "rgba(10, 40, 60, .55)" } : {}),
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <LeafBadge count={p.leaves} size={14} color={featured ? colors.lime : colors.cyan} />
                  </div>
                  <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.02em", marginTop: 10 }}>
                    {p.name}
                  </div>
                  <div
                    style={{
                      height: 2,
                      background: featured ? "rgba(200,255,61,.5)" : "rgba(255,255,255,.25)",
                      margin: "12px 0 14px",
                    }}
                  />

                  <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
                    {p.items.map((item, j) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                          fontSize: 21,
                          fontWeight: 500,
                          lineHeight: 1.3,
                          wordBreak: "keep-all",
                          ...fadeUp(frame, fps, delay + 0.3 + j * 0.08, 0.45, 14),
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            flexShrink: 0,
                            background: featured ? colors.lime : colors.cyan,
                            boxShadow: `0 0 8px ${featured ? colors.lime : colors.cyan}`,
                          }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  {p.note ? (
                    <div
                      style={{
                        marginTop: 14,
                        fontSize: 15,
                        lineHeight: 1.4,
                        color: "rgba(255,255,255,.75)",
                        wordBreak: "keep-all",
                        ...fadeUp(frame, fps, delay + 1.0, 0.5, 10),
                      }}
                    >
                      {p.note}
                    </div>
                  ) : null}
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const Programs = Interactive.create({
  Component: ProgramsInner,
  layout: "absolute-fill",
});

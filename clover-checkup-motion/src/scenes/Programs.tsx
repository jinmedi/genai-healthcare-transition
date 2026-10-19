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
          { color: colors.cyan, size: 900, x: 0.9, y: 0.1, seed: "p1" },
          { color: colors.lime, size: 800, x: 0.1, y: 0.55, seed: "p2", opacity: 0.6 },
          { color: colors.purple, size: 900, x: 0.7, y: 0.95, seed: "p3" },
        ]}
      />
      <Particles count={40} colors={[colors.cyan, colors.lime, colors.white]} seed="prog" speed={30} />

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
        <div
          style={{
            fontSize: 26,
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
            marginTop: 10,
            marginBottom: 44,
            fontSize: 92,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            ...fadeUp(frame, fps, 0.25),
          }}
        >
          종합검진 프로그램
        </ShimmerText>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, width: "100%" }}>
          {programs.map((p, i) => {
            const delay = 0.7 + i * 0.45;
            const featured = p.featured === true;
            return (
              <div key={p.name} style={{ ...popIn(frame, fps, delay, 0.7) }}>
                <GlassCard
                  glowBorder={featured ? gradients.limeCyan : undefined}
                  glowColor={featured ? colors.lime : undefined}
                  padding="30px 38px 26px"
                  innerStyle={featured ? { background: "rgba(10, 40, 60, .55)" } : undefined}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <LeafBadge count={p.leaves} size={24} color={featured ? colors.lime : colors.cyan} />
                    <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: "-0.02em", marginLeft: 6 }}>
                      {p.name}
                    </div>
                    {featured ? (
                      <div
                        style={{
                          marginLeft: "auto",
                          padding: "8px 18px",
                          borderRadius: 999,
                          background: gradients.pinkYellow,
                          color: colors.ink,
                          fontSize: 24,
                          fontWeight: 900,
                          letterSpacing: "0.1em",
                          boxShadow: `0 0 24px ${colors.magenta}`,
                        }}
                      >
                        BEST
                      </div>
                    ) : null}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      columnGap: 20,
                      rowGap: 10,
                      marginTop: 20,
                    }}
                  >
                    {p.items.map((item, j) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          fontSize: 27,
                          fontWeight: 500,
                          lineHeight: 1.3,
                          wordBreak: "keep-all",
                          ...fadeUp(frame, fps, delay + 0.3 + j * 0.08, 0.45, 16),
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            flexShrink: 0,
                            background: featured ? colors.lime : colors.cyan,
                            boxShadow: `0 0 10px ${featured ? colors.lime : colors.cyan}`,
                          }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  {p.note ? (
                    <div
                      style={{
                        marginTop: 16,
                        fontSize: 22,
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

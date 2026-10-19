import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { LeafBadge } from "../components/Clover";
import { fadeUp, popIn } from "../anim";
import { colors, creamGradient, font } from "../theme";
import { programs } from "../content";
import { Blob } from "./Intro";

const ProgramsInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: creamGradient }} />
      <Blob left={-200} top={-220} size={620} color={colors.green300} opacity={0.3} />
      <Blob right={-120} bottom={-160} size={420} color={colors.accent} opacity={0.15} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: font,
          paddingTop: 20,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: colors.green900,
            marginBottom: 44,
            ...fadeUp(frame, fps, 0.2),
          }}
        >
          크로바 <span style={{ color: colors.green500 }}>종합검진</span> 프로그램
        </div>

        <div style={{ display: "flex", gap: 36, alignItems: "stretch" }}>
          {programs.map((p, i) => {
            const delay = 0.6 + i * 0.3;
            const featured = p.featured === true;
            return (
              <div
                key={p.name}
                style={{
                  width: 540,
                  background: featured ? colors.green700 : colors.white,
                  color: featured ? colors.white : colors.ink,
                  borderRadius: 32,
                  boxShadow: featured
                    ? "0 28px 70px rgba(15, 77, 46, .35)"
                    : "0 18px 50px rgba(15, 77, 46, .12)",
                  padding: "40px 44px 36px",
                  display: "flex",
                  flexDirection: "column",
                  ...popIn(frame, fps, delay),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <LeafBadge
                    count={p.leaves}
                    size={26}
                    color={featured ? colors.green300 : colors.green500}
                  />
                  <div
                    style={{
                      marginLeft: "auto",
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      opacity: 0.7,
                    }}
                  >
                    크로바
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 60,
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    marginTop: 14,
                    marginBottom: 22,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    height: 3,
                    background: featured ? "rgba(255,255,255,.3)" : colors.mint100,
                    marginBottom: 22,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {p.items.map((item, j) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        fontSize: 30,
                        fontWeight: 500,
                        lineHeight: 1.3,
                        ...fadeUp(frame, fps, delay + 0.35 + j * 0.1, 0.5, 20),
                      }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          flexShrink: 0,
                          background: featured ? colors.accent : colors.green500,
                        }}
                      />
                      {item}
                    </div>
                  ))}
                </div>
                {p.note ? (
                  <div
                    style={{
                      marginTop: 22,
                      fontSize: 21,
                      lineHeight: 1.4,
                      opacity: 0.75,
                      ...fadeUp(frame, fps, delay + 1.2, 0.5, 10),
                    }}
                  >
                    {p.note}
                  </div>
                ) : null}
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

import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp, popIn } from "../anim";
import { colors, creamGradient, font } from "../theme";
import { bloodPanel, customTests } from "../content";
import { Blob } from "./Intro";

const CustomTestsInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: creamGradient }} />
      <Blob right={-220} top={-260} size={640} color={colors.green300} opacity={0.3} />
      <Blob left={-140} bottom={-180} size={440} color={colors.accent} opacity={0.15} />

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
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: colors.green900,
            marginBottom: 20,
            ...fadeUp(frame, fps, 0.2),
          }}
        >
          <span style={{ color: colors.green500 }}>맞춤형</span> 검사
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: colors.inkSoft,
            marginBottom: 60,
            ...fadeUp(frame, fps, 0.45, 0.6, 30),
          }}
        >
          걱정되는 부위만 골라서 꼼꼼하게
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {customTests.map((t, i) => {
            const delay = 0.7 + i * 0.22;
            return (
              <div
                key={t.organ}
                style={{
                  width: 300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 230,
                    height: 230,
                    borderRadius: "50%",
                    background: t.color,
                    color: t.textColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 18px 40px rgba(16, 35, 26, .18)",
                    ...popIn(frame, fps, delay),
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>{t.tag}</div>
                  <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.1, marginTop: 6 }}>
                    {t.organ}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 26,
                    fontSize: 25,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: colors.ink,
                    minHeight: 70,
                    wordBreak: "keep-all",
                    ...fadeUp(frame, fps, delay + 0.3, 0.5, 20),
                  }}
                >
                  {t.detail}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 54,
            padding: "16px 40px",
            borderRadius: 999,
            background: colors.green900,
            color: colors.white,
            fontSize: 28,
            fontWeight: 700,
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

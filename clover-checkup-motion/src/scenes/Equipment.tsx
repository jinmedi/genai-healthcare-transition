import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp, popIn, progress, slideInX } from "../anim";
import { colors, font, navyGradient } from "../theme";
import { equipment } from "../content";

const EquipmentInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: navyGradient }} />
      {/* 내시경 영상 느낌의 원형 글로우 */}
      <div
        style={{
          position: "absolute",
          right: -160,
          top: -160,
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,196,255,.35) 0%, rgba(124,196,255,0) 65%)",
          scale: String(0.8 + 0.2 * progress(frame, fps, 0, 2)),
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "0 150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: font,
          color: colors.white,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "10px 26px",
            borderRadius: 999,
            background: colors.sky,
            color: colors.navy900,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "0.06em",
            marginBottom: 24,
            ...popIn(frame, fps, 0.2),
          }}
        >
          PREMIUM ENDOSCOPY
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            ...fadeUp(frame, fps, 0.4),
          }}
        >
          {equipment.title}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(255,255,255,.75)",
            ...fadeUp(frame, fps, 0.7, 0.6, 30),
          }}
        >
          {equipment.subtitle}
        </div>

        <div style={{ display: "flex", gap: 32, marginTop: 64 }}>
          {equipment.points.map((pt, i) => (
            <div
              key={pt.title}
              style={{
                flex: 1,
                background: "rgba(255,255,255,.08)",
                border: "2px solid rgba(255,255,255,.18)",
                borderRadius: 28,
                padding: "34px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                ...slideInX(frame, fps, 1.2 + i * 0.4, 0.7, -80),
              }}
            >
              <div style={{ fontSize: 56, lineHeight: 1 }}>{pt.icon}</div>
              <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.02em", marginTop: 6 }}>
                {pt.title}
              </div>
              <div
                style={{
                  fontSize: 26,
                  lineHeight: 1.45,
                  color: "rgba(255,255,255,.8)",
                  wordBreak: "keep-all",
                }}
              >
                {pt.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const Equipment = Interactive.create({
  Component: EquipmentInner,
  layout: "absolute-fill",
});

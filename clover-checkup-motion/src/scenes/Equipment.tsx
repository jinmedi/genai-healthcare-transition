import React from "react";
import { Interactive, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../effects/Background";
import { Particles } from "../effects/Particles";
import { GlassCard } from "../effects/GlassCard";
import { GlowRings } from "../effects/GlowRings";
import { ShimmerText } from "../effects/ShimmerText";
import { fadeUp, popIn, slideInX } from "../anim";
import { colors, font, gradients } from "../theme";
import { equipment } from "../content";

const EquipmentInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <>
      <Background
        gradient={gradients.electric}
        blobs={[
          { color: colors.cyan, size: 1000, x: 0.5, y: 0.22, seed: "e1" },
          { color: colors.purple, size: 900, x: 0.1, y: 0.8, seed: "e2" },
          { color: colors.magenta, size: 700, x: 0.95, y: 0.9, seed: "e3", opacity: 0.6 },
        ]}
      />
      {/* 스캔 그리드 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(57,229,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(57,229,255,.12) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          backgroundPosition: `0 ${(t * 20) % 90}px`,
          maskImage: "radial-gradient(circle at 50% 30%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, #000 20%, transparent 75%)",
        }}
      />
      {/* 소나 파동 */}
      <GlowRings
        color={colors.cyan}
        size={420}
        count={4}
        period={3}
        spread={3.4}
        thickness={2}
        style={{ top: 560 }}
      />
      {/* 스캔 라인 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 160,
          top: ((t * 420) % 2100) - 160,
          background: "linear-gradient(180deg, rgba(57,229,255,0) 0%, rgba(57,229,255,.22) 100%)",
          borderBottom: `2px solid ${colors.cyan}`,
          boxShadow: `0 0 30px ${colors.cyan}`,
          opacity: 0.6,
        }}
      />
      <Particles count={40} colors={[colors.cyan, colors.white]} seed="equip" speed={45} minSize={3} maxSize={8} />

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
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "10px 28px",
            borderRadius: 999,
            background: gradients.limeCyan,
            color: colors.ink,
            fontSize: 26,
            fontWeight: 900,
            letterSpacing: "0.2em",
            boxShadow: `0 0 30px ${colors.cyan}`,
            ...popIn(frame, fps, 0.2),
          }}
        >
          PREMIUM ENDOSCOPY
        </div>
        <ShimmerText
          colors={[colors.white, colors.cyan]}
          style={{
            marginTop: 26,
            fontSize: 92,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            ...fadeUp(frame, fps, 0.4),
          }}
        >
          대학병원급
          <br />
          위 · 대장 내시경 도입
        </ShimmerText>
        <div
          style={{
            marginTop: 18,
            fontSize: 34,
            fontWeight: 500,
            color: "rgba(255,255,255,.8)",
            ...fadeUp(frame, fps, 0.7, 0.6, 30),
          }}
        >
          {equipment.subtitle}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 56, width: "100%" }}>
          {equipment.points.map((pt, i) => (
            <div key={pt.title} style={{ ...slideInX(frame, fps, 1.2 + i * 0.4, 0.7, i % 2 === 0 ? -120 : 120) }}>
              <GlassCard padding="28px 34px" glowBorder={i === 1 ? gradients.cyanMagenta : undefined} glowColor={i === 1 ? colors.cyan : undefined} innerStyle={i === 1 ? { background: "rgba(5, 20, 50, .62)" } : undefined}>
                <div style={{ display: "flex", alignItems: "center", gap: 26, textAlign: "left" }}>
                  <div
                    style={{
                      width: 110,
                      height: 110,
                      flexShrink: 0,
                      borderRadius: 28,
                      background: "rgba(57,229,255,.15)",
                      border: `2px solid ${colors.cyan}66`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 60,
                      lineHeight: 1,
                      boxShadow: `inset 0 0 30px ${colors.cyan}44`,
                    }}
                  >
                    {pt.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.02em" }}>{pt.title}</div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 26,
                        lineHeight: 1.45,
                        color: "rgba(255,255,255,.82)",
                        wordBreak: "keep-all",
                      }}
                    >
                      {pt.desc}
                    </div>
                  </div>
                </div>
              </GlassCard>
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

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
import { useFormat } from "../format";

const EquipmentInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const { wide } = useFormat();
  const t = frame / fps;

  return (
    <>
      <Background
        gradient={gradients.electric}
        blobs={[
          { color: colors.cyan, size: 800, x: 0.5, y: 0.2, seed: "e1" },
          { color: colors.purple, size: 700, x: 0.1, y: 0.85, seed: "e2" },
          { color: colors.magenta, size: 520, x: 0.95, y: 0.95, seed: "e3", opacity: 0.6 },
        ]}
        drift={90}
      />
      {/* 스캔 그리드 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(57,229,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(57,229,255,.12) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          backgroundPosition: `0 ${(t * 20) % 70}px`,
          maskImage: "radial-gradient(circle at 50% 30%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, #000 20%, transparent 75%)",
        }}
      />
      {/* 소나 파동 */}
      <GlowRings color={colors.cyan} size={wide ? 220 : 300} count={4} period={3} spread={3.2} thickness={2} style={{ top: wide ? 150 : 270 }} />
      {/* 스캔 라인 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 120,
          top: ((t * 300) % (height + 240)) - 120,
          background: "linear-gradient(180deg, rgba(57,229,255,0) 0%, rgba(57,229,255,.22) 100%)",
          borderBottom: `2px solid ${colors.cyan}`,
          boxShadow: `0 0 30px ${colors.cyan}`,
          opacity: 0.6,
        }}
      />
      <Particles count={30} colors={[colors.cyan, colors.white]} seed="equip" speed={40} minSize={3} maxSize={7} />

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
          padding: wide ? "0 40px" : "0 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: wide ? "5px 18px" : "7px 22px",
            borderRadius: 999,
            background: gradients.limeCyan,
            color: colors.ink,
            fontSize: wide ? 15 : 19,
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
            marginTop: wide ? 10 : 16,
            fontSize: wide ? 50 : 64,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            ...fadeUp(frame, fps, 0.4),
          }}
        >
          대학병원급 위 · 대장 내시경 도입
        </ShimmerText>
        <div
          style={{
            marginTop: wide ? 6 : 10,
            fontSize: wide ? 21 : 26,
            fontWeight: 500,
            color: "rgba(255,255,255,.8)",
            ...fadeUp(frame, fps, 0.7, 0.6, 30),
          }}
        >
          {equipment.subtitle}
        </div>

        {/* 가로: 카드 3장 나란히 / 정사각: 세로로 쌓기 */}
        <div
          style={{
            display: "flex",
            flexDirection: wide ? "row" : "column",
            gap: wide ? 16 : 14,
            marginTop: wide ? 26 : 36,
            width: "100%",
            alignItems: "stretch",
          }}
        >
          {equipment.points.map((pt, i) => (
            <div
              key={pt.title}
              style={{
                flex: 1,
                display: "flex",
                ...(wide
                  ? fadeUp(frame, fps, 1.2 + i * 0.3, 0.6, 40)
                  : slideInX(frame, fps, 1.2 + i * 0.4, 0.7, i % 2 === 0 ? -100 : 100)),
              }}
            >
              <GlassCard
                padding={wide ? "18px 20px" : "16px 24px"}
                radius={wide ? 22 : 26}
                glowBorder={i === 1 ? gradients.cyanMagenta : undefined}
                glowColor={i === 1 ? colors.cyan : undefined}
                style={{ flex: 1, display: "flex" }}
                innerStyle={{ flex: 1, ...(i === 1 ? { background: "rgba(5, 20, 50, .62)" } : {}) }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: wide ? "column" : "row",
                    alignItems: wide ? "flex-start" : "center",
                    gap: wide ? 12 : 20,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: wide ? 56 : 72,
                      height: wide ? 56 : 72,
                      flexShrink: 0,
                      borderRadius: wide ? 16 : 20,
                      background: "rgba(57,229,255,.15)",
                      border: `2px solid ${colors.cyan}66`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: wide ? 30 : 40,
                      lineHeight: 1,
                      boxShadow: `inset 0 0 24px ${colors.cyan}44`,
                    }}
                  >
                    {pt.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: wide ? 22 : 28, fontWeight: 900, letterSpacing: "-0.02em" }}>{pt.title}</div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: wide ? 15 : 19,
                        lineHeight: 1.4,
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

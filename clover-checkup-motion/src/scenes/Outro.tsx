import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Clover } from "../components/Clover";
import { Background } from "../effects/Background";
import { Confetti } from "../effects/Confetti";
import { GlowRings } from "../effects/GlowRings";
import { ShimmerText } from "../effects/ShimmerText";
import { fadeUp, popIn } from "../anim";
import { colors, font, gradients } from "../theme";
import { clinic, clinicWeb } from "../content";
import { useFormat } from "../format";
import { useVariant } from "../variant";

const OutroInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { wide } = useFormat();
  const variant = useVariant();

  // 전화번호 강조 펄스 (2.2초부터 3회)
  const pulse = interpolate(
    frame,
    [2.2 * fps, 2.7 * fps, 3.2 * fps, 3.7 * fps, 4.2 * fps, 4.7 * fps, 5.2 * fps],
    [1, 1.05, 1, 1.05, 1, 1.05, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) },
  );

  const phone = (
    <div style={{ position: "relative", marginTop: wide ? 0 : 40 }}>
      <GlowRings color={colors.yellow} size={wide ? 300 : 380} count={2} period={2.6} spread={1.6} thickness={2} delaySec={1.6} />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: wide ? 16 : 22,
          background: "rgba(255,255,255,.14)",
          border: "2px solid rgba(255,255,255,.5)",
          backdropFilter: "blur(18px)",
          borderRadius: 40,
          padding: wide ? "14px 30px 14px 20px" : "18px 40px 18px 28px",
          whiteSpace: "nowrap",
          boxShadow: `0 0 60px ${colors.yellow}88, 0 24px 60px rgba(0,0,0,.3)`,
          ...popIn(frame, fps, 1.3),
          scale: String(Number(popIn(frame, fps, 1.3).scale ?? 1) * pulse),
        }}
      >
        <div
          style={{
            fontSize: wide ? 18 : 22,
            fontWeight: 900,
            letterSpacing: "0.14em",
            padding: "7px 16px",
            borderRadius: 999,
            background: gradients.pinkYellow,
            color: colors.ink,
          }}
        >
          {clinic.phoneLabel}
        </div>
        <ShimmerText
          colors={[colors.white, colors.yellow]}
          period={2}
          style={{ fontSize: wide ? 52 : 76, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          {clinic.phone}
        </ShimmerText>
      </div>
    </div>
  );

  return (
    <>
      <Background
        gradient={gradients.candy}
        blobs={[
          { color: colors.cyan, size: 700, x: 0.1, y: 0.15, seed: "o1" },
          { color: colors.yellow, size: 700, x: 0.9, y: 0.45, seed: "o2" },
          { color: colors.lime, size: 520, x: 0.5, y: 1.0, seed: "o3", opacity: 0.6 },
        ]}
        drift={90}
      />
      <Confetti colors={[colors.lime, colors.cyan, colors.yellow, colors.white, colors.magenta]} count={60} speed={200} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: wide ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          gap: wide ? 50 : 0,
          fontFamily: font,
          color: colors.white,
          textAlign: wide ? "left" : "center",
          padding: "0 60px",
        }}
      >
        {/* 왼쪽(가로) / 위(정사각): 클로버 + 문구 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: wide ? "flex-start" : "center", width: wide ? 400 : undefined, flexShrink: 0 }}>
          <div style={{ position: "relative", width: wide ? 130 : 180, height: wide ? 130 : 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GlowRings color={colors.lime} size={wide ? 100 : 140} period={2.2} spread={2.2} delaySec={0.5} />
            <Clover size={wide ? 90 : 120} delaySec={0.1} glow={colors.lime} />
          </div>
          <div
            style={{
              marginTop: wide ? 8 : 16,
              fontSize: wide ? 36 : 44,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.25,
              wordBreak: "keep-all",
              whiteSpace: "pre-line",
              textShadow: "0 10px 40px rgba(0,0,0,.3)",
              ...fadeUp(frame, fps, 0.6),
            }}
          >
            {clinic.closing}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: wide ? 21 : 25,
              fontWeight: 500,
              color: "rgba(255,255,255,.85)",
              ...fadeUp(frame, fps, 0.9, 0.6, 30),
            }}
          >
            {clinic.closingSub}
          </div>
          {wide ? (
            <div style={{ marginTop: 22, fontSize: 24, fontWeight: 700, letterSpacing: "0.08em", ...fadeUp(frame, fps, 1.9, 0.6, 20) }}>
              {clinic.name} {clinic.tagline}
            </div>
          ) : null}
        </div>

        {phone}

        {wide ? null : (
          <div style={{ marginTop: 44, fontSize: 30, fontWeight: 700, letterSpacing: "0.08em", ...fadeUp(frame, fps, 1.9, 0.6, 20) }}>
            {clinic.name} {clinic.tagline}
          </div>
        )}
      </div>
      {variant === "web" ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: wide ? 22 : 44,
            textAlign: "center",
            fontFamily: font,
            fontSize: wide ? 18 : 22,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,.85)",
            ...fadeUp(frame, fps, 2.2, 0.6, 16),
          }}
        >
          {clinicWeb.footer}
        </div>
      ) : null}
    </>
  );
};

export const Outro = Interactive.create({
  Component: OutroInner,
  layout: "absolute-fill",
});

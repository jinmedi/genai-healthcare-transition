import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Clover } from "../components/Clover";
import { Background } from "../effects/Background";
import { Particles } from "../effects/Particles";
import { GlassCard } from "../effects/GlassCard";
import { ShimmerText } from "../effects/ShimmerText";
import { GlowRings } from "../effects/GlowRings";
import { Confetti } from "../effects/Confetti";
import { fadeUp, popIn, slideInX } from "../anim";
import { colors, font, gradients } from "../theme";
import { IVBag } from "./components/IVBag";
import { amino, basic, clinic, colors5, hookLine, hooks, intro, notice, won, type IVItem } from "./content";

/* 공통: 1000×1056 (또는 1000×1000) 정사각 레이아웃. 모든 씬은 flex 로 세로 중앙 정렬 */
const Center: React.FC<{ children: React.ReactNode; gap?: number; padding?: string }> = ({ children, gap = 0, padding = "0 60px" }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap,
      fontFamily: font,
      color: colors.white,
      textAlign: "center",
      padding,
    }}
  >
    {children}
  </div>
);

/** 가격 롤링: 0 → price 를 0.6초 동안 */
const Price: React.FC<{ price: number; delaySec: number; size?: number; color?: string }> = ({ price, delaySec, size = 40, color = colors.white }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.round(
    interpolate(frame, [delaySec * fps, (delaySec + 0.6) * fps], [0, price], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) / 1000,
  ) * 1000;
  return (
    <div style={{ fontSize: size, fontWeight: 900, letterSpacing: "-0.02em", color, fontVariantNumeric: "tabular-nums", ...fadeUp(frame, fps, delaySec, 0.4, 14) }}>
      {won(n)}
    </div>
  );
};

/** 하단 기관 표기 */
const Footer: React.FC<{ delaySec?: number }> = ({ delaySec = 1.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 36,
        textAlign: "center",
        fontFamily: font,
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: "rgba(255,255,255,.7)",
        ...fadeUp(frame, fps, delaySec, 0.6, 12),
      }}
    >
      {clinic.footer}
    </div>
  );
};

/* ---------- 씬 1: 인트로 ---------- */
const IntroInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <Background
        gradient={gradients.aurora}
        blobs={[
          { color: colors.cyan, size: 800, x: 0.15, y: 0.25, seed: "v1" },
          { color: colors.magenta, size: 700, x: 0.9, y: 0.6, seed: "v2" },
          { color: colors.lime, size: 520, x: 0.4, y: 1.0, seed: "v3", opacity: 0.6 },
        ]}
        drift={90}
      />
      <Particles count={45} colors={[colors.white, colors.cyan, colors.lime]} seed="iv-intro" minSize={3} maxSize={10} />
      <Center gap={0}>
        <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
          <div style={{ position: "relative", width: 300, height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GlowRings color={colors.cyan} size={220} period={2.6} spread={2.2} delaySec={0.6} style={{ top: "45%" }} />
            <div style={{ ...popIn(frame, fps, 0.1, 0.7) }}>
              <IVBag color={colors.cyan} size={380} delaySec={0.4} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "0.3em", color: colors.cyan, ...fadeUp(frame, fps, 0.6, 0.6, 20) }}>{intro.kicker}</div>
            <ShimmerText colors={[colors.lime, colors.cyan]} style={{ marginTop: 6, fontSize: 150, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, ...fadeUp(frame, fps, 0.9, 0.8, 60) }}>
              {intro.title}
            </ShimmerText>
            <div style={{ marginTop: 22, fontSize: 36, fontWeight: 600, color: "rgba(255,255,255,.9)", wordBreak: "keep-all", ...fadeUp(frame, fps, 1.5, 0.6, 30) }}>{intro.sub}</div>
            <div
              style={{
                marginTop: 26,
                padding: "8px 22px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,.45)",
                background: "rgba(255,255,255,.1)",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "0.1em",
                ...fadeUp(frame, fps, 1.9, 0.6, 20),
              }}
            >
              {clinic.name}
            </div>
          </div>
        </div>
      </Center>
    </>
  );
};
export const IVIntro = Interactive.create({ Component: IntroInner, layout: "absolute-fill" });

/* ---------- 씬 2: 이럴 때 ---------- */
const HookInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <Background
        gradient={gradients.sunset}
        blobs={[
          { color: colors.yellow, size: 700, x: 0.85, y: 0.15, seed: "h1" },
          { color: colors.magenta, size: 800, x: 0.1, y: 0.8, seed: "h2" },
        ]}
        drift={90}
      />
      <GlowRings color="rgba(255,255,255,.6)" size={520} count={4} period={3.2} spread={2.4} thickness={2} />
      <Particles count={30} colors={[colors.white, colors.yellow]} seed="iv-hook" speed={50} minSize={3} maxSize={8} />
      <Center gap={22}>
        {hooks.map((h, i) => (
          <div
            key={h.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "16px 36px 16px 22px",
              borderRadius: 999,
              background: "rgba(255,255,255,.16)",
              border: "2px solid rgba(255,255,255,.5)",
              backdropFilter: "blur(10px)",
              fontSize: 36,
              fontWeight: 700,
              ...slideInX(frame, fps, 0.3 + i * 0.4, 0.7, i % 2 === 0 ? -140 : 140),
            }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 32, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{h.icon}</div>
            {h.text}
          </div>
        ))}
        <div style={{ height: 30 }} />
        {hookLine.map((line, i) => {
          const start = (1.9 + i * 0.35) * fps;
          return (
            <div key={line} style={{ overflow: "hidden", padding: "4px 0" }}>
              <div
                style={{
                  fontSize: i === 0 ? 56 : 92,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  textShadow: "0 12px 40px rgba(0,0,0,.25)",
                  translate: `0px ${interpolate(frame, [start, start + 0.8 * fps], [120, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}%`,
                }}
              >
                {line}
              </div>
            </div>
          );
        })}
      </Center>
    </>
  );
};
export const IVHook = Interactive.create({ Component: HookInner, layout: "absolute-fill" });

/* ---------- 수액 카드 (씬 3·4 공용) ---------- */
const BagCard: React.FC<{ item: IVItem; delaySec: number; width: number; bagSize: number; nameSize: number; tagSize: number; priceSize: number }> = ({
  item,
  delaySec,
  width,
  bagSize,
  nameSize,
  tagSize,
  priceSize,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ width, display: "flex", ...popIn(frame, fps, delaySec, 0.6) }}>
      <GlassCard padding="22px 14px 18px" radius={26} glowColor={item.color} style={{ flex: 1, display: "flex" }} innerStyle={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <IVBag color={item.color} size={bagSize} delaySec={delaySec + 0.2} />
        <div style={{ fontSize: nameSize, fontWeight: 900, letterSpacing: "-0.02em", marginTop: 6, wordBreak: "keep-all", lineHeight: 1.2 }}>{item.name}</div>
        {item.tag ? (
          <div style={{ fontSize: tagSize, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: item.color, color: item.textColor ?? colors.ink, boxShadow: `0 0 14px ${item.color}99` }}>
            {item.tag}
          </div>
        ) : null}
        <Price price={item.price} delaySec={delaySec + 0.5} size={priceSize} color={colors.yellow} />
      </GlassCard>
    </div>
  );
};

/* ---------- 씬 3: 기본 수액 3종 ---------- */
const BasicInner: React.FC = () => {
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
      <Particles count={30} colors={[colors.cyan, colors.lime, colors.white]} seed="iv-basic" speed={25} minSize={3} maxSize={9} />
      <Center gap={0}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.3em", color: colors.cyan, ...fadeUp(frame, fps, 0.1, 0.6, 20) }}>VITAMIN</div>
        <ShimmerText colors={[colors.white, colors.lime]} style={{ marginTop: 4, marginBottom: 36, fontSize: 72, fontWeight: 900, letterSpacing: "-0.03em", ...fadeUp(frame, fps, 0.25) }}>
          기본 비타민 수액
        </ShimmerText>
        <div style={{ display: "flex", gap: 20, width: "100%", justifyContent: "center" }}>
          {basic.map((it, i) => (
            <BagCard key={it.name} item={it} delaySec={0.7 + i * 0.35} width={285} bagSize={230} nameSize={30} tagSize={18} priceSize={40} />
          ))}
        </div>
        <div style={{ marginTop: 34, fontSize: 26, fontWeight: 500, color: "rgba(255,255,255,.8)", ...fadeUp(frame, fps, 2.4, 0.6, 20) }}>
          바쁜 날엔 스피드, 환절기엔 면역, 손발 저릴 땐 말초신경대사
        </div>
      </Center>
    </>
  );
};
export const IVBasic = Interactive.create({ Component: BasicInner, layout: "absolute-fill" });

/* ---------- 씬 4: 컬러 수액 5종 ---------- */
const ColorsInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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
      <Particles count={35} colors={[colors.white, colors.yellow, colors.magenta]} seed="iv-colors" speed={30} minSize={3} maxSize={9} />
      <Center gap={0}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.3em", color: colors.yellow, ...fadeUp(frame, fps, 0.1, 0.6, 20) }}>COLOR IV</div>
        <ShimmerText colors={[colors.yellow, colors.magenta]} style={{ marginTop: 4, fontSize: 72, fontWeight: 900, letterSpacing: "-0.03em", ...fadeUp(frame, fps, 0.25) }}>
          컬러 수액
        </ShimmerText>
        <div style={{ marginTop: 6, marginBottom: 34, fontSize: 30, fontWeight: 500, color: "rgba(255,255,255,.85)", ...fadeUp(frame, fps, 0.45, 0.6, 30) }}>
          오늘 컨디션에 맞는 색을 고르세요
        </div>
        <div style={{ display: "flex", gap: 20, width: "100%", justifyContent: "center" }}>
          {colors5.map((it, i) => (
            <BagCard key={it.name} item={it} delaySec={0.7 + i * 0.3} width={285} bagSize={230} nameSize={32} tagSize={18} priceSize={40} />
          ))}
        </div>
      </Center>
    </>
  );
};
export const IVColors = Interactive.create({ Component: ColorsInner, layout: "absolute-fill" });

/* ---------- 씬 5: 아미노산 · 리피드 ---------- */
const AminoInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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
      <Particles count={30} colors={[colors.cyan, colors.white]} seed="iv-amino" speed={40} minSize={3} maxSize={7} />
      <Center gap={0}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.3em", color: colors.cyan, ...fadeUp(frame, fps, 0.1, 0.6, 20) }}>AMINO · LIPID</div>
        <ShimmerText colors={[colors.white, colors.cyan]} style={{ marginTop: 4, fontSize: 68, fontWeight: 900, letterSpacing: "-0.03em", ...fadeUp(frame, fps, 0.25) }}>
          아미노산 · 리피드 수액
        </ShimmerText>
        <div style={{ marginTop: 6, marginBottom: 30, fontSize: 28, fontWeight: 500, color: "rgba(255,255,255,.85)", ...fadeUp(frame, fps, 0.45, 0.6, 30) }}>
          근육이 빠지고 입맛이 없을 때, 제대로 채우는 고급 영양
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 820 }}>
          {amino.map((it, i) => (
            <div key={it.name} style={{ ...slideInX(frame, fps, 0.8 + i * 0.3, 0.7, i % 2 === 0 ? -100 : 100) }}>
              <GlassCard padding="14px 30px 14px 20px" radius={24} glowBorder={i === 2 ? gradients.cyanMagenta : undefined} glowColor={i === 2 ? colors.cyan : undefined} innerStyle={i === 2 ? { background: "rgba(5, 20, 50, .62)" } : undefined}>
                <div style={{ display: "flex", alignItems: "center", gap: 22, textAlign: "left" }}>
                  <IVBag color={it.color} size={96} delaySec={0.9 + i * 0.3} drip={false} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.02em" }}>{it.name}</div>
                    <div style={{ marginTop: 4, display: "inline-block", fontSize: 18, fontWeight: 700, padding: "3px 12px", borderRadius: 999, background: it.color, color: colors.ink }}>{it.tag}</div>
                  </div>
                  <Price price={it.price} delaySec={1.2 + i * 0.3} size={42} color={colors.yellow} />
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </Center>
    </>
  );
};
export const IVAmino = Interactive.create({ Component: AminoInner, layout: "absolute-fill" });

/* ---------- 씬 6: 안내 + 마무리 ---------- */
const NoticeInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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
      <Confetti colors={[colors.lime, colors.cyan, colors.yellow, colors.white, colors.magenta]} count={50} speed={200} />
      <Center gap={0}>
        <div style={{ position: "relative", width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GlowRings color={colors.lime} size={140} period={2.2} spread={2.2} delaySec={0.5} />
          <Clover size={120} delaySec={0.1} glow={colors.lime} />
        </div>
        <div
          style={{
            marginTop: 26,
            padding: "26px 54px",
            borderRadius: 36,
            background: "rgba(255,255,255,.14)",
            border: "2px solid rgba(255,255,255,.5)",
            backdropFilter: "blur(18px)",
            boxShadow: `0 0 60px ${colors.yellow}66, 0 24px 60px rgba(0,0,0,.3)`,
            ...popIn(frame, fps, 0.6),
          }}
        >
          <div style={{ fontSize: 46, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, whiteSpace: "nowrap" }}>
            <span style={{ color: colors.lime }}>♣</span> {notice.main} <span style={{ color: colors.lime }}>♣</span>
          </div>
        </div>
        <div style={{ marginTop: 22, fontSize: 32, fontWeight: 600, color: "rgba(255,255,255,.9)", ...fadeUp(frame, fps, 1.3, 0.6, 30) }}>{notice.sub}</div>
        <div
          style={{
            marginTop: 40,
            padding: "16px 44px",
            borderRadius: 999,
            background: gradients.pinkYellow,
            color: colors.ink,
            fontSize: 34,
            fontWeight: 900,
            boxShadow: `0 0 40px ${colors.yellow}88`,
            ...popIn(frame, fps, 1.8),
          }}
        >
          {notice.cta}
        </div>
        <div style={{ marginTop: 44, fontSize: 30, fontWeight: 700, letterSpacing: "0.08em", ...fadeUp(frame, fps, 2.3, 0.6, 20) }}>
          {clinic.name}
        </div>
      </Center>
      <Footer delaySec={2.6} />
    </>
  );
};
export const IVNotice = Interactive.create({ Component: NoticeInner, layout: "absolute-fill" });

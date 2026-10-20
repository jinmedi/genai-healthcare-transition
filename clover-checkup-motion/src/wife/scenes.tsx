import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Paper } from "./components/Paper";
import { Caption } from "./components/Caption";
import { Handwriting } from "./components/Handwriting";
import {
  Bubble,
  CalendarDoodle,
  CloverDoodle,
  DeskDoodle,
  HandDoodle,
  Magnifier,
  PersonDoodle,
  PinDoodle,
  ResultSheet,
  Sparkle,
  usePop,
} from "./components/Doodles";
import { bodyFont, note } from "./noteTheme";
import { clinic, scenes } from "./script";

/* 공통 레이아웃: 1000×1000. 위쪽 절반은 그림, 아래쪽은 자막. */
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Paper>
    <div style={{ position: "absolute", inset: 0 }}>{children}</div>
  </Paper>
);

const Art: React.FC<{ children: React.ReactNode; top?: number; height?: number }> = ({ children, top = 90, height = 440 }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

const Text: React.FC<{ children: React.ReactNode; top?: number }> = ({ children, top = 560 }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
    {children}
  </div>
);

/** 등장 보조: opacity + scale 팝 */
const Pop: React.FC<{ delaySec: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delaySec, children, style }) => {
  const p = usePop(delaySec, 0.5);
  return <div style={{ opacity: Math.min(1, p * 2), scale: String(p), ...style }}>{children}</div>;
};

/* ---------- 씬 1: 제 아내 자랑 좀 할게요 ---------- */
const W1Inner: React.FC = () => (
  <Stage>
    <div style={{ position: "absolute", left: 80, top: 86 }}>
      <Handwriting delaySec={0.2} size={48} rotate={-5} color={note.coral}>
        {scenes.s1.tag}
      </Handwriting>
    </div>
    <div style={{ position: "absolute", right: 90, top: 70 }}>
      <CloverDoodle size={110} delaySec={0.4} />
    </div>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 80px" }}>
      <Caption line={scenes.s1.line} delaySec={0.7} size={72} weight={700} />
    </div>
  </Stage>
);
export const W1 = Interactive.create({ Component: W1Inner, layout: "absolute-fill" });

/* ---------- 씬 2: 손이 참 좋아요 ---------- */
const W2Inner: React.FC = () => (
  <Stage>
    <Art top={60} height={470}>
      <div style={{ position: "relative", width: 420, height: 420 }}>
        <div style={{ position: "absolute", left: 60, top: 40 }}>
          <HandDoodle delaySec={0.3} size={340} />
        </div>
        <Sparkle x={40} y={70} delaySec={1.5} size={44} />
        <Sparkle x={330} y={30} delaySec={1.8} size={34} />
        <Sparkle x={370} y={250} delaySec={2.1} size={40} />
        <Sparkle x={20} y={300} delaySec={2.4} size={30} />
      </div>
    </Art>
    <Text top={600}>
      <Caption line={scenes.s2.line} delaySec={0.6} size={62} weight={700} />
    </Text>
  </Stage>
);
export const W2 = Interactive.create({ Component: W2Inner, layout: "absolute-fill" });

/* ---------- 씬 3: 동료들이 줄을 섰어요 ---------- */
const W3Inner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const door = usePop(0.4, 0.5);
  const count = 8;
  return (
    <Stage>
      <Art top={70} height={420}>
        <div style={{ position: "relative", width: 1000, height: 420 }}>
          {/* 내시경실 문 */}
          <div style={{ position: "absolute", left: 60, top: 60, scale: String(door), transformOrigin: "50% 100%" }}>
            <div style={{ width: 150, height: 290, borderRadius: "14px 14px 4px 4px", background: note.sky, border: `6px solid ${note.ink}`, position: "relative" }}>
              <div style={{ position: "absolute", left: 18, top: 28, width: 108, height: 90, background: "#fff", border: `5px solid ${note.ink}`, borderRadius: 8 }} />
              <div style={{ position: "absolute", right: 22, top: 170, width: 16, height: 16, borderRadius: 8, background: note.ink }} />
            </div>
            <div
              style={{
                position: "absolute",
                left: -10,
                top: -34,
                padding: "6px 18px",
                background: note.marker,
                border: `5px solid ${note.ink}`,
                borderRadius: 10,
                fontFamily: bodyFont,
                fontWeight: 800,
                fontSize: 30,
                color: note.ink,
                whiteSpace: "nowrap",
              }}
            >
              {scenes.s3.sign}
            </div>
          </div>
          {/* 줄 선 동료들 */}
          {Array.from({ length: count }).map((_, i) => {
            const d = 1.1 + i * 0.32;
            const p = interpolate(t, [d, d + 0.45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
            const bob = t > d ? Math.sin((t - d) * 4 + i) * 4 : 0;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 250 + i * 104,
                  top: 150 + (i % 2) * 8,
                  scale: String(p),
                  transformOrigin: "50% 100%",
                  translate: `0px ${bob}px`,
                }}
              >
                <PersonDoodle size={82} gown={i % 3 === 0 ? note.cream : i % 3 === 1 ? "#E9F3EC" : "#EAF2F8"} mouth={i === 0 ? "smile" : "flat"} glasses={i % 4 === 2} />
              </div>
            );
          })}
          {/* 화면 밖으로 이어지는 느낌: 오른쪽 페이드 */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 140, background: `linear-gradient(90deg, ${note.cream}00, ${note.cream})` }} />
        </div>
      </Art>
      <Text top={530}>
        <Caption line={scenes.s3.line} delaySec={0.3} size={46} weight={600} />
      </Text>
    </Stage>
  );
};
export const W3 = Interactive.create({ Component: W3Inner, layout: "absolute-fill" });

/* ---------- 씬 4: 꼼꼼히 ---------- */
const W4Inner: React.FC = () => (
  <Stage>
    <Art top={50} height={470}>
      <div style={{ position: "relative", width: 420, height: 440 }}>
        <div style={{ position: "absolute", left: 40, top: 10 }}>
          <ResultSheet delaySec={0.3} size={300} />
        </div>
        <div style={{ position: "absolute", left: 250, top: 250 }}>
          <Magnifier delaySec={2.3} size={150} />
        </div>
      </div>
    </Art>
    <Text top={560}>
      <Caption line={scenes.s4.line} delaySec={0.5} size={48} />
    </Text>
  </Stage>
);
export const W4 = Interactive.create({ Component: W4Inner, layout: "absolute-fill" });

/* ---------- 씬 5: 저도 아내한테 받습니다 ---------- */
const W5Inner: React.FC = () => (
  <Stage>
    <Art top={50} height={460}>
      <div style={{ position: "relative", width: 520, height: 420 }}>
        <div style={{ position: "absolute", left: 150, top: 20 }}>
          <Pop delaySec={0.3}>
            <PersonDoodle size={220} glasses sweat mouth="worried" gown="#E9F3EC" />
          </Pop>
        </div>
        <div style={{ position: "absolute", left: 380, top: 120 }}>
          <Handwriting delaySec={2.9} size={46} rotate={6} color={note.coral}>
            {scenes.s5.note}
          </Handwriting>
        </div>
      </div>
    </Art>
    <Text top={560}>
      <Caption line={scenes.s5.line} delaySec={0.6} size={52} />
    </Text>
  </Stage>
);
export const W5 = Interactive.create({ Component: W5Inner, layout: "absolute-fill" });

/* ---------- 씬 6: 세종에서 크로바내과 ---------- */
const W6Inner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <Stage>
      <Art top={40} height={400}>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <CloverDoodle size={170} delaySec={0.2} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Pop delaySec={0.7} style={{ transformOrigin: "0 50%" }}>
              <div style={{ fontFamily: bodyFont, fontWeight: 900, fontSize: 86, color: note.cloverDark, letterSpacing: "-0.03em", lineHeight: 1 }}>
                {clinic.name}
              </div>
            </Pop>
            <Pop delaySec={1.1} style={{ transformOrigin: "0 50%" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "8px 20px",
                  border: `4px solid ${note.ink}`,
                  borderRadius: 999,
                  fontFamily: bodyFont,
                  fontWeight: 700,
                  fontSize: 28,
                  color: note.ink,
                  background: "#fff",
                }}
              >
                {clinic.doctor} · {clinic.career}
              </div>
            </Pop>
          </div>
        </div>
      </Art>
      <div style={{ position: "absolute", left: 100, top: 330, display: "flex", alignItems: "flex-end", gap: 6 }}>
        <PinDoodle delaySec={2.2} size={64} />
        <Handwriting delaySec={2.4} size={44} rotate={-4}>
          {clinic.city}
        </Handwriting>
      </div>
      <Text top={470}>
        <Caption line={scenes.s6.line} delaySec={0.3} size={50} />
      </Text>
      {/* 검사 3개 칩 + 하루에 끝내요 */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
        {scenes.s6.chips.map((c, i) => {
          const d = 2.7 + i * 0.3;
          const p = interpolate(t, [d, d + 0.45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
          return (
            <div
              key={c}
              style={{
                padding: "12px 24px",
                borderRadius: 999,
                background: [note.marker, note.sky, note.blush][i],
                border: `4px solid ${note.ink}`,
                fontFamily: bodyFont,
                fontWeight: 800,
                fontSize: 30,
                color: note.ink,
                scale: String(p),
                opacity: Math.min(1, p * 2),
                rotate: `${(i - 1) * 2}deg`,
              }}
            >
              {c}
            </div>
          );
        })}
        <Handwriting delaySec={3.8} size={48} rotate={-3} style={{ marginLeft: 12 }}>
          {scenes.s6.line2}
        </Handwriting>
      </div>
    </Stage>
  );
};
export const W6 = Interactive.create({ Component: W6Inner, layout: "absolute-fill" });

/* ---------- 씬 7: 대학병원급 장비, CO₂ ---------- */
const W7Inner: React.FC = () => (
  <Stage>
    <Art top={40} height={480}>
      <div style={{ position: "relative", width: 700, height: 480 }}>
        <Bubble x={120} y={400} r={40} delaySec={0.4} />
        <Bubble x={240} y={440} r={28} delaySec={0.9} />
        <Bubble x={560} y={420} r={34} delaySec={1.2} />
        <Bubble x={640} y={380} r={22} delaySec={1.6} />
        <Bubble x={380} y={430} r={110} delaySec={1.9} label={scenes.s7.bubble} />
        <Bubble x={470} y={300} r={26} delaySec={2.3} />
        <Bubble x={200} y={260} r={20} delaySec={2.6} />
      </div>
    </Art>
    <Text top={560}>
      <Caption line={scenes.s7.line} delaySec={0.3} size={52} />
      <Handwriting delaySec={2.4} size={44} rotate={-2}>
        {scenes.s7.note}
      </Handwriting>
    </Text>
  </Stage>
);
export const W7 = Interactive.create({ Component: W7Inner, layout: "absolute-fill" });

/* ---------- 씬 8: 미리 예약부터 ---------- */
const W8Inner: React.FC = () => (
  <Stage>
    <Art top={50} height={420}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 50 }}>
        <DeskDoodle delaySec={0.3} size={300} />
        <CalendarDoodle delaySec={0.9} size={210} />
      </div>
    </Art>
    <Text top={500}>
      <Caption line={scenes.s8.line} delaySec={0.3} size={50} />
      <Handwriting delaySec={3.0} size={42} rotate={-2}>
        {scenes.s8.note}
      </Handwriting>
      <Pop delaySec={3.8}>
        <div
          style={{
            marginTop: 10,
            padding: "14px 32px",
            borderRadius: 16,
            background: note.clover,
            border: `5px solid ${note.ink}`,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 34,
            color: "#fff",
            boxShadow: `6px 6px 0 ${note.ink}`,
          }}
        >
          {scenes.s8.desk}
        </div>
      </Pop>
    </Text>
  </Stage>
);
export const W8 = Interactive.create({ Component: W8Inner, layout: "absolute-fill" });

/* ---------- 씬 9: 아내 자랑이 좀 심했나요? ---------- */
const W9Inner: React.FC = () => (
  <Stage>
    <Art top={40} height={380}>
      <Pop delaySec={0.2}>
        <PersonDoodle size={200} glasses blush mouth="smile" gown="#E9F3EC" />
      </Pop>
    </Art>
    <Text top={440}>
      <Caption line={scenes.s9.line} delaySec={0.4} size={58} weight={700} />
      <Caption line={scenes.s9.line2} delaySec={2.0} size={46} />
    </Text>
    <div style={{ position: "absolute", right: 110, bottom: 120, display: "flex", alignItems: "center", gap: 16 }}>
      <CloverDoodle size={70} delaySec={3.1} />
      <Handwriting delaySec={3.2} size={50} rotate={-3} color={note.cloverDark}>
        {clinic.signature}
      </Handwriting>
    </div>
    <div style={{ position: "absolute", left: 100, bottom: 110 }}>
      <Handwriting delaySec={3.5} size={38} rotate={-6} color={note.inkSoft}>
        {clinic.speaker}
      </Handwriting>
    </div>
  </Stage>
);
export const W9 = Interactive.create({ Component: W9Inner, layout: "absolute-fill" });

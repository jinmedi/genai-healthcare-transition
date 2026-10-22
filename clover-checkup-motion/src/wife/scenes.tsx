import React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Paper } from "./components/Paper";
import { Caption } from "./components/Caption";
import { Handwriting } from "./components/Handwriting";
import { Polaroid, SweatSticker } from "./components/Polaroid";
import {
  Bubble,
  CalendarDoodle,
  CloverDoodle,
  DeskDoodle,
  Magnifier,
  PersonDoodle,
  PinDoodle,
  ResultSheet,
  Sparkle,
  usePop,
} from "./components/Doodles";
import { bodyFont, note } from "./noteTheme";
import { clinic, scenes } from "./script";
import { useFormat } from "../format";

/* 공통 레이아웃.
   정사각(1000×1000): 위쪽 절반 그림, 아래쪽 자막.
   가로(1000×562):   왼쪽 그림, 오른쪽 자막. */
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Paper>
    <div style={{ position: "absolute", inset: 0 }}>{children}</div>
  </Paper>
);

/** 자막 영역. wide 면 오른쪽 절반에 세로 중앙, 아니면 top 위치에 가로 중앙 */
const Text: React.FC<{ children: React.ReactNode; top?: number; wideLeft?: number }> = ({ children, top = 560, wideLeft = 470 }) => {
  const { wide } = useFormat();
  return wide ? (
    <div
      style={{
        position: "absolute",
        left: wideLeft,
        right: 50,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
      }}
    >
      {children}
    </div>
  ) : (
    <div style={{ position: "absolute", left: 70, right: 70, top, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      {children}
    </div>
  );
};

/** 그림 영역. wide 면 왼쪽 절반에 세로 중앙, 아니면 top/height 띠에 가로 중앙 */
const Art: React.FC<{ children: React.ReactNode; top?: number; height?: number; wideWidth?: number }> = ({ children, top = 90, height = 440, wideWidth = 440 }) => {
  const { wide } = useFormat();
  return wide ? (
    <div style={{ position: "absolute", left: 30, top: 0, bottom: 0, width: wideWidth, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  ) : (
    <div style={{ position: "absolute", left: 0, right: 0, top, height, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
};

const Pop: React.FC<{ delaySec: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delaySec, children, style }) => {
  const p = usePop(delaySec, 0.5);
  return <div style={{ opacity: Math.min(1, p * 2), scale: String(p), ...style }}>{children}</div>;
};

/* ---------- 씬 1: 제 아내 자랑 좀 할게요 ---------- */
const W1Inner: React.FC = () => {
  const { wide } = useFormat();
  return (
    <Stage>
      <div style={{ position: "absolute", left: wide ? 60 : 80, top: wide ? 50 : 86 }}>
        <Handwriting delaySec={0.2} size={wide ? 40 : 48} rotate={-5} color={note.coral}>
          {scenes.s1.tag}
        </Handwriting>
      </div>
      <div style={{ position: "absolute", right: wide ? 70 : 90, top: wide ? 40 : 70 }}>
        <CloverDoodle size={wide ? 90 : 110} delaySec={0.4} />
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 80px" }}>
        <Caption line={scenes.s1.line} delaySec={0.7} size={wide ? 64 : 72} weight={700} />
      </div>
    </Stage>
  );
};
export const W1 = Interactive.create({ Component: W1Inner, layout: "absolute-fill" });

/* ---------- 씬 2: 손이 참 좋아요 ---------- */
const W2Inner: React.FC = () => {
  const { wide } = useFormat();
  return (
    <Stage>
      {wide ? (
        <>
          <div style={{ position: "absolute", left: 110, top: 48 }}>
            <Polaroid src={scenes.s2.photo} caption={scenes.s2.photoCaption} delaySec={0.3} rotate={-4} width={290} photoHeight={262} />
          </div>
          <Sparkle x={60} y={80} delaySec={1.5} size={38} />
          <Sparkle x={420} y={40} delaySec={1.8} size={30} />
          <Sparkle x={430} y={330} delaySec={2.1} size={34} />
          <Sparkle x={50} y={380} delaySec={2.4} size={26} />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: 300, top: 60 }}>
            <Polaroid src={scenes.s2.photo} caption={scenes.s2.photoCaption} delaySec={0.3} rotate={-4} />
          </div>
          <Sparkle x={230} y={110} delaySec={1.5} size={44} />
          <Sparkle x={730} y={60} delaySec={1.8} size={34} />
          <Sparkle x={760} y={420} delaySec={2.1} size={40} />
          <Sparkle x={200} y={470} delaySec={2.4} size={30} />
        </>
      )}
      <Text top={640} wideLeft={500}>
        <Caption line={scenes.s2.line} delaySec={0.9} size={wide ? 50 : 62} weight={700} />
      </Text>
    </Stage>
  );
};
export const W2 = Interactive.create({ Component: W2Inner, layout: "absolute-fill" });

/* ---------- 씬 3: 동료들이 줄을 섰어요 ---------- */
const W3Inner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { wide } = useFormat();
  const t = frame / fps;
  const door = usePop(0.4, 0.5);
  const count = 8;
  const k = wide ? 0.66 : 1; // 가로에서는 줄 전체를 줄여 위쪽 띠에 넣는다
  return (
    <Stage>
      <div style={{ position: "absolute", left: 0, top: wide ? 30 : 70, width: 1000, height: 420 * k, scale: String(k), transformOrigin: "0 0" }}>
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
        {/* 줄 선 동료들 (가로에서는 폭이 1000/k 이라 더 많은 인원이 보인다) */}
        {Array.from({ length: wide ? count + 4 : count }).map((_, i) => {
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
      </div>
      {/* 화면 밖으로 이어지는 느낌: 오른쪽 페이드 */}
      <div style={{ position: "absolute", right: 0, top: 0, height: wide ? 320 : 500, width: 140, background: `linear-gradient(90deg, ${note.cream}00, ${note.cream})` }} />
      {wide ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 330, display: "flex", justifyContent: "center" }}>
          <Caption line={scenes.s3.line} delaySec={0.3} size={34} weight={600} />
        </div>
      ) : (
        <Text top={530}>
          <Caption line={scenes.s3.line} delaySec={0.3} size={46} weight={600} />
        </Text>
      )}
    </Stage>
  );
};
export const W3 = Interactive.create({ Component: W3Inner, layout: "absolute-fill" });

/* ---------- 씬 4: 꼼꼼히 ---------- */
const W4Inner: React.FC = () => {
  const { wide } = useFormat();
  const k = wide ? 0.78 : 1;
  return (
    <Stage>
      <Art top={50} height={470}>
        <div style={{ position: "relative", width: 420 * k, height: 440 * k }}>
          <div style={{ position: "absolute", left: 40 * k, top: 10 * k }}>
            <ResultSheet delaySec={0.3} size={300 * k} />
          </div>
          <div style={{ position: "absolute", left: 250 * k, top: 250 * k }}>
            <Magnifier delaySec={2.3} size={150 * k} />
          </div>
        </div>
      </Art>
      <Text top={560} wideLeft={430}>
        <Caption line={scenes.s4.line} delaySec={0.5} size={wide ? 28 : 48} align={wide ? "left" : "center"} />
      </Text>
    </Stage>
  );
};
export const W4 = Interactive.create({ Component: W4Inner, layout: "absolute-fill" });

/* ---------- 씬 5: 저도 아내한테 받습니다 ---------- */
const W5Inner: React.FC = () => {
  const { wide } = useFormat();
  return (
    <Stage>
      {wide ? (
        <>
          <div style={{ position: "absolute", left: 120, top: 44 }}>
            <Polaroid src={scenes.s5.photo} caption={scenes.s5.photoCaption} width={230} photoHeight={250} rotate={3} delaySec={0.3} position="50% 12%" />
          </div>
          <div style={{ position: "absolute", left: 370, top: 60 }}>
            <SweatSticker delaySec={2.4} size={56} />
          </div>
          <div style={{ position: "absolute", left: 380, top: 160 }}>
            <Handwriting delaySec={2.9} size={36} rotate={6} color={note.coral}>
              {scenes.s5.note}
            </Handwriting>
          </div>
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: 330, top: 60 }}>
            <Polaroid src={scenes.s5.photo} caption={scenes.s5.photoCaption} width={300} photoHeight={330} rotate={3} delaySec={0.3} position="50% 12%" />
          </div>
          <div style={{ position: "absolute", left: 650, top: 100 }}>
            <SweatSticker delaySec={2.4} size={72} />
          </div>
          <div style={{ position: "absolute", left: 690, top: 230 }}>
            <Handwriting delaySec={2.9} size={46} rotate={6} color={note.coral}>
              {scenes.s5.note}
            </Handwriting>
          </div>
        </>
      )}
      <Text top={560} wideLeft={500}>
        <Caption line={scenes.s5.line} delaySec={0.6} size={wide ? 32 : 52} />
      </Text>
    </Stage>
  );
};
export const W5 = Interactive.create({ Component: W5Inner, layout: "absolute-fill" });

/* ---------- 씬 6: 세종에서 크로바내과 ---------- */
const W6Inner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { wide } = useFormat();
  const t = frame / fps;

  const header = (
    <div style={{ display: "flex", alignItems: "center", gap: wide ? 24 : 36 }}>
      <CloverDoodle size={wide ? 110 : 170} delaySec={0.2} />
      <div style={{ display: "flex", flexDirection: "column", gap: wide ? 10 : 14 }}>
        <Pop delaySec={0.7} style={{ transformOrigin: "0 50%" }}>
          <div style={{ fontFamily: bodyFont, fontWeight: 900, fontSize: wide ? 60 : 86, color: note.cloverDark, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {clinic.name}
          </div>
        </Pop>
        <Pop delaySec={1.1} style={{ transformOrigin: "0 50%" }}>
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: wide ? "6px 16px" : "8px 20px",
              border: `4px solid ${note.ink}`,
              borderRadius: 999,
              fontFamily: bodyFont,
              fontWeight: 700,
              fontSize: wide ? 20 : 28,
              color: note.ink,
              background: "#fff",
            }}
          >
            {clinic.doctor} · {clinic.career}
          </div>
        </Pop>
      </div>
    </div>
  );

  const chips = (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: wide ? 12 : 16 }}>
      {scenes.s6.chips.map((c, i) => {
        const d = 2.7 + i * 0.3;
        const p = interpolate(t, [d, d + 0.45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.34, 1.56, 0.64, 1) });
        return (
          <div
            key={c}
            style={{
              padding: wide ? "8px 18px" : "12px 24px",
              borderRadius: 999,
              background: [note.marker, note.sky, note.blush][i],
              border: `4px solid ${note.ink}`,
              fontFamily: bodyFont,
              fontWeight: 800,
              fontSize: wide ? 22 : 30,
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
      <Handwriting delaySec={3.8} size={wide ? 36 : 48} rotate={-3} style={{ marginLeft: 12 }}>
        {scenes.s6.line2}
      </Handwriting>
    </div>
  );

  return wide ? (
    <Stage>
      <div style={{ position: "absolute", left: 70, top: 46 }}>{header}</div>
      <div style={{ position: "absolute", left: 80, top: 230, display: "flex", alignItems: "flex-end", gap: 6 }}>
        <PinDoodle delaySec={2.2} size={50} />
        <Handwriting delaySec={2.4} size={36} rotate={-4}>
          {clinic.city}
        </Handwriting>
      </div>
      <div style={{ position: "absolute", left: 480, right: 50, top: 60, bottom: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Caption line={scenes.s6.line} delaySec={0.3} size={38} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 440 }}>{chips}</div>
    </Stage>
  ) : (
    <Stage>
      <Art top={40} height={400}>{header}</Art>
      <div style={{ position: "absolute", left: 100, top: 330, display: "flex", alignItems: "flex-end", gap: 6 }}>
        <PinDoodle delaySec={2.2} size={64} />
        <Handwriting delaySec={2.4} size={44} rotate={-4}>
          {clinic.city}
        </Handwriting>
      </div>
      <Text top={470}>
        <Caption line={scenes.s6.line} delaySec={0.3} size={50} />
      </Text>
      <div style={{ position: "absolute", left: 0, right: 0, top: 760 }}>{chips}</div>
    </Stage>
  );
};
export const W6 = Interactive.create({ Component: W6Inner, layout: "absolute-fill" });

/* ---------- 씬 7: 대학병원급 장비, CO₂ ---------- */
const W7Inner: React.FC = () => {
  const { wide } = useFormat();
  const k = wide ? 0.62 : 1;
  return (
    <Stage>
      <Art top={40} height={480} wideWidth={460}>
        <div style={{ position: "relative", width: 700 * k, height: 480 * k }}>
          <Bubble x={120 * k} y={400 * k} r={40 * k} delaySec={0.4} />
          <Bubble x={240 * k} y={440 * k} r={28 * k} delaySec={0.9} />
          <Bubble x={560 * k} y={420 * k} r={34 * k} delaySec={1.2} />
          <Bubble x={640 * k} y={380 * k} r={22 * k} delaySec={1.6} />
          <Bubble x={380 * k} y={430 * k} r={110 * k} delaySec={1.9} label={scenes.s7.bubble} />
          <Bubble x={470 * k} y={300 * k} r={26 * k} delaySec={2.3} />
          <Bubble x={200 * k} y={260 * k} r={20 * k} delaySec={2.6} />
        </div>
      </Art>
      <Text top={560} wideLeft={500}>
        <Caption line={scenes.s7.line} delaySec={0.3} size={wide ? 40 : 52} />
        <Handwriting delaySec={2.4} size={wide ? 32 : 44} rotate={-2}>
          {scenes.s7.note}
        </Handwriting>
      </Text>
    </Stage>
  );
};
export const W7 = Interactive.create({ Component: W7Inner, layout: "absolute-fill" });

/* ---------- 씬 8: 미리 예약부터 ---------- */
const W8Inner: React.FC = () => {
  const { wide } = useFormat();
  return (
    <Stage>
      <Art top={50} height={420}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: wide ? 24 : 50 }}>
          <DeskDoodle delaySec={0.3} size={wide ? 220 : 300} />
          <CalendarDoodle delaySec={0.9} size={wide ? 150 : 210} />
        </div>
      </Art>
      <Text top={500} wideLeft={480}>
        <Caption line={scenes.s8.line} delaySec={0.3} size={wide ? 36 : 50} />
        <Handwriting delaySec={3.0} size={wide ? 30 : 42} rotate={-2}>
          {scenes.s8.note}
        </Handwriting>
        <Pop delaySec={3.8}>
          <div
            style={{
              marginTop: wide ? 4 : 10,
              padding: wide ? "10px 24px" : "14px 32px",
              borderRadius: 16,
              background: note.clover,
              border: `5px solid ${note.ink}`,
              fontFamily: bodyFont,
              fontWeight: 800,
              fontSize: wide ? 26 : 34,
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
};
export const W8 = Interactive.create({ Component: W8Inner, layout: "absolute-fill" });

/* ---------- 씬 9: 아내 자랑이 좀 심했나요? ---------- */
const W9Inner: React.FC = () => {
  const { wide } = useFormat();
  return (
    <Stage>
      {wide ? (
        <div style={{ position: "absolute", left: 130, top: 46 }}>
          <Polaroid src={scenes.s9.photo} caption={scenes.s9.photoCaption} width={230} photoHeight={250} rotate={-2} delaySec={0.2} position="50% 12%" />
        </div>
      ) : (
        <div style={{ position: "absolute", left: 350, top: 50 }}>
          <Polaroid src={scenes.s9.photo} caption={scenes.s9.photoCaption} width={280} photoHeight={300} rotate={-2} delaySec={0.2} position="50% 12%" />
        </div>
      )}
      <Text top={450} wideLeft={470}>
        <Caption line={scenes.s9.line} delaySec={0.4} size={wide ? 44 : 58} weight={700} />
        <Caption line={scenes.s9.line2} delaySec={2.0} size={wide ? 34 : 46} />
      </Text>
      <div style={{ position: "absolute", right: wide ? 60 : 110, bottom: wide ? 40 : 120, display: "flex", alignItems: "center", gap: 16 }}>
        <CloverDoodle size={wide ? 50 : 70} delaySec={3.1} />
        <Handwriting delaySec={3.2} size={wide ? 38 : 50} rotate={-3} color={note.cloverDark}>
          {clinic.signature}
        </Handwriting>
      </div>
      <div style={{ position: "absolute", left: wide ? 60 : 100, bottom: wide ? 40 : 110 }}>
        <Handwriting delaySec={3.5} size={wide ? 30 : 38} rotate={-6} color={note.inkSoft}>
          {clinic.speaker}
        </Handwriting>
      </div>
    </Stage>
  );
};
export const W9 = Interactive.create({ Component: W9Inner, layout: "absolute-fill" });

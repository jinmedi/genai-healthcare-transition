import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Line } from "../script";
import { bodyFont, note } from "../noteTheme";

type Props = {
  line: Line;
  /** 타자 시작 시점(초) */
  delaySec?: number;
  /** 초당 글자 수 */
  cps?: number;
  size?: number;
  weight?: number;
  color?: string;
  align?: "center" | "left";
  style?: React.CSSProperties;
};

/** 한 줄의 총 글자 수 */
export const lineLength = (line: Line): number => line.reduce((n, s) => n + s.t.length, 0);

/** 타자 완료까지 걸리는 시간(초) */
export const typingSeconds = (line: Line, cps = 15): number => lineLength(line) / cps;

/**
 * 타자기 자막. 글자가 한 자씩 찍히고, hl 조각은 타자가 끝난 뒤 형광펜이 칠해진다.
 * 아직 안 찍힌 글자는 투명하게 자리만 차지해 레이아웃이 흔들리지 않는다.
 * 커서는 타자 중에 켜져 있고, 끝난 뒤 0.9초간 깜박이다 사라진다.
 */
export const Caption: React.FC<Props> = ({
  line,
  delaySec = 0,
  cps = 15,
  size = 54,
  weight = 600,
  color = note.ink,
  align = "center",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - delaySec;
  const total = lineLength(line);
  const shown = Math.max(0, Math.min(total, Math.floor(t * cps)));
  const typingDone = shown >= total;
  const doneAt = total / cps;
  const cursorOn =
    t >= 0 && (!typingDone ? true : t < doneAt + 0.9 && Math.floor((t - doneAt) * 3) % 2 === 0);

  const cursor = (
    <span
      style={{
        display: "inline-block",
        width: 4,
        height: "0.9em",
        marginLeft: 3,
        marginRight: -7,
        verticalAlign: "-0.1em",
        background: note.ink,
        borderRadius: 2,
        opacity: cursorOn ? 1 : 0,
      }}
    />
  );

  let pos = 0;
  let cursorPlaced = false;
  return (
    <div
      style={{
        fontFamily: bodyFont,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight: 1.45,
        letterSpacing: "-0.015em",
        textAlign: align,
        whiteSpace: "pre-wrap",
        wordBreak: "keep-all",
        ...style,
      }}
    >
      {line.map((seg, i) => {
        const start = pos;
        pos += seg.t.length;
        const visibleCount = Math.max(0, Math.min(seg.t.length, shown - start));
        const visible = seg.t.slice(0, visibleCount);
        const hidden = seg.t.slice(visibleCount);
        // 커서는 지금 찍고 있는 조각의 보이는 글자 바로 뒤에 둔다
        const isCursorSeg = !cursorPlaced && (shown < start + seg.t.length || i === line.length - 1);
        if (isCursorSeg) cursorPlaced = true;
        const hlProgress = seg.hl
          ? interpolate(t, [doneAt + 0.1, doneAt + 0.55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          : 0;
        return (
          <span key={i}>
            <span
              style={
                seg.hl
                  ? {
                      backgroundImage: `linear-gradient(transparent 52%, ${note.marker} 52%, ${note.marker} 94%, transparent 94%)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: `${hlProgress * 100}% 100%`,
                      padding: "0 0.06em",
                      margin: "0 -0.06em",
                      borderRadius: 6,
                    }
                  : undefined
              }
            >
              {visible}
            </span>
            {isCursorSeg ? cursor : null}
            <span style={{ opacity: 0 }}>{hidden}</span>
          </span>
        );
      })}
    </div>
  );
};

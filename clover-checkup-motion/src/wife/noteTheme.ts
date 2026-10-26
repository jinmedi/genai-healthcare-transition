import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// 노트 톤 폰트. 대사는 프리텐다드(가변 굵기), 손글씨는 나눔손글씨 펜. 둘 다 OFL, public/fonts 에 번들.
export const bodyFont = "Pretendard";
export const handFont = "Nanum Pen Script";

export const noteFontsLoaded = Promise.all([
  loadFont({ family: bodyFont, url: staticFile("fonts/Pretendard.woff2"), weight: "100 900", display: "block" }),
  loadFont({ family: handFont, url: staticFile("fonts/NanumPenScript.woff2"), weight: "400", display: "block" }),
]);

// 따뜻한 종이 노트 팔레트
export const note = {
  cream: "#FBF7EE",
  creamDark: "#F1EADB",
  ink: "#2A2420",
  inkSoft: "#6B625A",
  clover: "#3FA66B",
  cloverDark: "#2E7F51",
  marker: "#FFE76B",
  coral: "#FF7A59",
  sky: "#8CC9E8",
  blush: "#F7B2A8",
  rule: "rgba(42,36,32,.08)",
} as const;

import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// 한글 본문/제목 폰트. public/fonts/ 에 번들된 Noto Sans KR(가변 굵기, 한글+라틴 서브셋)을 사용한다.
// 네트워크 없이 렌더되고, 렌더 시 폰트 로딩이 끝날 때까지 자동으로 대기한다.
export const font = "Noto Sans KR";

export const fontLoaded = loadFont({
  family: font,
  url: staticFile("fonts/NotoSansKR.woff2"),
  weight: "100 900",
  display: "block",
});

// 선명한 그라데이션 팔레트 (포스터 색상과 무관한 새 톤)
export const colors = {
  violet900: "#1a0b3d",
  indigo: "#2d1b8a",
  purple: "#7c3aed",
  magenta: "#ff3df2",
  coral: "#ff5c7a",
  orange: "#ff8a3d",
  yellow: "#ffd23f",
  lime: "#c8ff3d",
  cyan: "#39e5ff",
  teal: "#0fd9a8",
  navy: "#061a2e",
  white: "#ffffff",
  ink: "#120a2a",
} as const;

export const gradients = {
  aurora: "linear-gradient(160deg, #1a0b3d 0%, #4c1d95 45%, #0e7490 100%)",
  sunset: "linear-gradient(160deg, #ff2d7a 0%, #ff6a3d 55%, #ffb13d 100%)",
  ocean: "linear-gradient(170deg, #061a2e 0%, #0b3d5c 55%, #0fd9a8 135%)",
  grape: "linear-gradient(160deg, #2b0a5e 0%, #6d28d9 50%, #db2777 100%)",
  electric: "linear-gradient(180deg, #020b1f 0%, #0b2a6b 60%, #0891b2 135%)",
  candy: "linear-gradient(160deg, #4c1d95 0%, #db2777 50%, #f97316 100%)",
  limeCyan: "linear-gradient(90deg, #c8ff3d, #39e5ff)",
  pinkYellow: "linear-gradient(90deg, #ff3df2, #ffd23f)",
  cyanMagenta: "linear-gradient(90deg, #39e5ff, #ff3df2)",
} as const;

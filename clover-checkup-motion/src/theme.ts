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

// 크로바(클로버) 브랜드 컬러
export const colors = {
  green900: "#0f4d2e",
  green700: "#1f7a4d",
  green500: "#2ea56b",
  green300: "#8fd9b3",
  mint100: "#e8f7ef",
  cream: "#fbfaf5",
  ink: "#10231a",
  inkSoft: "#4d6358",
  accent: "#f5b942",
  white: "#ffffff",
  navy900: "#0b1530",
  navy700: "#15264d",
  sky: "#7cc4ff",
} as const;

export const greenGradient =
  "linear-gradient(135deg, #0f4d2e 0%, #1f7a4d 60%, #2ea56b 100%)";
export const navyGradient =
  "linear-gradient(135deg, #0b1530 0%, #15264d 55%, #1c3a6b 100%)";
export const creamGradient =
  "radial-gradient(1200px 800px at 20% 20%, #e8f7ef 0%, #fbfaf5 60%)";

import { useVideoConfig } from "remotion";

/**
 * 컴포지션 비율에 따라 레이아웃을 고른다.
 * - square: 1000×1000 (인스타 피드)
 * - wide:   1000×562 (16:9, 대기실 TV·유튜브)
 */
export const useFormat = () => {
  const { width, height, fps } = useVideoConfig();
  const wide = height / width < 0.75;
  return { wide, width, height, fps };
};

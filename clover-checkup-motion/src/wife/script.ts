// 캐주얼 버전 대본 — 기획안(크로바내과 캐주얼 홍보영상 기획안)에서 확정된 A안 최종본.
// 문장을 고치고 싶으면 이 파일만 수정하면 됩니다. hl: true 인 조각은 형광펜 강조.

export type Segment = { t: string; hl?: boolean };
export type Line = Segment[];

export const clinic = {
  name: "크로바내과",
  doctor: "정지현 대표원장",
  career: "건양대병원 근무",
  city: "세종",
  signature: "— 크로바내과",
  speaker: "남편 씀",
};

// 씬별 대사. 각 씬은 메인 자막 line 과 선택적 손글씨 note 를 가진다.
export const scenes = {
  s1: {
    line: [{ t: "제 아내 자랑 " }, { t: "좀", hl: true }, { t: " 할게요." }] as Line,
    tag: "남편의 아내 자랑",
  },
  s2: {
    line: [{ t: "아내가 " }, { t: "손이 참 좋아요", hl: true }, { t: "." }] as Line,
    photo: "photos/wife-hand.jpg",
    photoCaption: "아내 손",
  },
  s3: {
    line: [
      { t: "건양대병원에서 근무할 때도," },
      { t: "\n내시경은 다들 아내한테 받겠다고" },
      { t: "\n" },
      { t: "동료들이 줄을 섰어요", hl: true },
      { t: "." },
    ] as Line,
    sign: "내시경실",
  },
  s4: {
    line: [
      { t: "진료도 정말 " },
      { t: "꼼꼼히", hl: true },
      { t: " 해요." },
      { t: "\n결과지 한 줄도 그냥 넘어가는 법이 없어요." },
    ] as Line,
  },
  s5: {
    line: [
      { t: "그래서 저도 내시경이랑 초음파는" },
      { t: "\n" },
      { t: "아내한테 받습니다", hl: true },
      { t: "." },
    ] as Line,
    note: "(사실 좀\n무서워요.)",
    photo: "photos/husband.jpg",
    photoCaption: "남편 (본인)",
  },
  s6: {
    line: [{ t: "그런 아내가 " }, { t: "세종", hl: true }, { t: "에서\n크로바내과를 합니다." }] as Line,
    chips: ["위·대장 수면내시경", "초음파", "혈액검사"],
    line2: "하루에 끝내요.",
  },
  s7: {
    line: [{ t: "장비도 " }, { t: "대학병원급", hl: true }, { t: "으로\n들여놓았어요." }] as Line,
    note: "(CO₂ 내시경이라 확실히 덜 아파요.)",
    bubble: "덜 아파요",
  },
  s8: {
    line: [
      { t: "오늘 편한 날짜로" },
      { t: "\n" },
      { t: "미리 예약부터", hl: true },
      { t: " 하고 가세요." },
    ] as Line,
    note: "(좋은 날짜는 금방 예약이 마감되거든요. ^^)",
    desk: "예약은 데스크로 문의해주세요",
  },
  s9: {
    line: [{ t: "아내 자랑이 " }, { t: "좀", hl: true }, { t: " 심했나요?" }] as Line,
    line2: [{ t: "진짜인지, 아닌지,\n" }, { t: "직접 확인해 보세요", hl: true }, { t: "." }] as Line,
    photo: "photos/husband.jpg",
    photoCaption: "자랑이 심했나요?",
  },
};

/** 씬 길이(초). 합계 42초. 전환(0.4초 페이드)은 마지막 씬을 제외하고 각 씬 뒤에 겹친다. */
export const SCENE_SECONDS = [3.5, 4.5, 6, 5, 5, 5, 4, 5, 4] as const;
export const FADE_SECONDS = 0.4;

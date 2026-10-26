// 비급여 영양수액 안내 영상 — 콘텐츠. 출처: 크로바내과의원 비급여 영양수액 가격표.
// 원내 상영용. 가격·항목은 가격표 그대로, 문구는 가볍게 과장을 허용한다.

export type IVItem = {
  name: string;
  /** 짧은 효능 태그 (가격표의 괄호 문구) */
  tag?: string;
  price: number;
  color: string;
  /** 어두운 액체는 글자를 흰색으로 */
  textColor?: string;
};

export const clinic = {
  name: "크로바내과의원",
  nameShort: "크로바내과",
  title: "영양수액",
  footer: "크로바내과의원 · 비급여 항목 · 원장 진료 후 처방",
};

// 씬 1 인트로
export const intro = {
  kicker: "NUTRIENT IV THERAPY",
  title: "영양수액",
  sub: "지친 하루, 수액으로 충전",
};

// 씬 2 훅: 이럴 때 (가볍게 과장 허용)
export const hooks = [
  { icon: "🍻", text: "회식 다음 날, 머리가 띵할 때" },
  { icon: "🤧", text: "감기 기운이 스멀스멀 올라올 때" },
  { icon: "🪫", text: "몸이 천근만근, 배터리 1%일 때" },
];
export const hookLine = ["그럴 땐", "수액 어때요?"];

// 씬 3 기본 비타민 수액 3종
export const basic: IVItem[] = [
  { name: "스피드 수액", tag: "빠른 수분 보충", price: 30000, color: "#39e5ff" },
  { name: "면역 수액", tag: "고용량 비타민", price: 40000, color: "#c8ff3d" },
  { name: "말초신경대사 수액", tag: "신경 영양", price: 50000, color: "#a78bfa" },
];

// 씬 4 컬러 수액 3종 (가격표의 색 이름 그대로. 오렌지·노랑은 제외)
export const colors5: IVItem[] = [
  { name: "그린", tag: "숙취 · 피부", price: 40000, color: "#4ade80" },
  { name: "레드", tag: "피로회복", price: 60000, color: "#f43f5e" },
  { name: "다크블루", tag: "감기몸살", price: 60000, color: "#2563eb", textColor: "#ffffff" },
];

// 씬 5 아미노산 · 리피드
export const amino: IVItem[] = [
  { name: "전신대사 근골격계", tag: "아미노산", price: 70000, color: "#ff5c7a" },
  { name: "전신대사 고급영양 1", tag: "아미노산", price: 80000, color: "#ff3df2" },
  { name: "전신대사 고급영양 2", tag: "아미노산", price: 100000, color: "#c084fc" },
  { name: "고열량 고급영양수액", tag: "리피드", price: 100000, color: "#fde68a" },
];

// 씬 6 안내
export const notice = {
  main: "모든 수액은 원장님 진료 후 처방",
  sub: "몸 상태에 맞게 조합해 드려요",
  cta: "데스크에 문의하세요",
};

export const won = (n: number) => n.toLocaleString("ko-KR") + "원";

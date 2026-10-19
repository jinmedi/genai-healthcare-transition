// 크로바내과 검진 홍보 모션그래픽 — 콘텐츠 설정
// 애니메이션 코드를 건드리지 않고 이 파일만 수정하면 문구/항목/연락처가 바뀝니다.
// 출처: 크로바내과 검진프로그램 안내 포스터, 내시경·CO2 주입기 안내문.

export const clinic = {
  name: "크로바내과",
  tagline: "건강검진센터",
  phone: "044-863-7975",
  phoneLabel: "예약문의",
  closing: "풍부한 치료경험과 친절로\n정성을 다하겠습니다",
  closingSub: "개별 맞춤검사 상담이 가능합니다",
};

// 씬 2: 핵심 메시지 (한 줄씩 순서대로 등장)
export const hook = ["증상이 없을 때가", "검진의 적기입니다"];

// 씬 3: 종합검진 프로그램 (포스터의 세잎 / 네잎 / 다섯잎 검진)
export type Program = {
  leaves: number;
  name: string;
  items: string[];
  note?: string;
  featured?: boolean;
};

export const programs: Program[] = [
  {
    leaves: 3,
    name: "세잎검진",
    items: [
      "기본신체계측",
      "혈액종합검사",
      "흉부방사선검사",
      "심전도검사",
      "위 수면내시경",
      "초음파검사",
    ],
    note: "초음파 택1 복부 · 택2 갑상선, 경동맥",
  },
  {
    leaves: 4,
    name: "네잎검진",
    featured: true,
    items: [
      "기본신체계측",
      "혈액종합검사 (암표지자 2종)",
      "흉부방사선검사",
      "심전도검사",
      "위 + 대장 수면내시경",
      "초음파검사",
    ],
    note: "초음파 택1 복부 · 택2 갑상선, 경동맥",
  },
  {
    leaves: 5,
    name: "다섯잎검진",
    items: [
      "기본신체계측",
      "혈액종합검사 (암표지자 2종)",
      "흉부방사선검사",
      "심전도검사",
      "골밀도검사",
      "위 + 대장 수면내시경",
      "초음파검사",
    ],
    note: "남성 3종 복부·갑상선·경동맥 / 여성 4종 복부·유방·갑상선·경동맥",
  },
];

// 씬 4: 맞춤형검사 (색상 테마별)
export type CustomTest = {
  color: string;
  textColor: string;
  tag: string;
  organ: string;
  detail: string;
};

export const customTests: CustomTest[] = [
  { color: "#f06292", textColor: "#ffffff", tag: "핑크리본", organ: "유방", detail: "유방초음파 · 유방촬영술" },
  { color: "#ffd600", textColor: "#3d3000", tag: "노랑나비", organ: "갑상선", detail: "갑상선초음파 · 호르몬검사 2종" },
  { color: "#e53935", textColor: "#ffffff", tag: "빨강", organ: "간", detail: "복부초음파 · 간기능 혈액검사 3종" },
  { color: "#f4f4f4", textColor: "#333333", tag: "하얀", organ: "뼈", detail: "골밀도검사 · 비타민D 혈액검사" },
  { color: "#fb8c00", textColor: "#ffffff", tag: "주황", organ: "치매", detail: "치매 혈액검사 (알츠온)" },
];

export const bloodPanel = "혈액종합검사 — 60여 종 혈액검사 및 소변검사";

// 씬 5: 장비 (대학병원급 내시경, CO2 주입기)
export const equipment = {
  title: "대학병원급 위 · 대장 내시경 도입",
  subtitle: "최고 사양 내시경 장비로 정확한 검진이 가능합니다",
  points: [
    {
      icon: "🔍",
      title: "Full HD 최첨단 내시경",
      desc: "고화질 영상으로 작은 병변까지 선명하게",
    },
    {
      icon: "🎯",
      title: "특수관찰기능 BLI · LCI",
      desc: "찾기 어려운 조기 위암과 대장 용종의 발견율을 높이는 특수광 기술",
    },
    {
      icon: "💨",
      title: "최신형 CO₂ 주입기",
      desc: "공기 대신 CO₂ 사용, 빠르게 흡수·배출되어 통증이 적고 편안한 검사",
    },
  ],
};

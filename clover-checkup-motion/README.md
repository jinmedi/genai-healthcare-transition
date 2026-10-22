# 크로바내과 건강검진 홍보 모션그래픽

[Remotion](https://www.remotion.dev/)으로 만든 크로바내과 건강검진센터 홍보 영상입니다.
영상의 글자·움직임·타이밍이 전부 코드라서, 문구를 고치고 다시 렌더하면 새 영상이 나옵니다.

- 해상도: 1000 × 1000 (1:1, 인스타그램 피드·카카오 채널용)과 1000 × 562 (16:9, 대기실 TV·유튜브용), 30fps, 37초
- 두 비율은 같은 씬 코드를 공유하고, `src/format.ts` 의 `useFormat()` 으로 비율을 읽어 레이아웃만 바꿉니다 (`CheckupPromo` / `CheckupPromoWide`)
- 이전 버전: 1920×1080 가로, 1080×1920 세로 레이아웃은 git 이력에 남아 있습니다
- 폰트: Noto Sans KR (프로젝트에 번들, 네트워크 없이 렌더)
- 색상: 보라·코랄·시안·라임 계열의 선명한 그라데이션 팔레트 (`src/theme.ts`)

## 장면 구성

| # | 장면 | 길이 | 배경 | 내용 (출처) |
|---|------|------|------|-------------|
| 1 | 인트로 | 4.5s | 오로라 (보라→청록) | 네온 클로버 로고 + 파동 링 + 시머 타이틀 |
| 2 | 핵심 메시지 | 4.5s | 선셋 (핑크→오렌지) | "증상이 없을 때가 검진의 적기입니다" |
| 3 | 종합검진 프로그램 | 10s | 오션 (남색→청록) | 세잎 · 네잎(BEST) · 다섯잎검진 글라스 카드 (검진프로그램 포스터) |
| 4 | 맞춤형 검사 | 7s | 그레이프 (보라→핑크) | 유방 · 갑상선 · 간 · 뼈 · 치매 네온 구슬 + 혈액종합검사 60여 종 |
| 5 | 내시경 장비 | 8s | 일렉트릭 (남색→시안) | 소나 파동 · 스캔 라인 · BLI·LCI · CO₂ 주입기 (장비 안내문) |
| 6 | 예약 안내 | 6.5s | 캔디 (보라→오렌지) | 컨페티 + 예약문의 044-863-7975 |

장면 전환: 슬라이드 → 와이프 → 슬라이드 → 클록 와이프 → 플립 → 페이드아웃 (각 0.7초).

## 시각 효과 (`src/effects/`)

| 컴포넌트 | 효과 |
|----------|------|
| `Background` | 그라데이션 + 노이즈로 떠다니는 컬러 블롭 (screen 블렌딩) |
| `Particles` | 위로 떠오르며 반짝이는 입자 |
| `ShimmerText` | 그라데이션 글자 위로 빛줄기가 지나가는 타이틀 |
| `GlowRings` | 중심에서 퍼져 나가는 네온 파동 링 |
| `GlassCard` | 반투명 유리 카드, 선택적 네온 그라데이션 테두리 |
| `Confetti` | 흩날리며 떨어지는 색종이 |

모든 효과는 프레임 번호와 결정적 난수(`random(seed)`)로만 움직여 매 렌더 결과가 동일합니다.

## 시작하기

```bash
npm install
npm run dev        # Remotion Studio 미리보기 (http://localhost:3000)
```

Studio에서 장면별 컴포지션(`Scenes` 폴더)을 따로 열어 다듬을 수 있습니다.

## 문구 수정

애니메이션 코드를 건드리지 않고 **`src/content.ts`** 만 고치면 됩니다.

- `clinic` — 병원명, 전화번호, 마무리 문구
- `hook` — 핵심 메시지 두 줄
- `programs` — 세잎/네잎/다섯잎검진 항목과 비고
- `customTests` — 맞춤형 검사 5종 (색상·부위·세부항목)
- `equipment` — 내시경 장비 포인트 3개

색상·그라데이션은 `src/theme.ts`, 장면 길이와 전환은 `src/CheckupVideo.tsx` 에 있습니다.

## MP4 렌더

```bash
npm run render     # → out/clover-checkup-promo-1x1.mp4
npm run stills     # 장면별 스틸 → out/frames/element-XXXX.png
```

### Chromium이 이미 설치된 환경 (클라우드 세션 등)

Remotion이 Chrome Headless Shell을 내려받지 못하는 환경에서는 설치된 바이너리를 지정합니다.

```bash
REMOTION_BROWSER_EXECUTABLE=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell npm run render
```

## 구조

```
src/
  index.ts            Remotion 진입점
  Root.tsx            컴포지션 등록 (전체 영상 + 장면별)
  CheckupVideo.tsx    장면 순서·길이·전환
  content.ts          문구·항목·연락처 (여기만 고치면 됨)
  theme.ts            색상·그라데이션·폰트
  anim.ts             공통 등장 애니메이션 (fadeUp, popIn, slideInX)
  components/Clover.tsx   CSS 네온 클로버 로고, 잎 개수 배지
  effects/            Background · Particles · ShimmerText · GlowRings · GlassCard · Confetti
  scenes/             Intro · Hook · Programs · CustomTests · Equipment · Outro
public/fonts/         Noto Sans KR (OFL, 한글+라틴 서브셋 woff2)
.agents/skills/       Remotion 공식 Agent Skills (npx remotion skills update 로 갱신)
```

## 캐주얼 버전: 남편의 아내 자랑 (`WifePromo`)

같은 저장소 안의 두 번째 영상입니다. 남편이 1인칭으로 아내(정지현 대표원장)를 자랑하는 고백 자막형이고, 원내 대기실 상영용입니다.
기획안: https://claude.ai/code/artifact/497645ee-9e48-497f-acdb-26f5c3ea431c

- 1000 × 1000 과 1000 × 562 (`WifePromo` / `WifePromoWide`), 30fps, 42초, 9개 씬, 0.4초 페이드 전환
- 노트 톤: 크림색 종이 질감, 타자기 자막(프리텐다드), 형광펜 강조, 손글씨 메모(나눔손글씨 펜), 손그림 라인 일러스트
- 사진 3곳(씬 2 아내 손, 씬 5·9 남편)은 `public/photos/` 의 파일을 폴라로이드 프레임으로 표시. 파일만 바꾸면 교체됨 (경로는 `src/wife/script.ts` 의 `photo`)
- 대본은 `src/wife/script.ts` 한 곳에서 수정. `hl: true` 조각이 형광펜 강조
- 구조: `src/wife/` — `script.ts` 대본 · `noteTheme.ts` 팔레트·폰트 · `components/` Paper·Caption·Handwriting·Polaroid·Doodles · `scenes.tsx` 씬 9개 · `WifePromo.tsx` 조립

```bash
npm run render:wife   # → out/clover-wife-promo-1x1.mp4
npm run stills:wife   # 씬별 스틸 → out/wife/
npm run concat        # 두 영상 합본 → out/clover-promo-combined-1x1.mp4 (79초, 재인코딩 없음)

# 16:9 (1000×562) 버전
npm run render:wide && npm run render:wife:wide && npm run concat:wide   # → out/*-16x9.mp4

# 1000×1056 버전 (정사각 레이아웃을 세로 중앙에 배치)
npm run render:1056 && npm run render:wife:1056 && npm run concat:1056   # → out/*-1000x1056.mp4
```

폰트 추가: Pretendard (OFL, `public/fonts/Pretendard-OFL.txt`), Nanum Pen Script (OFL, `public/fonts/NanumPenScript-OFL.txt`). 둘 다 한글+라틴 서브셋 woff2.

## 라이선스 안내

- Remotion은 개인 및 **3인 이하 회사**는 무료, 4인 이상 회사는 유료 라이선스가 필요합니다.
  병원 규모에 따라 [remotion.dev/license](https://www.remotion.dev/license) 를 확인하세요.
- Noto Sans KR 은 SIL Open Font License 1.1 (`public/fonts/OFL.txt`).

## 다음 단계 (아이디어)

- 배경음악·효과음·내레이션 추가 (`@remotion/media`)
- 장비 사진(내시경·CO₂ 주입기) 이미지 삽입 (`public/` + `<CanvasImage>`)
- 16:9 가로(대기실 TV), 9:16 세로(릴스) 버전을 같은 소스에서 레이아웃 분기로 함께 유지

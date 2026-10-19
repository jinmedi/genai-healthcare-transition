# 크로바내과 건강검진 홍보 모션그래픽

[Remotion](https://www.remotion.dev/)으로 만든 크로바내과 건강검진센터 홍보 영상입니다.
영상의 글자·움직임·타이밍이 전부 코드라서, 문구를 고치고 다시 렌더하면 새 영상이 나옵니다.

- 해상도: 1920 × 1080 (16:9), 30fps, 약 36초
- 폰트: Noto Sans KR (프로젝트에 번들, 네트워크 없이 렌더)

## 장면 구성

| # | 장면 | 길이 | 내용 (출처) |
|---|------|------|-------------|
| 1 | 인트로 | 4s | 클로버 로고 + 크로바내과 건강검진센터 |
| 2 | 핵심 메시지 | 4s | "증상이 없을 때가 검진의 적기입니다" |
| 3 | 종합검진 프로그램 | 10s | 세잎 · 네잎 · 다섯잎검진 항목 (검진프로그램 포스터) |
| 4 | 맞춤형 검사 | 7s | 유방 · 갑상선 · 간 · 뼈 · 치매 + 혈액종합검사 60여 종 (포스터) |
| 5 | 내시경 장비 | 8s | 대학병원급 내시경, BLI·LCI 특수광, CO₂ 주입기 (장비 안내문) |
| 6 | 예약 안내 | 6s | 예약문의 044-863-7975 |

장면 사이는 0.5초 페이드로 이어집니다.

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

색상·폰트는 `src/theme.ts`, 장면 길이는 `src/CheckupVideo.tsx` 의 `SCENE_SECONDS` 에 있습니다.

## MP4 렌더

```bash
npm run render     # → out/clover-checkup-promo.mp4
```

장면별 스틸 확인:

```bash
npm run stills     # → out/frames/element-XXXX.png
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
  theme.ts            색상·폰트
  anim.ts             공통 등장 애니메이션 (fadeUp, popIn, slideInX)
  components/Clover.tsx   CSS 클로버 로고, 잎 개수 배지
  scenes/             Intro · Hook · Programs · CustomTests · Equipment · Outro
public/fonts/         Noto Sans KR (OFL, 한글+라틴 서브셋 woff2)
.agents/skills/       Remotion 공식 Agent Skills (npx remotion skills update 로 갱신)
```

## 라이선스 안내

- Remotion은 개인 및 **3인 이하 회사**는 무료, 4인 이상 회사는 유료 라이선스가 필요합니다.
  병원 규모에 따라 [remotion.dev/license](https://www.remotion.dev/license) 를 확인하세요.
- Noto Sans KR 은 SIL Open Font License 1.1 (`public/fonts/OFL.txt`).

## 다음 단계 (아이디어)

- 9:16 세로(인스타그램·키오스크) 버전 컴포지션 추가
- 배경음악·내레이션 추가 (`@remotion/media`)
- 장비 사진(내시경·CO₂ 주입기) 이미지 삽입 (`public/` + `<CanvasImage>`)

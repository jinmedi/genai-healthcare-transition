import React from "react";
import { Composition, Folder } from "remotion";
import { CheckupVideo, SCENE_SECONDS, totalDurationInFrames } from "./CheckupVideo";
import { Intro } from "./scenes/Intro";
import { Hook } from "./scenes/Hook";
import { Programs } from "./scenes/Programs";
import { CustomTests } from "./scenes/CustomTests";
import { Equipment } from "./scenes/Equipment";
import { Outro } from "./scenes/Outro";
import { WifePromo, wifeDurationInFrames } from "./wife/WifePromo";
import { W1, W2, W3, W4, W5, W6, W7, W8, W9 } from "./wife/scenes";
import { SCENE_SECONDS as WIFE_SECONDS } from "./wife/script";

const FPS = 30;
const WIDTH = 1000;
const HEIGHT = 1000;
const WIDE_WIDTH = 1000;
const WIDE_HEIGHT = 562;
const TALL_WIDTH = 1000;
const TALL_HEIGHT = 1056;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CheckupPromo"
        component={CheckupVideo}
        durationInFrames={totalDurationInFrames(FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* 캐주얼 버전: 남편의 아내 자랑 (노트 톤, 타자기 자막) */}
      <Composition
        id="WifePromo"
        component={WifePromo}
        durationInFrames={wifeDurationInFrames(FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Folder name="WifeScenes">
        {[W1, W2, W3, W4, W5, W6, W7, W8, W9].map((Scene, i) => (
          <Composition
            key={`W${i + 1}`}
            id={`W${i + 1}`}
            component={Scene}
            durationInFrames={Math.round(WIFE_SECONDS[i] * FPS)}
            fps={FPS}
            width={WIDTH}
            height={HEIGHT}
          />
        ))}
      </Folder>

      {/* 가로(16:9, 1000×562) 버전: 같은 씬 코드가 비율을 읽어 가로 레이아웃으로 그린다 */}
      <Composition
        id="CheckupPromoWide"
        component={CheckupVideo}
        durationInFrames={totalDurationInFrames(FPS)}
        fps={FPS}
        width={WIDE_WIDTH}
        height={WIDE_HEIGHT}
      />
      <Composition
        id="WifePromoWide"
        component={WifePromo}
        durationInFrames={wifeDurationInFrames(FPS)}
        fps={FPS}
        width={WIDE_WIDTH}
        height={WIDE_HEIGHT}
      />

      {/* 1000×1056 버전: 정사각 레이아웃을 세로 중앙에 둔다 */}
      <Composition
        id="CheckupPromo1056"
        component={CheckupVideo}
        durationInFrames={totalDurationInFrames(FPS)}
        fps={FPS}
        width={TALL_WIDTH}
        height={TALL_HEIGHT}
      />
      <Composition
        id="WifePromo1056"
        component={WifePromo}
        durationInFrames={wifeDurationInFrames(FPS)}
        fps={FPS}
        width={TALL_WIDTH}
        height={TALL_HEIGHT}
      />

      {/* 홈페이지 게시용(web) 변형: 비교·과장·효과 보장 표현을 뺀 문구. 세 비율 모두 제공 */}
      <Folder name="Web">
        <Composition id="CheckupPromoWeb" component={CheckupVideo} durationInFrames={totalDurationInFrames(FPS)} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={{ variant: "web" }} />
        <Composition id="WifePromoWeb" component={WifePromo} durationInFrames={wifeDurationInFrames(FPS)} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={{ variant: "web" }} />
        <Composition id="CheckupPromoWebWide" component={CheckupVideo} durationInFrames={totalDurationInFrames(FPS)} fps={FPS} width={WIDE_WIDTH} height={WIDE_HEIGHT} defaultProps={{ variant: "web" }} />
        <Composition id="WifePromoWebWide" component={WifePromo} durationInFrames={wifeDurationInFrames(FPS)} fps={FPS} width={WIDE_WIDTH} height={WIDE_HEIGHT} defaultProps={{ variant: "web" }} />
        <Composition id="CheckupPromoWeb1056" component={CheckupVideo} durationInFrames={totalDurationInFrames(FPS)} fps={FPS} width={TALL_WIDTH} height={TALL_HEIGHT} defaultProps={{ variant: "web" }} />
        <Composition id="WifePromoWeb1056" component={WifePromo} durationInFrames={wifeDurationInFrames(FPS)} fps={FPS} width={TALL_WIDTH} height={TALL_HEIGHT} defaultProps={{ variant: "web" }} />
      </Folder>

      {/* 씬별로 따로 열어 다듬을 수 있는 연결 컴포지션 */}
      <Folder name="Scenes">
        <Composition id="Intro" component={Intro} durationInFrames={SCENE_SECONDS.intro * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Hook" component={Hook} durationInFrames={SCENE_SECONDS.hook * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Programs" component={Programs} durationInFrames={SCENE_SECONDS.programs * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="CustomTests" component={CustomTests} durationInFrames={SCENE_SECONDS.customTests * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Equipment" component={Equipment} durationInFrames={SCENE_SECONDS.equipment * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Outro" component={Outro} durationInFrames={SCENE_SECONDS.outro * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>
    </>
  );
};

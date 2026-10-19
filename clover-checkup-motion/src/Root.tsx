import React from "react";
import { Composition, Folder } from "remotion";
import { CheckupVideo, SCENE_SECONDS, totalDurationInFrames } from "./CheckupVideo";
import { Intro } from "./scenes/Intro";
import { Hook } from "./scenes/Hook";
import { Programs } from "./scenes/Programs";
import { CustomTests } from "./scenes/CustomTests";
import { Equipment } from "./scenes/Equipment";
import { Outro } from "./scenes/Outro";

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

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

import "./index.css";
import { Composition, Folder } from "remotion";
import { PerceptionPromo } from "./compositions/PerceptionPromo";
import { TerminalDemo } from "./compositions/TerminalDemo";
import { PremiumDemo } from "./compositions/PremiumDemo";
import { FeatureShowcase } from "./compositions/FeatureShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Perception">
        <Composition
          id="PerceptionPromo"
          component={PerceptionPromo}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PerceptionPromoSquare"
          component={PerceptionPromo}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1080}
        />
      </Folder>
      <Folder name="Demos">
        <Composition
          id="TerminalDemo"
          component={TerminalDemo}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={700}
        />
        <Composition
          id="PremiumDemo"
          component={PremiumDemo}
          durationInFrames={405}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Feature-Videos">
        <Composition
          id="FeatureShowcase"
          component={FeatureShowcase}
          durationInFrames={830}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="FeatureShowcaseSquare"
          component={FeatureShowcase}
          durationInFrames={830}
          fps={30}
          width={1080}
          height={1080}
        />
      </Folder>
    </>
  );
};

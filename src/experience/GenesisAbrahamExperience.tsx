import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { abrahamLeavesScene } from "../content/genesis/abraham/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";

export const GenesisAbrahamExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  useEffect(() => {
    setCurrentScene(
      abrahamLeavesScene.id,
      abrahamLeavesScene.pov,
      abrahamLeavesScene.focus,
      abrahamLeavesScene.emotion
    );
    AudioManager.playTrack("abraham", "desert-night");
    markSceneCompleted(abrahamLeavesScene.id);
  }, [setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    TransitionEngine.execute(
      abrahamLeavesScene.transition.type,
      abrahamLeavesScene.transition.to,
      {},
      navigate
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d10] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas environmentId={abrahamLeavesScene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#c99a5e]/80 font-medium">
            Genesis — The Journey of Abraham
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            Paglalakad Nang Walang Mapa
          </h1>
        </header>

        <SceneRenderer
          scene={abrahamLeavesScene}
          onAdvanceToNextScene={handleAdvance}
        />
      </div>
    </div>
  );
};

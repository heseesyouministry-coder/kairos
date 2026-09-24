import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { plaguesScene } from "../content/exodus/plagues/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";

export const ExodusPlaguesExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  useEffect(() => {
    setCurrentScene(
      plaguesScene.id,
      plaguesScene.pov,
      plaguesScene.focus,
      plaguesScene.emotion
    );
    AudioManager.playTrack("plagues", "nile-locusts-dread");
    markSceneCompleted(plaguesScene.id);
  }, [setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    TransitionEngine.execute(
      plaguesScene.transition.type,
      plaguesScene.transition.to,
      {},
      navigate
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d10] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas environmentId={plaguesScene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#8c362e]/90 font-medium">
            Exodus — Egypt
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            Ang Dilim at ang Presyo ng Kalayaan
          </h1>
        </header>

        <SceneRenderer
          scene={plaguesScene}
          onAdvanceToNextScene={handleAdvance}
        />
      </div>
    </div>
  );
};

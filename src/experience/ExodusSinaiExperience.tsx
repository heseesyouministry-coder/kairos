import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sinaiScene } from "../content/exodus/sinai/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";

export const ExodusSinaiExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  useEffect(() => {
    setCurrentScene(
      sinaiScene.id,
      sinaiScene.pov,
      sinaiScene.focus,
      sinaiScene.emotion
    );
    AudioManager.playTrack("sinai", "sinai-trumpet-thunder");
    markSceneCompleted(sinaiScene.id);
  }, [setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    TransitionEngine.execute(
      sinaiScene.transition.type,
      sinaiScene.transition.to,
      {},
      navigate
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d10] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas environmentId={sinaiScene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#d9532f]/90 font-medium">
            Exodus — Mount Sinai
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            Ang Usok ng Bundok at ang Binasag na Bato
          </h1>
        </header>

        <SceneRenderer
          scene={sinaiScene}
          onAdvanceToNextScene={handleAdvance}
        />
      </div>
    </div>
  );
};

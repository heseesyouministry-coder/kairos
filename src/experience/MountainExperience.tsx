import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mountainScene } from "../content/mountain/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";

export const MountainExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  useEffect(() => {
    setCurrentScene(
      mountainScene.id,
      mountainScene.pov,
      mountainScene.focus,
      mountainScene.emotion
    );
    AudioManager.playTrack("mountain", "mountain-wind");
    markSceneCompleted(mountainScene.id);
  }, [setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    TransitionEngine.execute(
      mountainScene.transition.type,
      mountainScene.transition.to,
      {
        onTransitionStart: () => {
          AudioManager.fadeIn("creation", 3.0);
        },
      },
      navigate
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] pt-20 pb-28 overflow-x-hidden">
      {/* Three.js / 2D Mountain atmosphere */}
      <AtmosphericCanvas environmentId={mountainScene.environment.id} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-10 text-center">
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#c99a5e]">
          Act I · The High Limestone
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-medium text-white text-balance">
          The Mountain Slope
        </h1>
        <p className="mt-2 text-xs font-serif italic text-stone-400">
          The boundary between reading and remembering begins to soften.
        </p>
      </div>

      <SceneRenderer scene={mountainScene} onAdvanceToNextScene={handleAdvance} />
    </div>
  );
};

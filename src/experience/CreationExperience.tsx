import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { creationScene } from "../content/genesis/creation/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";

export const CreationExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  useEffect(() => {
    setCurrentScene(
      creationScene.id,
      creationScene.pov,
      creationScene.focus,
      creationScene.emotion
    );
    AudioManager.playTrack("creation", "space-resonance");
    markSceneCompleted(creationScene.id);
  }, [setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    TransitionEngine.execute(
      creationScene.transition.type,
      creationScene.transition.to,
      {
        onTransitionStart: () => {
          // Smooth transition to Eden
        },
      },
      navigate
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] pt-20 pb-28 overflow-x-hidden">
      {/* Three.js Cosmic particle canvas + 2D Fallback */}
      <AtmosphericCanvas environmentId={creationScene.environment.id} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-10 text-center">
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#c99a5e]">
          Genesis · Part I
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-medium text-white text-balance">
          The Divided Light
        </h1>
        <p className="mt-2 text-xs font-serif italic text-stone-400">
          Scale beyond analysis. Darkness into incandescent order.
        </p>
      </div>

      <SceneRenderer scene={creationScene} onAdvanceToNextScene={handleAdvance} />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { edenScene } from "../content/genesis/eden/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";

export const EdenExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  // Lighting shift progress driven by GSAP & narrative block position (Acceptance Criteria #3)
  const [edenShiftProgress, setEdenShiftProgress] = useState<number>(0);

  useEffect(() => {
    setCurrentScene(
      edenScene.id,
      edenScene.pov,
      edenScene.focus,
      edenScene.emotion
    );
    markSceneCompleted(edenScene.id);
  }, [setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    // Hard cut into Cain and Abel per spec Section 8
    TransitionEngine.execute(
      edenScene.transition.type,
      edenScene.transition.to,
      {
        onTransitionStart: () => {
          AudioManager.playTrack("cain-abel", "field-dusk");
        },
      },
      navigate
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] pt-20 pb-28 overflow-x-hidden">
      {/* Three.js Eden Canopy with GSAP-driven light shift + 2D Fallback */}
      <AtmosphericCanvas
        environmentId={edenScene.environment.id}
        edenShiftProgress={edenShiftProgress}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-10 text-center">
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#c99a5e]">
          Genesis · Part II
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-medium text-white text-balance">
          The Orchard Choice
        </h1>
        <p className="mt-2 text-xs font-serif italic text-stone-400">
          The absence of shame, and the cold shift in the afternoon light.
        </p>

        {/* Narrative lighting shift indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
            Atmospheric Illumination:
          </span>
          <div className="w-32 h-1 rounded-full bg-[#1b1e28] overflow-hidden border border-[#2b2e3e]">
            <div
              className="h-full transition-all duration-700 bg-gradient-to-r from-[#c99a5e] to-[#78889e]"
              style={{ width: `${Math.round((1 - edenShiftProgress) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-stone-400">
            {edenShiftProgress > 0.5 ? "Bleached / Exposed" : "Golden Canopy"}
          </span>
        </div>
      </div>

      <SceneRenderer
        scene={edenScene}
        onAdvanceToNextScene={handleAdvance}
        onEdenShiftUpdate={setEdenShiftProgress}
      />
    </div>
  );
};

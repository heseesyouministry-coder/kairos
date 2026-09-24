import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { wildernessComplaintsScene } from "../content/exodus/wilderness/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { MemoryEngine, mosesOverwhelmMemory } from "../narrative/MemoryEngine/MemoryEngine";

export const ExodusWildernessExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const hasMemory = useProgressStore((s) => s.hasMemory);

  useEffect(() => {
    setCurrentScene(
      wildernessComplaintsScene.id,
      wildernessComplaintsScene.pov,
      wildernessComplaintsScene.focus,
      wildernessComplaintsScene.emotion
    );
    AudioManager.playTrack("wilderness", "desert-exhaustion-wind");
    markSceneCompleted(wildernessComplaintsScene.id);
  }, [setCurrentScene, markSceneCompleted]);

  // Form the permanent mosesOverwhelmMemory per Section 3
  useEffect(() => {
    if (!MemoryEngine.hasMemory(mosesOverwhelmMemory.id)) {
      MemoryEngine.recordMemory(mosesOverwhelmMemory);
    }
  }, []);

  const handleAdvance = () => {
    TransitionEngine.execute(
      wildernessComplaintsScene.transition.type,
      wildernessComplaintsScene.transition.to,
      {
        onTransitionStart: () => {
          AudioManager.duck(0.01, 1.0);
        },
      },
      navigate
    );
  };

  const isFormed = hasMemory(mosesOverwhelmMemory.id);

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d10] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas environmentId={wildernessComplaintsScene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#c99a5e]/80 font-medium">
            Exodus — The Wilderness of Paran
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            Ang Pagkapagod sa Ilang
          </h1>
          {isFormed && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#c99a5e]/10 border border-[#c99a5e]/30 text-[10px] uppercase font-sans tracking-widest text-[#c99a5e]">
              <span>Permanent Memory Inscribed: moses-overwhelm</span>
            </div>
          )}
        </header>

        <SceneRenderer
          scene={wildernessComplaintsScene}
          onAdvanceToNextScene={handleAdvance}
        />
      </div>
    </div>
  );
};

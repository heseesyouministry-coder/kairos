import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { josephThePit, josephCaravan } from "../content/genesis/joseph/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { MemoryEngine, josephSeparationMemory } from "../narrative/MemoryEngine/MemoryEngine";

export const GenesisJosephExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const hasMemory = useProgressStore((s) => s.hasMemory);

  const [activePart, setActivePart] = useState<"pit" | "caravan">("pit");
  const currentScene = activePart === "pit" ? josephThePit : josephCaravan;

  useEffect(() => {
    setCurrentScene(
      currentScene.id,
      currentScene.pov,
      currentScene.focus,
      currentScene.emotion
    );
    AudioManager.playTrack("joseph", activePart === "pit" ? "pit-wind" : "caravan-bells");
    markSceneCompleted(currentScene.id);
  }, [currentScene, activePart, setCurrentScene, markSceneCompleted]);

  // Form the permanent josephSeparationMemory per Section 3
  useEffect(() => {
    if (!MemoryEngine.hasMemory(josephSeparationMemory.id)) {
      MemoryEngine.recordMemory(josephSeparationMemory);
    }
  }, []);

  const handleAdvance = () => {
    if (activePart === "pit") {
      TransitionEngine.execute(
        "crossfade",
        "/experience/genesis/joseph",
        {
          onMidpoint: () => setActivePart("caravan"),
        },
        () => {}
      );
    } else {
      TransitionEngine.execute(
        josephCaravan.transition.type,
        josephCaravan.transition.to,
        {},
        navigate
      );
    }
  };

  const isFormed = hasMemory(josephSeparationMemory.id);

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d10] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas environmentId={currentScene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#c99a5e]/80 font-medium">
            Genesis — Joseph
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            {activePart === "pit" ? "Ang Malalim na Balon ng Dothan" : "Ang Kalansing ng Pilak"}
          </h1>
          {isFormed && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#c99a5e]/10 border border-[#c99a5e]/30 text-[10px] uppercase font-sans tracking-widest text-[#c99a5e]">
              <span>Permanent Memory Inscribed: joseph-separation</span>
            </div>
          )}
        </header>

        <SceneRenderer
          scene={currentScene}
          onAdvanceToNextScene={handleAdvance}
        />
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cainAndAbelOffering,
  cainAndAbelField,
} from "../content/genesis/cain-abel/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { MemoryEngine, cainBloodMemory } from "../narrative/MemoryEngine/MemoryEngine";

export const CainAbelExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const hasMemory = useProgressStore((s) => s.hasMemory);

  // Active sub-scene within Cain & Abel: offering (Part 1) -> field (Part 2)
  const [activeSubScene, setActiveSubScene] = useState<"offering" | "field">("offering");

  const currentScene = activeSubScene === "offering" ? cainAndAbelOffering : cainAndAbelField;

  useEffect(() => {
    setCurrentScene(
      currentScene.id,
      currentScene.pov,
      currentScene.focus,
      currentScene.emotion
    );
    AudioManager.playTrack("cain-abel", "field-dusk");
    markSceneCompleted(currentScene.id);
  }, [currentScene, setCurrentScene, markSceneCompleted]);

  // When field scene is loaded, crystalize the cainBloodMemory per Section 9 & Acceptance Criteria #7
  useEffect(() => {
    if (activeSubScene === "field") {
      if (!MemoryEngine.hasMemory(cainBloodMemory.id)) {
        MemoryEngine.recordMemory(cainBloodMemory);
      }
    }
  }, [activeSubScene]);

  const handleAdvance = () => {
    if (activeSubScene === "offering") {
      // Transition from offering to field (pov-shift)
      TransitionEngine.execute(
        "pov-shift",
        "/experience/genesis/cain-and-abel",
        {
          onMidpoint: () => {
            setActiveSubScene("field");
          },
        },
        () => {} // in-place subscene update
      );
    } else {
      // Transition from field to awakening (collapse)
      TransitionEngine.execute(
        cainAndAbelField.transition.type,
        cainAndAbelField.transition.to,
        {
          onTransitionStart: () => {
            // Audio ducks into total silence per spec
            AudioManager.duck(0.01, 1.2);
          },
        },
        navigate
      );
    }
  };

  const isMemoryFormed = hasMemory(cainBloodMemory.id);

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] pt-20 pb-28 overflow-x-hidden">
      {/* Sparse field dusk environment + 2D fallback */}
      <AtmosphericCanvas environmentId={currentScene.environment.id} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-10 text-center">
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#c99a5e]">
          Genesis · Chapter 4
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-medium text-white text-balance">
          {activeSubScene === "offering" ? "The Smoke of the Offering" : "The Field at Dusk"}
        </h1>
        <p className="mt-2 text-xs font-serif italic text-stone-400">
          {activeSubScene === "offering"
            ? "Third person attention narrows into direct immersion and interior dread."
            : "The witness powerless to revise history. The first grave."}
        </p>

        {isMemoryFormed && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1d28]/70 border border-[#2b2e40] text-[11px] font-serif italic text-stone-400">
            <span>A quiet grief settles into memory</span>
          </div>
        )}
      </div>

      <SceneRenderer
        key={currentScene.id}
        scene={currentScene}
        onAdvanceToNextScene={handleAdvance}
      />
    </div>
  );
};

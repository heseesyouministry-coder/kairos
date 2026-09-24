/**
 * KAIROS — Phase 5: Revelation Experience
 * Revelation Begins, Theo Tries to Understand, Final Vision
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  revelationBeginsScene,
  theoTriesToUnderstandScene,
  finalVisionScene,
} from "../content/revelation/revelationScenes";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { SceneDefinition } from "../narrative/types";
import { samFixItMemory, gethsemaneCrossMemory } from "../narrative/MemoryEngine/MemoryEngine";

const revelationSceneMap: Record<string, { scene: SceneDefinition; subtitle: string; title: string }> = {
  begins: {
    scene: revelationBeginsScene,
    subtitle: "Revelation — The Island of Patmos",
    title: "Ang Pitong Ilawan at ang Tinig ng Maraming Tubig",
  },
  "theo-understands": {
    scene: theoTriesToUnderstandScene,
    subtitle: "Revelation — Theo Tries to Understand",
    title: "Ang Pagsisikap na Gawing Makina ang Misteryo",
  },
  "final-vision": {
    scene: finalVisionScene,
    subtitle: "Revelation — The Final Vision",
    title: "Ang Bagong Langit at ang Bagong Lupa",
  },
};

export const RevelationExperience: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ sceneSlug?: string }>();
  const slug = explicitSlug || params.sceneSlug || "begins";
  const navigate = useNavigate();

  const currentEntry = revelationSceneMap[slug] || revelationSceneMap["begins"];
  const scene = currentEntry.scene;

  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const storedMemories = useProgressStore((s) => s.storedMemories);

  const [memoryEcho, setMemoryEcho] = useState<{ id: string; label: string; text: string } | null>(null);

  useEffect(() => {
    setCurrentScene(scene.id, scene.pov, scene.focus, scene.emotion);
    markSceneCompleted(scene.id);

    // Audio: Uncontainable cosmic expansion with room to breathe
    if (scene.audio?.track) {
      AudioManager.playTrack(
        scene.audio.track as any,
        (scene.audio.ambient as any) || "open-heavens"
      );
    }

    // Memory Resonance Checks for Phase 5
    if (slug === "theo-understands") {
      // Memory echo: sam-fix-it fires here and nowhere else before this
      const hasSamFixIt = storedMemories.some((m) => m.id === "sam-fix-it");
      if (hasSamFixIt) {
        setMemoryEcho({
          id: "sam-fix-it",
          label: "A quiet resonance: The impulse to fix everything",
          text: "Ang dating gawi sa kwarto bago umakyat ng bundok — labing-apat na tabs, overanalysis, at ang maling akala na ang pag-aayos ay pagmamahal.",
        });
      }
    } else if (slug === "final-vision") {
      // Memory echo: gethsemane-cross, briefly, then deliberately does NOT dominate the scene
      const hasCross = storedMemories.some((m) => m.id === "gethsemane-cross");
      if (hasCross) {
        setMemoryEcho({
          id: "gethsemane-cross",
          label: "A quiet resonance: The shadow of the cross",
          text: "Naroroon pa rin ang alaala ng sakit at ng krus, ngunit hindi na ito naghahari o nagwawasak. Pananalig nang hindi binubura ang sugat.",
        });
      }
    } else {
      setMemoryEcho(null);
    }
  }, [slug, scene, setCurrentScene, markSceneCompleted, storedMemories]);

  const handleAdvance = () => {
    TransitionEngine.execute(
      scene.transition.type,
      scene.transition.to,
      {
        onTransitionStart: () => {
          if (scene.id === "revelation-final-vision") {
            // Trigger collapse audio stack for the full wake-up
            AudioManager.playCollapseStack();
          } else {
            AudioManager.crossfade("revelation-vast", 2.0);
          }
        },
      },
      navigate
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] pt-20 pb-28 overflow-x-hidden">
      <AtmosphericCanvas environmentId={scene.environment.id} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-10 text-center">
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#c99a5e]">
          {currentEntry.subtitle}
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-medium text-white text-balance">
          {currentEntry.title}
        </h1>
      </div>

      {/* Memory Resonance Card */}
      {memoryEcho && (
        <div className="relative z-10 max-w-xl mx-auto px-6 mt-6">
          <div className="p-3.5 rounded-xl bg-[#171a24]/90 border border-[#2b3346] text-xs font-sans shadow-lg">
            <span className="font-mono text-[10px] text-[#c99a5e] uppercase tracking-wider block font-semibold">
              {memoryEcho.label}
            </span>
            <p className="mt-1 text-stone-300 italic">{memoryEcho.text}</p>
          </div>
        </div>
      )}

      {/* Narrative Prose */}
      <SceneRenderer scene={scene} onAdvanceToNextScene={handleAdvance} />
    </div>
  );
};

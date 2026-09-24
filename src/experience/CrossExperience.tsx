import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  gethsemaneScene,
  arrestScene,
  petersDenialScene,
  theTrialScene,
  crucifixionScene,
} from "../content/cross/crossScenes";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { SceneDefinition } from "../narrative/types";
import {
  peterDenialMemory,
  gethsemaneCrossMemory,
  cainBloodMemory,
  josephSeparationMemory,
  jerusalemFallMemory,
  MemoryEngine,
} from "../narrative/MemoryEngine/MemoryEngine";

const sceneMap: Record<string, { scene: SceneDefinition; subtitle: string; title: string }> = {
  gethsemane: {
    scene: gethsemaneScene,
    subtitle: "The Passion — Gethsemane",
    title: "Ang Panalangin sa Ilalim ng mga Olibo",
  },
  arrest: {
    scene: arrestScene,
    subtitle: "The Passion — The Arrest",
    title: "Ang Halik at ang mga Sulo",
  },
  "peter-denial": {
    scene: petersDenialScene,
    subtitle: "The Passion — Peter's Denial",
    title: "Tatlong Beses sa Tabi ng Apoy",
  },
  trial: {
    scene: theTrialScene,
    subtitle: "The Passion — The Trial",
    title: "Ano ang Katotohanan?",
  },
  crucifixion: {
    scene: crucifixionScene,
    subtitle: "The Passion — Crucifixion",
    title: "Ang Dilim sa Katanghaliang Tapat",
  },
};

export const CrossExperience: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ sceneSlug?: string }>();
  const slug = explicitSlug || params.sceneSlug || "gethsemane";
  const navigate = useNavigate();

  const currentItem = sceneMap[slug] || sceneMap["gethsemane"];
  const { scene, subtitle, title } = currentItem;

  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const [activeResonances, setActiveResonances] = useState<string[]>([]);

  const isDevModeActive =
    typeof window !== "undefined" &&
    (import.meta.env.VITE_ENABLE_DEV_MODE === "true" ||
      new URLSearchParams(window.location.search).get("debug") === "kairos");

  useEffect(() => {
    setCurrentScene(scene.id, scene.pov, scene.focus, scene.emotion);

    // Audio direction inverts as the phase progresses (sound empties out)
    if (scene.audio?.track && scene.audio?.ambient) {
      AudioManager.playTrack(scene.audio.track as any, scene.audio.ambient as any);
    }
    markSceneCompleted(scene.id);

    // Memory Crystallization & Resonance Triggering (Section 3 & Section 5)
    const resonances: string[] = [];

    if (scene.id === "cross-arrest") {
      // cain-blood fires around the betrayal/Judas beat
      resonances.push(`${cainBloodMemory.id} (violence / brotherhood / jealousy)`);
    }

    if (scene.id === "cross-peter-denial") {
      // Crystallize peter-denial memory (0.9 weight)
      MemoryEngine.recordMemory(peterDenialMemory);
      // joseph-separation fires around Peter's denial
      resonances.push(`${josephSeparationMemory.id} (separation / abandonment / betrayal)`);
      resonances.push(`NEW MEMORY: ${peterDenialMemory.id} (weight: 0.90)`);
    }

    if (scene.id === "cross-crucifixion") {
      // Crystallize gethsemane-cross memory (0.99 weight — highest in system)
      MemoryEngine.recordMemory(gethsemaneCrossMemory);

      // Compounding high-weight memories peak together
      resonances.push(`PEAK MEMORY: ${gethsemaneCrossMemory.id} (0.99 — helplessness / cannot-save)`);
      resonances.push(`COMPOUNDING RESONANCE: ${jerusalemFallMemory.id} (0.97 — devastation / loss / home)`);
    }

    setActiveResonances(resonances);
  }, [scene, setCurrentScene, markSceneCompleted]);

  // Handle true-silence beat in the Crucifixion scene
  const handleBlockIndexChange = (index: number) => {
    if (scene.id === "cross-crucifixion" && index >= 4) {
      // Crucial requirement: Audio hits near-total silence at least once — an actual empty beat
      AudioManager.releaseToStillness();
    }
  };

  const handleAdvance = () => {
    TransitionEngine.execute(scene.transition.type, scene.transition.to, {}, navigate);
  };

  const isCrucifixion = scene.id === "cross-crucifixion";

  return (
    <div className="relative min-h-screen w-full bg-[#08090c] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas environmentId={scene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none px-4 max-w-xl mx-auto">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#c99a5e]/80 font-medium">
            {subtitle}
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            {title}
          </h1>

          {/* Active Memory Resonances Display (Dev Gated) */}
          {isDevModeActive && activeResonances.length > 0 && (
            <div className="mt-3 flex flex-col gap-1 items-center">
              {activeResonances.map((res, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-0.5 rounded bg-[#1c1316] border border-[#8c362e]/30 text-[9px] font-mono text-[#e09e99]"
                >
                  {res}
                </div>
              ))}
            </div>
          )}
        </header>

        <SceneRenderer
          scene={scene}
          onAdvanceToNextScene={handleAdvance}
          onBlockIndexChange={handleBlockIndexChange}
        />
      </div>
    </div>
  );
};

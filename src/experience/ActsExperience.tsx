/**
 * KAIROS — Phase 5: Acts Experience
 * Pentecost, Early Church, Stephen, Paul
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  pentecostScene,
  earlyChurchScene,
  stephenScene,
  paulScene,
} from "../content/acts/actsScenes";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { SceneDefinition } from "../narrative/types";
import {
  mosesOverwhelmMemory,
  jeremiahLonelinessMemory,
  jerusalemFallMemory,
  davidFallMemory,
  josephSeparationMemory,
} from "../narrative/MemoryEngine/MemoryEngine";

const actsSceneMap: Record<string, { scene: SceneDefinition; subtitle: string; title: string }> = {
  pentecost: {
    scene: pentecostScene,
    subtitle: "Acts — Pentecost",
    title: "Ang Banal na Espiritu at ang Nanginginig na mga Kamay",
  },
  "early-church": {
    scene: earlyChurchScene,
    subtitle: "Acts — The Early Church",
    title: "Ang Paghahati ng Tinapay at ang Magulong Pag-ibig",
  },
  stephen: {
    scene: stephenScene,
    subtitle: "Acts — Stephen",
    title: "Ang Bato at ang Bukas na Langit",
  },
  paul: {
    scene: paulScene,
    subtitle: "Acts — Saul to Paul",
    title: "Ang Liwanag sa Daan ng Damasco",
  },
};

export const ActsExperience: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ sceneSlug?: string }>();
  const slug = explicitSlug || params.sceneSlug || "pentecost";
  const navigate = useNavigate();

  const currentEntry = actsSceneMap[slug] || actsSceneMap["pentecost"];
  const scene = currentEntry.scene;

  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const storedMemories = useProgressStore((s) => s.storedMemories);

  const [memoryEcho, setMemoryEcho] = useState<{ id: string; label: string; text: string } | null>(null);

  useEffect(() => {
    setCurrentScene(scene.id, scene.pov, scene.focus, scene.emotion);
    markSceneCompleted(scene.id);

    // Audio direction: expansion toward open breathing space
    if (scene.audio?.track) {
      AudioManager.playTrack(
        scene.audio.track as any,
        (scene.audio.ambient as any) || "expansion-wind"
      );
    }

    // Memory Resonance Checks
    if (slug === "early-church") {
      const hasMoses = storedMemories.some((m) => m.id === "moses-overwhelm");
      if (hasMoses) {
        setMemoryEcho({
          id: "moses-overwhelm",
          label: "Memory Resonance: Moses (Weight: 0.75)",
          text: "Naalala ni Theo ang bigat ng pamumuno sa ilang — hindi pala kailangang maging walang dungis ang komunidad para manahan ang biyaya.",
        });
      }
    } else if (slug === "stephen") {
      // Stephen resonates with jeremiah-loneliness and jerusalem-fall
      // Section 3 Requirement: Echo of Jerusalem, but response is GRIEF + ACCEPTANCE, not devastation
      const hasJerusalem = storedMemories.some((m) => m.id === "jerusalem-fall");
      const hasJeremiah = storedMemories.some((m) => m.id === "jeremiah-loneliness");

      if (hasJerusalem || hasJeremiah) {
        setMemoryEcho({
          id: "stephen-resonance",
          label: "Memory Transformation: Jerusalem Fall (0.97) & Jeremiah (0.70)",
          text: "Ang dating pagkawasak sa pagbagsak ng templo ay naging kapayapaan at pagtanggap: may lungkot, ngunit walang pagkawasak ng pananalig.",
        });
      }
    } else if (slug === "paul") {
      // Paul resonates with david-fall (categorizing people by worst action) and joseph-separation
      const hasDavid = storedMemories.some((m) => m.id === "david-fall");
      const hasJoseph = storedMemories.some((m) => m.id === "joseph-separation");

      if (hasDavid || hasJoseph) {
        setMemoryEcho({
          id: "paul-resonance",
          label: "Memory Resonance: David (0.85) & Joseph (0.88)",
          text: "Ang tao ay hindi nagtatapos sa kanyang pinakamasamang ginawa — mula tagausig tungo sa 'Kapatid na Saulo'.",
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
          AudioManager.crossfade("expansion", 2.0);
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

      {/* Memory resonance indicator */}
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

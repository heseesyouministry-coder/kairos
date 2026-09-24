import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  firstSightOfJesusScene,
  jesusOrdinaryPeopleScene,
  sermonOnTheMountScene,
  theMiraclesScene,
  theDisciplesScene,
  petersConfessionScene,
  theosInterventionScene,
  triumphalEntryScene,
  emptyTombScene,
  resurrectionAppearancesScene,
} from "../content/gospels/gospelScenes";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { SceneDefinition } from "../narrative/types";
import { cainBloodMemory } from "../narrative/MemoryEngine/MemoryEngine";

const sceneMap: Record<string, { scene: SceneDefinition; subtitle: string; title: string }> = {
  "first-sight": {
    scene: firstSightOfJesusScene,
    subtitle: "Gospel — First Sight of Jesus",
    title: "Ang Lalaki sa Gitna ng Pulutong",
  },
  "ordinary-people": {
    scene: jesusOrdinaryPeopleScene,
    subtitle: "Gospel — Jesus & Ordinary People",
    title: "Ang Paghawak sa May Sakit at Makasalanan",
  },
  "sermon-on-the-mount": {
    scene: sermonOnTheMountScene,
    subtitle: "Gospel — Sermon on the Mount",
    title: "Ang Salita sa Gilid ng Bundok",
  },
  "the-miracles": {
    scene: theMiraclesScene,
    subtitle: "Gospel — The Miracles",
    title: "Ang May-ari ng Karagatan",
  },
  "the-disciples": {
    scene: theDisciplesScene,
    subtitle: "Gospel — The Disciples",
    title: "Ang Mga Mangingisda at Maniningil",
  },
  "peters-confession": {
    scene: petersConfessionScene,
    subtitle: "Gospel — Peter's Confession",
    title: "Ang Bato sa Caesarea Philippi",
  },
  "theos-intervention": {
    scene: theosInterventionScene,
    subtitle: "Gospel — Theo's Intervention",
    title: "Ang Pinakamalaking Pagkakamali",
  },
  "triumphal-entry": {
    scene: triumphalEntryScene,
    subtitle: "Gospel — Triumphal Entry",
    title: "Hosana sa Alikabok ng Jerusalem",
  },
  "empty-tomb": {
    scene: emptyTombScene,
    subtitle: "Resurrection — The Empty Tomb",
    title: "Ang Bukang-liwayway sa Hardin",
  },
  "resurrection-appearances": {
    scene: resurrectionAppearancesScene,
    subtitle: "Resurrection — Lake of Tiberias",
    title: "Ang Almusal sa Dalampasigan",
  },
};

export const GospelExperience: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ sceneSlug?: string }>();
  const slug = explicitSlug || params.sceneSlug || "first-sight";
  const navigate = useNavigate();

  const currentItem = sceneMap[slug] || sceneMap["first-sight"];
  const { scene, subtitle, title } = currentItem;

  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const [resonatingMemory, setResonatingMemory] = useState<string | null>(null);

  const isDevModeActive =
    typeof window !== "undefined" &&
    (import.meta.env.VITE_ENABLE_DEV_MODE === "true" ||
      new URLSearchParams(window.location.search).get("debug") === "kairos");

  useEffect(() => {
    setCurrentScene(scene.id, scene.pov, scene.focus, scene.emotion);

    if (scene.audio?.track && scene.audio?.ambient) {
      AudioManager.playTrack(scene.audio.track as any, scene.audio.ambient as any);
    }
    markSceneCompleted(scene.id);

    // Section 3 resonance: cain-blood fires around betrayal / Judas beat
    if (scene.id === "gospel-theos-intervention") {
      setResonatingMemory(cainBloodMemory.id);
    } else {
      setResonatingMemory(null);
    }
  }, [scene, setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    TransitionEngine.execute(scene.transition.type, scene.transition.to, {}, navigate);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d10] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas environmentId={scene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none px-4">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#c99a5e]/80 font-medium">
            {subtitle}
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            {title}
          </h1>

          {/* Explicit indicator for Theo's Intervention pivotal hinge beat (Dev Gated) */}
          {isDevModeActive && scene.id === "gospel-theos-intervention" && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#8c362e]/15 border border-[#8c362e]/40 text-[10px] uppercase font-sans tracking-widest text-[#f29388]">
              <span>Coping Strategy Structural Shift (Knowledge ≠ Control)</span>
            </div>
          )}

          {/* Active Memory Resonance Indicator (Dev Gated) */}
          {isDevModeActive && resonatingMemory && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 mx-auto rounded-full bg-[#2a1715] border border-[#8c362e]/50 text-[10px] font-mono text-[#f29388] tracking-wider animate-pulse">
              <span>MEMORY RESONANCE: {resonatingMemory}</span>
            </div>
          )}
        </header>

        <SceneRenderer scene={scene} onAdvanceToNextScene={handleAdvance} />
      </div>
    </div>
  );
};

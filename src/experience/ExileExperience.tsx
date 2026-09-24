import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  jeremiahScene,
  fallOfJerusalemScene,
  danielScene,
  estherScene,
  jobScene,
} from "../content/exile/exileScenes";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import {
  MemoryEngine,
  jeremiahLonelinessMemory,
  jerusalemFallMemory,
} from "../narrative/MemoryEngine/MemoryEngine";
import { SceneDefinition } from "../narrative/types";

const sceneMap: Record<string, { scene: SceneDefinition; subtitle: string; title: string }> = {
  jeremiah: {
    scene: jeremiahScene,
    subtitle: "Prophets — Jeremiah",
    title: "Ang Putik ng Balon at ang Apoy sa mga Buto",
  },
  "fall-of-jerusalem": {
    scene: fallOfJerusalemScene,
    subtitle: "Exile — Collapse Two",
    title: "Ang Pagbagsak ng Jerusalem at ang Katahimikan ng Abo",
  },
  daniel: {
    scene: danielScene,
    subtitle: "Exile — Daniel",
    title: "Ang Bintana Patungong Sion sa Gitna ng Babilonia",
  },
  esther: {
    scene: estherScene,
    subtitle: "Exile — Esther",
    title: "Ang Gintong Setro sa Palasyo ng Susa",
  },
  job: {
    scene: jobScene,
    subtitle: "Wisdom — Job",
    title: "Ang Abo at ang Tinig Mula sa Buhawi",
  },
};

export const ExileExperience: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ sceneSlug?: string }>();
  const slug = explicitSlug || params.sceneSlug || "jeremiah";
  const navigate = useNavigate();

  const currentItem = sceneMap[slug] || sceneMap["jeremiah"];
  const { scene, subtitle, title } = currentItem;

  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const hasMemory = useProgressStore((s) => s.hasMemory);

  const isCollapseTwo = scene.id === "collapse-fall-of-jerusalem";

  useEffect(() => {
    setCurrentScene(scene.id, scene.pov, scene.focus, scene.emotion);
    if (scene.audio?.track && scene.audio?.ambient) {
      AudioManager.playTrack(scene.audio.track as any, scene.audio.ambient as any);
    }
    markSceneCompleted(scene.id);
  }, [scene, setCurrentScene, markSceneCompleted]);

  // Seed memories for Jeremiah and Jerusalem
  useEffect(() => {
    if (scene.id === "prophets-jeremiah") {
      if (!MemoryEngine.hasMemory(jeremiahLonelinessMemory.id)) {
        MemoryEngine.recordMemory(jeremiahLonelinessMemory);
      }
    } else if (scene.id === "collapse-fall-of-jerusalem") {
      if (!MemoryEngine.hasMemory(jerusalemFallMemory.id)) {
        MemoryEngine.recordMemory(jerusalemFallMemory);
      }
    }
  }, [scene.id]);

  const handleAdvance = () => {
    TransitionEngine.execute(scene.transition.type, scene.transition.to, {}, navigate);
  };

  const isJeremiahMemoryInscribed =
    scene.id === "prophets-jeremiah" && hasMemory(jeremiahLonelinessMemory.id);
  const isJerusalemMemoryInscribed =
    scene.id === "collapse-fall-of-jerusalem" && hasMemory(jerusalemFallMemory.id);

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col justify-center overflow-x-hidden ${
        isCollapseTwo ? "bg-[#070607]" : "bg-[#0c0d10]"
      }`}
    >
      <AtmosphericCanvas environmentId={scene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none px-4">
          <div
            className={`text-[11px] font-sans uppercase tracking-[0.3em] font-medium ${
              isCollapseTwo ? "text-[#a34438]" : "text-[#c99a5e]/80"
            }`}
          >
            {subtitle}
          </div>
          <h1
            className={`text-xl md:text-2xl font-serif tracking-wide mt-1 ${
              isCollapseTwo ? "text-[#dcd8d0] font-normal" : "text-[#e8e6df]"
            }`}
          >
            {title}
          </h1>

          {isJeremiahMemoryInscribed && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#c99a5e]/10 border border-[#c99a5e]/30 text-[10px] uppercase font-sans tracking-widest text-[#c99a5e]">
              <span>Permanent Memory Inscribed: jeremiah-loneliness</span>
            </div>
          )}

          {isJerusalemMemoryInscribed && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mt-2 rounded-full bg-[#8c362e]/20 border border-[#8c362e]/45 text-[10px] uppercase font-sans tracking-widest text-[#e89a91] shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d9532f] animate-ping" />
              <span>COLLAPSE TWO: jerusalem-fall (Weight: 0.97)</span>
            </div>
          )}
        </header>

        <SceneRenderer scene={scene} onAdvanceToNextScene={handleAdvance} />
      </div>
    </div>
  );
};

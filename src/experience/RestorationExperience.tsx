import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  returnFromExileScene,
  ezraNehemiahScene,
  theLongSilenceScene,
} from "../content/restoration/restorationScenes";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { SceneDefinition } from "../narrative/types";

const sceneMap: Record<string, { scene: SceneDefinition; subtitle: string; title: string }> = {
  return: {
    scene: returnFromExileScene,
    subtitle: "Restoration — Return from Exile",
    title: "Ang Luha at Sigaw sa Bagong Pundasyon",
  },
  "ezra-nehemiah": {
    scene: ezraNehemiahScene,
    subtitle: "Restoration — Ezra & Nehemiah",
    title: "Ang Kutsara ng Semento at ang Sibat",
  },
  "the-silence": {
    scene: theLongSilenceScene,
    subtitle: "Intertestamental — The Long Silence",
    title: "Apatnaraang Taon ng Paghihintay",
  },
};

export const RestorationExperience: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ sceneSlug?: string }>();
  const slug = explicitSlug || params.sceneSlug || "return";
  const navigate = useNavigate();

  const currentItem = sceneMap[slug] || sceneMap["return"];
  const { scene, subtitle, title } = currentItem;

  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  useEffect(() => {
    setCurrentScene(scene.id, scene.pov, scene.focus, scene.emotion);
    if (scene.audio?.track && scene.audio?.ambient) {
      AudioManager.playTrack(scene.audio.track as any, scene.audio.ambient as any);
    }
    markSceneCompleted(scene.id);
  }, [scene, setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    TransitionEngine.execute(scene.transition.type, scene.transition.to, {}, navigate);
  };

  const isLongSilence = scene.id === "restoration-the-silence";

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
          {isLongSilence && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#7aa3be]/10 border border-[#7aa3be]/25 text-[10px] uppercase font-sans tracking-widest text-[#aed8f2]">
              <span>The Silence Holds · 400 Years of Expectation</span>
            </div>
          )}
        </header>

        <SceneRenderer scene={scene} onAdvanceToNextScene={handleAdvance} />
      </div>
    </div>
  );
};

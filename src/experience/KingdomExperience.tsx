import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  joshuaJerichoScene,
  judgesScene,
  ruthScene,
  samuelScene,
  saulScene,
  davidGoliathScene,
  davidJonathanScene,
  davidSaulScene,
  davidAndBathsheba,
  solomonScene,
  theTempleScene,
  elijahScene,
  elishaScene,
  dividedKingdomScene,
  isaiahScene,
} from "../content/kingdom/kingdomScenes";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { MemoryEngine, davidFallMemory } from "../narrative/MemoryEngine/MemoryEngine";
import { SceneDefinition } from "../narrative/types";

const sceneMap: Record<string, { scene: SceneDefinition; subtitle: string; title: string }> = {
  "joshua-jericho": {
    scene: joshuaJerichoScene,
    subtitle: "Kingdom — Jericho",
    title: "Ang Pader at ang Panginginig ng Tuhod",
  },
  judges: {
    scene: judgesScene,
    subtitle: "Kingdom — Judges Montage",
    title: "Ang Paulit-ulit na Ikot ng Paglimot",
  },
  ruth: {
    scene: ruthScene,
    subtitle: "Kingdom — Ruth",
    title: "Ang Amoy ng Sebada sa Bethlehem",
  },
  samuel: {
    scene: samuelScene,
    subtitle: "Kingdom — Samuel",
    title: "Ang Bulong sa Dilim ng Shiloh",
  },
  saul: {
    scene: saulScene,
    subtitle: "Kingdom — Saul",
    title: "Ang Anino ng Korona sa Gibeah",
  },
  "david-goliath": {
    scene: davidGoliathScene,
    subtitle: "Kingdom — David & Goliath",
    title: "Ang Limang Bato sa Libis ng Elah",
  },
  "david-jonathan": {
    scene: davidJonathanScene,
    subtitle: "Kingdom — David & Jonathan",
    title: "Ang Tipan sa Tabi ng Batong Ezel",
  },
  "david-saul": {
    scene: davidSaulScene,
    subtitle: "Kingdom — David in the Cave",
    title: "Ang Laylayan ng Balabal sa En Gedi",
  },
  "david-bathsheba": {
    scene: davidAndBathsheba,
    subtitle: "Kingdom — David & Bathsheba",
    title: "Ang Katahimikang Naghihintay sa Umaga",
  },
  solomon: {
    scene: solomonScene,
    subtitle: "Kingdom — Solomon",
    title: "Ang Ivory Hall at ang Mapanganib na Salamin",
  },
  "the-temple": {
    scene: theTempleScene,
    subtitle: "Kingdom — The Temple",
    title: "Ang Ulap ng Kaluwalhatian sa Jerusalem",
  },
  elijah: {
    scene: elijahScene,
    subtitle: "Kingdom — Elijah",
    title: "Ang Puno ng Walis at ang Malumanay na Bulong",
  },
  elisha: {
    scene: elishaScene,
    subtitle: "Kingdom — Elisha",
    title: "Ang Lumulutang na Palakol sa Jordan",
  },
  "divided-kingdom": {
    scene: dividedKingdomScene,
    subtitle: "Kingdom — Divided Nation",
    title: "Ang Dalawang Gintong Baka sa Hangganan",
  },
  isaiah: {
    scene: isaiahScene,
    subtitle: "Kingdom — Isaiah",
    title: "Ang Nagniningas na Baga sa Dambana",
  },
};

export const KingdomExperience: React.FC<{ explicitSlug?: string }> = ({ explicitSlug }) => {
  const params = useParams<{ sceneSlug?: string }>();
  const slug = explicitSlug || params.sceneSlug || "joshua-jericho";
  const navigate = useNavigate();

  const currentItem = sceneMap[slug] || sceneMap["joshua-jericho"];
  const { scene, subtitle, title } = currentItem;

  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const hasMemory = useProgressStore((s) => s.hasMemory);

  useEffect(() => {
    setCurrentScene(scene.id, scene.pov, scene.focus, scene.emotion);
    if (scene.audio?.track && scene.audio?.ambient) {
      AudioManager.playTrack(scene.audio.track as any, scene.audio.ambient as any);
    }
    markSceneCompleted(scene.id);
  }, [scene, setCurrentScene, markSceneCompleted]);

  // Seed david-fall memory during david-bathsheba
  useEffect(() => {
    if (scene.id === "kingdom-david-bathsheba") {
      if (!MemoryEngine.hasMemory(davidFallMemory.id)) {
        MemoryEngine.recordMemory(davidFallMemory);
      }
    }
  }, [scene.id]);

  const handleAdvance = () => {
    TransitionEngine.execute(scene.transition.type, scene.transition.to, {}, navigate);
  };

  const isDavidFallInscribed = scene.id === "kingdom-david-bathsheba" && hasMemory(davidFallMemory.id);

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
          {isDavidFallInscribed && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#c99a5e]/10 border border-[#c99a5e]/30 text-[10px] uppercase font-sans tracking-widest text-[#c99a5e]">
              <span>Permanent Memory Inscribed: david-fall</span>
            </div>
          )}
        </header>

        <SceneRenderer scene={scene} onAdvanceToNextScene={handleAdvance} />
      </div>
    </div>
  );
};

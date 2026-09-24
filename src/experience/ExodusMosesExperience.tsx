import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mosesChildhoodScene, burningBushScene } from "../content/exodus/moses/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";

export const ExodusMosesExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  const [part, setPart] = useState<"childhood" | "bush">("childhood");
  const currentScene = part === "childhood" ? mosesChildhoodScene : burningBushScene;

  useEffect(() => {
    setCurrentScene(
      currentScene.id,
      currentScene.pov,
      currentScene.focus,
      currentScene.emotion
    );
    AudioManager.playTrack(
      part === "childhood" ? "moses" : "burning-bush",
      part === "childhood" ? "river-nile-water" : "desert-fire-hum"
    );
    markSceneCompleted(currentScene.id);
  }, [currentScene, part, setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    if (part === "childhood") {
      TransitionEngine.execute(
        "crossfade",
        "/experience/exodus/moses",
        {
          onMidpoint: () => setPart("bush"),
        },
        () => {}
      );
    } else {
      TransitionEngine.execute(
        burningBushScene.transition.type,
        burningBushScene.transition.to,
        {},
        navigate
      );
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d10] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas environmentId={currentScene.environment.id} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#c99a5e]/80 font-medium">
            Exodus — Moses
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            {part === "childhood" ? "Ang Tambo ng Nile" : "Ang Apoy sa Paanan ng Horeb"}
          </h1>
        </header>

        <SceneRenderer
          scene={currentScene}
          onAdvanceToNextScene={handleAdvance}
        />
      </div>
    </div>
  );
};

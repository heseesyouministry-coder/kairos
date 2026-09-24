import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { redSeaCrossing } from "../content/exodus/red-sea/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";

export const ExodusRedSeaExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  const [redSeaIntensity, setRedSeaIntensity] = useState<number>(0.2);
  const [isReleased, setIsReleased] = useState<boolean>(false);

  useEffect(() => {
    setCurrentScene(
      redSeaCrossing.id,
      redSeaCrossing.pov,
      redSeaCrossing.focus,
      redSeaCrossing.emotion
    );
    AudioManager.playTrack("red-sea", "crowd-panic-water");
    markSceneCompleted(redSeaCrossing.id);
  }, [setCurrentScene, markSceneCompleted]);

  // Escalate-then-release timeline logic
  const handleBlockIndexChange = (index: number) => {
    // Total narrative blocks = 8 (0 to 7)
    // Block 7: "At sa dulo, nang muling magsara ang tubig, tumigil ang lahat..."
    if (index >= 7) {
      setIsReleased(true);
      setRedSeaIntensity(0.05);
      AudioManager.releaseToStillness();
    } else {
      setIsReleased(false);
      // Intensity scales from 0.2 up to 1.0 across blocks 0-6
      const calculatedIntensity = Math.min(1.0, 0.2 + (index / 6) * 0.8);
      setRedSeaIntensity(calculatedIntensity);
      AudioManager.escalatePanic(calculatedIntensity);
    }
  };

  const handleAdvance = () => {
    TransitionEngine.execute(
      redSeaCrossing.transition.type,
      redSeaCrossing.transition.to,
      {},
      navigate
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d10] flex flex-col justify-center overflow-x-hidden">
      <AtmosphericCanvas
        environmentId={redSeaCrossing.environment.id}
        redSeaIntensity={redSeaIntensity}
        redSeaReleased={isReleased}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <header className="pt-16 pb-4 text-center select-none">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#7aa3be]/90 font-medium">
            Exodus — The Sea of Reeds
          </div>
          <h1 className="text-xl md:text-2xl font-serif text-[#e8e6df] tracking-wide mt-1">
            Ang Paghati at ang Katahimikan
          </h1>
          {isReleased && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#7aa3be]/15 border border-[#7aa3be]/35 text-[10px] uppercase font-sans tracking-widest text-[#aed8f2] animate-fade-in">
              <span>Release State: Tumigil ang lahat (Stillness)</span>
            </div>
          )}
        </header>

        <SceneRenderer
          scene={redSeaCrossing}
          onAdvanceToNextScene={handleAdvance}
          onBlockIndexChange={handleBlockIndexChange}
        />
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { beginScene } from "../content/begin/scene";
import { SceneRenderer } from "../components/narrative/SceneRenderer";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { TransitionEngine } from "../narrative/TransitionEngine/TransitionEngine";
import { AudioManager } from "../audio/AudioManager";
import { samFixItMemory, MemoryEngine } from "../narrative/MemoryEngine/MemoryEngine";
import { MessageSquare, Sparkles, AlertCircle, Bookmark } from "lucide-react";

export const OrdinaryLifeExperience: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);

  const [activeFrictionCard, setActiveFrictionCard] = useState<number>(0);

  useEffect(() => {
    setCurrentScene(
      beginScene.id,
      beginScene.pov,
      beginScene.focus,
      beginScene.emotion
    );
    AudioManager.playTrack("ordinary", "subtle-room");
    markSceneCompleted(beginScene.id);
    // Seed sam-fix-it memory: the only memory originating before the mountain journey
    MemoryEngine.recordMemory(samFixItMemory);
  }, [setCurrentScene, markSceneCompleted]);

  const handleAdvance = () => {
    TransitionEngine.execute(
      beginScene.transition.type,
      beginScene.transition.to,
      {
        onTransitionStart: () => AudioManager.crossfade("mountain"),
      },
      navigate
    );
  };

  const frictionCards = [
    {
      id: "julian",
      tag: "The Diner · Julian",
      quote: "“If you had actually been there, would you still believe? Or do you only believe because you weren't there?”",
      subtext: "A question meant as debate that lodged into Theo's marrow like a hairline fracture.",
    },
    {
      id: "sam",
      tag: "The Front Porch · Sam",
      quote: "“Theo, stop. You don't have to save me. Maybe I just needed someone to listen.”",
      subtext: "Theo's immediate reflex was spreadsheets, financial roadmaps, and logistics. It failed.",
    },
    {
      id: "lydia",
      tag: "The Kitchen · Lydia",
      quote: "“Maybe you just thought helping meant fixing. You can't engineer someone out of grief.”",
      subtext: "The realization that preparation had become an idol disguised as Christian devotion.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] pt-20 pb-28 overflow-x-hidden">
      {/* Visual background layer */}
      <AtmosphericCanvas environmentId={beginScene.environment.id} />

      {/* Narrative Header */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-10 text-center">
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#c99a5e]">
          Prologue · Ordinary Life
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-medium text-white text-balance">
          The Weight of Fixing
        </h1>
      </div>

      {/* Component-level Motion Card Transition (Acceptance Criteria #4) */}
      <div className="relative z-10 max-w-xl mx-auto px-6 mt-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          {frictionCards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setActiveFrictionCard(i)}
              className={`px-3 py-1 rounded-full text-[11px] font-sans transition-all ${
                activeFrictionCard === i
                  ? "bg-[#c99a5e]/20 text-[#c99a5e] border border-[#c99a5e]/50 font-medium"
                  : "bg-[#14161f] text-stone-400 hover:text-white border border-[#232635]"
              }`}
            >
              Friction 0{i + 1}
            </button>
          ))}
        </div>

        <div className="relative min-h-[140px] p-5 rounded-xl bg-[#141620]/80 backdrop-blur-md border border-[#262a3a] shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFrictionCard}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#c99a5e] mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" />
                <span>{frictionCards[activeFrictionCard].tag}</span>
              </div>
              <p className="text-sm font-serif italic text-white leading-relaxed">
                {frictionCards[activeFrictionCard].quote}
              </p>
              <p className="mt-2 text-xs font-body text-stone-400 leading-normal">
                {frictionCards[activeFrictionCard].subtext}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Continuous Narrative Prose */}
      <SceneRenderer scene={beginScene} onAdvanceToNextScene={handleAdvance} />
    </div>
  );
};

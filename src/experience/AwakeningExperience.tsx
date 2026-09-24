/**
 * KAIROS — Phase 5: The Full Wake-Up
 * Supersedes Phase 1 prototype with the complete 11-stage state machine:
 *
 * FINAL_BIBLICAL_SCENE -> REVELATION -> FINAL_INTERNAL_STATE ->
 * EXPERIENCE_COLLAPSE -> WHITE/DARK_TRANSITION -> WAKE_UP ->
 * MOUNTAIN_REALITY -> PHONE -> 2_HOURS_PASSED -> SILENCE ->
 * SAM_MESSAGE -> THEO_RESPONDS_DIFFERENTLY
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useExperienceStore } from "../state/experienceStore";
import { useProgressStore } from "../state/progressStore";
import { AudioManager } from "../audio/AudioManager";
import { AtmosphericCanvas } from "../visual/AtmosphericCanvas";
import { Smartphone, Check, Send, ArrowRight, RotateCcw, ShieldCheck, Heart } from "lucide-react";

export type WakeUpStage =
  | "COLLAPSE_TRANSITION" // Audio crossfade stack swelling, dissolving fragments
  | "DARK_STILLNESS" // Clean drop into absolute silence, eyes closed in darkness
  | "WAKE_UP_PHYSICAL" // Plain physical grounding: stiff neck, numb arm, dirt on sleeve, dry mouth
  | "MOUNTAIN_REALITY" // Looking around at the limestone, Bible on lap, wind
  | "PHONE_REVEAL" // Screen lights up, 8:47 PM, two hours passed
  | "SAM_MESSAGE_VIEW" // Incoming message: "Truck is packed. Leaving early Saturday."
  | "THEO_RESPONSE_TEST" // The test: typing advice, erasing it, sending only "I'm here."
  | "AWAKENING_COMPLETE"; // Final internal state validation card & closure

export const AwakeningExperience: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const updateTheoAwakening = useExperienceStore((s) => s.updateTheoAwakening);
  const theoAwakening = useExperienceStore((s) => s.theoAwakening);

  const markSceneCompleted = useProgressStore((s) => s.markSceneCompleted);
  const setExperienceComplete = useProgressStore((s) => s.setExperienceComplete);
  const storedMemories = useProgressStore((s) => s.storedMemories);

  // If coming directly or in dev preview, allow starting at chosen stage
  const [stage, setStage] = useState<WakeUpStage>("COLLAPSE_TRANSITION");

  // Phone simulation state
  const [typingStep, setTypingStep] = useState<"initial" | "typing_advice" | "erasing_advice" | "sent_presence">("initial");

  useEffect(() => {
    setCurrentScene(
      "awakening-full-sequence",
      "first",
      "theo",
      { wonder: 0.5, trust: 0.95, control: 0.05, fear: 0.05, grief: 0.1 }
    );
    markSceneCompleted("awakening-full-sequence");

    // Stage 1 & 2: Trigger the Section VII Audio Collapse Stack
    // Layered synthesized acoustic frequencies swelling together then cutting abruptly to silence
    AudioManager.playCollapseStack(() => {
      // Audio stack finished, now in absolute silence
    });

    const collapseTimer = setTimeout(() => {
      setStage("DARK_STILLNESS");
    }, 2800);

    const darkTimer = setTimeout(() => {
      setStage("WAKE_UP_PHYSICAL");
      // Gentle cool mountain wind ambient
      AudioManager.playTrack("silence", "mountain-dusk-wind");
    }, 5200);

    return () => {
      clearTimeout(collapseTimer);
      clearTimeout(darkTimer);
    };
  }, [setCurrentScene, markSceneCompleted]);

  // When user reaches completion, commit exact theoState and experienceComplete
  const commitAwakeningState = () => {
    updateTheoAwakening({
      understandsEverything: false,
      stillQuestions: true,
      trustChanged: true,
      compassionChanged: true,
      controlInstinctReduced: true,
    });
    setExperienceComplete(true);
  };

  const handleSimulateReply = () => {
    // 1. Theo starts typing his old instinct (advice, logistics, fixing)
    setTypingStep("typing_advice");

    // 2. He stops and erases the entire solution
    setTimeout(() => {
      setTypingStep("erasing_advice");

      // 3. He types and sends only: "I'm here."
      setTimeout(() => {
        setTypingStep("sent_presence");
        commitAwakeningState();
        setTimeout(() => {
          setStage("AWAKENING_COMPLETE");
        }, 1600);
      }, 1400);
    }, 1800);
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-[#e8e6df] pt-16 pb-28 px-4 sm:px-6 overflow-x-hidden flex flex-col justify-center items-center">
      {/* Mountain limestone night environment */}
      <AtmosphericCanvas environmentId="mountain-ridge" />

      {/* STAGE 1: Audio Collapse Stack & Dissolving Fragments */}
      {stage === "COLLAPSE_TRANSITION" && (
        <motion.div
          key="collapse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-20 max-w-xl mx-auto text-center px-6 py-12"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#c99a5e]">
              Experience Collapse · Layering Memories
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white/90 italic">
              Nagsasabay-sabay ang mga tinig…
            </h2>
            <div className="space-y-2 text-xs font-mono text-stone-400">
              <p className="animate-pulse">“Theo, gising na…” (boses ni Nanay)</p>
              <p className="opacity-75">Tawa ni Lydia sa kusina…</p>
              <p className="opacity-60">“Hindi mo kailangang ayusin ang lahat, Theo…” (si Sam)</p>
              <p className="opacity-40">Hampas ng alon sa Tiberias… Apoy sa altar ni Elijah…</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-1 bg-[#c99a5e]/50 rounded-full animate-ping" />
          </div>
        </motion.div>
      )}

      {/* STAGE 2: Dark Stillness (Full Silence Drop) */}
      {stage === "DARK_STILLNESS" && (
        <motion.div
          key="darkness"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-20 max-w-lg mx-auto text-center px-6"
        >
          <div className="p-8 rounded-2xl bg-black/80 border border-stone-850 backdrop-blur-md">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-stone-500">
              Stillness
            </span>
            <p className="mt-4 text-base font-serif text-stone-300 italic leading-relaxed">
              Katahimikan. Walang boses. Walang kulog.
            </p>
            <p className="mt-2 text-xs font-sans text-stone-500">
              Dahan-dahang nagbubukas ang mga mata.
            </p>
          </div>
        </motion.div>
      )}

      {/* STAGE 3: Physical Grounding Details (Plain, casual register, no metaphor) */}
      {stage === "WAKE_UP_PHYSICAL" && (
        <motion.div
          key="physical"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-xl mx-auto px-6 py-6"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-[#12141c]/95 border border-[#232738] shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#212536]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c99a5e]">
                Reality · Grounding
              </span>
              <span className="text-[10px] font-mono text-stone-500">Limestone Ridge</span>
            </div>

            {/* Plain grounding details per Section 5 */}
            <div className="space-y-3 text-sm font-sans text-stone-300 leading-relaxed">
              <p>
                Masakit ang leeg ko. Nangangalay ang kaliwang braso ko dahil doon nakatukod ang bigat ng katawan ko sa bato.
              </p>
              <p>
                May tuyong dumi at dahon ng pino sa manggas ng hoodie ko. Tuyot ang lalamunan ko, lasang alikabok at malamig na hangin.
              </p>
              <p>
                Nasa kandungan ko pa rin ang lumang Bibliya. Bahagyang nakatupi ang kanto ng manipis na pahina sa Pahayag.
              </p>
            </div>

            <button
              onClick={() => setStage("MOUNTAIN_REALITY")}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#1e2232] hover:bg-[#282d42] border border-[#323750] text-xs font-mono uppercase tracking-wider text-[#c99a5e] flex items-center justify-center gap-2 transition-colors"
            >
              <span>Tumingin sa Paligid</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STAGE 4 & 5: Mountain Reality & Phone Reveal */}
      {(stage === "MOUNTAIN_REALITY" || stage === "PHONE_REVEAL") && (
        <motion.div
          key="mountain"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 max-w-xl mx-auto px-6 py-6"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-[#12141c]/95 border border-[#232738] shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#212536]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c99a5e]">
                Mountain Reality
              </span>
              <span className="text-[10px] font-mono text-stone-400">8:47 PM</span>
            </div>

            <div className="space-y-3 text-sm font-sans text-stone-300 leading-relaxed">
              <p>
                Madilim na sa bundok. Malamig ang hangin. Sa ibaba, tanaw ang mga ilaw ng mga sasakyan sa highway papuntang bayan.
              </p>
              <p>
                Kinapa ko ang bulsa ko. Inilabas ko ang cellphone ko. Pagpindot ko sa side button, nagliwanag ang screen:
              </p>
            </div>

            {/* Phone Lock Screen display: 8:47 PM, two hours passed */}
            <div className="p-4 rounded-xl bg-[#090a0f] border border-[#1e2233] text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-stone-400">
                <Smartphone className="w-3.5 h-3.5 text-[#c99a5e]" />
                <span>Lock Screen</span>
              </div>
              <div className="text-3xl font-mono font-bold text-white tracking-widest pt-1">
                8:47 PM
              </div>
              <div className="text-[11px] font-sans text-[#c99a5e] pt-1">
                Humigit-kumulang dalawang oras lang ang lumipas mula nang umupo ako sa batong ito.
              </div>
            </div>

            <button
              onClick={() => setStage("SAM_MESSAGE_VIEW")}
              className="mt-3 w-full py-2.5 rounded-xl bg-[#c99a5e] hover:bg-[#d8a86a] text-black text-xs font-sans font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>Buksan ang Notification mula kay Sam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STAGE 6 & 7: The Test — Sam's Message & Theo Responds Differently */}
      {(stage === "SAM_MESSAGE_VIEW" || stage === "THEO_RESPONSE_TEST") && (
        <motion.div
          key="sam_test"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 max-w-md mx-auto px-4 sm:px-6 py-6"
        >
          <div className="p-6 rounded-2xl bg-[#12141c]/95 border border-[#2b3044] shadow-2xl space-y-5">
            {/* Phone Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#232635] text-xs font-mono">
              <div className="flex items-center gap-1.5 text-stone-300">
                <Smartphone className="w-3.5 h-3.5 text-[#c99a5e]" />
                <span className="font-semibold">Messages · Sam</span>
              </div>
              <span className="text-stone-400">8:47 PM</span>
            </div>

            {/* Context Reminder */}
            <p className="text-xs font-sans text-stone-400 leading-relaxed italic">
              Walang nagbago sa sitwasyon ni Sam sa loob ng dalawang oras. Tuloy ang paglipat. Nandiyan pa rin ang problema.
            </p>

            {/* Sam's Incoming Message */}
            <div className="p-3.5 rounded-xl bg-[#1b1f2e] border border-[#2c324a] text-left">
              <div className="text-[10px] font-mono text-[#c99a5e] mb-1 font-semibold">
                Sam · 8:12 PM
              </div>
              <p className="text-sm font-sans text-stone-200">
                Truck is packed. Leaving early Saturday.
              </p>
            </div>

            {/* Theo's Response Box: The Behavioral Test */}
            <div className="p-4 rounded-xl bg-[#0b0c12] border border-[#212638] text-left space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
                <span>Theo's Message Draft</span>
                {typingStep === "sent_presence" && (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3" /> Delivered
                  </span>
                )}
              </div>

              {/* Dynamic typing simulation */}
              <div className="min-h-[56px] text-xs font-sans flex items-center p-2.5 rounded-lg bg-[#141722] border border-[#252a3d]">
                {typingStep === "initial" && (
                  <span className="text-stone-500 italic">
                    Ang dating Theo ay magbubukas ng laptop at magsusulat ng 5-point plan…
                  </span>
                )}

                {typingStep === "typing_advice" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-stone-300 font-sans"
                  >
                    Kung gusto mo, pwede kong tignan ang tenancy laws o gawan kita ng checklist para sa—
                    <span className="animate-pulse">|</span>
                  </motion.div>
                )}

                {typingStep === "erasing_advice" && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0.35 }}
                    className="text-stone-400 line-through font-sans"
                  >
                    Kung gusto mo, pwede kong— [binubura ang lahat ng payo at solusyon]
                  </motion.div>
                )}

                {typingStep === "sent_presence" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-white font-serif text-base font-medium text-emerald-300"
                  >
                    “I'm here.”
                  </motion.div>
                )}
              </div>

              {typingStep === "initial" && (
                <button
                  onClick={handleSimulateReply}
                  className="mt-3 w-full py-2.5 rounded-xl bg-[#c99a5e] hover:bg-[#d8a86a] text-black text-xs font-sans font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Sumagot kay Sam</span>
                </button>
              )}

              {typingStep === "sent_presence" && (
                <div className="pt-2 text-[11px] font-sans text-stone-400 italic">
                  Walang spreadsheet. Walang pangaral. Walang solusyon. Presensya lang.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* STAGE 8: Complete Awakening & Project Closure */}
      {stage === "AWAKENING_COMPLETE" && (
        <motion.div
          key="complete"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-lg mx-auto px-4 sm:px-6 py-6"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-[#12141c]/95 border border-[#2b3147] shadow-2xl text-center space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b2230] border border-[#2f3952] text-[10px] font-mono uppercase tracking-[0.2em] text-[#c99a5e] mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>KAIROS Completed · Full Journey Resolution</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                The Mountain at 8:47 PM
              </h2>
              <p className="mt-2 text-xs font-serif italic text-stone-400 max-w-md mx-auto">
                Hindi naintindihan ang lahat ng misteryo. Ngunit hindi na kailangang maging makina ang pananampalataya.
              </p>
            </div>

            {/* Exact Theo Behavioral Transformation Card matching Section 5 */}
            <div className="p-4 rounded-xl bg-[#090b10] border border-[#1e2335] text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-2 font-semibold">
                Theo Interior Transformation Vector:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-[#10131a] border border-[#1a1e2b]">
                  <span className="text-stone-500 block text-[9px] uppercase">Understands All:</span>
                  <span className="text-stone-400">false (mystery remains)</span>
                </div>
                <div className="p-2 rounded bg-[#10131a] border border-[#1a1e2b]">
                  <span className="text-stone-500 block text-[9px] uppercase">Still Questions:</span>
                  <span className="text-emerald-400 font-semibold">true</span>
                </div>
                <div className="p-2 rounded bg-[#10131a] border border-[#1a1e2b]">
                  <span className="text-stone-500 block text-[9px] uppercase">Trust Changed:</span>
                  <span className="text-emerald-400 font-semibold">true</span>
                </div>
                <div className="p-2 rounded bg-[#10131a] border border-[#1a1e2b]">
                  <span className="text-stone-500 block text-[9px] uppercase">Control Reduced:</span>
                  <span className="text-[#c99a5e] font-semibold">true (fixing erased)</span>
                </div>
              </div>
              <div className="mt-2 p-2 rounded bg-[#131b17] border border-[#1e3328] text-[10px] font-mono text-emerald-400 flex items-center justify-between">
                <span>experienceComplete:</span>
                <span className="font-bold">true</span>
              </div>
            </div>

            {/* Persisted Memories Summary (confirming all 8 memories persisted) */}
            <div className="p-3.5 rounded-xl bg-[#0b0d14] border border-[#1e2233] text-left">
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-2">
                <span>Crystallized Memories Persisted:</span>
                <span className="text-[#c99a5e]">{storedMemories.length} / 8</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-stone-400">
                {storedMemories.map((m) => (
                  <div key={m.id} className="p-1 rounded bg-[#131622] truncate flex justify-between">
                    <span>{m.id}</span>
                    <span className="text-[#c99a5e]">{m.emotionalWeight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 rounded-full bg-[#c99a5e] hover:bg-[#d8a86a] text-black text-xs font-sans font-medium uppercase tracking-wider transition-colors shadow-lg"
              >
                Return to Sanctuary
              </button>
              <button
                onClick={() => {
                  setStage("WAKE_UP_PHYSICAL");
                  setTypingStep("initial");
                }}
                className="px-5 py-3 rounded-full bg-[#181b26] hover:bg-[#222636] border border-[#2b3044] text-xs font-sans uppercase tracking-wider text-stone-300 transition-colors"
              >
                Replay Wake-Up
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SceneDefinition, NarrativeBlock, POV } from "../../narrative/types";
import { POVEngine } from "../../narrative/POVEngine/POVEngine";
import { useExperienceStore } from "../../state/experienceStore";
import { useSettingsStore } from "../../state/settingsStore";
import { ChevronDown, CornerDownRight } from "lucide-react";

interface SceneRendererProps {
  scene: SceneDefinition;
  onAdvanceToNextScene?: () => void;
  onEdenShiftUpdate?: (progress: number) => void;
  onBlockIndexChange?: (index: number) => void;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  onAdvanceToNextScene,
  onEdenShiftUpdate,
  onBlockIndexChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);

  useEffect(() => {
    onBlockIndexChange?.(currentBlockIndex);
  }, [currentBlockIndex, onBlockIndexChange]);

  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const setPOV = useExperienceStore((s) => s.setPOV);
  const setEmotion = useExperienceStore((s) => s.setEmotion);

  const currentBlock = scene.narrative[currentBlockIndex] || scene.narrative[0];
  const activePOV: POV = (currentBlock && "pov" in currentBlock ? currentBlock.pov : scene.pov);

  // Sync active POV and emotion to global store
  useEffect(() => {
    setPOV(activePOV);
    if (scene.emotion) {
      setEmotion(scene.emotion);
    }
  }, [activePOV, scene.emotion, setPOV, setEmotion]);

  // Compute POV-driven typographic and spatial configuration
  const povStyle = POVEngine.getStyling(activePOV, scene.emotion);

  // Handle narrative position driven lighting changes (Eden's light shift)
  useEffect(() => {
    if (scene.id === "genesis-eden" && onEdenShiftUpdate) {
      // Calculate narrative progress: shift starts around the whisper (block index 4) and peaks at eating (block index 7)
      const totalBlocks = scene.narrative.length;
      const progress = Math.max(0, Math.min(1, (currentBlockIndex - 3) / (totalBlocks - 4)));
      onEdenShiftUpdate(progress);
    }
  }, [currentBlockIndex, scene.id, scene.narrative.length, onEdenShiftUpdate]);

  // GSAP animation for revealing newly unlocked blocks
  useEffect(() => {
    const el = blocksRef.current[currentBlockIndex];
    if (!el) return;

    // GSAP TIMELINE TIMING & ANIMATION:
    // CRITICAL (PHASE 4 SPEC REQUIREMENT):
    // No "announcement" rendering. No lighting cue, no music sting, no camera push marks
    // Jesus's first appearance (scene.id === 'gospel-first-sight').
    // He is deliberately rendered as an ordinary man standing in an ordinary crowd.
    // The absence of a cue is the cue itself — DO NOT "fix" this later by adding lighting cues,
    // camera scale pulses, or musical stings.

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 18, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        ease: "power2.out",
      }
    );
  }, [currentBlockIndex, reducedMotion, scene.id]);

  // Advance to next block or scene
  const handleAdvance = () => {
    if (currentBlockIndex < scene.narrative.length - 1) {
      const nextIndex = currentBlockIndex + 1;
      setCurrentBlockIndex(nextIndex);
      setVisibleCount((prev) => Math.max(prev, nextIndex + 1));

      // Gentle auto-scroll to latest revealed block
      setTimeout(() => {
        blocksRef.current[nextIndex]?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "center",
        });
      }, 100);
    } else if (onAdvanceToNextScene) {
      onAdvanceToNextScene();
    }
  };

  // Keyboard navigation (Space, ArrowDown, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === " " || e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        handleAdvance();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const isLastBlock = currentBlockIndex >= scene.narrative.length - 1;

  return (
    <div
      ref={containerRef}
      className={`relative z-10 w-full mx-auto px-6 py-16 md:py-24 transition-all duration-700 ${povStyle.containerMaxWidth}`}
    >
      <div className="space-y-10 md:space-y-12">
        {scene.narrative.slice(0, visibleCount).map((block, idx) => {
          const isCurrent = idx === currentBlockIndex;
          const isPast = idx < currentBlockIndex;
          const blockPOV: POV = "pov" in block ? block.pov : scene.pov;

          // Stylistic variations based on block type and POV:
          // Third: serene, classical, measured
          // Second: intimate, direct address, subtle hairline border, closer tracking
          // First: interior monologue, warm ivory, italicized or visceral emphasis
          let blockClasses = "transition-all duration-500 ";

          if (blockPOV === "third") {
            blockClasses += "text-[#cfcac0] font-body leading-relaxed ";
          } else if (blockPOV === "second") {
            blockClasses += "text-[#e8e4da] pl-4 border-l border-[#c99a5e]/40 font-body leading-snug ";
          } else if (blockPOV === "first") {
            blockClasses += "text-[#faf6ec] pl-4 border-l-2 border-[#c99a5e] italic font-serif leading-snug ";
          }

          if (isPast) {
            blockClasses += "opacity-60 hover:opacity-90 ";
          } else {
            blockClasses += "opacity-100 ";
          }

          return (
            <div
              key={idx}
              ref={(el) => {
                blocksRef.current[idx] = el;
              }}
              onClick={() => {
                if (isPast) {
                  setCurrentBlockIndex(idx);
                }
              }}
              className={`group cursor-default ${blockClasses}`}
            >
              {renderBlockContent(block, isCurrent, povStyle.fontSize)}
            </div>
          );
        })}
      </div>

      {/* Rhythmic narrative progression button */}
      <div className="pt-16 md:pt-20 flex flex-col items-center justify-center">
        <button
          onClick={handleAdvance}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#181a22]/80 hover:bg-[#20232e] border border-[#2d3142] hover:border-[#c99a5e]/50 text-xs font-sans uppercase tracking-widest text-[#cfcac0] hover:text-white transition-all shadow-lg active:scale-95"
        >
          {isLastBlock ? (
            <>
              <span>Continue Into the Next Horizon</span>
              <CornerDownRight className="w-3.5 h-3.5 text-[#c99a5e] group-hover:translate-x-0.5 transition-transform" />
            </>
          ) : (
            <>
              <span>Continue Reading</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#c99a5e] group-hover:translate-y-0.5 transition-transform" />
            </>
          )}
        </button>
        <span className="text-[11px] font-sans text-stone-500 mt-2.5 tracking-wider">
          Press <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-mono text-[10px]">Space</kbd> or click to advance
        </span>
      </div>
    </div>
  );
};

function renderBlockContent(block: NarrativeBlock, isCurrent: boolean, fontSizeClass: string) {
  const isCasual = "register" in block && block.register === "casual";

  if (isCasual && "text" in block) {
    return (
      <div className="py-2.5 my-1">
        <p className="text-sm md:text-base font-sans text-stone-300/90 tracking-normal leading-relaxed text-balance">
          {block.text}
        </p>
      </div>
    );
  }

  switch (block.type) {
    case "narrative":
      return (
        <p className={`${fontSizeClass} tracking-normal text-balance`}>
          {block.text}
        </p>
      );

    case "dialogue":
      return (
        <div className="my-2">
          <div className="text-[11px] font-sans uppercase tracking-widest text-[#c99a5e] mb-1 font-medium">
            {block.speaker}
          </div>
          <p className={`${fontSizeClass} tracking-normal text-balance font-serif`}>
            {block.text}
          </p>
        </div>
      );

    case "sensory":
      return (
        <p className={`${fontSizeClass} tracking-normal text-balance text-[#ded9cd]`}>
          {block.text}
        </p>
      );

    case "internal":
      return (
        <p className={`${fontSizeClass} tracking-normal text-balance font-serif text-[#fffbf2]`}>
          {block.text}
        </p>
      );

    case "immersion":
      return (
        <p className={`${fontSizeClass} tracking-tight text-balance text-[#fff]`}>
          {block.text}
        </p>
      );

    case "sceneCue":
      return (
        <div className="my-6 py-3 px-4 rounded bg-[#151720]/60 border-l-2 border-[#8c6e43] text-sm text-[#baa890] italic font-serif">
          {block.cue}
        </div>
      );

    case "transitionCue":
      return (
        <div className="text-xs uppercase tracking-widest text-[#8c6e43] mt-4 font-sans flex items-center gap-1.5">
          <span>Boundary Cross</span>
          <span>→</span>
        </div>
      );

    default:
      return null;
  }
}

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { SceneDefinition, NarrativeBlock, POV } from "../../narrative/types";
import { POVEngine } from "../../narrative/POVEngine/POVEngine";
import { useExperienceStore } from "../../state/experienceStore";
import { useSettingsStore } from "../../state/settingsStore";
import { useAudioStore, AudioTrackId, AudioAmbientId } from "../../state/audioStore";
import { AudioManager } from "../../audio/AudioManager";
import { MusicDirector } from "../../audio/worship/MusicDirector";
import { getLibraryStoryForScene } from "../../content/library/storiesData";
import { getAudioTranscript } from "../../audio/audioTranscripts";
import {
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  BookOpen,
  Volume2,
  VolumeX,
  FastForward,
  FileText,
  Sparkles,
  Layers,
  Heart,
  Tag,
  Hash,
} from "lucide-react";

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
  const [showSoundTranscript, setShowSoundTranscript] = useState<boolean>(false);

  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const readerMode = useSettingsStore((s) => s.readerMode);
  const setReaderMode = useSettingsStore((s) => s.setReaderMode);
  const toggleReaderMode = useSettingsStore((s) => s.toggleReaderMode);
  const audioEnabled = useAudioStore((s) => s.audioEnabled);

  const setPOV = useExperienceStore((s) => s.setPOV);
  const setEmotion = useExperienceStore((s) => s.setEmotion);

  const currentBlock = scene.narrative[currentBlockIndex] || scene.narrative[0];
  const activePOV: POV = currentBlock && "pov" in currentBlock ? currentBlock.pov : scene.pov;

  // Sync scene change to MusicDirector
  useEffect(() => {
    MusicDirector.onSceneChange(scene.id, activePOV, scene.emotion);
  }, [scene.id, activePOV, scene.emotion]);

  // Sync active POV, emotion, and dynamic narrative ducking to global stores and MusicDirector
  useEffect(() => {
    onBlockIndexChange?.(currentBlockIndex);
    setPOV(activePOV);
    if (scene.emotion) {
      setEmotion(scene.emotion);
    }
    if (currentBlock) {
      MusicDirector.onBlockChange(currentBlock, activePOV, scene.emotion);
    }
  }, [currentBlockIndex, activePOV, scene.emotion, onBlockIndexChange, setPOV, setEmotion, currentBlock]);

  // Compute POV-driven typographic and spatial configuration
  const povStyle = POVEngine.getStyling(activePOV, scene.emotion);

  // Handle narrative position driven lighting changes (Eden's light shift)
  useEffect(() => {
    if (scene.id === "genesis-eden" && onEdenShiftUpdate) {
      const totalBlocks = scene.narrative.length;
      const progress = Math.max(0, Math.min(1, (currentBlockIndex - 3) / (totalBlocks - 4)));
      onEdenShiftUpdate(progress);
    }
  }, [currentBlockIndex, scene.id, scene.narrative.length, onEdenShiftUpdate]);

  // GSAP animation for revealing newly unlocked blocks (only in experience mode)
  useEffect(() => {
    if (readerMode === "writer") return;

    const el = blocksRef.current[currentBlockIndex];
    if (!el) return;

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
  }, [currentBlockIndex, reducedMotion, scene.id, readerMode]);

  // Advance to next block or scene
  const handleAdvance = () => {
    if (currentBlockIndex < scene.narrative.length - 1) {
      const nextIndex = currentBlockIndex + 1;
      setCurrentBlockIndex(nextIndex);
      setVisibleCount((prev) => Math.max(prev, nextIndex + 1));

      // Auto-scroll to latest revealed block
      setTimeout(() => {
        blocksRef.current[nextIndex]?.scrollIntoView({
          behavior: reducedMotion || readerMode === "writer" ? "auto" : "smooth",
          block: "center",
        });
      }, 50);
    } else if (onAdvanceToNextScene) {
      onAdvanceToNextScene();
    }
  };

  // Step back to previous block
  const handlePrevious = () => {
    if (currentBlockIndex > 0) {
      const prevIndex = currentBlockIndex - 1;
      setCurrentBlockIndex(prevIndex);
      setTimeout(() => {
        blocksRef.current[prevIndex]?.scrollIntoView({
          behavior: reducedMotion || readerMode === "writer" ? "auto" : "smooth",
          block: "center",
        });
      }, 50);
    }
  };

  // Skip directly to next scene
  const handleSkipScene = () => {
    if (onAdvanceToNextScene) {
      onAdvanceToNextScene();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === " " || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        handleAdvance();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevious();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const isLastBlock = currentBlockIndex >= scene.narrative.length - 1;
  const isFirstBlock = currentBlockIndex === 0;
  const libraryStory = getLibraryStoryForScene(scene.id);
  const audioTranscript = getAudioTranscript(scene.audio?.track, scene.audio?.ambient);
  const isDev = Boolean(import.meta.env?.DEV);

  // -------------------------------------------------------------
  // WRITER MODE: Stripped visual/audio, plain structured output
  // -------------------------------------------------------------
  if (readerMode === "writer") {
    return (
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 text-stone-300 font-mono text-sm leading-relaxed">
        {/* Dev Mode Banner */}
        <div className="mb-8 p-4 rounded-lg bg-stone-900/90 border border-stone-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#c99a5e]" />
            <div>
              <div className="font-semibold text-white tracking-wider uppercase text-xs">
                Writer Review Mode (Dev / Staging)
              </div>
              <p className="text-stone-400 text-xs">
                Visuals, audio, and timelines stripped. Showing structured text & narrative telemetry.
              </p>
            </div>
          </div>
          <button
            onClick={() => setReaderMode("experience")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#c99a5e]/20 hover:bg-[#c99a5e]/30 border border-[#c99a5e]/50 text-xs text-[#e8c088] font-sans transition-colors focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Switch to Experience Mode
          </button>
        </div>

        {/* Scene Meta Box */}
        <header className="mb-8 p-5 rounded-lg bg-[#141620] border border-[#262838] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262838] pb-3">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#c99a5e]" />
              <span className="text-white font-bold text-base">{scene.id}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                POV: <strong className="text-[#c99a5e]">{scene.pov}</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                Focus: <strong className="text-stone-200">{scene.focus}</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                Transition: <strong>{scene.transition?.to || "none"}</strong> ({scene.transition?.type})
              </span>
            </div>
          </div>

          {/* Emotional State Values */}
          {scene.emotion && (
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                Emotional State Vector (0.00 – 1.00):
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {Object.entries(scene.emotion).map(([key, val]) => (
                  <span
                    key={key}
                    className="px-2 py-0.5 rounded bg-stone-800/80 border border-stone-700 text-xs text-stone-300"
                  >
                    {key}: <strong className="text-stone-100">{val.toFixed(2)}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags & Scripture */}
          <div className="flex flex-wrap gap-4 text-xs pt-1 border-t border-[#262838]/60 text-stone-400">
            {scene.echoTags && scene.echoTags.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Echo Tags:</span>
                <span className="text-amber-200">[{scene.echoTags.join(", ")}]</span>
              </div>
            )}
            {libraryStory?.scriptureReference && (
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>Scripture:</span>
                <span className="text-teal-200 font-serif">{libraryStory.scriptureReference}</span>
              </div>
            )}
          </div>
        </header>

        {/* Structured Prose List */}
        <article role="feed" aria-label={`Writer structured review of ${scene.id}`} className="space-y-6">
          {scene.narrative.map((block, idx) => {
            const blockPOV: POV = "pov" in block ? block.pov : scene.pov;
            const blockRegister = "register" in block ? block.register : "standard";

            return (
              <div
                key={idx}
                ref={(el) => {
                  blocksRef.current[idx] = el;
                }}
                className={`p-4 rounded-lg border transition-colors ${
                  idx === currentBlockIndex
                    ? "bg-[#181c28] border-[#c99a5e]/60 ring-1 ring-[#c99a5e]/30"
                    : "bg-[#11131a] border-stone-800 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-bold">
                      #{idx + 1}
                    </span>
                    <span className="uppercase text-[#c99a5e] font-semibold">{block.type}</span>
                    <span>• POV: {blockPOV}</span>
                    <span>• Reg: {blockRegister}</span>
                  </div>
                  {"speaker" in block && (
                    <span className="text-stone-300 font-sans font-medium">
                      Speaker: {block.speaker}
                    </span>
                  )}
                </div>

                <div className="text-stone-200 text-sm md:text-base leading-relaxed pl-2 border-l-2 border-stone-700">
                  {"text" in block && <p>{block.text}</p>}
                  {"cue" in block && <p className="italic text-amber-300">{block.cue}</p>}
                  {"to" in block && <p className="text-stone-400">Transition → {block.to}</p>}
                </div>
              </div>
            );
          })}
        </article>

        {/* Writer Mode Flow Actions */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={isFirstBlock}
              className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-xs text-stone-300 focus-visible:ring-2 focus-visible:ring-[#c99a5e]"
            >
              Previous Block
            </button>
            <button
              onClick={handleAdvance}
              className="px-4 py-1.5 rounded bg-[#c99a5e] hover:bg-[#d8a86c] text-stone-950 font-semibold text-xs focus-visible:ring-2 focus-visible:ring-white"
            >
              {isLastBlock ? "Advance Next Scene →" : "Next Block →"}
            </button>
          </div>
          {onAdvanceToNextScene && (
            <button
              onClick={handleSkipScene}
              className="px-3 py-1.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-400 hover:text-white flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#c99a5e]"
            >
              <FastForward className="w-3.5 h-3.5" />
              Skip to Next Scene Target
            </button>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // EXPERIENCE MODE: Full Production Pacing, Audio & Atmosphere
  // -------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={`relative z-10 w-full mx-auto px-6 py-16 md:py-24 transition-all duration-700 ${povStyle.containerMaxWidth}`}
    >
      {/* Dev Mode quick toggle indicator */}
      {isDev && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={toggleReaderMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161822]/80 hover:bg-[#20232e] border border-[#2d3142] text-[11px] font-mono text-stone-400 hover:text-stone-200 transition-colors focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
            title="Toggle Writer Mode (Dev Review Tool)"
          >
            <FileText className="w-3 h-3 text-[#c99a5e]" />
            <span>Writer Mode</span>
          </button>
        </div>
      )}

      {/* Screen Reader Live Region for Active Narrative & POV Shift Announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Narrative POV is {activePOV} person. Currently viewing block {currentBlockIndex + 1} of{" "}
        {scene.narrative.length}.
      </div>

      {/* Accessible Atmospheric Audio / Sound Cue Transcript Drawer */}
      <aside
        aria-label="Atmospheric Audio & Sound Transcript"
        className="mb-8 p-3 rounded-lg bg-[#12141c]/90 border border-[#242738] text-xs font-sans text-stone-400 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-[#c99a5e]" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
            )}
            <span className="font-medium text-stone-300">
              Atmosphere: <span className="font-mono text-stone-400">{scene.audio?.track || "ambient"}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSoundTranscript((prev) => !prev)}
              className="text-[11px] text-[#c99a5e] hover:underline focus-visible:ring-1 focus-visible:ring-[#c99a5e] rounded px-1"
              aria-expanded={showSoundTranscript}
            >
              {showSoundTranscript ? "Hide Sound Transcript" : "Sound Transcript"}
            </button>
            <button
              onClick={() => AudioManager.toggleMute()}
              className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
              title={audioEnabled ? "Mute audio" : "Unmute audio"}
            >
              {audioEnabled ? "Mute" : "Unmute"}
            </button>
          </div>
        </div>

        {showSoundTranscript && (
          <div className="pt-2 border-t border-[#242738] text-stone-300 text-xs italic font-serif leading-relaxed">
            {audioTranscript}
          </div>
        )}
      </aside>

      {/* Main Narrative Article with Semantic HTML */}
      <article
        role="feed"
        aria-label={`Narrative presentation of ${scene.id}`}
        className="space-y-10 md:space-y-12"
      >
        {scene.narrative.slice(0, visibleCount).map((block, idx) => {
          const isCurrent = idx === currentBlockIndex;
          const isPast = idx < currentBlockIndex;
          const blockPOV: POV = "pov" in block ? block.pov : scene.pov;

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
              tabIndex={0}
              role="article"
              aria-current={isCurrent ? "true" : undefined}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCurrentBlockIndex(idx);
                }
              }}
              className={`group cursor-default rounded p-1 focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none ${blockClasses}`}
            >
              {renderSemanticBlock(block, isCurrent, povStyle.fontSize)}
            </div>
          );
        })}
      </article>

      {/* Rhythmic narrative progression and controls */}
      <nav aria-label="Narrative Controls" className="pt-16 md:pt-20 flex flex-col items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {currentBlockIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#181a22]/70 hover:bg-[#20232e] border border-[#2d3142] text-xs font-sans uppercase tracking-widest text-[#cfcac0] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
              title="Return to previous block"
            >
              <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
              <span>Back</span>
            </button>
          )}

          <button
            onClick={handleAdvance}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#181a22]/90 hover:bg-[#20232e] border border-[#2d3142] hover:border-[#c99a5e]/50 text-xs font-sans uppercase tracking-widest text-[#cfcac0] hover:text-white transition-all shadow-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
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

          {onAdvanceToNextScene && (
            <button
              onClick={handleSkipScene}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-full bg-transparent hover:bg-stone-900/60 border border-transparent hover:border-stone-700 text-xs font-sans text-stone-400 hover:text-stone-200 transition-all focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
              title="Skip to next scene"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Skip Scene</span>
            </button>
          )}
        </div>

        <span className="text-[11px] font-sans text-stone-500 mt-3 tracking-wider text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-mono text-[10px]">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-mono text-[10px]">Enter</kbd> to advance
        </span>

        {/* Section 7: Cross-link from Journey Mode back to Library Mode */}
        {libraryStory && (
          <div className="mt-8 pt-4 border-t border-[#232636]/60 flex items-center gap-2 text-xs font-sans text-stone-400">
            <BookOpen className="w-3.5 h-3.5 text-[#c99a5e]" />
            <span>Standalone Canonical Version:</span>
            <Link
              to={`/books/${libraryStory.bookId}/${libraryStory.storyId}`}
              className="text-[#c99a5e] hover:underline font-mono text-[11px] focus-visible:ring-1 focus-visible:ring-[#c99a5e] rounded"
            >
              Read this in the Library →
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

/**
 * Semantic HTML Block Renderer
 * Maps NarrativeBlock types to semantically accurate HTML elements:
 * - internal -> <aside> (Theo's private thoughts / internal coping)
 * - dialogue -> <blockquote> / <cite>
 * - sensory / immersion / narrative -> <p>
 */
function renderSemanticBlock(block: NarrativeBlock, isCurrent: boolean, fontSizeClass: string) {
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
        <blockquote className="my-2" cite={block.speaker}>
          <cite className="block not-italic text-[11px] font-sans uppercase tracking-widest text-[#c99a5e] mb-1 font-medium">
            {block.speaker}
          </cite>
          <p className={`${fontSizeClass} tracking-normal text-balance font-serif`}>
            {block.text}
          </p>
        </blockquote>
      );

    case "sensory":
      return (
        <p className={`${fontSizeClass} tracking-normal text-balance text-[#ded9cd]`}>
          {block.text}
        </p>
      );

    case "internal":
      return (
        <aside aria-label="Theo's internal reflection" className="my-2">
          <p className={`${fontSizeClass} tracking-normal text-balance font-serif text-[#fffbf2]`}>
            {block.text}
          </p>
        </aside>
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

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useExperienceStore } from "../../state/experienceStore";
import { useProgressStore } from "../../state/progressStore";
import { useSettingsStore } from "../../state/settingsStore";
import { useAudioStore } from "../../state/audioStore";
import { AudioManager } from "../../audio/AudioManager";
import {
  cainBloodMemory,
  josephSeparationMemory,
  mosesOverwhelmMemory,
  davidFallMemory,
  jeremiahLonelinessMemory,
  jerusalemFallMemory,
  peterDenialMemory,
  gethsemaneCrossMemory,
  samFixItMemory,
  MemoryEngine,
} from "../../narrative/MemoryEngine/MemoryEngine";
import {
  X,
  Activity,
  Layers,
  Volume2,
  Bookmark,
  Cpu,
  Compass,
  RefreshCw,
  Eye,
  Sliders,
} from "lucide-react";

export const DebugPanel: React.FC = () => {
  const navigate = useNavigate();

  const debugModeVisible = useSettingsStore((s) => s.debugModeVisible);
  const toggleDebugMode = useSettingsStore((s) => s.toggleDebugMode);
  const webglEnabled = useSettingsStore((s) => s.webglEnabled);
  const toggleWebgl = useSettingsStore((s) => s.toggleWebgl);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const toggleReducedMotion = useSettingsStore((s) => s.toggleReducedMotion);
  const fps = useSettingsStore((s) => s.fps);
  const drawCalls = useSettingsStore((s) => s.drawCalls);
  const assetLoadingStatus = useSettingsStore((s) => s.assetLoadingStatus);

  const currentSceneId = useExperienceStore((s) => s.currentSceneId);
  const currentPOV = useExperienceStore((s) => s.currentPOV);
  const currentFocus = useExperienceStore((s) => s.currentFocus);
  const activeEmotion = useExperienceStore((s) => s.activeEmotion);
  const theoAwakening = useExperienceStore((s) => s.theoAwakening);

  const storedMemories = useProgressStore((s) => s.storedMemories);
  const addMemory = useProgressStore((s) => s.addMemory);
  const clearMemories = useProgressStore((s) => s.clearMemories);

  const currentTrack = useAudioStore((s) => s.currentTrack);
  const currentAmbient = useAudioStore((s) => s.currentAmbient);
  const playbackState = useAudioStore((s) => s.playbackState);
  const lastAudioAction = useAudioStore((s) => s.lastAction);

  const handleTestSeedMemory = () => {
    addMemory(cainBloodMemory);
  };

  return (
    <AnimatePresence>
      {debugModeVisible && (
        <motion.div
          initial={{ opacity: 0, x: 380 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 380 }}
          transition={{ type: "spring", damping: 28, stiffness: 240 }}
          className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#101218]/95 backdrop-blur-md border-l border-[#262836] shadow-2xl p-6 overflow-y-auto text-[#d4d1c9] font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#262836]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#c99a5e]" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-white font-mono">
                Engine Telemetry
              </h2>
            </div>
            <button
              onClick={toggleDebugMode}
              className="p-1.5 rounded-lg hover:bg-[#1f222e] text-stone-400 hover:text-white transition-colors"
              title="Close Debug Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-5 space-y-6 text-xs">
            {/* 1. Core Scene & POV */}
            <div className="p-3.5 rounded-lg bg-[#151720] border border-[#222533]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#c99a5e]" /> Scene & POV
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1e2230] text-[#c99a5e]">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] tabular-nums">
                <div>
                  <span className="text-stone-500">Scene ID:</span>
                  <div className="text-white font-medium truncate">{currentSceneId}</div>
                </div>
                <div>
                  <span className="text-stone-500">POV State:</span>
                  <div className="text-[#c99a5e] font-semibold uppercase">{currentPOV} person</div>
                </div>
                <div>
                  <span className="text-stone-500">Focus:</span>
                  <div className="text-white capitalize">{currentFocus}</div>
                </div>
                <div>
                  <span className="text-stone-500">Assets:</span>
                  <div className="text-emerald-400 uppercase">{assetLoadingStatus}</div>
                </div>
              </div>
            </div>

            {/* 2. Emotional State Vector */}
            <div className="p-3.5 rounded-lg bg-[#151720] border border-[#222533]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#c99a5e]" /> Internal Emotion Vector
                </span>
                <span className="text-[10px] text-stone-500">0.0 – 1.0</span>
              </div>

              {currentSceneId === "collapse-fall-of-jerusalem" && (
                <div className="mb-2 p-1.5 rounded bg-[#8c362e]/20 border border-[#8c362e]/50 text-[#f29388] text-[10px] font-mono flex items-center justify-between">
                  <span>COLLAPSE TWO PEAK DETECTED</span>
                  <span className="font-bold">Overwhelm 0.99 · Grief 0.98</span>
                </div>
              )}

              {currentSceneId === "cross-crucifixion" && (
                <div className="mb-2 p-2 rounded bg-[#3c1417]/40 border border-[#8c362e] text-[#f29388] text-[10px] font-mono space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>COLLAPSE THREE (CRUCIFIXION PEAK)</span>
                    <span>Grief 0.99 · Overwhelm 0.98</span>
                  </div>
                  <div className="text-[9px] text-[#ffb0a6] border-t border-[#8c362e]/40 pt-1">
                    Compounding High-Weight Memories at Peak:
                    <div className="flex justify-between text-white font-mono mt-0.5">
                      <span>• gethsemane-cross</span>
                      <span className="text-[#f29388]">0.99 (Rank 1 Peak)</span>
                    </div>
                    <div className="flex justify-between text-stone-300 font-mono">
                      <span>• jerusalem-fall</span>
                      <span className="text-[#e08985]">0.97 (Collapse Two)</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] tabular-nums">
                {Object.entries(activeEmotion).map(([key, val]) => {
                  const isPeak =
                    (currentSceneId === "collapse-fall-of-jerusalem" || currentSceneId === "cross-crucifixion") &&
                    (key === "overwhelm" || key === "grief");
                  return (
                    <div
                      key={key}
                      className={`p-1.5 rounded border ${
                        isPeak
                          ? "bg-[#2d1214] border-[#8c362e] text-[#f29388]"
                          : "bg-[#0d0e14] border-[#1b1d28]"
                      }`}
                    >
                      <div className="text-stone-500 uppercase text-[9px] truncate">{key}</div>
                      <div className={`font-medium ${isPeak ? "text-[#ff9d91] font-bold" : "text-white"}`}>
                        {typeof val === "number" ? val.toFixed(2) : "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Performance & WebGL / 2D Toggle */}
            <div className="p-3.5 rounded-lg bg-[#151720] border border-[#222533]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#c99a5e]" /> Render & WebGL Layer
                </span>
                <span className="font-mono text-[10px] text-stone-400">
                  {fps} FPS · {drawCalls} calls
                </span>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-stone-300">Three.js WebGL:</span>
                  <button
                    onClick={toggleWebgl}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      webglEnabled
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/60"
                        : "bg-amber-950/80 text-amber-300 border border-amber-700/60"
                    }`}
                  >
                    {webglEnabled ? "ENABLED (3D)" : "DISABLED (2D Fallback Active)"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-300">Reduced Motion:</span>
                  <button
                    onClick={toggleReducedMotion}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      reducedMotion
                        ? "bg-purple-950/80 text-purple-300 border border-purple-700/60"
                        : "bg-stone-800 text-stone-400 border border-stone-700"
                    }`}
                  >
                    {reducedMotion ? "ON (Calm)" : "OFF (Normal)"}
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Audio Engine State */}
            <div className="p-3.5 rounded-lg bg-[#151720] border border-[#222533]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#c99a5e]" /> Audio Manager
                </span>
                <span className="font-mono text-[10px] text-stone-400 uppercase">{playbackState}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div>
                  <span className="text-stone-500">Track:</span>
                  <div className="text-white">{currentTrack || "none"}</div>
                </div>
                <div>
                  <span className="text-stone-500">Ambient:</span>
                  <div className="text-white">{currentAmbient || "none"}</div>
                </div>
              </div>
              <div className="mt-2 text-[10px] font-mono text-stone-500 truncate">
                Last action: <span className="text-stone-400">{lastAudioAction}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => AudioManager.crossfade("creation")}
                  className="px-2.5 py-1 rounded bg-[#1e2230] hover:bg-[#282d40] text-stone-300 text-[11px]"
                >
                  Test Crossfade
                </button>
                <button
                  onClick={() => AudioManager.playTrack("silence")}
                  className="px-2.5 py-1 rounded bg-[#1e2230] hover:bg-[#282d40] text-stone-300 text-[11px]"
                >
                  Test Silence
                </button>
              </div>
            </div>

            {/* 5. Memory Engine & LocalStorage */}
            <div className="p-3.5 rounded-lg bg-[#151720] border border-[#222533]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#c99a5e]" /> Stored Memories ({storedMemories.length})
                </span>
                <button
                  onClick={clearMemories}
                  className="text-[10px] text-stone-500 hover:text-rose-400 transition-colors"
                >
                  Clear All
                </button>
              </div>
              {storedMemories.length === 0 ? (
                <div className="text-stone-500 py-2 italic font-serif">
                  No memories formed yet. (Seed or reach Cain & Abel field)
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  {storedMemories.map((mem) => (
                    <div
                      key={mem.id}
                      className="p-2 rounded bg-[#0d0e14] border border-[#1e2230] text-[11px] font-mono"
                    >
                      <div className="flex justify-between items-center text-[#c99a5e] font-semibold">
                        <span>{mem.id}</span>
                        <span className="text-[10px] text-stone-400">wt: {mem.emotionalWeight}</span>
                      </div>
                      <div className="text-stone-500 text-[10px] mt-0.5">{mem.sourceScene}</div>
                      <div className="text-[10px] text-stone-400 mt-1">
                        tags: {mem.triggerTags.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3 space-y-1.5">
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                  Seed Memories (Phases 1, 2, 3 & 4):
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={handleTestSeedMemory}
                    className="p-1.5 rounded bg-[#1b2030] hover:bg-[#252b42] text-[#c99a5e] text-[10px] font-mono transition-colors text-left"
                  >
                    + cain-blood (0.92)
                  </button>
                  <button
                    onClick={() => addMemory(josephSeparationMemory)}
                    className="p-1.5 rounded bg-[#1b2030] hover:bg-[#252b42] text-[#c99a5e] text-[10px] font-mono transition-colors text-left"
                  >
                    + joseph-separation (0.88)
                  </button>
                  <button
                    onClick={() => addMemory(mosesOverwhelmMemory)}
                    className="p-1.5 rounded bg-[#1b2030] hover:bg-[#252b42] text-[#c99a5e] text-[10px] font-mono transition-colors text-left"
                  >
                    + moses-overwhelm (0.75)
                  </button>
                  <button
                    onClick={() => addMemory(davidFallMemory)}
                    className="p-1.5 rounded bg-[#1b2030] hover:bg-[#252b42] text-[#c99a5e] text-[10px] font-mono transition-colors text-left"
                  >
                    + david-fall (0.85)
                  </button>
                  <button
                    onClick={() => addMemory(jeremiahLonelinessMemory)}
                    className="p-1.5 rounded bg-[#1b2030] hover:bg-[#252b42] text-[#c99a5e] text-[10px] font-mono transition-colors text-left"
                  >
                    + jeremiah-loneliness (0.70)
                  </button>
                  <button
                    onClick={() => addMemory(jerusalemFallMemory)}
                    className="p-1.5 rounded bg-[#351518] hover:bg-[#461b20] text-[#f29388] text-[10px] font-mono font-bold transition-colors text-left"
                  >
                    + jerusalem-fall (0.97)
                  </button>
                  <button
                    onClick={() => addMemory(peterDenialMemory)}
                    className="p-1.5 rounded bg-[#201525] hover:bg-[#2e1d35] text-[#d4a8e8] text-[10px] font-mono transition-colors text-left"
                  >
                    + peter-denial (0.90)
                  </button>
                  <button
                    onClick={() => addMemory(gethsemaneCrossMemory)}
                    className="p-1.5 rounded bg-[#481216] hover:bg-[#5e181e] text-[#ffa399] text-[10px] font-mono font-bold transition-colors text-left border border-[#8c362e]"
                  >
                    + gethsemane-cross (0.99) ★
                  </button>
                  <button
                    onClick={() => addMemory(samFixItMemory)}
                    className="col-span-2 p-1.5 rounded bg-[#18232c] hover:bg-[#223340] text-[#8dd4ef] text-[10px] font-mono transition-colors text-left border border-[#2b4c60]"
                  >
                    + sam-fix-it (0.55 · Pre-Mountain Retrofit)
                  </button>
                </div>
                <button
                  onClick={() => {
                    addMemory(cainBloodMemory);
                    addMemory(josephSeparationMemory);
                    addMemory(mosesOverwhelmMemory);
                    addMemory(davidFallMemory);
                    addMemory(jeremiahLonelinessMemory);
                    addMemory(jerusalemFallMemory);
                    addMemory(peterDenialMemory);
                    addMemory(gethsemaneCrossMemory);
                    addMemory(samFixItMemory);
                  }}
                  className="w-full mt-2 py-1.5 rounded bg-[#252a3d] hover:bg-[#323952] text-[#c99a5e] text-[10px] font-mono font-semibold uppercase tracking-wider transition-colors border border-[#3b4360]"
                >
                  ⚡ Seed All 8 Canonical Memories + Sam Retrofit
                </button>

                {/* Section 3 Requirement: Query sort order test widgets */}
                <div className="mt-3 p-2 rounded bg-[#0b0c12] border border-[#1e2230] text-[10px] font-mono">
                  <div className="text-stone-400 font-semibold mb-1 flex items-center justify-between">
                    <span>Query: ['helplessness', 'cannot-save']</span>
                    <span className="text-[9px] text-[#c99a5e]">Sort: Desc Weight</span>
                  </div>
                  {(() => {
                    const results = MemoryEngine.findByTags(["helplessness", "cannot-save"]);
                    if (results.length === 0) {
                      return (
                        <div className="text-stone-500 italic">
                          No matching memories. Seed gethsemane-cross or reach the Cross.
                        </div>
                      );
                    }
                    return (
                      <div className="space-y-1">
                        {results.map((r, i) => (
                          <div
                            key={r.id}
                            className={`flex justify-between items-center px-1.5 py-0.5 rounded ${
                              i === 0 ? "bg-[#381518] text-[#f29388] font-bold" : "text-stone-400"
                            }`}
                          >
                            <span>#{i + 1} {r.id}</span>
                            <span>weight: {r.emotionalWeight} {i === 0 && "(Peak 0.99)"}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                <div className="mt-2 p-2 rounded bg-[#0b0c12] border border-[#1e2230] text-[10px] font-mono">
                  <div className="text-stone-400 font-semibold mb-1 flex items-center justify-between">
                    <span>Query: ['control', 'fixing'] (Sam Retrofit)</span>
                    <span className="text-[9px] text-[#8dd4ef]">Fires in Rev 6</span>
                  </div>
                  {(() => {
                    const results = MemoryEngine.findByTags(["control", "fixing"]);
                    if (results.length === 0) {
                      return (
                        <div className="text-stone-500 italic">
                          No matching memories. Seed sam-fix-it.
                        </div>
                      );
                    }
                    return (
                      <div className="space-y-1">
                        {results.map((r, i) => (
                          <div
                            key={r.id}
                            className="flex justify-between items-center px-1.5 py-0.5 rounded bg-[#13222e] text-[#a5e2f7]"
                          >
                            <span>#{i + 1} {r.id}</span>
                            <span>weight: {r.emotionalWeight}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* 6. Awakening Theo State */}
            <div className="p-3.5 rounded-lg bg-[#151720] border border-[#222533]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#c99a5e]" /> Theo Behavioral State
                </span>
                <span className="text-[9px] font-mono text-stone-500">
                  expComplete: {String(useProgressStore.getState().experienceComplete)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div>
                  <span className="text-stone-500">Understands All:</span>
                  <div className={theoAwakening.understandsEverything ? "text-emerald-400" : "text-stone-400"}>
                    {String(theoAwakening.understandsEverything)}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500">Still Questions:</span>
                  <div className={theoAwakening.stillQuestions ? "text-emerald-400" : "text-stone-400"}>
                    {String(theoAwakening.stillQuestions)}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500">Trust Changed:</span>
                  <div className={theoAwakening.trustChanged ? "text-emerald-400" : "text-stone-400"}>
                    {String(theoAwakening.trustChanged)}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500">Control Reduced:</span>
                  <div className={theoAwakening.controlInstinctReduced ? "text-emerald-400" : "text-stone-400"}>
                    {String(theoAwakening.controlInstinctReduced)}
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Scene Navigation Shortcuts */}
            <div className="p-3.5 rounded-lg bg-[#151720] border border-[#222533]">
              <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] block mb-2">
                Genesis Route Jumps
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <button
                  onClick={() => navigate("/")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  / (Landing)
                </button>
                <button
                  onClick={() => navigate("/begin")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /begin (Theo)
                </button>
                <button
                  onClick={() => navigate("/experience/mountain")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /mountain
                </button>
                <button
                  onClick={() => navigate("/experience/genesis/creation")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /creation
                </button>
                <button
                  onClick={() => navigate("/experience/genesis/eden")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /eden
                </button>
                <button
                  onClick={() => navigate("/experience/genesis/cain-and-abel")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /cain-abel
                </button>
                <button
                  onClick={() => navigate("/experience/genesis/flood")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /flood
                </button>
                <button
                  onClick={() => navigate("/experience/genesis/babel")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /babel
                </button>
                <button
                  onClick={() => navigate("/experience/genesis/abraham")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /abraham
                </button>
                <button
                  onClick={() => navigate("/experience/genesis/jacob")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /jacob
                </button>
                <button
                  onClick={() => navigate("/experience/genesis/joseph")}
                  className="col-span-2 p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-[#c99a5e] font-semibold truncate"
                >
                  /joseph (Pit & Caravan)
                </button>
              </div>

              <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Exodus Route Jumps
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <button
                  onClick={() => navigate("/experience/exodus/moses")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /exodus/moses
                </button>
                <button
                  onClick={() => navigate("/experience/exodus/plagues")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /exodus/plagues
                </button>
                <button
                  onClick={() => navigate("/experience/exodus/red-sea")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-[#7aa3be] font-semibold truncate"
                >
                  /exodus/red-sea
                </button>
                <button
                  onClick={() => navigate("/experience/exodus/sinai")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  /exodus/sinai
                </button>
                <button
                  onClick={() => navigate("/experience/exodus/wilderness")}
                  className="col-span-2 p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-[#c99a5e] font-semibold truncate"
                >
                  /exodus/wilderness
                </button>
              </div>

              {/* Kingdom Era (Phase 3) */}
              <span className="font-mono text-[#c99a5e] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Kingdom Era Route Jumps (15)
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/kingdom/joshua-jericho")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  1. /kingdom/joshua-jericho
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/judges")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  2. /kingdom/judges
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/ruth")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  3. /kingdom/ruth
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/samuel")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  4. /kingdom/samuel
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/saul")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  5. /kingdom/saul
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/david-goliath")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  6. /kingdom/david-goliath
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/david-jonathan")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  7. /kingdom/david-jonathan
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/david-saul")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  8. /kingdom/david-saul
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/david-bathsheba")}
                  className="p-1.5 rounded bg-[#201518] hover:bg-[#2e1d23] text-left text-[#e08985] font-semibold truncate"
                >
                  9. /david-bathsheba (Memory)
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/solomon")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  10. /kingdom/solomon
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/the-temple")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  11. /kingdom/the-temple
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/elijah")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  12. /kingdom/elijah
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/elisha")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  13. /kingdom/elisha
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/divided-kingdom")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  14. /kingdom/divided
                </button>
                <button
                  onClick={() => navigate("/experience/kingdom/isaiah")}
                  className="col-span-2 p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-[#c99a5e] font-semibold truncate"
                >
                  15. /kingdom/isaiah
                </button>
              </div>

              {/* Exile Era (Phase 3) */}
              <span className="font-mono text-[#f29388] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Exile Era Route Jumps (Collapse Two)
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/exile/jeremiah")}
                  className="p-1.5 rounded bg-[#1e1714] hover:bg-[#2d221d] text-left text-[#c99a5e] font-semibold truncate"
                >
                  16. /exile/jeremiah (Memory)
                </button>
                <button
                  onClick={() => navigate("/experience/exile/fall-of-jerusalem")}
                  className="p-1.5 rounded bg-[#351518] hover:bg-[#4a1c21] text-left text-[#f29388] font-bold border border-[#8c362e]/60 truncate"
                >
                  17. COLLAPSE TWO (Jerusalem)
                </button>
                <button
                  onClick={() => navigate("/experience/exile/daniel")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  18. /exile/daniel
                </button>
                <button
                  onClick={() => navigate("/experience/exile/esther")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  19. /exile/esther
                </button>
                <button
                  onClick={() => navigate("/experience/exile/job")}
                  className="col-span-2 p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  20. /exile/job
                </button>
              </div>

              {/* Restoration Era (Phase 3) */}
              <span className="font-mono text-[#7aa3be] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Restoration Era Route Jumps (3)
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/restoration/return")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  21. /restoration/return
                </button>
                <button
                  onClick={() => navigate("/experience/restoration/ezra-nehemiah")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  22. /restoration/ezra-nehemiah
                </button>
                <button
                  onClick={() => navigate("/experience/restoration/the-silence")}
                  className="col-span-2 p-1.5 rounded bg-[#131b26] hover:bg-[#1a2536] text-left text-[#aed8f2] font-semibold truncate"
                >
                  23. /restoration/the-silence (Bridge to Phase 4)
                </button>
              </div>

              {/* Gospel Arc (Phase 4) */}
              <span className="font-mono text-[#e5c18a] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Phase 4 — Gospel Route Jumps (8)
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/gospels/first-sight")}
                  className="p-1.5 rounded bg-[#161a22] hover:bg-[#202735] text-left text-[#e5c18a] font-semibold truncate"
                >
                  1. /gospels/first-sight
                </button>
                <button
                  onClick={() => navigate("/experience/gospels/ordinary-people")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  2. /gospels/ordinary-people
                </button>
                <button
                  onClick={() => navigate("/experience/gospels/sermon-on-the-mount")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  3. /sermon-on-the-mount
                </button>
                <button
                  onClick={() => navigate("/experience/gospels/the-miracles")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  4. /gospels/the-miracles
                </button>
                <button
                  onClick={() => navigate("/experience/gospels/the-disciples")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  5. /gospels/the-disciples
                </button>
                <button
                  onClick={() => navigate("/experience/gospels/peters-confession")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  6. /peters-confession
                </button>
                <button
                  onClick={() => navigate("/experience/gospels/theos-intervention")}
                  className="col-span-2 p-1.5 rounded bg-[#2e181c] hover:bg-[#3f2227] text-left text-[#f29388] font-semibold border border-[#8c362e]/50 truncate"
                >
                  7. /theos-intervention (Hinge Scene)
                </button>
                <button
                  onClick={() => navigate("/experience/gospels/triumphal-entry")}
                  className="col-span-2 p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  8. /triumphal-entry
                </button>
              </div>

              {/* Passion & Cross Arc (Phase 4 — Collapse Three) */}
              <span className="font-mono text-[#ff8d82] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Phase 4 — Passion & Cross (Collapse Three)
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/cross/gethsemane")}
                  className="p-1.5 rounded bg-[#18131d] hover:bg-[#251e2d] text-left text-[#d4a8e8] truncate"
                >
                  9. /cross/gethsemane
                </button>
                <button
                  onClick={() => navigate("/experience/cross/arrest")}
                  className="p-1.5 rounded bg-[#1e1518] hover:bg-[#2b1f23] text-left text-stone-300 truncate"
                >
                  10. /cross/arrest
                </button>
                <button
                  onClick={() => navigate("/experience/cross/peter-denial")}
                  className="p-1.5 rounded bg-[#2a171d] hover:bg-[#3d212a] text-left text-[#f29388] font-semibold truncate"
                >
                  11. /peter-denial (Memory)
                </button>
                <button
                  onClick={() => navigate("/experience/cross/trial")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  12. /cross/trial
                </button>
                <button
                  onClick={() => navigate("/experience/cross/crucifixion")}
                  className="col-span-2 p-2 rounded bg-[#481216] hover:bg-[#60181e] text-left text-[#ff9990] font-bold border border-[#a83232] truncate"
                >
                  13. /cross/crucifixion (Collapse Three — Stillness)
                </button>
              </div>

              {/* Resurrection Arc (Phase 4) */}
              <span className="font-mono text-[#8dd4c0] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Phase 4 — Resurrection & Restoration
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/gospels/empty-tomb")}
                  className="p-1.5 rounded bg-[#111f20] hover:bg-[#182e30] text-left text-[#a8ede0] font-semibold truncate"
                >
                  14. /empty-tomb
                </button>
                <button
                  onClick={() => navigate("/experience/gospels/resurrection-appearances")}
                  className="p-1.5 rounded bg-[#172624] hover:bg-[#213734] text-left text-[#b5f2e6] font-semibold truncate"
                >
                  15. /resurrection-appearances
                </button>
              </div>

              {/* Phase 5: Acts Arc (4 Episodes) */}
              <span className="font-mono text-[#a5d6a7] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Phase 5 — Acts Arc (4)
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/acts/pentecost")}
                  className="p-1.5 rounded bg-[#15231c] hover:bg-[#1e3328] text-left text-[#b9f6ca] font-semibold truncate"
                >
                  1. /acts/pentecost
                </button>
                <button
                  onClick={() => navigate("/experience/acts/early-church")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  2. /acts/early-church
                </button>
                <button
                  onClick={() => navigate("/experience/acts/stephen")}
                  className="p-1.5 rounded bg-[#201d16] hover:bg-[#302a20] text-left text-[#ffe082] font-semibold truncate"
                >
                  3. /acts/stephen (Grief+Accept)
                </button>
                <button
                  onClick={() => navigate("/experience/acts/paul")}
                  className="p-1.5 rounded bg-[#0e1017] hover:bg-[#1a1d29] text-left text-stone-300 truncate"
                >
                  4. /acts/paul (David/Joseph)
                </button>
              </div>

              {/* Phase 5: Revelation Arc (3 Episodes) */}
              <span className="font-mono text-[#b39ddb] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Phase 5 — Revelation Arc (3)
              </span>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/revelation/begins")}
                  className="p-1.5 rounded bg-[#1a1727] hover:bg-[#26213b] text-left text-[#d1c4e9] truncate"
                >
                  5. /revelation/begins
                </button>
                <button
                  onClick={() => navigate("/experience/revelation/theo-understands")}
                  className="p-1.5 rounded bg-[#1e2332] hover:bg-[#2b3348] text-left text-[#90caf9] font-semibold truncate"
                >
                  6. /theo-understands (Sam Mem)
                </button>
                <button
                  onClick={() => navigate("/experience/revelation/final-vision")}
                  className="col-span-2 p-1.5 rounded bg-[#1c2438] hover:bg-[#283552] text-left text-[#bbdefb] font-bold border border-[#3949ab]/40 truncate"
                >
                  7. /revelation/final-vision (Gethsemane Mem)
                </button>
              </div>

              {/* Phase 5: The Full Wake-Up */}
              <span className="font-mono text-[#ffcc80] uppercase tracking-wider text-[11px] block mt-4 mb-2">
                Phase 5 — The Full Wake-Up
              </span>
              <div className="grid grid-cols-1 gap-1.5 font-mono text-[10px]">
                <button
                  onClick={() => navigate("/experience/awakening/full")}
                  className="p-2 rounded bg-[#332214] hover:bg-[#48301c] text-left text-[#ffe0b2] font-bold border border-[#c99a5e]/50 truncate"
                >
                  ★ /experience/awakening/full (8:47 PM · State Machine)
                </button>
                <button
                  onClick={() => navigate("/experience/awakening")}
                  className="p-1.5 rounded bg-[#141620] hover:bg-[#1f2233] text-left text-stone-400 truncate"
                >
                  /experience/awakening (Dev Route)
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

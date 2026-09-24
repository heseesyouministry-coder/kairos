import React, { useState } from "react";
import { allScenes } from "../../content/allScenes";
import { LibraryEngine } from "../../narrative/LibraryEngine/LibraryEngine";
import { NarrativeBlock } from "../../narrative/types";
import { ALL_LIBRARY_STORIES } from "../../content/library/storiesData";
import { Link } from "react-router-dom";
import { BookOpen, Compass, CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";

interface LibraryDiffInspectorProps {
  currentSceneId?: string;
}

export const LibraryDiffInspector: React.FC<LibraryDiffInspectorProps> = ({
  currentSceneId = "cain-abel-offering",
}) => {
  const [selectedSceneId, setSelectedSceneId] = useState<string>(currentSceneId);
  const [viewMode, setViewMode] = useState<"highlight" | "columns">("highlight");

  const scene = allScenes[selectedSceneId] || allScenes["cain-abel-offering"];
  const libraryBlocks = scene ? LibraryEngine.toLibraryView(scene) : [];
  const stats = scene ? LibraryEngine.getSceneStats(scene) : null;

  // Check if there's a library story view for this scene
  const libraryStory = ALL_LIBRARY_STORIES.find(
    (s) => s.sceneId === selectedSceneId || (s.subSceneIds && s.subSceneIds.includes(selectedSceneId))
  );

  if (!scene || !stats) {
    return (
      <div className="p-3 text-stone-500 font-mono text-xs">
        No scene data found for diff inspector.
      </div>
    );
  }

  const allSceneKeys = Object.keys(allScenes);

  return (
    <div className="p-4 rounded-xl bg-[#12141c] border border-[#222533] space-y-4 text-xs font-sans">
      {/* Header & Scene Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#212433] pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#c99a5e]" />
          <span className="font-mono text-white font-semibold uppercase tracking-wider text-[11px]">
            Library Mode Filter Inspector
          </span>
        </div>

        <select
          value={selectedSceneId}
          onChange={(e) => setSelectedSceneId(e.target.value)}
          className="bg-[#181a24] border border-[#2c3042] text-stone-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#c99a5e]"
        >
          {allSceneKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Telemetry metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
        <div className="p-2 rounded bg-[#161822] border border-[#252838]">
          <span className="text-stone-500 block">Journey Blocks</span>
          <strong className="text-white text-sm">{stats.journeyBlocksCount}</strong>
        </div>
        <div className="p-2 rounded bg-[#161822] border border-[#252838]">
          <span className="text-stone-500 block">Library Blocks</span>
          <strong className="text-emerald-400 text-sm">{stats.libraryBlocksCount}</strong>
        </div>
        <div className="p-2 rounded bg-[#161822] border border-[#252838]">
          <span className="text-stone-500 block">Stripped Blocks</span>
          <strong className="text-rose-400 text-sm">{stats.strippedBlocksCount}</strong>
        </div>
        <div className="p-2 rounded bg-[#161822] border border-[#252838]">
          <span className="text-stone-500 block">Internal Monologues</span>
          <strong className="text-amber-400 text-sm">{stats.internalBlocksRemoved}</strong>
        </div>
      </div>

      {/* Navigation shortcuts */}
      <div className="flex items-center justify-between gap-2 pt-1 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("highlight")}
            className={`px-2 py-1 rounded text-[10px] font-mono uppercase ${
              viewMode === "highlight"
                ? "bg-[#25293c] text-white"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            Inline Diff
          </button>
          <button
            onClick={() => setViewMode("columns")}
            className={`px-2 py-1 rounded text-[10px] font-mono uppercase ${
              viewMode === "columns"
                ? "bg-[#25293c] text-white"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            Dual Columns
          </button>
        </div>

        {libraryStory && (
          <Link
            to={`/books/${libraryStory.bookId}/${libraryStory.storyId}`}
            className="text-[11px] font-mono text-[#c99a5e] hover:underline flex items-center gap-1"
          >
            <span>Open in Library</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      {/* Visual Diff rendering */}
      {viewMode === "highlight" ? (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {scene.narrative.map((block, idx) => {
            const isInternal = block.type === "internal";
            const isTheoCue =
              block.type === "sceneCue" && block.cue.toLowerCase().includes("theo");
            const isTransitionCue = block.type === "transitionCue";
            const isStripped = isInternal || isTheoCue || isTransitionCue;

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs leading-relaxed transition-all ${
                  isStripped
                    ? "bg-rose-950/20 border-rose-800/40 text-rose-200/70 line-through opacity-75"
                    : "bg-[#161824] border-[#25283a] text-stone-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1 no-underline font-mono text-[10px]">
                  <span className="flex items-center gap-1.5">
                    {isStripped ? (
                      <XCircle className="w-3 h-3 text-rose-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    )}
                    <span className="uppercase font-semibold">
                      {isStripped ? "Stripped" : "Preserved"}: {block.type}
                    </span>
                  </span>

                  {isInternal && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-900/40 text-rose-300 text-[9px] uppercase">
                      Theo Coping Thought
                    </span>
                  )}
                  {isTheoCue && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-300 text-[9px] uppercase">
                      Theo Journey Cue
                    </span>
                  )}
                </div>

                <div className="font-serif">
                  {"text" in block && block.text}
                  {block.type === "sceneCue" && block.cue}
                  {block.type === "transitionCue" && `Transition to: ${block.to}`}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Dual column comparison */
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1 text-[11px]">
          {/* Column 1: Journey Mode */}
          <div className="space-y-2">
            <div className="sticky top-0 bg-[#12141c] py-1 border-b border-[#212433] font-mono text-[10px] uppercase text-stone-400 font-semibold">
              Journey Mode ({stats.journeyBlocksCount} blocks)
            </div>
            {scene.narrative.map((block, idx) => (
              <div
                key={idx}
                className={`p-2 rounded border ${
                  block.type === "internal"
                    ? "bg-amber-950/30 border-amber-800/50 text-amber-200"
                    : "bg-[#151722] border-[#222534] text-stone-300"
                }`}
              >
                <span className="text-[9px] font-mono uppercase text-stone-500 block mb-0.5">
                  [{block.type}]
                </span>
                <p className="font-serif line-clamp-3">
                  {"text" in block && block.text}
                  {block.type === "sceneCue" && block.cue}
                </p>
              </div>
            ))}
          </div>

          {/* Column 2: Library Mode */}
          <div className="space-y-2">
            <div className="sticky top-0 bg-[#12141c] py-1 border-b border-[#212433] font-mono text-[10px] uppercase text-emerald-400 font-semibold">
              Library Mode ({stats.libraryBlocksCount} blocks)
            </div>
            {libraryBlocks.map((block, idx) => (
              <div
                key={idx}
                className="p-2 rounded border bg-[#151722] border-[#222534] text-stone-300"
              >
                <span className="text-[9px] font-mono uppercase text-emerald-400/80 block mb-0.5">
                  [{block.type}]
                </span>
                <p className="font-serif line-clamp-3">
                  {"text" in block && block.text}
                  {block.type === "sceneCue" && block.cue}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

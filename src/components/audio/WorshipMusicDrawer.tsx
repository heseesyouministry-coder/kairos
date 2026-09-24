import React, { useState } from "react";
import { useWorshipStore } from "../../state/worshipStore";
import { WORSHIP_CATALOG } from "../../audio/worship/worshipCatalog";
import { WorshipTrack, MusicCollection, MusicCatalogType } from "../../audio/worship/types";
import { MusicDirector } from "../../audio/worship/MusicDirector";
import { resumeAudioContext } from "../../audio/audioContext";
import {
  X,
  Volume2,
  VolumeX,
  Headphones,
  BookOpen,
  Sparkles,
  Info,
  Play,
  Pause,
  ExternalLink,
} from "lucide-react";

export const WorshipMusicDrawer: React.FC = () => {
  const showMusicDrawer = useWorshipStore((s) => s.showMusicDrawer);
  const toggleMusicDrawer = useWorshipStore((s) => s.toggleMusicDrawer);
  const currentTrack = useWorshipStore((s) => s.currentTrack);
  const currentMode = useWorshipStore((s) => s.currentMode);
  const isPlaying = useWorshipStore((s) => s.isPlaying);
  const isMuted = useWorshipStore((s) => s.isMuted);
  const isSilence = useWorshipStore((s) => s.isSilence);
  const silenceReason = useWorshipStore((s) => s.silenceReason);
  const duckingRatio = useWorshipStore((s) => s.duckingRatio);
  const masterVolume = useWorshipStore((s) => s.masterVolume);
  const isFallbackActive = useWorshipStore((s) => s.isFallbackActive);

  const [selectedCatalog, setSelectedCatalog] = useState<MusicCatalogType | "all">("all");
  const [selectedCollection, setSelectedCollection] = useState<MusicCollection | "ALL">("ALL");

  if (!showMusicDrawer) return null;

  const filteredTracks = WORSHIP_CATALOG.filter((track) => {
    if (selectedCatalog !== "all" && track.catalog !== selectedCatalog) return false;
    if (selectedCollection !== "ALL" && track.collection !== selectedCollection) return false;
    return true;
  });

  const collections: (MusicCollection | "ALL")[] = [
    "ALL",
    "STILL",
    "WONDER",
    "JOURNEY",
    "LAMENT",
    "PRESENCE",
    "HOPE",
    "TRUST",
  ];

  return (
    <>
      {/* Backdrop overlay to close on outside click */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={toggleMusicDrawer}
        aria-hidden="true"
      />

      <aside
        aria-label="Worship Soundtrack & Narrative Audio Architecture"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-lg h-full max-h-screen overflow-hidden bg-[#0e1017]/95 backdrop-blur-xl border-l border-[#212433] shadow-2xl flex flex-col transition-all duration-300 animate-in slide-in-from-right"
      >
        {/* Header */}
        <div className="shrink-0 p-5 border-b border-[#212433] flex items-center justify-between bg-[#10121a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c99a5e]/15 border border-[#c99a5e]/30 flex items-center justify-center text-[#c99a5e] shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-base tracking-wider text-white">
                The Living Word Soundtrack
              </h2>
              <p className="text-[11px] font-sans text-stone-400">
                First-class narrative worship & meditation architecture
              </p>
            </div>
          </div>

          <button
            onClick={toggleMusicDrawer}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-[#1a1c26] transition-colors focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
            aria-label="Close worship music drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative Music Status & Ducking Bar */}
        <div className="shrink-0 p-4 bg-[#141722] border-b border-[#212433] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 font-sans flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c99a5e]" />
              Now Scoring:
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                isSilence
                  ? "bg-stone-800 text-stone-400 border border-stone-700"
                  : currentMode === "worship"
                  ? "bg-amber-950/60 text-amber-300 border border-amber-600/50"
                  : currentMode === "immersion"
                  ? "bg-indigo-950/60 text-indigo-300 border border-indigo-600/50"
                  : "bg-emerald-950/60 text-emerald-300 border border-emerald-600/50"
              }`}
            >
              {isSilence ? "Silence Track" : `Mode: ${currentMode}`}
            </span>
          </div>

          {isSilence ? (
            <div className="p-2.5 rounded bg-[#10121a] border border-[#232635] text-xs font-serif text-stone-300 italic">
              "{silenceReason || "Deliberate narrative silence. The absence of music speaks."}"
            </div>
          ) : currentTrack ? (
            <div className="p-3 rounded-lg bg-[#10121a] border border-[#232635] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white line-clamp-1">
                    {currentTrack.title}
                  </div>
                  <div className="text-xs text-[#c99a5e] font-sans">
                    {currentTrack.artist}
                  </div>
                </div>
                <button
                  onClick={() => MusicDirector.toggleMute()}
                  className="p-2 rounded bg-[#191c28] hover:bg-[#232738] text-stone-300 transition-colors focus-visible:ring-2 focus-visible:ring-[#c99a5e]"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-[#c99a5e]" />}
                </button>
              </div>

              {/* Dynamic narrative ducking indicator */}
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 border-t border-[#1c1f2d] pt-2">
                <span>Narrative Ducking:</span>
                <span className="text-[#c99a5e]">{Math.round(duckingRatio * 100)}% dynamic level</span>
              </div>

              <p className="text-[11px] font-serif text-stone-400 leading-relaxed italic">
                {currentTrack.theologicalContext}
              </p>
            </div>
          ) : (
            <div className="text-xs font-serif text-stone-500 italic">
              Waiting for next narrative music cue...
            </div>
          )}

          {isFallbackActive && (
            <div className="text-[11px] font-sans text-amber-400/90 bg-amber-950/20 border border-amber-900/40 p-2 rounded">
              SoundCloud streaming active with smooth volume ducking.
            </div>
          )}

          {/* Master Volume Slider */}
          <div className="flex items-center gap-3 pt-1">
            <Volume2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={masterVolume}
              onChange={(e) => MusicDirector.setMasterVolume(parseFloat(e.target.value))}
              className="w-full accent-[#c99a5e] h-1.5 bg-[#212433] rounded-lg cursor-pointer"
              aria-label="Master soundtrack volume"
            />
            <span className="font-mono text-[11px] text-stone-400 w-8 text-right shrink-0">
              {Math.round(masterVolume * 100)}%
            </span>
          </div>
        </div>

        {/* Catalog & Collection Tabs */}
        <div className="shrink-0 p-4 border-b border-[#212433] space-y-3 bg-[#0e1017]">
          {/* Catalog Selector: Reading vs Story */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#141722] border border-[#212433] text-xs">
            <button
              onClick={() => setSelectedCatalog("all")}
              className={`py-1.5 rounded text-center transition-all ${
                selectedCatalog === "all"
                  ? "bg-[#c99a5e] text-stone-950 font-medium shadow"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              All Music
            </button>
            <button
              onClick={() => setSelectedCatalog("reading")}
              className={`py-1.5 rounded text-center transition-all flex items-center justify-center gap-1 ${
                selectedCatalog === "reading"
                  ? "bg-[#c99a5e] text-stone-950 font-medium shadow"
                  : "text-stone-400 hover:text-white"
              }`}
              title="Instrumental worship for reading passages"
            >
              <BookOpen className="w-3 h-3" />
              <span>Reading Library</span>
            </button>
            <button
              onClick={() => setSelectedCatalog("story")}
              className={`py-1.5 rounded text-center transition-all flex items-center justify-center gap-1 ${
                selectedCatalog === "story"
                  ? "bg-[#c99a5e] text-stone-950 font-medium shadow"
                  : "text-stone-400 hover:text-white"
              }`}
              title="Vocal worship peaks for emotional climaxes"
            >
              <Sparkles className="w-3 h-3" />
              <span>Story Peaks</span>
            </button>
          </div>

          {/* Collections filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono no-scrollbar">
            {collections.map((col) => (
              <button
                key={col}
                onClick={() => setSelectedCollection(col)}
                className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                  selectedCollection === col
                    ? "bg-[#252837] text-white border border-[#c99a5e]/50 font-semibold"
                    : "text-stone-400 hover:text-stone-200 bg-[#12141c]"
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks List - Constrained with min-h-0 and custom styled scrollbar */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-2.5 [scrollbar-width:thin] [scrollbar-color:#c99a5e_#141622]">
          {filteredTracks.map((track) => {
            const isCurrent = currentTrack?.id === track.id && !isSilence;
            return (
              <div
                key={track.id}
                className={`p-3 rounded-lg border transition-all ${
                  isCurrent
                    ? "bg-[#181c28] border-[#c99a5e]/60 shadow-md"
                    : "bg-[#11131b] border-[#1d202d] hover:border-[#2b2f42]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white truncate">
                        {track.title}
                      </span>
                      {track.isInstrumental && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-300 text-[9px] font-mono">
                          Instrumental
                        </span>
                      )}
                      {track.isVocal && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 text-[9px] font-mono">
                          Vocal Peak
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#c99a5e] mt-0.5">
                      {track.artist} · <span className="text-stone-500">{track.collection}</span>
                    </div>

                    <p className="text-[11px] font-sans text-stone-400 mt-1 line-clamp-2">
                      {track.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      resumeAudioContext().catch(() => {});
                      if (isCurrent && isPlaying) {
                        MusicDirector.togglePlayPause();
                      } else {
                        MusicDirector.playTrackById(track.id);
                      }
                    }}
                    className={`p-2 rounded-full shrink-0 transition-colors ${
                      isCurrent
                        ? "bg-[#c99a5e] text-stone-950"
                        : "bg-[#1a1d29] hover:bg-[#262a3c] text-stone-300"
                    }`}
                    aria-label={`Play ${track.title}`}
                  >
                    {isCurrent && isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#1c1f2d] flex items-center justify-between text-[10px] text-stone-500 font-mono">
                  <span>{track.chapterTags.slice(0, 2).join(", ")}</span>
                  <a
                    href={track.soundcloudUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#c99a5e] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>SoundCloud Track</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer / Philosophy note */}
        <div className="shrink-0 p-4 border-t border-[#212433] bg-[#0c0d12] text-[11px] text-stone-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#c99a5e] shrink-0" />
          <span>
            Music does not decorate the Bible. It functions as an emotional narrator that never speaks.
          </span>
        </div>
      </aside>
    </>
  );
};

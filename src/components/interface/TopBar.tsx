import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAudioStore } from "../../state/audioStore";
import { useSettingsStore } from "../../state/settingsStore";
import { AudioManager } from "../../audio/AudioManager";
import { MusicDirector } from "../../audio/worship/MusicDirector";
import { resumeAudioContext } from "../../audio/audioContext";
import { useWorshipStore } from "../../state/worshipStore";
import { Volume2, VolumeX, SlidersHorizontal, FileText, Sparkles, Compass } from "lucide-react";
import { useNavigatorStore } from "../../state/navigatorStore";

export const TopBar: React.FC = () => {
  const location = useLocation();
  const audioEnabled = useAudioStore((s) => s.audioEnabled);
  const isWorshipMuted = useWorshipStore((s) => s.isMuted);
  const toggleDebugMode = useSettingsStore((s) => s.toggleDebugMode);
  const debugModeVisible = useSettingsStore((s) => s.debugModeVisible);
  const readerMode = useSettingsStore((s) => s.readerMode);
  const toggleReaderMode = useSettingsStore((s) => s.toggleReaderMode);
  const openNavigator = useNavigatorStore((s) => s.openNavigator);

  // Strict env flag gating for dev/scaffolding modes (Phase 8, Section 2)
  // Dev tools are completely stripped from client UI unless explicitly enabled via VITE_ENABLE_DEV_MODE
  const isDevModeActive =
    typeof window !== "undefined" &&
    (import.meta.env.VITE_ENABLE_DEV_MODE === "true" ||
      new URLSearchParams(window.location.search).get("debug") === "kairos");

  // Gate the entire top bar on the landing screen ("/")
  // Per requirements: The landing screen must only show Title, Premise line, and One CTA
  if (location.pathname === "/") {
    return null;
  }

  const isEffectivelyActive = audioEnabled && !isWorshipMuted;

  const handleAudioToggle = () => {
    resumeAudioContext().catch(() => {});
    AudioManager.toggleMute();
    if (isWorshipMuted !== !audioEnabled) {
      MusicDirector.toggleMute();
    }
  };

  // Nav links: Only discoverable once the reader has begun (past /).
  const navLinks = [
    { label: "Prologue", path: "/begin" },
    { label: "Chronicles", path: "/chronicles" },
    { label: "Library", path: "/books" },
    { label: "Figures", path: "/characters" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-16 px-6 md:px-10 flex items-center justify-between border-b border-[#1c1e28]/70 bg-[#0c0d10]/85 backdrop-blur-md transition-all">
      {/* Zone 1: Single text element wordmark */}
      <Link
        to="/"
        className="text-lg md:text-xl font-display tracking-[0.25em] text-[#e8e6df] hover:text-[#c99a5e] transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none rounded px-1"
      >
        KAIROS
      </Link>

      {/* Zone 2: Gated clean navigation links */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-widest uppercase text-stone-400">
        {navLinks.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-white transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none rounded px-1 ${
                isActive ? "text-white font-medium" : ""
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#c99a5e]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Strictly gated Dev Mode switcher: Never visible in production/preview by default */}
        {isDevModeActive && (
          <button
            onClick={toggleReaderMode}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-sans transition-colors whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none ${
              readerMode === "writer"
                ? "bg-amber-950/40 text-amber-300 border-amber-500/50"
                : "bg-[#161822] text-stone-300 hover:text-white border-[#272a3b] hover:bg-[#1f2230]"
            }`}
            title={readerMode === "writer" ? "Switch to Experience Mode" : "Switch to Writer Mode"}
          >
            {readerMode === "writer" ? (
              <>
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Writer Mode</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline">Experience</span>
              </>
            )}
          </button>
        )}

        {/* Canonical Arcs & Chapters Navigator trigger */}
        <button
          onClick={() => openNavigator()}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#161822] hover:bg-[#1f2230] border border-[#272a3b] hover:border-[#c99a5e]/50 text-xs font-sans text-stone-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          title="Open Canon & Arc Navigator (⌘K)"
        >
          <Compass className="w-3.5 h-3.5 text-[#c99a5e]" />
          <span className="hidden sm:inline">Arcs & Chapters</span>
        </button>

        <button
          onClick={handleAudioToggle}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161822] hover:bg-[#1f2230] border border-[#272a3b] text-xs font-sans text-stone-300 hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none cursor-pointer"
          title={isEffectivelyActive ? "Mute Atmospheric Sound" : "Enable Atmospheric Sound"}
        >
          {isEffectivelyActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#c99a5e]" />
              <span className="hidden sm:inline">Audio On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Muted</span>
            </>
          )}
        </button>

        {/* Strictly gated Debug Telemetry button: Never visible in production/preview by default */}
        {isDevModeActive && (
          <button
            onClick={toggleDebugMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-sans transition-colors whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none ${
              debugModeVisible
                ? "bg-[#c99a5e]/20 text-[#c99a5e] border-[#c99a5e]/50"
                : "bg-[#161822] text-stone-300 hover:text-white border-[#272a3b] hover:bg-[#1f2230]"
            }`}
            title="Toggle Engine Telemetry"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Debug</span>
          </button>
        )}
      </div>
    </header>
  );
};

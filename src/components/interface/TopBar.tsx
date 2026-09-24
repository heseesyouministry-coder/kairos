import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAudioStore } from "../../state/audioStore";
import { useSettingsStore } from "../../state/settingsStore";
import { AudioManager } from "../../audio/AudioManager";
import { Volume2, VolumeX, SlidersHorizontal } from "lucide-react";

export const TopBar: React.FC = () => {
  const location = useLocation();
  const audioEnabled = useAudioStore((s) => s.audioEnabled);
  const toggleDebugMode = useSettingsStore((s) => s.toggleDebugMode);
  const debugModeVisible = useSettingsStore((s) => s.debugModeVisible);

  const handleAudioToggle = () => {
    AudioManager.toggleMute();
  };

  const navLinks = [
    { label: "Prologue", path: "/begin" },
    { label: "The Mountain", path: "/experience/mountain" },
    { label: "Genesis", path: "/experience/genesis/creation" },
    { label: "Awakening", path: "/experience/awakening" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-16 px-6 md:px-10 flex items-center justify-between border-b border-[#1c1e28]/70 bg-[#0c0d10]/80 backdrop-blur-md transition-all">
      {/* Zone 1: Single text element wordmark */}
      <Link
        to="/"
        className="text-lg md:text-xl font-display tracking-[0.25em] text-[#e8e6df] hover:text-[#c99a5e] transition-colors whitespace-nowrap"
      >
        KAIROS
      </Link>

      {/* Zone 2: 4 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-widest uppercase text-stone-400">
        {navLinks.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-white transition-colors relative py-1 ${
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

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleAudioToggle}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161822] hover:bg-[#1f2230] border border-[#272a3b] text-xs font-sans text-stone-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
          title={audioEnabled ? "Mute Atmospheric Sound" : "Enable Atmospheric Sound"}
        >
          {audioEnabled ? (
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

        <button
          onClick={toggleDebugMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-sans transition-colors whitespace-nowrap shrink-0 ${
            debugModeVisible
              ? "bg-[#c99a5e]/20 text-[#c99a5e] border-[#c99a5e]/50"
              : "bg-[#161822] text-stone-300 hover:text-white border-[#272a3b] hover:bg-[#1f2230]"
          }`}
          title="Toggle Engine Telemetry"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Debug</span>
        </button>
      </div>
    </header>
  );
};

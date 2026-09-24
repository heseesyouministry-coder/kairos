import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useWorshipStore } from "../../state/worshipStore";
import { SoundCloudPlayerAdapter } from "../../audio/worship/SoundCloudPlayerAdapter";
import { MusicDirector } from "../../audio/worship/MusicDirector";
import { WorshipMusicDrawer } from "./WorshipMusicDrawer";
import { Headphones, Volume2, VolumeX, Play, Pause, ChevronUp, ChevronDown, Music2 } from "lucide-react";
import { resumeAudioContext } from "../../audio/audioContext";

/**
 * CinematicMusicLayer
 * Embeds SoundCloud widget for authentic Christian worship tracks (Hillsong, Elevation, Bethel).
 * Keeps player visually discreet while providing an optional mini-player popup with waveform & artwork.
 */
export const CinematicMusicLayer: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  const currentTrack = useWorshipStore((s) => s.currentTrack);
  const currentMode = useWorshipStore((s) => s.currentMode);
  const isPlaying = useWorshipStore((s) => s.isPlaying);
  const isMuted = useWorshipStore((s) => s.isMuted);
  const isSilence = useWorshipStore((s) => s.isSilence);
  const silenceReason = useWorshipStore((s) => s.silenceReason);
  const duckingRatio = useWorshipStore((s) => s.duckingRatio);
  const toggleMusicDrawer = useWorshipStore((s) => s.toggleMusicDrawer);

  useEffect(() => {
    if (iframeRef.current) {
      SoundCloudPlayerAdapter.bindIframe(iframeRef.current);
      MusicDirector.init();
    }
  }, []);

  const handleOpenDrawer = () => {
    resumeAudioContext().catch(() => {});
    toggleMusicDrawer();
  };

  const handleToggleMute = () => {
    resumeAudioContext().catch(() => {});
    MusicDirector.toggleMute();
  };

  const handleTogglePlayPause = () => {
    resumeAudioContext().catch(() => {});
    MusicDirector.togglePlayPause();
  };

  return (
    <>
      {/* 
        SoundCloud Widget Embed
        Can be expanded into an elegant floating mini-player or hidden off-screen.
      */}
      <div
        className={`fixed z-30 transition-all duration-300 ${
          showMiniPlayer && !isLandingPage
            ? "bottom-20 right-4 w-80 sm:w-96 rounded-xl overflow-hidden shadow-2xl border border-[#c99a5e]/40 bg-[#0f1118]/95 backdrop-blur-md"
            : "fixed -top-[9999px] -left-[9999px] w-[320px] h-[166px] pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-[#161824] border-b border-[#24283b] text-xs font-mono text-stone-300">
          <span className="flex items-center gap-1.5 text-[#c99a5e]">
            <Music2 className="w-3.5 h-3.5" /> SoundCloud Worship Player
          </span>
          <button
            onClick={() => setShowMiniPlayer(false)}
            className="text-stone-400 hover:text-white"
            title="Minimize Player"
          >
            ✕
          </button>
        </div>
        <iframe
          ref={iframeRef}
          id="soundcloud-worship-player"
          title="The Living Word Worship Stream"
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          className="w-full h-[166px] border-0"
          src={
            currentTrack?.soundcloudUrl
              ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(
                  currentTrack.soundcloudUrl
                )}&color=%23c99a5e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`
              : "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/none-reyes/oceans-hillsong-instrumental&color=%23c99a5e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"
          }
        />
      </div>

      {/* 
        Cinematic Music Badge / Floating Pill
        Appears unobtrusively in the bottom right corner once past landing page
      */}
      {!isLandingPage && (
        <>
          <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        {/* Play/Pause Button */}
        {!isSilence && (
          <button
            onClick={handleTogglePlayPause}
            className="p-2 rounded-full bg-[#10121a]/85 hover:bg-[#161924] border border-[#232637] hover:border-[#c99a5e]/50 backdrop-blur-md text-stone-300 hover:text-white shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
            title={isPlaying ? "Pause Worship Track" : "Play Worship Track"}
            aria-label={isPlaying ? "Pause Worship Track" : "Play Worship Track"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-[#c99a5e]" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#c99a5e]" />
            )}
          </button>
        )}

        {/* Main Pill Button */}
        <button
          onClick={handleOpenDrawer}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#10121a]/85 hover:bg-[#161924] border border-[#232637] hover:border-[#c99a5e]/50 backdrop-blur-md text-xs font-sans shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
          title="Open Worship & Narrative Music Architecture Drawer"
          aria-label="Inspect Living Word Soundtrack"
        >
          {/* Animated pulse or silence marker */}
          {isSilence ? (
            <span className="w-2 h-2 rounded-full bg-stone-600" />
          ) : (
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  currentMode === "worship"
                    ? "bg-amber-400"
                    : currentMode === "immersion"
                    ? "bg-indigo-400"
                    : "bg-emerald-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  currentMode === "worship"
                    ? "bg-amber-500"
                    : currentMode === "immersion"
                    ? "bg-indigo-500"
                    : "bg-emerald-500"
                }`}
              />
            </span>
          )}

          {/* Text indicator */}
          <div className="flex items-center gap-1.5 text-stone-300 group-hover:text-white max-w-[220px] sm:max-w-[320px] truncate">
            {isSilence ? (
              <span className="text-stone-400 italic truncate text-[11px]">
                Silence: {silenceReason || "Deliberate narrative pause"}
              </span>
            ) : currentTrack ? (
              <>
                <span className="font-medium truncate">{currentTrack.title}</span>
                <span className="text-stone-500 hidden sm:inline">·</span>
                <span className="text-[#c99a5e] hidden sm:inline truncate">{currentTrack.artist}</span>
              </>
            ) : (
              <span className="text-stone-400 truncate">Worship Soundtrack</span>
            )}
          </div>

          {/* Ducking badge indicator */}
          {!isSilence && (
            <span className="hidden md:inline-block px-1.5 py-0.5 rounded bg-[#1b1f2e] text-[9px] font-mono text-stone-400 border border-[#2a2e40]">
              {Math.round(duckingRatio * 100)}%
            </span>
          )}

          <Headphones className="w-3.5 h-3.5 text-[#c99a5e] shrink-0" />
        </button>

        {/* Toggle Mini Player */}
        <button
          onClick={() => setShowMiniPlayer(!showMiniPlayer)}
          className={`p-2 rounded-full border backdrop-blur-md shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none ${
            showMiniPlayer
              ? "bg-[#c99a5e]/20 border-[#c99a5e] text-[#c99a5e]"
              : "bg-[#10121a]/85 hover:bg-[#161924] border-[#232637] text-stone-400 hover:text-stone-200"
          }`}
          title={showMiniPlayer ? "Hide SoundCloud Mini Player" : "Show SoundCloud Mini Player"}
          aria-label="Toggle SoundCloud Mini Player"
        >
          {showMiniPlayer ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Quick Mute Toggle */}
        <button
          onClick={handleToggleMute}
          className="p-2 rounded-full bg-[#10121a]/85 hover:bg-[#161924] border border-[#232637] hover:border-[#c99a5e]/50 backdrop-blur-md text-stone-300 hover:text-white shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-[#c99a5e] focus-visible:outline-none"
          title={isMuted ? "Unmute Worship Soundtrack" : "Mute Worship Soundtrack"}
          aria-label={isMuted ? "Unmute Worship Soundtrack" : "Mute Worship Soundtrack"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-stone-500" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#c99a5e]" />
          )}
        </button>
      </div>

          {/* Expanded Drawer */}
          <WorshipMusicDrawer />
        </>
      )}
    </>
  );
};

import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppProviders } from "./app/providers";
import { AppRoutes } from "./app/router";
import { TopBar } from "./components/interface/TopBar";
import { DebugPanel } from "./components/overlays/DebugPanel";
import { NarrativeErrorBoundary } from "./components/interface/NarrativeErrorBoundary";
import { CinematicMusicLayer } from "./components/audio/CinematicMusicLayer";
import { AudioManager } from "./audio/AudioManager";
import { MusicDirector } from "./audio/worship/MusicDirector";
import { setupAudioUnlockListeners } from "./audio/audioContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  const isDevModeActive =
    typeof window !== "undefined" &&
    (import.meta.env.VITE_ENABLE_DEV_MODE === "true" ||
      new URLSearchParams(window.location.search).get("debug") === "kairos");

  // Global user interaction listeners to wake up AudioContext reliably
  useEffect(() => {
    AudioManager.init();
    MusicDirector.init();
    setupAudioUnlockListeners();
  }, []);

  return (
    <BrowserRouter>
      <AppProviders>
        <ScrollToTop />
        <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] font-body selection:bg-[#c99a5e]/30 selection:text-white">
          <TopBar />
          <main className="w-full">
            <NarrativeErrorBoundary>
              <AppRoutes />
            </NarrativeErrorBoundary>
          </main>
          {isDevModeActive && <DebugPanel />}
          <CinematicMusicLayer />
        </div>
      </AppProviders>
    </BrowserRouter>
  );
}

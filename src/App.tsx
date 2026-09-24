import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AppProviders } from "./app/providers";
import { AppRoutes } from "./app/router";
import { TopBar } from "./components/interface/TopBar";
import { DebugPanel } from "./components/overlays/DebugPanel";
import { AudioManager } from "./audio/AudioManager";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  // Global user interaction listener to wake up AudioContext smoothly
  useEffect(() => {
    const handleFirstInteraction = () => {
      AudioManager.init();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  return (
    <BrowserRouter>
      <AppProviders>
        <ScrollToTop />
        <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] font-body selection:bg-[#c99a5e]/30 selection:text-white">
          <TopBar />
          <main className="w-full">
            <AppRoutes />
          </main>
          <DebugPanel />
        </div>
      </AppProviders>
    </BrowserRouter>
  );
}

import { create } from "zustand";

interface SettingsState {
  webglEnabled: boolean;
  reducedMotion: boolean;
  debugModeVisible: boolean;
  readerMode: "experience" | "writer";
  audioTranscriptsVisible: boolean;
  fps: number;
  drawCalls: number;
  assetLoadingStatus: "ready" | "loading" | "error";

  setWebglEnabled: (enabled: boolean) => void;
  toggleWebgl: () => void;
  setReducedMotion: (enabled: boolean) => void;
  toggleReducedMotion: () => void;
  setDebugModeVisible: (visible: boolean) => void;
  toggleDebugMode: () => void;
  setReaderMode: (mode: "experience" | "writer") => void;
  toggleReaderMode: () => void;
  setAudioTranscriptsVisible: (visible: boolean) => void;
  toggleAudioTranscripts: () => void;
  setFps: (fps: number) => void;
  setDrawCalls: (calls: number) => void;
  setAssetLoadingStatus: (status: "ready" | "loading" | "error") => void;
}

const checkPrefersReducedMotion = (): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  webglEnabled: true,
  reducedMotion: checkPrefersReducedMotion(),
  debugModeVisible: false,
  readerMode: "experience",
  audioTranscriptsVisible: false,
  fps: 60,
  drawCalls: 0,
  assetLoadingStatus: "ready",

  setWebglEnabled: (enabled) => set({ webglEnabled: enabled }),
  toggleWebgl: () => set((state) => ({ webglEnabled: !state.webglEnabled })),
  setReducedMotion: (enabled) => set({ reducedMotion: enabled }),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
  setDebugModeVisible: (visible) => set({ debugModeVisible: visible }),
  toggleDebugMode: () => set((state) => ({ debugModeVisible: !state.debugModeVisible })),
  setReaderMode: (readerMode) => set({ readerMode }),
  toggleReaderMode: () =>
    set((state) => ({ readerMode: state.readerMode === "writer" ? "experience" : "writer" })),
  setAudioTranscriptsVisible: (visible) => set({ audioTranscriptsVisible: visible }),
  toggleAudioTranscripts: () =>
    set((state) => ({ audioTranscriptsVisible: !state.audioTranscriptsVisible })),
  setFps: (fps) => set({ fps }),
  setDrawCalls: (drawCalls) => set({ drawCalls }),
  setAssetLoadingStatus: (status) => set({ assetLoadingStatus: status }),
}));

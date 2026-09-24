/**
 * KAIROS / The Living Word — Worship Store
 * Global state for the first-class narrative music system.
 */

import { create } from "zustand";
import { WorshipTrack, MusicMode, MusicCue, MusicCatalogType, MusicCollection } from "../audio/worship/types";

interface WorshipState {
  currentTrack: WorshipTrack | null;
  activeCue: MusicCue | null;
  currentMode: MusicMode;
  catalogPreference: MusicCatalogType | "auto";
  selectedCollection: MusicCollection | "ALL";
  isPlaying: boolean;
  isMuted: boolean;
  isSilence: boolean;
  silenceReason: string | null;
  duckingRatio: number; // 0.0 to 1.0 multiplier from narrative ducking
  masterVolume: number; // 0.0 to 1.0 user volume
  effectiveVolume: number; // calculated: masterVolume * duckingRatio * baselineCueVolume
  isYouTubeReady: boolean;
  isFallbackActive: boolean; // active if Web Audio synthetic fallback is playing instead of YouTube
  showMusicDrawer: boolean;
  showYouTubeVideo: boolean; // discreet toggle if user wants to see official video embed

  // Actions
  setCurrentTrack: (track: WorshipTrack | null) => void;
  setActiveCue: (cue: MusicCue | null) => void;
  setCurrentMode: (mode: MusicMode) => void;
  setCatalogPreference: (pref: MusicCatalogType | "auto") => void;
  setSelectedCollection: (col: MusicCollection | "ALL") => void;
  setIsPlaying: (playing: boolean) => void;
  setIsMuted: (muted: boolean) => void;
  toggleMute: () => void;
  setSilence: (silence: boolean, reason?: string) => void;
  setDuckingRatio: (ratio: number) => void;
  setMasterVolume: (vol: number) => void;
  setIsYouTubeReady: (ready: boolean) => void;
  setIsFallbackActive: (active: boolean) => void;
  setShowMusicDrawer: (show: boolean) => void;
  toggleMusicDrawer: () => void;
  setShowYouTubeVideo: (show: boolean) => void;
  toggleYouTubeVideo: () => void;
}

export const useWorshipStore = create<WorshipState>((set, get) => ({
  currentTrack: null,
  activeCue: null,
  currentMode: "reading",
  catalogPreference: "auto",
  selectedCollection: "ALL",
  isPlaying: false,
  isMuted: false,
  isSilence: false,
  silenceReason: null,
  duckingRatio: 1.0,
  masterVolume: 0.7,
  effectiveVolume: 0.18,
  isYouTubeReady: false,
  isFallbackActive: false,
  showMusicDrawer: false,
  showYouTubeVideo: false,

  setCurrentTrack: (track) => {
    const cueVol = get().activeCue?.volume ?? (track?.intensity ? track.intensity * 0.4 : 0.2);
    set({
      currentTrack: track,
      isSilence: false,
      silenceReason: null,
      effectiveVolume: get().masterVolume * get().duckingRatio * cueVol,
    });
  },

  setActiveCue: (cue) => {
    const cueVol = cue?.volume ?? 0.2;
    set({
      activeCue: cue,
      currentMode: cue?.mode ?? "reading",
      effectiveVolume: get().masterVolume * get().duckingRatio * cueVol,
    });
  },

  setCurrentMode: (currentMode) => set({ currentMode }),

  setCatalogPreference: (catalogPreference) => set({ catalogPreference }),

  setSelectedCollection: (selectedCollection) => set({ selectedCollection }),

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  setIsMuted: (isMuted) => set({ isMuted }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  setSilence: (isSilence, reason) =>
    set({
      isSilence,
      silenceReason: reason || null,
      isPlaying: !isSilence,
      effectiveVolume: isSilence ? 0 : get().effectiveVolume,
    }),

  setDuckingRatio: (duckingRatio) => {
    const cueVol = get().activeCue?.volume ?? 0.2;
    set({
      duckingRatio,
      effectiveVolume: get().isSilence ? 0 : get().masterVolume * duckingRatio * cueVol,
    });
  },

  setMasterVolume: (masterVolume) => {
    const cueVol = get().activeCue?.volume ?? 0.2;
    set({
      masterVolume,
      effectiveVolume: get().isSilence ? 0 : masterVolume * get().duckingRatio * cueVol,
    });
  },

  setIsYouTubeReady: (isYouTubeReady) => set({ isYouTubeReady }),

  setIsFallbackActive: (isFallbackActive) => set({ isFallbackActive }),

  setShowMusicDrawer: (showMusicDrawer) => set({ showMusicDrawer }),

  toggleMusicDrawer: () => set((state) => ({ showMusicDrawer: !state.showMusicDrawer })),

  setShowYouTubeVideo: (showYouTubeVideo) => set({ showYouTubeVideo }),

  toggleYouTubeVideo: () => set((state) => ({ showYouTubeVideo: !state.showYouTubeVideo })),
}));

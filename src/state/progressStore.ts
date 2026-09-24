import { create } from "zustand";
import { Memory } from "../narrative/types";

const MEMORIES_STORAGE_KEY = "kairos_memories_v1";
const PROGRESS_STORAGE_KEY = "kairos_progress_v1";

interface ProgressState {
  completedScenes: string[];
  storedMemories: Memory[];
  experienceComplete: boolean;
  addMemory: (memory: Memory) => void;
  hasMemory: (id: string) => boolean;
  clearMemories: () => void;
  markSceneCompleted: (sceneId: string) => void;
  setExperienceComplete: (complete: boolean) => void;
  resetProgress: () => void;
}

const loadMemoriesFromStorage = (): Memory[] => {
  try {
    const raw = localStorage.getItem(MEMORIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to load memories from localStorage", e);
    return [];
  }
};

const loadCompletedScenesFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to load progress from localStorage", e);
    return [];
  }
};

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedScenes: loadCompletedScenesFromStorage(),
  storedMemories: loadMemoriesFromStorage(),
  experienceComplete: localStorage.getItem("kairos_experience_complete_v1") === "true",

  addMemory: (memory) => {
    const existing = get().storedMemories;
    if (existing.some((m) => m.id === memory.id)) {
      return;
    }
    const updated = [...existing, memory];
    try {
      localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to persist memory to localStorage", e);
    }
    set({ storedMemories: updated });
  },

  hasMemory: (id) => {
    return get().storedMemories.some((m) => m.id === id);
  },

  clearMemories: () => {
    try {
      localStorage.removeItem(MEMORIES_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    set({ storedMemories: [] });
  },

  markSceneCompleted: (sceneId) => {
    const current = get().completedScenes;
    if (current.includes(sceneId)) return;
    const updated = [...current, sceneId];
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ completedScenes: updated });
  },

  setExperienceComplete: (complete: boolean) => {
    try {
      localStorage.setItem("kairos_experience_complete_v1", String(complete));
    } catch (e) {
      console.error(e);
    }
    set({ experienceComplete: complete });
  },

  resetProgress: () => {
    try {
      localStorage.removeItem(MEMORIES_STORAGE_KEY);
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
      localStorage.removeItem("kairos_experience_complete_v1");
    } catch (e) {
      console.error(e);
    }
    set({ completedScenes: [], storedMemories: [], experienceComplete: false });
  },
}));

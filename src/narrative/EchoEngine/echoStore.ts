import { create } from "zustand";
import { CastEcho, CastMember } from "../types";

const ECHOES_STORAGE_KEY = "kairos_cast_echoes_v1";
const FIRED_ECHOES_STORAGE_KEY = "kairos_fired_echoes_v1";

export const THEO_CAST_MEMBERS: CastMember[] = [
  {
    id: "daniel",
    name: "Daniel",
    relationship: "father",
    sideOfTheoRevealed: "Need for approval masked as competence; fear of not being enough; where his drive to solve and prove comes from.",
  },
  {
    id: "mara",
    name: "Mara",
    relationship: "mother",
    sideOfTheoRevealed: "Care without performance; where his capacity for quiet noticing begins; the place where he doesn't have to earn presence.",
  },
  {
    id: "lia",
    name: "Lia",
    relationship: "sister",
    sideOfTheoRevealed: "Deflates seriousness; ground beneath intellectual spiraling; the only one who can make him laugh mid-panic.",
  },
  {
    id: "luca",
    name: "Luca",
    relationship: "friend",
    sideOfTheoRevealed: "Shared silence and sensory communion; companions who don't need words to stay beside each other.",
  },
  {
    id: "adrian",
    name: "Adrian Reyes",
    relationship: "mentor",
    sideOfTheoRevealed: "Intellectual humility; the irritation of someone refusing to let Theo win every debate just because he is quick.",
  },
  {
    id: "sam",
    name: "Sam",
    relationship: "friend",
    sideOfTheoRevealed: "Vulnerability and the limits of fixing; love that requires presence instead of solutions.",
  },
  {
    id: "lydia",
    name: "Lydia",
    relationship: "sister",
    sideOfTheoRevealed: "Clear-eyed discernment; mirrors his tendency to turn preparation into an idol.",
  },
  {
    id: "julian",
    name: "Julian",
    relationship: "friend",
    sideOfTheoRevealed: "Philosophical sparring; seeds the core doubt of whether faith is real or just proximity.",
  },
];

export const CANONICAL_CAST_ECHOES: CastEcho[] = [
  {
    id: "daniel-echo",
    castMemberId: "daniel",
    triggerTags: ["father", "son", "correction", "approval", "discipline"],
    weight: 0.7,
  },
  {
    id: "lia-echo",
    castMemberId: "lia",
    triggerTags: ["siblings", "jealousy", "comparison"],
    weight: 0.6,
  },
  {
    id: "mara-echo",
    castMemberId: "mara",
    triggerTags: ["intuition", "protection", "emotional-safety", "noticing"],
    weight: 0.65,
  },
  {
    id: "luca-echo",
    castMemberId: "luca",
    triggerTags: ["music", "silence", "companionship-without-words"],
    weight: 0.6,
  },
  {
    id: "adrian-echo",
    castMemberId: "adrian",
    triggerTags: ["doubt", "wisdom-vs-knowledge", "intellectual-humility"],
    weight: 0.7,
  },
];

export interface FiredEchoRecord {
  sceneId: string;
  echoId: string;
  castMemberId: string;
  timestamp: number;
}

interface EchoStoreState {
  castEchoes: CastEcho[];
  castMembers: CastMember[];
  firedEchoes: FiredEchoRecord[];
  activeSceneEcho: CastEcho | null;
  addCastEcho: (echo: CastEcho) => void;
  recordFiredEcho: (record: FiredEchoRecord) => void;
  setActiveSceneEcho: (echo: CastEcho | null) => void;
  hasSceneFiredEcho: (sceneId: string, echoId: string) => boolean;
  clearFiredEchoes: () => void;
  resetToDefaults: () => void;
}

const loadStoredEchoes = (): CastEcho[] => {
  try {
    const raw = localStorage.getItem(ECHOES_STORAGE_KEY);
    if (!raw) return CANONICAL_CAST_ECHOES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : CANONICAL_CAST_ECHOES;
  } catch {
    return CANONICAL_CAST_ECHOES;
  }
};

const loadFiredEchoes = (): FiredEchoRecord[] => {
  try {
    const raw = localStorage.getItem(FIRED_ECHOES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const useEchoStore = create<EchoStoreState>((set, get) => ({
  castEchoes: loadStoredEchoes(),
  castMembers: THEO_CAST_MEMBERS,
  firedEchoes: loadFiredEchoes(),
  activeSceneEcho: null,

  addCastEcho: (echo) => {
    const existing = get().castEchoes;
    if (existing.some((e) => e.id === echo.id)) return;
    const updated = [...existing, echo];
    try {
      localStorage.setItem(ECHOES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ castEchoes: updated });
  },

  recordFiredEcho: (record) => {
    const existing = get().firedEchoes;
    const updated = [...existing, record];
    try {
      localStorage.setItem(FIRED_ECHOES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ firedEchoes: updated });
  },

  setActiveSceneEcho: (echo) => {
    set({ activeSceneEcho: echo });
  },

  hasSceneFiredEcho: (sceneId, echoId) => {
    return get().firedEchoes.some((f) => f.sceneId === sceneId && f.echoId === echoId);
  },

  clearFiredEchoes: () => {
    try {
      localStorage.removeItem(FIRED_ECHOES_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    set({ firedEchoes: [], activeSceneEcho: null });
  },

  resetToDefaults: () => {
    try {
      localStorage.setItem(ECHOES_STORAGE_KEY, JSON.stringify(CANONICAL_CAST_ECHOES));
      localStorage.removeItem(FIRED_ECHOES_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    set({
      castEchoes: CANONICAL_CAST_ECHOES,
      firedEchoes: [],
      activeSceneEcho: null,
    });
  },
}));

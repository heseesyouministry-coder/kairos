import { create } from "zustand";
import { POV, SceneFocus, EmotionalState, TransitionType, TheoAwakeningState } from "../narrative/types";

interface ExperienceState {
  currentSceneId: string;
  currentPOV: POV;
  currentFocus: SceneFocus;
  activeEmotion: Partial<EmotionalState>;
  activeBlockIndex: number;
  isTransitioning: boolean;
  transitionType: TransitionType | null;
  transitionTarget: string | null;
  theoAwakening: TheoAwakeningState;

  // Actions
  setCurrentScene: (sceneId: string, pov: POV, focus: SceneFocus, emotion: Partial<EmotionalState>) => void;
  setPOV: (pov: POV) => void;
  setFocus: (focus: SceneFocus) => void;
  setEmotion: (emotion: Partial<EmotionalState>) => void;
  setActiveBlockIndex: (index: number) => void;
  startTransition: (type: TransitionType, target: string) => void;
  completeTransition: () => void;
  updateTheoAwakening: (updates: Partial<TheoAwakeningState>) => void;
  resetExperience: () => void;
}

const initialTheoState: TheoAwakeningState = {
  understandsEverything: false,
  stillQuestions: true,
  trustChanged: false,
  compassionChanged: false,
  controlInstinctReduced: false,
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  currentSceneId: "begin-ordinary",
  currentPOV: "third",
  currentFocus: "theo",
  activeEmotion: { wonder: 0.1, control: 0.8, fear: 0.2 },
  activeBlockIndex: 0,
  isTransitioning: false,
  transitionType: null,
  transitionTarget: null,
  theoAwakening: initialTheoState,

  setCurrentScene: (sceneId, pov, focus, emotion) =>
    set({
      currentSceneId: sceneId,
      currentPOV: pov,
      currentFocus: focus,
      activeEmotion: emotion,
      activeBlockIndex: 0,
      isTransitioning: false,
      transitionType: null,
      transitionTarget: null,
    }),

  setPOV: (pov) => set({ currentPOV: pov }),
  setFocus: (focus) => set({ currentFocus: focus }),
  setEmotion: (emotion) =>
    set((state) => ({ activeEmotion: { ...state.activeEmotion, ...emotion } })),
  setActiveBlockIndex: (index) => set({ activeBlockIndex: index }),

  startTransition: (type, target) =>
    set({
      isTransitioning: true,
      transitionType: type,
      transitionTarget: target,
    }),

  completeTransition: () =>
    set({
      isTransitioning: false,
      transitionType: null,
      transitionTarget: null,
    }),

  updateTheoAwakening: (updates) =>
    set((state) => ({
      theoAwakening: { ...state.theoAwakening, ...updates },
    })),

  resetExperience: () =>
    set({
      currentSceneId: "begin-ordinary",
      currentPOV: "third",
      currentFocus: "theo",
      activeEmotion: { wonder: 0.1, control: 0.8, fear: 0.2 },
      activeBlockIndex: 0,
      isTransitioning: false,
      transitionType: null,
      transitionTarget: null,
      theoAwakening: initialTheoState,
    }),
}));

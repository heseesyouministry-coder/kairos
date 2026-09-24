/**
 * KAIROS — TransitionEngine
 * Orchestrates cinematic transitions between scenes: crossfade, hardCut, pov-shift, and collapse.
 */

import { TransitionType } from "../types";
import { useExperienceStore } from "../../state/experienceStore";
import { AudioManager } from "../../audio/AudioManager";

export interface TransitionCallbacks {
  onTransitionStart?: (type: TransitionType) => void;
  onMidpoint?: () => void;
  onTransitionComplete?: () => void;
}

export class TransitionEngine {
  public static execute(
    type: TransitionType,
    targetRoute: string,
    callbacks: TransitionCallbacks,
    navigate: (route: string) => void
  ) {
    const store = useExperienceStore.getState();
    store.startTransition(type, targetRoute);
    callbacks.onTransitionStart?.(type);

    switch (type) {
      case "crossfade": {
        // Smooth 1.2s crossfade
        setTimeout(() => {
          callbacks.onMidpoint?.();
          navigate(targetRoute);
          setTimeout(() => {
            store.completeTransition();
            callbacks.onTransitionComplete?.();
          }, 600);
        }, 600);
        break;
      }

      case "hardCut": {
        // Immediate jump with a fast 80ms black frame
        setTimeout(() => {
          callbacks.onMidpoint?.();
          navigate(targetRoute);
          store.completeTransition();
          callbacks.onTransitionComplete?.();
        }, 100);
        break;
      }

      case "pov-shift": {
        // Psychological shift: slight spatial blur, refocus onto the next perspective
        setTimeout(() => {
          callbacks.onMidpoint?.();
          navigate(targetRoute);
          setTimeout(() => {
            store.completeTransition();
            callbacks.onTransitionComplete?.();
          }, 500);
        }, 500);
        break;
      }

      case "collapse": {
        // Experience collapse: audio ducking to silence, sensory fragmentation, sudden cut to awakening
        AudioManager.duck(0.01, 1.2);
        setTimeout(() => {
          AudioManager.playTrack("silence");
          callbacks.onMidpoint?.();
          navigate(targetRoute);
          setTimeout(() => {
            store.completeTransition();
            callbacks.onTransitionComplete?.();
          }, 800);
        }, 1200);
        break;
      }
    }
  }
}

/**
 * KAIROS / The Living Word — AudioContext Singleton & Unlock Manager
 * Ensures a single shared AudioContext across all engines (Music, Ambient, Worship)
 * and guarantees reliable unlocking on any browser interaction.
 */

let sharedContext: AudioContext | null = null;
let unlockListenersAttached = false;

/**
 * Returns the shared AudioContext, creating it if needed.
 */
export function getSharedAudioContext(): AudioContext {
  if (!sharedContext || sharedContext.state === "closed") {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedContext = new AudioCtx();
  }
  return sharedContext;
}

/**
 * Checks if the AudioContext is currently running.
 */
export function isAudioContextRunning(): boolean {
  return sharedContext !== null && sharedContext.state === "running";
}

/**
 * Actively attempts to resume the AudioContext.
 * Must be called during or after user interaction.
 */
export async function resumeAudioContext(): Promise<boolean> {
  const ctx = getSharedAudioContext();
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch (err) {
      console.warn("[audioContext] Resume attempt warning:", err);
    }
  }
  return ctx.state === "running";
}

/**
 * Attaches interaction listeners to window to guarantee AudioContext
 * is unblocked on the first click, tap, keypress, or pointer movement.
 */
export function setupAudioUnlockListeners(): void {
  if (unlockListenersAttached || typeof window === "undefined") return;
  unlockListenersAttached = true;

  const handleUnlock = () => {
    resumeAudioContext().then((running) => {
      if (running) {
        // Keep listeners active in case context gets suspended again when tab is backgrounded
      }
    });
  };

  const events: (keyof WindowEventMap)[] = ["pointerdown", "click", "keydown", "touchstart"];
  events.forEach((evt) => {
    window.addEventListener(evt, handleUnlock, { passive: true });
  });

  // Also unlock on document visibility change (when user returns to tab)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && sharedContext?.state === "suspended") {
      resumeAudioContext();
    }
  });
}

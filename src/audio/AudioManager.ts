/**
 * KAIROS — AudioManager
 * Unified facade coordinating MusicEngine & AmbientEngine with Zustand audioStore.
 */

import { MusicEngine } from "./MusicEngine";
import { AmbientEngine } from "./AmbientEngine";
import { useAudioStore, AudioTrackId, AudioAmbientId } from "../state/audioStore";

class AudioManagerClass {
  private musicEngine: MusicEngine;
  private ambientEngine: AmbientEngine;
  private isMuted = false;

  constructor() {
    this.musicEngine = new MusicEngine();
    this.ambientEngine = new AmbientEngine();
  }

  public init() {
    // Context starts on user click
    const ctx = this.musicEngine.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
  }

  public playTrack(trackId: AudioTrackId, ambientId?: AudioAmbientId) {
    const store = useAudioStore.getState();
    if (!store.audioEnabled) return;

    store.setCurrentTrack(trackId);
    store.setPlaybackState("playing");
    store.setLastAction(`playTrack: ${trackId}`);

    if (trackId === "silence") {
      this.musicEngine.stop(1.5);
      if (ambientId === "none" || !ambientId) {
        this.ambientEngine.stop(1.5);
      }
      store.setPlaybackState("silent");
      return;
    }

    this.musicEngine.play(trackId, 2.0);

    if (ambientId) {
      store.setCurrentAmbient(ambientId);
      this.ambientEngine.play(ambientId, 2.5);
    }
  }

  public fadeIn(trackId: AudioTrackId, duration = 3.0) {
    const store = useAudioStore.getState();
    if (!store.audioEnabled) return;

    store.setCurrentTrack(trackId);
    store.setPlaybackState("playing");
    store.setLastAction(`fadeIn: ${trackId} (${duration}s)`);

    this.musicEngine.play(trackId, duration);
  }

  public fadeOut(duration = 2.0) {
    const store = useAudioStore.getState();
    store.setPlaybackState("stopped");
    store.setLastAction(`fadeOut (${duration}s)`);

    this.musicEngine.stop(duration);
    this.ambientEngine.stop(duration);
  }

  public crossfade(nextTrack: AudioTrackId, duration = 2.5) {
    const store = useAudioStore.getState();
    if (!store.audioEnabled) return;

    store.setPlaybackState("crossfading");
    store.setLastAction(`crossfade to ${nextTrack}`);

    this.musicEngine.stop(duration * 0.5);
    setTimeout(() => {
      this.musicEngine.play(nextTrack, duration * 0.7);
      store.setCurrentTrack(nextTrack);
      store.setPlaybackState("playing");
    }, duration * 400);
  }

  public duck(amount = 0.25, duration = 0.6) {
    const store = useAudioStore.getState();
    store.setPlaybackState("ducked");
    store.setLastAction(`ducked to ${amount}`);
    this.musicEngine.duck(amount, duration);
  }

  public unduck(target = 0.6, duration = 0.8) {
    const store = useAudioStore.getState();
    store.setPlaybackState("playing");
    store.setLastAction(`unducked to ${target}`);
    this.musicEngine.unduck(target, duration);
  }

  public pause() {
    this.musicEngine.stop(0.4);
    this.ambientEngine.stop(0.4);
    const store = useAudioStore.getState();
    store.setPlaybackState("stopped");
    store.setLastAction("paused");
  }

  public resume() {
    const store = useAudioStore.getState();
    if (store.currentTrack && store.currentTrack !== "silence") {
      this.playTrack(store.currentTrack, store.currentAmbient || undefined);
    }
  }

  public setVolume(vol: number) {
    this.musicEngine.setVolume(vol);
    this.ambientEngine.setVolume(vol);
    useAudioStore.getState().setMasterVolume(vol);
    useAudioStore.getState().setLastAction(`setVolume: ${vol.toFixed(2)}`);
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.setVolume(0);
      useAudioStore.getState().setAudioEnabled(false);
    } else {
      this.setVolume(0.7);
      useAudioStore.getState().setAudioEnabled(true);
      this.resume();
    }
  }

  public escalatePanic(ratio: number) {
    this.ambientEngine.escalatePanic(ratio);
    useAudioStore.getState().setLastAction(`escalatePanic: ${(ratio * 100).toFixed(0)}%`);
  }

  public releaseToStillness() {
    this.ambientEngine.releaseToStillness();
    this.musicEngine.stop(0.3);
    useAudioStore.getState().setPlaybackState("silent");
    useAudioStore.getState().setLastAction("releaseToStillness");
  }

  public playCollapseStack(onComplete?: () => void) {
    const store = useAudioStore.getState();
    store.setCurrentTrack("collapse-stack");
    store.setCurrentAmbient("mountain-dusk-wind");
    store.setPlaybackState("playing");
    store.setLastAction("playCollapseStack (layered fragments -> silence)");

    this.musicEngine.play("collapse-stack", 0.5);
    this.ambientEngine.play("mountain-dusk-wind", 0.5);

    // Swell layered fragments across 3.4s, then drop cleanly to full silence
    setTimeout(() => {
      this.releaseToStillness();
      if (onComplete) onComplete();
    }, 3400);
  }
}

export const AudioManager = new AudioManagerClass();

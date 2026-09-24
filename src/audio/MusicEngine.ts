/**
 * KAIROS — MusicEngine
 * Procedural harmonic engine interface.
 * Oscillator buzzing is disabled in favor of genuine SoundCloud worship streams.
 */

import { AudioTrackId } from "../state/audioStore";
import { getSharedAudioContext, resumeAudioContext } from "./audioContext";

export class MusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentNodes: {
    oscillators: OscillatorNode[];
    gains: GainNode[];
    filters: BiquadFilterNode[];
    lfos?: OscillatorNode[];
  } | null = null;

  private currentTrack: AudioTrackId | null = null;

  constructor() {
    // AudioContext is managed via sharedContext singleton
  }

  private initContext(): AudioContext {
    this.ctx = getSharedAudioContext();
    if (!this.masterGain) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      resumeAudioContext().catch(() => {});
    }
    return this.ctx;
  }

  public getContext(): AudioContext | null {
    if (!this.ctx) {
      this.ctx = getSharedAudioContext();
    }
    return this.ctx;
  }

  public play(trackId: AudioTrackId, duration = 1.0) {
    this.stop(duration * 0.5);
    this.currentTrack = trackId;

    // Synthetic oscillator buzzing is silenced in favor of genuine SoundCloud worship tracks
    return;
  }

  public stop(fadeDuration = 0.5) {
    if (!this.currentNodes || !this.ctx) {
      this.currentTrack = null;
      return;
    }
    const now = this.ctx.currentTime;
    const { oscillators, gains, lfos } = this.currentNodes;

    gains.forEach((g) => {
      try {
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
      } catch {
        g.gain.value = 0;
      }
    });

    if (lfos) {
      lfos.forEach((l) => {
        try {
          l.stop(now + fadeDuration);
        } catch {
          // ignore
        }
      });
    }

    setTimeout(() => {
      oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // already stopped
        }
      });
    }, fadeDuration * 1000 + 50);

    this.currentNodes = null;
    this.currentTrack = null;
  }

  public duck(amount = 0.3, duration = 0.5) {
    if (!this.masterGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(amount, now + duration);
  }

  public unduck(target = 0.7, duration = 0.8) {
    if (!this.masterGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(target, now + duration);
  }

  public setVolume(vol: number) {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
  }

  public getCurrentTrack(): AudioTrackId | null {
    return this.currentTrack;
  }
}

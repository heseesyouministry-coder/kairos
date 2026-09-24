/**
 * KAIROS — AmbientEngine
 * Procedural atmospheric textures: mountain wind, cosmic sub-frequencies, dusk field stillness.
 */

import { AudioAmbientId } from "../state/audioStore";

export class AmbientEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private activeSource: AudioBufferSourceNode | null = null;
  private activeFilter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private currentAmbient: AudioAmbientId | null = null;

  constructor(context?: AudioContext) {
    if (context) {
      this.ctx = context;
    }
  }

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (!this.ambientGain) {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private createPinkNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  public play(ambientId: AudioAmbientId, fadeDuration = 2.0) {
    if (ambientId === "none") {
      this.stop(fadeDuration);
      this.currentAmbient = "none";
      return;
    }

    const ctx = this.initContext();
    this.stop(fadeDuration * 0.5);

    if (!this.noiseBuffer) {
      this.noiseBuffer = this.createPinkNoiseBuffer(ctx);
    }

    this.currentAmbient = ambientId;
    const now = ctx.currentTime;

    const source = ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    const subGain = ctx.createGain();

    if (ambientId === "mountain-wind") {
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(2.2, now);

      // Slow LFO for gusting wind
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.18, now);
      lfoGain.gain.setValueAtTime(140, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      this.lfo = lfo;

      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.09, now + fadeDuration);
    } else if (ambientId === "space-resonance") {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, now);

      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.12, now + fadeDuration);
    } else if (ambientId === "field-dusk") {
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(1.5, now);

      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.04, now + fadeDuration);
    } else if (ambientId === "crowd-panic-water") {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.08, now + fadeDuration);
    } else if (ambientId === "deluge-thunder" || ambientId === "sinai-trumpet-thunder") {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(180, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.1, now + fadeDuration);
    } else if (ambientId === "jerusalem-ruins-smoke") {
      // Near-silence hollow ash wind for Collapse Two
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(130, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.015, now + fadeDuration);
    } else if (ambientId === "expectant-silence") {
      // Barely audible breath-like presence
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(90, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.006, now + fadeDuration);
    } else if (ambientId === "silent-agony") {
      // Near-total silence: muted sub-breath (60Hz), barely registered
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(60, now);
      subGain.gain.setValueAtTime(0.00001, now);
      subGain.gain.exponentialRampToValueAtTime(0.002, now + fadeDuration);
    } else if (ambientId === "gethsemane-dusk") {
      // Night wind through ancient olive grove: hollow low breath (120Hz)
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(1.8, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.012, now + fadeDuration);
    } else if (ambientId === "courtyard-fire") {
      // Muted night embers and chill courtyard wind
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.015, now + fadeDuration);
    } else if (ambientId === "dawn-garden" || ambientId === "galilee-shore" || ambientId === "charcoal-fire") {
      // Morning stillness, dew, soft shore air
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(1.2, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.015, now + fadeDuration);
    } else if (ambientId === "upper-room-breath") {
      // Warm rushing air of Pentecost
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(420, now);
      filter.Q.setValueAtTime(1.1, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.02, now + fadeDuration);
    } else if (ambientId === "expansion-wind" || ambientId === "open-heavens") {
      // Expansive, breathing open atmosphere
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(540, now);
      filter.Q.setValueAtTime(0.9, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.022, now + fadeDuration);
    } else if (ambientId === "mountain-dusk-wind") {
      // The mountain wind at 8:47 PM
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(260, now);
      filter.Q.setValueAtTime(1.4, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.02, now + fadeDuration);
    } else {
      // subtle-room, pit-wind, desert-night, etc.
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, now);

      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.exponentialRampToValueAtTime(0.03, now + fadeDuration);
    }

    source.connect(filter);
    filter.connect(subGain);
    subGain.connect(this.ambientGain!);
    source.start();

    this.activeSource = source;
    this.activeFilter = filter;
  }

  public stop(fadeDuration = 1.0) {
    if (!this.ambientGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
    } catch {
      this.ambientGain.gain.value = 0;
    }

    if (this.lfo) {
      try {
        this.lfo.stop(now + fadeDuration);
      } catch {}
      this.lfo = null;
    }

    setTimeout(() => {
      if (this.activeSource) {
        try {
          this.activeSource.stop();
          this.activeSource.disconnect();
        } catch {}
        this.activeSource = null;
      }
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      }
    }, fadeDuration * 1000 + 100);

    this.currentAmbient = null;
  }

  public setVolume(vol: number) {
    if (!this.ambientGain || !this.ctx) return;
    this.ambientGain.gain.setValueAtTime(vol * 0.5, this.ctx.currentTime);
  }

  /**
   * Red Sea escalate-then-release: dynamically builds filter cutoff and volume with panic
   */
  public escalatePanic(ratio: number) {
    if (!this.ctx || !this.activeFilter || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    const targetFreq = 300 + ratio * 800; // 300Hz up to 1100Hz
    const targetVol = 0.08 + ratio * 0.25;
    try {
      this.activeFilter.frequency.cancelScheduledValues(now);
      this.activeFilter.frequency.linearRampToValueAtTime(targetFreq, now + 0.3);
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.linearRampToValueAtTime(targetVol, now + 0.3);
    } catch {}
  }

  /**
   * Immediate dramatic release into absolute stillness
   */
  public releaseToStillness(duration = 0.4) {
    if (!this.ctx || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    try {
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + duration);
    } catch {}
  }

  public getCurrentAmbient(): AudioAmbientId | null {
    return this.currentAmbient;
  }
}

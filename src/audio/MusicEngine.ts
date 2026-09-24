/**
 * KAIROS — MusicEngine
 * Procedural harmonic atmospheric soundscapes using Web Audio API.
 * Synthesizes organic warm pads, resonant chords, and spacious drones without external assets.
 */

import { AudioTrackId } from "../state/audioStore";

export class MusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentNodes: {
    oscillators: OscillatorNode[];
    gains: GainNode[];
    filters: BiquadFilterNode[];
  } | null = null;

  private currentTrack: AudioTrackId | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getContext(): AudioContext | null {
    return this.ctx;
  }

  public play(trackId: AudioTrackId, duration = 2.0) {
    if (trackId === "silence") {
      this.stop(duration);
      this.currentTrack = "silence";
      return;
    }

    const ctx = this.initContext();
    this.stop(duration * 0.7);

    this.currentTrack = trackId;

    const oscNodes: OscillatorNode[] = [];
    const gainNodes: GainNode[] = [];
    const filterNodes: BiquadFilterNode[] = [];

    const now = ctx.currentTime;

    // Track configurations
    if (trackId === "ordinary") {
      // Subtle, contemporary-adjacent: delicate warm fourths/fifths (C3, G3, D4) with subtle LFO
      const freqs = [130.81, 196.0, 293.66];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f + (idx * 0.3 - 0.3), now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);

        // Fade in
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.08 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "mountain") {
      // Wind & high-altitude breath: near silence with faint high harmonic sheen (E4, B4)
      const freqs = [329.63, 493.88];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(600, now);
        filter.Q.setValueAtTime(3.0, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.025, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "creation") {
      // Spacious, wide, minimal melody — deep low drone (D1, D2, A2) and ethereal upper shimmer
      const freqs = [36.71, 73.42, 110.0, 220.0, 440.0];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = i < 2 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(f + (i === 1 ? 0.4 : 0), now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(i < 2 ? 180 : 800, now);

        gain.gain.setValueAtTime(0.0001, now);
        const targetVol = i < 2 ? 0.09 : 0.035;
        gain.gain.exponentialRampToValueAtTime(targetVol, now + duration * 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "cain-abel") {
      // Sparse, tense, heavy minor interval (F#1, C2, F#2) with slow dissonant beating
      const freqs = [46.25, 65.41, 92.5];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f + (i * 0.5), now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(220, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.07, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "joseph") {
      // Bittersweet, melancholic warm amber chord: D3, F3, A3, E4 (Dm9)
      const freqs = [146.83, 174.61, 220.0, 329.63];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f + (i * 0.2), now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(480, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.05 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "red-sea") {
      // Colossal oceanic surge: C2, G2, C3, Eb3 (Cm heavy swelling drone)
      const freqs = [65.41, 98.0, 130.81, 155.56];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = i < 2 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.08 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "sinai") {
      // Thunderous quaking low vibration: Bb1, F2, Bb2
      const freqs = [58.27, 87.31, 116.54];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(200, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.07 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "fall-of-jerusalem") {
      // Collapse Two: Ultra-restrained, mourning hollow ache: A1 (55Hz), E2 (82.4Hz), C3 (130.8Hz)
      const freqs = [55.0, 82.41, 130.81];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.025 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "david-bathsheba") {
      // Unsettling, quiet moral fracture: D3 (146.8Hz), Eb3 (155.6Hz), A3 (220Hz)
      const freqs = [146.83, 155.56, 220.0];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "the-temple") {
      // Reverent, golden majestic drone: D3, A3, D4, F#4
      const freqs = [146.83, 220.0, 293.66, 369.99];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.045 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "the-long-silence") {
      // Expectant, suspended stillness: E2 (82.4Hz), B2 (123.5Hz)
      const freqs = [82.41, 123.47];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(160, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.015 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "gospel") {
      // Intimate, unadorned Galilee presence: warm sine tones without dramatic swelling (D3, A3, F#3)
      const freqs = [146.83, 220.0, 185.0];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "gethsemane") {
      // Sound beginning to empty out: solitary deep descent (C2, G2), heavy, hushed
      const freqs = [65.41, 98.0];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(110, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.02 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "arrest") {
      // Cold agitation, brittle dissonance (D3, G#3) draining away
      const freqs = [146.83, 207.65];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(240, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.02 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "trial") {
      // Hollow public arena: distant low drone (A2, E3)
      const freqs = [110.0, 164.81];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(180, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.02 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "crucifixion-silence") {
      // INVERTED AUDIO DIRECTION: The quietest scene in the project.
      // A nearly imperceptible sub-drone (43Hz) on the verge of inaudibility
      const freqs = [43.65];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(75, now);

        gain.gain.setValueAtTime(0.00001, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "empty-tomb") {
      // First gentle shimmer of morning: high pure fifths (E4, B4, F#5)
      const freqs = [329.63, 493.88, 739.99];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(600, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.03 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "resurrection") {
      // Warm, resting major 7th chord (C3, E3, G3, B3): deep relief, breakfast on the shore
      const freqs = [130.81, 164.81, 196.0, 246.94];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "acts-dawn") {
      // Phase 5 Expansion: Vibrant morning air of the early church (D3, A3, E4, F#4)
      const freqs = [146.83, 220.0, 329.63, 369.99];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(500, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "expansion") {
      // Gradual widening of the entire environment: G2, D3, G3, B3, D4 open resonant fifths
      const freqs = [98.0, 146.83, 196.0, 246.94, 293.66];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(650, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "revelation-vast") {
      // Uncontainable, non-decodable cosmic openness: deep foundation (C2 65Hz) and shimmering G4, D5
      const freqs = [65.41, 130.81, 392.0, 587.33];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(700, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.045 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else if (trackId === "collapse-stack") {
      // Section VII Collapse Layering:
      // Blends real-world fragments over Biblical ones (mom's voice, Lydia laughing, Sam talking, music, wind)
      // Layered synthesized acoustic frequencies swelling together then cutting abruptly to silence
      const freqs = [110.0, 164.81, 220.0, 329.63, 440.0, 659.25];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(300 + idx * 80, now);
        filter.Q.setValueAtTime(2.5, now);

        // Swell quickly then drop to silence
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.06 / freqs.length, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 3.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        osc.stop(now + 3.4);

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    } else {
      // Default contemplative pad (abraham, jacob, moses, wilderness, flood, babel, etc.)
      const freqs = [110.0, 164.81, 220.0];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(350, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04 / freqs.length, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        oscNodes.push(osc);
        gainNodes.push(gain);
        filterNodes.push(filter);
      });
    }

    this.currentNodes = {
      oscillators: oscNodes,
      gains: gainNodes,
      filters: filterNodes,
    };
  }

  public stop(fadeDuration = 1.0) {
    if (!this.currentNodes || !this.ctx) return;
    const now = this.ctx.currentTime;
    const { oscillators, gains } = this.currentNodes;

    gains.forEach((g) => {
      try {
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + fadeDuration);
      } catch {
        g.gain.value = 0;
      }
    });

    setTimeout(() => {
      oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // already stopped
        }
      });
    }, fadeDuration * 1000 + 100);

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

  public unduck(target = 0.6, duration = 0.8) {
    if (!this.masterGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(target, now + duration);
  }

  public setVolume(vol: number) {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
  }

  public getCurrentTrack(): AudioTrackId | null {
    return this.currentTrack;
  }
}

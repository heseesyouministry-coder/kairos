/**
 * KAIROS / The Living Word — MusicDirector
 * First-class narrative music director coordinating:
 *  - Scene-specific worship cues
 *  - Dynamic Narrative Ducking (adjusting music underneath text)
 *  - POV modulation (3rd -> 2nd -> 1st person)
 *  - Emotional state vector influence
 *  - Explicit "Silence is a Track" handling
 *  - YouTubePlayerAdapter and Web Audio fallback orchestration
 */

import { WORSHIP_CATALOG, SCENE_MUSIC_CUES, getWorshipTrack } from "./worshipCatalog";
import { WorshipTrack, MusicCue, MusicMode } from "./types";
import { SoundCloudPlayerAdapter } from "./SoundCloudPlayerAdapter";
import { YouTubePlayerAdapter } from "./YouTubePlayerAdapter";
import { useWorshipStore } from "../../state/worshipStore";
import { NarrativeBlock, POV, EmotionalState } from "../../narrative/types";
import { AudioManager } from "../AudioManager";
import { resumeAudioContext } from "../audioContext";

class MusicDirectorClass {
  private currentSceneId: string | null = null;
  private currentBlockType: string = "narrative";
  private currentPOV: POV = "third";
  private currentEmotion: Partial<EmotionalState> | null = null;
  private isInitialized = false;

  public init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Listen to SoundCloud player state changes
    SoundCloudPlayerAdapter.onStateChange((state) => {
      const store = useWorshipStore.getState();
      if (state === "playing") {
        store.setIsPlaying(true);
      } else if (state === "paused" || state === "ended") {
        store.setIsPlaying(false);
      }
    });

    // Also sync YouTube adapter if needed
    YouTubePlayerAdapter.onStateChange((state) => {
      const store = useWorshipStore.getState();
      if (state === "playing") {
        store.setIsPlaying(true);
      } else if (state === "paused" || state === "ended") {
        store.setIsPlaying(false);
      }
    });
  }

  /**
   * Called whenever a new scene is entered
   */
  public onSceneChange(sceneId: string, pov?: POV, emotion?: Partial<EmotionalState>) {
    this.currentSceneId = sceneId;
    if (pov) this.currentPOV = pov;
    if (emotion) this.currentEmotion = emotion;

    const cue = SCENE_MUSIC_CUES[sceneId];
    const store = useWorshipStore.getState();

    // Check if scene explicitly designates silence
    if (cue && cue.trackId === "silence") {
      this.playSilence(cue.silenceReason || `Scene '${sceneId}' designated silence.`);
      return;
    }

    if (cue) {
      store.setActiveCue(cue);
      let targetTrackId = cue.trackId;

      const track = getWorshipTrack(targetTrackId);
      if (track) {
        this.executeTrackTransition(track, cue);
      }
    } else {
      // Default to gentle ambient reading track if no specific cue
      const defaultTrack = getWorshipTrack("still-instrumental");
      if (defaultTrack && store.currentTrack?.id !== defaultTrack.id) {
        this.executeTrackTransition(defaultTrack, {
          trackId: defaultTrack.id,
          mode: "reading",
          volume: 0.22,
          fadeIn: 3,
          fadeOut: 3,
          emotionalTags: ["peace"],
          scenes: [sceneId],
        });
      }
    }

    this.applyDynamicMixing();
  }

  /**
   * Called whenever the user steps through narrative blocks
   * Performs Dynamic Narrative Ducking:
   *  - Normal reading: ~18% (1.0x baseline)
   *  - Spoken dialogue: ~12% (0.65x baseline)
   *  - Inner monologue / 1st person: ~8% (0.45x baseline)
   *  - Visual climax / immersion: ~28% (1.55x baseline)
   *  - Major worship moments: ~55% (3.0x baseline)
   */
  public onBlockChange(block: NarrativeBlock, pov?: POV, emotion?: Partial<EmotionalState>) {
    this.currentBlockType = block.type;
    if (pov) this.currentPOV = pov;
    if (emotion) this.currentEmotion = emotion;

    this.applyDynamicMixing();
  }

  /**
   * Calculate effective volume based on Narrative Ducking + POV + Emotion
   */
  public applyDynamicMixing() {
    const store = useWorshipStore.getState();
    if (store.isSilence) {
      this.updateEffectiveVolume(0);
      return;
    }

    // 1. Narrative Ducking multiplier by block type
    let duckingMultiplier = 1.0;
    switch (this.currentBlockType) {
      case "dialogue":
        // Lower for dialogue so spoken words take center stage
        duckingMultiplier = 0.65;
        break;
      case "internal":
        // Intimate interior monologue: music narrows significantly
        duckingMultiplier = 0.45;
        break;
      case "immersion":
        // 2nd person reader pull-in: slightly more atmospheric
        duckingMultiplier = 1.25;
        break;
      case "sceneCue":
        // Visual or cinematic boundary cue: swells briefly
        duckingMultiplier = 1.5;
        break;
      case "narrative":
      case "sensory":
      default:
        duckingMultiplier = 1.0;
        break;
    }

    // 2. POV Modulation (3rd -> 2nd -> 1st person)
    let povMultiplier = 1.0;
    if (this.currentPOV === "first") {
      povMultiplier = 0.8; // Intimate, narrower
    } else if (this.currentPOV === "second") {
      povMultiplier = 1.15; // Expansive, immersive
    } else {
      povMultiplier = 1.0; // Classical third person baseline
    }

    // 3. Emotion Vector Influence
    let emotionMultiplier = 1.0;
    if (this.currentEmotion) {
      if (this.currentEmotion.wonder && this.currentEmotion.wonder > 0.7) {
        emotionMultiplier += 0.2; // Harmonic openness
      }
      if (this.currentEmotion.fear && this.currentEmotion.fear > 0.7) {
        emotionMultiplier -= 0.25; // Drop volume for dread/tension
      }
      if (this.currentEmotion.grief && this.currentEmotion.grief > 0.8) {
        emotionMultiplier -= 0.2; // Soften for lament
      }
    }

    const calculatedDucking = Math.max(0.1, Math.min(2.0, duckingMultiplier * povMultiplier * emotionMultiplier));
    store.setDuckingRatio(calculatedDucking);

    const cueBaseline = store.activeCue?.volume ?? (store.currentTrack?.intensity ? store.currentTrack.intensity * 0.4 : 0.25);
    const finalVolumeFraction = store.isMuted
      ? 0
      : Math.max(0, Math.min(1.0, store.masterVolume * calculatedDucking * cueBaseline));

    this.updateEffectiveVolume(finalVolumeFraction);
  }

  private updateEffectiveVolume(volFraction: number) {
    const store = useWorshipStore.getState();
    if (store.isMuted || volFraction <= 0) {
      SoundCloudPlayerAdapter.setVolume(0);
      YouTubePlayerAdapter.setVolume(0);
      return;
    }

    SoundCloudPlayerAdapter.rampVolume(volFraction, 0.6);
    YouTubePlayerAdapter.rampVolume(Math.round(volFraction * 100), 0.6);
  }

  /**
   * Execute track transition with authentic SoundCloud track playback
   */
  private executeTrackTransition(track: WorshipTrack, cue: MusicCue) {
    const store = useWorshipStore.getState();
    store.setCurrentTrack(track);
    store.setCurrentMode(cue.mode);
    store.setSilence(false, "");

    resumeAudioContext().catch(() => {});

    const initialVol = store.isMuted ? 0 : store.masterVolume * (cue.volume || 0.3);

    // Stream the authentic, matching SoundCloud track
    if (track.soundcloudUrl) {
      SoundCloudPlayerAdapter.loadTrack(track.soundcloudUrl, initialVol, !store.isMuted);
    }
  }

  /**
   * Drop music to absolute silence (Spec Section 45: "Silence is a track")
   */
  public playSilence(reason: string) {
    const store = useWorshipStore.getState();
    store.setSilence(true, reason);
    SoundCloudPlayerAdapter.setVolume(0);
    SoundCloudPlayerAdapter.pause();
    YouTubePlayerAdapter.pause();

    AudioManager.releaseToStillness();
    console.info(`[MusicDirector: Silence Track Activated] — ${reason}`);
  }

  /**
   * Play a specific track directly from the catalog or drawer
   */
  public playTrackById(trackId: string) {
    const track = getWorshipTrack(trackId);
    if (!track) return;

    resumeAudioContext().catch(() => {});
    const store = useWorshipStore.getState();
    if (store.isMuted) {
      store.toggleMute();
      SoundCloudPlayerAdapter.unmute();
    }
    store.setSilence(false, "");

    const cue: MusicCue = {
      trackId: track.id,
      mode: track.mode,
      volume: track.mode === "worship" ? 0.6 : 0.35,
      fadeIn: 2,
      fadeOut: 2,
      emotionalTags: track.emotionalTags,
      scenes: [],
    };

    store.setActiveCue(cue);
    this.executeTrackTransition(track, cue);
    this.applyDynamicMixing();
  }

  public togglePlayPause() {
    const store = useWorshipStore.getState();
    if (store.isPlaying) {
      SoundCloudPlayerAdapter.pause();
      store.setIsPlaying(false);
    } else {
      SoundCloudPlayerAdapter.play();
      store.setIsPlaying(true);
    }
  }

  public toggleMute() {
    const store = useWorshipStore.getState();
    store.toggleMute();
    if (store.isMuted) {
      SoundCloudPlayerAdapter.mute();
      YouTubePlayerAdapter.mute();
    } else {
      resumeAudioContext().catch(() => {});
      SoundCloudPlayerAdapter.unmute();
      YouTubePlayerAdapter.unMute();
      this.applyDynamicMixing();
    }
  }

  public setMasterVolume(vol: number) {
    const store = useWorshipStore.getState();
    store.setMasterVolume(vol);
    this.applyDynamicMixing();
  }
}

export const MusicDirector = new MusicDirectorClass();


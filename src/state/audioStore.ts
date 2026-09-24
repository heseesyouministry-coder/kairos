import { create } from "zustand";

export type AudioTrackId =
  | "ordinary"
  | "mountain"
  | "creation"
  | "cain-abel"
  | "silence"
  | "flood"
  | "babel"
  | "abraham"
  | "jacob"
  | "joseph"
  | "moses"
  | "burning-bush"
  | "plagues"
  | "red-sea"
  | "sinai"
  | "wilderness"
  | "jericho"
  | "judges"
  | "ruth"
  | "samuel"
  | "saul"
  | "david-goliath"
  | "david-jonathan"
  | "david-saul"
  | "david-bathsheba"
  | "solomon"
  | "the-temple"
  | "elijah"
  | "elisha"
  | "divided-kingdom"
  | "isaiah"
  | "jeremiah"
  | "fall-of-jerusalem"
  | "daniel"
  | "esther"
  | "job"
  | "return-exile"
  | "ezra-nehemiah"
  | "the-long-silence"
  | "gospel"
  | "gethsemane"
  | "arrest"
  | "trial"
  | "crucifixion-silence"
  | "empty-tomb"
  | "resurrection"
  | "acts-dawn"
  | "expansion"
  | "revelation-vast"
  | "collapse-stack"
  | (string & {});

export type AudioAmbientId =
  | "subtle-room"
  | "mountain-wind"
  | "space-resonance"
  | "field-dusk"
  | "none"
  | "deluge-thunder"
  | "tower-wind-voices"
  | "desert-night"
  | "river-night-insects"
  | "pit-wind"
  | "caravan-bells"
  | "river-nile-water"
  | "desert-fire-hum"
  | "nile-locusts-dread"
  | "crowd-panic-water"
  | "sinai-trumpet-thunder"
  | "desert-exhaustion-wind"
  | "jericho-horns"
  | "judges-strife"
  | "harvest-breeze"
  | "sanctuary-whisper"
  | "court-tension"
  | "valley-tension"
  | "friendship-quiet"
  | "cave-darkness"
  | "palace-night"
  | "temple-smoke-incense"
  | "carmel-drought-whisper"
  | "river-jordan-peace"
  | "divided-distant-cries"
  | "throne-room-seraphim"
  | "dungeon-mud-lament"
  | "jerusalem-ruins-smoke"
  | "babylon-palace"
  | "susa-banquet"
  | "ash-wind"
  | "ruined-wall-wind"
  | "temple-foundation-tears"
  | "expectant-silence"
  | "crowd-dust"
  | "galilee-shore"
  | "gethsemane-dusk"
  | "torch-rattle"
  | "courtyard-fire"
  | "silent-agony"
  | "dawn-garden"
  | "charcoal-fire"
  | "expansion-wind"
  | "upper-room-breath"
  | "open-heavens"
  | "mountain-dusk-wind";

interface AudioStoreState {
  audioEnabled: boolean;
  masterVolume: number;
  currentTrack: AudioTrackId | null;
  currentAmbient: AudioAmbientId | null;
  playbackState: "stopped" | "playing" | "ducked" | "crossfading" | "silent";
  lastAction: string;

  setAudioEnabled: (enabled: boolean) => void;
  toggleAudioEnabled: () => void;
  setMasterVolume: (volume: number) => void;
  setCurrentTrack: (track: AudioTrackId | null) => void;
  setCurrentAmbient: (ambient: AudioAmbientId | null) => void;
  setPlaybackState: (state: "stopped" | "playing" | "ducked" | "crossfading" | "silent") => void;
  setLastAction: (action: string) => void;
}

export const useAudioStore = create<AudioStoreState>((set) => ({
  audioEnabled: true,
  masterVolume: 0.7,
  currentTrack: null,
  currentAmbient: null,
  playbackState: "stopped",
  lastAction: "initialized",

  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  toggleAudioEnabled: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  setMasterVolume: (volume) => set({ masterVolume: Math.max(0, Math.min(1, volume)) }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setCurrentAmbient: (ambient) => set({ currentAmbient: ambient }),
  setPlaybackState: (playbackState) => set({ playbackState }),
  setLastAction: (lastAction) => set({ lastAction }),
}));

/**
 * KAIROS / The Living Word — Music & Worship Experience Architecture
 * Type definitions for the first-class narrative music system.
 */

export type MusicMode = "reading" | "immersion" | "worship";

export type MusicCatalogType = "reading" | "story";

export type MusicCollection =
  | "STILL"
  | "WONDER"
  | "JOURNEY"
  | "LAMENT"
  | "PRESENCE"
  | "HOPE"
  | "TRUST";

export interface WorshipTrack {
  id: string;
  artist: string;
  title: string;
  catalog: MusicCatalogType;
  soundcloudUrl: string;
  youtubeId: string;
  mode: MusicMode;
  emotionalTags: string[];
  chapterTags: string[];
  intensity: number; // 0.0 to 1.0
  isVocal: boolean;
  isInstrumental: boolean;
  recommendedForReading: boolean;
  description: string;
  collection: MusicCollection;
  theologicalContext: string;
  startAt?: number; // start offset in seconds
}

export interface MusicCue {
  trackId: string;
  mode: MusicMode;
  volume: number; // baseline target volume (0.0 to 1.0)
  fadeIn: number; // seconds
  fadeOut: number; // seconds
  crossfade?: number; // seconds
  loop?: boolean;
  startAt?: number;
  emotionalTags: string[];
  scenes: string[];
  silenceReason?: string; // e.g. "Cain murder", "Crucifixion silence", "Wake-up breath"
}

export interface NarrativeDuckingRule {
  blockType: string;
  pov?: "first" | "second" | "third";
  targetRatio: number; // multiplier against track baseline volume
  transitionDuration: number; // in seconds
  description: string;
}

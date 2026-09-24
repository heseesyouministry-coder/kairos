/**
 * KAIROS — Core Narrative Data Types
 * Phase 1 Architecture
 */

export type POV = "third" | "second" | "first";

export type NarrativeRegister = "literary" | "casual";

export type NarrativeBlock =
  | { type: "narrative"; pov: POV; text: string; register?: NarrativeRegister }
  | { type: "dialogue"; pov: POV; speaker: string; text: string; register?: NarrativeRegister }
  | { type: "sensory"; pov: POV; text: string; register?: NarrativeRegister }
  | { type: "internal"; pov: POV; text: string; register?: NarrativeRegister }
  | { type: "immersion"; pov: POV; text: string; register?: NarrativeRegister }
  | { type: "sceneCue"; cue: string }
  | { type: "transitionCue"; to: string }
  | { type: "audioCue"; track: string; action: "playTrack" | "fadeIn" | "fadeOut" | "crossfade" | "duck" }
  | { type: "visualCue"; effect: string };

export type EmotionalState = {
  fear: number;
  grief: number;
  wonder: number;
  attachment: number;
  control: number;
  trust: number;
  overwhelm: number;
};

export type Memory = {
  id: string;
  sourceScene: string;
  emotionalWeight: number; // 0–1
  triggerTags: string[];
};

export type SceneFocus = "theo" | "biblical-character" | "shared";

export type TransitionType = "crossfade" | "hardCut" | "pov-shift" | "collapse";

export type TheoAwakeningState = {
  understandsEverything: boolean;
  stillQuestions: boolean;
  trustChanged: boolean;
  compassionChanged: boolean;
  controlInstinctReduced: boolean;
};

export type CastRelationship = "father" | "mother" | "sister" | "friend" | "mentor";

export type CastMember = {
  id: string;
  name: string;
  relationship: CastRelationship | string;
  sideOfTheoRevealed: string;
};

export type CastEcho = {
  id: string;
  castMemberId: string;
  triggerTags: string[];
  weight: number; // 0–1
};

export type SceneDefinition = {
  id: string;
  narrative: NarrativeBlock[];
  pov: POV;
  focus: SceneFocus;
  emotion: Partial<EmotionalState>;
  environment: { id: string; webglVariant?: string; fallback2D: string };
  audio?: { track?: string; ambient?: string };
  transition: { type: TransitionType; to: string };
  echoTags?: string[];
};

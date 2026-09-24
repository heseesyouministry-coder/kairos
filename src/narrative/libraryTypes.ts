/**
 * KAIROS — Phase 7: The Biblical Library Types
 * Standalone browsable structure separate from Theo's linear journey
 */

export type BiblicalCharacter = {
  id: string;
  name: string;
  era: string;
  stories: string[];        // scene ids this character appears in
  traits: string[];
  relationships: { characterId: string; relation: string }[];
  arc: string;              // short description, not full prose
  scriptureReferences: { book: string; chapters: string }[];
};

export type BookEntry = {
  id: string;               // "genesis", "exodus", ...
  name: string;             // "Genesis", "Exodus", ...
  testament: "old" | "new";
  order: number;             // 1–66
  hasSceneContent: boolean;  // true only if Theo's journey built scenes here
  linkedStoryIds: string[];  // scene/story ids from Phases 1–6, empty if none yet
  category?: string;
};

export type LibraryStoryView = {
  storyId: string;
  bookId: string;
  title: string;
  characterIds: string[];
  hasJourneyVersion: boolean; // true if this same story exists in Theo's linear path
  journeyPath?: string;
  sceneId: string;
  subSceneIds?: string[];
  scriptureReference: string;
  summary?: string;
};

/**
 * KAIROS — MemoryEngine
 * Handles memory formation, emotional weight, trigger tags, and persistent storage.
 */

import { Memory } from "../types";
import { useProgressStore } from "../../state/progressStore";

export const cainBloodMemory: Memory = {
  id: "cain-blood",
  sourceScene: "genesis-cain-abel-field",
  emotionalWeight: 0.92,
  triggerTags: ["violence", "brotherhood", "jealousy"],
};

export const josephSeparationMemory: Memory = {
  id: "joseph-separation",
  sourceScene: "genesis-joseph-pit",
  emotionalWeight: 0.88,
  triggerTags: ["separation", "family", "abandonment", "betrayal"],
};

export const mosesOverwhelmMemory: Memory = {
  id: "moses-overwhelm",
  sourceScene: "exodus-wilderness-complaints",
  emotionalWeight: 0.75,
  triggerTags: ["responsibility", "burden", "leadership", "isolation"],
};

export const davidFallMemory: Memory = {
  id: "david-fall",
  sourceScene: "kingdom-david-bathsheba",
  emotionalWeight: 0.85,
  triggerTags: ["idealization", "failure", "power", "betrayal"],
};

export const jeremiahLonelinessMemory: Memory = {
  id: "jeremiah-loneliness",
  sourceScene: "prophets-jeremiah",
  emotionalWeight: 0.7,
  triggerTags: ["criticism", "rejection", "loneliness", "persistence"],
};

export const jerusalemFallMemory: Memory = {
  id: "jerusalem-fall",
  sourceScene: "collapse-fall-of-jerusalem",
  emotionalWeight: 0.97,
  triggerTags: ["loss", "home", "devastation", "powerlessness"],
};

export const peterDenialMemory: Memory = {
  id: "peter-denial",
  sourceScene: "cross-peter-denial",
  emotionalWeight: 0.9,
  triggerTags: ["failure", "fear", "self-forgiveness", "loyalty"],
};

export const gethsemaneCrossMemory: Memory = {
  id: "gethsemane-cross",
  sourceScene: "cross-crucifixion",
  emotionalWeight: 0.99,
  triggerTags: ["helplessness", "control", "suffering", "cannot-save", "love"],
};

export const samFixItMemory: Memory = {
  id: "sam-fix-it",
  sourceScene: "begin-sam-plan",
  emotionalWeight: 0.55,
  triggerTags: ["control", "fixing", "overanalysis", "uncertainty"],
};

export class MemoryEngine {
  /**
   * Commit a newly crystallized memory to state and LocalStorage
   */
  public static recordMemory(memory: Memory): void {
    const store = useProgressStore.getState();
    store.addMemory(memory);
  }

  /**
   * Check if a memory has been formed
   */
  public static hasMemory(id: string): boolean {
    return useProgressStore.getState().hasMemory(id);
  }

  /**
   * Retrieve all recorded memories
   */
  public static getAllMemories(): Memory[] {
    return useProgressStore.getState().storedMemories;
  }

  /**
   * Find memories matching trigger tags, sorted descending by emotional weight.
   * High-weight memories like 'gethsemane-cross' (0.99) surface first when querying ["helplessness", "cannot-save"].
   */
  public static findByTags(tags: string[]): Memory[] {
    const all = this.getAllMemories();
    return all
      .filter((mem) => mem.triggerTags.some((t) => tags.includes(t)))
      .sort((a, b) => b.emotionalWeight - a.emotionalWeight);
  }

  /**
   * Clear all memories (for debugging or replay)
   */
  public static resetMemories(): void {
    useProgressStore.getState().clearMemories();
  }
}

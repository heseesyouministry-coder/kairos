import { SceneDefinition, NarrativeBlock } from "../types";

/**
 * KAIROS — Phase 7: Library Engine
 * Transforms Journey Mode scenes into standalone Biblical Library readings.
 */
export class LibraryEngine {
  /**
   * Library Mode transformation.
   * Strips out blocks that only make sense as Theo's private experience:
   * 1. All type: "internal" blocks (Theo's private coping patterns)
   * 2. Journey-specific scene cues referencing Theo
   * 3. Linear journey route transition cues
   *
   * Preserves:
   * - narrative (third person)
   * - dialogue (scriptural exchanges)
   * - sensory (atmospheric textures)
   * - immersion (second-person direct address)
   */
  public static toLibraryView(scene: SceneDefinition): NarrativeBlock[] {
    return scene.narrative.filter((block) => {
      // 1. Hide internal blocks (Theo's private monologue)
      if (block.type === "internal") {
        return false;
      }

      // 2. Strip journey-specific cues targeting Theo
      if (block.type === "sceneCue") {
        const lowerCue = block.cue.toLowerCase();
        if (lowerCue.includes("theo") || lowerCue.includes("notebook") || lowerCue.includes("coping")) {
          return false;
        }
      }

      // 3. Strip linear journey transitions (since library has its own navigation)
      if (block.type === "transitionCue") {
        return false;
      }

      return true;
    });
  }

  /**
   * Calculates side-by-side comparison statistics between Journey Mode and Library Mode.
   * Used in Debug Mode and telemetry inspection.
   */
  public static getSceneStats(scene: SceneDefinition) {
    const journeyBlocks = scene.narrative;
    const libraryBlocks = this.toLibraryView(scene);

    const countWords = (blocks: NarrativeBlock[]) => {
      return blocks.reduce((acc, b) => {
        if ("text" in b && typeof b.text === "string") {
          return acc + b.text.trim().split(/\s+/).filter(Boolean).length;
        }
        return acc;
      }, 0);
    };

    const journeyWords = countWords(journeyBlocks);
    const libraryWords = countWords(libraryBlocks);

    const internalBlocks = journeyBlocks.filter((b) => b.type === "internal").length;
    const theoCues = journeyBlocks.filter(
      (b) => b.type === "sceneCue" && b.cue.toLowerCase().includes("theo")
    ).length;

    return {
      sceneId: scene.id,
      journeyBlocksCount: journeyBlocks.length,
      libraryBlocksCount: libraryBlocks.length,
      strippedBlocksCount: journeyBlocks.length - libraryBlocks.length,
      journeyWordCount: journeyWords,
      libraryWordCount: libraryWords,
      strippedWordCount: journeyWords - libraryWords,
      internalBlocksRemoved: internalBlocks,
      theoCuesRemoved: theoCues,
    };
  }
}

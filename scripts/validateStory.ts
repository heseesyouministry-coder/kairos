/**
 * KAIROS — Story Validation Checker (Phase 8)
 * Build-time script that validates all SceneDefinition data across every phase.
 * Fails the build in CI on violations.
 */

import { allScenes } from "../src/content/allScenes";
import { ALL_CHARACTERS } from "../src/content/library/charactersData";
import { ALL_BOOKS } from "../src/content/library/booksData";
import { ALL_LIBRARY_STORIES } from "../src/content/library/storiesData";
import { CANONICAL_CAST_ECHOES } from "../src/narrative/EchoEngine/echoStore";
import { SceneDefinition } from "../src/narrative/types";

export type ValidationError = {
  sceneId: string;
  rule: string;
  message: string;
};

// Registered Cast Echo trigger tags and Memory trigger tags
const REGISTERED_ECHO_TAGS = new Set(CANONICAL_CAST_ECHOES.flatMap((e) => e.triggerTags));
const KNOWN_MEMORY_TAGS = new Set([
  "violence",
  "brotherhood",
  "jealousy",
  "separation",
  "family",
  "abandonment",
  "betrayal",
  "responsibility",
  "burden",
  "leadership",
  "isolation",
  "idealization",
  "failure",
  "power",
  "criticism",
  "rejection",
  "loneliness",
  "persistence",
  "loss",
  "home",
  "devastation",
  "powerlessness",
  "self-forgiveness",
  "loyalty",
  "helplessness",
  "control",
  "suffering",
  "cannot-save",
  "love",
  "fixing",
  "overanalysis",
  "uncertainty",
]);

// Valid POVs and Registers
const VALID_POVS = new Set(["first", "second", "third"]);
const VALID_REGISTERS = new Set(["literary", "casual"]);

export function validateStory(scenes: SceneDefinition[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const seenIds = new Set<string>();
  const allSceneKeys = new Set(scenes.map((s) => s.id));

  for (const scene of scenes) {
    // 1. Duplicate ID check
    if (seenIds.has(scene.id)) {
      errors.push({
        sceneId: scene.id,
        rule: "duplicate-id",
        message: `Scene ID '${scene.id}' is already used elsewhere in the story registry.`,
      });
    }
    seenIds.add(scene.id);

    // 2. Missing or empty narrative
    if (!scene.narrative || scene.narrative.length === 0) {
      errors.push({
        sceneId: scene.id,
        rule: "missing-narrative",
        message: "Scene contains no narrative blocks.",
      });
    }

    // 3. POV validation
    if (!scene.pov) {
      errors.push({
        sceneId: scene.id,
        rule: "missing-pov",
        message: "Scene is missing POV specification.",
      });
    } else if (!VALID_POVS.has(scene.pov)) {
      errors.push({
        sceneId: scene.id,
        rule: "invalid-pov",
        message: `Invalid POV '${scene.pov}'. Must be one of: first, second, third.`,
      });
    }

    // 4. Transitions
    if (!scene.transition?.to && scene.transition?.type !== "collapse") {
      errors.push({
        sceneId: scene.id,
        rule: "missing-next-scene",
        message: "Scene has no valid transition target and is not marked as collapse.",
      });
    } else if (scene.transition?.to) {
      const to = scene.transition.to;
      // Allow route paths (/experience/...) or direct scene IDs or "end"
      if (!to.startsWith("/") && to !== "end" && !allSceneKeys.has(to)) {
        errors.push({
          sceneId: scene.id,
          rule: "broken-transition",
          message: `Transition target '${to}' does not exist in the scene registry.`,
        });
      }
    }

    // 5. Emotional state values within [0, 1] range
    if (scene.emotion) {
      for (const [emotionKey, val] of Object.entries(scene.emotion)) {
        if (typeof val === "number" && (val < 0 || val > 1)) {
          errors.push({
            sceneId: scene.id,
            rule: "invalid-emotion-range",
            message: `Emotion '${emotionKey}' has value ${val}, which is outside the required [0, 1] range.`,
          });
        }
      }
    }

    // 6. Narrative blocks: check register, block POV, and text content
    if (scene.narrative) {
      scene.narrative.forEach((block, idx) => {
        if ("register" in block && block.register && !VALID_REGISTERS.has(block.register)) {
          errors.push({
            sceneId: scene.id,
            rule: "invalid-register",
            message: `Block #${idx} (${block.type}) uses invalid register '${block.register}'. Must be literary or casual.`,
          });
        }
        if ("pov" in block && block.pov && !VALID_POVS.has(block.pov)) {
          errors.push({
            sceneId: scene.id,
            rule: "invalid-block-pov",
            message: `Block #${idx} (${block.type}) uses invalid POV '${block.pov}'.`,
          });
        }
      });
    }

    // 7. Echo tags validation
    if (scene.echoTags && scene.echoTags.length > 0) {
      for (const tag of scene.echoTags) {
        if (!REGISTERED_ECHO_TAGS.has(tag) && !KNOWN_MEMORY_TAGS.has(tag)) {
          errors.push({
            sceneId: scene.id,
            rule: "unregistered-echo-tag",
            message: `Echo tag '${tag}' does not match any registered Cast Echo or Memory trigger tags.`,
          });
        }
      }
    }

    // 8. Cross-check biblical-character focus scenes
    if (scene.focus === "biblical-character") {
      const associatedStory = ALL_LIBRARY_STORIES.find(
        (s) => s.sceneId === scene.id || s.subSceneIds?.includes(scene.id)
      );
      const directChar = ALL_CHARACTERS.find((c) => c.stories.includes(scene.id));
      if (!associatedStory && !directChar) {
        errors.push({
          sceneId: scene.id,
          rule: "missing-character",
          message: `Scene has focus 'biblical-character' but has no linked BiblicalCharacter or LibraryStory.`,
        });
      }
    }

    // 9. Environment & Audio assets check
    if (!scene.environment?.id && !scene.environment?.fallback2D) {
      errors.push({
        sceneId: scene.id,
        rule: "missing-environment",
        message: "Scene is missing environment configuration.",
      });
    }
    if (!scene.audio?.track) {
      errors.push({
        sceneId: scene.id,
        rule: "missing-audio-track",
        message: "Scene is missing audio track specification.",
      });
    }
  }

  // 10. Cross-verify Library stories and character links
  for (const story of ALL_LIBRARY_STORIES) {
    if (!allSceneKeys.has(story.sceneId)) {
      errors.push({
        sceneId: story.sceneId,
        rule: "missing-story-scene",
        message: `Library story '${story.title}' references missing sceneId '${story.sceneId}'.`,
      });
    }
    if (!story.scriptureReference || story.scriptureReference.trim() === "") {
      errors.push({
        sceneId: story.sceneId,
        rule: "missing-scripture-reference",
        message: `Library story '${story.title}' is missing Scripture references.`,
      });
    }
  }

  for (const char of ALL_CHARACTERS) {
    for (const storyId of char.stories) {
      if (!allSceneKeys.has(storyId)) {
        errors.push({
          sceneId: storyId,
          rule: "missing-character-scene",
          message: `BiblicalCharacter '${char.name}' references non-existent scene '${storyId}'.`,
        });
      }
    }
  }

  return errors;
}

// Direct CLI Execution
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("\n=======================================================");
  console.log("  KAIROS — Story & Narrative Validation Suite (Phase 8)");
  console.log("=======================================================\n");

  const scenes = Object.values(allScenes);
  console.log(`Auditing ${scenes.length} registered scenes across 66 books and Theo's journey...`);

  const errors = validateStory(scenes);

  if (errors.length === 0) {
    console.log(`\n\x1b[32m✔ SUCCESS: All ${scenes.length} scenes passed narrative validation with 0 violations.\x1b[0m\n`);
    process.exit(0);
  } else {
    console.error(`\n\x1b[31m✖ FAILURE: Found ${errors.length} validation errors:\x1b[0m\n`);
    errors.forEach((err, idx) => {
      console.error(`  ${idx + 1}. [${err.rule}] in scene '${err.sceneId}':\n     ${err.message}`);
    });
    console.error("\nStory build check failed. Please resolve the violations above.\n");
    process.exit(1);
  }
}

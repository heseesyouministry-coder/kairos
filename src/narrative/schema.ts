import { z } from "zod";

export const POVSchema = z.enum(["third", "second", "first"]);
export const NarrativeRegisterSchema = z.enum(["literary", "casual"]);

export const NarrativeBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("narrative"),
    pov: POVSchema,
    text: z.string(),
    register: NarrativeRegisterSchema.optional(),
  }),
  z.object({
    type: z.literal("dialogue"),
    pov: POVSchema,
    speaker: z.string(),
    text: z.string(),
    register: NarrativeRegisterSchema.optional(),
  }),
  z.object({
    type: z.literal("sensory"),
    pov: POVSchema,
    text: z.string(),
    register: NarrativeRegisterSchema.optional(),
  }),
  z.object({
    type: z.literal("internal"),
    pov: POVSchema,
    text: z.string(),
    register: NarrativeRegisterSchema.optional(),
  }),
  z.object({
    type: z.literal("immersion"),
    pov: POVSchema,
    text: z.string(),
    register: NarrativeRegisterSchema.optional(),
  }),
  z.object({
    type: z.literal("sceneCue"),
    cue: z.string(),
  }),
  z.object({
    type: z.literal("transitionCue"),
    to: z.string(),
  }),
  z.object({
    type: z.literal("audioCue"),
    track: z.string(),
    action: z.enum(["playTrack", "fadeIn", "fadeOut", "crossfade", "duck"]),
  }),
  z.object({
    type: z.literal("visualCue"),
    effect: z.string(),
  }),
]);

export const EmotionalStateSchema = z.object({
  fear: z.number().min(-1).max(1),
  grief: z.number().min(-1).max(1),
  wonder: z.number().min(-1).max(1),
  attachment: z.number().min(-1).max(1),
  control: z.number().min(-1).max(1),
  trust: z.number().min(-1).max(1),
  overwhelm: z.number().min(-1).max(1),
});

export const MemorySchema = z.object({
  id: z.string(),
  sourceScene: z.string(),
  emotionalWeight: z.number().min(0).max(1),
  triggerTags: z.array(z.string()),
});

export const SceneDefinitionSchema = z.object({
  id: z.string(),
  narrative: z.array(NarrativeBlockSchema),
  pov: POVSchema,
  focus: z.enum(["theo", "biblical-character", "shared"]),
  emotion: EmotionalStateSchema.partial(),
  environment: z.object({
    id: z.string(),
    webglVariant: z.string().optional(),
    fallback2D: z.string(),
  }),
  audio: z
    .object({
      track: z.string().optional(),
      ambient: z.string().optional(),
    })
    .optional(),
  transition: z.object({
    type: z.enum(["crossfade", "hardCut", "pov-shift", "collapse"]),
    to: z.string(),
  }),
  echoTags: z.array(z.string()).optional(),
});

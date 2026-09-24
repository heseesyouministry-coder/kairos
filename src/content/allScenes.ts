import { SceneDefinition } from "../narrative/types";
import { SceneDefinitionSchema } from "../narrative/schema";
import { beginScene } from "./begin/scene";
import { mountainScene } from "./mountain/scene";
import { creationScene } from "./genesis/creation/scene";
import { edenScene } from "./genesis/eden/scene";
import { cainAndAbelOffering, cainAndAbelField } from "./genesis/cain-abel/scene";
import { floodScene } from "./genesis/flood/scene";
import { babelScene } from "./genesis/babel/scene";
import { abrahamLeavesScene } from "./genesis/abraham/scene";
import { jacobScene } from "./genesis/jacob/scene";
import { josephThePit, josephCaravan } from "./genesis/joseph/scene";
import { mosesChildhoodScene, burningBushScene } from "./exodus/moses/scene";
import { plaguesScene } from "./exodus/plagues/scene";
import { redSeaCrossing } from "./exodus/red-sea/scene";
import { sinaiScene } from "./exodus/sinai/scene";
import { wildernessComplaintsScene } from "./exodus/wilderness/scene";
import { awakeningScene } from "./awakening/scene";

export const allScenes: Record<string, SceneDefinition> = {
  [beginScene.id]: beginScene,
  [mountainScene.id]: mountainScene,
  [creationScene.id]: creationScene,
  [edenScene.id]: edenScene,
  [cainAndAbelOffering.id]: cainAndAbelOffering,
  [cainAndAbelField.id]: cainAndAbelField,
  [floodScene.id]: floodScene,
  [babelScene.id]: babelScene,
  [abrahamLeavesScene.id]: abrahamLeavesScene,
  [jacobScene.id]: jacobScene,
  [josephThePit.id]: josephThePit,
  [josephCaravan.id]: josephCaravan,
  [mosesChildhoodScene.id]: mosesChildhoodScene,
  [burningBushScene.id]: burningBushScene,
  [plaguesScene.id]: plaguesScene,
  [redSeaCrossing.id]: redSeaCrossing,
  [sinaiScene.id]: sinaiScene,
  [wildernessComplaintsScene.id]: wildernessComplaintsScene,
  [awakeningScene.id]: awakeningScene,
};

// Validate all scenes with Zod at initialization
export function validateAllScenes(): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  for (const [id, scene] of Object.entries(allScenes)) {
    const result = SceneDefinitionSchema.safeParse(scene);
    if (!result.success) {
      errors.push(`Scene "${id}": ${result.error.issues.map((i) => i.message).join(", ")}`);
    }
  }
  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

// Run validation immediately
const validation = validateAllScenes();
if (!validation.valid) {
  console.error("Narrative scene schema validation failed:", validation.errors);
}

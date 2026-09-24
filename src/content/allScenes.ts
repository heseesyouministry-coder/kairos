import { SceneDefinition } from "../narrative/types";
import { SceneDefinitionSchema } from "../narrative/schema";

// Prologue & Mountain
import { beginScene } from "./begin/scene";
import { BEGIN_CAST_SCENES } from "./begin/castScenes";
import { mountainScene } from "./mountain/scene";

// Genesis
import { creationScene } from "./genesis/creation/scene";
import { edenScene } from "./genesis/eden/scene";
import { cainAndAbelOffering, cainAndAbelField } from "./genesis/cain-abel/scene";
import { floodScene } from "./genesis/flood/scene";
import { babelScene } from "./genesis/babel/scene";
import { abrahamLeavesScene } from "./genesis/abraham/scene";
import { jacobScene } from "./genesis/jacob/scene";
import { josephThePit, josephCaravan } from "./genesis/joseph/scene";

// Exodus
import { mosesChildhoodScene, burningBushScene } from "./exodus/moses/scene";
import { plaguesScene } from "./exodus/plagues/scene";
import { redSeaCrossing } from "./exodus/red-sea/scene";
import { sinaiScene } from "./exodus/sinai/scene";
import { wildernessComplaintsScene } from "./exodus/wilderness/scene";

// Kingdom
import {
  joshuaJerichoScene,
  judgesScene,
  ruthScene,
  samuelScene,
  saulScene,
  davidGoliathScene,
  davidJonathanScene,
  davidSaulScene,
  davidAndBathsheba,
  solomonScene,
  theTempleScene,
  dividedKingdomScene,
  elijahScene,
  elishaScene,
  isaiahScene,
} from "./kingdom/kingdomScenes";

// Exile
import {
  jeremiahScene,
  fallOfJerusalemScene,
  danielScene,
  estherScene,
  jobScene,
} from "./exile/exileScenes";

// Restoration
import {
  returnFromExileScene,
  ezraNehemiahScene,
  theLongSilenceScene,
} from "./restoration/restorationScenes";

// Gospels
import {
  firstSightOfJesusScene,
  jesusOrdinaryPeopleScene,
  sermonOnTheMountScene,
  theMiraclesScene,
  theDisciplesScene,
  petersConfessionScene,
  theosInterventionScene,
  triumphalEntryScene,
  emptyTombScene,
  resurrectionAppearancesScene,
} from "./gospels/gospelScenes";

// Cross
import {
  gethsemaneScene,
  arrestScene,
  petersDenialScene,
  theTrialScene,
  crucifixionScene,
} from "./cross/crossScenes";

// Acts
import {
  pentecostScene,
  earlyChurchScene,
  stephenScene,
  paulScene,
} from "./acts/actsScenes";

// Revelation
import {
  revelationBeginsScene,
  theoTriesToUnderstandScene,
  finalVisionScene,
} from "./revelation/revelationScenes";

// Awakening
import { awakeningScene } from "./awakening/scene";

export const allScenes: Record<string, SceneDefinition> = {
  // Prologue & Mountain
  [beginScene.id]: beginScene,
  ...BEGIN_CAST_SCENES,
  [mountainScene.id]: mountainScene,

  // Genesis
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

  // Exodus
  [mosesChildhoodScene.id]: mosesChildhoodScene,
  [burningBushScene.id]: burningBushScene,
  [plaguesScene.id]: plaguesScene,
  [redSeaCrossing.id]: redSeaCrossing,
  [sinaiScene.id]: sinaiScene,
  [wildernessComplaintsScene.id]: wildernessComplaintsScene,

  // Kingdom
  [joshuaJerichoScene.id]: joshuaJerichoScene,
  [judgesScene.id]: judgesScene,
  [ruthScene.id]: ruthScene,
  [samuelScene.id]: samuelScene,
  [saulScene.id]: saulScene,
  [davidGoliathScene.id]: davidGoliathScene,
  [davidJonathanScene.id]: davidJonathanScene,
  [davidSaulScene.id]: davidSaulScene,
  [davidAndBathsheba.id]: davidAndBathsheba,
  [solomonScene.id]: solomonScene,
  [theTempleScene.id]: theTempleScene,
  [dividedKingdomScene.id]: dividedKingdomScene,
  [elijahScene.id]: elijahScene,
  [elishaScene.id]: elishaScene,
  [isaiahScene.id]: isaiahScene,

  // Exile
  [jeremiahScene.id]: jeremiahScene,
  [fallOfJerusalemScene.id]: fallOfJerusalemScene,
  [danielScene.id]: danielScene,
  [estherScene.id]: estherScene,
  [jobScene.id]: jobScene,

  // Restoration
  [returnFromExileScene.id]: returnFromExileScene,
  [ezraNehemiahScene.id]: ezraNehemiahScene,
  [theLongSilenceScene.id]: theLongSilenceScene,

  // Gospels
  [firstSightOfJesusScene.id]: firstSightOfJesusScene,
  [jesusOrdinaryPeopleScene.id]: jesusOrdinaryPeopleScene,
  [sermonOnTheMountScene.id]: sermonOnTheMountScene,
  [theMiraclesScene.id]: theMiraclesScene,
  [theDisciplesScene.id]: theDisciplesScene,
  [petersConfessionScene.id]: petersConfessionScene,
  [theosInterventionScene.id]: theosInterventionScene,
  [triumphalEntryScene.id]: triumphalEntryScene,
  [emptyTombScene.id]: emptyTombScene,
  [resurrectionAppearancesScene.id]: resurrectionAppearancesScene,

  // Cross
  [gethsemaneScene.id]: gethsemaneScene,
  [arrestScene.id]: arrestScene,
  [petersDenialScene.id]: petersDenialScene,
  [theTrialScene.id]: theTrialScene,
  [crucifixionScene.id]: crucifixionScene,

  // Acts
  [pentecostScene.id]: pentecostScene,
  [earlyChurchScene.id]: earlyChurchScene,
  [stephenScene.id]: stephenScene,
  [paulScene.id]: paulScene,

  // Revelation
  [revelationBeginsScene.id]: revelationBeginsScene,
  [theoTriesToUnderstandScene.id]: theoTriesToUnderstandScene,
  [finalVisionScene.id]: finalVisionScene,

  // Awakening
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

import { SceneDefinition } from "../../../narrative/types";

export const abrahamLeavesScene: SceneDefinition = {
  id: "genesis-abraham-leaves",
  pov: "third",
  focus: "shared",
  emotion: {
    trust: 0.5,
    control: 0.25,
    wonder: 0.6,
    fear: 0.3,
  },
  environment: {
    id: "haran-starlight",
    fallback2D: "haran-starlight-2d",
  },
  audio: {
    track: "abraham",
    ambient: "desert-night",
  },
  echoTags: ["father", "son", "correction", "approval", "discipline"],
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pitumpu't limang taong gulang na si Abram nang mag-impake siya ng mga tolda sa Haran — walang mapa sa kamay, walang guarantees, walang breakdown ng ruta kung saan sila pupunta.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Paano ka naglalakad palayo sa lahat ng kinalakihan mo kung hindi mo alam kung saan magtatapos ang lahat? Yung utak ko, hindi sanay sa ganito... kailangan ko laging may itinerary.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Lumalakad ka sa tabi ng mga kamelyo sa ilalim ng madilim na langit, at naririnig mo ang matandang boses ni Abram habang kinakausap ang asawa niya, kalmado, may konting pag-aalinlangan pero tuloy pa rin ang hakbang.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "walang gps dito, bro. stars lang sa langit, tapos yung pangako na hindi mo pa nakikita.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tapos dumating ang alitan ng mga pastol nila ni Lot — ang pagnanais ni Theo na makialam, na mag-suggest ng fair division ng pasture, pero napanood niya si Abram na sinabing: 'Pumili ka. Kung pakaliwa ka, pakanan ako.'",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Binitawan niya yung pinakamagandang lupain. Parang tanga sa mata ng negosyo. Pero may kapayapaan sa mukha niya na hindi kayang bilhin ng pinakamalawak na bukirin.",
    },
    {
      type: "sceneCue",
      cue: "The quiet grazing fields of Bethel turn toward the scorched horizon of the valley.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "At pagkatapos, ang usok ng Sodom sa umaga — parang usok mula sa malaking pugon na umaakyat sa langit; nakatayo si Abram sa gilid ng bangin, tahimik, nananalangin para sa mga taong hindi na niya kayang abutan.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hanggang sa dinala siya sa Bundok Moriah: ang kahoy sa balikat ni Isaac, ang kutsilyo sa kamay ng ama, at ang tanong na bumasag sa lalamunan ni Theo: “Nandito ang apoy at kahoy, pero nasaan ang kordero?”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nanginginig ako. Kasi akala ko ang pag-ibig palaging ibig sabihin ay protektahan ang mahal mo mula sa kahit anong sakit. Pero may mas malalim pa palang hiwaga rito na hindi ko pa kayang arukin...",
    },
    {
      type: "sceneCue",
      cue: "A ram rustles in the mountain thicket. The lineage turns toward the desert wells of Beersheba.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/jacob",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/genesis/jacob",
  },
};

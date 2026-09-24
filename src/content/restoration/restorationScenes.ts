import { SceneDefinition } from "../../narrative/types";

/**
 * 21. Return from Exile
 * Role: Participant
 * Attacks in Theo: Defining history through catastrophe only
 * Emotion: Hope
 */
export const returnFromExileScene: SceneDefinition = {
  id: "restoration-return",
  pov: "second",
  focus: "theo",
  emotion: {
    trust: 0.8,
    grief: 0.45,
    wonder: 0.7,
    attachment: 0.65,
  },
  environment: {
    id: "jerusalem-foundation-tears",
    fallback2D: "jerusalem-foundation-2d",
  },
  audio: {
    track: "return-exile",
    ambient: "temple-foundation-tears",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Nang mailagay ng mga manggagawa ang pundasyon ng bagong Templo, nagpatugtog ang mga saserdote ng mga trumpeta at pompiyas. May mga kabataang sumisigaw sa tuwa, pero may mga matatandang umiiyak nang malakas dahil naaalala pa nila ang unang Templo ni Solomon — hanggang sa hindi na makilala ng mga tao ang sigaw ng kagalakan sa tunog ng panaghoy.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "halo-halong emosyon. hindi perpekto yung bagong simula, may sugat pa rin ng nakaraan, pero buhay pa rin sila.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Sanay akong tingnan ang kasaysayan bilang sunod-sunod na trahedya lang — na kapag may nasira, tapos na ang kwento. Pero sa mga luhang ito sa ibabaw ng bagong pundasyon, nakita ko: hindi sumusuko ang Diyos sa Kanyang tipan. Kahit maliit ang simula, may buhay na sumisibol sa kabila ng abo.",
    },
    {
      type: "transitionCue",
      to: "/experience/restoration/ezra-nehemiah",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/restoration/ezra-nehemiah",
  },
};

/**
 * 22. Ezra & Nehemiah
 * Role: Participant/Companion
 * Attacks in Theo: Need for immediate results
 * Emotion: Patience
 */
export const ezraNehemiahScene: SceneDefinition = {
  id: "restoration-ezra-nehemiah",
  pov: "second",
  focus: "shared",
  emotion: {
    trust: 0.75,
    control: 0.4,
    grief: 0.35,
    attachment: 0.6,
  },
  environment: {
    id: "jerusalem-rebuilt-walls",
    fallback2D: "jerusalem-rebuilt-2d",
  },
  audio: {
    track: "ezra-nehemiah",
    ambient: "ruined-wall-wind",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "May hawak na kutsara ng semento sa isang kamay at sibat sa kabilang kamay. Sa loob ng limampu't dalawang araw, bawat pamilya ay nagtayo sa tapat ng sarili nilang bahay; habang binabasa ni Ezra ang Batas mula umaga hanggang tanghali sa harap ng Tarangkahan ng Tubig.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "mabagal, mano-mano, may nagbabantang kaaway sa paligid. walang magic wand dito, puro pawis at batong pinapatong isa-isa.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Gusto ko laging mabilisan ang resulta — instant healing, instant spiritual maturity, instant ayos ng lahat ng gulo sa buhay ko. Pero dito sa muling pagtatayo ng pader, natutunan ko ang pasensya ng biyaya. Ang pagpapanumbalik ay ginagawa bato sa bato, linya sa linya, araw-araw na pagbabalik sa Kanyang Salita nang may pagtitiyaga.",
    },
    {
      type: "transitionCue",
      to: "/experience/restoration/the-silence",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/restoration/the-silence",
  },
};

/**
 * 23. The Long Silence
 * Role: Observer
 * Attacks in Theo: Relationship with uncertainty itself — bridge to Jesus
 * Emotion: Expectation
 * Note: Out of scope: Jesus doesn't appear yet, not even a hint. Ends on Theo not knowing what comes next.
 */
export const theLongSilenceScene: SceneDefinition = {
  id: "restoration-the-silence",
  pov: "first",
  focus: "theo",
  emotion: {
    wonder: 0.8,
    trust: 0.7,
    fear: 0.3,
    attachment: 0.65,
    overwhelm: 0.4,
  },
  environment: {
    id: "intertestamental-twilight-silence",
    fallback2D: "twilight-silence-2d",
  },
  audio: {
    track: "the-long-silence",
    ambient: "expectant-silence",
  },
  echoTags: ["music", "silence", "companionship-without-words"],
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Apatnaraang taon. Walang propetang nagsalita. Walang bagong aklat na isinulat. Ang mga imperyo ay nagpalit-palit — Persia, Gresya, Roma — habang ang mga tao ay nagbubungkal ng lupa, nag-aasawa, at naghihintay sa ilalim ng madilim na langit.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "nakakabingi yung katahimikan kapag sanay kang laging may tinig ng propeta o bagong pangitain.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Lagi akong naiinip sa silence ng Diyos. Tuwing hindi Siya sumasagot agad, inaakala kong iniwan na Niya ako o wala nang pakialam ang langit. Pero dito sa gitna ng mahabang katahimikan, naramdaman ko ang kakaibang bigat ng pag-asa. Hindi pala kawalan ng pagkilos ang katahimikan — ito ay ang paghinga ng kasaysayan bago ang pinakadakilang pagsikat ng araw.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Hindi ko alam kung ano ang susunod. Wala pa akong nakikitang Liwanag, walang anghel na bumababa sa aking paningin. Pero sa unang pagkakataon sa buong buhay ko, hindi na ako natatakot na hindi malaman ang dulo. Handa na akong maghintay.",
    },
    {
      type: "sceneCue",
      cue: "The dust of four hundred silent years settles as the dawn of history holds its breath.",
    },
    {
      type: "transitionCue",
      to: "/experience/gospels/first-sight",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/gospels/first-sight",
  },
};

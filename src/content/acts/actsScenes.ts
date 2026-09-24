/**
 * KAIROS — Phase 5: Acts Content
 * The Expanding Church: Pentecost, Early Church, Stephen, Paul
 */

import { SceneDefinition } from "../../narrative/types";

// 1. PENTECOST (Idea that courage means never being afraid -> Inspiration)
export const pentecostScene: SceneDefinition = {
  id: "acts-pentecost",
  focus: "shared",
  pov: "third",
  emotion: { wonder: 0.85, trust: 0.8, fear: 0.2 },
  environment: { id: "upper-room", fallback2D: "upper-room-2d" },
  audio: {
    track: "acts-dawn",
    ambient: "upper-room-breath",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nasa itaas na silid si Theo nang marinig niya ang hangin — hindi yung hanging humahampas sa labas ng bintana, kundi isang tunog na parang hiningang pumupuno sa buong silid mula sa loob patingala.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "akala niya dati ang ibig sabihin ng tapang ay walang takot. na kapag dumating ang Espiritu, magiging bato agad ang mga tao.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Tiningnan ko ang kamay ni Pedro habang tumatayo siya. Bahagyang nanginginig pa rin ang mga daliri niya — yung parehong mga kamay na nagpainit sa tabi ng uling sa bakuran ng punong saserdote. Hindi nawala ang takot niya. Pero humakbang pa rin siya palabas.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "May ningas na parang dila ng apoy sa ibabaw ng bawat isa, pero walang nasusunog. Ang amoy ay hindi abo, kundi parang sariwang ulan sa tuyong lupa.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Pedro",
      register: "literary",
      text: "“Ang taong ito, na ipinako ninyo sa krus — binuhay Siya ng Diyos, at saksi kaming lahat doon.”",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "yun pala yun. hindi pagiging manhid. hindi pagiging bayani sa pelikula. pagsunod habang nanginginig pa.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/acts/early-church" },
};

// 2. EARLY CHURCH (Romanticized idea of perfect community -> Maturity)
// Resonates with moses-overwhelm (leadership strain)
export const earlyChurchScene: SceneDefinition = {
  id: "acts-early-church",
  focus: "shared",
  pov: "third",
  emotion: { attachment: 0.8, trust: 0.8, control: 0.15 },
  environment: { id: "early-church-courtyard", fallback2D: "early-church-2d" },
  audio: {
    track: "expansion",
    ambient: "expansion-wind",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Napanood ni Theo ang paghahati ng tinapay sa bawat tahanan. Walang marangyang templo; mga simpleng mangkok, mga basag na plato, at mga taong nagtitipon nang may kagalakan at katapatan ng puso.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "madaling i-romanticize ang unang iglesya kung babasahin mo lang sa summary — 'lahat ay nagkakaisa, walang nagkukulang.' pero nandito siya sa gitna nila.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "May bulung-bulungan din sa sulok. May reklamo tungkol sa pamamahagi ng pagkain sa mga biyuda. Hindi sila perpekto. Pagod din ang mga apostol — naalala ko bigla si Moises sa ilang, nagrereklamo sa Diyos dahil hindi niya kayang buhatin ang bigat ng buong bayan mag-isa.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Ngunit sa kabila ng alitan, walang spreadsheet na inilabas upang i-organisa ang pag-ibig. Naglagay sila ng pitong lalaking puno ng Espiritu para magsilbi. Nagpatawad sila. Nagpatuloy sila.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "hindi pala kailangang maging walang dungis ang komunidad para manahan ang biyaya. kailangan lang nilang huwag umalis kapag naging magulo.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/acts/stephen" },
};

// 3. STEPHEN (Fear of death — reaction has changed: GRIEF + ACCEPTANCE, not devastation!)
// Resonates with jeremiah-loneliness and jerusalem-fall
export const stephenScene: SceneDefinition = {
  id: "acts-stephen",
  focus: "biblical-character",
  pov: "third",
  // CRITICAL REQUIREMENT: grief + acceptance, NOT devastation!
  emotion: { grief: 0.75, trust: 0.85, wonder: 0.6, fear: 0.2 },
  environment: { id: "stephen-stoning-gate", fallback2D: "stephen-stoning-2d" },
  audio: {
    track: "expansion",
    ambient: "open-heavens",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sa labas ng pader ng lungsod, pumutok ang unang bato sa tuyong lupa. Narinig ni Theo ang galit ng mga tao — hindi galit ng katuwiran kundi galit ng mga taong nasugatan ang sariling katigasan ng ulo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "parang si Jeremias, na tinutuya at binugbog pero hindi pa rin tumitigil. pero iba ang mukha ni Esteban ngayon.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Tumingin si Esteban sa langit. Ang mukha niya ay walang bahid ng pagkamuhi o pagmamadali — parang mukha ng isang anghel na nakatingin sa isang bukas na pintuan.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Esteban",
      register: "literary",
      text: "“Panginoon, huwag Mo silang panagutin sa kasalanang ito.”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nang bumagsak ang Jerusalem, nadurog ako — parang nawala ang lahat, parang wala nang Diyos. Pero ngayon, habang bumabagsak si Esteban sa lupa, may lungkot pero walang pagkawasak. May sakit, pero may kapayapaan na hindi kayang sirain ng mga bato.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "hindi ibig sabihin na kapag may namatay, natalo ang kuwento.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/acts/paul" },
};

// 4. PAUL (Permanently categorizing people by their worst action -> Humility)
// Resonates with david-fall and joseph-separation
export const paulScene: SceneDefinition = {
  id: "acts-paul",
  focus: "biblical-character",
  pov: "third",
  emotion: { wonder: 0.8, trust: 0.8, grief: 0.3 },
  environment: { id: "damascus-road", fallback2D: "damascus-road-2d" },
  audio: {
    track: "expansion",
    ambient: "expansion-wind",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nakita ni Theo ang lalaking humawak sa mga balabal ng mga pumatay kay Esteban. Si Saulo — mabangis, may hawak na liham mula sa punong saserdote, kumbinsidong ang pagpatay ay paglilingkod sa Diyos.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "kung may taong madaling husgahan at ilagay sa kahon ng 'masamang tao magpakailanman,' siya yun. walang alinlangan.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Ngunit sa daan patungong Damasco, isang liwanag mula sa langit ang nagpabagsak sa kanya sa alabok. Walang kidlat ng pagpatay, kundi isang tinig na nagtatanong: 'Bakit mo ako pinag-uusig?'",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naalala ko si David sa kanyang kasalanan — ang bilis kong sabihing tapos na siya, na hindi na siya mabuti. At naalala ko si Jose, kung paano binago ng Diyos ang buong buhay ng mga kapatid na nagbenta sa kanya. Ang tao ay hindi nagtatapos sa kanyang pinakamasamang ginawa.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pumasok si Ananias sa bahay, nanginginig ngunit sumusunod, ipinatong ang kanyang mga kamay sa lalaking pumatay sa kanyang mga kapatid, at sinabi: 'Kapatid na Saulo.'",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "kapatid. sa isang salita, gumuho ang buong sistema ko ng pag-uuri sa mga tao.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/revelation/begins" },
};

export const actsScenes: SceneDefinition[] = [
  pentecostScene,
  earlyChurchScene,
  stephenScene,
  paulScene,
];

export const getActsSceneBySlug = (slug: string): SceneDefinition | undefined => {
  const map: Record<string, SceneDefinition> = {
    pentecost: pentecostScene,
    "early-church": earlyChurchScene,
    stephen: stephenScene,
    paul: paulScene,
  };
  return map[slug] || pentecostScene;
};

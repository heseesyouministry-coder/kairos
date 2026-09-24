/**
 * KAIROS — Phase 4: The Passion & The Cross
 * Scope: Gethsemane, Arrest, Peter's Denial, The Trial, Crucifixion (Collapse Three).
 *
 * CRITICAL DESIGN MILESTONES:
 * 1. Restraint is the visual rule: Crucifixion renders through reactions (Mary, John, Centurion, crowd), never depicted violence.
 * 2. Inverted Audio Direction: Gethsemane onward empties out sound; Crucifixion features a near-total empty silence beat.
 * 3. Compounding Memories: gethsemane-cross (0.99) and jerusalem-fall (0.97) peak simultaneously.
 */

import { SceneDefinition } from "../../narrative/types";

// 9. GETHSEMANE (His understanding of what strength looks like -> Dread)
export const gethsemaneScene: SceneDefinition = {
  id: "cross-gethsemane",
  focus: "biblical-character",
  pov: "third",
  emotion: { fear: 0.9, grief: 0.85, overwhelm: 0.85, trust: 0.6, attachment: 0.9 },
  environment: { id: "gethsemane-garden", fallback2D: "gethsemane-2d" },
  audio: {
    track: "gethsemane",
    ambient: "gethsemane-dusk",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Malamig ang hangin sa ilalim ng mga punong olibo. Natutulog ang mga alagad, mabigat ang kanilang mga talukap dahil sa labis na lungkot.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Napasubsob Siya sa lupa. Tumutulo ang Kanyang pawis na parang malalaking patak ng dugo na pumapatak sa alabok.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Laging itinuro sa akin na ang lakas ay walang takot, walang panginginig, parang superhero na handang sumugod. Pero nakikita ko rito ang tunay na lakas: nanginginig ang buong katawan Niya sa bigat, ngunit hindi Siya tumatakbo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "'Ama ko, kung maaari, ilayo Mo sa Akin ang sarong ito; gayunma'y hindi ang ayon sa ibig Ko, kundi ang ayon sa ibig Mo.'",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nagsisimulang mawala ang mga tunog sa paligid. Bawat hininga sa hardin ay parang hinihigop ng darating na gabi.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/cross/arrest" },
};

// 10. ARREST (His instinct to protect people -> Panic; Resonates with cain-blood)
export const arrestScene: SceneDefinition = {
  id: "cross-arrest",
  focus: "shared",
  pov: "third",
  emotion: { fear: 0.92, overwhelm: 0.88, control: 0.1, grief: 0.75 },
  environment: { id: "gethsemane-torches", fallback2D: "gethsemane-2d" },
  audio: {
    track: "arrest",
    ambient: "torch-rattle",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sumiklab ang mga sulo sa kadiliman. Mga tabak, mga pamalo, at mga yabag ng armadong tanod ng templo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Lumapit si Judas. 'Magandang gabi, Guro,' at hinalikan Siya sa pisngi.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naalala ko si Cain sa parang. Ang parehong malamig na kapatiran, ang parehong pagkakanulo sa ilalim ng langit. Gusto kong sumigaw, gusto kong pumagitna.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "Hinugot ni Pedro ang kanyang tabak at tinaga ang tainga ng alipin ng punong saserdote. Biglang natigilan ang lahat.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "'Ibalik mo ang iyong tabak sa lalagyan nito,' sabi ni Jesus. Hinawakan Niya ang sugat ng lalaki at pinagaling ito. 'Hindi Ko ba dapat inumin ang sarong ibinigay sa Akin ng Aking Ama?'",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Tumakbo ang lahat ng mga alagad. Iniwan Siya. Tumakbo rin ang tapang ko, naiwan akong nakatayo sa anino, nanginginig sa sarili kong kawalan ng lakas.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/cross/peter-denial" },
};

// 11. PETER'S DENIAL (Verbatim spec implementation — Seeds peter-denial memory, Resonates with joseph-separation)
export const petersDenialScene: SceneDefinition = {
  id: "cross-peter-denial",
  focus: "shared",
  pov: "third",
  emotion: { grief: 0.8, overwhelm: 0.7, attachment: 0.9, trust: -0.1 },
  environment: { id: "courtyard-firelight", fallback2D: "courtyard-firelight-2d" },
  audio: {
    track: "arrest",
    ambient: "courtyard-fire",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Kilala na ni Theo si Pedro. Hindi yung pangalan sa libro — yung tao. Yung tumatawa nang malakas, yung nagmamadaling sumagot bago pa man tapusin ang tanong, yung una laging kumikilos bago pa mag-isip.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "at ngayon nandito siya, malapit sa apoy, tinatanong kung kilala niya yung lalaki. tatlong beses.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Gusto mong sabihin sa kanya, huwag, alam mo kung ano ang mangyayari, alam mo dahil binasa mo na ito ilang beses, pero hindi lumalabas ang boses mo, kasi hindi ka naman talaga narito, hindi ba — o baka ito na yung parteng hindi mo pa naiintindihan, na parang nandito ka, buo.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Hindi. Sabi ko. Hindi ko siya kilala.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hindi si Pedro ang nagsabi noon. Si Theo.",
    },
    {
      type: "sceneCue",
      cue: "rooster-crow",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tumingin si Pedro. Hindi sa direksyon ni Theo — sa malayo, kung saan may nakatayong isang lalaki, tahimik, hindi galit, hindi nagulat. Nakatingin lang.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naramdaman ko yung sakit na yun sa dibdib ko, parang akin, kahit hindi ako yung tumalikod. Kasi minsan, grabe, ganun talaga — nakikita mo lang ang isang tao mabigo, tapos, bigla, parang ikaw na rin.",
    },
  ],
  transition: { type: "hardCut", to: "/experience/cross/trial" },
};

// 12. THE TRIAL (Belief truth naturally wins if people are rational -> Frustration)
export const theTrialScene: SceneDefinition = {
  id: "cross-trial",
  focus: "biblical-character",
  pov: "third",
  emotion: { grief: 0.85, overwhelm: 0.8, control: 0.1, trust: 0.2 },
  environment: { id: "praetorium-stone", fallback2D: "courtyard-firelight-2d" },
  audio: {
    track: "trial",
    ambient: "crowd-dust",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sa palasyo ng gobernador ng Roma, nakatayo si Pilato sa pagitan ng dalawang daigdig: ang batas ng imperyo at ang hiyaw ng pulutong.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "'Ano ang katotohanan?' tanong ni Pilato, habang nakatayo sa harap niya ang mismong Katotohanan na nakatali ang mga kamay at may sugat ang noo.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Akala ko noon, kung maipapaliwanag mo lang nang maayos ang lohika, kung rasyonal lang ang mga tao, mananaig ang tama. Pero pinili nila si Barabbas. Isang mamamatay-tao kaysa sa taong nagbigay ng tinapay sa kanila.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Naghugas ng kamay si Pilato sa palanggana. Walang tubig na makapaghuhugas ng takot sa puso ng taong mas mahal ang kapangyarihan kaysa katarungan.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/cross/crucifixion" },
};

// 13. CRUCIFIXION (Collapse Three — Absolute restraint, reactions only, sound emptying out to total silence beat)
export const crucifixionScene: SceneDefinition = {
  id: "cross-crucifixion",
  focus: "biblical-character", // Spec: focus stays "biblical-character" throughout
  pov: "third",
  emotion: { overwhelm: 0.98, grief: 0.99, fear: 0.85, control: 0.0, trust: 0.1 },
  environment: { id: "calvary-darkness", fallback2D: "calvary-darkness-2d" },
  audio: {
    track: "crucifixion-silence", // Spec: audio direction inverts, near-total silence
    ambient: "silent-agony",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Dumilim ang buong lupain sa katanghaliang tapat. Walang kulog. Walang dulaan. Isang mabigat at nanunuot na pananahimik.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nakatayo si Maria sa paanan ng burol, nakayakap sa kanyang sarili, panginginig ng kanyang mga daliri na humahawak sa punit na balabal.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sa tabi niya, si Juan—nakatigas ang panga, hindi kayang alisin ang tingin, ngunit halos hindi makahinga sa tindi ng sakit.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naramdaman ko ang pagguho ng Jerusalem sa aking mga buto—ang parehong guho noong bumagsak ang templo sa apoy. Ngunit mas malalim ito kaysa sa mga bato. Dito gumuho ang buo kong pagkatao: ang akala kong ako ang taga-sagip, ako ang taga-ayos. Nakatayo lang ako roon, walang magawa, walang masabi, hiyang-hiya sa sarili kong kaligtasan habang ang tanging dalisay sa mundo ay nagdurusa.",
    },
    {
      type: "sceneCue",
      cue: "true-silence-beat",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nang lumubog ang huling hininga, nawala maging ang bulong ng hangin. Ganap na katahimikan.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tumingala ang Romanong senturyon, may alikabok sa kanyang baluti, at bumulong nang halos walang boses: 'Tunay ngang ito ang Anak ng Diyos.'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Umuwi ang karamihan na nagdadabog sa kanilang mga dibdib. Nanatili ang bato. Nanatili ang dilim.",
    },
  ],
  transition: { type: "collapse", to: "/experience/gospels/empty-tomb" },
};

export const CROSS_SCENES: Record<string, SceneDefinition> = {
  gethsemane: gethsemaneScene,
  arrest: arrestScene,
  "peter-denial": petersDenialScene,
  trial: theTrialScene,
  crucifixion: crucifixionScene,
};

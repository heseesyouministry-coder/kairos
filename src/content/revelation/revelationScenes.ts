/**
 * KAIROS — Phase 5: Revelation Content
 * Revelation Begins, Theo Tries to Understand, Final Vision
 */

import { SceneDefinition } from "../../narrative/types";

// 5. REVELATION BEGINS (Obsession with decoding everything -> Confusion)
export const revelationBeginsScene: SceneDefinition = {
  id: "revelation-begins",
  focus: "theo",
  pov: "third",
  emotion: { wonder: 0.7, overwhelm: 0.6, control: 0.4 },
  environment: { id: "patmos-vision", fallback2D: "patmos-vision-2d" },
  audio: {
    track: "revelation-vast",
    ambient: "open-heavens",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Isang pulo ng Patmos, hinampas ng alon ng dagat. Ngunit biglang nabuksan ang langit — pitong ilawan, isang tinig na parang lagaslas ng maraming tubig, at isang anyo na ang mukha ay parang araw na sumisikat sa buong lakas nito.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ang unang instinto ni Theo pagkakita pa lang: maghanap ng notebook. maglista ng mga numero. ilang sungay, ilang taon, anong ibig sabihin ng 144,000.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Awtomatiko kong sinubukang i-align ang mga imperyo sa kasaysayan — Roma ba ito, o Babylon, o ang hinaharap? Kung maiintindihan ko ang timeline, magiging ligtas ako. Hindi ako mabibigla.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Ngunit bawat imahe ay parang gumagalaw at hindi nagpapahuli sa isang depinisyon. Mga matang parang liyab ng apoy, isang Korderong may marka ng pagkapatay ngunit nakatayo.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "hindi ito crossword puzzle na kailangang sagutan bago ka makalabas. pero hindi pa rin ako tumitigil sa pag-solve.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/revelation/theo-understands" },
};

// 6. THEO TRIES TO UNDERSTAND (Intellectual pride — the original mountain-spiral, returning -> Frustration)
// Fires sam-fix-it memory: the only memory from before the mountain!
export const theoTriesToUnderstandScene: SceneDefinition = {
  id: "revelation-theo-understands",
  focus: "theo",
  pov: "first",
  emotion: { control: 0.7, overwhelm: 0.65, fear: 0.4, trust: 0.3 },
  environment: { id: "revelation-symbols", fallback2D: "revelation-symbols-2d" },
  audio: {
    track: "revelation-vast",
    ambient: "expansion-wind",
  },
  narrative: [
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nagsimula akong magbilang ulit. Pitong selyo, pitong trumpeta, pitong mangkok — sinubukan kong gumawa ng flowchart sa isip ko. Kailangan kong malaman kung saan tayo pupunta, kung ano ang mangyayari, kung kailan matatapos.",
    },
    {
      type: "narrative",
      pov: "first",
      register: "casual",
      text: "pero habang pinipilit kong i-decode, lalo lang sumasakit ang ulo ko. parang bumalik ako sa kwarto bago umakyat ng bundok — yung labing-apat na tabs tungkol sa sitwasyon ni Sam.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naalala ko yung gabing 'yun. Ang dami kong solusyon para sa kanya — budget plans, moving checklists, mga payo na hindi naman niya hinihingi. Akala ko pagmamahal yun. Takot lang pala na mawalan ako ng kontrol sa buhay ng taong mahalaga sa akin.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "At ngayon, ginagawa ko na naman sa harap ng Diyos. Gusto kong gawing spreadsheet ang langit para lang masabi kong alam ko ang bukas.",
    },
    {
      type: "narrative",
      pov: "first",
      register: "casual",
      text: "at dito, sa gitna ng mga kulog at kidlat ng Pahayag, hindi nag-click ang formula. nabigo ang matematika ko. at doon lang ako nagsimulang huminto.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/revelation/final-vision" },
};

// 7. FINAL VISION (Fear of death, resolved into peace not explanation -> Peace)
// Exact verbatim implementation per Section 4 of user spec
export const finalVisionScene: SceneDefinition = {
  id: "revelation-final-vision",
  focus: "theo",
  pov: "first",
  emotion: { wonder: 0.7, fear: 0.1, control: 0.05, trust: 0.9, overwhelm: 0.2 },
  environment: { id: "new-creation", webglVariant: "cosmic-quiet", fallback2D: "new-creation-2d" },
  audio: {
    track: "revelation-vast",
    ambient: "open-heavens",
  },
  narrative: [
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Sinubukan kong intindihin, kasi yun naman talaga ang gawi ko — mga numero, mga pattern, mga koneksyon — pero sa bawat sagot na nahanap ko, may bagong tanong na sumusulpot, at sa isang saglit, parang bumalik ako sa kwarto ko, sa mga tab na bukas, sa gabing 'yun bago ang bundok.",
    },
    {
      type: "narrative",
      pov: "first",
      register: "casual",
      text: "ginagawa ko na naman pala. sinusubukan kong gawing makina ang misteryo.",
    },
    {
      type: "sensory",
      pov: "first",
      register: "literary",
      text: "Tumigil ako. Tumingin na lang. Walang kulog, walang tinig, walang paliwanag — liwanag lang, dahan-dahang lumalawak, parang hindi na kailangang sabihin kung ano siya para maramdaman kong totoo siya.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Hindi ko naintindihan lahat. Hindi ko rin kailangang intindihin lahat. At sa unang pagkakataon, hindi ito parang pagkatalo.",
    },
    {
      type: "sceneCue",
      cue: "world-begins-dissolving",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nagsimulang mawala ang lahat, hindi biglaan, kundi parang paalam — mga mukha, mga lugar, mga tinig, unti-unti, hanggang sa naging alaala na lang ang lahat.",
    },
  ],
  transition: { type: "collapse", to: "/experience/awakening/full" },
};

export const revelationScenes: SceneDefinition[] = [
  revelationBeginsScene,
  theoTriesToUnderstandScene,
  finalVisionScene,
];

export const getRevelationSceneBySlug = (slug: string): SceneDefinition | undefined => {
  const map: Record<string, SceneDefinition> = {
    begins: revelationBeginsScene,
    "theo-understands": theoTriesToUnderstandScene,
    "final-vision": finalVisionScene,
  };
  return map[slug] || revelationBeginsScene;
};

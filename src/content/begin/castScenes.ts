/**
 * KAIROS — Phase 6: Theo's Human Circle (The Begin Arc)
 * Scope: Full circle of Theo's life before the mountain:
 * 1. Adrian Reyes (mentor)
 * 2. Julian (friend/debate)
 * 3. Daniel (father)
 * 4. Sam (best friend)
 * 5. Mara (mother)
 * 6. Lydia (sister/discernment)
 * 7. Lia (younger sister, 13-14)
 * 8. Luca (music friend)
 * 9. Departure (to the mountain)
 */

import { SceneDefinition } from "../../narrative/types";

// 1. ADRIAN REYES (Teacher/Mentor)
export const adrianScene: SceneDefinition = {
  id: "begin-adrian",
  focus: "theo",
  pov: "third",
  emotion: { control: 0.75, wonder: 0.2, fear: 0.2, trust: 0.4 },
  environment: { id: "ordinary-classroom", fallback2D: "ordinary-bedroom-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Alas-singko ng hapon sa lumang classroom ng humanities building. Nakaayos na ang mga silya, ngunit nakatayo pa rin si Theo sa harap ng mesa ni Mr. Reyes, hawak ang papel kung saan may labing-anim na citations siya para patunayang may butas ang debate kanina.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Adrian Reyes",
      register: "casual",
      text: "“Theo. Umuwi ka na.”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hindi man lang tumingin si Mr. Reyes habang nagpapasok ng mga libro sa kupas niyang canvas bag. Alam ni Theo na nabasa nito ang argumento, pero walang pagpupuri, walang debate.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Theo",
      register: "casual",
      text: "“Pero sir, hindi rasyonal yung conclusion nila sa third premise. Kung susundan mo yung premise—”",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Adrian Reyes",
      register: "casual",
      text: "“Hindi mo kailangang ipanalo ang bawat tanong, Theo.”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Kumirot ang sentido ko. Ayoko nung sinabi niya — napakakalmado, napakakaraniwan, na parang ang buong pagsisikap kong maging tumpak ay isa lang laro ng bata. Pero bakit doon sa pagkairita ko, naramdaman ko rin ang pagod na matagal ko nang itinatago?",
    },
    {
      type: "transitionCue",
      to: "/begin/julian",
    },
  ],
  transition: { type: "crossfade", to: "/begin/julian" },
};

// 2. JULIAN (Diner debate — Phase 1 preserved core)
export const julianScene: SceneDefinition = {
  id: "begin-julian",
  focus: "theo",
  pov: "third",
  emotion: { control: 0.8, fear: 0.35, trust: 0.3, wonder: 0.2 },
  environment: { id: "ordinary-diner", fallback2D: "ordinary-bedroom-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sa diner sa kanto ng Maginhawa, malamig ang aircon at maingay ang kubyertos sa paligid. Iniikot ni Julian ang yelo sa baso ng iced tea gamit ang plastik na straw.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Julian",
      register: "literary",
      text: "“Kung nandun ka ba talaga nung nangyari ang lahat,” tanong ni Julian, hindi galit, parang nagtatanong lang kung anong oras na, “maniniwala ka pa rin ba? O kaya ka lang naniniwala kasi wala ka naman doon?”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Ngumiti lang si Theo noon, sumagot ng mga handang depensa mula sa apologetics textbooks. Pero pag-alis sa diner, ang tanong ay hindi sumama sa hangin — pumasok ito na parang manipis na lamat sa salamin, kumakalat sa bawat talatang saulo na niya.",
    },
    {
      type: "transitionCue",
      to: "/begin/daniel",
    },
  ],
  transition: { type: "crossfade", to: "/begin/daniel" },
};

// 3. DANIEL (Father — sparse, clipped correction vs. Theo's rich internal ache)
export const danielScene: SceneDefinition = {
  id: "begin-daniel",
  focus: "theo",
  pov: "third",
  emotion: { control: 0.7, attachment: 0.6, fear: 0.4, trust: 0.35 },
  environment: { id: "ordinary-garage", fallback2D: "ordinary-bedroom-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Bukas ang hood ng lumang Tamaraw FX sa garahe. Nakasindi ang madilaw na bumbilya sa kisame, at may amoy ng langis ng makina at basang semento mula sa ambon sa labas.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Inabot ni Theo ang wrench. 'Pa, aalis na raw si Sam sa Sabado. Ililipat yung tatay niya sa planta sa Batangas.'",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Daniel",
      register: "casual",
      text: "“Ganoon talaga. May trabaho yung tao.”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hinigpitan ni Daniel ang bolt gamit ang basahan. Hindi tumingin pabalik. 'Naiwan mong bukas yung gate kanina. Pumasok yung pusa sa labahan.'",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Theo",
      register: "casual",
      text: "“Isasara ko po.”",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Daniel",
      register: "casual",
      text: "“Dapat kanina pa.”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Apat na salita lang. Alam kong paalala lang iyon, alam kong pagod siya galing sa pasada ng hapon, pero sa loob ko, bawat maikling salita ay naging hatol: 'Kulang ka pa rin.' Hanggang kailan ko ba kailangang patunayan na maaasahan ako bago ako maging sapat?",
    },
    {
      type: "transitionCue",
      to: "/begin/sam",
    },
  ],
  transition: { type: "crossfade", to: "/begin/sam" },
};

// 4. SAM (Front Porch — Phase 1 preserved core)
export const samScene: SceneDefinition = {
  id: "begin-sam",
  focus: "theo",
  pov: "third",
  emotion: { overwhelm: 0.8, control: 0.75, attachment: 0.85, grief: 0.6 },
  environment: { id: "ordinary-porch", fallback2D: "ordinary-bedroom-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sa may beranda nina Sam pagkatapos ng hapunan, nakaupo si Sam sa baitang ng hagdan, nakatitig sa sapatos niya. Ang balita ay simple ngunit pader: lilipat na sila sa katapusan ng linggo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Bago pa man makatapos si Sam, mabilis nang nagbukas ng tabs sa utak si Theo: transit schedules, cost of living estimates, mga petisyong pwedeng isumite sa management para huwag matuloy ang re-assignment.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Sam",
      register: "literary",
      text: "“Theo, tama na,” mahinang sabi ni Sam, halos basag na ang dulo ng boses. “Hindi mo kailangang iligtas ang lahat. Baka kailangan ko lang may makinig.”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ang sakit pala nung ganun. yung akala mong tumutulong ka na, pero ang totoo, sarili mo lang palang takot sa pagkawala ang inaayos mo.",
    },
    {
      type: "transitionCue",
      to: "/begin/mara",
    },
  ],
  transition: { type: "crossfade", to: "/begin/mara" },
};

// 5. MARA (Mother — care without performance, notices without prying)
export const maraScene: SceneDefinition = {
  id: "begin-mara",
  focus: "theo",
  pov: "third",
  emotion: { attachment: 0.8, grief: 0.5, trust: 0.5, fear: 0.3 },
  environment: { id: "ordinary-hallway", fallback2D: "ordinary-bedroom-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pagbalik sa bahay, nakasalubong niya ang nanay niya sa may pasilyo malapit sa kusina, may bitbit na bagong tiklop na tuwalya. Hindi ito nagtanong kung saan siya galing.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tumigil lang si Mara ng dalawang segundo, tiningnan ang mga mata niya sa ilalim ng malamlam na ilaw, at marahang hinaplos ang braso niya.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Mara",
      register: "casual",
      text: "“May mainit na sabaw pa sa kaldero, anak. Huwag mong dalhin lahat diyan sa silid mo.”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Walang sermon. Walang mga follow-up question. Nakita niya ang bigat sa balikat ko nang hindi ko kailangang pangalanan. Sa harap ng nanay ko, hindi ko kailangang magpanggap na may sagot ako sa lahat ng bagay.",
    },
    {
      type: "transitionCue",
      to: "/begin/lydia",
    },
  ],
  transition: { type: "crossfade", to: "/begin/lydia" },
};

// 6. LYDIA (Kitchen tea & discernment — Phase 1 preserved core)
export const lydiaScene: SceneDefinition = {
  id: "begin-lydia",
  focus: "theo",
  pov: "third",
  emotion: { control: 0.65, attachment: 0.7, grief: 0.45, trust: 0.4 },
  environment: { id: "ordinary-kitchen", fallback2D: "ordinary-bedroom-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pagdating ng alas-diyes, nakita ni Lydia ang dami ng bukas na tabs sa laptop niya sa lamesa sa kusina. Umiling lang ito habang nagtitimpla ng tsa.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Lydia",
      register: "literary",
      text: "“Inakala mo lang kasing ang pagtulong ay palaging pag-aayos,” sabi nito. “Hindi mo pwedeng i-solve ang lungkot ng ibang tao na parang sirang code.”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Ang paghahanda ko pala ay naging idolo na nagpapanggap na debosyon. Inakala kong kapag may solusyon ako, banal ako.",
    },
    {
      type: "transitionCue",
      to: "/begin/lia-interrupts",
    },
  ],
  transition: { type: "crossfade", to: "/begin/lia-interrupts" },
};

// 7. LIA (Sister, 13-14 — Section 3 Verbatim Specification)
export const liaScene: SceneDefinition = {
  id: "begin-lia-interrupts",
  focus: "theo",
  pov: "third",
  emotion: { overwhelm: 0.3, attachment: 0.5, control: 0.6 },
  environment: { id: "theo-room-night", fallback2D: "theo-room-night-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tatlong oras na siyang nakatutok sa code, tatlong oras na sinusubukang ayusin ang isang bagay na hindi naman dapat kasing bigat ng pakiramdam niya rito.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Lia",
      register: "casual",
      text: "“bakit ganyan ka katagal tumitig sa screen, may crush ka ba sa error message mo”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "hindi man lang tumingin si Theo. “lia, busy ako.”",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Lia",
      register: "casual",
      text: "“busy ka rin kanina, busy ka pa rin ngayon, kailan ka ba hindi busy”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "At doon, sa kalagitnaan ng lahat ng iniisip niya — tungkol kay Sam, tungkol sa plano, tungkol sa lahat ng gustong ayusin — biglang natawa siya, kasi lang, wala talagang kinalaman si Lia sa kahit ano rito.",
    },
    {
      type: "transitionCue",
      to: "/begin/luca",
    },
  ],
  transition: { type: "crossfade", to: "/begin/luca" },
};

// 8. LUCA (Music Friend — minimal dialogue, maximum sensory silence)
export const lucaScene: SceneDefinition = {
  id: "begin-luca",
  focus: "theo",
  pov: "third",
  emotion: { attachment: 0.7, overwhelm: 0.25, trust: 0.6, wonder: 0.4 },
  environment: { id: "ordinary-music-room", fallback2D: "theo-room-night-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Hatinggabi sa maliit na kuwarto sa dulo ng bahay ni Luca. Amoy lumang kahoy ng gitara at mainit na amplifier. Isang pares ng headphones na nakalapag sa sahig, humuhugong sa napakahinang frequency.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Dahan-dahang kinakalabit ni Luca ang ika-apat na kuwerdas ng acoustic guitar — isang bukas na D-major chord na nanatiling umaalon sa hangin, pumupuno sa buong espasyo nang walang salita.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Luca",
      register: "casual",
      text: "“Dito ka lang.”",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Walang paliwanag. Walang nagtanong kung bakit namumula ang mga mata ni Theo o bakit hindi siya makatulog. Ang panginginig ng kahoy sa ilalim ng kanilang mga palad, at ang katahimikang hindi na kailangang punan ng kahit anong solusyon.",
    },
    {
      type: "transitionCue",
      to: "/begin/departure",
    },
  ],
  transition: { type: "crossfade", to: "/begin/departure" },
};

// 9. DEPARTURE (Theo packs his Bible, leaves for the mountain)
export const departureScene: SceneDefinition = {
  id: "begin-departure",
  focus: "theo",
  pov: "third",
  emotion: { control: 0.6, wonder: 0.35, fear: 0.35, trust: 0.4 },
  environment: { id: "ordinary-bedroom", fallback2D: "ordinary-bedroom-2d" },
  audio: { track: "ordinary", ambient: "subtle-room" },
  narrative: [
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nung gabing yun, hindi na ako makapag-research o makapag-ayos para lang patayin ang bigat sa dibdib ko. For the first time, lumabas yung tunay kong tanong: Ano ba talagang ibig sabihin ng magtiwala sa 'Yo kapag wala na akong kayang ayusin?",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pagsikat ng araw bago mag-alas-sais, kailangan niya ng lugar kung saan mas matanda pa ang hangin kaysa sa sarili niyang mga katanungan. Naglagay siya ng tubig sa bag, kinuha ang lumang Bibliyang kupas na ang balat, at dahan-dahang nagmaneho paakyat sa bundok...",
    },
    {
      type: "transitionCue",
      to: "/experience/mountain",
    },
  ],
  transition: { type: "crossfade", to: "/experience/mountain" },
};

export const BEGIN_CAST_SCENES: Record<string, SceneDefinition> = {
  "adrian": adrianScene,
  "julian": julianScene,
  "daniel": danielScene,
  "sam": samScene,
  "mara": maraScene,
  "lydia": lydiaScene,
  "lia": liaScene,
  "lia-interrupts": liaScene,
  "luca": lucaScene,
  "departure": departureScene,
};

export const BEGIN_SCENE_SEQUENCE = [
  "adrian",
  "julian",
  "daniel",
  "sam",
  "mara",
  "lydia",
  "lia",
  "luca",
  "departure",
];

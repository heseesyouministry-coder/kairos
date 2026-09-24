import { SceneDefinition } from "../../../narrative/types";

/**
 * Section 0 retrofit — Cain & Abel Offering
 */
export const cainAndAbelOffering: SceneDefinition = {
  id: "genesis-cain-abel-offering",
  focus: "biblical-character",
  pov: "third",
  emotion: { attachment: 0.4, overwhelm: 0.2 },
  environment: { id: "field-dusk", fallback2D: "field-dusk-2d" },
  audio: {
    track: "cain-abel",
    ambient: "field-dusk",
  },
  echoTags: ["siblings", "jealousy", "comparison"],
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pinagmasdan ni Cain si Abel, kung paano niya inaayos ang handog niya, dahan-dahan, parang wala siyang ibang iniisip.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Wala siyang sinabi. Kasi minsan, yun na yung pinakamalakas na sinasabi mo — yung katahimikan.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pero may tumutubo na sa loob niya, dahan-dahan, parang ugat na kumakapit sa lupang hindi naman sa kanya.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Ikaw, nakatayo lang ilang hakbang ang layo. Hindi mo pa alam, pero naramdaman mo na — yung hangin, tumigil.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Alam ko. Alam kong may mali. At hindi ko alam kung bakit hindi ko pa rin ginalaw ang paa ko.",
    },
  ],
  transition: { type: "pov-shift", to: "genesis-cain-abel-field" },
};

export const cainAndAbelField: SceneDefinition = {
  id: "genesis-cain-abel-field",
  focus: "biblical-character",
  pov: "third",
  emotion: {
    fear: 0.85,
    grief: 0.9,
    attachment: 0.5,
    control: 0.1,
    overwhelm: 0.92,
  },
  environment: {
    id: "field-dusk",
    webglVariant: "sparse-dusk-field",
    fallback2D: "field-dusk-2d",
  },
  audio: {
    track: "cain-abel",
    ambient: "field-dusk",
  },
  echoTags: ["siblings", "jealousy", "comparison"],
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Lumubog na ang araw sa likod ng tuyong bundok, at ang anino ng mga tinik, humaba na parang matutulis na karayom sa pulang lupa.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nasa unahan si Abel, nagkukuwento tungkol sa mga tupa, hindi lumilingon, walang anumang hinala sa sarili niyang kapatid.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Kilala ko ang katahimikang ito. Ito rin yung katahimikang lumunok sa beranda ni Sam — yung bigat sa dibdib ng isang taong pakiramdam niya bumabagsak na ang buong mundo niya, at naniniwalang dahas na lang ang tanging paraan para maramdamang buhay pa siya.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tumakbo pasulong si Theo para harangin ang distansya, inabot ang braso ni Cain, sumigaw para tawagin si Abel, nagpumilit na pumuwesto sa gitna nila na parang pader.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Dumiretso lang ang mga daliri ko sa magaspang na tela. Walang hangin para marinig ang sigaw ko. Nakatayo ako sa loob ng kasaysayan, at hindi kailanman pumapayag ang kasaysayan na baguhin ito ng isang saksi...",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "wala. wala talaga akong nagawa. nanood lang ako.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Humarap si Cain. Walang sigaw, walang theatrics — isang mabigat, madilim, at biglaang hampas ng bato. Bumagsak si Abel sa alikabok.",
    },
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Yung mainit na likidong dahan-dahang sinisipsip ng tuyong lupa. At yung biglang pagkaunawa na ang kauna-unahang kamatayan ng tao sa mundo ay hindi dahil sa katandaan o sakit, kundi dahil sa kamay ng sarili niyang kapatid.",
    },
    {
      type: "sceneCue",
      cue: "The ground trembles. The air fractures into shrieking wind and distorted echoes.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/flood",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/genesis/flood",
  },
};

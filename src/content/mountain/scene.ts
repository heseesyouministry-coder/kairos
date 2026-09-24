import { SceneDefinition } from "../../narrative/types";

export const mountainScene: SceneDefinition = {
  id: "mountain-slope",
  pov: "third",
  focus: "theo",
  emotion: {
    wonder: 0.35,
    control: 0.5,
    fear: 0.15,
    trust: 0.3,
  },
  environment: {
    id: "mountain-ridge",
    fallback2D: "mountain-ridge-2d",
  },
  audio: {
    track: "mountain",
    ambient: "mountain-wind",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Malamig at tuyo ang hangin sa ridge, at nakaupo si Theo sa gilid ng puting limestone habang yakap ang mga tuhod niya, hinahaplos ng daliri yung manipis na gilid ng Genesis na halos magusot na sa tagal.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Wala kang maririnig kundi yung marahang ihip ng hangin sa mga tuyong pine trees, at yung sarili niyang hininga — mabigat, pantay, naghahanap ng pahinga sa gitna ng bato.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tapos, for half a second lang talaga, doon sa may malayong dulo kung saan bumubukas ang lambak sa hamog, may nakita siyang nakatayo — isang taong nakasuot ng magaspang na tela, nakatingin lang sa kanya. Kumurap siya. Nawala agad. 'Baka pagod lang ako,' bulong niya sa sarili habang tumatawa nang mahina, kahit alam niyang kinabahan siya...",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "nakakatawa kasi, akala mo guni-guni mo lang lahat, pero yung katawan mo, naghahanda na pala bago pa maunawaan ng utak mo.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Tumingin ulit siya sa mga nakasulat sa pahina, at biglang naging iba ang pakiramdam — parang umiinom ng liwanag ang bawat titik: binasa niya ang tungkol sa mga pastulan, at dahan-dahang may narinig siyang unga ng mga tupa sa malayo; binasa niya ang tungkol sa sinaunang lupa, at biglang naamoy niya ang usok ng kahoy at tuyong alikabok na naiinitan ng araw.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Hindi huminto ang hangin ng bundok; uminit lang ito nang uminit, hanggang sa maramdaman mo na ang bato sa ilalim mo ay hindi na malamig na granite, kundi tuyong buhangin ng disyerto na dumidikit sa balat mo.",
    },
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Biglang bumigat ang init sa balikat mo — may dumaang asno na may dalang kahoy na basket, isang babaeng may bitbit na basag na banga sa tabi mo, mga batang naghahabulan sa makipot na kalsada, at ang amoy ng pinaghalong pawis, kumin, at sinunog na tinapay.",
    },
    {
      type: "dialogue",
      pov: "second",
      speaker: "Stranger",
      register: "literary",
      text: "Isang matandang may balbas ang biglang tumigil sa gitna ng daan, tinitigan ka nang diretso sa mata, at nagtanong: “Sino ka?”",
    },
    {
      type: "sceneCue",
      cue: "The fabric of the ancient marketplace dissolves into immense cosmic darkness; the world begins.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/creation",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/genesis/creation",
  },
};

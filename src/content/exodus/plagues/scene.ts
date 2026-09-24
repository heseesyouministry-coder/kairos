import { SceneDefinition } from "../../../narrative/types";

export const plaguesScene: SceneDefinition = {
  id: "exodus-egypt-plagues",
  pov: "second",
  focus: "theo",
  emotion: {
    overwhelm: 0.9,
    fear: 0.85,
    grief: 0.7,
    control: 0.1,
  },
  environment: {
    id: "egypt-darkness-nile",
    fallback2D: "egypt-darkness-2d",
  },
  audio: {
    track: "plagues",
    ambient: "nile-locusts-dread",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nung bata si Theo, ang mga salot ay parang mga visual effects sa pelikula — palaka, balang, pulang ilog, mga palabas ng kapangyarihan na madaling ikwento sa Sunday school.",
    },
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Pero hindi pala ganun kapag nandito ka: amoy bulok na isda ang buong bansa; ang tubig sa banga, parang malapot na dugo na hindi mo mainom; at ang kadiliman sa ikasiyam na salot — hindi lang ito kawalan ng araw, isa itong matinding bigat na para kang nalulunod sa hangin.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "sobrang layo sa pelikula. nakakakilabot yung lungkot ng buong bayan.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Hanggang sa huling gabi sa Goshen: nakatayo ka sa tabi ng pinto ng isang pamilyang Israelita, pinapanood kung paano idinampi ng ama ang dugo ng kordero sa mga hamba ng pinto gamit ang sanga ng hisopo.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Sa labas ng pader na iyon, may iyak ng mga inang nawalan ng panganay na sumira sa katahimikan ng hatinggabi. Naintindihan ko sa wakas: ang paghatol ay hindi palabas para hangaan... ito ay trahedya na nagpapakita kung gaano kabigat ang presyo ng kalayaan.",
    },
    {
      type: "sceneCue",
      cue: "The wailing cries of Memphis turn into the frantic rustle of sandals marching into the wilderness toward the sea.",
    },
    {
      type: "transitionCue",
      to: "/experience/exodus/red-sea",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/exodus/red-sea",
  },
};

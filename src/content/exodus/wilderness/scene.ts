import { SceneDefinition } from "../../../narrative/types";

export const wildernessComplaintsScene: SceneDefinition = {
  id: "exodus-wilderness-complaints",
  pov: "third",
  focus: "theo",
  emotion: {
    grief: 0.7,
    overwhelm: 0.85,
    control: 0.15,
    trust: 0.4,
    fear: 0.5,
  },
  environment: {
    id: "wilderness-barren-dusk",
    fallback2D: "wilderness-barren-2d",
  },
  audio: {
    track: "wilderness",
    ambient: "desert-exhaustion-wind",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Walang katapusang graba, tuyong hangin, at ang araw-araw na pagpulot ng manna sa umaga na parang manipis na hamog na nagyelo — hanggang sa ang himala mismo, naging dahilan na lang ng reklamo ng mga tao.",
    },
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Masakit ang mga talampakan mo, puro kalyo na ang daliri mo sa buhangin, at naririnig mo ang bulungan sa bawat tolda: 'Bakit pa tayo inalis sa Ehipto? Mas mainam pa ang mga pipino at sibuyas doon kaysa mamatay sa uhaw rito.'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "nakakapagod pala talaga ang mga tao. kahit anong gawin mong tulong, may masasabi at masasabi pa rin sila.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Napanood mo si Moses na lumuhod sa alikabok sa harap ng Toldang Tipanan, nakasubsob ang mukha, umiiyak nang walang palamuti: “Bakit Mo ipinapasan sa akin ang buong bayang ito? Ako ba ang naglihi sa kanila para dalhin ko sila sa aking dibdib tulad ng pag-aalaga ng yaya sa sanggol?”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Doon ko naramdaman yung sobrang bigat ng responsibilidad — yung pakiramdam na ikaw ang inaasahan ng lahat, pero ikaw mismo, ubos na ubos na. Walang spreadsheet o estratehiya na makakapagbigay ng lakas sa ganitong uri ng pagkapagod...",
    },
    {
      type: "sceneCue",
      cue: "The dry desert wind begins to whistle through the stones, then fractures into silence.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/joshua-jericho",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/joshua-jericho",
  },
};

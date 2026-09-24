import { SceneDefinition } from "../../../narrative/types";

/**
 * Section 5 Verbatim Example Scene — The Red Sea
 */
export const redSeaCrossing: SceneDefinition = {
  id: "exodus-red-sea",
  focus: "theo",
  pov: "second",
  emotion: { fear: 0.9, overwhelm: 0.95, control: 0.05, wonder: 0.6 },
  environment: {
    id: "red-sea-panic",
    webglVariant: "red-sea-water",
    fallback2D: "red-sea-panic-2d",
  },
  audio: { ambient: "crowd-panic-water", track: "red-sea" },
  narrative: [
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Hindi mo alam kung saan ka tatakbo, kasi tao sa harap mo, tao sa likod mo, at yung tubig, andun, malapit, parang dingding na buhay, at ang tanging alam mo — kailangan mong sumunod, kahit hindi mo alam kung saan patungo.",
    },
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Umiiyak ang mga bata. Sumisigaw ang mga magulang. May humahagulgol na hayop malapit sa iyo, at ang buhangin, pumapasok sa sapatos mo, sa mata mo, kahit hindi mo alam, sa gitna ng lahat ng ito, kung saan galing ang hangin.",
    },
    {
      type: "narrative",
      pov: "second",
      register: "casual",
      text: "wala kang oras mag-isip ng teolohiya dito. survive lang, tapos survive ulit.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "At tapos — bumukas. Hindi mo alam kung paano. Wala kang alam kung bakit. Alam mo lang, may daan, kung saan kanina, wala.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Hindi ko naintindihan. Sinubukan kong intindihin — kasi yun naman talaga ang ginagawa ko — pero yung tanging alam ko, humahakbang ako, kasi may humahawak sa likod ko, kasi may bata sa harap ko, kasi ganito lang talaga ang paraan para mabuhay.",
    },
    {
      type: "sceneCue",
      cue: "army-approach",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Naririnig mo ang mga kabayo sa likod, malayo pa, pero papalapit, at alam mong may mga taong hindi na makakatawid, at alam mo ring wala kang magagawa para sa kanila, at ito — ito yung parteng hindi mababago ng anumang kaalaman.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "At sa dulo, nang muling magsara ang tubig, tumigil ang lahat. Hindi kaagad ang sigaw. Katahimikan muna. Tapos — sigaw, pero ngayon, iba na ang klase.",
    },
    {
      type: "transitionCue",
      to: "/experience/exodus/sinai",
    },
  ],
  transition: { type: "crossfade", to: "/experience/exodus/sinai" },
};

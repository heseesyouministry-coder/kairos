import { SceneDefinition } from "../../../narrative/types";

export const sinaiScene: SceneDefinition = {
  id: "exodus-sinai",
  pov: "third",
  focus: "theo",
  emotion: {
    fear: 0.8,
    grief: 0.85,
    overwhelm: 0.9,
    trust: 0.35,
    control: 0.1,
  },
  environment: {
    id: "sinai-smoke-thunder",
    webglVariant: "smoke-mountain",
    fallback2D: "sinai-smoke-2d",
  },
  audio: {
    track: "sinai",
    ambient: "sinai-trumpet-thunder",
  },
  echoTags: ["father", "son", "correction", "approval", "discipline"],
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Umuusok ang buong Bundok Sinai na parang pugon, nanginginig ang mga bato sa ilalim ng talampakan mo, at ang tunog ng pakakak — papataas, papalakas, hanggang sa maramdaman mong bibigay ang dibdib mo sa bawat ugong.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nandoon si Theo nang umakyat si Moses sa ulap. Akala niya, matapos makita ang dagat na nahati, matapos uminom ng tubig mula sa bato, hinding-hindi na muling magdududa ang mga tao.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "pero apatnapung araw lang pala ang kailangan. apatnapung araw na tahimik ang Diyos, nagkakagulo na agad ang camp.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Naririnig mo ang ingay ng mga gintong hikaw na hinahagis sa apoy; ang tunog ng maso habang hinuhulma ang guya; ang sigawan ng sayaw na walang kagalakan, kundi desperasyon lang ng mga taong takot maiwang mag-isa sa ilang.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nung bumaba si Moses bitbit ang dalawang tapyas ng bato at bumasag ito sa paanan ng bundok, naramdaman ko yung pagkadismaya hanggang sa kalamnan ko. Ang akala ko, sapat na ang mga himala para manatiling tapat ang puso. Hindi pala. Kahit nakatayo ka sa harap ng nagniningas na bundok, kaya mo pa ring piliing gumawa ng sarili mong diyos mula sa alahas.",
    },
    {
      type: "sceneCue",
      cue: "The smoke of Sinai drifts into the endless, sun-bleached expanse of Paran.",
    },
    {
      type: "transitionCue",
      to: "/experience/exodus/wilderness",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/exodus/wilderness",
  },
};

import { SceneDefinition } from "../../../narrative/types";

export const mosesChildhoodScene: SceneDefinition = {
  id: "exodus-moses-childhood",
  pov: "third",
  focus: "theo",
  emotion: {
    fear: 0.4,
    attachment: 0.6,
    trust: 0.35,
    wonder: 0.5,
  },
  environment: {
    id: "nile-reeds",
    fallback2D: "nile-reeds-2d",
  },
  audio: {
    track: "moses",
    ambient: "river-nile-water",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Ang maliit na basket na gawa sa tambo at pinahiran ng tar — nakalutang sa gitna ng matataas na papyrus sa Ilog Nile, dahan-dahang tinatangay ng agos habang nakatingin sa malayo ang ate niyang si Miriam mula sa likod ng damuhan.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Kilala ko ang pakiramdam ng bata na lumaki sa lugar kung saan hindi siya tunay na kabilang: Hebrew sa dugo, Ehipsyo sa palasyo. Yung laging may distansya sa pagitan ng kung sino ka at kung saan ka nakatayo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ang hirap nung ikaw yung laging outsider sa sarili mong bahay.",
    },
    {
      type: "sceneCue",
      cue: "The gold of Pharaoh's palace recedes into forty years of quiet sheep pasture in Midian.",
    },
    {
      type: "transitionCue",
      to: "/experience/exodus/burning-bush",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/exodus/burning-bush",
  },
};

export const burningBushScene: SceneDefinition = {
  id: "exodus-burning-bush",
  pov: "second",
  focus: "shared",
  emotion: {
    wonder: 0.85,
    fear: 0.6,
    control: 0.2,
    trust: 0.5,
  },
  environment: {
    id: "horeb-bush-fire",
    webglVariant: "fire-bush",
    fallback2D: "horeb-bush-2d",
  },
  audio: {
    track: "burning-bush",
    ambient: "desert-fire-hum",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Isang ordinaryong mababang palumpong sa paanan ng Bundok Horeb — nagliliyab sa gitna ng init ng tanghali, pero hindi nasusunog, hindi nagiging abo, nananatiling berde sa ilalim ng apoy na parang ginto.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Tinig",
      register: "literary",
      text: "“Alisin mo ang iyong sandalyas, sapagkat ang lupang kinatatayuan mo ay banal na lupa.”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Napanood ni Theo kung paano nakipagtalo si Moses: 'Sino ba ako para pumunta sa Faraon? Hindi ako marunong magsalita, mabagal ang dila ko.' Ang bawat dahilan, bawat excuse, parang nanggaling mismo sa sariling bibig ni Theo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "relate na relate ako kay moses dito. gusto mo muna maging competent bago ka sumunod.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Akala ko dati, tinatawag lang ng Diyos ang mga taong handa na. Pero dito sa harap ng apoy, nakita ko na ang panawagan pala ay hindi naghahanap ng qualifications... naghahanap lang pala Siya ng willing tumayo nang nakayapak.",
    },
    {
      type: "sceneCue",
      cue: "The tranquil flame gives way to the darkened sky and thunderous cries of Egypt.",
    },
    {
      type: "transitionCue",
      to: "/experience/exodus/plagues",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/exodus/plagues",
  },
};

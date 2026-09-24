import { SceneDefinition } from "../../../narrative/types";

export const babelScene: SceneDefinition = {
  id: "genesis-babel",
  pov: "third",
  focus: "theo",
  emotion: {
    control: 0.15,
    overwhelm: 0.65,
    fear: 0.35,
    trust: 0.3,
  },
  environment: {
    id: "babel-brick-haze",
    webglVariant: "dust-tower",
    fallback2D: "babel-brick-2d",
  },
  audio: {
    ambient: "tower-wind-voices",
    track: "babel",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Napakaganda ng plano nila: pantay-pantay ang mga ladrilyo, perpekto ang timpla ng aspalto, may sistema ang bawat manggagawa mula sa ibaba hanggang sa tuktok na sumusungkit sa alapaap — eksaktong uri ng arkitektura na gustung-gusto ni Theo.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Nakatayo ka sa hagdanan ng ikatlong palapag, naririnig mo ang isang mason na humihingi ng martilyo sa katabi niya, pero ang salitang lumalabas sa bibig niya, biglang naging tunog ng basag na palayok.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "parang nagka-glitch bigla yung buong reality. tipong isang segundo nagkakaintindihan kayo, tapos biglang naging foreign stranger ang katabi mo.",
    },
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Yung titig ng takot sa mga mata nila — hindi dahil may halimaw, kundi dahil nawala yung tulay sa pagitan ng dalawang utak. Binitawan ng isa ang kutsara ng semento. Tumalikod ang isa pa.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Buong buhay ko, naniwala ako na kapag maayos lang ang paliwanag, kapag malinaw ang bokabularyo, magkakasundo ang lahat. Pero dito sa paanan ng tore, nakita ko kung gaano kanipis ang sinulid na nag-uugnay sa ating lahat...",
    },
    {
      type: "sceneCue",
      cue: "The crowded plains scatter into dust; distant campfires flicker in the quiet desert of Haran.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/abraham",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/genesis/abraham",
  },
};

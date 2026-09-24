import { SceneDefinition } from "../../../narrative/types";

export const creationScene: SceneDefinition = {
  id: "genesis-creation",
  pov: "third",
  focus: "theo",
  emotion: {
    wonder: 0.95,
    control: 0.1,
    fear: 0.2,
    trust: 0.65,
    overwhelm: 0.7,
  },
  environment: {
    id: "creation-void-cosmos",
    webglVariant: "volumetric-nebula",
    fallback2D: "creation-void-2d",
  },
  audio: {
    track: "creation",
    ambient: "space-resonance",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Walang langit na titingalain, kasi wala pa namang lupa para sabihin kung ano ang 'itaas' o 'ibaba' — purong kadiliman lang talaga, at isang napakalawak na katahimikan ng tubig na parang humihinga sa ilalim ng kawalan.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nandun si Theo, nakalutang sa gitna, hindi nahuhulog at hindi rin lumilipad, at sa unang pagkakataon sa buong buhay niya, tumigil ang utak niya sa paglilista — walang variable na babalansehin, walang formulang maiisip.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "sobrang weird nung feeling. yung nasanay kang laging may sagot, tapos biglang nawalan ng kwenta lahat ng alam mo.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Tapos may nagsalita — hindi tunog na dumadaan sa hangin, kundi isang putok ng liwanag na bumasag sa pusod ng dilim, hindi parang bumbilya, kundi parang bagong kapangyarihang pumunit sa buong kalawakan.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Ramdam mo yung init ng bagong batong sumusulpot mula sa ilalim ng kumukulong dagat, yung amoy ng ozone at basang lupa, at yung biglang pagsabog ng berdeng buhay na parang sabik na sabik huminga.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Ilang taon kong pinag-aralan kung paano idepensa ang pananampalataya ko gamit ang mga argumento at datos. Pero nakatayo rito, sa gitna ng simula ng lahat... para palang sumusubok magkasya ng isang buong karagatan sa loob ng maliit na kahon ng posporo.",
    },
    {
      type: "sceneCue",
      cue: "The roaring primal oceans subside into a calm, river-fed grove; sunlight filters through morning mist.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/eden",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/genesis/eden",
  },
};

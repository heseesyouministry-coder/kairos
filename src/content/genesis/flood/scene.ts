import { SceneDefinition } from "../../../narrative/types";

export const floodScene: SceneDefinition = {
  id: "genesis-flood",
  pov: "second",
  focus: "theo",
  emotion: {
    fear: 0.9,
    overwhelm: 0.85,
    grief: 0.75,
    control: 0.1,
  },
  environment: {
    id: "flood-rain-deluge",
    webglVariant: "deluge-rain",
    fallback2D: "flood-rain-2d",
  },
  audio: {
    ambient: "deluge-thunder",
    track: "flood",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Hindi nagsimula ang ulan na parang bagyo lang sa siyudad; bumagsak ito na parang may bumasag sa bubong ng langit, tuluy-tuloy, walang patid, hanggang sa mawala ang pagkakaiba ng hangin at tubig.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Wala si Theo sa loob ng arka. Nakatayo siya sa putikan kasama ang mga kapitbahay na hindi niya kilala — mga taong may karga-kargang banig, may hawak na umiiyak na bata, may sumisigaw sa madilim na abot-tanaw.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "sa sunday school noon, cute yung drawing ng arka diba. may giraffe na nakadungaw. pero dito, walang cute. amoy takot lang talaga at putik.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Yung tubig, dahan-dahang umaabot sa tuhod mo, tapos sa baywang mo, at naririnig mo ang kalabog ng mga pintuan sa malayo na pinipilit isara ng mga taong alam na nilang huli na ang lahat.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Sanay akong tingnan ang Baha bilang teolohikal na tema — justice versus grace, covenant theology. Pero habang nadudulas ang paa ko sa kumukulong putik, naramdaman ko yung panlalamig sa tiyan: totoo pala sila. Mga totoong tao na humihinga, nagmamahal, at natatakot...",
    },
    {
      type: "sceneCue",
      cue: "The roar of rising water fades into the echoing stone foundations of a sun-baked tower.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/babel",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/genesis/babel",
  },
};

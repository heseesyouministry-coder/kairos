import { SceneDefinition } from "../../../narrative/types";

export const jacobScene: SceneDefinition = {
  id: "genesis-jacob",
  pov: "third",
  focus: "shared",
  emotion: {
    attachment: 0.6,
    trust: 0.45,
    wonder: 0.5,
    control: 0.2,
  },
  environment: {
    id: "jabbok-river-dusk",
    fallback2D: "jabbok-river-2d",
  },
  audio: {
    track: "jacob",
    ambient: "river-night-insects",
  },
  echoTags: ["father", "son", "correction", "approval", "discipline"],
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hindi nagustuhan ni Theo si Jacob sa simula — masyadong madaya, masyadong mautak, laging naghahanap ng shortcut sa mga pabor na dapat naman sanang ipinagkakatiwala nang kusa.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Sanay ako sa simpleng kategorya: mabait o masama, bayani o kontrabida. Pero si Jacob? Napaka-imperfect. Halos kamukha ng mga taong kinatatakutan kong maging ako kapag desperado na akong makakuha ng control.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "manloloko na naloko ng sarili niyang tiyuhin. medyo deserve, pero nakakaawa rin pala kapag nakita mo nang malapitan.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Tapos ang gabi sa may Ilog Jabbok: ang tunog ng tubig na bumabangga sa batuhan, ang takot sa nalalapit na apatnadaan na tauhan ni Esau, at ang anino ng isang lalaking nakikipagbuno sa putikan hanggang sa mag-umpisang mamula ang silangan.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Naririnig mo ang mabigat na hininga ni Jacob, ang bali sa kasukasuan ng balakang niya habang nakakapit pa rin sa tela ng misteryosong estranghero, sumisigaw sa gitna ng sakit: “Hindi kita bibitawan hangga't hindi mo ako pinagpapala!”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Lumakad siyang paika-ika sa pagsikat ng araw sa Peniel. Pilay, pero buo sa unang pagkakataon. Doon ko natutunan na minsan, ang pagpapala pala ay hindi ang manatiling buo, kundi ang masugatan sa tamang yakap...",
    },
    {
      type: "sceneCue",
      cue: "The dawn light on Jabbok dissolves into the arid sun of Dothan, where brothers tend their flocks in silence.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/joseph",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/genesis/joseph",
  },
};

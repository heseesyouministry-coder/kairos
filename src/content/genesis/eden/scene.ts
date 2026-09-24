import { SceneDefinition } from "../../../narrative/types";

export const edenScene: SceneDefinition = {
  id: "genesis-eden",
  pov: "third",
  focus: "shared",
  emotion: {
    wonder: 0.7,
    control: 0.2,
    fear: 0.45,
    grief: 0.35,
    overwhelm: 0.4,
  },
  environment: {
    id: "eden-canopy",
    webglVariant: "living-garden-shift",
    fallback2D: "eden-canopy-2d",
  },
  audio: {
    track: "creation",
    ambient: "subtle-room",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hindi mukhang templo o museyo ang hardin; amoy basang lupa ito, amoy ligaw na dahon ng mint, at init ng araw sa balat ng punong igos — isang lugar na ginawa para sa mga kamay na sanay magtrabaho at paang sanay maglakad nang walang sapin.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hindi rin mukhang mga estatuwa sina Adam at Eve — may putik sa ilalim ng mga kuko nila, may polen sa balikat, at may tawanan sa paraan ng paglalakad nila sa tabing-ilog na parang wala silang anumang kailangang patunayan sa mundo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pinanood sila ni Theo mula sa ilalim ng sanga ng akasya, at ngayon lang niya naintindihan kung ano talaga ang kawalang-sala: hindi pala ito kamangmangan, kundi yung buong kawalan ng hiya at kawalan ng kailangang itago... wala silang kailangang bantayan.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Tapos, dahan-dahang lumapot ang hangin — ang ginintuang sikat ng araw sa mga dahon, hindi naman nawala, pero nagbago ang kulay nito, parang lumamig, tumalim, naging parang ilaw sa ospital.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Bulong",
      register: "literary",
      text: "“Talaga bang sinabi Niya na huwag kayong kakain mula sa alinmang puno sa halamanan?”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "hindi naman sumigaw yung boses. parang nagtatanong lang nang maayos, parang may punto.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Kinuha niya. Kinain niya. At ibinigay niya sa asawa niyang kasama niya, at kinain din nito — isang mahinang lutong ng prutas na parang umalingawngaw sa buong katahimikan ng halamanan.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Biglang yumuko ang mga balikat nila — hindi na tumitingin sa paligid nang may pagkamangha, kundi nakatingin sa sariling mga paa, sa sariling mga katawan, na parang bigla silang nalamigan at napansing wala silang saplot sa harap ng mundo.",
    },
    {
      type: "sceneCue",
      cue: "The sunlight bleeds away completely into an arid, scorched wind. Generations pass in a single breath.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/cain-and-abel",
    },
  ],
  transition: {
    type: "hardCut",
    to: "/experience/genesis/cain-and-abel",
  },
};

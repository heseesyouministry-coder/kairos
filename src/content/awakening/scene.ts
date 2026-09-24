import { SceneDefinition } from "../../narrative/types";

export const awakeningScene: SceneDefinition = {
  id: "awakening-mountain",
  pov: "third",
  focus: "theo",
  emotion: {
    grief: 0.35,
    wonder: 0.5,
    control: 0.15,
    trust: 0.7,
    overwhelm: 0.2,
  },
  environment: {
    id: "mountain-awakening",
    fallback2D: "mountain-awakening-2d",
  },
  audio: {
    track: "silence",
    ambient: "none",
  },
  narrative: [
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Biglang bumaliktad ang buong mundo — ang tunog ng alikabok, humigop paloob; nagbanggaan ang mga boses: ang pagaspas ng manipis na papel ng Bibliya sa hangin ng bundok, ang boses ng nanay niya sa hallway, ang tawa ni Lydia sa hagdanan ng school, at ang preno ng truck sa graba.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Tapos — isang buo, malamig, at walang-hanging katahimikan.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Isang malalim at biglaang singhap. Binuksan ni Theo ang mga mata niya.",
    },
    {
      type: "sensory",
      pov: "third",
      register: "literary",
      text: "Berdeng dahon ng pine laban sa maputlang asul na langit ng hapon; isang maliit na uwang na gumagapang sa kulay-abong limestone; ang matinding ngalay sa kanang balikat niya kung saan siya nakasandal sa bato; at ang tuyong buhangin sa dila niya.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Dahan-dahan siyang umupo, mabilis pa ring tumitibok ang puso niya sa dibdib. Eksaktong pareho pa rin ang bundok sa iniwan niya kanina. Walang sinaunang lupa. Walang usok. Walang sumisigaw.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Kinapa niya ang bulsa ng jacket niya, kinuha ang phone. Nagbukas ang screen.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "4:18 PM. Tiningnan ko ang oras bago ako naupo kanina — 2:07. Dalawang oras at labing-isang minuto lang pala ang lumipas.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "nag-uumpisa na naman agad yung utak kong magpaliwanag — baka kulang sa oxygen, baka dehydrated, baka kung anong neurological thing. automatic talaga, haha.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pero huminto siya. Ipinatong niya ang palad niya sa lumang balat ng Bibliya at dahan-dahan itong isinara... sa kauna-unahang pagkakataon sa buhay niya, hindi na niya kailangang lagyan ng label ang hiwaga para lang magpatuloy.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nasa screen pa rin ang text ni Sam: 'Naka-impake na ang truck. Aalis na kami maaga sa Sabado.'",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Kung yung dating Theo 'to, bubuksan ko agad ang laptop, magse-search ng batas sa renta, tatawag ng kakilala, gagawa ng five-point action plan. Binuksan ko ang reply box, nag-type ako: 'Kung gusto mo, pwede kong tingnan ang—' Tapos pinindot ko ang backspace hanggang sa mawala lahat.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Tatlong salita lang ang ipinadala ko: “Nandito lang ako.”",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/",
  },
};

import { SceneDefinition } from "../../narrative/types";

/**
 * 16. Jeremiah
 * Role: Companion
 * Attacks in Theo: His sensitivity to criticism — Jeremiah is mocked and keeps going anyway
 * Emotion: Emotional pain
 * Seeds: jeremiah-loneliness
 */
export const jeremiahScene: SceneDefinition = {
  id: "prophets-jeremiah",
  pov: "second",
  focus: "theo",
  emotion: {
    grief: 0.88,
    overwhelm: 0.85,
    fear: 0.7,
    trust: 0.5,
  },
  environment: {
    id: "jeremiah-mud-cistern",
    fallback2D: "jeremiah-mud-2d",
  },
  audio: {
    track: "jeremiah",
    ambient: "dungeon-mud-lament",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Nakalubog ka sa putik ng balon ni Malkias sa tabi ni Jeremiah. Madilim, malamig, at amoy bulok na tubig. Sa ibabaw ng pabilog na bunganga, naririnig mo ang tawanan ng mga prinsepe at saserdote na nagtapon sa kanya dahil hindi nila matanggap ang mensahe ng babala.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "apatnapung taon siyang nagsasalita nang walang nakikinig. tinawag na taksil, binugbog, ikinulong. kung ako yun, matagal na akong nag-resign.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Napakasensitibo ko kapag may pumupuna o nagrereject sa akin — isang malamig na tingin lang, gusto ko nang umatras. Pero narinig ko si Jeremiah na umiiyak sa putik: 'Kung sabihin ko, Hindi ko Siya babanggitin... mayroon sa aking puso na tulad ng nagniningas na apoy na nakukulong sa aking mga buto; at ako'y pagod na sa pagpipigil.' Hindi pala popularity contest ang pagiging tapat. Ang katapatan, kahit mag-isa ka lang, ay may sariling ningas na hindi kayang patayin ng kahihiyan.",
    },
    {
      type: "transitionCue",
      to: "/experience/exile/fall-of-jerusalem",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/exile/fall-of-jerusalem",
  },
};

/**
 * 17. Fall of Jerusalem — COLLAPSE TWO
 * Role: Powerless Observer
 * Attacks in Theo: Everything — death, loss, protection, faith
 * Emotion: Devastation (Peak EmotionalState values in the system: overwhelm 0.99, grief 0.98, fear 0.95)
 * Audio: Near-silence at points, restrained visuals, no spectacle
 * Seeds: jerusalem-fall (0.97 weight)
 */
export const fallOfJerusalemScene: SceneDefinition = {
  id: "collapse-fall-of-jerusalem",
  pov: "first",
  focus: "theo",
  emotion: {
    overwhelm: 0.99,
    grief: 0.98,
    fear: 0.95,
    control: 0.0,
    trust: 0.15,
  },
  environment: {
    id: "jerusalem-fall-ruins",
    fallback2D: "jerusalem-fall-2d",
  },
  audio: {
    track: "fall-of-jerusalem",
    ambient: "jerusalem-ruins-smoke",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nawasak ang pader matapos ang labing-walong buwan ng gutom. Walang cinematic battle. Walang mabagal na musika para palamutian ang trahedya — abo lang, amoy ng nasusunog na sedro ng Templo, at ang tunog ng mga kadenang bakal na nakakabit sa mga leeg ng mga bihag.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Gusto kong magising. Ilang beses kong ipinikit ang mga mata ko sa loob ng panaginip na ito, nagdarasal na pagdilat ko, nasa bundok na ulit ako o kaya sa kwarto ko sa Maynila. Pero hindi ako makatakas. Nandito ako sa tabi ng nasunog na Tarangkahan ng Sion, at hindi ko mapigilan ang panginginig ng buong katawan ko.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "hindi ko na kayang tanungin kung 'bakit.' ang tanging naitatanong ko na lang sa dilim, 'bakit hindi Mo ito pinigilan?'",
    },
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Napanood mo kung paano binuhat ng mga sundalong taga-Babilonia ang mga banal na sisidlan ng Templo — ang mga tansong haligi, ang malaking palanggana, ang kandelero — at dinurog ang mga ito sa kalsada para madaling ikarga sa mga karwahe.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Lahat ng pinaniniwalaan ko tungkol sa proteksyon at tagumpay, gumuho kasabay ng Banal ng mga Banal. Masakit. Sobrang sakit na halos hindi na ako makahinga. Pero sa kabila ng lahat ng abo at pagkadurog, may kakaibang katotohanang nanatili: kahit nasira ang bahay Niya sa lupa, hindi namatay ang Diyos. Ang pananampalataya ko ang nasira — yung pananampalatayang nakakabit sa mga bato at pader — at kailangan pala itong mamatay para makita ko kung ano ang tunay na hindi masisira kailanman.",
    },
    {
      type: "sceneCue",
      cue: "The smoke of the burned temple fades into the silent, cold night of the Euphrates.",
    },
    {
      type: "transitionCue",
      to: "/experience/exile/daniel",
    },
  ],
  transition: {
    type: "collapse",
    to: "/experience/exile/daniel",
  },
};

/**
 * 18. Daniel
 * Role: Companion
 * Attacks in Theo: Fear of isolation
 * Emotion: Steadiness
 */
export const danielScene: SceneDefinition = {
  id: "exile-daniel",
  pov: "second",
  focus: "theo",
  emotion: {
    trust: 0.85,
    fear: 0.5,
    control: 0.3,
    attachment: 0.6,
  },
  environment: {
    id: "babylon-lions-den-dawn",
    fallback2D: "babylon-lions-2d",
  },
  audio: {
    track: "daniel",
    ambient: "babylon-palace",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Sa gitna ng dayuhang lungsod ng Babilonia, tatlong beses sa isang araw na binubuksan ni Daniel ang bintana patungo sa gibang Jerusalem para manalangin. At sa kuweba ng mga leon, narinig mo ang mainit na hininga ng mga hayop na nakahiga sa tabi ng kanyang mga paa nang may tikom na bibig.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "sobrang isolated niya dito. dayuhan sa kultura, binantaan ng kamatayan, pero kalmado pa rin. walang drama.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Takot na takot akong mag-isa o maihiwalay sa nakasanayan ko. Pero kay Daniel, nakita ko kung ano ang ibig sabihin ng anchor. Hindi nakatali ang katatagan niya sa palasyo ng hari o sa bansang kinatatayuan niya — nakatali siya sa Panginoon na naghahari kahit sa gitna ng imperyo ng kaaway.",
    },
    {
      type: "transitionCue",
      to: "/experience/exile/esther",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/exile/esther",
  },
};

/**
 * 19. Esther
 * Role: Witness/Protector
 * Attacks in Theo: Fear of being judged
 * Emotion: Courage
 */
export const estherScene: SceneDefinition = {
  id: "exile-esther",
  pov: "third",
  focus: "biblical-character",
  emotion: {
    fear: 0.75,
    trust: 0.8,
    control: 0.4,
    attachment: 0.7,
  },
  environment: {
    id: "susa-inner-court",
    fallback2D: "susa-inner-2d",
  },
  audio: {
    track: "esther",
    ambient: "susa-banquet",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Tatlong araw na ayuno nang walang pagkain at inumin sa buong Susa. Nakatayo si Esther sa harap ng panloob na looban ng palasyo, suot ang kanyang damit-reyna, nanginginig habang naghihintay kung iuunat ng hari ang gintong setro.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "walang binanggit na pangalan ng Diyos sa buong libro niya. pero ramdam mo sa bawat segundo yung kamay na gumagalaw sa likod ng kurtina.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Lagi akong nagdadalawang-isip tumayo para sa tama dahil natatakot akong husgahan o mapahamak. Pero nung sinabi ni Esther, 'Kung ako'y mapahamak, ako'y mapahamak,' naintindihan ko kung bakit tayo inilalagay sa mga partikular na lugar at panahon. Ang tapang pala ay hindi kawalan ng kaba, kundi ang pagpili na itaya ang sarili para sa iba kahit walang garantiya ng kaligtasan.",
    },
    {
      type: "transitionCue",
      to: "/experience/exile/job",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/exile/job",
  },
};

/**
 * 20. Job
 * Role: Companion/Witness
 * Attacks in Theo: Instinct to explain suffering intellectually
 * Emotion: Humility
 */
export const jobScene: SceneDefinition = {
  id: "exile-job",
  pov: "second",
  focus: "theo",
  emotion: {
    grief: 0.85,
    overwhelm: 0.8,
    wonder: 0.75,
    control: 0.05,
  },
  environment: {
    id: "uz-ashes-whirlwind",
    fallback2D: "uz-ashes-2d",
  },
  audio: {
    track: "job",
    ambient: "ash-wind",
  },
  echoTags: ["doubt", "wisdom-vs-knowledge", "intellectual-humility"],
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Nakahandusay ka sa tambakan ng abo sa tabi ni Job. May hawak siyang pira-pirasong basag na banga na ipinangkakaskas sa nagnanaknak na sugat; sa harap ninyo ang tatlong kaibigan na pitong araw na nakaupong tahimik bago nagsimulang magbato ng mga teolohikong paliwanag.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ang sakit sa tainga ng mga paliwanag nila. lahat ng sinasabi nila technically 'correct,' pero lalong dumudurog kay Job.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Ako yung tipo ng tao na laging gustong ipaliwanag ang pagdurusa — gumagawa ng logic, mga bullet points, para hindi ako masyadong masaktan. Pero nang magsalita ang Diyos mula sa buhawi at nagtanong: 'Nasaan ka nang ilagay Ko ang mga patibayan ng lupa?' naitakip ko ang kamay ko sa aking bibig. Hindi pala paliwanag ang kailangan ng nasusugatang puso, kundi Presensya. Dati narinig ko Siya sa pandinig ng tainga, ngunit ngayon nakita Siya ng aking mata.",
    },
    {
      type: "transitionCue",
      to: "/experience/restoration/return",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/restoration/return",
  },
};

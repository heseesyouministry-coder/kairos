import { SceneDefinition } from "../../narrative/types";

/**
 * 1. Joshua & Jericho
 * Role: Witness/Participant
 * Attacks in Theo: Idea that courage = no fear
 * Emotion: Renewed determination
 */
export const joshuaJerichoScene: SceneDefinition = {
  id: "kingdom-joshua-jericho",
  pov: "second",
  focus: "theo",
  emotion: {
    trust: 0.75,
    fear: 0.5,
    control: 0.3,
    wonder: 0.7,
  },
  environment: {
    id: "jericho-walls",
    fallback2D: "jericho-walls-2d",
  },
  audio: {
    track: "jericho",
    ambient: "jericho-horns",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Pitong araw kayong naglalakad sa paligid ng pader nang walang salita — yabag lang ng libu-libong sandalyas sa tuyong lupa at ang bawat mabagal na ihip ng trumpeta ng mga saserdote.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Laging akala ni Theo, ang tapang ay kawalan ng takot. Yung parang mga bida sa pelikula na hindi nanginginig ang tuhod kapag humaharap sa pader na kasing-taas ng gusali.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "pero nung tumingin siya kay Joshua bago ang huling sigaw, nandoon pa rin yung panginginig sa mga daliri nito. Natatakot din siya. Naglakad lang talaga siya anyway.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Doon ko naintindihan: ang tunay na obedience pala, hindi ibig sabihing nawawala ang nerbiyos. Humahakbang ka lang kahit nanlalamig ang batok mo, kasi may Salitang mas matibay kaysa sa bato.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "At sa ikapitong pag-ikot, nung bumasag ang sigaw ng buong bayan, hindi mo naramdaman ang pwersa ng sandata — ang naramdaman mo ay ang pagguho ng sarili mong pagdududa kasabay ng mga bloke ng pader.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/judges",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/judges",
  },
};

/**
 * 2. Judges (Montage — Samson, Deborah, Gideon)
 * Role: Witness
 * Attacks in Theo: Belief that people naturally improve
 * Emotion: Frustration (Breathing space / short montage)
 */
export const judgesScene: SceneDefinition = {
  id: "kingdom-judges",
  pov: "third",
  focus: "theo",
  emotion: {
    grief: 0.65,
    overwhelm: 0.6,
    trust: 0.3,
    control: 0.2,
  },
  environment: {
    id: "judges-cycle-wilderness",
    fallback2D: "judges-cycle-2d",
  },
  audio: {
    track: "judges",
    ambient: "judges-strife",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Ulit-ulit na ikot: kaligtasan, kapayapaan, paglimot, pagkawasak. Nakita ni Theo si Gideon sa ilalim ng puno na puno ng pag-aalinlangan; si Deborah sa ilalim ng palma; si Samson na nakatali sa mga haligi habang humihingi ng lakas sa huling pagkakataon.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "nakaka-frustrate panoorin. akala mo natuto na sila nung nakaraang henerasyon, tapos paglipas ng bente anyos, balik na naman sa dati.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Akala ko dati, ang tao ay natural na nag-i-improve pagkatapos ng trial. Hindi pala. Kapag walang Hari, bawat isa sa atin ginagawa lang ang tama sa sarili nating paningin — at parang sarili ko rin ang tinitingnan ko sa salamin.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/ruth",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/ruth",
  },
};

/**
 * 3. Ruth
 * Role: Companion/Witness
 * Attacks in Theo: Measuring importance by spectacle
 * Emotion: Warmth (breathing space)
 */
export const ruthScene: SceneDefinition = {
  id: "kingdom-ruth",
  pov: "second",
  focus: "biblical-character",
  emotion: {
    attachment: 0.8,
    trust: 0.75,
    grief: 0.2,
    wonder: 0.6,
  },
  environment: {
    id: "bethlehem-barley-fields",
    fallback2D: "bethlehem-barley-2d",
  },
  audio: {
    track: "ruth",
    ambient: "harvest-breeze",
  },
  echoTags: ["intuition", "protection", "emotional-safety", "noticing"],
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Amoy tuyong sebada sa bukid ng Bethlehem sa dapithapon. Walang kulog, walang nahating dagat, walang hukbong nagwawagayway ng sibat — mga kamay lang ni Ruth na nagpupulot ng mga uhay sa likod ng mga mang-aani.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "walang fireworks dito. pero sobrang sarap huminga pagkatapos ng gulo sa panahon ng mga hukom.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Lagi kong sinusukat ang pagkilos ng Diyos sa laki ng ingay o himala. Pero dito sa tahimik na bukirin, nakita ko kung paano hinahabi ang linya ng hari sa pamamagitan lang ng katapatan ng isang dayuhang babae na tumangging iwan ang kanyang biyenan.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/samuel",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/samuel",
  },
};

/**
 * 4. Samuel
 * Role: Companion
 * Attacks in Theo: Belief that calling always feels clear
 * Emotion: Attentiveness
 */
export const samuelScene: SceneDefinition = {
  id: "kingdom-samuel",
  pov: "second",
  focus: "theo",
  emotion: {
    trust: 0.7,
    fear: 0.3,
    wonder: 0.65,
    control: 0.2,
  },
  environment: {
    id: "shiloh-tabernacle-lamp",
    fallback2D: "shiloh-tabernacle-2d",
  },
  audio: {
    track: "samuel",
    ambient: "sanctuary-whisper",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Kurap-kurap ang ilawan sa Shiloh bago magbukang-liwayway. Sa tabi mo, isang batang naguguluhan, patakbo-takbo kay Eli: 'Nandito po ako, tinawag niyo po ba ako?'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "akala kasi natin kapag tinawag ka ng Diyos, may megaphone o pirma sa langit. akala ni Samuel si Eli lang yung tumatawag sa kanya.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naintindihan ko kung bakit ako laging sabik sa matitinding senyales. Natatakot kasi akong makinig sa bulong. Mas madaling maghintay ng kulog kaysa matutong magsabi sa dilim ng: 'Magsalita Ka po, Panginoon, nakikinig ang Iyong lingkod.'",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/saul",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/saul",
  },
};

/**
 * 5. Saul
 * Role: Witness
 * Attacks in Theo: His own sensitivity to criticism/rejection
 * Emotion: Unease
 */
export const saulScene: SceneDefinition = {
  id: "kingdom-saul",
  pov: "third",
  focus: "theo",
  emotion: {
    fear: 0.7,
    attachment: 0.4,
    control: 0.6,
    grief: 0.5,
  },
  environment: {
    id: "gibeah-court-shadows",
    fallback2D: "gibeah-court-2d",
  },
  audio: {
    track: "saul",
    ambient: "court-tension",
  },
  echoTags: ["father", "son", "correction", "approval", "discipline"],
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nakatayo si Saul sa Gibeah, matangkad kaysa sa sinuman sa bayan, pero nanginginig ang mga mata tuwing naririnig ang awitan ng mga kababaihan tungkol sa libu-libo at sampu-sampung libo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "nakakatakot makita yung taong sinira ng sarili niyang takot sa opinyon ng iba. parang nanonood ka ng mabagal na pagkasunog.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Parang tinutusok ang puso ko habang pinapanood ko si Saul. Yung takot niyang hindi matanggap, yung laging pag-aalala kung ano ang sasabihin ng crowd — ganoon na ganoon ako kapag nararamdaman kong may pumupuna sa akin. Ang crown pala, nagiging gapos kapag approval ng tao ang pundasyon mo.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/david-goliath",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/david-goliath",
  },
};

/**
 * 6. David & Goliath
 * Role: Witness/Participant
 * Attacks in Theo: His hidden confidence (romanticizes courage first)
 * Emotion: Inspiration
 */
export const davidGoliathScene: SceneDefinition = {
  id: "kingdom-david-goliath",
  pov: "second",
  focus: "theo",
  emotion: {
    wonder: 0.85,
    trust: 0.8,
    fear: 0.4,
    control: 0.3,
  },
  environment: {
    id: "elah-valley-stones",
    fallback2D: "elah-valley-2d",
  },
  audio: {
    track: "david-goliath",
    ambient: "valley-tension",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Nasa Libis ka ng Elah. Ang amoy ng alikabok at bakal ng mga sandata ng mga sundalong nanginginig sa takot sa loob ng apatnapung araw; at ang yabag ng pastol na walang dalang kalasag kundi tirador at limang makikinis na bato.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "akala ko dati macho moment ito. pero nung tumayo si David, mukha lang siyang totoy na sobrang nasaktan para sa Pangalan ng Diyos.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Lagi kong niroromanticize ang courage — akala ko bilib sa sarili ang kailangan. Pero si David, wala siyang tiwala sa sarili niyang braso; galit siya dahil hinamak ang buhay na Diyos. Ang tapang pala ay hindi kawalan ng limitasyon, kundi kawalan ng pag-aalinlangan sa kung sino ang kasama mo sa laban.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/david-jonathan",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/david-jonathan",
  },
};

/**
 * 7. David & Jonathan
 * Role: Companion/Witness
 * Attacks in Theo: Fear of losing people he loves
 * Emotion: Attachment
 */
export const davidJonathanScene: SceneDefinition = {
  id: "kingdom-david-jonathan",
  pov: "third",
  focus: "shared",
  emotion: {
    attachment: 0.9,
    grief: 0.55,
    trust: 0.8,
    fear: 0.4,
  },
  environment: {
    id: "field-ezel-arrow",
    fallback2D: "field-ezel-2d",
  },
  audio: {
    track: "david-jonathan",
    ambient: "friendship-quiet",
  },
  echoTags: ["music", "silence", "companionship-without-words"],
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Sa tabi ng batong Ezel, narinig mo ang hagulgol ng dalawang lalaking nagyakapan hanggang sa si David ay lumagpas pa sa pag-iyak. Hinubad ni Jonathan ang kanyang balabal, pana, at espada para ibigay sa kaibigang hinahabol ng sarili niyang ama.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "sobrang bihira ng ganitong pagmamahal. handa kang isuko yung trono mo para lang mabuhay ang kaibigan mo.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Ang pinakamalaking takot ko ay maiwan o mawalan ng taong mahal ko. Pero nakita ko rito kung paanong ang tunay na covenant love ay hindi nagpapanic sa distansya o panganib. Kahit alam nilang magkakahiwalay sila, ang tipan nila ay nakatali sa Diyos bago sa isa't isa.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/david-saul",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/david-saul",
  },
};

/**
 * 8. David & Saul
 * Role: Companion/Questioner
 * Attacks in Theo: Belief that being right = permission to act
 * Emotion: Moral uncertainty
 */
export const davidSaulScene: SceneDefinition = {
  id: "kingdom-david-saul",
  pov: "second",
  focus: "theo",
  emotion: {
    control: 0.2,
    trust: 0.65,
    fear: 0.6,
    grief: 0.4,
  },
  environment: {
    id: "engedi-cave-dark",
    fallback2D: "engedi-cave-2d",
  },
  audio: {
    track: "david-saul",
    ambient: "cave-darkness",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Malamig at amoy dumi ng kambing sa loob ng kuweba ng En Gedi. Tulog si Saul sa may bungad; hawak ni David ang patalim sa dilim habang ibinubulong ng mga kasama niya: 'Ito na ang araw! Ibinigay na ng Panginoon ang kaaway mo sa iyong kamay.'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "kung ako yun, baka sinaksak ko na. ang dali kasing ipaliwanag na will of God yun dahil nasa harap mo na ang opportunity.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nang gupitin lang ni David ang laylayan ng balabal ni Saul at kinabahan agad ang budhi niya, napahiya ako. Laging akala ko, kapag tama ako at api ako, may lisensya na akong gumanti o tapusin ang laban sa sarili kong paraan. Pero tinanggihan ni David na hawakan ang pinahiran ng Diyos. Mas pinili niyang magdusa kaysa agawin ang tiyempo ng langit.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/david-bathsheba",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/david-bathsheba",
  },
};

/**
 * 9. David & Bathsheba (Verbatim Section 4)
 * Role: Witness
 * Attacks in Theo: Idealizing people — "good/bad person" breaks here
 * Emotion: Disillusionment
 */
export const davidAndBathsheba: SceneDefinition = {
  id: "kingdom-david-bathsheba",
  focus: "biblical-character",
  pov: "third",
  emotion: { attachment: 0.6, grief: 0.5, overwhelm: 0.3, trust: 0.0 },
  environment: { id: "palace-night", fallback2D: "palace-night-2d" },
  audio: {
    track: "david-bathsheba",
    ambient: "palace-night",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Alam ni Theo ang haring ito. Basa na niya ito, ilang beses na, yung batang nanalig, yung pastol na naging hari — pero ngayon, ibang tao ang nakikita niya, parang parehong pangalan lang ang pagkakapareho.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "hindi ganito dapat. alam niya ang kwento pero hindi niya inasahan na ganito kabigat panoorin.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Gusto kong sabihing hindi ito totoo, na mali ang nakikita ko, pero alam ko — ito na yung parteng ayaw kong basahin nang tuluyan, kasi kapag binasa mo nang tuluyan, hindi mo na kayang sabihing 'pero mabuti naman siyang tao.'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Walang kulog. Walang tunog ng paghatol. Tahimik lang — at yun pa nga ang pinakamalakas na parusa, yung katahimikang naghihintay sa umaga.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Hindi ko na kaya ikahon si David. Hindi na siya 'yung mabuting hari' o 'yung nagkamali.' Pareho. Sabay. At hindi ko alam kung paano tatanggapin yun.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/solomon",
    },
  ],
  transition: { type: "hardCut", to: "/experience/kingdom/solomon" },
};

/**
 * 10. Solomon
 * Role: Witness/Outsider
 * Attacks in Theo: His own intellectual pride (dangerous mirror)
 * Emotion: Reflection
 */
export const solomonScene: SceneDefinition = {
  id: "kingdom-solomon",
  pov: "third",
  focus: "theo",
  emotion: {
    control: 0.5,
    wonder: 0.55,
    grief: 0.6,
    trust: 0.4,
  },
  environment: {
    id: "solomon-ivory-hall",
    fallback2D: "solomon-ivory-2d",
  },
  audio: {
    track: "solomon",
    ambient: "court-tension",
  },
  echoTags: ["doubt", "wisdom-vs-knowledge", "intellectual-humility"],
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Lahat ng uri ng karunungan, pilak na parang bato lang sa kalsada ng Jerusalem, mga barkong nagdadala ng ginto mula sa Ophir, mga libo-libong kawikaan — pero sa sulok ng trono, nakaupo ang haring unti-unting hinihila ng mga dayuhang dambana.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ang talino niya, sobra. pero sa dulo, ang lungkot panoorin kung paano nauwi sa kawalan ng kabuluhan ang lahat nung nawala yung puso.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Isang mapanganib na salamin si Solomon para sa akin. Laging karunungan at teolohiya ang pinanghahawakan ko para makaramdam ng seguridad. Pero dito ko nakita: maaari mong maunawaan ang lahat ng hiwaga sa mundo at masagot ang lahat ng tanong ng reyna, pero maging manhid pa rin sa Diyos na nagbigay ng isip mo.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/the-temple",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/the-temple",
  },
};

/**
 * 11. The Temple
 * Role: Participant
 * Attacks in Theo: Understanding of worship — faith becomes sensory
 * Emotion: Reverence
 */
export const theTempleScene: SceneDefinition = {
  id: "kingdom-the-temple",
  pov: "second",
  focus: "theo",
  emotion: {
    wonder: 0.95,
    trust: 0.85,
    overwhelm: 0.7,
    fear: 0.4,
  },
  environment: {
    id: "solomon-temple-shekinah",
    fallback2D: "solomon-temple-2d",
  },
  audio: {
    track: "the-temple",
    ambient: "temple-smoke-incense",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Mabigat ang usok ng insenso at mira. Kumikinang ang purong ginto sa mga dingding ng Templo, at nang lumuhod ang mga saserdote, bumaba ang makapal na ulap ng kaluwalhatian na naging dahilan para hindi na sila makatayong maglingkod.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "hindi lang ito doctrine na pinag-uusapan sa classroom. ramdam mo sa balat mo yung kabanalan, yung init na nakakapanginig.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Dati, ang pagsamba sa akin ay pagsang-ayon lang sa mga tamang proposisyon. Pero dito, naging pisikal ang pananampalataya. Naramdaman ko ang alikabok sa noo ko habang nakasubsob ako sa sahig. May Diyos na pumili talagang tumahan sa gitna ng mga tao — kahit hindi Siya kayang magkasya sa pinakamalawak na langit.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/elijah",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/elijah",
  },
};

/**
 * 12. Elijah
 * Role: Companion
 * Attacks in Theo: Dramatic victory != emotional victory
 * Emotion: Sobriety
 */
export const elijahScene: SceneDefinition = {
  id: "kingdom-elijah",
  pov: "second",
  focus: "theo",
  emotion: {
    grief: 0.6,
    overwhelm: 0.7,
    trust: 0.6,
    wonder: 0.5,
  },
  environment: {
    id: "horeb-broom-tree",
    fallback2D: "horeb-broom-2d",
  },
  audio: {
    track: "elijah",
    ambient: "carmel-drought-whisper",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Pagkatapos ng apoy sa Bundok Carmel, nakahiga si Elijah sa ilalim ng mababang puno ng walis sa ilang, nakapikit, pagod na pagod: 'Sukat na ngayon, Panginoon; kunin Mo na ang aking buhay, sapagkat hindi ako higit na mabuti kaysa sa aking mga magulang.'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "kagagaling lang niya sa pinakamalaking panalo sa kasaysayan, tapos dito nagtatapos? humihingi ng kamatayan dahil sa isang banta ni Jezebel?",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Lagi kong iniisip na kapag nagkaroon ng breakthrough o malaking sagot sa panalangin, magiging madali na ang lahat. Pero hindi pala garantiya ang dramatic victory para sa kapayapaan ng puso. At nung dumaan ang malumanay na bulong ng hangin sa Horeb, natutunan kong hindi palaging apoy ang kailangan ko — minsan tinapay lang, tubig, at pahinga.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/elisha",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/elisha",
  },
};

/**
 * 13. Elisha
 * Role: Companion/Witness
 * Attacks in Theo: Importance = scale
 * Emotion: Tenderness (breathing space)
 */
export const elishaScene: SceneDefinition = {
  id: "kingdom-elisha",
  pov: "second",
  focus: "biblical-character",
  emotion: {
    attachment: 0.75,
    trust: 0.7,
    wonder: 0.6,
  },
  environment: {
    id: "jordan-spring-water",
    fallback2D: "jordan-spring-2d",
  },
  audio: {
    track: "elisha",
    ambient: "river-jordan-peace",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Walang humahagupit na apoy dito. Isang banga ng langis ng balo na hindi nauubos; isang lumulutang na ulo ng palakol sa Jordan; isang batang binuhay na humatsing ng pitong ulit bago iminulat ang mga mata.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ang liit ng mga detalyeng ito kumpara sa paghati ng dagat. pero parang mas lumalapit ang puso mo.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Sanay ako na sa national scale lang tumitingin sa Diyos. Pero kay Elisha, nakita ko kung paanong binibigyang-halaga ng langit ang nawawalang palakol ng isang manggagawa at ang gutom ng isang nag-iisang nanay. Hindi pala nasusukat ang kahalagahan ng buhay sa laki ng entablado.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/divided-kingdom",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/divided-kingdom",
  },
};

/**
 * 14. Divided Kingdom
 * Role: Outsider/Witness
 * Attacks in Theo: Belief that consequences are simple/individual
 * Emotion: Frustration
 */
export const dividedKingdomScene: SceneDefinition = {
  id: "kingdom-divided",
  pov: "third",
  focus: "theo",
  emotion: {
    grief: 0.7,
    overwhelm: 0.65,
    control: 0.15,
    trust: 0.35,
  },
  environment: {
    id: "divided-border-dan-bethel",
    fallback2D: "divided-border-2d",
  },
  audio: {
    track: "divided-kingdom",
    ambient: "divided-distant-cries",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Dalawang dambana ng gintong baka sa Dan at Bethel. Magkapatid na bansa na nagpapatayan sa hangganan; mga haring sunod-sunod na nagtayo ng mga imahen ng Baal habang ang mga maralitang magsasaka ang nagbabayad ng presyo ng digmaan.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ang gulo. hindi mo na alam kung sino ang tama o mali, kasi bawat henerasyon mas lalong naging manhid sa kasalanan.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Lagi kong inaakalang ang kasalanan ay indibidwal lang — na kapag nagkamali ka, ikaw lang ang apektado. Pero dito sa pagkakahati ng kaharian, nakita ko kung paano gumagapang ang kompromiso sa loob ng daan-daang taon hanggang sa maging kultura na sumisira sa buong henerasyon.",
    },
    {
      type: "transitionCue",
      to: "/experience/kingdom/isaiah",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/kingdom/isaiah",
  },
};

/**
 * 15. Isaiah
 * Role: Questioner
 * Attacks in Theo: Obsession with knowing the future
 * Emotion: Wonder + uncertainty
 */
export const isaiahScene: SceneDefinition = {
  id: "kingdom-isaiah",
  pov: "second",
  focus: "theo",
  emotion: {
    wonder: 0.85,
    fear: 0.6,
    trust: 0.6,
    overwhelm: 0.7,
  },
  environment: {
    id: "isaiah-throne-smoke",
    fallback2D: "isaiah-throne-2d",
  },
  audio: {
    track: "isaiah",
    ambient: "throne-room-seraphim",
  },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Nang mamatay ang Haring Uzzias, nakita mo ang Panginoon na nakaupo sa mataas at maringal na trono. Puno ang templo ng laylayan ng Kanyang damit; may serapin na lumilipad bitbit ang nagniningas na baga mula sa dambana na idinampi sa maruruming labi.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "gusto laging malaman ni Theo kung ano ang mangyayari sa hinaharap. pero pagharap mo sa ganitong kaluwalhatian, mawawalan ka ng ganang magtanong ng timeline.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Bago ang mga propesiya tungkol sa Lingkod na magdurusa at sanggol na isisilang, may 'Kawawa ako!' muna. Ang obsession ko sa pag-intindi sa hinaharap ay naging katahimikan. Hindi ko kailangang malaman ang bawat detalye ng bukas; sapat nang malaman kung Sino ang nakaupo sa trono kapag namamatay ang mga hari ng lupa.",
    },
    {
      type: "transitionCue",
      to: "/experience/exile/jeremiah",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/exile/jeremiah",
  },
};

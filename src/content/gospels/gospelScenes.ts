/**
 * KAIROS — Phase 4: The Gospels & The Messiah
 * Scope: First Sight, Ordinary People, Sermon on the Mount, Miracles,
 * Disciples, Peter's Confession, Theo's Intervention, Triumphal Entry,
 * Empty Tomb, Resurrection Appearances.
 */

import { SceneDefinition } from "../../narrative/types";

// 1. FIRST SIGHT OF JESUS (No announcement rendering. Just a man in the crowd.)
export const firstSightOfJesusScene: SceneDefinition = {
  id: "gospel-first-sight",
  focus: "theo",
  pov: "first",
  emotion: { wonder: 0.85, trust: 0.75, fear: 0.2, control: 0.2 },
  environment: { id: "galilee-dust", fallback2D: "galilee-dust-2d" },
  audio: {
    track: "gospel",
    ambient: "crowd-dust",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Apat na raang taon ng katahimikan, tapos isang maalikabok na kalsada sa pampang ng Jordan.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Naghintay ako ng kulog. O kahit man lang biglang pagbabago ng hangin, yung may mararamdaman kang kuryente sa balat mo bago magsalita ang langit.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Walang dumating na tunog. Walang liwanag na bumagsak mula sa mga ulap. Nakatayo lang Siya roon sa gitna ng mga mangingisda at maniningil ng buwis—may putik ang laylayan ng Kanyang damit, at may alikabok sa Kanyang buhok.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Hinanap mo ang tanda ng hari sa Kanyang tindig, pero ang nakita mo ay isang taong humihinga tulad mo, pinapawisan sa ilalim ng araw, nakikinig sa kwento ng isang matandang bulag na para bang wala nang iba pang mahalaga sa mundo.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Doon gumuho yung unang akala ko. Akala ko kapag dumating ang Diyos na nagkatawang-tao, mapipilitan ang buong sansinukob na yumuko sa gulat. Pero hindi. Dumaan Siya na parang kapitbahay mo lang.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/gospels/ordinary-people" },
};

// 2. JESUS & ORDINARY PEOPLE (Attacks tendency to abstract Jesus into doctrine)
export const jesusOrdinaryPeopleScene: SceneDefinition = {
  id: "gospel-ordinary-people",
  focus: "biblical-character",
  pov: "third",
  emotion: { attachment: 0.85, trust: 0.8, wonder: 0.6, control: 0.15 },
  environment: { id: "galilee-market", fallback2D: "galilee-market-2d" },
  audio: {
    track: "gospel",
    ambient: "crowd-dust",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Walang silya ng hukom sa hapag-kainan ni Mateo. May tumutulong sarsa sa mesa, may mga basong pinupuno muli, at may halakhak na sumasapaw sa bulong ng mga Pariseo sa labas ng pinto.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Sanay akong aralin Siya bilang paksa—mga doktrina, hypostatic union, apat na teolohikong diskurso. Pero paano mo ia-abstract ang isang taong kumakain ng inihaw na isda kasama ang mga taong tinawag mong marumi?",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Lumapit ang isang ketongin, nakayuko, takot na batuhin. Hindi Siya umatras. Bago pa man bumigkas ng salita ng pagpapagaling, inabot ng Kanyang mga daliri ang namamagang balat.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Naramdaman mo ang hapdi ng paghawak na iyon—hindi dahil may sakit ka, kundi dahil napagtanto mong sa buong buhay mo, mas komportable kang pag-aralan ang pag-ibig kaysa hayaan itong hawakan ang mga sugat mo.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/gospels/sermon-on-the-mount" },
};

// 3. SERMON ON THE MOUNT (Knowing principles ≠ living them)
export const sermonOnTheMountScene: SceneDefinition = {
  id: "gospel-sermon-mount",
  focus: "shared",
  pov: "third",
  emotion: { grief: 0.5, trust: 0.7, wonder: 0.75, control: 0.2 },
  environment: { id: "mount-beatitudes", fallback2D: "mount-beatitudes-2d" },
  audio: {
    track: "gospel",
    ambient: "galilee-shore",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Umupo Siya sa damuhan sa gilid ng bundok. Walang trumpeta. Ang boses Niya ay sumabay sa ihip ng hangin mula sa lawa.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "'Mapapalad ang mga dukha sa espiritu... mapapalad ang mga nagdadalamhati... ibigin ninyo ang inyong mga kaaway.'",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Kabisado ko ang bawat talata. Kaya kong i-diagram ang sintaks ng Griyego, kaya kong talakayin ang etika ng Kaharian sa anumang diskusyon. Pero habang nakikinig ako, naging salamin ang bawat salita Niya.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Ang daling maging matuwid kapag teorya lang ang pinag-uusapan. Pero yung iabot ang kabilang pisngi? Yung ipagdasal yung taong sumira sa pangalan mo? Walang syllabus na makakapagturo niyan.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Nakita mo kung paano Siya tumingin sa karamihan—hindi bilang guro na nagbibigay ng grado, kundi bilang Pastol na nakakakita kung gaano kabigat ang dalahin ng bawat puso.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/gospels/the-miracles" },
};

// 4. THE MIRACLES (Scientific instinct to categorize everything)
export const theMiraclesScene: SceneDefinition = {
  id: "gospel-miracles",
  focus: "biblical-character",
  pov: "third",
  emotion: { wonder: 0.9, control: 0.1, trust: 0.7, overwhelm: 0.6 },
  environment: { id: "galilee-storm", fallback2D: "galilee-storm-2d" },
  audio: {
    track: "gospel",
    ambient: "galilee-shore",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Bumagsak ang alon sa bangka; humampas ang hangin hanggang sa mapunit ang layag. Natutulog Siya sa unan.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Awtomatikong nag-isip ang utak ko ng atmospheric pressure, microbursts sa Sea of Galilee, fluid dynamics.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tumayo Siya. Walang ritwal. Walang sigaw. 'Tumahimik ka, pumayapa ka.' At ang lawa ay naging parang salamin.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Hindi ito mahika na pwede mong ipaliwanag gamit ang mga batas ng kalikasan. Ito ang May-ari ng batas na pumasok sa loob ng sarili Niyang bahay, at ang bawat molekula ay tumugon sa boses na unang naghabi sa kanila.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/gospels/the-disciples" },
};

// 5. THE DISCIPLES (Idealizing followers of Jesus)
export const theDisciplesScene: SceneDefinition = {
  id: "gospel-disciples",
  focus: "shared",
  pov: "third",
  emotion: { attachment: 0.85, trust: 0.7, grief: 0.3 },
  environment: { id: "capernaum-house", fallback2D: "galilee-dust-2d" },
  audio: {
    track: "gospel",
    ambient: "galilee-shore",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "Sa mga paintings sa simbahan, may gintong bilog sa ulo ang bawat isa sa kanila. Pero dito, nag-aaway sila kung sino ang mas magaling.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Si Santiago at Juan, humihiling ng apoy mula sa langit para sunugin ang nayon ng Samaria. Si Tomas, laging nakakunot ang noo, nagbibilang ng panganib. Si Pedro, daldal nang daldal bago pa maintindihan ang sinasabi.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Gusto ko silang ayusin. Gusto kong sabihin, 'Mga kasama, huwag kayong ganyan, kayo ang magiging haligi ng pananampalataya!' Pero nakita ko kung paano sila tingnan ni Jesus. Hindi Siya nainip. Mahal Niya sila—hindi sa kung ano sila balang araw, kundi sa mismong kapalpakan nila ngayon.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/gospels/peters-confession" },
};

// 6. PETER'S CONFESSION (Need to always be the one who understands)
export const petersConfessionScene: SceneDefinition = {
  id: "gospel-peters-confession",
  focus: "shared",
  pov: "third",
  emotion: { trust: 0.85, wonder: 0.8, control: 0.2, fear: 0.3 },
  environment: { id: "caesarea-philippi", fallback2D: "galilee-dust-2d" },
  audio: {
    track: "gospel",
    ambient: "galilee-shore",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sa paanan ng bato ng Caesarea Philippi, nagtanong Siya: 'Ngunit para sa inyo, sino Ako?'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sumagot si Pedro, may panginginig sa boses ngunit may tibay: 'Ikaw ang Cristo, ang Anak ng Diyos na buhay.'",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Naramdaman ko ang kaba ni Pedro. Alam ko ang tamang sagot—isusulat ko sana sa exam kung tinanong ako. Pero ang bigkasin ito sa harap ng taong nagpapatawad sa mga kasalanan mo? Ibang-iba.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Ngunit nang sumunod na sandali, nang simulan Niyang ipaliwanag na kailangan Niyang magdusa, itakwil ng mga matatanda, at mamatay, hinila Siya ni Pedro sa tabi: 'Huwag itulot ng Panginoon!'",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Doon ko naintindihan. Kayang-kaya nating sambahin ang Hari. Ang hindi natin matanggap ay ang Hari na nagpiling maging biktima.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/gospels/theos-intervention" },
};

// 7. THEO'S INTERVENTION (The Biggest Mistake — Section 2 hinge scene)
export const theosInterventionScene: SceneDefinition = {
  id: "gospel-theos-intervention",
  focus: "theo",
  pov: "first",
  emotion: { overwhelm: 0.85, fear: 0.85, control: 0.05, grief: 0.8, trust: 0.3 },
  environment: { id: "jerusalem-alley", fallback2D: "courtyard-firelight-2d" },
  audio: {
    track: "gethsemane",
    ambient: "gethsemane-dusk",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Isang makipot na eskinita sa labas ng lungsod, habang papalubog ang araw bago ang Paskwa. Nakatayo si Judas sa lilim ng isang pader, may binibilang sa kanyang isip.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Alam ko ang bawat hakbang. Nabasa ko ang mga kabanata nang paulit-ulit. Alam ko kung kailan siya pupunta sa mga punong saserdote, alam ko kung magkano ang ibabayad nila. Ang buong buhay ko, ang tanging paraan ko ng pagkontrol sa takot ay ang kaalaman: paghandaan, pigilan, ayusin.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Humakbang ka paharap. Sumisigaw ang utak mo: pigilan mo siya. Baguhin mo ang kasaysayan. Hindi kailangang mangyari ito.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Hinawakan ko ang braso niya. 'Huwag,' sabi ko. 'Huwag kang pumunta sa templo. Tatlumpung pirasong pilak lang yun. Hinding-hindi mo mapapatawad ang sarili mo sa gagawin mo.'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Lumingon si Judas. Walang tinig mula sa langit na pumigil kay Theo. Walang kidlat na bumagsak upang ipaalala ang mga panuntunan ng panahon.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "Tiningnan lang siya ni Judas nang may pagkabugnot at pagtataka. Hinablot nito pabalik ang kanyang braso: 'Sino ka ba? Lumayo ka sa akin.' At naglakad ito palayo, papasok sa dilim, patungo sa sarili nitong desisyon.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naiwan akong nakatayo sa malamig na putik. Doon ako tuluyang nawasak. Hindi dahil may batas na pumigil sa akin—kundi dahil napagtanto kong walang halaga ang lahat ng kaalaman ko. Hindi kayang iligtas ng talino ang pusong nagpasyang tumalikod.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/gospels/triumphal-entry" },
};

// 8. TRIUMPHAL ENTRY (Public excitement ≠ true understanding)
export const triumphalEntryScene: SceneDefinition = {
  id: "gospel-triumphal-entry",
  focus: "shared",
  pov: "third",
  emotion: { wonder: 0.7, grief: 0.6, fear: 0.5, trust: 0.6 },
  environment: { id: "mount-olives-path", fallback2D: "galilee-dust-2d" },
  audio: {
    track: "gospel",
    ambient: "crowd-dust",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Mga sanga ng palma sa kalsada, mga balabal na inilatag sa alikabok. 'Hosana sa Anak ni David!' sigaw ng libu-libo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nakasakay Siya sa isang batang asno. Habang sumisigaw ang lungsod sa tuwa, tumulo ang luha sa Kanyang mga mata.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Ang buong bayan ay naghihintay ng rebolusyon—isang mandirigma na sisira sa imperyo ng Roma. Sinasamba nila ang imahinasyon nila, hindi ang taong nakasakay sa asno.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Alam Niya na ang parehong mga boses na sumisigaw ng 'Hosana' ngayon ay sisigaw ng 'Ipako Siya sa krus' makalipas ang limang araw. At kahit alam Niya, nagpatuloy pa rin Siya sa paglakad.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/cross/gethsemane" },
};

// 14. EMPTY TOMB (Assumption that suffering = God's absence -> Disbelief to hope)
export const emptyTombScene: SceneDefinition = {
  id: "gospel-empty-tomb",
  focus: "theo",
  pov: "first",
  emotion: { wonder: 0.95, trust: 0.85, grief: 0.3, fear: 0.4 },
  environment: { id: "empty-tomb", fallback2D: "empty-tomb-2d" },
  audio: {
    track: "empty-tomb",
    ambient: "dawn-garden",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Madaling-araw ng unang araw ng sanlinggo. Madilim pa, ngunit may manipis na abuhing liwanag na sumisilip sa mga dahon ng olibo.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Akala ko tapos na ang lahat. Akala ko kapag namatay ang Diyos sa krus, ang naiwan na lang ay ang sugat ng kawalan. Sumunod ako sa hardin dala ang parehong bigat na dala ni Maria Magdalena.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Ngunit pagdating sa libingan, ang malaking bato ay naigulong na palayo. Malamig ang loob, ngunit walang bangkay.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Tiningnan ko ang mga telang lino. Hindi pinunit, hindi nagkalat. Maayos na nakatupi sa isang tabi, na parang gumising lang Siya sa umaga at iniligpit ang Kanyang higaan.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "'Bakit ninyo hinahanap ang buhay sa gitna ng mga patay?' Hindi ito simpleng pagbabalik mula sa kamatayan; ito ang simula ng bagong paglikha kung saan ang kamatayan mismo ang nilamon ng buhay.",
    },
  ],
  transition: { type: "crossfade", to: "/experience/gospels/resurrection-appearances" },
};

// 15. RESURRECTION APPEARANCES (Belief that failure permanently defines a person -> Relief)
export const resurrectionAppearancesScene: SceneDefinition = {
  id: "gospel-resurrection-appearances",
  focus: "shared",
  pov: "third",
  emotion: { trust: 0.95, attachment: 0.95, wonder: 0.9, grief: 0.1 },
  environment: { id: "resurrection-shore", fallback2D: "resurrection-shore-2d" },
  audio: {
    track: "resurrection",
    ambient: "charcoal-fire",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Sa dalampasigan ng Tiberias sa pagbubukang-liwayway, may nag-aabang na baga ng uling. May isdang nakatutong at may tinapay.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nang marinig ni Pedro na ang Panginoon iyon, tumalon siya sa tubig, hindi makapaghintay na dumaong ang bangka.",
    },
    {
      type: "internal",
      pov: "first",
      register: "casual",
      text: "Kung ako si Jesus, siguro hihingi ako ng paliwanag. 'Pedro, bakit mo ako tinalikuran? Hindi ba sabi mo handa kang mamatay para sa akin?'",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Ngunit pagkatapos nilang kumain, tumingin Siya kay Pedro: 'Simon, anak ni Juan, iniibig mo ba Ako nang higit kaysa sa mga ito?' Tatlong beses Niya itong tinanong—isang tanong para sa bawat pagtatanggi sa tabi ng apoy ng hukuman.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naramdaman ko ang pagluwag sa dibdib ko. Hindi sinira ng pagkukulang ni Pedro ang kanyang kinabukasan. Ang kabiguan ay hindi libingan; ito ang lupang tinamnan ng tunay na biyaya.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Tumingin si Jesus patungo sa akin—o baka sa bawat taong natatakot na hindi na sila sapat. 'Sumunod ka sa Akin.'",
    },
  ],
  transition: { type: "crossfade", to: "/experience/acts/pentecost" },
};

export const GOSPEL_SCENES: Record<string, SceneDefinition> = {
  "first-sight": firstSightOfJesusScene,
  "ordinary-people": jesusOrdinaryPeopleScene,
  "sermon-on-the-mount": sermonOnTheMountScene,
  "the-miracles": theMiraclesScene,
  "the-disciples": theDisciplesScene,
  "peters-confession": petersConfessionScene,
  "theos-intervention": theosInterventionScene,
  "triumphal-entry": triumphalEntryScene,
  "empty-tomb": emptyTombScene,
  "resurrection-appearances": resurrectionAppearancesScene,
};

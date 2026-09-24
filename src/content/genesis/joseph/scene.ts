import { SceneDefinition } from "../../../narrative/types";

/**
 * Section 4 Verbatim Example Scene — Joseph: The Pit
 */
export const josephThePit: SceneDefinition = {
  id: "genesis-joseph-pit",
  focus: "shared",
  pov: "third",
  emotion: { attachment: 0.85, grief: 0.3, overwhelm: 0.4 },
  environment: { id: "wilderness-daylight", fallback2D: "wilderness-daylight-2d" },
  audio: { track: "joseph", ambient: "pit-wind" },
  echoTags: ["siblings", "jealousy", "comparison"],
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nakita ni Theo kung paano tumingin ang mga kapatid ni Joseph sa kanya, yung tingin na hindi mo agad mapapansin kung hindi mo alam ang hahanapin — parang ilang tao nang nagtitiis, tapos isang araw, kasi lang, hindi na kaya.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Alam na ni Theo ang kwento. Kasi paulit-ulit niya itong nabasa, nung bata pa siya, nung nag-aaral pa lang siya kung paano magtiwala nang wala pa siyang alam sa buong kwento.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "pero mali pala siya. alam ang kwento at nandito, dalawang magkaibang bagay pala talaga.",
    },
    {
      type: "immersion",
      pov: "second",
      register: "literary",
      text: "Naririnig mo ang boses ni Joseph bago mo pa siya makita, kasi tinatago ka ng mga puno, at gusto mo sanang tumakbo papunta, gusto mong sabihing tigilan nila, gusto mong gawin yung kaya mong gawin kasi yun naman talaga ang gusto mo — tumulong.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Naramdaman ko yung kamay ko, nanginginig, parang gustong kumilos pero walang lugar na puwedeng puntahan. Alam kong hindi ako dapat nandito. Alam kong hindi ako ang tutulong. Pero alam ko rin — grabe, ang sakit palang panoorin lang.",
    },
    {
      type: "sceneCue",
      cue: "well-descent",
    },
    {
      type: "sensory",
      pov: "first",
      register: "literary",
      text: "Amoy lupa. Amoy takot. Yung ingay ng bato, tumatama sa dingding, tapos — tahimik.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hindi umiyak si Joseph nang malakas. Iyon pa nga ang pinakamasakit panoorin — yung katahimikang pinipilit lang niyang panatilihin.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Ang akala ko, kapag alam mo na ang mangyayari, mas magaan. Hindi pala. Mas mabigat pa nga.",
    },
    {
      type: "transitionCue",
      to: "/experience/genesis/joseph-caravan",
    },
  ],
  transition: { type: "crossfade", to: "/experience/genesis/joseph-caravan" },
};

export const josephCaravan: SceneDefinition = {
  id: "genesis-joseph-caravan",
  focus: "shared",
  pov: "third",
  emotion: { attachment: 0.8, grief: 0.5, trust: 0.6, wonder: 0.4 },
  environment: { id: "wilderness-daylight", fallback2D: "wilderness-daylight-2d" },
  audio: { track: "joseph", ambient: "caravan-bells" },
  narrative: [
    {
      type: "sensory",
      pov: "second",
      register: "literary",
      text: "Ang kalansing ng pilak sa mga kamay ng mga mangangalakal na Ishmaelita — dalawampung piraso, malamig, nag-aagawan sa init ng tanghali.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Hinila si Joseph paakyat mula sa hukay, may tali sa mga kamay niya, punit-punit ang makulay na balabal na iniwan sa tabi ng balon para idampi sa dugo ng kambing.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ibebenta mo yung kadugo mo para sa kaunting barya. tapos uupo ka para kumain ng tinapay na parang walang nangyari.",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nakasunod ako sa likod ng caravan habang lumalayo sila papuntang Ehipto. Takot ako sa pag-iisa, takot akong iwan ng mga mahal ko sa buhay. Pero habang pinapanood ko si Joseph na lumilingon sa huling pagkakataon, may kakaibang binhi ng pag-asa na hindi kayang patayin ng kahit anong piitan...",
    },
    {
      type: "sceneCue",
      cue: "Centuries blur beneath the scorching silt of the Nile delta. Bricks without straw. The cry of an enslaved people.",
    },
    {
      type: "transitionCue",
      to: "/experience/exodus/moses",
    },
  ],
  transition: { type: "crossfade", to: "/experience/exodus/moses" },
};

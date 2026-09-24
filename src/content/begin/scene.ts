import { SceneDefinition } from "../../narrative/types";

export const beginScene: SceneDefinition = {
  id: "begin-ordinary",
  pov: "third",
  focus: "theo",
  emotion: {
    control: 0.85,
    wonder: 0.1,
    fear: 0.25,
    attachment: 0.7,
    trust: 0.2,
  },
  environment: {
    id: "ordinary-bedroom",
    fallback2D: "ordinary-bedroom-2d",
  },
  audio: {
    track: "ordinary",
    ambient: "subtle-room",
  },
  narrative: [
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Nung seventeen si Theo, kapag may hindi siya maintindihan, para sa kanya isa lang itong problemang kailangan pa lang i-map out — tipong kapag may sumakit o kapag biglang tumahimik ang lahat, gagawa siya agad ng spreadsheet, mangangalap ng datos, maghahanap ng anggulo, kasi doon siya sanay, sa paniniwalang ang kaalaman ay proteksyon, at kapag handa ka, safe ka.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Julian",
      register: "literary",
      text: "“Kung nandun ka ba talaga nung nangyari ang lahat,” biglang tanong sa kanya ni Julian sa diner habang iniikot yung yelo sa baso niya, “maniniwala ka pa rin ba? O kaya ka lang naniniwala kasi wala ka naman doon?”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Alam naman ni Theo na biro lang yun o kaya pampagulo lang sa usapan, pero pag-uwi niya, pumasok yung tanong na parang manipis na basag sa salamin — dahan-dahan, kumakalat sa bawat talatang saulo na niya simula nung bata pa siya.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Tapos dumating yung Huwebes sa may beranda ni Sam, yung balitang ililipat ang trabaho ng tatay nito tatlong probinsya ang layo, at bago pa man makatapos si Sam magsalita, nag-umpisa na agad ang utak ni Theo: transit routes, housing petitions, budget calculations para lang gawan ng paraan.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Sam",
      register: "literary",
      text: "“Theo, tama na,” mahinang sabi ni Sam, halos basag na yung dulo ng boses niya. “Hindi mo kailangang iligtas ang lahat. Baka kailangan ko lang may makinig.”",
    },
    {
      type: "narrative",
      pov: "third",
      register: "casual",
      text: "ang sakit pala nung ganun. yung akala mong tumutulong ka na, pero ang totoo, sarili mo lang palang takot ang inaayos mo.",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pagdating ng gabi, nakita ni Lydia ang dami ng bukas na tabs sa laptop niya, umiling lang ito habang nagtitimpla ng tsa.",
    },
    {
      type: "dialogue",
      pov: "third",
      speaker: "Lydia",
      register: "literary",
      text: "“Inakala mo lang kasing ang pagtulong ay palaging pag-aayos,” sabi nito. “Hindi mo pwedeng i-solve ang lungkot ng ibang tao na parang sirang code.”",
    },
    {
      type: "internal",
      pov: "first",
      register: "literary",
      text: "Nung gabing yun, hindi ako makapag-research o makapagdasal para lang mawala yung bigat sa dibdib ko. For the first time, lumabas yung tunay kong tanong: Ano ba talagang ibig sabihin ng magtiwala sa 'Yo kapag wala na akong kayang ayusin?",
    },
    {
      type: "narrative",
      pov: "third",
      register: "literary",
      text: "Pagsikat ng araw, kailangan niya ng lugar kung saan mas matanda pa ang hangin kaysa sa sarili niyang mga katanungan — naglagay siya ng tubig sa bag, kinuha ang lumang Bibliyang kupas na ang balat, at dahan-dahang nagmaneho paakyat sa bundok...",
    },
    {
      type: "transitionCue",
      to: "/experience/mountain",
    },
  ],
  transition: {
    type: "crossfade",
    to: "/experience/mountain",
  },
};

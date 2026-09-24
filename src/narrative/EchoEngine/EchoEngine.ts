/**
 * KAIROS — EchoEngine
 * Phase 6 Architecture: Theo's Human Circle & Emotional Echoes
 *
 * Echoes point outward at Theo's real life (loved ones), contrasting with
 * MemoryEngine which points inward at prior Biblical scenes.
 *
 * RULE (Section VIII & Section 5):
 * Emotional echoes. Not literal reincarnations.
 * Echoes NEVER render as literal named callouts ("this reminds him of Daniel").
 * When fired, they subtly bias the EmotionalState output and optionally allow
 * an unnamed internal line gesturing at the feeling without naming the person.
 */

import { CastEcho, CastMember, EmotionalState } from "../types";
import { useEchoStore, CANONICAL_CAST_ECHOES, THEO_CAST_MEMBERS } from "./echoStore";

export const danielEcho = CANONICAL_CAST_ECHOES[0];
export const liaEcho = CANONICAL_CAST_ECHOES[1];
export const maraEcho = CANONICAL_CAST_ECHOES[2];
export const lucaEcho = CANONICAL_CAST_ECHOES[3];
export const adrianEcho = CANONICAL_CAST_ECHOES[4];

export class EchoEngine {
  /**
   * Commit a newly registered echo to the Echo store
   */
  public static recordCastEcho(echo: CastEcho): void {
    useEchoStore.getState().addCastEcho(echo);
  }

  /**
   * Retrieve all registered cast echoes
   */
  public static getAllEchoes(): CastEcho[] {
    return useEchoStore.getState().castEchoes;
  }

  /**
   * Retrieve all cast members
   */
  public static getCastMembers(): CastMember[] {
    return THEO_CAST_MEMBERS;
  }

  /**
   * Retrieve specific cast member by ID
   */
  public static getCastMember(id: string): CastMember | undefined {
    return THEO_CAST_MEMBERS.find((m) => m.id === id);
  }

  /**
   * Find echoes matching trigger tags, sorted descending by weight.
   * Matches outward to Theo's real circle of people.
   */
  public static findByTags(tags: string[]): CastEcho[] {
    if (!tags || tags.length === 0) return [];
    const all = this.getAllEchoes();
    const querySet = new Set(tags.map((t) => t.toLowerCase()));

    const matching = all.filter((echo) =>
      echo.triggerTags.some((tag) => querySet.has(tag.toLowerCase()))
    );

    return matching.sort((a, b) => b.weight - a.weight);
  }

  /**
   * Subtle emotional state bias applied when an echo resonates.
   * Modulates Theo's emotional register without crude text callouts.
   */
  public static getEmotionalBias(castMemberId: string): Partial<EmotionalState> {
    switch (castMemberId) {
      case "daniel":
        // Father: need to prove / slight control spike, slight drop in ease
        return { control: 0.05, trust: -0.03 };
      case "mara":
        // Mother: care without performance / attachment rise, fear dampening
        return { attachment: 0.06, fear: -0.04 };
      case "lia":
        // Sister: deflates intellectual seriousness / reduces control, nudges wonder
        return { control: -0.05, wonder: 0.04 };
      case "luca":
        // Music friend: quiet sensory companionship / reduces overwhelm, increases attachment
        return { attachment: 0.05, overwhelm: -0.05 };
      case "adrian":
        // Mentor: intellectual humility / deflates need to win, nudges trust
        return { control: -0.06, trust: 0.05 };
      default:
        return {};
    }
  }

  /**
   * Optional unnamed internal gesture for an echo beat.
   * NEVER names the person or uses phrases like "reminds me of X".
   */
  public static getUnnamedEchoReflection(castMemberId: string): string {
    switch (castMemberId) {
      case "daniel":
        return "May tinig sa likod ng isip ko, hindi galing dito, galing sa ibang lugar, ibang panahon — yung klase ng tinig na hindi mo kailangang unawain, kailangan mo lang marinig.";
      case "mara":
        return "Isang pananahimik na nakakakita nang hindi nagtatanong. Yung uri ng tingin na hindi humihingi ng paliwanag bago mag-alok ng ligtas na puwang.";
      case "lia":
        return "Biglang gumagaan ang hangin sa isang kakaibang paraan — parang may pumitik sa sarili mong kabigatan para ipaalalang hindi mo hawak ang mundo.";
      case "luca":
        return "Isang matagal na katahimikan sa pagitan ng dalawang humihinga. Walang kailangang punan, walang kailangang ayusin. Naroon lang.";
      case "adrian":
        return "May marahang panggigigil sa kalooban ko: ang pakiramdam kapag may taong tumangging ipanalo mo ang argumento dahil alam niyang hindi iyon ang kailangan mo.";
      default:
        return "Isang kakaibang pamilyar na kaba at pag-asa sa likod ng aking dibdib.";
    }
  }

  /**
   * Evaluates scene echoTags and fires matching echo exactly once per scene.
   */
  public static evaluateSceneEchoes(
    sceneId: string,
    echoTags?: string[]
  ): { echo: CastEcho | null; bias: Partial<EmotionalState> } {
    if (!echoTags || echoTags.length === 0) {
      useEchoStore.getState().setActiveSceneEcho(null);
      return { echo: null, bias: {} };
    }

    const matches = this.findByTags(echoTags);
    if (matches.length === 0) {
      useEchoStore.getState().setActiveSceneEcho(null);
      return { echo: null, bias: {} };
    }

    const primaryEcho = matches[0];
    const store = useEchoStore.getState();

    // Confirm each fires exactly once per scene, not on every line
    if (!store.hasSceneFiredEcho(sceneId, primaryEcho.id)) {
      store.recordFiredEcho({
        sceneId,
        echoId: primaryEcho.id,
        castMemberId: primaryEcho.castMemberId,
        timestamp: Date.now(),
      });
    }

    store.setActiveSceneEcho(primaryEcho);
    const bias = this.getEmotionalBias(primaryEcho.castMemberId);

    return { echo: primaryEcho, bias };
  }
}

/**
 * KAIROS — POVEngine
 * Psychological point-of-view orchestration.
 * Modulates typographic rhythm, spatial column density, and atmospheric pressure
 * without exposing mechanical mode badges or literal labels.
 */

import { POV, EmotionalState } from "../types";

export interface POVStylingConfig {
  containerMaxWidth: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  textColor: string;
  accentBorderColor: string;
  ambientGlow: string;
  pacingDelayMultiplier: number;
}

export class POVEngine {
  /**
   * Compute subtle perceptual styling cues based on current POV and internal emotional pressure
   */
  public static getStyling(pov: POV, emotion?: Partial<EmotionalState>): POVStylingConfig {
    const overwhelm = emotion?.overwhelm ?? 0;
    const wonder = emotion?.wonder ?? 0;

    switch (pov) {
      case "third":
        return {
          containerMaxWidth: "max-w-2xl",
          fontSize: "text-lg md:text-xl",
          lineHeight: "leading-relaxed",
          letterSpacing: "tracking-normal",
          textColor: "text-[#dcd8ce]",
          accentBorderColor: "border-stone-800",
          ambientGlow: wonder > 0.6 ? "rgba(201, 154, 94, 0.08)" : "transparent",
          pacingDelayMultiplier: 1.0,
        };

      case "second":
        return {
          containerMaxWidth: "max-w-xl",
          fontSize: "text-lg md:text-[1.35rem]",
          lineHeight: "leading-snug md:leading-normal",
          letterSpacing: "tracking-tight",
          textColor: "text-[#ede9df]",
          accentBorderColor: "border-[#8c6e43]/40",
          ambientGlow: "rgba(201, 154, 94, 0.14)",
          pacingDelayMultiplier: 0.85, // Rhythm tightens
        };

      case "first":
        return {
          containerMaxWidth: "max-w-lg",
          fontSize: "text-xl md:text-2xl",
          lineHeight: "leading-snug",
          letterSpacing: overwhelm > 0.5 ? "tracking-tighter" : "tracking-normal",
          textColor: "text-[#faf7ee]",
          accentBorderColor: "border-[#c99a5e]/70",
          ambientGlow: "rgba(201, 154, 94, 0.22)",
          pacingDelayMultiplier: 0.7, // Urgent internal cadence
        };
    }
  }

  /**
   * Rhythmic pause duration for sentence beats (in seconds for GSAP timeline)
   */
  public static getCadenceDuration(pov: POV, textLength: number): number {
    const base = Math.max(1.8, Math.min(textLength * 0.045, 4.5));
    if (pov === "second") return base * 0.88;
    if (pov === "first") return base * 0.75;
    return base;
  }
}

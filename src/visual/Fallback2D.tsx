import React from "react";
import { useSettingsStore } from "../state/settingsStore";

interface Fallback2DProps {
  environmentId: string;
  edenShiftProgress?: number; // 0 (warm golden) -> 1 (bleached slate)
  redSeaIntensity?: number;
  redSeaReleased?: boolean;
}

export const Fallback2D: React.FC<Fallback2DProps> = ({
  environmentId,
  edenShiftProgress = 0,
  redSeaIntensity = 0.5,
  redSeaReleased = false,
}) => {
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);

  // Dynamic color interpolation for Eden in 2D fallback
  const edenWarm = `rgba(201, 154, 94, ${0.28 * (1 - edenShiftProgress)})`;
  const edenCold = `rgba(130, 150, 170, ${0.25 * edenShiftProgress})`;

  const isRedSea = environmentId.includes("red-sea") || environmentId.includes("water");
  const isSinai = environmentId.includes("sinai");
  const isWilderness = environmentId.includes("wilderness") || environmentId.includes("haran") || environmentId.includes("jabbok") || environmentId.includes("nile") || environmentId.includes("horeb");
  const isFlood = environmentId.includes("flood");
  const isJerusalemFall = environmentId.includes("jerusalem-fall") || environmentId.includes("ruins");
  const isTemple = environmentId.includes("temple") || environmentId.includes("shekinah");
  const isPalaceNight = environmentId.includes("palace-night");
  const isSilence = environmentId.includes("silence") || environmentId.includes("twilight");

  // Phase 4 Environments
  const isGalilee = environmentId.includes("galilee") || environmentId.includes("jordan") || environmentId.includes("mount-beatitudes");
  const isGethsemane = environmentId.includes("gethsemane") || environmentId.includes("olive-grove");
  const isCourtyardFire = environmentId.includes("courtyard") || environmentId.includes("firelight");
  const isCrucifixion = environmentId.includes("calvary") || environmentId.includes("crucifixion") || environmentId.includes("golgotha");
  const isDawnGarden = environmentId.includes("empty-tomb") || environmentId.includes("dawn-garden");
  const isCharcoalFire = environmentId.includes("charcoal-fire") || environmentId.includes("resurrection-shore");

  // Phase 5 Environments (Expansion, Revelation, New Creation)
  const isUpperRoom = environmentId.includes("upper-room");
  const isEarlyChurch = environmentId.includes("early-church");
  const isStephen = environmentId.includes("stephen");
  const isDamascus = environmentId.includes("damascus");
  const isRevelation = environmentId.includes("patmos") || environmentId.includes("revelation");
  const isNewCreation = environmentId.includes("new-creation");

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden transition-all duration-1000">
      {/* Creation 2D */}
      {(environmentId.includes("creation") || environmentId.includes("void")) && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d273a] via-[#0b0e14] to-[#050608]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(201,154,94,0.18)_0%,_transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(65,110,180,0.15)_0%,_transparent_60%)]" />
          {/* Subtle static stardust SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <filter id="dust">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -4" />
            </filter>
            <rect width="100%" height="100%" filter="url(#dust)" fill="#c99a5e" />
          </svg>
        </div>
      )}

      {/* Eden 2D */}
      {environmentId.includes("eden") && (
        <div className="absolute inset-0 transition-colors duration-1000">
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle at 60% 30%, ${edenWarm}, transparent 70%),
                           radial-gradient(circle at 40% 70%, ${edenCold}, transparent 65%),
                           linear-gradient(180deg, #131b14 0%, #0c100d 100%)`,
            }}
          />
          {/* Subtle botanical leaves silhouette watermark */}
          <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-[#344d32]/10 blur-3xl" />
          <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-[#c99a5e]/10 blur-3xl" />
        </div>
      )}

      {/* Cain and Abel 2D (Field at Dusk) */}
      {(environmentId.includes("field") || environmentId.includes("cain")) && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b1518] via-[#241716] to-[#0f0b0c]" />
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_rgba(180,60,35,0.22)_0%,_transparent_75%)]" />
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#8c462e]/10 blur-3xl" />
        </div>
      )}

      {/* Mountain 2D */}
      {(environmentId.includes("mountain") || environmentId.includes("ridge")) && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#161a20] via-[#101317] to-[#090b0e]" />
          <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(160,180,205,0.12)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#06080a] to-transparent" />
        </div>
      )}

      {/* Ordinary life / Bedroom 2D */}
      {(environmentId.includes("ordinary") || environmentId.includes("bedroom")) && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#121318] via-[#0e0f13] to-[#08090b]" />
          <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full bg-[#c99a5e]/5 blur-3xl" />
        </div>
      )}

      {/* Red Sea 2D with escalate-then-release */}
      {isRedSea && (
        <div className="absolute inset-0 transition-all duration-1000">
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: redSeaReleased
                ? `linear-gradient(180deg, #0d1a24 0%, #080f16 100%)`
                : `linear-gradient(180deg, #101924 0%, #060a0f 100%)`,
            }}
          />
          {/* Left water wall silhouette */}
          <div
            className="absolute left-0 inset-y-0 w-1/4 transition-all duration-500"
            style={{
              background: redSeaReleased
                ? `linear-gradient(90deg, rgba(25, 65, 95, 0.45), transparent)`
                : `linear-gradient(90deg, rgba(15, 35, 60, ${0.5 + redSeaIntensity * 0.4}), transparent)`,
              transform: redSeaReleased ? "scaleX(0.85)" : `scaleX(${1 + redSeaIntensity * 0.4})`,
            }}
          />
          {/* Right water wall silhouette */}
          <div
            className="absolute right-0 inset-y-0 w-1/4 transition-all duration-500"
            style={{
              background: redSeaReleased
                ? `linear-gradient(270deg, rgba(25, 65, 95, 0.45), transparent)`
                : `linear-gradient(270deg, rgba(15, 35, 60, ${0.5 + redSeaIntensity * 0.4}), transparent)`,
              transform: redSeaReleased ? "scaleX(0.85)" : `scaleX(${1 + redSeaIntensity * 0.4})`,
            }}
          />
          {/* Release stillness glow */}
          {redSeaReleased && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(110,180,220,0.15)_0%,_transparent_75%)] animate-pulse" />
          )}
        </div>
      )}

      {/* Sinai 2D */}
      {isSinai && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#221315] via-[#161012] to-[#0d090a]" />
          <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(220,80,45,0.22)_0%,_transparent_70%)]" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-[#d9532f]/10 blur-3xl" />
        </div>
      )}

      {/* Wilderness / Patriarch Desert 2D */}
      {isWilderness && !isRedSea && !isSinai && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1815] via-[#14110e] to-[#0c0a09]" />
          <div className="absolute top-1/4 inset-x-0 h-64 bg-[radial-gradient(ellipse_at_center,_rgba(201,154,94,0.14)_0%,_transparent_70%)]" />
        </div>
      )}

      {/* Flood 2D */}
      {isFlood && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1722] via-[#090d14] to-[#05070a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(60,95,140,0.2)_0%,_transparent_70%)]" />
        </div>
      )}

      {/* Jerusalem Fall 2D — Collapse Two (Hollow ash, deep grief, restrained devastation) */}
      {isJerusalemFall && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#121010] via-[#0b090a] to-[#050405]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(140,50,30,0.12)_0%,_transparent_75%)]" />
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-[radial-gradient(ellipse_at_bottom,_rgba(70,60,60,0.2)_0%,_transparent_80%)]" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#1f191a]/40 blur-3xl" />
        </div>
      )}

      {/* Temple Glory 2D (Incense, golden reverent glow) */}
      {isTemple && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1710] via-[#100e0a] to-[#080705]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(201,154,94,0.25)_0%,_transparent_65%)]" />
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#d4af37]/10 blur-3xl" />
        </div>
      )}

      {/* Palace Night 2D (David & Bathsheba — cold moonlight on terrace) */}
      {isPalaceNight && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1218] via-[#090c10] to-[#050709]" />
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#3d4d65]/15 blur-3xl" />
        </div>
      )}

      {/* The Long Silence 2D (400 silent years twilight) */}
      {isSilence && !isJerusalemFall && !isCrucifixion && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#11131a] via-[#0b0d12] to-[#060709]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,_rgba(100,120,150,0.08)_0%,_transparent_70%)]" />
        </div>
      )}

      {/* Galilee / Jordan (Ordinary warm unadorned daylight) */}
      {isGalilee && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#15171b] via-[#101216] to-[#0a0c0e]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(215,180,130,0.12)_0%,_transparent_65%)]" />
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#0e1014] to-transparent" />
        </div>
      )}

      {/* Gethsemane (Solitary heavy night among ancient olive roots) */}
      {isGethsemane && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d12] via-[#07080b] to-[#040406]" />
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#1c221e]/30 blur-3xl" />
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_rgba(20,25,30,0.25)_0%,_transparent_80%)]" />
        </div>
      )}

      {/* Courtyard Firelight (Peter's Denial - chilling shadows and brazier glow) */}
      {isCourtyardFire && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#110f10] via-[#0b090a] to-[#060506]" />
          <div className="absolute bottom-10 right-1/3 w-72 h-72 rounded-full bg-[#d05c28]/12 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_75%,_rgba(180,70,30,0.15)_0%,_transparent_55%)]" />
        </div>
      )}

      {/* Crucifixion — Collapse Three (Total visual restraint, reactions only, severe darkened noon) */}
      {isCrucifixion && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#07080a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(35,38,45,0.25)_0%,_transparent_80%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060709] via-[#050608] to-[#030405]" />
        </div>
      )}

      {/* Dawn Garden (Empty Tomb - cool blue morning with first tender light) */}
      {isDawnGarden && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f141c] via-[#0a0d14] to-[#06080c]" />
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#8aa8cf]/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(230,210,170,0.1)_0%,_transparent_60%)]" />
        </div>
      )}

      {/* Charcoal Fire / Shore (Restoration - warm embers on morning beach) */}
      {isCharcoalFire && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#13171e] via-[#0d1015] to-[#08090d]" />
          <div className="absolute bottom-12 left-1/3 w-80 h-80 rounded-full bg-[#c98348]/14 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_70%,_rgba(180,120,60,0.12)_0%,_transparent_55%)]" />
        </div>
      )}

      {/* Upper Room (Pentecost - warm breath of the Spirit, golden tongues of fire) */}
      {isUpperRoom && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b1411] via-[#120e0d] to-[#0a0707]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#d06828]/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(230,140,50,0.12)_0%,_transparent_65%)]" />
        </div>
      )}

      {/* Early Church (Bread breaking, warm domestic courtyard, community) */}
      {isEarlyChurch && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#16171a] via-[#101114] to-[#0b0c0e]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#c99a5e]/12 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,_rgba(190,140,80,0.1)_0%,_transparent_60%)]" />
        </div>
      )}

      {/* Stephen (City gate dust meeting open heaven radiance) */}
      {isStephen && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#151722] via-[#0f1118] to-[#0a0b10]" />
          <div className="absolute top-0 inset-x-0 h-2/3 bg-[radial-gradient(ellipse_at_top,_rgba(210,230,255,0.18)_0%,_transparent_70%)]" />
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#1b1414]/40 to-transparent" />
        </div>
      )}

      {/* Damascus (Road blinding light resolving into humble dust) */}
      {isDamascus && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1c17] via-[#13120f] to-[#0a0a08]" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#fff4cc]/15 blur-3xl" />
        </div>
      )}

      {/* Patmos / Revelation (Ocean cliff, cosmic unsearchable scale) */}
      {isRevelation && !isNewCreation && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#111422] via-[#090b14] to-[#05060b]" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#637dbf]/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,_rgba(140,110,210,0.1)_0%,_transparent_65%)]" />
        </div>
      )}

      {/* New Creation / Final Vision (Expansion toward quiet peace, no spectacle, room to breathe) */}
      {isNewCreation && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1d26] via-[#12141c] to-[#0b0c12]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(225,215,190,0.15)_0%,_transparent_75%)]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#9bc2e6]/10 blur-3xl" />
        </div>
      )}

      {/* Atmospheric paper grain texture */}
      <div className="absolute inset-0 bg-grain opacity-25" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_45%,_rgba(12,13,16,0.85)_100%)]" />
    </div>
  );
};

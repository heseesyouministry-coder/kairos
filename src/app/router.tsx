import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingExperience } from "../experience/LandingExperience";
import { OrdinaryLifeExperience } from "../experience/OrdinaryLifeExperience";
import { MountainExperience } from "../experience/MountainExperience";
import { CreationExperience } from "../experience/CreationExperience";
import { EdenExperience } from "../experience/EdenExperience";
import { CainAbelExperience } from "../experience/CainAbelExperience";
import { GenesisFloodExperience } from "../experience/GenesisFloodExperience";
import { GenesisBabelExperience } from "../experience/GenesisBabelExperience";
import { GenesisAbrahamExperience } from "../experience/GenesisAbrahamExperience";
import { GenesisJacobExperience } from "../experience/GenesisJacobExperience";
import { GenesisJosephExperience } from "../experience/GenesisJosephExperience";
import { ExodusMosesExperience } from "../experience/ExodusMosesExperience";
import { ExodusPlaguesExperience } from "../experience/ExodusPlaguesExperience";
import { ExodusRedSeaExperience } from "../experience/ExodusRedSeaExperience";
import { ExodusSinaiExperience } from "../experience/ExodusSinaiExperience";
import { ExodusWildernessExperience } from "../experience/ExodusWildernessExperience";
import { KingdomExperience } from "../experience/KingdomExperience";
import { ExileExperience } from "../experience/ExileExperience";
import { RestorationExperience } from "../experience/RestorationExperience";
import { GospelExperience } from "../experience/GospelExperience";
import { CrossExperience } from "../experience/CrossExperience";
import { ActsExperience } from "../experience/ActsExperience";
import { RevelationExperience } from "../experience/RevelationExperience";
import { AwakeningExperience } from "../experience/AwakeningExperience";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingExperience />} />
      <Route path="/begin" element={<OrdinaryLifeExperience />} />
      <Route path="/experience/mountain" element={<MountainExperience />} />

      {/* Genesis Arc */}
      <Route path="/experience/genesis/creation" element={<CreationExperience />} />
      <Route path="/experience/genesis/eden" element={<EdenExperience />} />
      <Route path="/experience/genesis/cain-and-abel" element={<CainAbelExperience />} />
      <Route path="/experience/genesis/flood" element={<GenesisFloodExperience />} />
      <Route path="/experience/genesis/babel" element={<GenesisBabelExperience />} />
      <Route path="/experience/genesis/abraham" element={<GenesisAbrahamExperience />} />
      <Route path="/experience/genesis/jacob" element={<GenesisJacobExperience />} />
      <Route path="/experience/genesis/joseph" element={<GenesisJosephExperience />} />

      {/* Exodus Arc */}
      <Route path="/experience/exodus/moses" element={<ExodusMosesExperience />} />
      <Route path="/experience/exodus/plagues" element={<ExodusPlaguesExperience />} />
      <Route path="/experience/exodus/red-sea" element={<ExodusRedSeaExperience />} />
      <Route path="/experience/exodus/sinai" element={<ExodusSinaiExperience />} />
      <Route path="/experience/exodus/wilderness" element={<ExodusWildernessExperience />} />

      {/* Kingdom Arc (Phase 3) */}
      <Route path="/experience/kingdom/:sceneSlug" element={<KingdomExperience />} />
      <Route path="/experience/kingdom" element={<Navigate to="/experience/kingdom/joshua-jericho" replace />} />

      {/* Exile Arc (Phase 3 — carries Collapse Two) */}
      <Route path="/experience/exile/:sceneSlug" element={<ExileExperience />} />
      <Route path="/experience/exile" element={<Navigate to="/experience/exile/jeremiah" replace />} />

      {/* Restoration Arc (Phase 3 — bridge to Phase 4) */}
      <Route path="/experience/restoration/:sceneSlug" element={<RestorationExperience />} />
      <Route path="/experience/restoration" element={<Navigate to="/experience/restoration/return" replace />} />

      {/* Gospel Arc (Phase 4 — Jesus, ordinary people, miracles, disciples) */}
      <Route path="/experience/gospels/:sceneSlug" element={<GospelExperience />} />
      <Route path="/experience/gospels" element={<Navigate to="/experience/gospels/first-sight" replace />} />

      {/* Passion & Cross Arc (Phase 4 — Gethsemane, Arrest, Denial, Trial, Crucifixion / Collapse Three) */}
      <Route path="/experience/cross/:sceneSlug" element={<CrossExperience />} />
      <Route path="/experience/cross" element={<Navigate to="/experience/cross/gethsemane" replace />} />

      {/* Acts Arc (Phase 5 — Pentecost, Early Church, Stephen, Paul) */}
      <Route path="/experience/acts/:sceneSlug" element={<ActsExperience />} />
      <Route path="/experience/acts" element={<Navigate to="/experience/acts/pentecost" replace />} />

      {/* Revelation Arc (Phase 5 — Patmos, Theo Tries to Understand, Final Vision) */}
      <Route path="/experience/revelation/:sceneSlug" element={<RevelationExperience />} />
      <Route path="/experience/revelation" element={<Navigate to="/experience/revelation/begins" replace />} />

      {/* The Full Culmination / Awakening (Phase 5 Full Sequence) */}
      <Route path="/experience/awakening/full" element={<AwakeningExperience />} />
      <Route path="/experience/awakening" element={<AwakeningExperience />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

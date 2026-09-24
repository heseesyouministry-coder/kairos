import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useProgressStore } from "../state/progressStore";
import { AudioManager } from "../audio/AudioManager";
import { ArrowRight, Compass, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

export const LandingExperience: React.FC = () => {
  const navigate = useNavigate();
  const storedMemories = useProgressStore((s) => s.storedMemories);

  useEffect(() => {
    AudioManager.playTrack("ordinary", "subtle-room");
  }, []);

  const handleBegin = () => {
    navigate("/begin");
  };

  const chapters = [
    {
      index: "01",
      title: "The Friction of Fixing",
      desc: "Theo, Julian's question, and the silence on Sam's porch.",
      route: "/begin",
      focus: "Ordinary Life",
    },
    {
      index: "02",
      title: "The High Limestone",
      desc: "Wind, worn leather pages, and the boundary dissolving into stone.",
      route: "/experience/mountain",
      focus: "The Transition",
    },
    {
      index: "03",
      title: "The Divided Light",
      desc: "Darkness, the primal detonation, and uncontainable scale.",
      route: "/experience/genesis/creation",
      focus: "Genesis 1",
    },
    {
      index: "04",
      title: "The Orchard Choice",
      desc: "Damp soil, innocent laughter, and the bleaching of the sun.",
      route: "/experience/genesis/eden",
      focus: "Genesis 2–3",
    },
    {
      index: "05",
      title: "The Field of Blood",
      desc: "Collapse One: The POV engine proof. 3rd → 2nd → 1st person witness.",
      route: "/experience/genesis/cain-and-abel",
      focus: "Genesis 4",
    },
    {
      index: "06",
      title: "Fall of Jerusalem",
      desc: "Collapse Two: Destruction of the temple, ash, and structural grief.",
      route: "/experience/exile/fall-of-jerusalem",
      focus: "586 BC",
    },
    {
      index: "07",
      title: "The Messiah & The Gospels",
      desc: "Phase 4: Ordinary Galilean dust, no announcement rendering, loving before suffering.",
      route: "/experience/gospels/first-sight",
      focus: "The Incarnation",
    },
    {
      index: "08",
      title: "Theo's Intervention",
      desc: "The biggest mistake: Knowledge without power to change human will.",
      route: "/experience/gospels/theos-intervention",
      focus: "The Hinge Scene",
    },
    {
      index: "09",
      title: "Peter's Denial & The Cross",
      desc: "Collapse Three: Sound inverts into silence; total visual restraint; highest memory weight (0.99).",
      route: "/experience/cross/crucifixion",
      focus: "Calvary",
    },
    {
      index: "10",
      title: "The Empty Tomb & Restoration",
      desc: "The morning garden; failure doesn't permanently define a person.",
      route: "/experience/gospels/empty-tomb",
      focus: "Resurrection",
    },
    {
      index: "11",
      title: "The Expanding Church",
      desc: "Phase 5: Pentecost, messy community, Stephen's grief + acceptance, Paul's conversion.",
      route: "/experience/acts/pentecost",
      focus: "Acts",
    },
    {
      index: "12",
      title: "The Mystery of Revelation",
      desc: "Phase 5: Patmos, failure of human decoding, the unsearchable new creation.",
      route: "/experience/revelation/begins",
      focus: "Patmos",
    },
    {
      index: "13",
      title: "The Full Wake-Up",
      desc: "The mountain at 8:47 PM. Two hours elapsed. Sam's message. 'I'm here.'",
      route: "/experience/awakening/full",
      focus: "Resolution",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] pt-24 pb-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden">
      {/* Background atmospheric gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,154,94,0.08)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#1b2234]/15 blur-3xl pointer-events-none" />

      {/* Main Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mt-12 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171922] border border-[#262836] text-[11px] font-sans uppercase tracking-[0.2em] text-[#c99a5e] mb-6"
        >
          <Sparkles className="w-3 h-3" />
          <span>Phase 1 Proof of Architecture</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-display tracking-[0.18em] text-white text-balance font-normal"
        >
          KAIROS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl font-serif text-[#d0cbc2] font-light max-w-2xl mx-auto leading-relaxed text-balance"
        >
          A seventeen-year-old falls asleep on a mountain reading his Bible and experiences history as if he is living inside it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleBegin}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#c99a5e] hover:bg-[#d8a86a] text-black font-sans font-medium text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-[#c99a5e]/20 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Begin the Experience</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <Link
            to="/experience/genesis/cain-and-abel"
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#151720] hover:bg-[#1f2230] border border-[#2b2e40] text-xs font-sans uppercase tracking-widest text-[#cfcac0] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-[#c99a5e]" />
            <span>POV Engine Test Scene</span>
          </Link>
        </motion.div>

        {storedMemories.length > 0 && (
          <div className="mt-8 text-xs font-mono text-[#c99a5e]/80">
            ★ {storedMemories.length} crystallized memory preserved in LocalStorage
          </div>
        )}
      </div>

      {/* Chapter Grid */}
      <div className="relative z-10 max-w-5xl mx-auto mt-20 md:mt-28 w-full">
        <div className="text-center mb-8">
          <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-stone-500">
            Phase 1 Narrative Arc
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((ch, i) => (
            <motion.div
              key={ch.index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              onClick={() => navigate(ch.route)}
              className="group p-5 rounded-xl bg-[#13151c]/70 hover:bg-[#1a1d28] border border-[#222533] hover:border-[#c99a5e]/40 transition-all cursor-pointer flex flex-col justify-between min-h-[170px]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#c99a5e] font-semibold">{ch.index}</span>
                  <span className="text-stone-500 uppercase text-[10px] tracking-wider">{ch.focus}</span>
                </div>
                <h3 className="text-base font-serif font-medium text-white group-hover:text-[#c99a5e] transition-colors">
                  {ch.title}
                </h3>
                <p className="mt-2 text-xs font-body text-stone-400 leading-relaxed">
                  {ch.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1c1f2b] flex items-center justify-between text-[11px] font-sans text-stone-400 group-hover:text-white">
                <span>Enter Scene</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#c99a5e]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quiet curatorial footer */}
      <footer className="relative z-10 max-w-4xl mx-auto text-center mt-20 text-xs font-sans text-stone-500">
        <p>KAIROS Phase 1 Architecture Engine · Content determines experience</p>
      </footer>
    </div>
  );
};

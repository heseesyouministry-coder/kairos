import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AudioManager } from "../audio/AudioManager";
import { ArrowRight } from "lucide-react";

export const LandingExperience: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AudioManager.playTrack("ordinary", "subtle-room");
  }, []);

  const handleBegin = () => {
    navigate("/begin");
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d10] text-[#e8e6df] pt-28 pb-16 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden">
      {/* Background atmospheric gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,154,94,0.07)_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-[#1b2234]/20 blur-3xl pointer-events-none" />

      {/* Main Hero Section */}
      <div className="relative z-10 max-w-3xl mx-auto text-center my-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl font-display tracking-[0.22em] text-white text-balance font-normal select-none"
        >
          KAIROS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg sm:text-xl md:text-2xl font-serif text-[#d0cbc2] font-light max-w-2xl mx-auto leading-relaxed text-balance"
        >
          A seventeen-year-old falls asleep on a mountain reading his Bible and experiences history as if he is living inside it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <button
            onClick={handleBegin}
            className="px-9 py-4 rounded-full bg-[#c99a5e] hover:bg-[#d8a86a] text-black font-sans font-medium text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-[#c99a5e]/25 active:scale-95 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Begin the Experience</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigatorStore } from "../../state/navigatorStore";
import { Compass } from "lucide-react";

export const FloatingNavigatorTrigger: React.FC = () => {
  const location = useLocation();
  const toggleNavigator = useNavigatorStore((s) => s.toggleNavigator);
  const isOpen = useNavigatorStore((s) => s.isOpen);

  // Strictly hidden on the landing page ("/") per user requirements
  if (location.pathname === "/" || isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 z-30 select-none">
      <button
        onClick={toggleNavigator}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#10121b]/90 hover:bg-[#181b29] border border-[#232738] hover:border-[#c99a5e]/50 text-stone-300 hover:text-white backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer group"
        title="Open Canon & Arc Navigator (⌘K)"
      >
        <div className="w-5 h-5 rounded-full bg-[#c99a5e]/15 flex items-center justify-center text-[#c99a5e] group-hover:rotate-45 transition-transform duration-300">
          <Compass className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-sans font-medium tracking-wide">
          Arcs & Chapters
        </span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#1c2030] text-[10px] font-mono text-stone-400 border border-[#282e44]">
          ⌘K
        </kbd>
      </button>
    </div>
  );
};

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ALL_CHARACTERS, getCharacterById } from "../content/library/charactersData";
import { BiblicalCharacter } from "../narrative/libraryTypes";
import { CharacterModal } from "./CharacterModal";
import { ALL_LIBRARY_STORIES } from "../content/library/storiesData";
import { Users, Sparkles, BookOpen, Search, ArrowLeft } from "lucide-react";

export const CharactersIndexPage: React.FC = () => {
  const { characterId } = useParams<{ characterId?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEra, setSelectedEra] = useState<string>("all");

  const initialChar = characterId ? getCharacterById(characterId) ?? null : null;
  const [activeModalChar, setActiveModalChar] = useState<BiblicalCharacter | null>(initialChar);

  const eras = ["all", "creation", "patriarchs", "exodus", "kingdom", "exile", "gospels", "acts"];

  const filteredCharacters = ALL_CHARACTERS.filter((c) => {
    if (selectedEra !== "all" && c.era !== selectedEra) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.traits.some((t) => t.toLowerCase().includes(q)) ||
        c.arc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-6xl mx-auto text-[#e8e6df]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a24] border border-[#262a3b] text-xs font-mono uppercase tracking-widest text-[#c99a5e] mb-4">
          <Users className="w-3.5 h-3.5" />
          <span>Witnesses of the Narrative</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wide mb-4">
          Biblical Figures
        </h1>
        <p className="text-stone-300 text-sm md:text-base leading-relaxed">
          The 26 historical witnesses encountered throughout KAIROS. Each characterized by their
          biblical arc, key relationships, and scriptural accounts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#12141c] border border-[#212433]">
          {eras.map((era) => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-colors ${
                selectedEra === era
                  ? "bg-[#222636] text-[#c99a5e] font-semibold"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              {era}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search figures or traits..."
            className="w-full pl-8 pr-4 py-2 rounded-xl bg-[#12141c] border border-[#212433] text-xs font-sans text-white placeholder:text-stone-500 focus:outline-none focus:border-[#c99a5e]"
          />
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((char) => {
          const charStories = ALL_LIBRARY_STORIES.filter(
            (s) =>
              s.characterIds.includes(char.id) ||
              char.stories.includes(s.sceneId) ||
              (s.subSceneIds && s.subSceneIds.some((sub) => char.stories.includes(sub)))
          );

          return (
            <div
              key={char.id}
              onClick={() => setActiveModalChar(char)}
              className="p-5 rounded-xl bg-[#13151e] hover:bg-[#181a26] border border-[#222536] hover:border-[#c99a5e]/50 transition-all cursor-pointer shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-2">
                  <span className="text-[#c99a5e]">{char.era} Era</span>
                  <span>{char.scriptureReferences[0]?.book}</span>
                </div>

                <h3 className="text-xl font-display font-semibold text-white group-hover:text-[#c99a5e] transition-colors mb-2">
                  {char.name}
                </h3>

                <p className="text-stone-300 font-serif italic text-xs leading-relaxed line-clamp-3 mb-4">
                  "{char.arc}"
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {char.traits.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#1b1e2a] text-[10px] font-mono text-stone-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#1e2130] flex items-center justify-between text-xs">
                <span className="text-stone-500 font-mono text-[11px]">
                  {charStories.length} {charStories.length === 1 ? "Story" : "Stories"}
                </span>
                <span className="text-[#c99a5e] group-hover:translate-x-0.5 transition-transform font-mono text-[11px]">
                  Profile →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <CharacterModal
        character={activeModalChar}
        onClose={() => setActiveModalChar(null)}
        onSelectCharacter={(c) => setActiveModalChar(c)}
      />
    </div>
  );
};

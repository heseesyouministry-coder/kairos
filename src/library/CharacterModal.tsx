import React from "react";
import { BiblicalCharacter } from "../narrative/libraryTypes";
import { getCharacterById } from "../content/library/charactersData";
import { ALL_LIBRARY_STORIES } from "../content/library/storiesData";
import { Link } from "react-router-dom";
import { X, BookOpen, Users, Sparkles, ScrollText } from "lucide-react";

interface CharacterModalProps {
  character: BiblicalCharacter | null;
  onClose: () => void;
  onSelectCharacter?: (char: BiblicalCharacter) => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
  onSelectCharacter,
}) => {
  if (!character) return null;

  // Find stories where this character appears
  const characterStories = ALL_LIBRARY_STORIES.filter(
    (s) =>
      s.characterIds.includes(character.id) ||
      character.stories.includes(s.sceneId) ||
      (s.subSceneIds && s.subSceneIds.some((sub) => character.stories.includes(sub)))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-xl bg-[#12141c] border border-[#272a3b] shadow-2xl p-6 md:p-8 text-[#e8e6df]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-stone-400 hover:text-white hover:bg-[#1d202d] transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5 text-[11px] font-mono uppercase tracking-widest text-[#c99a5e]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biblical Entity • {character.era} Era</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white tracking-wide">
            {character.name}
          </h2>
        </div>

        {/* Arc */}
        <div className="p-4 rounded-lg bg-[#181a24] border border-[#232636] mb-6">
          <div className="text-[11px] font-mono uppercase text-stone-400 tracking-wider mb-1 flex items-center gap-1.5">
            <ScrollText className="w-3.5 h-3.5 text-[#c99a5e]" />
            <span>Character Arc</span>
          </div>
          <p className="text-sm md:text-base font-serif italic text-stone-200 leading-relaxed">
            "{character.arc}"
          </p>
        </div>

        {/* Traits */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
            Traits & Markers
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {character.traits.map((trait) => (
              <span
                key={trait}
                className="px-2.5 py-1 rounded bg-[#1e2230] border border-[#2b3044] text-xs font-mono text-[#c99a5e]"
              >
                #{trait}
              </span>
            ))}
          </div>
        </div>

        {/* Relationships */}
        {character.relationships.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#c99a5e]" />
              <span>Key Relationships</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {character.relationships.map((rel) => {
                const targetChar = getCharacterById(rel.characterId);
                return (
                  <button
                    key={rel.characterId + rel.relation}
                    onClick={() => targetChar && onSelectCharacter?.(targetChar)}
                    className="flex items-center justify-between p-2.5 rounded bg-[#181a24] hover:bg-[#202332] border border-[#232636] transition-colors text-left group"
                  >
                    <div>
                      <div className="text-xs font-medium text-white group-hover:text-[#c99a5e] transition-colors">
                        {targetChar ? targetChar.name : rel.characterId}
                      </div>
                      <div className="text-[10px] text-stone-400 capitalize">{rel.relation}</div>
                    </div>
                    <span className="text-stone-500 group-hover:text-stone-300 text-xs">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Scripture References */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#c99a5e]" />
            <span>Scripture References</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {character.scriptureReferences.map((ref, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded bg-[#181a24] border border-[#232636] text-xs font-serif text-stone-300"
              >
                {ref.book} {ref.chapters}
              </span>
            ))}
          </div>
        </div>

        {/* Appearances in the Library */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
            Appearances in the Library ({characterStories.length})
          </h3>
          {characterStories.length > 0 ? (
            <div className="space-y-2">
              {characterStories.map((story) => (
                <Link
                  key={story.storyId}
                  to={`/books/${story.bookId}/${story.storyId}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded bg-[#181a24] hover:bg-[#202332] border border-[#232636] hover:border-[#c99a5e]/50 transition-all group"
                >
                  <div>
                    <div className="text-xs font-medium text-white group-hover:text-[#c99a5e] transition-colors">
                      {story.title}
                    </div>
                    <div className="text-[10px] text-stone-400 font-serif">
                      {story.scriptureReference}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#c99a5e] uppercase">Read →</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-500 italic">
              Appears in unbuilt canon segments ({character.stories.join(", ")}).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

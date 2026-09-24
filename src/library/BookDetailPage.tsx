import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBookById, ALL_BOOKS } from "../content/library/booksData";
import { getStoriesForBook } from "../content/library/storiesData";
import { getCharacterById, ALL_CHARACTERS } from "../content/library/charactersData";
import { BiblicalCharacter } from "../narrative/libraryTypes";
import { CharacterModal } from "./CharacterModal";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Compass,
  Sparkles,
  ArrowRight,
  Library,
  Users,
  ShieldAlert,
} from "lucide-react";

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<BiblicalCharacter | null>(null);

  const book = bookId ? getBookById(bookId) : undefined;

  if (!book) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto text-center text-[#e8e6df]">
        <h1 className="text-2xl font-display mb-4">Book Not Found</h1>
        <p className="text-stone-400 mb-6">The requested book does not exist in the 66-book canon.</p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#181a24] border border-[#262a3b] text-xs font-mono uppercase text-[#c99a5e]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Library Shelf</span>
        </Link>
      </div>
    );
  }

  const stories = getStoriesForBook(book.id);

  // Neighbor books in the 66-book canon
  const currentIndex = ALL_BOOKS.findIndex((b) => b.id === book.id);
  const prevBook = currentIndex > 0 ? ALL_BOOKS[currentIndex - 1] : null;
  const nextBook = currentIndex < ALL_BOOKS.length - 1 ? ALL_BOOKS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 md:px-12 max-w-5xl mx-auto text-[#e8e6df]">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-8">
        <Link to="/books" className="hover:text-white flex items-center gap-1 transition-colors">
          <Library className="w-3.5 h-3.5" />
          <span>Library</span>
        </Link>
        <span>/</span>
        <Link
          to={`/books/${book.testament}`}
          className="hover:text-white capitalize transition-colors"
        >
          {book.testament === "old" ? "Old Testament" : "New Testament"}
        </Link>
        <span>/</span>
        <span className="text-[#c99a5e]">{book.name}</span>
      </div>

      {/* Book Hero Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#12141c] border border-[#242838] mb-10 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-[#1e2232] text-[#c99a5e] font-semibold">
              Book #{book.order} of 66
            </span>
            <span className="px-2.5 py-1 rounded bg-[#181a24] text-stone-300">
              {book.category}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#181a24] text-stone-400 uppercase">
              {book.testament === "old" ? "Old Testament" : "New Testament"}
            </span>
          </div>

          {book.hasSceneContent ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Transcribed & Available</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-[11px] font-mono text-stone-400">
              <span>Awaiting Canon Build</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 tracking-wide">
          {book.name}
        </h1>
        <p className="text-stone-400 text-sm font-sans">
          {book.hasSceneContent
            ? `${stories.length} story ${stories.length === 1 ? "unit" : "units"} available in standalone Biblical Library Mode.`
            : "Part of the 66-book biblical canon. Preserved in structure, awaiting transcription."}
        </p>
      </div>

      {/* Conditional Rendering: Built vs Honest Unbuilt State */}
      {book.hasSceneContent ? (
        /* Built Content: Story units list */
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between border-b border-[#212433] pb-3">
            <h2 className="text-sm font-mono uppercase tracking-widest text-stone-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c99a5e]" />
              <span>Available Stories ({stories.length})</span>
            </h2>
            <span className="text-xs text-stone-500 font-sans">
              Click any story to read in Library Mode
            </span>
          </div>

          <div className="space-y-4">
            {stories.map((story) => (
              <div
                key={story.storyId}
                className="p-5 md:p-6 rounded-xl bg-[#141620] border border-[#242838] hover:border-[#c99a5e]/50 transition-all shadow-md group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    {/* Scripture Reference badge */}
                    <div className="text-xs font-mono text-[#c99a5e] mb-1">
                      {story.scriptureReference}
                    </div>

                    {/* Story Title */}
                    <h3 className="text-xl font-display font-semibold text-white group-hover:text-[#c99a5e] transition-colors">
                      {story.title}
                    </h3>

                    {/* Summary */}
                    {story.summary && (
                      <p className="text-stone-300 font-serif italic text-sm mt-1 mb-3">
                        {story.summary}
                      </p>
                    )}

                    {/* Character chips */}
                    {story.characterIds.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[10px] font-mono uppercase text-stone-500 mr-1 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>Figures:</span>
                        </span>
                        {story.characterIds.map((charId) => {
                          const char = getCharacterById(charId);
                          return (
                            <button
                              key={charId}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (char) setSelectedCharacter(char);
                              }}
                              className="px-2 py-0.5 rounded bg-[#1e2230] hover:bg-[#282d40] border border-[#2c3246] text-[11px] font-mono text-stone-300 hover:text-white transition-colors"
                            >
                              {char ? char.name : charId}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Dual Action Buttons: Library Mode vs Journey Mode */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-2 md:pt-0">
                    <Link
                      to={`/books/${book.id}/${story.storyId}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#c99a5e] hover:bg-[#d8a86a] text-black text-xs font-sans font-medium uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      <span>Read in Library Mode</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {story.hasJourneyVersion && story.journeyPath && (
                      <Link
                        to={story.journeyPath}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#181a24] hover:bg-[#202332] border border-[#272a3b] hover:border-stone-500 text-stone-300 hover:text-white text-xs font-sans transition-all"
                        title="Experience this through Theo's linear journey"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#c99a5e]" />
                        <span className="hidden sm:inline">Theo's Journey</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Honest Unbuilt State (Section 5 Requirement — No generated placeholder Bible summaries) */
        <div className="p-8 md:p-12 rounded-2xl bg-[#12141c] border border-[#212433] text-center max-w-2xl mx-auto my-12">
          <div className="w-12 h-12 rounded-full bg-[#181a24] border border-[#272a3b] flex items-center justify-center mx-auto mb-5 text-stone-400">
            <BookOpen className="w-6 h-6" />
          </div>

          <h2 className="text-xl md:text-2xl font-display font-semibold text-white mb-3">
            Awaiting Canon Transcription
          </h2>

          <p className="text-stone-300 font-body text-base leading-relaxed mb-6">
            The book of <strong>{book.name}</strong> has not yet been transcribed into the
            KAIROS experience.
          </p>

          <div className="p-4 rounded-xl bg-[#171922] border border-[#222533] text-xs text-stone-400 font-sans leading-relaxed text-left mb-6">
            The Biblical Library maintains its full 66-book canon structure honestly. In accordance
            with our design constitution, we do not inject automated encyclopedia summaries. When
            scenes for this book are crafted, its stories and character cross-references will appear
            here.
          </div>

          <Link
            to="/books"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#181a24] hover:bg-[#202332] border border-[#292d3f] text-xs font-mono uppercase text-[#c99a5e] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Browse Available Books</span>
          </Link>
        </div>
      )}

      {/* Neighbor navigation: Prev / Next book */}
      <div className="flex items-center justify-between border-t border-[#212433] pt-6 mt-12 text-xs font-mono">
        {prevBook ? (
          <Link
            to={`/books/${prevBook.id}`}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              #{prevBook.order} {prevBook.name}
            </span>
          </Link>
        ) : (
          <div />
        )}

        <Link to="/books" className="text-stone-500 hover:text-stone-300 uppercase tracking-widest">
          Shelf Index
        </Link>

        {nextBook ? (
          <Link
            to={`/books/${nextBook.id}`}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
          >
            <span>
              #{nextBook.order} {nextBook.name}
            </span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Character Profile Modal */}
      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        onSelectCharacter={(char) => setSelectedCharacter(char)}
      />
    </div>
  );
};

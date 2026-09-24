import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  useNavigatorStore,
  NavigatorViewMode,
} from "../../state/navigatorStore";
import {
  CANON_ERAS,
  ALL_CHRONICLE_CHAPTERS,
  ChronicleChapter,
  ChronicleEra,
  CHAPTER_COUNT,
  ERA_COUNT,
} from "../../content/navigator/canonChroniclesData";
import { ALL_BOOKS } from "../../content/library/booksData";
import { ALL_CHARACTERS } from "../../content/library/charactersData";
import { useProgressStore } from "../../state/progressStore";
import {
  Compass,
  Search,
  X,
  BookOpen,
  Layers,
  ArrowRight,
  CheckCircle2,
  Users,
  Filter,
  Sparkles,
  BookMarked,
  ScrollText,
} from "lucide-react";

export const ChroniclesNavigatorModal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isOpen,
    closeNavigator,
    selectedEraId,
    setSelectedEraId,
    selectedTestament,
    setSelectedTestament,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
  } = useNavigatorStore();

  const completedScenes = useProgressStore((s) => s.completedScenes);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useNavigatorStore.getState().toggleNavigator();
      } else if (e.key === "Escape" && isOpen) {
        closeNavigator();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeNavigator]);

  // Filtered Chapters
  const filteredChapters = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ALL_CHRONICLE_CHAPTERS.filter((chap) => {
      // Era filter
      if (selectedEraId !== "all") {
        const parentEra = CANON_ERAS.find((era) =>
          era.arcs.some((arc) => arc.chapters.some((c) => c.id === chap.id))
        );
        if (parentEra?.id !== selectedEraId) return false;
      }

      // Testament filter
      if (selectedTestament === "old" && chap.testament !== "old") return false;
      if (selectedTestament === "new" && chap.testament !== "new") return false;

      // Query filter
      if (query) {
        const matchesTitle = chap.title.toLowerCase().includes(query);
        const matchesNative = chap.nativeTitle?.toLowerCase().includes(query) ?? false;
        const matchesScripture = chap.scripture.toLowerCase().includes(query);
        const matchesSummary = chap.summary.toLowerCase().includes(query);
        const matchesBook = chap.bookName?.toLowerCase().includes(query) ?? false;
        const matchesWitness = chap.keyWitnesses?.some((w) => w.toLowerCase().includes(query)) ?? false;
        return matchesTitle || matchesNative || matchesScripture || matchesSummary || matchesBook || matchesWitness;
      }

      return true;
    });
  }, [searchQuery, selectedEraId, selectedTestament]);

  // Filtered Books (for Books view mode)
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ALL_BOOKS.filter((b) => {
      if (selectedTestament !== "all" && b.testament !== selectedTestament) return false;
      if (!query) return true;
      return (
        b.name.toLowerCase().includes(query) ||
        (b.category ? b.category.toLowerCase().includes(query) : false)
      );
    });
  }, [searchQuery, selectedTestament]);

  // Filtered Characters (for Figures view mode)
  const filteredFigures = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ALL_CHARACTERS.filter((c) => {
      if (!query) return true;
      return (
        c.name.toLowerCase().includes(query) ||
        c.era.toLowerCase().includes(query) ||
        c.traits.some((t) => t.toLowerCase().includes(query)) ||
        c.arc.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const handleJump = (route: string) => {
    closeNavigator();
    navigate(route);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeNavigator}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#0c0d12] border border-[#232738] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#e8e6df]"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 border-b border-[#1c1f2e] bg-[#10121a]/95 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c99a5e]/15 border border-[#c99a5e]/30 flex items-center justify-center text-[#c99a5e]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-wide">
                      Canon & Arc Navigator
                    </h2>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#1d2130] text-[#c99a5e] border border-[#2b3147]">
                      {CHAPTER_COUNT} Chapters Across {ERA_COUNT} Eras
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    Jump directly to any historical era, narrative arc, chapter, book, or witness.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={closeNavigator}
                  className="p-2 rounded-xl bg-[#161822] hover:bg-[#1f2230] border border-[#272b3d] text-stone-400 hover:text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapters, scriptures (e.g. Genesis 1, John 11), characters, themes, or eras..."
                className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[#141622] border border-[#25293d] text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#c99a5e] focus:border-[#c99a5e]/50 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white font-mono px-2 py-0.5 rounded bg-[#1e2233]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode & Testament Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Primary View Modes */}
              <div className="flex items-center p-1 rounded-xl bg-[#131520] border border-[#202334] text-xs font-sans">
                <button
                  onClick={() => setViewMode("timeline")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === "timeline"
                      ? "bg-[#222638] text-white font-medium shadow-sm"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  <ScrollText className="w-3.5 h-3.5" />
                  <span>Chapters & Arcs ({CHAPTER_COUNT})</span>
                </button>

                <button
                  onClick={() => setViewMode("books")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === "books"
                      ? "bg-[#222638] text-white font-medium shadow-sm"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>66 Books Shelf</span>
                </button>

                <button
                  onClick={() => setViewMode("figures")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === "figures"
                      ? "bg-[#222638] text-white font-medium shadow-sm"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>26 Figures</span>
                </button>
              </div>

              {/* Testament Chips */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                {(["all", "old", "new"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTestament(t)}
                    className={`px-2.5 py-1 rounded-lg border uppercase transition-colors ${
                      selectedTestament === t
                        ? "bg-[#c99a5e]/20 border-[#c99a5e]/60 text-[#c99a5e] font-semibold"
                        : "bg-[#141620] border-[#222638] text-stone-400 hover:text-white"
                    }`}
                  >
                    {t === "all" ? "All Canon" : t === "old" ? "Old Testament" : "New Testament"}
                  </button>
                ))}
              </div>
            </div>

            {/* Era Filter Carousel (when in timeline view) */}
            {viewMode === "timeline" && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-thumb-stone-800">
                <button
                  onClick={() => setSelectedEraId("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-sans whitespace-nowrap border transition-all ${
                    selectedEraId === "all"
                      ? "bg-[#c99a5e] text-black font-semibold border-[#c99a5e]"
                      : "bg-[#141622] text-stone-400 hover:text-white border-[#222638]"
                  }`}
                >
                  All Eras
                </button>
                {CANON_ERAS.map((era) => {
                  const isSelected = selectedEraId === era.id;
                  return (
                    <button
                      key={era.id}
                      onClick={() => setSelectedEraId(era.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-sans whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-[#25293d] text-white font-medium border-[#c99a5e]/60 shadow-sm"
                          : "bg-[#141622] text-stone-400 hover:text-white border-[#222638]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c99a5e]" />
                      <span>{era.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Content Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* VIEW MODE 1: CHAPTERS & ARCS */}
            {viewMode === "timeline" && (
              <div className="space-y-8">
                {CANON_ERAS.map((era) => {
                  // If era is filtered out
                  if (selectedEraId !== "all" && era.id !== selectedEraId) return null;

                  // Find chapters in this era that pass current filters
                  const eraChapters = era.arcs.flatMap((arc) =>
                    arc.chapters.filter((chap) =>
                      filteredChapters.some((fc) => fc.id === chap.id)
                    )
                  );

                  if (eraChapters.length === 0) return null;

                  return (
                    <div
                      key={era.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#10121b] border border-[#202436] space-y-4"
                    >
                      {/* Era Banner */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1c2030]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${era.badgeColor}`}
                            >
                              {era.timeframe}
                            </span>
                            <span className="text-xs font-mono uppercase text-stone-400">
                              {era.arcs.length} Arc{era.arcs.length > 1 ? "s" : ""} · {eraChapters.length} Chapter{eraChapters.length > 1 ? "s" : ""}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-display font-semibold text-white mt-1">
                            {era.name}
                          </h3>
                          <p className="text-xs text-stone-400 font-sans mt-0.5">
                            {era.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Arcs in this Era */}
                      {era.arcs.map((arc) => {
                        const arcChapters = arc.chapters.filter((chap) =>
                          filteredChapters.some((fc) => fc.id === chap.id)
                        );
                        if (arcChapters.length === 0) return null;

                        return (
                          <div key={arc.id} className="space-y-3">
                            <div className="flex items-center justify-between text-xs pt-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: arc.color }}
                                />
                                <span className="font-semibold text-stone-200 tracking-wide font-sans">
                                  {arc.name}
                                </span>
                                {arc.nativeName && (
                                  <span className="text-stone-400 italic font-serif hidden sm:inline">
                                    — {arc.nativeName}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-mono text-[#c99a5e] bg-[#191b26] px-2 py-0.5 rounded border border-[#292e42]">
                                {arc.bookRange}
                              </span>
                            </div>

                            {/* Chapters Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {arcChapters.map((chap) => {
                                const isCurrent = location.pathname === chap.route;
                                const isCompleted = completedScenes.includes(chap.id) || completedScenes.includes(chap.slug);

                                return (
                                  <div
                                    key={chap.id}
                                    onClick={() => handleJump(chap.route)}
                                    className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                                      isCurrent
                                        ? "bg-[#1f2436] border-[#c99a5e]/70 shadow-lg"
                                        : "bg-[#131520] hover:bg-[#181a28] border-[#222638] hover:border-[#343b56]"
                                    }`}
                                  >
                                    <div>
                                      {/* Top Chapter Metadata */}
                                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1.5">
                                        <span className="text-[#c99a5e] font-semibold">
                                          #{chap.order.toString().padStart(2, "0")}
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-[#1a1d2b] border border-[#2a2f44] text-[10px]">
                                          {chap.scripture}
                                        </span>
                                      </div>

                                      {/* Title */}
                                      <h4 className="text-sm font-semibold text-white group-hover:text-[#c99a5e] transition-colors leading-snug">
                                        {chap.title}
                                      </h4>

                                      {chap.nativeTitle && (
                                        <div className="text-[11px] font-serif italic text-stone-400 mt-0.5">
                                          {chap.nativeTitle}
                                        </div>
                                      )}

                                      {/* Summary */}
                                      <p className="text-xs text-stone-300 font-sans mt-1.5 leading-relaxed line-clamp-2">
                                        {chap.summary}
                                      </p>
                                    </div>

                                    {/* Bottom Action Footer */}
                                    <div className="mt-3 pt-2.5 border-t border-[#1d2132] flex items-center justify-between text-xs">
                                      <div className="flex items-center gap-2">
                                        {chap.pov && (
                                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#181a26] text-stone-400">
                                            {chap.pov}
                                          </span>
                                        )}
                                        {isCompleted && (
                                          <span className="flex items-center gap-1 text-[10px] font-sans text-emerald-400">
                                            <CheckCircle2 className="w-3 h-3" />
                                            <span>Visited</span>
                                          </span>
                                        )}
                                      </div>

                                      <div className="flex items-center gap-1 text-[11px] font-medium text-[#c99a5e] group-hover:translate-x-0.5 transition-transform">
                                        <span>Jump Here</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                {filteredChapters.length === 0 && (
                  <div className="text-center py-16 px-4">
                    <Compass className="w-10 h-10 text-stone-600 mx-auto mb-3" />
                    <h4 className="text-base font-semibold text-white">No chapters match your criteria</h4>
                    <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                      Try adjusting your search query, selecting "All Eras", or clearing the testament filter.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* VIEW MODE 2: 66 BOOKS SHELF */}
            {viewMode === "books" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#1c2030]">
                  <div>
                    <h3 className="text-base font-display font-semibold text-white">
                      The Biblical Library (66 Books)
                    </h3>
                    <p className="text-xs text-stone-400">
                      Select any canonical book to read or browse its historical narrative accounts.
                    </p>
                  </div>
                  <button
                    onClick={() => handleJump("/books")}
                    className="text-xs font-sans text-[#c99a5e] hover:underline flex items-center gap-1"
                  >
                    <span>View Shelf Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => handleJump(`/books/${book.id}`)}
                      className="p-3 rounded-xl bg-[#131520] hover:bg-[#191b29] border border-[#222638] hover:border-[#38405d] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1">
                        <span>#{book.order}</span>
                        <span className="uppercase">{book.testament}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#c99a5e] transition-colors">
                        {book.name}
                      </h4>
                      <div className="text-[11px] text-stone-400 font-sans mt-0.5">
                        {book.category}
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#1e2233] flex items-center justify-between text-[10px]">
                        <span className="text-stone-400">
                          {book.hasSceneContent ? "Transcribed" : "Summary"}
                        </span>
                        <span className="text-[#c99a5e] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Open →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW MODE 3: BIBLICAL FIGURES */}
            {viewMode === "figures" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#1c2030]">
                  <div>
                    <h3 className="text-base font-display font-semibold text-white">
                      The 26 Biblical Witnesses
                    </h3>
                    <p className="text-xs text-stone-400">
                      Explore historical witnesses encountered throughout the narrative of scripture.
                    </p>
                  </div>
                  <button
                    onClick={() => handleJump("/characters")}
                    className="text-xs font-sans text-[#c99a5e] hover:underline flex items-center gap-1"
                  >
                    <span>View Figures Index</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredFigures.map((char) => (
                    <div
                      key={char.id}
                      onClick={() => handleJump(`/characters/${char.id}`)}
                      className="p-3.5 rounded-xl bg-[#131520] hover:bg-[#191b29] border border-[#222638] hover:border-[#38405d] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1">
                        <span className="capitalize text-[#c99a5e]">{char.era}</span>
                        <span>{char.stories.length} Stories</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#c99a5e] transition-colors">
                        {char.name}
                      </h4>
                      <p className="text-xs text-stone-300 font-sans mt-1 line-clamp-2">
                        {char.arc}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-[#1e2233] flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-1 overflow-hidden">
                          {char.traits.slice(0, 2).map((trait) => (
                            <span
                              key={trait}
                              className="px-1.5 py-0.5 rounded bg-[#181a26] text-stone-400"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                        <span className="text-[#c99a5e] group-hover:translate-x-0.5 transition-transform shrink-0">
                          Profile →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3.5 sm:px-6 border-t border-[#1c1f2e] bg-[#0f1118] flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400 font-sans">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">
                Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-[#1a1d2b] border border-[#2a2e42] font-mono text-stone-300">⌘K</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-[#1a1d2b] border border-[#2a2e42] font-mono text-stone-300">Ctrl+K</kbd> to open anytime
              </span>
              <span>
                Showing <strong className="text-white">{filteredChapters.length}</strong> of {CHAPTER_COUNT} chapters
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleJump("/chronicles")}
                className="text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#c99a5e]" />
                <span>Open Full Atlas</span>
              </button>
              <button
                onClick={closeNavigator}
                className="px-3 py-1 rounded-lg bg-[#1a1c26] hover:bg-[#232738] text-stone-300 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

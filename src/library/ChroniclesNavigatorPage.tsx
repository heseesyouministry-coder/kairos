import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CANON_ERAS,
  ALL_CHRONICLE_CHAPTERS,
  CHAPTER_COUNT,
  ERA_COUNT,
  ARC_COUNT,
} from "../content/navigator/canonChroniclesData";
import { useProgressStore } from "../state/progressStore";
import {
  Compass,
  Search,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Users,
  ScrollText,
  Filter,
  Sparkles,
  BookMarked,
} from "lucide-react";

export const ChroniclesNavigatorPage: React.FC = () => {
  const navigate = useNavigate();
  const completedScenes = useProgressStore((s) => s.completedScenes);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEraId, setSelectedEraId] = useState<string>("all");
  const [selectedTestament, setSelectedTestament] = useState<"all" | "old" | "new">("all");

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

  const visitedCount = useMemo(() => {
    return completedScenes.length;
  }, [completedScenes]);

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-[#e8e6df]">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181a24] border border-[#262a3b] text-xs font-mono uppercase tracking-widest text-[#c99a5e] mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>The Historical Atlas of KAIROS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-wide mb-4">
          Chronicles & Arc Navigator
        </h1>
        <p className="text-stone-300 font-body text-sm sm:text-base md:text-lg leading-relaxed mb-6">
          Explore and jump directly anywhere across the biblical narrative — from the first divided light of Genesis to the mountain awakening.
        </p>

        {/* Global Statistics Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-400">
          <span className="px-3 py-1 rounded-lg bg-[#12141c] border border-[#212433]">
            <strong className="text-white">{ERA_COUNT}</strong> Eras
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#12141c] border border-[#212433]">
            <strong className="text-white">{ARC_COUNT}</strong> Canonical Arcs
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#12141c] border border-[#212433]">
            <strong className="text-white">{CHAPTER_COUNT}</strong> Narrative Chapters
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#12141c] border border-[#212433] text-[#c99a5e]">
            <strong className="text-white">{visitedCount}</strong> Scenes Visited
          </span>
        </div>
      </div>

      {/* Quick Links Row to Library and Figures */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        <Link
          to="/books"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141622] hover:bg-[#1a1d2e] border border-[#262a3d] text-xs font-sans text-stone-300 hover:text-white transition-all shadow-sm group"
        >
          <BookMarked className="w-4 h-4 text-[#c99a5e]" />
          <span>Browse 66 Books Shelf</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/characters"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141622] hover:bg-[#1a1d2e] border border-[#262a3d] text-xs font-sans text-stone-300 hover:text-white transition-all shadow-sm group"
        >
          <Users className="w-4 h-4 text-[#c99a5e]" />
          <span>Browse 26 Biblical Witnesses</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Control Panel: Search & Testament */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#10121b] border border-[#212536] mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:max-w-xl">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters, scriptures (e.g. Genesis 1, John 11), characters, or themes..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-[#141622] border border-[#25293d] text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#c99a5e] focus:border-[#c99a5e]/50 font-sans"
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

          {/* Testament Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono w-full md:w-auto justify-end">
            {(["all", "old", "new"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTestament(t)}
                className={`px-3 py-1.5 rounded-xl border uppercase transition-colors ${
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

        {/* Era Horizontal Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-thin scrollbar-thumb-stone-800">
          <button
            onClick={() => setSelectedEraId("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-sans whitespace-nowrap border transition-all ${
              selectedEraId === "all"
                ? "bg-[#c99a5e] text-black font-semibold border-[#c99a5e]"
                : "bg-[#141622] text-stone-400 hover:text-white border-[#222638]"
            }`}
          >
            All {ERA_COUNT} Eras
          </button>
          {CANON_ERAS.map((era) => {
            const isSelected = selectedEraId === era.id;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedEraId(era.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-sans whitespace-nowrap border transition-all flex items-center gap-1.5 ${
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
      </div>

      {/* Main Eras and Arcs Listing */}
      <div className="space-y-10">
        {CANON_ERAS.map((era) => {
          if (selectedEraId !== "all" && era.id !== selectedEraId) return null;

          const eraChapters = era.arcs.flatMap((arc) =>
            arc.chapters.filter((chap) =>
              filteredChapters.some((fc) => fc.id === chap.id)
            )
          );

          if (eraChapters.length === 0) return null;

          return (
            <section
              key={era.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#10121b] border border-[#202436] shadow-xl space-y-6"
            >
              {/* Era Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-[#1c2030]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded border ${era.badgeColor}`}
                    >
                      {era.timeframe}
                    </span>
                    <span className="text-xs font-mono uppercase text-stone-400">
                      {eraChapters.length} Chapter{eraChapters.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
                    {era.name}
                  </h2>
                  <p className="text-sm text-stone-300 font-sans mt-1 max-w-2xl">
                    {era.tagline}
                  </p>
                </div>
              </div>

              {/* Arcs in this Era */}
              <div className="space-y-6">
                {era.arcs.map((arc) => {
                  const arcChapters = arc.chapters.filter((chap) =>
                    filteredChapters.some((fc) => fc.id === chap.id)
                  );
                  if (arcChapters.length === 0) return null;

                  return (
                    <div key={arc.id} className="space-y-4">
                      {/* Arc Title Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: arc.color }}
                          />
                          <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide font-sans">
                            {arc.name}
                          </h3>
                          {arc.nativeName && (
                            <span className="text-stone-400 italic font-serif text-sm hidden md:inline">
                              — {arc.nativeName}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-[#c99a5e] bg-[#171a26] px-2.5 py-1 rounded-lg border border-[#272c40] self-start sm:self-auto">
                          {arc.bookRange}
                        </span>
                      </div>

                      {/* Chapters Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {arcChapters.map((chap) => {
                          const isCompleted = completedScenes.includes(chap.id) || completedScenes.includes(chap.slug);

                          return (
                            <div
                              key={chap.id}
                              onClick={() => navigate(chap.route)}
                              className="group p-4 rounded-2xl bg-[#141622] hover:bg-[#1a1d2e] border border-[#24283c] hover:border-[#c99a5e]/50 transition-all cursor-pointer flex flex-col justify-between shadow-md"
                            >
                              <div>
                                {/* Header */}
                                <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                                  <span className="text-[#c99a5e] font-semibold">
                                    #{chap.order.toString().padStart(2, "0")}
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-[#1c1f2e] border border-[#2b3046] text-[10px]">
                                    {chap.scripture}
                                  </span>
                                </div>

                                {/* Title */}
                                <h4 className="text-base font-semibold text-white group-hover:text-[#c99a5e] transition-colors leading-snug">
                                  {chap.title}
                                </h4>

                                {chap.nativeTitle && (
                                  <div className="text-xs font-serif italic text-stone-400 mt-0.5">
                                    {chap.nativeTitle}
                                  </div>
                                )}

                                {/* Summary */}
                                <p className="text-xs text-stone-300 font-sans mt-2 leading-relaxed">
                                  {chap.summary}
                                </p>
                              </div>

                              {/* Footer Action */}
                              <div className="mt-4 pt-3 border-t border-[#1e2336] flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  {chap.pov && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#191c2b] text-stone-400">
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

                                <div className="flex items-center gap-1 text-xs font-medium text-[#c99a5e] group-hover:translate-x-1 transition-transform">
                                  <span>Jump to Scene</span>
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
            </section>
          );
        })}

        {filteredChapters.length === 0 && (
          <div className="text-center py-20 px-4 rounded-3xl bg-[#10121b] border border-[#202436]">
            <Compass className="w-12 h-12 text-stone-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">No chapters found</h3>
            <p className="text-sm text-stone-400 mt-1 max-w-sm mx-auto">
              Try modifying your search or resetting filters to browse the entire canon.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedEraId("all");
                setSelectedTestament("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#c99a5e] text-black font-sans text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

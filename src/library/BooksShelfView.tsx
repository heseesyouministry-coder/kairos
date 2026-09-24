import React, { useState, useMemo } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { ALL_BOOKS } from "../content/library/booksData";
import { BookOpen, Sparkles, Filter, Search, Library, Compass } from "lucide-react";

export const BooksShelfView: React.FC = () => {
  const { testament } = useParams<{ testament?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Testament filter: "all" | "old" | "new"
  const isOld = testament === "old" || location.pathname.endsWith("/old");
  const isNew = testament === "new" || location.pathname.endsWith("/new");
  const activeTestament: "all" | "old" | "new" = isOld ? "old" : isNew ? "new" : "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [onlyBuilt, setOnlyBuilt] = useState(false);

  const filteredBooks = useMemo(() => {
    return ALL_BOOKS.filter((book) => {
      // Testament filter
      if (activeTestament !== "all" && book.testament !== activeTestament) {
        return false;
      }
      // Built filter
      if (onlyBuilt && !book.hasSceneContent) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = book.name.toLowerCase().includes(query);
        const matchesCategory = book.category?.toLowerCase().includes(query);
        return matchesName || matchesCategory;
      }
      return true;
    });
  }, [activeTestament, onlyBuilt, searchQuery]);

  const totalBuiltCount = ALL_BOOKS.filter((b) => b.hasSceneContent).length;
  const totalUnbuiltCount = ALL_BOOKS.length - totalBuiltCount;

  const handleTabChange = (tab: "all" | "old" | "new") => {
    if (tab === "all") {
      navigate("/books");
    } else {
      navigate(`/books/${tab}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-[#e8e6df]">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a24] border border-[#262a3b] text-xs font-mono uppercase tracking-widest text-[#c99a5e] mb-4">
          <Library className="w-3.5 h-3.5" />
          <span>The Biblical Canon</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-wide text-white mb-4">
          The Biblical Library
        </h1>
        <p className="text-stone-300 font-body text-base md:text-lg leading-relaxed mb-6">
          A standalone, browsable structure of all sixty-six canonical books. Read the sacred
          narratives on their own scriptural terms, free of Theo's private coping patterns.
        </p>

        {/* Intersection callouts */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141722]/80 border border-[#25293d] text-xs text-stone-300 font-sans">
            <Compass className="w-3.5 h-3.5 text-[#c99a5e]" />
            <span>Explore by eras, arcs & chapters:</span>
            <Link
              to="/chronicles"
              className="text-[#c99a5e] hover:underline font-medium ml-1"
            >
              Open Arc Navigator →
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141722]/80 border border-[#25293d] text-xs text-stone-300 font-sans">
            <span>Or experience the narrative flow:</span>
            <Link
              to="/begin"
              className="text-[#c99a5e] hover:underline font-medium ml-1"
            >
              Enter Theo's Journey →
            </Link>
          </div>
        </div>
      </div>

      {/* Canon Overview Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#12141c] border border-[#212433] mb-8">
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-stone-400">
            Total Canon: <strong className="text-white">66 Books</strong>
          </span>
          <span className="text-stone-500">•</span>
          <span className="text-[#c99a5e] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c99a5e] animate-pulse" />
            <span>{totalBuiltCount} Transcribed</span>
          </span>
          <span className="text-stone-500">•</span>
          <span className="text-stone-400">{totalUnbuiltCount} Complete Summaries</span>
        </div>

        {/* Built Only Toggle */}
        <button
          onClick={() => setOnlyBuilt(!onlyBuilt)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-sans transition-all ${
            onlyBuilt
              ? "bg-[#c99a5e]/20 border-[#c99a5e]/50 text-[#c99a5e]"
              : "bg-[#181a24] border-[#272a3b] text-stone-400 hover:text-white"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>{onlyBuilt ? "Showing Transcribed Only" : "Show Transcribed Only"}</span>
        </button>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Testament Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-[#12141c] border border-[#212433] w-full sm:w-auto">
          <button
            onClick={() => handleTabChange("all")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-sans uppercase tracking-wider transition-all ${
              activeTestament === "all"
                ? "bg-[#202434] text-white font-medium shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
          >
            All Canon (66)
          </button>
          <button
            onClick={() => handleTabChange("old")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-sans uppercase tracking-wider transition-all ${
              activeTestament === "old"
                ? "bg-[#202434] text-white font-medium shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Old Testament (39)
          </button>
          <button
            onClick={() => handleTabChange("new")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-sans uppercase tracking-wider transition-all ${
              activeTestament === "new"
                ? "bg-[#202434] text-white font-medium shadow-sm"
                : "text-stone-400 hover:text-white"
            }`}
          >
            New Testament (27)
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search book or category..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#12141c] border border-[#212433] text-xs font-sans text-white placeholder:text-stone-500 focus:outline-none focus:border-[#c99a5e]/60 transition-colors"
          />
        </div>
      </div>

      {/* Bookshelf Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBooks.map((book) => {
          const isBuilt = book.hasSceneContent;

          return (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className={`group relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-300 min-h-[170px] ${
                isBuilt
                  ? "bg-[#141620] hover:bg-[#1a1d2c] border-[#292d40] hover:border-[#c99a5e]/60 hover:shadow-xl hover:shadow-[#c99a5e]/5"
                  : "bg-[#0e1015]/60 hover:bg-[#12141b] border-[#1b1e2a] hover:border-[#2b3044] opacity-75 hover:opacity-100"
              }`}
            >
              {/* Top Info: Order & Testament */}
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    isBuilt
                      ? "bg-[#222636] text-[#c99a5e] font-semibold"
                      : "bg-[#161822] text-stone-500"
                  }`}
                >
                  #{book.order}
                </span>
                <span className="uppercase text-stone-500 tracking-wider">
                  {book.testament === "old" ? "OT" : "NT"}
                </span>
              </div>

              {/* Center Info: Book Title & Category */}
              <div className="my-auto">
                <h3
                  className={`font-display text-base font-semibold tracking-wide transition-colors ${
                    isBuilt
                      ? "text-white group-hover:text-[#c99a5e]"
                      : "text-stone-400 group-hover:text-stone-200"
                  }`}
                >
                  {book.name}
                </h3>
                <div className="text-[10px] font-sans text-stone-500 mt-1 truncate">
                  {book.category}
                </div>
              </div>

              {/* Bottom State Pill */}
              <div className="mt-3 pt-2.5 border-t border-[#1b1e2a] flex items-center justify-between">
                {isBuilt ? (
                  <>
                    <span className="text-[10px] font-mono text-[#c99a5e] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{book.linkedStoryIds.length} Stories</span>
                    </span>
                    <span className="text-xs text-[#c99a5e] group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </>
                ) : (
                  <span className="text-[10px] font-mono text-stone-500">Awaiting Build</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 bg-[#12141c] rounded-xl border border-[#212433]">
          <BookOpen className="w-8 h-8 text-stone-600 mx-auto mb-3" />
          <p className="text-sm text-stone-400 font-sans">No books match your current filters.</p>
        </div>
      )}
    </div>
  );
};

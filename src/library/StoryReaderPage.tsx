import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBookById } from "../content/library/booksData";
import { getStory, getStoriesForBook } from "../content/library/storiesData";
import { getCharacterById } from "../content/library/charactersData";
import { allScenes } from "../content/allScenes";
import { LibraryEngine } from "../narrative/LibraryEngine/LibraryEngine";
import { SceneDefinition, NarrativeBlock, BiblicalCharacter } from "../narrative/types";
import { CharacterModal } from "./CharacterModal";
import { AudioManager } from "../audio/AudioManager";
import { MusicDirector } from "../audio/worship/MusicDirector";
import { useSettingsStore } from "../state/settingsStore";
import { AudioTrackId, AudioAmbientId } from "../state/audioStore";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Compass,
  Sparkles,
  Users,
  Activity,
  Layers,
  Volume2,
  VolumeX,
} from "lucide-react";

export const StoryReaderPage: React.FC = () => {
  const { bookId, storyId } = useParams<{ bookId: string; storyId: string }>();
  const navigate = useNavigate();

  const [selectedCharacter, setSelectedCharacter] = useState<BiblicalCharacter | null>(null);
  const [activePartIndex, setActivePartIndex] = useState<number>(0);
  const [ambientPlaying, setAmbientPlaying] = useState<boolean>(false);

  const toggleDebugMode = useSettingsStore((s) => s.toggleDebugMode);
  const isDevModeActive =
    typeof window !== "undefined" &&
    (import.meta.env.VITE_ENABLE_DEV_MODE === "true" ||
      new URLSearchParams(window.location.search).get("debug") === "kairos");

  const book = bookId ? getBookById(bookId) : undefined;
  const story = bookId && storyId ? getStory(bookId, storyId) : undefined;

  // Retrieve story scenes
  const sceneIds: string[] = story
    ? story.subSceneIds && story.subSceneIds.length > 0
      ? story.subSceneIds
      : [story.sceneId]
    : [];

  const currentSceneId = sceneIds[activePartIndex] || sceneIds[0];
  const currentScene: SceneDefinition | undefined = currentSceneId
    ? allScenes[currentSceneId]
    : undefined;

  // Apply Library Mode transformation (filters internal monologues and theo cues)
  const libraryBlocks: NarrativeBlock[] = currentScene
    ? LibraryEngine.toLibraryView(currentScene)
    : [];

  // Telemetry stats
  const stats = currentScene ? LibraryEngine.getSceneStats(currentScene) : null;

  // Reset part index when route changes
  useEffect(() => {
    setActivePartIndex(0);
  }, [bookId, storyId]);

  // Optional subtle atmospheric audio & narrative worship score
  useEffect(() => {
    if (currentScene?.id) {
      MusicDirector.onSceneChange(currentScene.id, "third", currentScene.emotion);
    }
    if (currentScene?.audio?.track) {
      AudioManager.playTrack(
        currentScene.audio.track as AudioTrackId,
        currentScene.audio.ambient as AudioAmbientId | undefined
      );
      setAmbientPlaying(true);
    }
  }, [currentScene]);

  if (!book || !story || !currentScene) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto text-center text-[#e8e6df]">
        <h1 className="text-2xl font-display mb-4">Story Not Found</h1>
        <p className="text-stone-400 mb-6">
          The requested story does not exist in this canonical book.
        </p>
        <Link
          to={book ? `/books/${book.id}` : "/books"}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#181a24] border border-[#262a3b] text-xs font-mono uppercase text-[#c99a5e]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Book</span>
        </Link>
      </div>
    );
  }

  // Find neighbor stories in this book
  const bookStories = getStoriesForBook(book.id);
  const currentStoryIndex = bookStories.findIndex((s) => s.storyId === story.storyId);
  const prevStory = currentStoryIndex > 0 ? bookStories[currentStoryIndex - 1] : null;
  const nextStory =
    currentStoryIndex < bookStories.length - 1 ? bookStories[currentStoryIndex + 1] : null;

  return (
    <div className="min-h-screen pt-24 pb-28 px-6 md:px-12 max-w-4xl mx-auto text-[#e8e6df]">
      {/* Top Bar: Breadcrumb + Intersection Link to Journey */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#212433] pb-4 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
          <Link to="/books" className="hover:text-white transition-colors">
            Library
          </Link>
          <span>/</span>
          <Link to={`/books/${book.id}`} className="hover:text-white transition-colors">
            {book.name}
          </Link>
          <span>/</span>
          <span className="text-[#c99a5e] font-medium truncate max-w-[200px]">{story.title}</span>
        </div>

        {/* Intersection Link: Route into Theo's Journey */}
        {story.hasJourneyVersion && story.journeyPath && (
          <Link
            to={story.journeyPath}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1a1d29] hover:bg-[#232738] border border-[#2b3044] hover:border-[#c99a5e]/60 text-xs font-sans text-stone-200 hover:text-[#c99a5e] transition-all shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 text-[#c99a5e]" />
            <span>Experience this through Theo's journey →</span>
          </Link>
        )}
      </div>

      {/* Mode Indicator Banner */}
      <div className="p-4 rounded-xl bg-[#12141c] border border-[#232636] mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-[#191c28] border border-[#292d40] text-[#c99a5e]">
            <BookOpen className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                Library Mode
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1e2232] text-[10px] font-mono text-[#c99a5e]">
                Pure Canon
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-sans mt-0.5">
              Theo's private coping monologues are quieted. Scriptural narrative, dialogue, and
              sensory text rendered as-is.
            </p>
          </div>
        </div>

        {/* Telemetry trigger badge (strictly gated) */}
        {isDevModeActive && stats && (
          <button
            onClick={toggleDebugMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#181a24] hover:bg-[#202330] border border-[#262a3b] text-[11px] font-mono text-stone-300 hover:text-white transition-colors"
            title="Inspect Side-by-Side Telemetry in Debug Mode"
          >
            <Activity className="w-3 h-3 text-[#c99a5e]" />
            <span>
              {stats.libraryBlocksCount} Blocks ({stats.strippedBlocksCount} filtered)
            </span>
          </button>
        )}
      </div>

      {/* Story Header */}
      <header className="mb-10 text-center max-w-2xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-[#c99a5e] mb-2">
          {story.scriptureReference}
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wide mb-4">
          {story.title}
        </h1>

        {/* Characters in this story */}
        {story.characterIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
            <span className="text-[11px] font-mono text-stone-400 mr-1 flex items-center gap-1">
              <Users className="w-3 h-3 text-[#c99a5e]" /> Figures:
            </span>
            {story.characterIds.map((charId) => {
              const char = getCharacterById(charId);
              return (
                <button
                  key={charId}
                  onClick={() => char && setSelectedCharacter(char)}
                  className="px-2.5 py-1 rounded-full bg-[#181a24] hover:bg-[#202434] border border-[#272a3b] hover:border-[#c99a5e]/50 text-xs font-mono text-stone-300 hover:text-white transition-colors"
                >
                  {char ? char.name : charId}
                </button>
              );
            })}
          </div>
        )}

        {/* Multi-part tabs if subscenes exist */}
        {sceneIds.length > 1 && (
          <div className="inline-flex items-center p-1 rounded-lg bg-[#141620] border border-[#222533] mt-6">
            {sceneIds.map((id, idx) => (
              <button
                key={id}
                onClick={() => setActivePartIndex(idx)}
                className={`px-3.5 py-1 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                  activePartIndex === idx
                    ? "bg-[#242838] text-[#c99a5e] font-semibold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Part {idx + 1}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Narrative Reading Area (Filtered via LibraryEngine) */}
      <article className="space-y-8 md:space-y-10 font-body text-base md:text-lg leading-relaxed text-[#dcd7cb] bg-[#11131a]/60 p-6 md:p-12 rounded-2xl border border-[#1f2230] shadow-xl">
        {libraryBlocks.map((block, idx) => {
          return (
            <div key={idx} className="transition-all">
              {renderLibraryBlock(block)}
            </div>
          );
        })}
      </article>

      {/* Part pagination or next story in book */}
      <div className="flex items-center justify-between border-t border-[#212433] pt-8 mt-12 text-xs font-mono">
        {prevStory ? (
          <Link
            to={`/books/${book.id}/${prevStory.storyId}`}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous:</span>
            <span>{prevStory.title}</span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          to={`/books/${book.id}`}
          className="text-stone-500 hover:text-stone-300 uppercase tracking-widest"
        >
          {book.name} Index
        </Link>

        {nextStory ? (
          <Link
            to={`/books/${book.id}/${nextStory.storyId}`}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">Next:</span>
            <span>{nextStory.title}</span>
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

function renderLibraryBlock(block: NarrativeBlock) {
  const isCasual = "register" in block && block.register === "casual";

  switch (block.type) {
    case "narrative":
      return isCasual ? (
        <p className="font-sans text-stone-300 text-sm md:text-base leading-relaxed">
          {block.text}
        </p>
      ) : (
        <p className="font-serif text-[#e4dfd3] leading-relaxed tracking-normal">{block.text}</p>
      );

    case "dialogue":
      return (
        <div className="my-4 pl-4 border-l-2 border-[#c99a5e]/70">
          <div className="text-xs font-mono uppercase tracking-widest text-[#c99a5e] mb-1 font-semibold">
            {block.speaker}
          </div>
          <p className="font-serif italic text-white text-lg md:text-xl leading-snug">
            {block.text}
          </p>
        </div>
      );

    case "sensory":
      return (
        <p className="font-serif italic text-stone-300/90 pl-3 border-l border-stone-700">
          {block.text}
        </p>
      );

    case "immersion":
      return (
        <div className="py-2 text-stone-200 font-serif leading-relaxed">
          <p>{block.text}</p>
        </div>
      );

    case "sceneCue":
      return (
        <div className="my-4 py-2.5 px-4 rounded bg-[#161822] border-l-2 border-[#8c6e43] text-xs font-serif italic text-stone-400">
          {block.cue}
        </div>
      );

    default:
      return null;
  }
}

/**
 * KAIROS / The Living Word — Worship Music Catalog
 * Divided into two interlocked catalogs:
 *  1. THE READING LIBRARY: Mostly instrumental worship (Hillsong Instrumentals,
 *     Selah Sessions, Piano Reflections, Elevation Guided Scripture & Instrumental)
 *     for reading-heavy scenes where lyrics must not compete with text.
 *  2. THE STORY LIBRARY: Vocal worship peaks (Oceans, What a Beautiful Name,
 *     Here Again, Graves Into Gardens, Same God) reserved exclusively for emotional/theological climaxes.
 */

import { WorshipTrack, MusicCue } from "./types";

export const WORSHIP_CATALOG: WorshipTrack[] = [
  // -------------------------------------------------------------
  // THE READING LIBRARY (Instrumental Worship for Narrative Reading)
  // -------------------------------------------------------------
  {
    id: "oceans-selah",
    artist: "Hillsong Instrumentals",
    title: "Oceans (Where Feet May Fail) [Selah Sessions]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/none-reyes/oceans-hillsong-instrumental",
    youtubeId: "1m_sWqJeN8I", // Official Hillsong instrumental
    mode: "reading",
    emotionalTags: ["uncertainty", "trust", "surrender", "water", "wonder"],
    chapterTags: ["mountain", "red-sea", "gospel-peter-water"],
    intensity: 0.35,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "TRUST",
    description: "Gentle Rhodes and ambient pads from Hillsong's Selah Sessions catalog. Uncluttered meditation on trusting God in unknown waters.",
    theologicalContext: "Sits underneath Theo's mountain hesitation and Peter's step onto the water. Establishes the motif of surrender before answers arrive.",
    startAt: 0,
  },
  {
    id: "so-will-i-instrumental",
    artist: "Hillsong Instrumentals",
    title: "So Will I (100 Billion X) [Piano Reflections]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/hillsong-worship/so-will-i-100-billion-x-1",
    youtubeId: "FYvPAGwXg9M",
    mode: "reading",
    emotionalTags: ["wonder", "creation", "vastness", "order", "light"],
    chapterTags: ["genesis-creation", "revelation-new-jerusalem"],
    intensity: 0.4,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "WONDER",
    description: "Quiet solo grand piano tracing the celestial cadence of creation. Allows the universe to breathe open without overwhelming the reader.",
    theologicalContext: "Accompanies Genesis 1 creation and cosmic renewal. Speaks to God speaking galaxies into existence with quiet authority.",
    startAt: 0,
  },
  {
    id: "here-again-instrumental",
    artist: "Elevation Worship",
    title: "Here Again [Instrumental / Scripture Reflection]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/user680226557/here-again-elevation-worship",
    youtubeId: "VbZc_G_o9Qc",
    mode: "reading",
    emotionalTags: ["waiting", "middle", "searching", "stillness", "presence"],
    chapterTags: ["wilderness", "exile-job", "prophets-jeremiah"],
    intensity: 0.3,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "STILL",
    description: "Atmospheric acoustic guitar and warm, sustained ambient pad. Designed for being present in the uncomfortable middle.",
    theologicalContext: "Theo cannot control tomorrow. This music does not push for resolution; it anchors the reader in God's presence 'here in the middle.'",
    startAt: 0,
  },
  {
    id: "what-a-beautiful-name-piano",
    artist: "Hillsong Instrumentals",
    title: "What a Beautiful Name [Piano Reflections]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/hillsong-worship/what-a-beautiful-name-1",
    youtubeId: "cKsm25e4cT0",
    mode: "reading",
    emotionalTags: ["intimacy", "wonder", "reverence", "grace"],
    chapterTags: ["gospel-first-sight", "gospel-parables", "gospel-sermon"],
    intensity: 0.35,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "PRESENCE",
    description: "Contemplative grand piano arrangement. Restrained, measured phrasing that leaves spacious silence between notes.",
    theologicalContext: "Background for Jesus walking among ordinary people. Refuses church spectacle in favor of conversational presence.",
    startAt: 0,
  },
  {
    id: "still-instrumental",
    artist: "Hillsong Instrumentals",
    title: "Still [Selah Sessions]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/richard-ooi/still-hillsong-instrumental",
    youtubeId: "z34Xh14S_Co",
    mode: "reading",
    emotionalTags: ["peace", "calm", "shelter", "rest"],
    chapterTags: ["eden", "ruth", "elisha", "awakening"],
    intensity: 0.25,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "STILL",
    description: "Soft warm nylon strings and gentle ambient textures. Low dynamic range perfectly suited for deep focus and reading.",
    theologicalContext: "The soundscape of Eden and the return to the mountain. 'Be still, and know that I am God.'",
    startAt: 0,
  },
  {
    id: "cornerstone-piano",
    artist: "Hillsong Instrumentals",
    title: "Cornerstone [Piano Reflections]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/chekomusicforchrist/cornerstone-hillsong-piano-instrumental-cover",
    youtubeId: "8v_3Q4Ua-dE",
    mode: "reading",
    emotionalTags: ["covenant", "firm-foundation", "endurance", "hope"],
    chapterTags: ["abraham", "david-covenant", "ezra-nehemiah"],
    intensity: 0.38,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "JOURNEY",
    description: "Solemn, steady acoustic piano chords evoking stones being laid for an enduring altar or city wall.",
    theologicalContext: "Abraham travelling toward a promise he cannot yet see, and Nehemiah rebuilding the broken walls.",
    startAt: 0,
  },
  {
    id: "this-i-believe-prelude",
    artist: "Hillsong Instrumentals",
    title: "This I Believe (The Creed) [Preludes]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/hillsong-worship/this-i-believe-the-creed-live",
    youtubeId: "JbQZ8nE_f9s",
    mode: "reading",
    emotionalTags: ["creed", "resurrection-witness", "apostolic-courage"],
    chapterTags: ["acts-pentecost", "acts-stephen", "acts-paul"],
    intensity: 0.45,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "HOPE",
    description: "Layered strings and delicate piano chords building a steady, resolute foundation of apostolic testimony.",
    theologicalContext: "Accompanies the expansion of the early church. Faith proven through courage and steadfast love.",
    startAt: 0,
  },
  {
    id: "o-come-to-altar-instrumental",
    artist: "Elevation Worship",
    title: "O Come to the Altar [Acoustic Instrumental]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/worshipcenter3/elevation-worship-o-come-to-the-altar-acoustic",
    youtubeId: "OpfsA3qO-jI",
    mode: "reading",
    emotionalTags: ["brokenness", "mercy", "invitation", "repentance"],
    chapterTags: ["david-bathsheba", "peter-denial", "prodigal-son"],
    intensity: 0.3,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "LAMENT",
    description: "Mournful yet compassionate acoustic guitar picking with subtle bowed cello.",
    theologicalContext: "Underscores David's broken psalm and Peter's bitter weeping by the courtyard fire. The invitation of mercy for the broken.",
    startAt: 0,
  },
  {
    id: "goodness-of-god-acoustic",
    artist: "Bethel Music",
    title: "Goodness of God [Acoustic Instrumental]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/bethelmusic/goodness-of-god-1",
    youtubeId: "n0FBb6hnwTo",
    mode: "reading",
    emotionalTags: ["faithfulness", "gratitude", "remembrance", "protection"],
    chapterTags: ["joseph-reunion", "exile-return", "restoration"],
    intensity: 0.35,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "HOPE",
    description: "Warm acoustic fingerstyle guitar with gentle organic rhythm.",
    theologicalContext: "The long arc of Joseph declaring 'God meant it for good' and the exiles weeping with joy over the temple stones.",
    startAt: 0,
  },
  {
    id: "spontaneous-waiting-pad",
    artist: "Upperroom Music",
    title: "Waiting on the Lord [Ambient Instrumental]",
    catalog: "reading",
    soundcloudUrl: "https://soundcloud.com/j-d-music-25513614/peace-ambient-worship",
    youtubeId: "y1m3oK-9z14",
    mode: "reading",
    emotionalTags: ["waiting", "silence", "patience", "night"],
    chapterTags: ["restoration-the-silence", "exile-daniel-lions"],
    intensity: 0.2,
    isVocal: false,
    isInstrumental: true,
    recommendedForReading: true,
    collection: "STILL",
    description: "Sparse ambient drones, slow harmonic shifts, and long delays replicating four centuries of expectant silence.",
    theologicalContext: "The 400 years of silence between Malachi and the Gospels. God is not absent when He is quiet.",
    startAt: 0,
  },

  // -------------------------------------------------------------
  // THE STORY LIBRARY (Selective Vocal Worship for Climax Peaks)
  // -------------------------------------------------------------
  {
    id: "oceans-vocal-climax",
    artist: "Hillsong UNITED",
    title: "Oceans (Where Feet May Fail) [Live]",
    catalog: "story",
    soundcloudUrl: "https://soundcloud.com/hillsongunited/oceans-where-feet-may-fail-7",
    youtubeId: "dy9nwe9_xzw",
    mode: "worship",
    emotionalTags: ["surrender", "faith-boundary", "breakthrough", "trust"],
    chapterTags: ["awakening-decision", "red-sea-crossing"],
    intensity: 0.85,
    isVocal: true,
    isInstrumental: false,
    recommendedForReading: false,
    collection: "TRUST",
    description: "Iconic vocal anthem of stepping onto unknown deep waters. Reserved strictly for major narrative thresholds where Theo surrenders control.",
    theologicalContext: "Plays only when the story earns it: the moment Theo releases his fixing instinct on the mountain or Israel enters the parted sea.",
    startAt: 130, // Bridge swell
  },
  {
    id: "what-a-beautiful-name-vocal",
    artist: "Hillsong Worship",
    title: "What a Beautiful Name [Live Climax]",
    catalog: "story",
    soundcloudUrl: "https://soundcloud.com/hillsong-worship/what-a-beautiful-name-live",
    youtubeId: "nQWFzMvCfLE",
    mode: "worship",
    emotionalTags: ["resurrection", "victory", "exaltation", "glory", "christ"],
    chapterTags: ["cross-resurrection", "revelation-vast"],
    intensity: 0.9,
    isVocal: true,
    isInstrumental: false,
    recommendedForReading: false,
    collection: "WONDER",
    description: "Triumphant theological declaration of Christ conquering the grave. 'Death could not hold You, the veil tore before You.'",
    theologicalContext: "Reserved for the empty tomb and resurrection morning. Emerging after three collapses and total silence.",
    startAt: 180, // 'Death could not hold You' verse
  },
  {
    id: "graves-into-gardens-vocal",
    artist: "Elevation Worship ft. Brandon Lake",
    title: "Graves Into Gardens [Live]",
    catalog: "story",
    soundcloudUrl: "https://soundcloud.com/chris-kyle-jerry/elevation-worship-graves-into-gardens-acoustic-ft-brandon-lake",
    youtubeId: "KwX1f2g5008",
    mode: "worship",
    emotionalTags: ["redemption", "joy-from-mourning", "restoration", "beauty-for-ashes"],
    chapterTags: ["restoration-climax", "revelation-new-jerusalem"],
    intensity: 0.88,
    isVocal: true,
    isInstrumental: false,
    recommendedForReading: false,
    collection: "HOPE",
    description: "Soulful, explosive celebration of resurrection power turning graves into gardens and shame into glory.",
    theologicalContext: "Played strictly AFTER suffering has concluded. The redemptive transformation of Theo's grief into restorative purpose.",
    startAt: 160,
  },
  {
    id: "same-god-vocal",
    artist: "Elevation Worship",
    title: "Same God [Live]",
    catalog: "story",
    soundcloudUrl: "https://soundcloud.com/jorge-villagra-323840318/same-god-feat-jonsal-barrientes-brandon-lake-elevation-worship-128-kbps",
    youtubeId: "xP7P1K3eW_E",
    mode: "worship",
    emotionalTags: ["covenant-continuity", "faithfulness", "god-of-jacob", "biblical-unity"],
    chapterTags: ["acts-paul", "revelation-vast"],
    intensity: 0.85,
    isVocal: true,
    isInstrumental: false,
    recommendedForReading: false,
    collection: "JOURNEY",
    description: "The overarching thematic anthem tying the 66 books together: 'God of Jacob, God of Moses, God of Mary, God of David.'",
    theologicalContext: "Musical bridge connecting Old and New Testaments to modern Theo. Shows that the God acting in antiquity is active today.",
    startAt: 120,
  },
  {
    id: "here-again-vocal",
    artist: "Elevation Worship",
    title: "Here Again [Live Acoustic]",
    catalog: "story",
    soundcloudUrl: "https://soundcloud.com/teja-allen-tucker/here-again-live-from-elevation-ballantyne-elevation-worship",
    youtubeId: "xM_7iE7g_wM",
    mode: "worship",
    emotionalTags: ["intimacy", "middle-ground", "god-is-with-us"],
    chapterTags: ["exile-return", "gospel-gethsemane-aftermath"],
    intensity: 0.75,
    isVocal: true,
    isInstrumental: false,
    recommendedForReading: false,
    collection: "PRESENCE",
    description: "Intimate vocal rendition finding sacred ground in the waiting season. 'I'm not enough unless You come, will You meet me here again.'",
    theologicalContext: "Theo realizing that his intellectual striving cannot produce peace; only presence transforms.",
    startAt: 90,
  },
];

// -------------------------------------------------------------------
// SCENE MUSIC CUES
// Maps each story phase and scene to its narrative worship cue
// -------------------------------------------------------------------
export const SCENE_MUSIC_CUES: Record<string, MusicCue> = {
  // PROLOGUE / MODERN WORLD
  "begin-ordinary-life": {
    trackId: "silence",
    mode: "reading",
    volume: 0.0,
    fadeIn: 1,
    fadeOut: 1,
    emotionalTags: ["domestic", "ordinary", "restless"],
    scenes: ["begin-ordinary-life"],
    silenceReason: "Modern world begins in natural ambient silence before music awakens.",
  },
  "begin-sam-plan": {
    trackId: "silence",
    mode: "reading",
    volume: 0.0,
    fadeIn: 1,
    fadeOut: 1,
    emotionalTags: ["control", "fixing"],
    scenes: ["begin-sam-plan"],
    silenceReason: "Ordinary apartment conversation; sound of typing and Sam's voice.",
  },

  // THE MOUNTAIN
  "experience-mountain": {
    trackId: "oceans-selah",
    mode: "reading",
    volume: 0.18, // Spec: subtle piano entering wind, almost imperceptible
    fadeIn: 6,
    fadeOut: 4,
    emotionalTags: ["uncertainty", "trust", "surrender"],
    scenes: ["experience-mountain"],
  },

  // GENESIS: CREATION
  "genesis-creation": {
    trackId: "so-will-i-instrumental",
    mode: "immersion",
    volume: 0.28, // Spec: single piano note -> strings -> universe opening
    fadeIn: 5,
    fadeOut: 4,
    emotionalTags: ["wonder", "creation", "vastness"],
    scenes: ["genesis-creation"],
  },

  // GENESIS: EDEN
  "genesis-eden": {
    trackId: "still-instrumental",
    mode: "reading",
    volume: 0.16, // Spec: warm piano, gentle atmosphere, no heavy drums
    fadeIn: 4,
    fadeOut: 4,
    emotionalTags: ["peace", "sanctuary", "memory-motif"],
    scenes: ["genesis-eden"],
  },

  // GENESIS: CAIN & ABEL (Restraint & Drop to Silence)
  "genesis-cain-abel-offering": {
    trackId: "here-again-instrumental",
    mode: "reading",
    volume: 0.12,
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["subtle-tension", "comparison"],
    scenes: ["genesis-cain-abel-offering"],
  },
  "genesis-cain-abel-field": {
    trackId: "silence", // Spec Section 10: Drop music on violence! Let the world sound empty.
    mode: "reading",
    volume: 0.0,
    fadeIn: 0,
    fadeOut: 1,
    emotionalTags: ["violence", "emptiness", "shock"],
    scenes: ["genesis-cain-abel-field"],
    silenceReason: "Music dropped to stark silence upon brother's blood touching the earth.",
  },

  // GENESIS: FLOOD
  "genesis-flood": {
    trackId: "here-again-instrumental",
    mode: "immersion",
    volume: 0.15, // Spec: initially overwhelmed by environmental sound, music underneath
    fadeIn: 6,
    fadeOut: 4,
    emotionalTags: ["grief", "deluge", "unfathomable-weight"],
    scenes: ["genesis-flood"],
  },

  // GENESIS: ABRAHAM
  "genesis-abraham-leaves": {
    trackId: "cornerstone-piano",
    mode: "reading",
    volume: 0.18, // Spec: warmth, travel, longing, acoustic movement
    fadeIn: 4,
    fadeOut: 4,
    emotionalTags: ["promise", "journey", "longing"],
    scenes: ["genesis-abraham-leaves"],
  },

  // GENESIS: JOSEPH
  "genesis-joseph-pit": {
    trackId: "here-again-instrumental",
    mode: "reading",
    volume: 0.14,
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["betrayal", "abandonment"],
    scenes: ["genesis-joseph-pit"],
  },
  "genesis-joseph-palace": {
    trackId: "goodness-of-god-acoustic",
    mode: "immersion",
    volume: 0.22, // Spec: Hope motif returns with warm strings upon reunion
    fadeIn: 4,
    fadeOut: 4,
    emotionalTags: ["reunion", "forgiveness", "providence"],
    scenes: ["genesis-joseph-palace"],
  },

  // EXODUS
  "exodus-moses-childhood": {
    trackId: "still-instrumental",
    mode: "reading",
    volume: 0.15,
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["protection", "river-reeds"],
    scenes: ["exodus-moses-childhood"],
  },
  "exodus-burning-bush": {
    trackId: "so-will-i-instrumental",
    mode: "immersion",
    volume: 0.24,
    fadeIn: 4,
    fadeOut: 3,
    emotionalTags: ["holy-ground", "reverence"],
    scenes: ["exodus-burning-bush"],
  },
  "exodus-egypt-plagues": {
    trackId: "here-again-instrumental",
    mode: "reading",
    volume: 0.12, // Spec: uncomfortable, sparse, heavy
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["judgment", "hardening"],
    scenes: ["exodus-egypt-plagues"],
  },
  "exodus-red-sea": {
    trackId: "oceans-selah",
    mode: "immersion",
    volume: 0.28, // Spec: scale expands, suspended walls of water
    fadeIn: 5,
    fadeOut: 4,
    emotionalTags: ["scale", "awe", "deliverance"],
    scenes: ["exodus-red-sea"],
  },
  "exodus-wilderness-complaints": {
    trackId: "here-again-instrumental",
    mode: "reading",
    volume: 0.16, // Spec: tired, searching, waiting, long pads
    fadeIn: 4,
    fadeOut: 4,
    emotionalTags: ["thirst", "waiting", "weariness"],
    scenes: ["exodus-wilderness-complaints"],
  },

  // KINGDOM & DAVID
  "kingdom-david-goliath": {
    trackId: "cornerstone-piano",
    mode: "reading",
    volume: 0.18,
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["trust", "courage"],
    scenes: ["kingdom-david-goliath"],
  },
  "kingdom-david-jonathan": {
    trackId: "still-instrumental",
    mode: "reading",
    volume: 0.15,
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["covenant-friendship", "tears"],
    scenes: ["kingdom-david-jonathan"],
  },
  "kingdom-david-bathsheba": {
    trackId: "o-come-to-altar-instrumental",
    mode: "reading",
    volume: 0.14, // Broken David: piano, strings, silence
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["failure", "brokenness", "repentance"],
    scenes: ["kingdom-david-bathsheba"],
  },

  // EXILE & PROPHETS
  "prophets-jeremiah": {
    trackId: "here-again-instrumental",
    mode: "reading",
    volume: 0.12, // Wind + voice + distant environment
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["lament", "tears", "solitude"],
    scenes: ["prophets-jeremiah"],
  },
  "collapse-fall-of-jerusalem": {
    trackId: "silence", // Spec: Collapse Two peak — music drops to ash and smoke
    mode: "reading",
    volume: 0.0,
    fadeIn: 0,
    fadeOut: 1,
    emotionalTags: ["devastation", "powerlessness"],
    scenes: ["collapse-fall-of-jerusalem"],
    silenceReason: "Jerusalem falls; smoke and wailing without score accompaniment.",
  },
  "exile-job": {
    trackId: "spontaneous-waiting-pad",
    mode: "reading",
    volume: 0.14,
    fadeIn: 4,
    fadeOut: 4,
    emotionalTags: ["whirlwind", "mystery", "humility"],
    scenes: ["exile-job"],
  },
  "restoration-the-silence": {
    trackId: "spontaneous-waiting-pad",
    mode: "reading",
    volume: 0.15, // 400 years of silence
    fadeIn: 5,
    fadeOut: 4,
    emotionalTags: ["silence", "expectancy"],
    scenes: ["restoration-the-silence"],
  },

  // JESUS & GOSPELS
  "gospel-first-sight": {
    trackId: "what-a-beautiful-name-piano",
    mode: "reading",
    volume: 0.16, // Intimacy, conversational, ordinary man in crowd
    fadeIn: 4,
    fadeOut: 3,
    emotionalTags: ["intimacy", "presence", "conversational"],
    scenes: ["gospel-first-sight"],
  },
  "gospel-parables": {
    trackId: "what-a-beautiful-name-piano",
    mode: "reading",
    volume: 0.15,
    fadeIn: 3,
    fadeOut: 3,
    emotionalTags: ["wisdom", "kingdom"],
    scenes: ["gospel-parables"],
  },
  "cross-gethsemane": {
    trackId: "silence", // Spec: instrumental -> single note -> ambient -> silence
    mode: "reading",
    volume: 0.0,
    fadeIn: 0,
    fadeOut: 2,
    emotionalTags: ["anguish", "submission"],
    scenes: ["cross-gethsemane"],
    silenceReason: "Gethsemane agony; sound of sweating blood in dark olive grove.",
  },
  "cross-crucifixion": {
    trackId: "silence", // Spec: absolute test of restraint — no triumphant music while Christ suffers
    mode: "reading",
    volume: 0.0,
    fadeIn: 0,
    fadeOut: 0.5,
    emotionalTags: ["noon-darkness", "powerlessness", "breath"],
    scenes: ["cross-crucifixion"],
    silenceReason: "Calvary darkness and silence; acknowledging absolute powerlessness.",
  },
  "cross-resurrection": {
    trackId: "what-a-beautiful-name-vocal", // Climax: vocal worship emerges!
    mode: "worship",
    volume: 0.5,
    fadeIn: 6,
    fadeOut: 4,
    emotionalTags: ["resurrection", "hope", "conquering-death"],
    scenes: ["cross-resurrection"],
  },

  // ACTS & EARLY CHURCH
  "acts-pentecost": {
    trackId: "this-i-believe-prelude",
    mode: "immersion",
    volume: 0.26,
    fadeIn: 4,
    fadeOut: 3,
    emotionalTags: ["rushing-wind", "courage"],
    scenes: ["acts-pentecost"],
  },
  "acts-paul": {
    trackId: "same-god-vocal", // Climax: covenant continuity from Moses to Paul
    mode: "worship",
    volume: 0.45,
    fadeIn: 5,
    fadeOut: 4,
    emotionalTags: ["transformation", "apostolic-calling"],
    scenes: ["acts-paul"],
  },

  // REVELATION
  "revelation-new-jerusalem": {
    trackId: "graves-into-gardens-vocal", // Climax: all things made new
    mode: "worship",
    volume: 0.52,
    fadeIn: 6,
    fadeOut: 5,
    emotionalTags: ["cosmic-worship", "restoration", "all-things-new"],
    scenes: ["revelation-new-jerusalem"],
  },

  // THE FINAL WAKE-UP
  "awakening-room": {
    trackId: "silence", // Spec Section 32: hard rule — NO giant worship climax on wake-up. Theo inhales mountain wind.
    mode: "reading",
    volume: 0.0,
    fadeIn: 0,
    fadeOut: 1,
    emotionalTags: ["breath", "reality", "ordinary-world"],
    scenes: ["awakening-room"],
    silenceReason: "Theo wakes up; everything disappears into breath and mountain wind.",
  },
  "awakening-mountain-peace": {
    trackId: "still-instrumental", // Spec Section 34: subtle instrumental returns transformed into peace
    mode: "reading",
    volume: 0.16,
    fadeIn: 5,
    fadeOut: 4,
    emotionalTags: ["peace", "transformed-motif", "trust"],
    scenes: ["awakening-mountain-peace"],
  },
};

/**
 * Helper to find track by id
 */
export function getWorshipTrack(trackId: string): WorshipTrack | undefined {
  return WORSHIP_CATALOG.find((t) => t.id === trackId);
}

/**
 * Filter tracks by collection
 */
export function getTracksByCollection(collection: string): WorshipTrack[] {
  return WORSHIP_CATALOG.filter((t) => t.collection === collection);
}

/**
 * Filter tracks by catalog type ("reading" vs "story")
 */
export function getTracksByCatalog(catalog: "reading" | "story"): WorshipTrack[] {
  return WORSHIP_CATALOG.filter((t) => t.catalog === catalog);
}

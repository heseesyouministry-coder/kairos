import { create } from "zustand";

export type NavigatorViewMode = "timeline" | "eras" | "books" | "figures";

interface NavigatorState {
  isOpen: boolean;
  selectedEraId: string | "all";
  selectedTestament: "all" | "old" | "new";
  searchQuery: string;
  viewMode: NavigatorViewMode;

  openNavigator: (options?: { eraId?: string; viewMode?: NavigatorViewMode }) => void;
  closeNavigator: () => void;
  toggleNavigator: () => void;
  setSelectedEraId: (eraId: string | "all") => void;
  setSelectedTestament: (testament: "all" | "old" | "new") => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: NavigatorViewMode) => void;
}

export const useNavigatorStore = create<NavigatorState>((set) => ({
  isOpen: false,
  selectedEraId: "all",
  selectedTestament: "all",
  searchQuery: "",
  viewMode: "timeline",

  openNavigator: (options) =>
    set({
      isOpen: true,
      ...(options?.eraId !== undefined && { selectedEraId: options.eraId }),
      ...(options?.viewMode !== undefined && { viewMode: options.viewMode }),
    }),
  closeNavigator: () => set({ isOpen: false }),
  toggleNavigator: () => set((state) => ({ isOpen: !state.isOpen })),
  setSelectedEraId: (eraId) => set({ selectedEraId: eraId }),
  setSelectedTestament: (testament) => set({ selectedTestament: testament }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (viewMode) => set({ viewMode }),
}));

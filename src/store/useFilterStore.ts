import { create } from "zustand";
import type { Location } from "@/types/listing";

interface FilterState {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));

import { create } from "zustand";
import { produce } from "immer";
// import zustandStorage from "./storage";

export interface FilterState {
  name: string;
  date: Date | null;
  displayDate: string;
  isLoading: boolean;
  isSelected: boolean;
}

interface FilterStore {
  times: FilterState[];
  setDate: (name: FilterState["name"], date: FilterState["date"]) => void;
  setFilters: (times: FilterState[]) => void;
  updateDate: (name: FilterState["name"], date: FilterState["date"]) => void;
  updateDisplayDate: (name: FilterState["name"], displayDate: FilterState["displayDate"]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState[] = [
  {
    name: "dateParsed",
    date: new Date(),
    displayDate: new Date().toISOString().slice(0, 10),
    isLoading: true,
    isSelected: false,
  },
];

export const useTime = create<FilterStore>((set) => ({
  times: initialFilters,
  setDate: (name, date) =>
    set(
      produce((state) => {
        const d = state.times.find((f: FilterState) => f.name == name);
        if (d && d.date !== date) d.date = new Date();
      })
    ),
  setFilters: (times) => set({ times }),
  updateDate: (name, newDate) =>
    set(
      produce((state) => {
        const d = state.times.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Data: ${newDate}`);
        console.log(``);
        if (d && d.date !== newDate) d.date = newDate;
      })
    ),
  updateDisplayDate: (name, displayDate) => set(
    produce((state) => {
      const d = state.times.find((f: FilterState) => f.name == name);
      if (d && d.displayDate !== displayDate) d.displayDate = displayDate;
    })
  ),
  resetFilters: () => set({ times: initialFilters }),
}));

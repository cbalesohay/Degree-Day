import { create } from "zustand";
import { produce } from "immer";
import zustandStorage from "./storage";

export interface FilterState {
  name: string;
  date: Date | null;
  isLoading: boolean;
  isSelected: boolean;
}

interface FilterStore {
  times: FilterState[];
  setDate: (name: FilterState["name"], date: FilterState["date"]) => void;
  setFilters: (times: FilterState[]) => void;
  updateDate: (name: FilterState["name"], date: FilterState["date"]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState[] = [
  {
    name: "dateParsed",
    date: new Date(),
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
        // d.date = d.date.toISOString().slice(0, 10);
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
  resetFilters: () => set({ times: initialFilters }),
}));

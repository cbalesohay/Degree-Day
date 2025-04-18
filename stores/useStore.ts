import { create } from "zustand";
import { produce } from "immer";
import zustandStorage from "./storage";
import { persist } from "zustand/middleware";

export interface FilterState {
  name: string;
  degreeDays: number;
  dailyDegreeDays: number;
  totalDegreeDays: number;
  isLoading: boolean;
  isSelected: boolean;
}

interface FilterStore {
  filters: FilterState[];
  setFilters: (filters: FilterState[]) => void;
  updateDegreeDays: (
    name: FilterState["name"],
    degreeDays: FilterState["degreeDays"]
  ) => void;
  updateDailyDegreeDays: (
    name: FilterState["name"],
    degreeDays: FilterState["degreeDays"]
  ) => void;
  updateTotalDegreeDays: (
    name: FilterState["name"],
    degreeDays: FilterState["degreeDays"]
  ) => void;
  updateSelected: (name: FilterState["name"]) => void;
  resetSelected: (name: FilterState["name"]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState[] = [
  {
    name: "Western Cherry",
    degreeDays: -1,
    dailyDegreeDays: -1,
    totalDegreeDays: -1,
    isLoading: true,
    isSelected: false,
  },
  {
    name: "Leaf Rollers",
    degreeDays: -1,
    dailyDegreeDays: -1,
    totalDegreeDays: -1,
    isLoading: true,
    isSelected: false,
  },
  {
    name: "Codling Moth",
    degreeDays: -1,
    dailyDegreeDays: -1,
    totalDegreeDays: -1,
    isLoading: true,
    isSelected: false,
  },
  {
    name: "Apple Scab",
    degreeDays: -1,
    dailyDegreeDays: -1,
    totalDegreeDays: -1,
    isLoading: true,
    isSelected: false,
  },
];

export const useStore = create<FilterStore>((set) => ({
  filters: initialFilters,
  setFilters: (filters) => set({ filters }),
  updateDegreeDays: (name, newDegreeDays) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Degree Days: ${newDegreeDays}`);
        console.log(``);
        if (filter && filter.degreeDays !== newDegreeDays)
          filter.degreeDays = newDegreeDays;
      })
    ),
  updateDailyDegreeDays: (name, newDegreeDays) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Daily Degree Days: ${newDegreeDays}`);
        console.log(``);
        if (filter && filter.dailDegreeDays !== newDegreeDays)
          filter.dailyDegreeDays = newDegreeDays;
      })
    ),
  updateTotalDegreeDays: (name, newDegreeDays) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Total Degree Days: ${newDegreeDays}`);
        console.log(``);
        if (filter && filter.totalDegreeDays !== newDegreeDays)
          filter.totalDegreeDays = newDegreeDays;
      })
    ),
  updateSelected: (name) =>
    set(
      produce((state) => {
        state.filters.forEach((filter: FilterState) => {
          filter.isSelected = filter.name === name;
        });
      })
    ),
  resetSelected: (name) =>
    set(
      produce((state) => {
        state.filters.forEach((filter: FilterState) => {
          filter.isSelected = !(filter.name === name);
        });
      })
    ),
  resetFilters: () => set({ filters: initialFilters }),
}));

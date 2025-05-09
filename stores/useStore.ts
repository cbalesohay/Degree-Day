import { create } from "zustand";
import { produce } from "immer";
import zustandStorage from "./storage";
import { persist } from "zustand/middleware";
import { pestNames } from "@/constants/Metrics";

export interface FilterState {
  name: string;
  degreeDays: number;
  dailyDegreeDays: number;
  totalDegreeDays: number;
  startDate: Date | null;
  endDate: Date | null;
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
    dailyDegreeDays: FilterState["dailyDegreeDays"]
  ) => void;
  updateTotalDegreeDays: (
    name: FilterState["name"],
    totalDegreeDays: FilterState["totalDegreeDays"]
  ) => void;
  updateStartDate: (
    name: FilterState["name"],
    startDate: FilterState["startDate"]
  ) => void;
  updateEndDate: (
    name: FilterState["name"],
    endDate: FilterState["endDate"]
  ) => void;
  updateSelected: (name: FilterState["name"]) => void;
  resetSelected: (name: FilterState["name"]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState[] = [
  ...pestNames.map((name) => ({
    name: name,
    degreeDays: -1,
    dailyDegreeDays: -1,
    totalDegreeDays: -1,
    startDate: null as Date | null,
    endDate: null as Date | null,
    isLoading: true,
    isSelected: false,
  }))
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
  updateDailyDegreeDays: (name, newDailyDegreeDays) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Daily Degree Days: ${newDailyDegreeDays}`);
        console.log(``);
        if (filter && filter.dailDegreeDays !== newDailyDegreeDays)
          filter.dailyDegreeDays = newDailyDegreeDays;
      })
    ),
  updateTotalDegreeDays: (name, newTotalDegreeDays) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Total Degree Days: ${newTotalDegreeDays}`);
        console.log(``);
        if (filter && filter.totalDegreeDays !== newTotalDegreeDays)
          filter.totalDegreeDays = newTotalDegreeDays;
      })
    ),
  updateStartDate: (name, newStartDate) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`New Start Date: ${newStartDate}`);
        console.log(``);
        if (filter && filter.startDate !== newStartDate)
          filter.startDate = newStartDate;
      })
    ),
  updateEndDate: (name, newEndDate) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`New End Date: ${newEndDate}`);
        console.log(``);
        if (filter && filter.endDate !== newEndDate)
          filter.endDate = newEndDate;
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

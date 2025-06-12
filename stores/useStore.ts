import { create } from "zustand";
import { produce } from "immer";
import zustandStorage from "./storage";
import { persist } from "zustand/middleware";
import { pestNames } from "@/constants/Metrics";

export interface FilterState {
  name: string;
  degree_days: number;
  daily_degree_days: number;
  total_degree_days: number;
  start_date: Date | null;
  end_date: Date | null;
  temp_base: number;
  temp_max: number;
  isLoading: boolean;
  isSelected: boolean;
}

interface FilterStore {
  filters: FilterState[];
  setFilters: (filters: FilterState[]) => void;
  updateDegreeDays: (
    name: FilterState["name"],
    degree_days: FilterState["degree_days"]
  ) => void;
  updateDailyDegreeDays: (
    name: FilterState["name"],
    daily_degree_days: FilterState["daily_degree_days"]
  ) => void;
  updateTotalDegreeDays: (
    name: FilterState["name"],
    total_degree_days: FilterState["total_degree_days"]
  ) => void;
  updateStartDate: (
    name: FilterState["name"],
    start_date: FilterState["start_date"]
  ) => void;
  updateEndDate: (
    name: FilterState["name"],
    end_date: FilterState["end_date"]
  ) => void;
  updateTempBase: (
    name: FilterState["name"],
    temp_base: FilterState["temp_base"]
  ) => void;
  updateTempMax: (
    name: FilterState["name"],
    temp_max: FilterState["temp_max"]
  ) => void;
  updateSelected: (name: FilterState["name"]) => void;
  resetSelected: (name: FilterState["name"]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState[] = [
  ...pestNames.map((name) => ({
    name: name,
    degree_days: -1,
    daily_degree_days: -1,
    total_degree_days: -1,
    start_date: null as Date | null,
    end_date: null as Date | null,
    temp_base: -1,
    temp_max: -1,
    isLoading: true,
    isSelected: false,
  })),
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
        if (filter && filter.degree_days !== newDegreeDays)
          filter.degree_days = newDegreeDays;
      })
    ),
  updateDailyDegreeDays: (name, newDailyDegreeDays) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Daily Degree Days: ${newDailyDegreeDays}`);
        console.log(``);
        if (filter && filter.daily_degree_days !== newDailyDegreeDays)
          filter.daily_degree_days = newDailyDegreeDays;
      })
    ),
  updateTotalDegreeDays: (name, newTotalDegreeDays) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Total Degree Days: ${newTotalDegreeDays}`);
        console.log(``);
        if (filter && filter.total_degree_days !== newTotalDegreeDays)
          filter.total_degree_days = newTotalDegreeDays;
      })
    ),
  updateStartDate: (name, newStartDate) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`New Start Date: ${newStartDate}`);
        console.log(``);
        if (filter && filter.start_date !== newStartDate)
          filter.start_date = newStartDate;
      })
    ),
  updateEndDate: (name, newEndDate) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`New End Date: ${newEndDate}`);
        console.log(``);
        if (filter && filter.end_date !== newEndDate)
          filter.end_date = newEndDate;
      })
    ),
  updateTempBase: (name, newBaseTemp) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`New Base Temp: ${newBaseTemp}`);
        console.log(``);
        if (filter && filter.temp_base !== newBaseTemp)
          filter.temp_base = newBaseTemp;
      })
    ),
  updateTempMax: (name, newMaxTemp) =>
    set(
      produce((state) => {
        const filter = state.filters.find((f: FilterState) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`New Mac Temp: ${newMaxTemp}`);
        console.log(``);
        if (filter && filter.temp_max !== newMaxTemp)
          filter.temp_max = newMaxTemp;
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

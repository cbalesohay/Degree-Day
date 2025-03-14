import { create } from "zustand";
import { produce } from "immer";
import zustandStorage from "./storage";

export interface FilterState {
  type: string;
  name: string;
  data: number;
  isLoading: boolean;
  isSelected: boolean;
}

interface FilterStore {
  datas: FilterState[];
  setFilters: (datas: FilterState[]) => void;
  updateDegrees: (name: FilterState["name"], data: FilterState["data"]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState[] = [
  {
    type: "Temperature",
    name: "dayLow",
    data: -1,
    isLoading: true,
    isSelected: false,
  },
  {
    type: "Temperature",
    name: "dayHigh",
    data: -1,
    isLoading: true,
    isSelected: false,
  },
  {
    type: "Humidity",
    name: "dayAverage",
    data: -1,
    isLoading: true,
    isSelected: false,
  },
  {
    type: "Rain",
    name: "dayRainfall",
    data: -1,
    isLoading: true,
    isSelected: false,
  },
  {
    type: "Rain",
    name: "totalRainfall",
    data: -1,
    isLoading: true,
    isSelected: false,
  },
];

export const useMetric = create<FilterStore>((set) => ({
  datas: initialFilters,
  setFilters: (datas) => set({ datas }),
  updateDegrees: (name, newData) =>
    set(
      produce((state) => {
        const d = state.datas.find((f: FilterState) => f.name == name);
        // const d = state.datas.find((f) => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Data: ${newData}`);
        console.log(``);
        if (d && d.data !== newData) d.data = newData;
      })
    ),
  resetFilters: () => set({ datas: initialFilters }),
}));

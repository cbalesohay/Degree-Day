import {create} from 'zustand';
import {produce} from 'immer';
import zustandStorage from './storage';

export interface FilterState {
  name: string;
  date: string | null;
  isLoading: boolean;
  isSelected: boolean;
}

interface FilterStore {
  times: FilterState[];
  setFilters: (times: FilterState[]) => void;
  updateDate: (name: FilterState["name"], date: FilterState["date"]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState[] = [
  {
    name: 'dateParsed',
    date: '', 
    isLoading: true,
    isSelected: false,
  },
];

export const useTime = create<FilterStore>(set => ({
  times: initialFilters,
  setFilters: times => set({times}),
  updateDate: (name, date) =>
    set(
      produce(state => {
        const d = state.times.find(f => f.name == name);
        console.log(`Name: ${name}`);
        console.log(`Data: ${date}`);
        console.log(``);
        if(d) d.date = date;
      }),
    ),
  resetFilters: () => set({times: initialFilters}),
}));
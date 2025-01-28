import {create} from 'zustand';
import {produce} from 'immer';
import zustandStorage from './storage';

export interface FilterState {
  type: string;
  name: string;
  degreeDays: number;
  isLoading: boolean;
  isSelected: boolean;
}

interface FilterStore {
  filters: FilterState[];
  setFilters: (filters: FilterState[]) => void;
  updateDegreeDays: (type: FilterState["type"], degreeDays: FilterState["degreeDays"]) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState[] = [
  {
    type: 'WesternCherry',
    name: 'Western Cherry',
    degreeDays: 0,
    isLoading: true,
    isSelected: false,
  },
  {
    type: 'LeafRollers',
    name: 'Leaf Rollers',
    degreeDays: 0,
    isLoading: true,
    isSelected: false,
  },
  {
    type: 'CodlingMoth',
    name: 'Codling Moth',
    degreeDays: 0,
    isLoading: true,
    isSelected: false,
  },
  {
    type: 'AppleScab',
    name: 'Apple Scab',
    degreeDays: 0,
    isLoading: true,
    isSelected: false,
  },
];

export const useStore = create<FilterStore>(set => ({
  filters: initialFilters,
  setFilters: filters => set({filters}),
  updateDegreeDays: (type, degreeDays) =>
    set(
      produce(state => {
        const filter = state.filters.find(f => f.type == type);
        console.log(`Type: ${type}`);
        console.log(`Degree Days: ${degreeDays}`);
        console.log(``);
        if(filter) filter.degreeDays = degreeDays;
      }),
    ),
  resetFilters: () => set({filters: initialFilters}),
}));

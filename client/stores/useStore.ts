import {create} from 'zustand';
import {produce} from 'immer';
import zustandStorage from './storage';
import { DegreeDay } from '../ components/DegreeDay';
import { Fetch } from '../hooks/Fetch';

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
  updateFilterSelection: (type: string, selectedItems: string[]) => void;
  toggleFilterSelection: (type: string) => void;
  resetFilters: () => void;
  resetNonTabBarFilters: () => void;
  resetTabBarFilters: () => void;
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
        console.log(type);
        console.log(degreeDays);
        if(filter) filter.degreeDays = degreeDays;
      }),
    ),


  
  updateFilterSelection: (type, selectedItems) =>
    set(
      produce(state => {
        const filter = state.filters.find(f => f.type === type);
        if (filter) filter.selectedItems = selectedItems;
      }),
    ),
  toggleFilterSelection: type =>
    set(
      produce(state => {
        const filter = state.filters.find(f => f.type === type);
        if (filter) filter.isSelected = !filter.isSelected;
      }),
    ),
  resetFilters: () => set({filters: initialFilters}),
  resetTabBarFilters: () =>
    set(
      produce(state => {
        state.filters.forEach(filter => {
          if (!filter.isTabBar) {
            filter.selectedItems = [];
            filter.isSelected = false;
          }
        });
      }),
    ),
  resetNonTabBarFilters: () =>
    set(
      produce(state => {
        state.filters.forEach(filter => {
          if (filter.isFilter) {
            filter.selectedItems = [];
            filter.isSelected = false;
          }
        });
      }),
    ),
}));

import {create} from 'zustand';
import {produce} from 'immer';
import zustandStorage from './storage';

export interface FilterState {
  type: string;
  name: string;
  degrees: number;
  isLoading: boolean;
  isSelected: boolean;
}

interface FilterStore {
  temps: FilterState[];
  setFilters: (filters: FilterState[]) => void;
  updateFilterSelection: (type: string, selectedItems: string[]) => void;
  toggleFilterSelection: (type: string) => void;
  resetFilters: () => void;
  resetNonTabBarFilters: () => void;
  resetTabBarFilters: () => void;
}

const initialFilters: FilterState[] = [
  {
    type: 'Temperature',
    name: 'tempLow',
    degrees: 10,
    isLoading: true,
    isSelected: false,
  },
  {
    type: 'Temperature',
    name: 'tempHigh',
    degrees: 60,
    isLoading: true,
    isSelected: false,
  },
];

export const useTempature = create<FilterStore>(set => ({
  temps: initialFilters,
  setFilters: temps => set({temps}),
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
  resetFilters: () => set({temps: initialFilters}),
  resetTabBarFilters: () =>
    set(
      produce(state => {
        state.temps.forEach(filter => {
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
        state.temps.forEach(filter => {
          if (filter.isFilter) {
            filter.selectedItems = [];
            filter.isSelected = false;
          }
        });
      }),
    ),
}));

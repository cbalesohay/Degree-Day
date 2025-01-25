import create from 'zustand';

export const FilterState = {
  type: '',
  name: '',
  degreeDays: 0,
  isLoading: true,
  isSelected: false,
};

function FilterStore(initialFilterStore) {}

const initialFilters = [
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

// const FilterStore = {
//   filters: initialFilters,
//   setFilters: filters => {},
//   updateFilterSelection: (type, selectedItems) => {},
//   toggleFilterSelection: type => {},
//   resetFilters: () => {},
//   resetNonTabBarFilters: () => {},
//   resetTabBarFilters: () => {},
// };

export const useFilterStore =
  create <
  FilterStore >
  (set => ({
    filters: initialFilters,
    setFilters: filters => {},
    updateFilterSelection: (type, selectedItems) => {},
    toggleFilterSelection: type => {},
    resetFilters: () => {},
    resetNonTabBarFilters: () => {},
    resetTabBarFilters: () => {},
  }));

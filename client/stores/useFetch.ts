import {create} from 'zustand';
import {produce} from 'immer';
import zustandStorage from './storage';
const API_URL = process.env.API_URL;

interface DataStoreState {
  data: number;
  isLoading: boolean;
  isError: boolean | null;
  fetchData: (param1: string, param2: string, param3: string) => Promise<void>;
}

export const useDataStore = create<DataStoreState>((set) => ({
  data: 0,
  isLoading: false,
  isError: null,
  fetchData: async (param1: string, param2: string, param3: string) => {
    set({ isLoading: true });
    try {
      if (!API_URL) {
        throw new Error("API_URL is not defined");
      }
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: param1, species: param2, reqData: param3 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      const data = Number(json);
      set({ data, isLoading: false, isError: null });
      console.log("Fetched Data:", data);
    } catch (error) {
      console.error("Error occurred:", error);
      set({ isLoading: false, isError: true });
    }
  },
}));

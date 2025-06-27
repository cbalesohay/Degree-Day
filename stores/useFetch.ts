import { create } from "zustand";
const API_URL =
  "http://ec2-35-95-17-225.us-west-2.compute.amazonaws.com:8080/send-fast";

interface DataStoreState {
  data: number;
  isLoading: boolean;
  isError: boolean | null;
  fetchData: () => Promise<JSON>;
}

export const useDataStore = create<DataStoreState>((set) => ({
  data: 0,
  isLoading: false,
  isError: null,
  fetchData: async () => {
    set({ isLoading: true });
    try {
      if (!API_URL) {
        throw new Error("API_URL is not defined");
      }
      const response = await fetch(API_URL, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();

      return json;
    } catch (error) {
      console.log("Error occurred:", error);
      set({ isLoading: false, isError: true });
      return -1;
    } finally {
      set({ isLoading: false });
    }
  },
}));

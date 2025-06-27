import { create } from "zustand";
const API_URL =
  "http://ec2-35-95-17-225.us-west-2.compute.amazonaws.com:8080/re-calc-data";

interface DataStoreState {
  isLoading: boolean;
  isError: boolean | null;
  resetData: (year: Number) => void;
}

export const useResetYear = create<DataStoreState>((set) => ({
  isLoading: false,
  isError: null,
  resetData: async (year: Number) => {
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
        body: JSON.stringify({ year }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error occurred:", error);
      set({ isLoading: false, isError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));

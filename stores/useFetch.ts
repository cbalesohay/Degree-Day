import { create } from "zustand";
// import { produce } from "immer";
// import zustandStorage from "./storage";
// const API_URL = "https://ddserver-2fsv.onrender.com/post";
const API_URL = "https://ddserver-2fsv.onrender.com/sendData";

interface DataStoreState {
  data: number;
  isLoading: boolean;
  isError: boolean | null;
  fetchData: (param1: string | Date) => Promise<JSON>;
}

export const useDataStore = create<DataStoreState>((set) => ({
  data: 0,
  isLoading: false,
  isError: null,
  fetchData: async (param1: string | Date) => {
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
        body: JSON.stringify({ date: param1 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();

      console.log(json);

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

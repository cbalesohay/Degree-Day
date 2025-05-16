import { create } from "zustand";
// const API_URL = "https://ddserver-2fsv.onrender.com/newDate";
const API_URL = "http://ec2-35-95-17-225.us-west-2.compute.amazonaws.com:8080/newDate";

interface ChangeDateState {
  data: number;
  isLoading: boolean;
  isError: boolean | null;
  changeDate: (
    nameToAlter: string,
    newStartDate: string | Date | null,
    newEndDate: string | Date | null
  ) => Promise<number>;
}

export const useChangeDate = create<ChangeDateState>((set) => ({
  data: 0,
  isLoading: false,
  isError: null,
  changeDate: async (
    nameToAlter: string,
    newStartDate?: string | Date | null,
    newEndDate?: string | Date | null
  ) => {
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
        body: JSON.stringify({
          name: nameToAlter,
          startDate: newStartDate,
          endDate: newEndDate,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const json = await response.json();

      // console.log(json);
      console.log("Start Date Change: " + newStartDate);
      console.log("End Date Change: " + newEndDate);

      //   return json;
      return 0;
    } catch (error) {
      console.log("Error occurred:", error);
      set({ isLoading: false, isError: true });
      return -1;
    } finally {
      set({ isLoading: false });
    }
  },
}));

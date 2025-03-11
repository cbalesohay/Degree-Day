import React, { Children, useEffect, useState, useMemo } from "react";
import { useStore } from "../stores/useStore";
import { useMetric } from "../stores/useMetric";
import { useDataStore } from "../stores/useFetch";
import { useTime } from "../stores/useTime";

/**
 *
 * @returns {timeFind, filters}
 */
export const useFetchLogic = () => {
  const { fetchData } = useDataStore(); // Api call

  const filters = useStore().filters; // Degree day store
  const datas = useMetric().datas; // Tempature store
  const times = useTime().times; // Time store

  const updateDDays = useStore((state) => state.updateDegreeDays); // Degree day update function
  const updateDegrees = useMetric((state) => state.updateDegrees); // Tempature update function
  const updateTimes = useTime((state) => state.updateDate); // Time update function
  const updateDisplayDate = useTime((state) => state.updateDisplayDate); // Display Date update function

  // Date parsing function
  const parseDate = (data: Date | string) => {
    if (typeof data === "string") {
      return data;
    }
    return data.toISOString().slice(0, 10);
  };

  // Date parsing / persisting
  const timeFind = times.find((time) => time.name === "dateParsed")?.date;
  const parsedDate = useMemo(
    () => parseDate(timeFind ?? new Date()),
    [timeFind]
  );

  useEffect(() => {
    if (filters.length === 0 || datas.length === 0) {
      console.log("Waiting for data before fetching...");
      return;
    }

    updateDisplayDate("dateParsed", parsedDate); // Update display date

    // Define an async function inside useEffect
    const fetchDataAndUpdate = async () => {
      try {
        const result: any = await fetchData(parsedDate);

        // Check if result is valid before updating state
        if (!result || typeof result !== "object") {
          console.log("Invalid API response:", result);
          // Assign -1 to all values if there is an error
          [
            "Western Cherry",
            "Leaf Rollers",
            "Codling Moth",
            "Apple Scab",
          ].forEach((name) => {
            updateDDays(name, -1);
          });
          [
            "dayLow",
            "dayHigh",
            "dayAverage",
            "current",
            "dayRainfall",
            "totalRainfall",
          ].forEach((name) => {
            updateDegrees(name, -1);
          });
          return;
        }

        updateDDays("Western Cherry", Math.round(result.wcDayDegreeDay));
        updateDDays("Leaf Rollers", Math.round(result.lrDayDegreeDay));
        updateDDays("Codling Moth", Math.round(result.cmDayDegreeDay));
        updateDDays("Apple Scab", Math.round(result.asDayDegreeDay));
        updateDegrees("dayLow", Math.round(result.dayLow));
        updateDegrees("dayHigh", Math.round(result.dayHigh));
        updateDegrees("dayAverage", Math.round(result.dayAverage));
        updateDegrees("current", Math.round(result.current));
        updateDegrees("dayRainfall", Math.round(result.dayRainfall));
        updateDegrees("totalRainfall", Math.round(result.totalRainfall));
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchDataAndUpdate(); // Call the async function

    return () => {
      // Cleanup if needed
    };
  }, [parsedDate]);

  return { timeFind, filters };
};

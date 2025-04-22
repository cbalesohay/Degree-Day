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
  const updateDailyDDays = useStore((state) => state.updateDailyDegreeDays); // Degree day update function
  const updateTotalDDays = useStore((state) => state.updateTotalDegreeDays); // Degree day update function
  const updateStartDate = useStore((state) => state.updateStartDate); // Update start date
  const updateEndDate = useStore((state) => state.updateEndDate); // Update end date
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
        const result: any = await fetchData();

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

        updateDailyDDays(
          "Western Cherry",
          Math.round(result["Western Cherry"].dailyDegreeDays)
        );
        updateDailyDDays(
          "Leaf Rollers",
          Math.round(result["Leaf Rollers"].dailyDegreeDays)
        );
        updateDailyDDays(
          "Codling Moth",
          Math.round(result["Codling Moth"].dailyDegreeDays)
        );
        updateDailyDDays(
          "Apple Scab",
          Math.round(result["Apple Scab"].dailyDegreeDays)
        );
        updateTotalDDays(
          "Western Cherry",
          Math.round(result["Western Cherry"].totalDegreeDays)
        );
        updateTotalDDays(
          "Leaf Rollers",
          Math.round(result["Leaf Rollers"].totalDegreeDays)
        );
        updateTotalDDays(
          "Codling Moth",
          Math.round(result["Codling Moth"].totalDegreeDays)
        );
        updateTotalDDays(
          "Apple Scab",
          Math.round(result["Apple Scab"].totalDegreeDays)
        );

        updateStartDate("Western Cherry", new Date(result["Western Cherry"].startDate));
        updateEndDate("Western Cherry", new Date(result["Western Cherry"].endDate));

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

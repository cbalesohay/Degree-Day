import { useEffect, useMemo } from "react";
import { AppState } from "react-native";
import { useStore } from "../stores/useStore";
import { useMetric } from "../stores/useMetric";
import { useDataStore } from "../stores/useFetch";
import { useTime } from "../stores/useTime";
import { pestNames } from "@/constants/Metrics";
import { weatherMetrics } from "@/constants/Metrics";

/**
 *
 * @returns {timeFind, filterFL, fetchDataAndUpdate}
 */
export const useFetchLogic = () => {
  const { fetchData } = useDataStore(); // Api call
  const {
    filters,
    updateDegreeDays,
    updateDailyDegreeDays,
    updateTotalDegreeDays,
    updateStartDate,
    updateEndDate,
  } = useStore();
  const { datas, updateDegrees } = useMetric();
  const { times, updateDisplayDate } = useTime();

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

  // Define an async function inside useEffect
  const fetchDataAndUpdate = async () => {
    try {
      const result: any = await fetchData();

      // Check if result is valid before updating state
      if (!result || typeof result !== "object") {
        console.log("Invalid API response:", result);
        // Assign -1 to all values if there is an error
        pestNames.forEach((pest) => {
          updateDegreeDays(pest, -1);
        });
        weatherMetrics.forEach((key) => {
          updateDegrees(key, -1);
        });
        return;
      }

      // Update data for each pest
      pestNames.forEach((pest) => {
        const pestData = result.metrics[pest];
        if (pestData) {
          updateDailyDegreeDays(pest, Math.round(pestData.dailyDegreeDays));
          updateTotalDegreeDays(pest, Math.round(pestData.totalDegreeDays));
          updateStartDate(pest, new Date(pestData.startDate));
          updateEndDate(pest, new Date(pestData.endDate));
        }
      });

      // Update weather data
      weatherMetrics.forEach((key) => {
        updateDegrees(key, Math.round(result.weather[key]));
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (filters.length === 0 || datas.length === 0) {
      console.log("Waiting for data before fetching...");
      return;
    }

    updateDisplayDate("dateParsed", parsedDate); // Update display date

    // // Define an async function inside useEffect
    // const fetchDataAndUpdate = async () => {
    //   try {
    //     const result: any = await fetchData();

    //     // Check if result is valid before updating state
    //     if (!result || typeof result !== "object") {
    //       console.log("Invalid API response:", result);
    //       // Assign -1 to all values if there is an error
    //       pestNames.forEach((pest) => {
    //         updateDegreeDays(pest, -1);
    //       });
    //       weatherMetrics.forEach((key) => {
    //         updateDegrees(key, -1);
    //       });
    //       return;
    //     }

    //     // Update data for each pest
    //     pestNames.forEach((pest) => {
    //       const pestData = result.metrics[pest];
    //       if (pestData) {
    //         updateDailyDegreeDays(pest, Math.round(pestData.dailyDegreeDays));
    //         updateTotalDegreeDays(pest, Math.round(pestData.totalDegreeDays));
    //         updateStartDate(pest, new Date(pestData.startDate));
    //         updateEndDate(pest, new Date(pestData.endDate));
    //       }
    //     });

    //     // Update weather data
    //     weatherMetrics.forEach((key) => {
    //       updateDegrees(key, Math.round(result.weather[key]));
    //     });
    //   } catch (error) {
    //     console.log("Error fetching data:", error);
    //   }
    // };

    fetchDataAndUpdate(); // Call the async function

    return () => {
      // Cleanup if needed
    };
  }, [parsedDate]);

  return { timeFind, filters, fetchDataAndUpdate };
};

import { useEffect, useMemo } from "react";
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
    updateTempBase,
    updateTempMax,
    updateType,
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
      if (!result || result.message === "Error" || typeof result !== "object") {
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
        const pestMap = Object.fromEntries(
          result.data.metrics.map((p: any) => [p.name, p])
        );
        const pestData = pestMap[pest];
        if (pestData) {
          updateDailyDegreeDays(pest, Math.round(pestData.degree_days_daily));
          updateTotalDegreeDays(pest, Math.round(pestData.degree_days_total));
          updateStartDate(pest, new Date(pestData.degree_days_date_start));
          updateEndDate(pest, new Date(pestData.degree_days_date_end));
          updateTempBase(pest, Math.round(pestData.temp_base));
          updateTempMax(pest, Math.round(pestData.temp_max));
          updateType(pest, pestData.type);
        }
      });

      // Update weather data
      weatherMetrics.forEach((key) => {
        updateDegrees(key, Math.round(result.data.weather[key]));
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

    fetchDataAndUpdate(); // Call the async function

    return () => {
      // Cleanup if needed
    };
  }, [parsedDate]);

  return { timeFind, filters, fetchDataAndUpdate };
};

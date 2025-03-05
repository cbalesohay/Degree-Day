import React, { Children, useEffect, useState, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WeatherTile } from "../components/tiles/WeatherTile";
import { Wrapper } from "../components/ui/Wrapper";
import { FooterToHome } from "../components/ui/FooterToHome";
import { useStore } from "../stores/useStore";
import { useMetric } from "../stores/useMetric";
import { useDataStore } from "../stores/useFetch";
import { useTime } from "../stores/useTime";
import SelectDate from "../components/ui/SelectDate";

export default function IndividualInfoScreen({ navigation }: any) {
  // Degree day store
  const { filters } = useStore();

  // Api call
  const { fetchData } = useDataStore();

  // Degree day store

  const updateDDays = useStore((state) => state.updateDegreeDays);

  // Tempature store
  const datas = useMetric().datas;
  const updateDegrees = useMetric((state) => state.updateDegrees);

  // Time store
  const times = useTime().times;
  const updateTimes = useTime((state) => state.updateDate);

  // Date state
  const [date, setDate] = useState(() => {
    const foundDate = times.find((time) => time.name === "dateParsed")?.date;
    return foundDate ? new Date(foundDate) : new Date();
  });

  // Date parsing function
  const parseDate = (data: Date | string) => {
    if (typeof data === "string") {
      return data;
    }
    return data.toISOString().slice(0, 10);
  };

  // Date parsing / persisting
  const parsedDate = useMemo(() => parseDate(date), [date]);

  useEffect(() => {
    if (filters.length === 0 || datas.length === 0) {
      console.log("Waiting for data before fetching...");
      return;
    }

    updateTimes("dateParsed", date);
    console.log(`Parsed Date: ${parsedDate}`);

    // Define an async function inside useEffect
    const fetchDataAndUpdate = async () => {
      try {
        const result: any = await fetchData(parsedDate);

        // Check if result is valid before updating state
        if (!result || typeof result !== "object") {
          console.log("Invalid API response:", result);
          // Assign -1 to all values if there is an error
          updateDDays("Western Cherry", -1);
          updateDDays("Leaf Rollers", -1);
          updateDDays("Codling Moth", -1);
          updateDDays("Apple Scab", -1);
          updateDegrees("dayLow", -1);
          updateDegrees("dayHigh", -1);
          updateDegrees("dayAverage", -1);
          updateDegrees("current", -1);
          updateDegrees("dayRainfall", -1);
          updateDegrees("totalRainfall", -1);
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

  return (
    <>
      <Wrapper>
        <View style={styles.sectionContainer}>
          <WeatherTile navigation={navigation} />

          {/**
           * This is a temporary view
           *  To be removed after testing /
           *    or when data is up consistently
           */}
          <View style={{ paddingTop: 30 }}>
            <SelectDate date={date} setDate={setDate}>
              {times.map((time) => (
                <Text style={styles.date} key={time.name}>
                  {/* {parsedDate} */}
                  {}
                </Text>
              ))}
            </SelectDate>
          </View>
        </View>
      </Wrapper>
      <FooterToHome
        type={filters.find((t) => t.isSelected === true)?.name ?? null}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
    flex: 1,
    // backgroundColor: spotifyBlack,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "left",
    color: "white",
  },
  date: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
});

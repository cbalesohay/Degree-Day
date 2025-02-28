import React, { useEffect, useState, useCallback, useMemo } from "react";
import SelectDate from "../components/ui/SelectDate";
import { DegreeTiles } from "../components/tiles/DegreeTile";
import { spotifyBlack, spotifyDarkGrey } from "../constants/Colors";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useStore } from "../stores/useStore";
import { useMetric } from "../stores/useMetric";
import { useDataStore } from "../stores/useFetch";
import { useTime } from "../stores/useTime";
import { updateCamera } from "@react-three/fiber/dist/declarations/src/core/utils";
import { Wrapper } from "../components/ui/Wrapper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

export default function DegreeDayScreen({ navigation }: any) {
  // Api call
  const { fetchData } = useDataStore();

  // Degree day store
  const filters = useStore().filters;
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

    // Fetch Data: Single Pull

    // const data = fetchData(parsedDate);
    // data.then((result: any) => {
    //   updateDDays("Western Cherry", Math.round(result.wcDayDegreeDay));
    //   updateDDays("Leaf Rollers", Math.round(result.lrDayDegreeDay));
    //   updateDDays("Codling Moth", Math.round(result.cmDayDegreeDay));
    //   updateDDays("Apple Scab", Math.round(result.asDayDegreeDay));
    //   updateDegrees("dayLow", Math.round(result.dayLow));
    //   updateDegrees("dayHigh", Math.round(result.dayHigh));
    //   updateDegrees("dayAverage", Math.round(result.dayAverage));
    //   updateDegrees("current", Math.round(result.current));
    //   updateDegrees("dayRainfall", Math.round(result.dayRainfall));
    //   updateDegrees("totalRainfall", Math.round(result.totalRainfall));
    // });

    // Define an async function inside useEffect
    const fetchDataAndUpdate = async () => {
      try {
        const result: any = await fetchData(parsedDate);

        // Check if result is valid before updating state
        if (!result || typeof result !== "object") {
          console.error("Invalid API response:", result);
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
        console.error("Error fetching data:", error);
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
          <Text style={styles.sectionTitle}>Degree Day</Text>
          <View>
            {filters.map((filter) => (
              <View style={{ paddingBottom: 10 }} key={filter.name}>
                <DegreeTiles
                  key={filter.name}
                  name={`${filter.name}`}
                  degreeDays={filter.degreeDays}
                  tempLow={datas.find((t) => t.name === "dayLow")?.data ?? null}
                  tempHigh={
                    datas.find((t) => t.name === "dayHigh")?.data ?? null
                  }
                  navigation={navigation}
                />
              </View>
            ))}

            {/**
             * This is a temporary view
             *  To be removed after testing /
             *    or when data is up consistently
             */}
            <View style={{ paddingTop: 30 }}>
              <Text style={styles.sectionTitle}>For Testing Purposes!!!</Text>
              <SelectDate date={date} setDate={setDate}>
                {times.map((time) => (
                  <Text style={styles.date} key={time.name}>
                    {parsedDate}
                  </Text>
                ))}
              </SelectDate>
            </View>
          </View>
        </View>
      </Wrapper>
    </>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
    // backgroundColor: spotifyBlack,
  },
  titleContainer: {
    padding: 20,
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
  tile: {
    flexDirection: "row", // Display tiles in a row (left side and right side)
    marginTop: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    flex: 1,
    height: 100,
    backgroundColor: spotifyDarkGrey || "#fff",
  },
});

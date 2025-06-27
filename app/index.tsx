import React, { useEffect } from "react";
import { DegreeTiles } from "../components/tiles/DegreeTile";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../stores/useStore";
import { useMetric } from "../stores/useMetric";
import { useFetchLogic } from "@/hooks/useFetchLogic";
import { useTime } from "../stores/useTime";
import { Wrapper } from "../components/ui/Wrapper";

export default function DegreeDayScreen() {
  const filters = useStore().filters; // Degree day store
  const datas = useMetric().datas; // Tempature store
  const times = useTime().times; // Time store
  const { fetchDataAndUpdate } = useFetchLogic(); // Fetch logic from your hook

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("Fetching data...");
        await fetchDataAndUpdate(); // This will trigger your fetch data logic
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(() => {
      fetch(); // Call it again every set interval (e.g., every 5 minutes)
    }, 15 * 60 * 1000); // every 15 minutes

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [filters]); // Re-run effect if filters change (or add other necessary dependencies)

  return (
    <>
      <Wrapper>
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Degree Day</Text>
            <Text style={styles.sectionSubTitle}>
              {datas.find((t) => t.name === "curr_temp")?.data}°
            </Text>
            <Text style={styles.sectionSubTitle}>
              {times.find((time) => time.name === "dateParsed")?.displayDate}
            </Text>
          </View>

          <View>
            {filters.map((filter) => (
              <View style={{ paddingBottom: 10 }} key={filter.name}>
                <DegreeTiles
                  key={filter.name}
                  name={`${filter.name}`}
                  daily_degree_days={filter.daily_degree_days}
                  total_degree_days={filter.total_degree_days}
                  temp_low={
                    datas.find((t) => t.name === "day_low")?.data ?? null
                  }
                  temp_high={
                    datas.find((t) => t.name === "day_high")?.data ?? null
                  }
                />
              </View>
            ))}
          </View>
        </View>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    opacity: 0.6,
  },
});

import React, { useState, useEffect } from "react";
import { DegreeTiles } from "../components/tiles/DegreeTile";
import { spotifyDarkGrey } from "../constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../stores/useStore";
import { useMetric } from "../stores/useMetric";
import { useFetchLogic } from "@/hooks/useFetchLogic";
import { useTime } from "../stores/useTime";
import { Wrapper } from "../components/ui/Wrapper";
import { SettingsTile } from "@/components/tiles/SettingsTile";
import { ReCalculateButton } from "@/components/ui/ReCalculateButton";
import { AddMetric } from "@/components/tiles/AddMetric";
import { Collapsible } from "@/components/Collapsible";

export default function DegreeDayScreen() {
  const filters = useStore().filters; // Degree day store
  const datas = useMetric().datas; // Tempature store
  const times = useTime().times; // Time store
  const { fetchDataAndUpdate } = useFetchLogic(); // Fetch logic from your hook

  // useEffect to call fetchDataAndUpdate when filters or other dependencies change
  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("Fetching data...");

        // You can now call any necessary fetch/update logic from your custom hook
        await fetchDataAndUpdate(); // This will trigger your fetch data logic

        // If necessary, you can also manually call other update functions here.
        // Example: await updateDegreeDays(pest, data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(() => {
      fetch(); // Call it again every set interval (e.g., every 5 minutes)
    }, 5 * 60 * 1000); // every 5 minutes
  // }, 60 * 60 * 1000); // every 1 hour

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [filters]); // Re-run effect if filters change (or add other necessary dependencies)


  
  // const metricss = useFetchLogic();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("Fetching data...");
  //       //metricss.filters.forEach; // call API or update local state

  //       // If you need to fetch data for each filter asynchronously
  //       const fetchPromises = metricss.filters.map(async (filter) => {
  //         // Assuming you have a function to fetch data for each filter
  //         // You can make an API call or update your state here

  //         //console.log("Fetching data for filter:", filter);

  //         // Example: await fetchDataForFilter(filter);
  //       });

  //       // Wait for all fetch operations to complete
  //       await Promise.all(fetchPromises);


  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 0.1 * 60 * 1000); // every 5 minutes

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <Wrapper>
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Degree Day</Text>
            <Text style={styles.sectionSubTitle}>{datas.find((t) => t.name === "curr_temp")?.data}°</Text>
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
                  temp_low={datas.find((t) => t.name === "day_low")?.data ?? null}
                  temp_high={
                    datas.find((t) => t.name === "day_high")?.data ?? null
                  }
                />
              </View>
            ))}
          </View>

          {/* <View>
            <SettingsTile inputName="Western Cherry"/>
          </View>
          <View>
            <SettingsTile inputName="Leaf Rollers"/>
          </View>
          <View>
            <SettingsTile inputName="Codling Moth"/>
          </View>
          <View>
            <SettingsTile inputName="Apple Scab"/>
          </View> */}
          <ReCalculateButton/>
          <Collapsible title="Add" iconName="plus">
            <AddMetric />
          </Collapsible>
          <Collapsible title="Delete" iconName="minus">
            <AddMetric />
          </Collapsible>
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

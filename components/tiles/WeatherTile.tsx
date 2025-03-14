import React, { useEffect, useState } from "react";
import SelectDate from "../ui/SelectDate";
import { DegreeTiles } from "../tiles/DegreeTile";
import {
  spotifyBlack,
  spotifyDarkGrey,
  spotifyGreen,
  spotifyLightGrey,
} from "../../constants/Colors";
import { metricsData } from "@/constants/Metrics";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { useStore } from "../../stores/useStore";
import { useMetric } from "../../stores/useMetric";
import { useTime } from "../../stores/useTime";
import { location } from "../../constants/Metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons/faDroplet";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { IndividualTile } from "../tiles/IndividualTile";
// import {
//   BarChart,
//   LineChart,
//   PieChart,
//   PopulationPyramid,
//   RadarChart,
// } from "react-native-gifted-charts";

export const WeatherTile = ({ navigation }: any) => {
  // Test data
  const data = [
    { value: 0 },
    { value: 10 },
    { value: 9 },
    { value: 3 },
    { value: 14 },
    // {value: 17},
    // {value: 24},
    { value: 7 },
    { value: 32 },
    { value: 33 },
  ];

  // Degree day store
  const { filters } = useStore();
  // const updateDDays = useStore(state => state.updateDegreeDays);

  // Tempature store
  const { datas } = useMetric();

  // Time store
  const { times } = useTime();

  return (
    <>
      <View>
        
        <Text style={styles.sectionTitle}>
          {filters.find((t) => t.isSelected === true)?.name ?? null}
        </Text>

        <Text style={{ color: "white", fontSize: 12, textAlign: "center" }}>
          {location}
        </Text>

        <Text style={{ color: "white", fontSize: 45, textAlign: "center" }}>
          {filters.find((t) => t.isSelected === true)?.degreeDays === -1
            ? "No data"
            : (filters.find((t) => t.isSelected === true)?.degreeDays ?? null)}
        </Text>

        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          <>
            {datas.find((t) => t.name === "dayLow")?.data === -1 &&
            datas.find((t) => t.name === "dayHigh")?.data === -1 ? (
              <></>
            ) : (
              <>
                {"L"}
                <Text style={{ color: spotifyGreen }}>:</Text>
                {datas.find((t) => t.name === "dayLow")?.data ?? null}°{"  "}
                {"H"}
                <Text style={{ color: spotifyGreen }}>:</Text>
                {datas.find((t) => t.name === "dayHigh")?.data ?? null}°
              </>
            )}
          </>
        </Text>

        <View
          style={{
            // alignItems: 'center',
            // flex: 0.8,
            // flexDirection: 'column',
            paddingVertical: 20,
            // backgroundColor: spotifyBlack,
            width: 0,
          }}
        >
          {/* <LineChart
            thickness={6}
            color={spotifyGreen}
            maxValue={50}
            noOfSections={4}
            areaChart
            yAxisTextStyle={{ color: "lightgray" }}
            data={data}
            curved
            startFillColor={spotifyGreen}
            endFillColor={spotifyGreen}
            startOpacity={0.4}
            endOpacity={0.4}
            spacing={38}
            backgroundColor="#414141"
            rulesColor="gray"
            rulesType="solid"
            initialSpacing={0}
            yAxisColor="lightgray"
            xAxisColor="lightgray"
            dataPointsHeight={20}
            dataPointsWidth={20}
            isAnimated
            scrollToEnd
            disableScroll
          /> */}
        </View>

        <View style={styles.smallTileContainer}>
          <Text style={{ padding: 5 }}>
            <IndividualTile
              name="Rain"
              metric1={
                datas.find((t) => t.name === "dayRainfall")?.data ?? null
              }
              metric2={
                datas.find((t) => t.name === "totalRainfall")?.data ?? null
              }
            />
          </Text>
          <Text style={{ padding: 5 }}>
            <IndividualTile
              name="Humidity"
              metric1={datas.find((t) => t.name === "dayAverage")?.data ?? null}
            />
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: spotifyBlack,
  },
  smallTileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
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

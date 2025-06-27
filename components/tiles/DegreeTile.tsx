import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  spotifyDarkGrey,
  spotifyWhite,
  spotifyGreen,
} from "../../constants/Colors";
import { location } from "../../constants/Metrics";
import { LoadingDegreeTiles } from "../tiles/LoadingDegreeTile";
import { useRouter } from "expo-router";

type tile = {
  name: string;
  daily_degree_days: number | null;
  total_degree_days: number | null;
  temp_low: number | null;
  temp_high: number | null;
};
import { useStore } from "../../stores/useStore";

// Update so that if one metric goes down, the other's will still display
export const DegreeTiles = ({
  name,
  daily_degree_days,
  total_degree_days,
  temp_low,
  temp_high,
}: tile) => {
  const router = useRouter();

  // Store
  const updateSelected = useStore((state) => state.updateSelected);

  const [noData, setNoData] = useState(true);
  const [loading, setLoading] = useState(true);

  const navToIndividual = () => {
    console.log("Clicked on tile");
    updateSelected(name); // Update selected type to true
    router.push({
      pathname: "/IndividualInfoScreen",
      params: {
        name,
        daily_degree_days,
        total_degree_days,
        temp_low,
        temp_high,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    if (daily_degree_days !== -1 && temp_low !== -1 && temp_high !== -1) {
      setNoData(false);
      setLoading(false);
    } else if (daily_degree_days == -1 || temp_low == -1 || temp_high == -1) {
      setNoData(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [daily_degree_days, total_degree_days, temp_low, temp_high]);

  return (
    <TouchableOpacity style={[styles.tile]} onPress={navToIndividual}>
      {!loading ? (
        <View style={styles.tile}>
          {/* Left side: Display the name, location, and temperature */}
          <View style={styles.leftSide}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>{location}</Text>
            <View style={styles.tempContainer}>
              <Text style={styles.tempMetric}>
                {!noData ? (
                  <>
                    {"L"}
                    <Text style={styles.colon}>:</Text>
                    {temp_low}
                    {"°"}
                    {"  "}
                    {"H"}
                    <Text style={styles.colon}>:</Text>
                    {temp_high}
                    {"°"}
                  </>
                ) : (
                  "No data"
                )}
              </Text>
            </View>
          </View>

          {/* Right side: Display only the degreeDays */}
          <View style={styles.rightSide}>
            {!noData ? (
              <>
                <Text style={styles.degreeDayMetric}>
                  {daily_degree_days}
                  <Text style={{ fontSize: 15 }}> Daily</Text>
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.degreeDayNoData}>No data</Text>
              </>
            )}
            {!noData ? (
              <>
                <Text style={styles.totalDegreeDayMetric}>
                  {total_degree_days}
                  <Text style={{ fontSize: 15, color: spotifyGreen }}>
                    {" "}
                    Total
                  </Text>
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.degreeDayNoData}>No data</Text>
              </>
            )}
          </View>
        </View>
      ) : (
        <LoadingDegreeTiles />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    flexDirection: "row", // Display tiles in a row (left side and right side)
    marginTop: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    flex: 1,
    height: 100,
    backgroundColor: spotifyDarkGrey || "#fff",
  },
  leftSide: {
    flex: 2, // Take 2/3 of the tile width
    paddingLeft: 15,
  },
  rightSide: {
    flex: 1, // Take 1/3 of the tile width
    alignItems: "flex-end",
    paddingTop: 10,
    paddingRight: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 800,
    color: spotifyWhite,
    textAlign: "left",
    paddingTop: 10,
  },
  location: {
    fontSize: 12,
    fontWeight: 300,
    color: spotifyWhite,
    textAlign: "left",
  },
  degreeDayMetric: {
    fontSize: 40,
    fontWeight: 400,
    color: spotifyWhite,
    textAlign: "right",
  },
  totalDegreeDayMetric: {
    fontSize: 20,
    fontWeight: 400,
    color: spotifyWhite,
    textAlign: "right",
  },
  degreeDayNoData: {
    fontSize: 20,
    fontWeight: 400,
    color: spotifyWhite,
    textAlign: "right",
  },
  tempContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 15,
  },
  tempMetric: {
    fontSize: 15,
    fontWeight: 400,
    color: spotifyWhite,
    textAlign: "center",
  },
  colon: {
    color: spotifyGreen,
  },
});

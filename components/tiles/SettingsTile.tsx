import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  spotifyDarkGrey,
  spotifyWhite,
  spotifyGreen,
} from "../../constants/Colors";
import { LoadingDegreeTiles } from "./LoadingDegreeTile";
import DateTimePicker from "@react-native-community/datetimepicker";

type tile = {
  name: string;
  metric1?: number | null;
  metric2?: number | null;
};

export const SettingsTile = () => {
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  // useEffect(() => {
  //   setLoading(true);
  //   if (metric1 !== -1 && metric2 !== -1) {
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [metric1, metric2]);

  return (
    <>
      <View style={[styles.tile]}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingTop: 5,
            paddingBottom: 15,
            fontSize: 30,
          }}
        >
          Western Cherry
        </Text>

        <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              paddingTop: 5,
              fontSize: 20,
            }}
          >
            Start Date:
          </Text>

          <View style={{ alignItems: "center", padding: 5 }}>
            <DateTimePicker
              value={new Date("2025-03-02")}
              mode="date"
              display="default"
              minimumDate={new Date(`${currentYear}-01-02`)}
              maximumDate={new Date(`${currentYear + 1}-01-01`)} // Need to change to the day of the last day so you cant make the start date after the end date
              onChange={(_, selectedDate) => {
                // if (selectedDate) {
                //   updateTimes("dateParsed", selectedDate);
                // }
                // if (Platform.OS !== "ios") {
                //   setShowPicker(false); // Hide picker after selection
                // }
              }}
              textColor="white"
            />
          </View>
        </View>

        <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              paddingTop: 5,
              fontSize: 20,
            }}
          >
            End Date:
          </Text>

            {/** 
             * For even spacing
             */}
          <Text>{"  "}</Text>

          <View style={{ alignItems: "center", padding: 5}}>
            <DateTimePicker
              value={new Date("2025-03-02")}
              mode="date"
              display="default"
              minimumDate={new Date(`${currentYear}-01-02`)}
              maximumDate={new Date(`${currentYear + 1}-01-01`)}
              onChange={(_, selectedDate) => {
                // if (selectedDate) {
                //   updateTimes("dateParsed", selectedDate);
                // }
                // if (Platform.OS !== "ios") {
                //   setShowPicker(false); // Hide picker after selection
                // }
              }}
              textColor="white"
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tile: {
    marginTop: 10,
    borderRadius: 20,
    height: 160,
    width: 300,
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
  loadingTile: {
    // Apply transparent grey overlay when loading
    backgroundColor: "#f0f0f0",
    opacity: 0.6, // Grey out the tile during loading
  },
  tileContainer: {
    flex: 1,

    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: 800,
    color: spotifyWhite,
    textAlign: "center",
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
  metric: {
    fontSize: 15,
    fontWeight: 400,
    color: spotifyWhite,
    textAlign: "center",
  },
  colon: {
    color: spotifyGreen,
  },
});

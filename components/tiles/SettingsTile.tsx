import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  spotifyDarkGrey,
  spotifyWhite,
  spotifyGreen,
} from "../../constants/Colors";
import { LoadingDegreeTiles } from "./LoadingDegreeTile";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useStore } from "../../stores/useStore";
import { useChangeDate } from "@/stores/useChangeDate";

type tile = {
  inputName: string;
};

export const SettingsTile = ({ inputName }: tile) => {
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  // Degree day store
  const filters = useStore().filters;

  const changeDate = useChangeDate((state) => state.changeDate);

  return (
    <>
      <View style={[styles.tile]}>
        {/* <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingTop: 5,
            paddingBottom: 15,
            fontSize: 30,
          }}
        >
          {inputName}
        </Text> */}

        <View
          style={{
            paddingLeft: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
              value={
                filters.find((n) => n.name === inputName)?.startDate ??
                new Date(`${currentYear}-01-02`)
              }
              mode="date"
              display="default"
              minimumDate={new Date(`${currentYear}-01-02`)}
              maximumDate={
                filters.find((n) => n.name === inputName)?.endDate ??
                new Date(`${currentYear + 1}-01-01`)
              } // Need to change to the day of the last day so you cant make the start date after the end date
              onChange={async (event, selectedDate) => {
                selectedDate = new Date(selectedDate ?? Date.now());
                selectedDate.setHours(0, 0, 0, 0); // Set time to midnight

                if (event.type === "set" && selectedDate) {
                  try {
                    changeDate(inputName, selectedDate, null);
                    console.log("Start Date Change: " + selectedDate);
                  } catch (error) {
                    console.error("Error changing start date:", error);
                    throw error; // Rethrow the error to be caught in the catch block
                  }
                }
              }}
              textColor="white"
            />
          </View>
        </View>

        <View
          style={{
            paddingLeft: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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

          <View style={{ alignItems: "center", padding: 5 }}>
            <DateTimePicker
              value={
                filters.find((n) => n.name === inputName)?.endDate ??
                new Date(`${currentYear}-01-02`)
              }
              mode="date"
              display="default"
              minimumDate={new Date(`${currentYear}-01-02`)}
              maximumDate={new Date(`${currentYear + 1}-01-01`)}
              onChange={async (event, selectedDate) => {
                selectedDate = new Date(selectedDate ?? Date.now());
                selectedDate.setHours(0, 0, 0, 0); // Set time to midnight

                if (event.type === "set" && selectedDate) {
                  try {
                    await changeDate(inputName, null, selectedDate);
                    console.log("End Date Change Temps: " + selectedDate);
                  } catch (error) {
                    console.error("Error changing end date:", error);
                    throw error; // Rethrow the error to be caught in the catch block
                  }
                }
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    height: 100,
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

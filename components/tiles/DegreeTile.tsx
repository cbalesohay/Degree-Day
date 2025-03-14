import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
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
  degreeDays: number | null;
  tempLow: number | null;
  tempHigh: number | null;
};
import { useStore } from "../../stores/useStore";

// Update so that if one metric goes down, the other's will still display
export const DegreeTiles = ({ name, degreeDays, tempLow, tempHigh }: tile) => {
  const router = useRouter();

  // Degree day store
  const filters = useStore().filters;
  const updateSelected = useStore((state) => state.updateSelected);

  const [noData, setNoData] = useState(true);
  const [loading, setLoading] = useState(true);

  const navToIndividual = () => {
    console.log("Clicked on tile");
    updateSelected(name); // Update selected type to true
    // router.push({
    //   pathname: "/IndividualInfoScreen",
    //   params: {
    //     name,
    //     degreeDays,
    //     tempLow,
    //     tempHigh,
    //   },
    router.push({
      pathname: "/SwipablePages",
      params: {
        name,
        degreeDays,
        tempLow,
        tempHigh,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    if (degreeDays !== -1 && tempLow !== -1 && tempHigh !== -1) {
      setNoData(false);
      setLoading(false);
    } else if (degreeDays == -1 || tempLow == -1 || tempHigh == -1) {
      setNoData(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [degreeDays, tempLow, tempHigh]);

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
                    {tempLow}
                    {"°"}
                    {"  "}
                    {"H"}
                    <Text style={styles.colon}>:</Text>
                    {tempHigh}
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
                  {degreeDays}
                  <Text style={{ fontSize: 10 }}> DDA</Text>
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
    shadowRadius: 6,
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

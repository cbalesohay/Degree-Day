import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { spotifyWhite } from "../../constants/Colors";

export const LoadingDegreeTiles = () => {
  return (
    <TouchableOpacity disabled={true}>
      <View style={styles.loadingTile}>
        {/* Left side: Display the name, location, and temperature */}
        <View style={styles.leftSide}>
          <Text style={styles.name}>Loading...</Text>
          <Text style={styles.location}>Sandpoint, ID</Text>
          <View style={styles.tempContainer}>
            <Text style={styles.tempMetric}>'Loading...'</Text>
          </View>
        </View>

        {/* Right side: Display only the degreeDays */}
        <View style={styles.rightSide}>
          <Text style={styles.degreeDayNoData}>Loading...</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loadingTile: {
    // Apply transparent grey overlay when loading
    backgroundColor: "#f0f0f0",
    opacity: 0.6, // Grey out the tile during loading
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
});

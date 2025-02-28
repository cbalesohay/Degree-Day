import React, { Children, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const { width } = Dimensions.get("window");
import {
  spotifyDarkGrey,
  spotifyWhite,
  spotifyGreen,
} from "../../constants/Colors";
import { LoadingDegreeTiles } from "../tiles/LoadingDegreeTile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type tile = {
  type: string;
  name: string;
  metric1?: number | null;
  metric1Title?: string | null;
  metric2?: number | null;
  metric2Title?: string | null;
  navigation: string | any;
};

export const IndividualTile = ({
  type,
  name,
  metric1,
  metric1Title,
  metric2,
  metric2Title,
  navigation,
}: tile) => {
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (metric1 !== -1 && metric2 !== -1) {
      setNoData(false);
      setLoading(false);
    } else {
      setNoData(true);
      setLoading(false);
    }
  }, [metric1, metric2]);

  return (
    <>
      <TouchableOpacity
        style={[styles.tile]}
        // onPress={!noData ? navToIndividual : undefined}
        //   onPress={navToIndividual}
        // disabled={noData} // Disable button when data is loading
      >
        {!loading ? (
          <View style={styles.tile}>
            {/* Left side: Display the name, location, and temperature */}
            <View style={styles.tileContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.tileContainer}>
              <Text style={styles.metric}>Daily Rain: {metric1}</Text>
            </View>
            <View style={styles.tileContainer}>
              <Text style={styles.metric}>Total Rain: {metric2} </Text>
            </View>
          </View>
        ) : (
          <LoadingDegreeTiles />
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  tile: {
    marginTop: 10,
    borderRadius: 20,
    // shadowColor: '#000',
    // shadowOpacity: .1,
    // shadowRadius: 6,
    // flex: 1,
    height: 100,
    width: 150,
    backgroundColor: spotifyDarkGrey || "#fff",
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

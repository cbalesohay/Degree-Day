import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { spotifyDarkGrey, spotifyWhite } from "../../constants/Colors";
import { LoadingDegreeTiles } from "../tiles/LoadingDegreeTile";

type tile = {
  name: string;
  metric1?: number | null;
  metric2?: number | null;
};

export const IndividualTile = ({ name, metric1, metric2 }: tile) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (metric1 !== -1 && metric2 !== -1) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [metric1, metric2]);

  return (
    <>
      <TouchableOpacity style={[styles.tile]}>
        {!loading ? (
          <View style={styles.tile}>
            {/* Left side: Display the name, location, and temperature */}
            <View style={styles.tileContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>

            <View style={styles.tileContainer}>
              <Text style={styles.metric}>
                <Text>
                  {metric1 === -1
                    ? "No data"
                    : `${
                        name === "Humidity" ? "Current:" : "Daily:"
                      } ${metric1}${name === "Rain" ? " in." : "%"}`}
                </Text>
              </Text>
            </View>

            {metric2 ? (
              <View style={styles.tileContainer}>
                <Text style={styles.metric}>
                  <Text>
                    {metric2 === -1
                      ? "No data"
                      : `YTD Total: ${metric2}${name === "Rain" ? " in." : ""}`}
                  </Text>
                </Text>
              </View>
            ) : (
              <View style={styles.tileContainer}></View> // For Spacing
            )}
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
    height: 100,
    width: 150,
    backgroundColor: spotifyDarkGrey || "#fff",
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
  metric: {
    fontSize: 15,
    fontWeight: 400,
    color: spotifyWhite,
    textAlign: "center",
  },
});

import React from "react";
import { spotifyGreen, spotifyLightGrey } from "../../constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../../stores/useStore";
import { useMetric } from "../../stores/useMetric";
import { location } from "../../constants/Metrics";
import { IndividualTile } from "../tiles/IndividualTile";

export const WeatherTile = ({ navigation }: any) => {
  // Degree day store
  const { filters } = useStore();

  // Tempature store
  const { datas } = useMetric();

  return (
    <>
      <View>
        <Text style={styles.sectionTitle}>
          {filters.find((t) => t.isSelected === true)?.name ?? null}
        </Text>

        <Text style={{ color: "white", fontSize: 12, textAlign: "center" }}>
          {location}
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 45,
            textAlign: "center",
            marginLeft: 30,
          }}
        >
          {filters.find((t) => t.isSelected === true)?.daily_degree_days === -1
            ? "No data"
            : filters.find((t) => t.isSelected === true)?.daily_degree_days ??
              null}
          <Text
            style={{
              color: spotifyLightGrey,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {" "}
            {filters.find((t) => t.isSelected === true)?.total_degree_days ===
            -1
              ? ""
              : filters.find((t) => t.isSelected === true)?.total_degree_days ??
                null}
          </Text>
        </Text>

        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          <>
            {datas.find((t) => t.name === "day_low")?.data === -1 &&
            datas.find((t) => t.name === "day_high")?.data === -1 ? (
              <></>
            ) : (
              <>
                {"L"}
                <Text style={{ color: spotifyGreen }}>:</Text>
                {datas.find((t) => t.name === "day_low")?.data ?? null}°{"  "}
                {"H"}
                <Text style={{ color: spotifyGreen }}>:</Text>
                {datas.find((t) => t.name === "day_high")?.data ?? null}°
              </>
            )}
          </>
        </Text>

        {/* <View style={styles.smallTileContainer}>
          <View >
            <IndividualTile
              name="Rain"
              metric1={
                datas.find((t) => t.name === "day_rainfall")?.data ?? null
              }
              metric2={
                datas.find((t) => t.name === "total_rainfall")?.data ?? null
              }
            />
          </View>
          <View >
            <IndividualTile
              name="Humidity"
              metric1={
                datas.find((t) => t.name === "curr_humidity")?.data ?? null
              }
            />
          </View>
        </View> */}

        <View style={styles.smallTileContainer}>
          <View style={styles.tileWrapper}>
            <IndividualTile
              name="Rain"
              metric1={
                datas.find((t) => t.name === "day_rainfall")?.data ?? null
              }
              metric2={
                datas.find((t) => t.name === "total_rainfall")?.data ?? null
              }
            />
          </View>
          <View style={styles.tileWrapper}>
            <IndividualTile
              name="Humidity"
              metric1={
                datas.find((t) => t.name === "curr_humidity")?.data ?? null
              }
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
  smallTileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    gap: 10,
  },
  tileWrapper: {
    flex: 1,
  },
});

import React from "react";
import { DegreeTiles } from "../components/tiles/DegreeTile";
import { spotifyDarkGrey } from "../constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../stores/useStore";
import { useMetric } from "../stores/useMetric";
import { useTime } from "../stores/useTime";
import { Wrapper } from "../components/ui/Wrapper";

export default function DegreeDayScreen() {
  const filters = useStore().filters; // Degree day store
  const datas = useMetric().datas; // Tempature store
  const times = useTime().times; // Time store

  return (
    <>
      <Wrapper>
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>Degree Day</Text>
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
                  degreeDays={filter.degreeDays}
                  tempLow={datas.find((t) => t.name === "dayLow")?.data ?? null}
                  tempHigh={
                    datas.find((t) => t.name === "dayHigh")?.data ?? null
                  }
                />
              </View>
            ))}
          </View>
        </View>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
  },
  titleContainer: {
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
  date: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  tile: {
    flexDirection: "row",
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

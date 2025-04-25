import React from "react";
import { DegreeTiles } from "../components/tiles/DegreeTile";
import { spotifyDarkGrey } from "../constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../stores/useStore";
import { useMetric } from "../stores/useMetric";
import { useTime } from "../stores/useTime";
import { Wrapper } from "../components/ui/Wrapper";
import { SettingsTile } from "@/components/tiles/SettingsTile";

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
                  dailyDegreeDays={filter.dailyDegreeDays}
                  totalDegreeDays={filter.totalDegreeDays}
                  tempLow={datas.find((t) => t.name === "dayLow")?.data ?? null}
                  tempHigh={
                    datas.find((t) => t.name === "dayHigh")?.data ?? null
                  }
                />
              </View>
            ))}
          </View>

          {/* <View>
            <SettingsTile inputName="Western Cherry"/>
          </View>
          <View>
            <SettingsTile inputName="Leaf Rollers"/>
          </View>
          <View>
            <SettingsTile inputName="Codling Moth"/>
          </View>
          <View>
            <SettingsTile inputName="Apple Scab"/>
          </View> */}

        </View>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
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
});

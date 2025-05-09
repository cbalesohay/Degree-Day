import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WeatherTile } from "../components/tiles/WeatherTile";
import { Wrapper } from "../components/ui/Wrapper";
import { FooterToHome } from "../components/ui/FooterToHome";
import SelectDate from "../components/ui/SelectDate";
import { useFetchLogic } from "../hooks/useFetchLogic";
import { useStore } from "../stores/useStore";
import { SettingsTile } from "../components/tiles/SettingsTile";

export default function IndividualInfoScreen({ navigation }: any) {
  // const { timeFind, filter } = useFetchLogic();
  const {
      filters,
      updateDegreeDays,
      updateDailyDegreeDays,
      updateTotalDegreeDays,
      updateStartDate,
      updateEndDate,
    } = useStore();

  return (
    <>
      <Wrapper>
        <View style={styles.sectionContainer}>
          <WeatherTile navigation={navigation} />

          {/* <View style={{ paddingTop: 30, alignItems: "center" }}>
            <SelectDate date={timeFind} />
          </View> */}

          <View style={{ paddingTop: 10, alignItems: "center" }}>
            <SettingsTile inputName={filters.find((t) => t.isSelected === true)?.name ?? "Western Cherry"}/>
          </View>
        </View>
      </Wrapper>
      <FooterToHome
        type={filters.find((t) => t.isSelected === true)?.name ?? null}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
    flex: 1,
  },
});

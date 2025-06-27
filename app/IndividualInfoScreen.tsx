import React from "react";
import { StyleSheet, View } from "react-native";
import { WeatherTile } from "../components/tiles/WeatherTile";
import { Wrapper } from "../components/ui/Wrapper";
import { FooterToHome } from "../components/ui/FooterToHome";
import { useStore } from "../stores/useStore";
import { SettingsTile } from "../components/tiles/SettingsTile";

export default function IndividualInfoScreen({ navigation }: any) {
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
        <View>
          <View style={{ paddingTop: 0, justifyContent: "center" }}>
            <WeatherTile navigation={navigation} />
          </View>
          <View
            style={{
              paddingTop: 10,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <SettingsTile
              inputName={
                filters.find((t) => t.isSelected === true)?.name ??
                "Western Cherry"
              }
            />
          </View>
        </View>
      </Wrapper>
      <FooterToHome
        type={filters.find((t) => t.isSelected === true)?.name ?? null}
      />
    </>
  );
}
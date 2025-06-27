import React from "react";
import { View } from "react-native";
import { WeatherTile } from "../components/tiles/WeatherTile";
import { Wrapper } from "../components/ui/Wrapper";
import { FooterToHome } from "../components/ui/FooterToHome";
import { useStore } from "../stores/useStore";
import { SettingsTile } from "../components/tiles/SettingsTile";

export default function IndividualInfoScreen({ navigation }: any) {
  const { filters } = useStore();

  return (
    <>
      <Wrapper>
        <View style={{ width: "80%", alignSelf: "center" }}>
          <WeatherTile navigation={navigation} />
        </View>
        <View style={{ width: "80%", alignSelf: "center", paddingTop: 10 }}>
          <SettingsTile
            inputName={
              filters.find((t) => t.isSelected === true)?.name ??
              "Western Cherry"
            }
          />
        </View>
      </Wrapper>
      <FooterToHome
        type={filters.find((t) => t.isSelected === true)?.name ?? null}
      />
    </>
  );
}

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WeatherTile } from "../components/tiles/WeatherTile";
import { Wrapper } from "../components/ui/Wrapper";
import { FooterToHome } from "../components/ui/FooterToHome";
import SelectDate from "../components/ui/SelectDate";
import { useFetchLogic } from "../hooks/useFetchLogic";

export default function IndividualInfoScreen({ navigation }: any) {
  const { timeFind, filters } = useFetchLogic();

  return (
    <>
      <Wrapper>
        <View style={styles.sectionContainer}>
          <WeatherTile navigation={navigation} />

          <View style={{ paddingTop: 30, alignItems: "center" }}>
            <SelectDate date={timeFind} />
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

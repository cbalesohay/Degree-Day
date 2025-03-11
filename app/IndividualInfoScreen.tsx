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

          {/**
           * This is a temporary view
           *  To be removed after testing /
           *    or when data is up consistently
           */}
          <View style={{ paddingTop: 30, alignItems: "center" }}>
            <SelectDate date={timeFind} />
          </View>
        </View>
      </Wrapper>
      <FooterToHome
        type={filters.find((t) => t.isSelected === true)?.name ?? null}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
    flex: 1,
    // backgroundColor: spotifyBlack,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "left",
    color: "white",
  },
  date: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
});

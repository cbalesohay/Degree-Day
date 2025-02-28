import React, { Children, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  spotifyDarkGrey,
  spotifyLightGrey,
  spotifyWhite,
  spotifyBlack,
  spotifyGreen,
} from "../constants/Colors";
// import { PageIndicator } from "../../components/ui/PageIndicator";
import { WeatherTile } from "../components/tiles/WeatherTile";
import { Wrapper } from "../components/ui/Wrapper";
import { FooterToHome } from "../components/ui/FooterToHome";
import { useStore } from "../stores/useStore";

export default function IndividualInfoScreen ({ navigation }: any) {
  // Degree day store
  const { filters } = useStore();

  return (
    <>
      <Wrapper>
        <View style={styles.sectionContainer}>
          <WeatherTile navigation={navigation} />
        </View>
      </Wrapper>
      <FooterToHome
        type={filters.find((t) => t.isSelected === true)?.name ?? null}
        navigation={navigation}
      />
    </>
  );
};

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
});

import React from "react";
import { useEffect, useState } from "react";
import {
  backgroundColorPrimary,
  spotifyBlack,
  spotifyWhite,
} from "../../constants/Colors";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import {SafeAreaView} from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useStore } from "../../stores/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { useRouter } from "expo-router";

type footer = {
  type: string;
  navigation: string | any;
};

export const FooterToHome = ({ name, navigation }: any) => {
  const router = useRouter();

  // Degree day store
  const { filters } = useStore();
  const resetSelected = useStore((state) => state.resetSelected);

  const navToHome = () => {
    console.log("Clicked on tile");
    resetSelected(name); // Update selected type to true
    // navigation.navigate("Degree Day");
    router.back();
    
  };

  return (
    <TouchableOpacity onPress={navToHome} style={styles.backgroundStyle}>
      <FontAwesomeIcon
        icon={faBars}
        color="white"
        style={styles.buttonStyle}
        size={25}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    bottom: 0,
    margin: 40,
    position: "absolute",
  },
  buttonStyle: {
    color: spotifyWhite,
    margin: 10,
    alignSelf: "flex-end",
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
  },
});

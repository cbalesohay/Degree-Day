import React from "react";
import { spotifyWhite } from "../../constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useStore } from "../../stores/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { useRouter } from "expo-router";

export const FooterToHome = ({ name }: any) => {
  const router = useRouter();

  const resetSelected = useStore((state) => state.resetSelected);

  const navToHome = () => {
    console.log("Clicked on tile");
    resetSelected(name); // Update selected type to true
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
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";

// Props: totalDots (number of dots), activeIndex (currently active dot index)
export const PageIndicator = ({ totalDots, activeIndex }: any) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalDots }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10, // Add some spacing around the dots
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5, // Makes the dots circular
    marginHorizontal: 5, // Spacing between dots
  },
  inactiveDot: {
    backgroundColor: "#919191", // inactive dots
  },
  activeDot: {
    backgroundColor: "#ffffff", // active dot
  },
});

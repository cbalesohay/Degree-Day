import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import IndividualInfoScreen from "./IndividualInfoScreen";
import { FooterToHome } from "@/components/ui/FooterToHome";
import { useFetchLogic } from "@/hooks/useFetchLogic";
import { useStore } from "@/stores/useStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default function SwipeablePages() {
  //   const { timeFind, filters } = useFetchLogic();
  const filters = useStore().filters; // Degree day store

  return (
    <>
      <View style={styles.container}>
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          //   scrollEnabled={true}
          scrollEnabled={false}
          overScrollMode="never"
        >
          <View key="1" style={styles.page}>
            <Text style={styles.text}>Page 1</Text>
            <IndividualInfoScreen />
          </View>

          <View key="2" style={styles.page}>
            <Text style={styles.text}>Page 2</Text>
            <IndividualInfoScreen />
          </View>

          <View key="3" style={styles.page}>
            <Text style={styles.text}>Page 3</Text>
            <IndividualInfoScreen />
          </View>
        </PagerView>
      </View>
      <FooterToHome
        type={filters.find((t) => t.isSelected === true)?.name ?? null}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden", // Prevents unexpected movement
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

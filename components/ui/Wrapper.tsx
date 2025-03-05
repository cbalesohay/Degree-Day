import React, { Children } from "react";
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
  View,
} from "react-native";

export const Wrapper = ({ children }: any) => {
  
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ flex: 1 }}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: spotifyBlack,
    flex: 1,
  },
});

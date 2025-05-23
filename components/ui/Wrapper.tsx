import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  RefreshControl,
} from "react-native";

const { height } = Dimensions.get("window");

type WrapperProps = {
  children: React.ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
};


export const Wrapper = ({ children, refreshing, onRefresh }: WrapperProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
          ) : undefined}
      >
        <View style={styles.innerView}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerView: {
    flex: 1,
  },
});

import React from "react";
import { SafeAreaView, ScrollView, View, RefreshControl } from "react-native";

type WrapperProps = {
  children: React.ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export const Wrapper = ({ children, refreshing, onRefresh }: WrapperProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        <View style={{ flex: 1 }}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

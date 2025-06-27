import React from "react";
import { Text, View } from "react-native";

export const AddMetric = () => {
  return (
    <>
      <View>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Coming soon!
        </Text>
        <Text>Coming soon!</Text>

        {/* Create a form to add a pest or crop */}
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Form to add a pest or crop will be here.
        </Text>
        <View style={{ paddingTop: 10 }}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            How to add a pest or crop?
          </Text>
          <Text style={{ color: "white" }}>
            {/* 1. Click on the "Add Metric" button.
            2. Fill in the required details in the form.
            3. Submit the form to add the pest or crop to your list. */}
          </Text>
        </View>
      </View>
    </>
  );
};
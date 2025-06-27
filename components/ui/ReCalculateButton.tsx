import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { useFetchLogic } from "@/hooks/useFetchLogic";
import { useResetYear } from "../../stores/useResetYear";
import { TouchableOpacity } from "react-native";
import { spotifyLightGrey } from "@/constants/Colors";

const ConfirmationButtons = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <View>
    <View style={{ width: "80%", alignSelf: "center" }}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          paddingTop: 5,
          paddingBottom: 15,
          fontSize: 20,
        }}
      >
        Warning:{"\n"}This action will re-calculate all data for the current
        year.
      </Text>
    </View>
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View
        style={{
          width: 100,
          marginTop: 10,
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: spotifyLightGrey,
          marginRight: 5,
        }}
      >
        <Button title="Reset" color="red" onPress={onConfirm} />
      </View>

      <View
        style={{
          width: 100,
          marginTop: 10,
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: spotifyLightGrey,
          marginLeft: 5,
        }}
      >
        <Button title="Cancel" color="white" onPress={onCancel} />
      </View>
    </View>
  </View>
);

export const ReCalculateButton = () => {
  const textString = "Reset Year";
  const [changeText, setChangeText] = useState(textString);
  const [showConfirm, setShowConfirm] = useState(false);

  const reset = useResetYear((state) => state.resetData);
  const { fetchDataAndUpdate } = useFetchLogic(); // Fetch logic from your hook

  const fetch = async () => {
    try {
      console.log("Fetching data...");

      // You can now call any necessary fetch/update logic from your custom hook
      await fetchDataAndUpdate(); // This will trigger your fetch data logic

      // If necessary, you can also manually call other update functions here.
      // Example: await updateDegreeDays(pest, data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Re-Calc data, "Calculating..." text till status is okay
  useEffect(() => {
    const doReset = async (year: number) => {
      try {
        await reset(year);
        setChangeText(textString);
        setShowConfirm(false);
        await fetch(); // Fetch new data after reset
        console.log("Data reset successfully");
      } catch (error) {
        console.log("Error resetting data:", error);
      }
    };

    if (changeText === "Calculating...") {
      doReset(2025);
    }
  }, [changeText]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!showConfirm) {
          setShowConfirm(true);
        }
      }}
    >
      {!showConfirm ? (
        <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingTop: 5,
            paddingBottom: 15,
            fontSize: 30,
          }}
        >
          {changeText}
        </Text>
      ) : (
        <ConfirmationButtons
          onConfirm={() => {
            setChangeText("Calculating...");
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </TouchableOpacity>
  );
};
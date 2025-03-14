import React, { useEffect } from "react";
import { StyleSheet, View, Platform, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTime } from "../../stores/useTime";

function SelectDate({ date }: any) {
  const updateTimes = useTime((state) => state.updateDate); // Time update function
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (Platform.OS === "ios") {
      setShowPicker(true);
    }
  }, []);
  return (
    <>
      <View style={styles.container}>
        {Platform.OS !== "ios" && (
          <Button title="Select Date" onPress={() => setShowPicker(true)} />
        )}
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date("2023-07-02")}
            maximumDate={new Date()}
            onChange={(_, selectedDate) => {
              if (selectedDate) {
                updateTimes("dateParsed", selectedDate);
              }
              if (Platform.OS !== "ios") {
                setShowPicker(false); // Hide picker after selection
              }
            }}
            textColor="white"
          />
        )}
      </View>
    </>
  );
}

export default SelectDate;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  degreeDays: {
    fontSize: 25,
    textAlign: "center",
  },
});

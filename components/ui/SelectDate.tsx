import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTime } from "../../stores/useTime";

function SelectDate({ date }: any) {
  const updateTimes = useTime((state) => state.updateDate); // Time update function

  return (
    <>
      <View style={styles.container}>
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
          }}
          textColor="white"
        />
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

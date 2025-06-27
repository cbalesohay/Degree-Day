import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  spotifyDarkGrey,
  spotifyLightGrey,
} from "../../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useStore } from "../../stores/useStore";
import { useChangeDate } from "@/stores/useChangeDate";
import { useFetchLogic } from "@/hooks/useFetchLogic";

type settingsTileProp = {
  inputName: string;
};

export const SettingsTile = ({ inputName }: settingsTileProp) => {
  const currentYear = new Date().getFullYear();

  // Degree day store
  const filters = useStore().filters;

  const changeDate = useChangeDate((state) => state.changeDate);
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

  const [isEditingStart, setIsEditingStart] = useState(false);
  const [isEditingEnd, setIsEditingEnd] = useState(false);
  const [isEditingBase, setIsEditingBase] = useState(false);
  const [isEditingMax, setIsEditingMax] = useState(false);
  const [isEditingType, setIsEditingType] = useState(false);

  const filter = filters.find((n) => n.name === inputName);
  const type = filter?.type ?? "Unknown";
  const startDate = filter?.start_date ?? new Date(`${currentYear}-01-02`);
  const endDate = filter?.end_date ?? new Date(`${currentYear}-01-02`);

  return (
    <>
      <View style={{ flexDirection: "row", width: "70%" }}>
        <View
          style={{
            backgroundColor: spotifyDarkGrey,
            padding: 10,
            borderRadius: 20,
            width: "100%",
          }}
        >
          {/* Type Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Type:</Text>
            {isEditingType ? (
              <Text style={{ color: "white", fontSize: 16 }}>Text Editing</Text>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white", fontSize: 16 }}>{type}</Text>
              </View>
            )}

            <TouchableOpacity onPress={() => setIsEditingType(!isEditingType)}>
              <Text style={{ color: spotifyLightGrey, fontSize: 16 }}>
                {isEditingType ? "X" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Start Date Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Date Start:</Text>
            {isEditingStart ? (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                minimumDate={new Date(`${currentYear}-01-02`)}
                maximumDate={endDate}
                onChange={async (_, selectedDate) => {
                  setIsEditingStart(false);
                  if (selectedDate) {
                    selectedDate.setHours(0, 0, 0, 0);
                    try {
                      await changeDate(inputName, selectedDate, null);
                      await fetch(); // Fetch new data after changing the date
                    } catch (error) {
                      console.error("Error changing start date:", error);
                    }
                  }
                }}
                textColor="white"
              />
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {startDate.toISOString().slice(0, 10)}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => setIsEditingStart(!isEditingStart)}
            >
              <Text style={{ color: spotifyLightGrey, fontSize: 16 }}>
                {isEditingStart ? "X" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* End Date Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Date End:</Text>
            {isEditingEnd ? (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                minimumDate={startDate}
                maximumDate={new Date(`${currentYear + 1}-01-01`)}
                onChange={async (_, selectedDate) => {
                  setIsEditingEnd(false);
                  if (selectedDate) {
                    selectedDate.setHours(0, 0, 0, 0);
                    try {
                      await changeDate(inputName, null, selectedDate);
                      await fetch(); // Fetch new data after changing the date
                    } catch (error) {
                      console.error("Error changing end date:", error);
                    }
                  }
                }}
                textColor="white"
              />
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {endDate.toISOString().slice(0, 10)}
                </Text>
              </View>
            )}

            <TouchableOpacity onPress={() => setIsEditingEnd(!isEditingEnd)}>
              <Text style={{ color: spotifyLightGrey, fontSize: 16 }}>
                {isEditingEnd ? "X" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Temp Base Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Temp Base:</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {isEditingBase ? 0 : filter?.temp_base}°
            </Text>

            <TouchableOpacity onPress={() => setIsEditingBase(!isEditingBase)}>
              <Text style={{ color: spotifyLightGrey, fontSize: 16 }}>
                {isEditingBase ? "X" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Temp Max Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Temp Max:</Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {isEditingMax ? 0 : filter?.temp_max}°
            </Text>

            <TouchableOpacity onPress={() => setIsEditingMax(!isEditingMax)}>
              <Text style={{ color: spotifyLightGrey, fontSize: 16 }}>
                {isEditingMax ? "X" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Edit Button Row */}
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 10,
            justifyContent: "space-between",
            marginTop: 13,
            marginBottom: 12,
          }}
        >
        </View>
      </View>
    </>
  );
};

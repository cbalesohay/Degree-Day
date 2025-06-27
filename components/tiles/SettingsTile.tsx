import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { spotifyDarkGrey, spotifyLightGrey } from "../../constants/Colors";
import { useStore } from "../../stores/useStore";
import { useChangeDate } from "@/stores/useChangeDate";
import { useFetchLogic } from "@/hooks/useFetchLogic";

type SettingsTileProps = {
  inputName: string;
};

type EditableRowProps = {
  label: string;
  isEditing: boolean;
  value: string | JSX.Element;
  onEditPress: () => void;
  editingComponent?: JSX.Element;
};

const EditableRow = ({
  label,
  isEditing,
  value,
  onEditPress,
  editingComponent,
}: EditableRowProps) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    }}
  >
    <Text style={{ color: "white", fontSize: 18 }}>{label}</Text>
    {isEditing ? editingComponent ?? <Text style={{ color: "white" }}>Editing...</Text> : (
      <View style={{ flexDirection: "row" }}>
        {typeof value === "string" ? (
          <Text style={{ color: "white", fontSize: 16 }}>{value}</Text>
        ) : (
          value
        )}
      </View>
    )}
    <TouchableOpacity onPress={onEditPress}>
      <Text style={{ color: spotifyLightGrey, fontSize: 16 }}>
        {isEditing ? "X" : "Edit"}
      </Text>
    </TouchableOpacity>
  </View>
);

export const SettingsTile = ({ inputName }: SettingsTileProps) => {
  const currentYear = new Date().getFullYear();
  const filters = useStore().filters;
  const changeDate = useChangeDate((state) => state.changeDate);
  const { fetchDataAndUpdate } = useFetchLogic();

  const [isEditingStart, setIsEditingStart] = useState(false);
  const [isEditingEnd, setIsEditingEnd] = useState(false);
  const [isEditingBase, setIsEditingBase] = useState(false);
  const [isEditingMax, setIsEditingMax] = useState(false);
  const [isEditingType, setIsEditingType] = useState(false);

  const filter = filters.find((n) => n.name === inputName);
  const type = filter?.type ?? "Unknown";
  const startDate = filter?.start_date ?? new Date(`${currentYear}-01-02`);
  const endDate = filter?.end_date ?? new Date(`${currentYear}-01-02`);
  const tempBase = filter?.temp_base ?? 0;
  const tempMax = filter?.temp_max ?? 0;

  const fetch = async () => {
    try {
      await fetchDataAndUpdate();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
      <View
        style={{
          backgroundColor: spotifyDarkGrey,
          padding: 10,
          borderRadius: 20,
          width: "100%",
        }}
      >
        <EditableRow
          label="Type:"
          isEditing={isEditingType}
          value={type}
          onEditPress={() => setIsEditingType(!isEditingType)}
          editingComponent={<Text style={{ color: "white" }}>Editing...</Text>}
        />

        <EditableRow
          label="Date Start:"
          isEditing={isEditingStart}
          value={startDate.toISOString().slice(0, 10)}
          onEditPress={() => setIsEditingStart(!isEditingStart)}
          editingComponent={
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
                  await changeDate(inputName, selectedDate, null);
                  await fetch();
                }
              }}
              textColor="white"
            />
          }
        />

        <EditableRow
          label="Date End:"
          isEditing={isEditingEnd}
          value={endDate.toISOString().slice(0, 10)}
          onEditPress={() => setIsEditingEnd(!isEditingEnd)}
          editingComponent={
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
                  await changeDate(inputName, null, selectedDate);
                  await fetch();
                }
              }}
              textColor="white"
            />
          }
        />

        <EditableRow
          label="Temp Base:"
          isEditing={isEditingBase}
          value={`${tempBase}°`}
          onEditPress={() => setIsEditingBase(!isEditingBase)}
        />

        <EditableRow
          label="Temp Max:"
          isEditing={isEditingMax}
          value={`${tempMax}°`}
          onEditPress={() => setIsEditingMax(!isEditingMax)}
        />
      </View>
    </View>
  );
};
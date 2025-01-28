import React, {useEffect, useState} from 'react';
import SelectDate from '../ components/SelectDate';
import {DegreeTiles} from '../ components/DegreeTiles';
import {metricsData, spotifyBlack} from '../constants/constants';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {useStore} from '../stores/useStore';
import {useMetric} from '../stores/useMetric';
import {useDataStore} from '../stores/useFetch';
import {useTime} from '../stores/useTime';
import {updateCamera} from '@react-three/fiber/dist/declarations/src/core/utils';

export const DegreeDayScreen = () => {
  // Make global date
  const [date, setDate] = useState(new Date());
  const [dateParsed, setDateParsed] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const parseDate = (data: Date) => {
    return data.toISOString().slice(0, 10);
  };

  // Api call
  const {data, isLoading, isError, fetchData} = useDataStore();

  // Degree day store
  const {filters} = useStore();
  const updateDDays = useStore(state => state.updateDegreeDays);

  // Tempature store
  const {datas} = useMetric();
  const updateDegrees = useMetric(state => state.updateDegrees);

  const {times} = useTime();
  const updateTimes = useTime(state => state.updateDate);


  // Fix render from state to match current
  useEffect(() => {
    const parsedDate = parseDate(date); // Derive the value here
    updateTimes('dateParsed', parsedDate);
    setDateParsed(parsedDate); // Update the state (optional if it's needed elsewhere)
    // const stateDate = times.find(t => t.name === 'dateParsed')?.date ?? '';
    filters.forEach(filter => {
      fetchData(parsedDate, filter.type, 'dayDegreeDay').then(result => {
        updateDDays(filter.type, result); // Degree Days update
      });
    });
    datas.forEach(temp => {
      fetchData(parsedDate, temp.type, temp.name).then(result => {
        console.log(result);
        updateDegrees(temp.name, result); //  Tempature update
      });
    });
  }, [date]);

  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Degree Day</Text>
        <View>
          {filters.map(filter => (
            <View style={{paddingBottom: 10}}>
              <DegreeTiles
                key={filter.type}
                name={`${filter.name}`}
                degreeDays={filter.degreeDays}
                tempLow={datas.find(t => t.name === 'dayLow')?.data ?? null}
                tempHigh={datas.find(t => t.name === 'dayHigh')?.data ?? null}
              />
            </View>
          ))}

          {/**
           * This is a temporary view
           *  To be removed after testing /
           *    or when data is up consistently
           */}
          <View style={{paddingTop: 30}}>
            <Text style={styles.sectionTitle}>For Testing Purposes!!!</Text>
            <SelectDate date={date} setDate={setDate}>
              <Text style={styles.date}>
                <Text>{dateParsed}</Text>
              </Text>
            </SelectDate>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    padding: 20,
    backgroundColor: spotifyBlack,
  },
  titleContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'left',
    color: 'white',
  },
  date: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
  },
});

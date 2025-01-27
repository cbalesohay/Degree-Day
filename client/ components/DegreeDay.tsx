import React, {useEffect, useState} from 'react';
import SelectDate from '../ components/SelectDate';
import {DegreeTiles} from '../ components/DegreeTiles';
import {metricsData, spotifyBlack} from '../constants/constants';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {DisplayData} from '../ components/DisplayData';
// import {useFilterStore} from '../stores/useFilterStore';
import {useStore} from '../stores/useStore';
import {useTempature} from '../stores/useTempature';
import {Display} from '../ components/Display';
import {useDataStore} from '../stores/useFetch';

export const DegreeDay = () => {
  const [date, setDate] = useState(new Date());
  const [dateParsed, setDateParsed] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const parseDate = (data: Date) => {
    return data.toISOString().slice(0, 10);
  };

  const {filters} = useStore();
  const {temps} = useTempature();
  const {data, isLoading, isError, fetchData} = useDataStore();
  const updateDDays = useStore((state) => state.updateDegreeDays);

  // Need to call the fetchData function from useFetch.tx
  useEffect(() => {
    setDateParsed(parseDate(date));
    filters.forEach(filter => {
      
      fetchData(dateParsed, filter.type, 'dayDegreeDay').then((result) => {

        updateDDays(filter.type, result);

      });
    });
  }, [date]);

  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Degree Day</Text>
        <View>
          {/**
           * This is idealy what I want to do but I
           * need to have the store update the date
           * and then get the data from the store
           *
           */}
          {filters.map(filter => (
            <DegreeTiles
              key={filter.type}
              name={`${filter.name}`}
              nameData={filter.type}
              degreeDays={filter.degreeDays}
              tempLow={temps.map(t =>
                t.name === 'tempLow' ? t.degrees : null,
              )}
              tempHigh={temps.map(t =>
                t.name === 'tempHigh' ? t.degrees : null,
              )}
            />
          ))}

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

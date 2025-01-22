import React, {Children, useEffect, useState} from 'react';
import SelectDate from '../ components/SelectDate';
import {DegreeTiles} from '../ components/DegreeTiles';
import {MetricTile} from '../ components/MetricTile';
import {
  tileColorPrimary,
  tileTextColorPrimary,
  metricsData,
  spotifyBlack,
} from '../constants/constants';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {DisplayData} from '../ components/DisplayData';
import {LoadingDegreeTiles} from '../ components/LoadingDegreeTile';

export const DegreeDayScreen = () => {
  const [date, setDate] = useState(new Date());
  const [dateParsed, setDateParsed] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const parseDate = data => {
    const today = data;
    const formattedDate = today.toISOString().slice(0, 10);
    return formattedDate;
  };

  useEffect(() => {
    setDateParsed(parseDate(date));
    return () => {};
  }, [date]);

  const [degreeDayWC, setDegreeDayWC] = useState(0);
  const [degreeDayLR, setDegreeDayLR] = useState('');
  const [degreeDayCM, setDegreeDayCM] = useState('');
  const [degreeDayAS, setDegreeDayAS] = useState('');
  const [tempatureLow, setTempatureLow] = useState(0);
  const [tempatureHigh, setTempatureHigh] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDateParsed(parseDate(date));
    setLoading(true);
    setDegreeDayWC(100);
    setLoading(false);
    return () => {};
  }, [date]);

  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Degree Day</Text>
        <View>
          {metricsData.map(metric => (
            <DegreeTiles
              key={metric.id}
              name={`${metric.name}`}
              nameData={metric.nameData}
              degreeDays={DisplayData(
                dateParsed,
                metric.nameData,
                'dayDegreeDay',
              )}
              tempLow={DisplayData(dateParsed, 'Temperature', 'dayLow')}
              tempHigh={DisplayData(dateParsed, 'Temperature', 'dayHigh')}
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

import React, {useEffect, useState} from 'react';
import SelectDate from '../ components/SelectDate';
import {DegreeTiles} from '../ components/DegreeTiles';
import {metricsData, spotifyBlack} from '../constants/constants';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {useStore} from '../stores/useStore';
import {useMetric} from '../stores/useMetric';
import {useDataStore} from '../stores/useFetch';

export const WeatherComponent = () => {
  // Degree day store
  // const {filters} = useStore();
  // const updateDDays = useStore(state => state.updateDegreeDays);

  // Tempature store
  const {datas} = useMetric();

  return (
    <>
      <View>
        <Text style={{color: 'white'}}>Weather Data</Text>
        <Text style={{color: 'white'}}>Date: {}</Text>
        <Text style={{color: 'white'}}>Location: {}</Text>
        <Text style={{color: 'white'}}>
          High Temp: {datas.find(t => t.name === 'dayHigh')?.data ?? null}°
        </Text>
        <Text style={{color: 'white'}}>
          Low Temp: {datas.find(t => t.name === 'dayLow')?.data ?? null}°
        </Text>
        <Text style={{color: 'white'}}>
          Humidity: {datas.find(t => t.name === 'dayAverage')?.data ?? null}%
        </Text>
        <Text style={{color: 'white'}}>
          Rain: {datas.find(t => t.name === 'dayRainfall')?.data ?? null} in
        </Text>
      </View>
    </>
  );
};

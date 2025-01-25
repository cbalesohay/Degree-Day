import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {spotifyGreen} from '../constants/constants';
import {Fetch} from '../hooks/Fetch';
import {useDataStore} from '../stores/useFetch';

export const Display = (date: string, species: string, reqData: string) => {
  // const {data, isLoading, error, isError} = Fetch(date, species, reqData);
  // const {data, isLoading, error, isError} = useFetch(date, species, reqData);

  const {data, isLoading, isError, fetchData} = useDataStore();

  // Need to call the fetchData function from useFetch.tx
  useEffect(() => {
    if (date && species && reqData) {
      fetchData(date, species, reqData);
    }
  }, [date, species, reqData, fetchData]);

console.log('Data:', data);

  // return (isLoading ? true : false);
  // return (isError ? true : false);

  if (data != null && !isNaN(data) && !Error) {
    if (species === 'Rain') {
      return <Text>{data.toFixed(2)} in.</Text>;
    } else if (species === 'Temperature') {
      return (
        <Text>
          {Math.round(data)}
          <Text style={styles.degreeSign}>&#x00B0;</Text>
        </Text>
      );
    } else if (species === 'Humidity') {
      return <Text>{Math.round(data)}%</Text>;
    }
    return <Text>{Math.round(data)}</Text>;
  } else {
    return true;
  }
};

const styles = StyleSheet.create({
  degreeSign: {
    color: spotifyGreen,
  },
});

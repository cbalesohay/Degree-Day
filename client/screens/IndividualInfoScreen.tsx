import React, {Children, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  spotifyDarkGrey,
  spotifyLightGrey,
  spotifyWhite,
  spotifyBlack,
  spotifyGreen,
  metricsData,
} from '../constants/constants';
import {PageIndicator} from '../ components/PageIndicator';
import { WeatherComponent } from '../ components/WeatherComponent';

export const IndividualInfoScreen = () => {
  return (
    <>
      <View style={styles.sectionContainer}>
        <WeatherComponent />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tile: {
    marginTop: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    flex: 1,
    height: 100,
    backgroundColor: spotifyDarkGrey || '#fff',
  },
  tempContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontWeight: 800,
    color: spotifyWhite,
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 15,
  },
  degreeDayMetric: {
    fontSize: 30,
    fontWeight: 400,
    color: spotifyWhite,
    textAlign: 'right',
    paddingRight: 12,
  },
  tempMetric: {
    fontSize: 15,
    fontWeight: 400,
    color: spotifyWhite,
    textAlign: 'center',
    paddingLeft: 10,
  },
  colon: {
    color: spotifyGreen,
  },
  sectionContainer: {
    padding: 20,
    backgroundColor: spotifyBlack,
  },
});

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';

export const Error = () => {
  return <>
    <Text>No Data {<ActivityIndicator/>}</Text>
  </>;
};

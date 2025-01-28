/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useEffect, useState} from 'react';
import {DegreeDayScreen} from './screens/DegreeDayScreen';
import {IndividualInfoScreen} from './screens/IndividualInfoScreen';
import {
  backgroundColorPrimary,
  spotifyBlack,
  spotifyWhite,
} from './constants/constants';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

function App() {
  const backgroundStyle = {
    backgroundColor: spotifyBlack,
    flex: 1,
  };

  // const Stack = createNativeStackNavigator();
  // function RootStack() {
  //   return (
  //     <Stack.Navigator initialRouteName="Degree">
  //       <Stack.Screen name="Degree" component={DegreeDayScreen} />
  //       <Stack.Screen name="Individual" component={IndividualInfoScreen} />
  //     </Stack.Navigator>
  //   );
  // }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            flex: 1, // This will make the view take up 100% of the available space
          }}>
          <DegreeDayScreen />
          
          <IndividualInfoScreen />
        </View>
      </ScrollView>

      {/* <View style={{flex: 1}}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </View> */}
    </SafeAreaView>

    // <Provider store={store}>
    //   <SafeAreaView style={backgroundStyle}>
    //     <TestScreen />
    //   </SafeAreaView>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

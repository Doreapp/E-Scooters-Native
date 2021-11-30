/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, View } from 'react';
import type { Node } from 'react';
import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';

import Maps from './components/Maps';
import getScooters from './components/ScootersPins'

const App: () => Node = () => {
  scooters = getScooters()

  let [userPosition, setUserPosition] = useState({
    lat: 59.34801260548073,
    lon: 18.07260567972617
  })

  const onScooterClick = (scooter) => {
    console.log("App: Click on scooter:", scooter)
    // Note: 'scooter' param contains the exact same data as in './components/ScootersPins'
    //    (data retreive via 'getScooters' function)
    // TODO, here display scooters's info 
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}>
      <Maps
        scooters={scooters}
        onScooterClick={onScooterClick}
        userPosition={userPosition}
      ></Maps>
    </GestureHandlerRootView>
  );
};

export default App;

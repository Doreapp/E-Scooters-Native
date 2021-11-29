/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { View } from 'react';
import type { Node } from 'react';
import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';

import Maps from './components/Maps';
import getScootersMarkers from './components/ScootersPins'

const App: () => Node = () => {
  markers = getScootersMarkers()

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}>
      <Maps
        markers={markers}
      ></Maps>
    </GestureHandlerRootView>
  );
};

export default App;

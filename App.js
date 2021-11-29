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

const App: () => Node = () => {
  console.log("App()")
  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}>
      <Maps
        markers={[
          {
            lon: 18.07333891208995,
            lat: 59.34686800619177
          }
        ]}
      ></Maps>
    </GestureHandlerRootView>
  );
};

export default App;

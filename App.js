/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  GestureHandlerRootView
} from  'react-native-gesture-handler';

import Maps from './components/Maps';

const App: () => Node = () => {
  console.log("App()")
  return (
    <GestureHandlerRootView
    style={{ flex: 1 }}>
      <Maps></Maps>
    </GestureHandlerRootView>
  );
};

export default App;
